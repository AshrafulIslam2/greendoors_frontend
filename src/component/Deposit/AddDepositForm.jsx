"use client";
import React, { useState } from "react";
import {
  User,
  Calendar,
  FileText,
  Image as ImageIcon,
  DollarSign,
  CheckSquare,
} from "lucide-react";
import { useGetMemberListQuery } from "@/state/user/userSlice";
import { useAddDepositMutation } from "@/state/deposit/depositApiSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { closeModel } from "@/state/helper_slice/modelOpenSlice";

const initialState = {
  memberId: "",
  amount: "",
  depositDate: "",
  notes: "",
  depositSlip: null,
  is_fine_waived: false,
};

const inputClass =
  "pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 bg-gray-50 w-full";

const AddDepositForm = () => {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  // Fetch member list
  const {
    data: memberData,
    isLoading: isMembersLoading,
    error: membersError,
  } = useGetMemberListQuery();

  // Add deposit mutation
  const [addDeposit, { isLoading: isSubmitting, error: submitError }] =
    useAddDepositMutation();

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await addDeposit(form).unwrap();
      console.log("Deposit added successfully:", result);
      toast.success("Deposit added successfully!");
      dispatch(closeModel());
      // Reset form on success
      setForm(initialState);

      // // Call onSubmit callback if provided
      // if (onSubmit) onSubmit(result);
    } catch (error) {
      console.error("Failed to add deposit:", error);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // Prevent default if not in textarea or if shift is not pressed
      if (e.target.tagName !== "TEXTAREA") {
        e.preventDefault();
        handleSubmit(e);
      }
    }
  };

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      encType="multipart/form-data"
    >
      {/* Error message */}
      {submitError && (
        <div className="md:col-span-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          <p className="text-sm font-medium">
            Error: {submitError?.data?.message || "Failed to add deposit"}
          </p>
        </div>
      )}

      {/* Member ID */}
      <div className="relative flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">Member ID</label>
        <span className="absolute left-3 top-9 text-gray-400">
          <User className="w-5 h-5" />
        </span>
        <select
          name="memberId"
          value={form.memberId}
          onChange={handleChange}
          className={inputClass}
          required
          disabled={isMembersLoading || isSubmitting}
        >
          <option value="">
            {isMembersLoading ? "Loading members..." : "Select Member"}
          </option>
          {membersError && (
            <option value="" disabled>
              Error loading members
            </option>
          )}
          {memberData?.data?.map((member, index) => (
            <option key={index} value={member}>
              {member}
            </option>
          ))}
        </select>
      </div>

      {/* Amount */}
      <div className="relative flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">Amount</label>
        <span className="absolute left-3 top-9 text-gray-400">
          <DollarSign className="w-5 h-5" />
        </span>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          className={inputClass}
          placeholder="Enter amount"
          min="0"
          step="0.01"
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Deposit Date */}
      <div className="relative flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">
          Deposit Date
        </label>
        <span className="absolute left-3 top-9 text-gray-400">
          <Calendar className="w-5 h-5" />
        </span>
        <input
          type="date"
          name="depositDate"
          value={form.depositDate}
          onChange={handleChange}
          className={inputClass}
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Fine Waved Checkbox */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="is_fine_waived"
          checked={form.is_fine_waived}
          onChange={handleChange}
          className="w-5 h-5 text-emerald-600 bg-gray-50 border-gray-200 rounded focus:ring-emerald-500 focus:ring-2"
          id="is_fine_waived"
          disabled={isSubmitting}
        />
        <label
          htmlFor="is_fine_waived"
          className="text-sm font-semibold text-gray-700 flex items-center gap-2"
        >
          <CheckSquare className="w-4 h-4 text-emerald-400" />
          Fine Waved
        </label>
      </div>

      {/* Notes */}
      <div className="relative flex flex-col gap-2 md:col-span-2">
        <label className="text-sm font-semibold text-gray-700">Notes</label>
        <span className="absolute left-3 top-9 text-gray-400">
          <FileText className="w-5 h-5" />
        </span>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 bg-gray-50 w-full resize-none"
          placeholder="Enter notes (optional)"
          disabled={isSubmitting}
        />
      </div>

      {/* Deposit Slip */}
      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
          <ImageIcon className="w-4 h-4 text-emerald-400" /> Deposit Slip
        </label>
        <input
          type="file"
          name="depositSlip"
          accept="image/*,application/pdf"
          onChange={handleChange}
          className="rounded-xl border border-gray-200 px-4 py-2 bg-gray-50"
          disabled={isSubmitting}
        />
      </div>

      {/* Submit Button */}
      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-xl shadow hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          disabled={isMembersLoading || isSubmitting}
        >
          {isSubmitting
            ? "Adding Deposit..."
            : isMembersLoading
            ? "Loading..."
            : "Add Deposit"}
        </button>
      </div>
    </form>
  );
};

export default AddDepositForm;
