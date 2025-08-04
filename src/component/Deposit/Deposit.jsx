"use client";
import React, { useState } from "react";
import { Search, PlusCircle, Banknote, Trash2 } from "lucide-react";
import Link from "next/link";
import Model from "../shared/Model";
import AddDepositForm from "./AddDepositForm";
import { useDispatch, useSelector } from "react-redux";
import { openModel, closeModel } from "@/state/helper_slice/modelOpenSlice";
import { useGetDepositsQuery } from "@/state/deposit/depositApiSlice";

const PAGE_SIZE = 10;

const Deposit = () => {
  const [page, setPage] = useState(1);
  const [filterYear, setFilterYear] = useState("");
  const dispatch = useDispatch();
  const isModelOpen = useSelector((state) => state.model.isModelOpen);

  // Fetch deposits from API
  const {
    data: depositsData,
    isLoading,
    error,
    refetch,
  } = useGetDepositsQuery({
    page,
    limit: PAGE_SIZE,
  });

  // Extract data from API response
  const deposits = depositsData?.data || [];
  const totalCount = depositsData?.pagination?.totalCount || 0;
  console.log("🚀 ~ Deposit ~ totalCount:", totalCount);
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  console.log("🚀 ~ Deposit ~ totalPages:", totalPages);

  // Get unique years for filtering (from current data)
  const uniqueYears = [
    ...new Set(
      deposits.map((d) => {
        const date = new Date(d.depositDate || d.createdAt);
        return date.getFullYear();
      })
    ),
  ].sort((a, b) => b - a);

  // Filter by year (client-side filtering for current page data)
  const filteredDeposits = deposits.filter((d) => {
    if (!filterYear) return true;
    const date = new Date(d.depositDate || d.createdAt);
    return date.getFullYear() === Number(filterYear);
  });

  // Calculate totals for current filtered data
  const totalDeposit = filteredDeposits.reduce(
    (sum, d) => sum + (Number(d.amount) || 0),
    0
  );
  // const totalFine = filteredDeposits.reduce(
  //   (sum, d) => sum + (Number(d.fine) || 0),
  //   0
  // );

  const handleYearFilter = (year) => {
    setFilterYear(year);
    setPage(1); // Reset to first page when filtering
  };

  const handleDelete = (depositId) => {
    if (window.confirm("Are you sure you want to delete this deposit?")) {
      // Add your delete logic here
      console.log("Deleting deposit with ID:", depositId);
      // You'll need to implement the delete API call
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
          <p className="font-medium">Error loading deposits</p>
          <p className="text-sm">
            {error?.data?.message || "Something went wrong"}
          </p>
          <button
            onClick={refetch}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-emerald-700 flex items-center gap-2">
          <Banknote className="w-6 h-6 text-emerald-500" /> Deposits
        </h2>
        <button
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:scale-105 transition"
          onClick={() => dispatch(openModel())}
        >
          <PlusCircle className="w-5 h-5" /> Add Deposit
        </button>
      </div>

      {/* Filter by Year */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg px-3 py-2 shadow border border-gray-100">
          <Search className="w-4 h-4 text-emerald-400" />
          <select
            value={filterYear}
            onChange={(e) => handleYearFilter(e.target.value)}
            className="outline-none bg-transparent text-emerald-700"
          >
            <option value="">All Years</option>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Show total count */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Total Records: {totalCount}</span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow bg-gradient-to-br from-emerald-100 via-blue-50 to-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-emerald-200 to-blue-100 text-emerald-900">
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Member ID</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Late Fine</th>
              <th className="px-4 py-3 text-left">Fine Waved</th>
              <th className="px-4 py-3 text-left">Notes</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeposits.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-400">
                  No deposits found.
                </td>
              </tr>
            ) : (
              filteredDeposits.map((deposit, idx) => (
                <tr
                  key={deposit.id || idx}
                  className="even:bg-gradient-to-r even:from-emerald-50 even:to-blue-50 odd:bg-white/80"
                >
                  <td className="px-4 py-2 font-medium text-emerald-700">
                    {(page - 1) * PAGE_SIZE + idx + 1}
                  </td>
                  <td className="px-4 py-2 font-semibold">
                    {deposit.memberId || "N/A"}
                  </td>
                  <td className="px-4 py-2 font-semibold text-emerald-800">
                    ৳ {Number(deposit.amount || 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    {deposit.depositDate
                      ? new Date(deposit.depositDate).toLocaleDateString()
                      : new Date(deposit.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        (deposit.lateFee?.amount || 0) > 0
                          ? "bg-green-100 text-red-800"
                          : "bg-red-100 text-green-800"
                      }`}
                    >
                      {deposit.lateFee?.amount || 0}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        deposit.is_fine_waved
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {deposit.is_fine_waved ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-4 py-2 max-w-xs truncate">
                    {deposit.notes || "-"}
                  </td>
                  <td className="px-4 py-2  space-y-2 sm:space-x-2">
                    <Link
                      href={`/deposits/${deposit.memberId || deposit.id}`}
                      className="inline-block px-4 py-1 rounded-full bg-emerald-500 text-white text-xs font-semibold hover:bg-emerald-600 transition"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() => handleDelete(deposit.id)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr className="bg-gradient-to-r from-emerald-200 to-blue-100 font-bold">
              <td className="px-4 py-2" colSpan={2}>
                Total (Current Page)
              </td>
              <td className="px-4 py-2">৳ {totalDeposit.toLocaleString()}</td>
              <td colSpan={1} className="px-4 py-2">
                {filteredDeposits.length} records
              </td>
              <td className="px-4 py-2" colSpan={4}>
                {filteredDeposits
                  .reduce(
                    (acc, deposit) =>
                      acc + Number(deposit.lateFee?.amount || 0),
                    0
                  )
                  .toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-emerald-100 text-emerald-700 font-bold disabled:opacity-50"
        >
          Prev
        </button>

        {/* Show page numbers */}
        {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (page <= 3) {
            pageNum = i + 1;
          } else if (page >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = page - 2 + i;
          }

          return (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`px-3 py-1 rounded font-bold ${
                page === pageNum
                  ? "bg-emerald-500 text-white"
                  : "bg-emerald-50 text-emerald-700"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded bg-emerald-100 text-emerald-700 font-bold disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Show pagination info */}
      <div className="text-center mt-4 text-sm text-gray-600">
        Showing {(page - 1) * PAGE_SIZE + 1} to{" "}
        {Math.min(page * PAGE_SIZE, totalCount)} of {totalCount} entries
      </div>

      {/* Modal for Add Deposit */}
      <Model modelTitle={"Add New Deposit"}>
        <AddDepositForm />
      </Model>
    </div>
  );
};

export default Deposit;
