import React, { useState } from "react";
import {
  User,
  Phone,
  Calendar,
  Droplet,
  Shield,
  CreditCard,
  MapPin,
  Image as ImageIcon,
  Mail,
} from "lucide-react";

const initialState = {
  name: "",
  phone: "",
  email: "",
  dob: "",
  address: "",
  nid: "",
  nidImageFrontPart: null,
  bloodGroup: "",
  gender: "",
  nidImageBackPart: null,
};

const inputClass =
  "pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 bg-gray-50 w-full";

const EditNomineeInformationForm = ({ onSubmit, defaultValues = {} }) => {
  const [form, setForm] = useState({ ...initialState, ...defaultValues });

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
      {/* Email */}
      <div className="relative flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">Email</label>
        <span className="absolute left-3 top-9 text-gray-400">
          <Mail className="w-5 h-5" />
        </span>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className={inputClass}
          placeholder="Enter email"
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
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditNomineeInformationForm;
