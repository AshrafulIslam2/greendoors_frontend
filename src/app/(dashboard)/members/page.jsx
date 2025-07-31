"use client";
import React, { useState, useCallback, useEffect } from "react";
import { User, Phone, Mail, Droplets, Loader2, Trash2 } from "lucide-react";
import AddMember from "@/component/Members/AddMember";
import Model from "@/component/shared/Model";
import AddMemberForm from "@/component/Members/AddMemberForm";
import {
  useDeleteUserMutation,
  useGetUserInfoQuery,
  useLazyGetUserInfoQuery,
} from "@/state/user/userSlice";
import { useSession } from "next-auth/react";
import MemberCard from "@/component/Members/MemberCard";
import { useDispatch } from "react-redux";
import { closeModel } from "@/state/helper_slice/modelOpenSlice";
import { toast } from "react-toastify";

const ITEMS_PER_PAGE = 10;

const page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalType, setModalType] = useState("Add New Member");
  const dispatch = useDispatch();
  const [deletedMemberDetails, setDeletedMemberDetails] = useState({});
  const [allMembers, setAllMembers] = useState([]);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [hasMoreData, setHasMoreData] = useState(true);

  const { data: session, status } = useSession();
  const [deleteReason, setDeleteReason] = useState("");

  const handleCloseModal = () => {
    dispatch(closeModel());
    setDeleteReason("");
  };

  const handleDeleteConfirm = async () => {
    if (!deleteReason.trim()) {
      toast.error("Please provide a reason for deletion");
      return;
    }
    console.log("ashraful");
    try {
      const result = await deleteUser({
        userId: deletedMemberDetails?.id,
        reason: deleteReason.trim(),
      }).unwrap();

      toast.success(result.message || "Member deleted successfully");
      handleCloseModal();
    } catch (error) {
      console.error("Delete failed:", error);

      // Handle different error types
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to delete member. Please try again.";

      toast.error(errorMessage);
    }
  };
  // Initial load
  const {
    data: initialMembers,
    error,
    isLoading,
    refetch,
  } = useGetUserInfoQuery({
    page: 1,
    limit: ITEMS_PER_PAGE,
  });

  // Lazy query for loading more
  const [
    loadMoreUsers,
    { isLoading: isLoadingMore, isFetching: isFetchingMore },
  ] = useLazyGetUserInfoQuery();

  // Update allMembers when initial data loads
  useEffect(() => {
    if (initialMembers?.data) {
      setAllMembers(initialMembers.data);
      setHasMoreData(
        initialMembers.data.length === ITEMS_PER_PAGE &&
          (initialMembers.total
            ? initialMembers.data.length < initialMembers.total
            : true)
      );
    }
  }, [initialMembers]);

  // Load more function
  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore || !hasMoreData) return;

    try {
      const nextPage = currentPage + 1;
      const result = await loadMoreUsers({
        page: nextPage,
        limit: ITEMS_PER_PAGE,
      }).unwrap();

      if (result?.data && result.data.length > 0) {
        setAllMembers((prev) => [...prev, ...result.data]);
        setCurrentPage(nextPage);

        // Check if there's more data
        setHasMoreData(
          result.data.length === ITEMS_PER_PAGE &&
            (result.total
              ? allMembers.length + result.data.length < result.total
              : true)
        );
      } else {
        setHasMoreData(false);
      }
    } catch (error) {
      console.error("Failed to load more users:", error);
    }
  }, [
    currentPage,
    isLoadingMore,
    hasMoreData,
    loadMoreUsers,
    allMembers.length,
  ]);

  // Handle loading states
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading session...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to access this page.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading members...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading users: {error.message}</p>
          <button
            onClick={refetch}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!session?.user || !allMembers) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8 flex flex-col items-start sm:flex-row justify-between sm:items-center">
            <div>
              <div className="flex items-center gap-3 sm:mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Member Directory
                </h1>
              </div>
              <p className="text-gray-600 text-lg mb-2 sm:mb-0">
                Browse all registered members
              </p>
            </div>
            {session?.user?.role === "SUPER_ADMIN" && (
              <AddMember setModalType={setModalType} />
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Members
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {initialMembers?.pagination.totalCount ||
                      allMembers?.length ||
                      0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Active</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {initialMembers?.pagination.totalCount ||
                      allMembers?.length ||
                      0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Blood Donors
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {allMembers?.filter(
                      (member) => member?.personalInfo?.bloodGroup
                    )?.length || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-rose-500 rounded-xl flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Member Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {allMembers?.map((member) => (
              <MemberCard
                member={member}
                setDeletedMemberDetails={setDeletedMemberDetails}
                key={member.id}
                setModalType={setModalType}
                role={session?.user?.role}
              />
            ))}
          </div>

          {/* Load More Button */}
          {hasMoreData && (
            <div className="mt-12 text-center">
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="px-8 py-4 bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-700 font-semibold rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingMore ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading More...
                  </div>
                ) : (
                  "Load More Members"
                )}
              </button>
            </div>
          )}

          {/* No More Data Message */}
          {!hasMoreData && allMembers.length > 0 && (
            <div className="mt-12 text-center">
              <p className="text-gray-500">
                You've reached the end of the member list
              </p>
            </div>
          )}
        </div>
      </div>
      <Model modelTitle={modalType}>
        {modalType === "Add New Member" ? (
          <AddMemberForm />
        ) : (
          <div className="p-6">
            {/* Warning Message */}
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-red-800 mb-1">
                    Delete Member:{" "}
                    {deletedMemberDetails?.name || "Unknown User"}
                  </h4>
                  <p className="text-sm text-red-700">
                    This action cannot be undone. The member's financial records
                    will be preserved for audit purposes.
                  </p>
                </div>
              </div>
            </div>

            {/* Member Details */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium text-gray-800 mb-2">
                Member Details:
              </h5>
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {deletedMemberDetails?.name || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Member ID:</span>{" "}
                  {deletedMemberDetails?.member?.memberId || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {deletedMemberDetails?.email || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Role:</span>{" "}
                  {deletedMemberDetails?.member?.type || "N/A"}
                </p>
              </div>
            </div>

            {/* Delete Reason Input */}
            <div className="mb-6">
              <label
                htmlFor="deleteReason"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Reason for Deletion <span className="text-red-500">*</span>
              </label>
              <textarea
                id="deleteReason"
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
                placeholder="Please provide a detailed reason for deleting this member..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none"
                rows={4}
                disabled={isDeleting}
              />
              <p className="mt-1 text-xs text-gray-500">
                This reason will be recorded for audit purposes.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                // onClick={handleCloseModal}
                // disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isDeleting || !deleteReason.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 border border-red-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete Member
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </Model>
    </>
  );
};

export default page;
