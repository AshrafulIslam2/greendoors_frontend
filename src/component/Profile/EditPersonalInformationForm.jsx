"use client";
import React, { use, useRef, useState } from "react";
import {
  User,
  Phone,
  Calendar,
  Droplet,
  Shield,
  CreditCard,
  MapPin,
  Image as ImageIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { closeModel } from "@/state/helper_slice/modelOpenSlice";

import { updateUserPersonalInfo } from "@/lib/update-personal-information";

const initialState = {
  name: "",
  phone: "",
  email: "",
  dob: "",
  address: "",
  ProfileImage: null,
  nidImageFrontPart: null,
  nidImageBackPart: null,
  bloodGroup: "",
  gender: "",
  nid: "",
};

const inputClass =
  "pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 bg-gray-50 w-full";

const EditPersonalInformationForm = ({ defaultValues = {} }) => {
  const [form, setForm] = useState({ ...initialState, ...defaultValues });
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, status, update } = useSession();
  const formRef = useRef(null);

  console.log("🚀 ~ EditPersonalInformationForm ~ session:", session);
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file" && files[0]) {
      const file = files[0];
      const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxFileSize) {
        toast.error(
          `${
            name === "ProfileImage"
              ? "Profile image"
              : name === "nidImageFrontPart"
              ? "Front NID image"
              : "Back NID image"
          } exceeds 5MB limit.`
        );
        e.target.value = ""; // Clear the input
        return;
      }
    }
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
    setIsSubmitting(true);
    // Validate file sizes again (redundant but ensures robustness)
    if (form.ProfileImage && form.ProfileImage.size > maxFileSize) {
      toast.error("Profile image exceeds 5MB limit.");
      return;
    }
    if (form.nidImageFrontPart && form.nidImageFrontPart.size > maxFileSize) {
      toast.error("Front NID image exceeds 5MB limit.");
      return;
    }
    if (form.nidImageBackPart && form.nidImageBackPart.size > maxFileSize) {
      toast.error("Back NID image exceeds 5MB limit.");
      return;
    }

    // Append form data
    Object.entries(form).forEach(([key, value]) => {
      if (key === "dob" && !value) {
        return; // Skip empty dob
      }
      if (!value) {
        return; // Skip empty values
      }
      if (value !== null && value !== undefined) {
        // Special handling for date field
        if (key === "dob" && value) {
          // Convert date string to ISO format for proper backend handling
          const dateValue = new Date(value).toISOString();
          formData.append(key, dateValue);
        } else {
          formData.append(key, value);
        }
      }
    });

    try {
      const result = await updateUserPersonalInfo(
        formData,
        session?.accessToken || ""
      );
      if (result?.success) {
        console.log("Success:", result.data);
        setIsSubmitting(false);
        toast.success("Personal information updated successfully");
        // Update the session with the complete updated user data
        await update({
          ...session,
          user: {
            ...session.user,
            // Update specific fields that were changed
            name: result.data?.name || session.user.name,
            profileImage:
              result.data?.profileImage || session.user.profileImage,
            userPersonalInfo:
              result.data?.userPersonalInfo || session.user.userPersonalInfo,
            // Add any other fields that might have been updated
          },
        }); // Update session
        setForm(initialState);
        formRef.current?.reset();
        dispatch(closeModel());
      } else {
        console.log("result=======", result);
        throw new Error(result?.error || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Error:", error.response);
      setIsSubmitting(false);
      const errorMessage =
        error.response?.data?.message ||
        (error.message === "Request failed with status code 413"
          ? "File size exceeds the 2MB limit. Please upload smaller files."
          : "Failed to update personal information.");
      toast.error(errorMessage);
    }
  };

  return (
    <form
      ref={formRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      {/* Full Name */}
      <div className="relative flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">Full Name</label>
        <span className="absolute left-3 top-9 text-gray-400">
          <User className="w-5 h-5" />
        </span>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className={inputClass}
          placeholder="Enter full name"
        />
      </div>
      {/* Phone */}
      <div className="relative flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">Phone</label>
        <span className="absolute left-3 top-9 text-gray-400">
          <Phone className="w-5 h-5" />
        </span>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className={inputClass}
          placeholder="Enter phone number"
        />
      </div>
      {/* Date of Birth */}
      <div className="relative flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">
          Date of Birth
        </label>
        <span className="absolute left-3 top-9 text-gray-400">
          <Calendar className="w-5 h-5" />
        </span>
        <input
          type="date"
          name="dob"
          value={form.dob ? form.dob.substring(0, 10) : ""}
          onChange={handleChange}
          className={inputClass}
        />
      </div>
      {/* Blood Group */}
      <div className="relative flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">
          Blood Group
        </label>
        <span className="absolute left-3 top-9 text-gray-400">
          <Droplet className="w-5 h-5" />
        </span>
        <input
          type="text"
          name="bloodGroup"
          value={form.bloodGroup}
          onChange={handleChange}
          className={inputClass}
          placeholder="Enter blood group"
        />
      </div>
      {/* Gender */}
      <div className="relative flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">Gender</label>
        <span className="absolute left-3 top-9 text-gray-400">
          <Shield className="w-5 h-5" />
        </span>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      {/* National ID */}
      <div className="relative flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">
          National ID
        </label>
        <span className="absolute left-3 top-9 text-gray-400">
          <CreditCard className="w-5 h-5" />
        </span>
        <input
          type="text"
          name="nid"
          value={form.nid}
          onChange={handleChange}
          className={inputClass}
          placeholder="Enter NID"
        />
      </div>
      {/* Address */}
      <div className="relative flex flex-col gap-2 md:col-span-2">
        <label className="text-sm font-semibold text-gray-700">Address</label>
        <span className="absolute left-3 top-9 text-gray-400">
          <MapPin className="w-5 h-5" />
        </span>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          rows={3}
          className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 bg-gray-50 w-full resize-none"
          placeholder="Enter address"
        />
      </div>
      {/* Profile Image */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
          <ImageIcon className="w-4 h-4 text-blue-400" /> Profile Image
        </label>
        <input
          type="file"
          name="ProfileImage"
          accept="image/*"
          onChange={handleChange}
          className="rounded-xl border border-gray-200 px-4 py-2 bg-gray-50"
        />
      </div>
      {/* NID Image (Front) */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
          <ImageIcon className="w-4 h-4 text-blue-400" /> NID Image (Front)
        </label>
        <input
          type="file"
          name="nidImageFrontPart"
          accept="image/*"
          onChange={handleChange}
          className="rounded-xl border border-gray-200 px-4 py-2 bg-gray-50"
        />
      </div>
      {/* NID Image (Back) */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
          <ImageIcon className="w-4 h-4 text-blue-400" /> NID Image (Back)
        </label>
        <input
          type="file"
          name="nidImageBackPart"
          accept="image/*"
          onChange={handleChange}
          className="rounded-xl border border-gray-200 px-4 py-2 bg-gray-50"
        />
      </div>
      {/* Submit Button */}
      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow hover:scale-[1.02] transition-all duration-300"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default EditPersonalInformationForm;
