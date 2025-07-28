// @/state/user/userSlice.js
import baseQuery from "@/service/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const userApiSlice = createApi({
  reducerPath: "user",
  baseQuery: baseQuery,
  tagTypes: ["User", "Member"],
  endpoints: (builder) => {
    return {
      getUserInfo: builder.query({
        query: ({ page = 1, limit = 8 } = {}) => ({
          url: "/user",
          method: "GET",
          params: { page, limit },
        }),
        providesTags: (result, error, arg) => [
          { type: "User", id: "LIST" },
          ...(result?.data || []).map(({ id }) => ({ type: "User", id })),
        ],
        transformResponse: (response) => {
          console.log("✅ Get Users Response:", response);
          return response;
        },
        transformErrorResponse: (response) => {
          console.error("❌ Get Users Error:", response);
          return response;
        },
      }),

      createMember: builder.mutation({
        query: (data) => ({
          url: "/user/create",
          method: "POST",
          body: data,
        }),
        invalidatesTags: [{ type: "User", id: "LIST" }, "Member"],
        transformResponse: (response) => {
          console.log("✅ Create Member Response:", response);
          return response;
        },
        transformErrorResponse: (response) => {
          console.error("❌ Create Member Error:", response);
          return response;
        },
      }),
    };
  },
});

export const {
  useGetUserInfoQuery,
  useLazyGetUserInfoQuery, // This is what you need for load more
  useCreateMemberMutation,
} = userApiSlice;
