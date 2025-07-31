"use client";
import React from "react";
import { useParams } from "next/navigation";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  Shield,
  Award,
  Camera,
  Edit3,
  Heart,
  IdCard,
  Loader2,
} from "lucide-react";
import { useGetUserByIdQuery } from "@/state/user/userSlice";
import { useSession } from "next-auth/react";

const MemberDetailsPage = () => {
  const params = useParams();
  const { data: session } = useSession();
  const userId = params.id;

  // Fetch user data using the query hook
  const {
    data: memberData,
    isLoading,
    error,
    isError,
  } = useGetUserByIdQuery(userId, {
    skip: !userId, // Skip the query if no userId
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Loading Member Details...
          </h2>
          <p className="text-gray-500">
            Please wait while we fetch the information.
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !memberData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Member Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error?.data?.message ||
              "The requested member could not be found or you don't have permission to view this member."}
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Extract data from API response
  const { personalInfo, nominee, member } = memberData;

  return (
    <div className="min-h-dvh bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.08)_1px,transparent_0)] bg-[size:32px_32px] opacity-60"></div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Profile Image */}
              <div className="relative group">
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100 p-1 shadow-xl">
                  <img
                    src={
                      personalInfo?.ProfileImage ||
                      "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=400"
                    }
                    alt="Profile"
                    className="w-full h-full rounded-3xl object-cover"
                  />
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center border-4 border-white shadow-lg">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                </div>
                {member?.isActive && (
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-green-400 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                )}
              </div>

              {/* Member Info */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2">
                      {personalInfo?.name}
                    </h1>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-700 font-semibold text-sm">
                          {member?.type}
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl">
                        <IdCard className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold text-sm">
                          ID: {member?.memberId}
                        </span>
                      </div>
                      {member?.isActive ? (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-green-700 font-semibold text-sm">
                            Active
                          </span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-red-700 font-semibold text-sm">
                            Inactive
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {session?.user?.role === "SUPER_ADMIN" && (
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 group">
                      <Edit3 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      Edit Profile
                    </button>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-white/60 rounded-2xl border border-white/40">
                    <Phone className="w-5 h-5 text-blue-600 mb-2" />
                    <p className="text-xs text-gray-500 mb-1">Phone</p>
                    <p className="font-semibold text-gray-900 text-sm">
                      {personalInfo?.phone || "Not provided"}
                    </p>
                  </div>
                  <div className="p-4 bg-white/60 rounded-2xl border border-white/40">
                    <MapPin className="w-5 h-5 text-emerald-600 mb-2" />
                    <p className="text-xs text-gray-500 mb-1">Address</p>
                    <p className="font-semibold text-gray-900 text-sm">
                      {personalInfo?.address || "Not provided"}
                    </p>
                  </div>
                  <div className="p-4 bg-white/60 rounded-2xl border border-white/40">
                    <Heart className="w-5 h-5 text-red-600 mb-2" />
                    <p className="text-xs text-gray-500 mb-1">Blood Group</p>
                    <p className="font-semibold text-red-700 text-sm">
                      {personalInfo?.bloodGroup || "Not provided"}
                    </p>
                  </div>
                  <div className="p-4 bg-white/60 rounded-2xl border border-white/40">
                    <Calendar className="w-5 h-5 text-purple-600 mb-2" />
                    <p className="text-xs text-gray-500 mb-1">Joined</p>
                    <p className="font-semibold text-gray-900 text-sm">
                      {member?.joiningDate
                        ? new Date(member.joiningDate).toLocaleDateString()
                        : "Not available"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {session?.user?.role === "SUPER_ADMIN" && (
          <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-2">
            {/* Personal Information Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Personal Information
                </h2>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl">
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      Full Name
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {personalInfo?.name || "Not provided"}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl">
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      Gender
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {personalInfo?.gender || "Not provided"}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl">
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      Date of Birth
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {personalInfo?.dob
                        ? new Date(personalInfo.dob).toLocaleDateString()
                        : "Not provided"}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl">
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      National ID
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {personalInfo?.nid || "Not provided"}
                    </p>
                  </div>
                </div>

                {/* NID Images */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Identity Documents
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="group">
                      <p className="text-sm font-medium text-gray-600 mb-3">
                        NID Front
                      </p>
                      <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[3/2] border-2 border-dashed border-gray-300">
                        {personalInfo?.nidImageFrontPart ? (
                          <img
                            src={personalInfo.nidImageFrontPart}
                            alt="NID Front"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                            <Camera className="w-8 h-8 mb-2" />
                            <p className="text-sm">Not uploaded</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="group">
                      <p className="text-sm font-medium text-gray-600 mb-3">
                        NID Back
                      </p>
                      <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[3/2] border-2 border-dashed border-gray-300">
                        {personalInfo?.nidImageBackPart ? (
                          <img
                            src={personalInfo.nidImageBackPart}
                            alt="NID Back"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                            <Camera className="w-8 h-8 mb-2" />
                            <p className="text-sm">Not uploaded</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nominee Information Card */}
            {nominee && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Nominee Information
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-2xl">
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Full Name
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {nominee?.name || "Not provided"}
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-2xl">
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Gender
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {nominee?.gender || "Not provided"}
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-2xl">
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Phone
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {nominee?.phone || "Not provided"}
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-2xl">
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Email
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {nominee?.email || "Not provided"}
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-2xl">
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Date of Birth
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {nominee?.dob
                          ? new Date(nominee.dob).toLocaleDateString()
                          : "Not provided"}
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-2xl">
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Blood Group
                      </p>
                      <p className="text-lg font-semibold text-red-700">
                        {nominee?.bloodGroup || "Not provided"}
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-2xl">
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        National ID
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {nominee?.nid || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-2xl">
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      Address
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {nominee?.address || "Not provided"}
                    </p>
                  </div>

                  {/* Nominee NID Images */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Nominee Identity Documents
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="group">
                        <p className="text-sm font-medium text-gray-600 mb-3">
                          NID Front
                        </p>
                        <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[3/2] border-2 border-dashed border-emerald-300">
                          {nominee?.nidImageFrontPart ? (
                            <img
                              src={nominee.nidImageFrontPart}
                              alt="Nominee NID Front"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                              <Camera className="w-8 h-8 mb-2" />
                              <p className="text-sm">Not uploaded</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="group">
                        <p className="text-sm font-medium text-gray-600 mb-3">
                          NID Back
                        </p>
                        <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[3/2] border-2 border-dashed border-emerald-300">
                          {nominee?.nidImageBackPart ? (
                            <img
                              src={nominee.nidImageBackPart}
                              alt="Nominee NID Back"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                              <Camera className="w-8 h-8 mb-2" />
                              <p className="text-sm">Not uploaded</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {/* Main Content Grid */}

        {/* Membership Status Section */}
        <div className="max-w-7xl mx-auto mt-8">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Membership Status</h2>
              <p className="text-blue-100">Account overview and statistics</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
                <Award className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
                <p className="text-2xl font-bold">
                  {member?.memberId || "N/A"}
                </p>
                <p className="text-blue-100 text-sm">Member ID</p>
              </div>
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
                <Calendar className="w-8 h-8 mx-auto mb-3 text-green-300" />
                <p className="text-2xl font-bold">
                  {member?.joiningDate
                    ? Math.floor(
                        (new Date() - new Date(member.joiningDate)) /
                          (1000 * 60 * 60 * 24)
                      )
                    : "N/A"}
                </p>
                <p className="text-blue-100 text-sm">Days as Member</p>
              </div>
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
                <Shield className="w-8 h-8 mx-auto mb-3 text-blue-300" />
                <p className="text-2xl font-bold">
                  {member?.isActive ? "Active" : "Inactive"}
                </p>
                <p className="text-blue-100 text-sm">Account Status</p>
              </div>
              <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
                <User className="w-8 h-8 mx-auto mb-3 text-purple-300" />
                <p className="text-2xl font-bold">{member?.type || "N/A"}</p>
                <p className="text-blue-100 text-sm">Membership Type</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailsPage;
