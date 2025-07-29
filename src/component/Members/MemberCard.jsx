"use client";
import React, { useState } from "react";
import { User, Phone, Mail, Droplets, Loader2, Trash2, X } from "lucide-react";
import Model from "../shared/Model";
import { useDispatch } from "react-redux";
import { openModel } from "@/state/helper_slice/modelOpenSlice";

const MemberCard = ({
  member,
  role,
  setModalType,
  setDeletedMemberDetails,
}) => {
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    setModalType("delete");
    setDeletedMemberDetails(member);
    dispatch(openModel());
  };

  return (
    <>
      <div
        key={member.id}
        className="group relative bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-4 shadow-lg hover:shadow-xl hover:shadow-black/10 transition-all duration-300 hover:-translate-y-1"
      >
        {/* Delete Button - Only visible for SUPER_ADMIN */}
        {role === "SUPER_ADMIN" && (
          <button
            onClick={handleDeleteClick}
            className="absolute top-3 right-3 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 z-10"
            title="Delete Member"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}

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
    </>
  );
};

export default MemberCard;
