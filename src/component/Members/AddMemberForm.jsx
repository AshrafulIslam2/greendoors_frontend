"use client";
import React, { useState } from "react";
// Adjust path as needed
import { toast } from "react-toastify";
import { User, Mail, Lock, DollarSign, Calendar, Hash } from "lucide-react";
import { useCreateMemberMutation } from "@/state/user/userSlice";
import { useDispatch } from "react-redux";
import { closeModel } from "@/state/helper_slice/modelOpenSlice";

const AddMemberForm = () => {
  const [formData, setFormData] = useState({
    memberId: "",
    name: "",
    email: "",
    password: "",
    registrationAmount: "",
    joiningDate: new Date().toISOString().split("T")[0], // Default to today
    role: "MEMBER", // Default role
  });
  const dispatch = useDispatch();
  const [createMember, { isLoading, error }] = useCreateMemberMutation();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.memberId ||
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      // Prepare data for backend
      const memberData = {
        memberId: formData.memberId,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        joiningDate: new Date(formData.joiningDate).toISOString(),
        role: formData.role,
        registrationAmount: formData.registrationAmount
          ? parseFloat(formData.registrationAmount)
          : undefined,
      };

      console.log("Submitting member data:", memberData);

      const result = await createMember(memberData).unwrap();

      toast.success("Member created successfully!");
      console.log("Created member:", result);

      // Reset form
      setFormData({
        memberId: "",
        name: "",
        email: "",
        password: "",
        registrationAmount: "",
        joiningDate: new Date().toISOString().split("T")[0],
        role: "MEMBER",
      });
      dispatch(closeModel());
    } catch (error) {
      console.error("Failed to create member:", error);

      // Handle specific error messages
      let errorMessage = "Failed to create member";

      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add New Member
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Member ID */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Member ID <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="memberId"
              value={formData.memberId}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter unique member ID"
            />
          </div>
        </div>

        {/* Name */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter member full name"
            />
          </div>
        </div>

        {/* Email */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter email address"
            />
          </div>
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter password (min 6 characters)"
            />
          </div>
        </div>

        {/* Registration Fee */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Registration Fee (Optional)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              name="registrationAmount"
              value={formData.registrationAmount}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter registration fee amount"
            />
          </div>
        </div>

        {/* Joining Date */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Joining Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* Role
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Member Type
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="MEMBER">Regular Member</option>
            <option value="PREMIUM">Premium Member</option>
            <option value="VIP">VIP Member</option>
          </select>
        </div> */}

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">
              {error?.data?.message ||
                error?.message ||
                "An error occurred while creating the member"}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Creating Member...
            </div>
          ) : (
            "Add Member"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddMemberForm;
