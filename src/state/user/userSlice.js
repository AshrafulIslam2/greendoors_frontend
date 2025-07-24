import baseQuery from "@/service/baseQuery";
import { createApi } from "@reduxjs/toolkit/query";

export const userApiSlice = createApi({
  reducerPath: "user",
  baseQuery: baseQuery,
  endpoints: (builder) => {
    return {
      getUserInfo: builder.query({
        query: () => ({
          url: "/user",
          method: "GET",
        }),
      }),
    };
  },
});

export const { useGetUserInfoQuery } = userApiSlice;
