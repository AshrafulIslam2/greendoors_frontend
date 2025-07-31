import baseQuery from "@/service/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const depositApiSlice = createApi({
  reducerPath: "deposit",
  baseQuery: baseQuery,
  tagTypes: ["Deposit"],
  endpoints: (builder) => ({
    // Add Deposit (POST /deposit)
    addDeposit: builder.mutation({
      query: (data) => ({
        url: "/deposit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Deposit", id: "LIST" }],
    }),

    // Get All Deposits (GET /deposit?page=1&limit=10)
    getDeposits: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/deposit?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: [{ type: "Deposit", id: "LIST" }],
    }),

    // Get Deposits by Member ID (GET /deposit/:id?page=1&limit=10)
    getDepositsByMemberId: builder.query({
      query: ({ memberId, page = 1, limit = 10 }) => ({
        url: `/deposit/${memberId}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "Deposit", id: arg.memberId },
      ],
    }),

    // Delete Deposit by ID (DELETE /deposit/:id)
    deleteDepositById: builder.mutation({
      query: (id) => ({
        url: `/deposit/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Deposit", id: "LIST" }],
    }),

    // Get Cash Balance for Association (POST /deposit/cashbalance)
    getCashBalance: builder.query({
      query: () => ({
        url: "/deposit/cashbalance",
        method: "POST",
      }),
      providesTags: [{ type: "Deposit", id: "CASH_BALANCE" }],
    }),

    // Get Cash Balance for Member (POST /deposit/cashbalance/:memberId)
    getMemberCashBalance: builder.query({
      query: (memberId) => ({
        url: `/deposit/cashbalance/${memberId}`,
        method: "POST",
      }),
      providesTags: (result, error, arg) => [
        { type: "Deposit", id: `CASH_BALANCE_${arg}` },
      ],
    }),
  }),
});

export const {
  useAddDepositMutation,
  useGetDepositsQuery,
  useGetDepositsByMemberIdQuery,
  useGetCashBalanceQuery,
  useGetMemberCashBalanceQuery,
  useDeleteDepositByIdMutation,
} = depositApiSlice;
