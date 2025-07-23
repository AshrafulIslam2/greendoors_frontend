"use client";

import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import Password from "@/component/Password";
import { signIn } from "next-auth/react"; // use client-side version
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = formData;
    console.log("🚀 ~ handleSubmit ~ password:", password);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });
    console.log("🚀 ~ handleSubmit ~ result:", result);

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push(result.url); // redirect on success
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-black rounded-xl mb-4 shadow-lg">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back
          </h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            <Password value={formData.password} onChange={handleChange} />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a
                href="/forgot-password"
                className="text-sm text-black hover:text-slate-700 font-medium transition-colors duration-200"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-br from-green-600 to-black text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
