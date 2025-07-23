"use client";
import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

const Password = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label
        htmlFor="password"
        className="block text-sm font-semibold text-gray-700"
      >
        Password
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          value={value}
          onChange={onChange}
          className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
          placeholder="Enter your password"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Password;
