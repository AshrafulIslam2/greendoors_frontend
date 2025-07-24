import React from "react";
import {
  User,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Pencil,
  Shield,
  Award,
  Image as ImageIcon,
  AlertCircle,
} from "lucide-react";
const Profile = ({ personalInfo, nominee, member, role }) => {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <h1 className=" text-2xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Member Profile
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Manage your personal information and account details
          </p>
        </div>
        <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-3xl p-8 mb-8 shadow-xl shadow-black/5">
          <div className="flex flex-col sm:flex-row lg:items-center gap-8">
            {/* Profile Image */}
            <div className="">
              <div className="w-40 h-40  relative group rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100 p-1">
                <img
                  src={
                    personalInfo?.ProfileImage ||
                    "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=400"
                  }
                  alt="Profile"
                  className="w-full h-full rounded-3xl object-cover"
                />
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center border-4 border-white shadow-lg">
                  <Award className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {personalInfo?.name}
                  </h2>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-700 font-semibold text-sm">
                      {role}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-2xl">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-semibold text-gray-900">
                      {personalInfo?.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-2xl">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-semibold text-gray-900">
                      {personalInfo?.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-xl shadow-black/5">
              <button
                type="button"
                className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition"
                // onClick={() => console.log("Edit personal info")}
              >
                <Pencil className="w-4 h-4" />
                Edit
              </button>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Personal Information
                </h3>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50/50 rounded-2xl">
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Full Name
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {personalInfo?.name}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50/50 rounded-2xl">
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Date of Birth
                    </p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <p className="text-lg font-semibold text-gray-900">
                        {new Date(personalInfo?.dob).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50/50 rounded-2xl">
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      National ID
                    </p>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-gray-400" />
                      <p className="text-lg font-semibold text-gray-900">
                        {personalInfo?.nid}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50/50 rounded-2xl">
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Gender
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {personalInfo?.gender || "Not specified"}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50/50 rounded-2xl">
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Blood Group
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded-xl">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-red-700 font-bold">
                        {personalInfo?.bloodGroup || "Unknown"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* NID Images */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Identity Documents
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="group">
                    <p className="text-sm font-medium text-gray-600 mb-3">
                      NID Front
                    </p>
                    <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[3/2]">
                      {personalInfo?.nidImageFrontPart ? (
                        <img
                          src={personalInfo.nidImageFrontPart}
                          alt="NID Front"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                          <ImageIcon className="w-8 h-8 mb-2" />
                          <p className="text-sm">Not uploaded</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="group">
                    <p className="text-sm font-medium text-gray-600 mb-3">
                      NID Back
                    </p>
                    <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[3/2]">
                      {personalInfo?.nidImageBackPart ? (
                        <img
                          src={personalInfo.nidImageBackPart}
                          alt="NID Back"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                          <ImageIcon className="w-8 h-8 mb-2" />
                          <p className="text-sm">Not uploaded</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Nominee Information */}
            <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-xl shadow-black/5">
              <button
                type="button"
                className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition"
                // onClick={() => console.log("Edit personal info")}
              >
                <Pencil className="w-4 h-4" />
                Edit
              </button>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Nominee Information
                </h3>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50/50 rounded-2xl">
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Full Name
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {nominee?.name}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50/50 rounded-2xl">
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Date of Birth
                    </p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <p className="text-lg font-semibold text-gray-900">
                        {new Date(nominee?.dob).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50/50 rounded-2xl">
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      National ID
                    </p>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-gray-400" />
                      <p className="text-lg font-semibold text-gray-900">
                        {nominee?.nid}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50/50 rounded-2xl">
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Gender
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {nominee?.gender || "Not specified"}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50/50 rounded-2xl">
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      Blood Group
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded-xl">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-red-700 font-bold">
                        {nominee?.bloodGroup || "Unknown"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* NID Images */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Identity Documents
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="group">
                    <p className="text-sm font-medium text-gray-600 mb-3">
                      NID Front
                    </p>
                    <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[3/2]">
                      {nominee?.nidImageFrontPart ? (
                        <img
                          src={nominee.nidImageFrontPart}
                          alt="NID Front"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                          <ImageIcon className="w-8 h-8 mb-2" />
                          <p className="text-sm">Not uploaded</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="group">
                    <p className="text-sm font-medium text-gray-600 mb-3">
                      NID Back
                    </p>
                    <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[3/2]">
                      {nominee?.nidImageBackPart ? (
                        <img
                          src={nominee.nidImageBackPart}
                          alt="NID Back"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                          <ImageIcon className="w-8 h-8 mb-2" />
                          <p className="text-sm">Not uploaded</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            {/* Membership Details */}
            <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-3xl p-6 shadow-xl shadow-black/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Membership</h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl">
                  <p className="text-sm font-medium text-purple-600 mb-2">
                    Member ID
                  </p>
                  <p className="text-2xl font-bold text-purple-900">
                    {member?.memberId}
                  </p>
                </div>
                <div className="p-3 bg-gray-50/50 rounded-xl">
                  <p className="text-xs font-medium text-gray-500 mb-1">Type</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-700 font-semibold text-sm">
                      {member?.type}
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-gray-50/50 rounded-xl">
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Joining Date
                  </p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="font-semibold text-gray-900">
                      {new Date(member?.joiningDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
