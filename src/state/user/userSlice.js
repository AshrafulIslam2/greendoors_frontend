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
      getUserById: builder.query({
        query: (id) => ({
          url: `/user/member/${id}`,
          method: "GET",
        }),
        providesTags: (result, error, arg) => [{ type: "User", id: arg }],
        transformResponse: (response) => {
          console.log("✅ Get User By ID Response:", response);
          return response;
        },
        transformErrorResponse: (response) => {
          console.error("❌ Get User By ID Error:", response);
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

      deleteUser: builder.mutation({
        query: ({ userId, reason }) => ({
          url: `/user/${userId}`,
          method: "DELETE",
          body: { reason },
        }),
        invalidatesTags: (result, error, arg) => [
          { type: "User", id: "LIST" },
          { type: "User", id: arg.userId },
          "Member",
        ],
        transformResponse: (response) => {
          console.log("✅ Delete User Response:", response);
          return response;
        },
        transformErrorResponse: (response) => {
          console.error("❌ Delete User Error:", response);
          return response;
        },
      }),
      publicForgotPassword: builder.mutation({
        query: (data) => ({
          url: `/auth/forgot-password`,
          method: "POST",
          body: { email: data.email },
        }),
      }),
      publicResetPassword: builder.mutation({
        query: ({ token, password }) => ({
          url: `/auth/reset-password`,
          method: "POST",
          body: { token, password },
        }),
      }),
      getMemberList: builder.query({
        query: () => ({
          url: "/user/member-list",
          method: "GET",
        }),
      }),
    };
  },
});

export const {
  useGetUserInfoQuery,
  useLazyGetUserInfoQuery, // This is what you need for load more
  useCreateMemberMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useGetMemberListQuery,
  usePublicForgotPasswordMutation,
  usePublicResetPasswordMutation,
} = userApiSlice;
