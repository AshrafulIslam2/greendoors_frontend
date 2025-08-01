import baseQuery from "@/service/baseQuery";
import { createApi } from "@reduxjs/toolkit/query";

export const LoginApiSlice = createApi({
  reducerPath: "login",
  baseQuery: baseQuery,
  tagTypes: ["login"],
  endpoints: (builder) => {
    return {
      publicLogin: builder.mutation({
        query: (user) => ({
          url: `/auth/login`,
          method: "POST",
          body: user,
        }),
      }),
      // publicForgotPassword: builder.mutation({
      //   query: (email) => ({
      //     url: `/auth/forgot-password`,
      //     method: "POST",
      //     body: { email },
      //   }),
      // }),
      // publicResetPassword: builder.mutation({
      //   query: ({ token, password }) => ({
      //     url: `/auth/reset-password`,
      //     method: "POST",
      //     body: { token, password },
      //   }),
      // }),
    };
  },
});

export const {
  usePublicLoginMutation,
  // usePublicForgotPasswordMutation,
  // usePublicResetPasswordMutation,
} = LoginApiSlice;
