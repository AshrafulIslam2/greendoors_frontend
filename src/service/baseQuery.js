// service/baseQuery.js
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getSession } from "next-auth/react";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://147.79.70.138:3200/",
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    // Check if endpoint is public
    const isPublicEndpoint =
      endpoint?.includes("public") || endpoint === "getUserInfo"; // Make getUserInfo public

    if (!isPublicEndpoint) {
      // Try multiple sources for token
      let token = null;

      // 1. Try Redux state first
      const reduxToken =
        getState()?.auth?.token || getState()?.auth?.accessToken;

      // 2. Try NextAuth session
      if (!reduxToken) {
        try {
          const session = await getSession();
          token = session?.accessToken;
        } catch (error) {
          console.warn("Failed to get session:", error);
        }
      } else {
        token = reduxToken;
      }

      // 3. Try localStorage as fallback
      if (!token && typeof window !== "undefined") {
        token =
          localStorage.getItem("accessToken") || localStorage.getItem("token");
      }

      console.log("🚀 ~ token found:", !!token);
      console.log("🚀 ~ endpoint:", endpoint);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      } else {
        console.warn("No token found for protected endpoint:", endpoint);
      }
    }

    // Set content type
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export default baseQuery;
