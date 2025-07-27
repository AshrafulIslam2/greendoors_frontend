import React, { useState } from "react";
import {
  User,
  Calendar,
  FileText,
  Image as ImageIcon,
  DollarSign,
} from "lucide-react";

const initialState = {
  memberId: "",
  amount: "",
  depositDate: "",
  notes: "",
  depositSlip: null,
};

const inputClass =
  "pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 bg-gray-50 w-full";

const AddDepositForm = ({ memberIds = [], onSubmit }) => {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
    if (onSubmit) onSubmit(formData);
  };

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
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
        >
          <option value="">Select Member</option>
          {memberIds.map((id) => (
            <option key={id} value={id}>
              {id}
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
        />
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
        />
      </div>
      {/* Submit Button */}
      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-xl shadow hover:scale-[1.02] transition-all duration-300"
        >
          Add Deposit
        </button>
      </div>
    </form>
  );
};

export default AddDepositForm;
