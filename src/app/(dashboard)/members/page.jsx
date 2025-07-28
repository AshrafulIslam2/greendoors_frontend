"use client";
import React, { useState, useCallback, useEffect } from "react";
import { User, Phone, Mail, Droplets, Loader2 } from "lucide-react";
import AddMember from "@/component/Members/AddMember";
import Model from "@/component/shared/Model";
import AddMemberForm from "@/component/Members/AddMemberForm";
import {
  useGetUserInfoQuery,
  useLazyGetUserInfoQuery,
} from "@/state/user/userSlice";
import { useSession } from "next-auth/react";

const ITEMS_PER_PAGE = 10;

const page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allMembers, setAllMembers] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(true);

  const { data: session, status } = useSession();

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
      <div className="min-h-[inherit] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
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
            {session?.user?.role === "SUPER_ADMIN" && <AddMember />}
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
              <div
                key={member.id}
                className="group bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-4 shadow-lg hover:shadow-xl hover:shadow-black/10 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Profile Image */}
                <div className="relative mb-4">
                  <div className="w-20 h-20 mx-auto rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 p-1">
                    <img
                      src={
                        member?.personalInfo?.ProfileImage ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          member?.name || "User"
                        )}&background=random`
                      }
                      alt={member?.name || "Default User"}
                      className="w-full h-full rounded-xl object-cover"
                    />
                  </div>
                </div>

                {/* Member Info */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 truncate">
                    {member?.name || "Unknown User"}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="inline-flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
                      <span className="text-blue-700 font-semibold text-xs">
                        {member?.member?.memberId || "N/A"}
                      </span>
                    </div>
                    {member?.personalInfo?.bloodGroup && (
                      <div className="inline-flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg">
                        <Droplets className="w-3 h-3 text-red-500" />
                        <span className="text-red-700 font-bold text-xs">
                          {member.personalInfo.bloodGroup}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-3">
                  {member?.personalInfo?.phone && (
                    <div className="flex items-center gap-2 p-2 bg-gray-50/50 rounded-lg">
                      <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-gray-900 truncate">
                          {member.personalInfo.phone}
                        </p>
                      </div>
                    </div>
                  )}

                  {member?.email && (
                    <div className="flex items-center gap-2 p-2 bg-gray-50/50 rounded-lg">
                      <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-gray-900 truncate">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
      <Model modelTitle="Add New Member">
        <AddMemberForm />
      </Model>
    </>
  );
};

export default page;
