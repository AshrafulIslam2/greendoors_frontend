"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Banknote, Calendar, User, FileText } from "lucide-react";
import { useGetDepositsByMemberIdQuery } from "@/state/deposit/depositApiSlice";

const PAGE_SIZE = 10;

const DepositDetails = () => {
  const params = useParams();
  const router = useRouter();
  const [page, setPage] = useState(1);

  const memberId = params.id;

  const {
    data: depositsData,
    isLoading,
    error,
    refetch,
  } = useGetDepositsByMemberIdQuery({
    memberId,
    page,
    limit: PAGE_SIZE,
  });

  const deposits = depositsData?.data || [];
  const totalCount = depositsData?.pagination?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // Calculate totals
  const totalAmount = deposits.reduce(
    (sum, d) => sum + (Number(d.amount) || 0),
    0
  );
  const totalLateFees = deposits.reduce(
    (sum, d) => sum + (Number(d.lateFee?.amount) || 0),
    0
  );

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
          <p className="font-medium">Error loading deposit details</p>
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
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-emerald-700 flex items-center gap-2">
          <User className="w-6 h-6 text-emerald-500" />
          Member Deposits - {memberId}
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-emerald-100 to-emerald-50 rounded-xl p-4 border border-emerald-200">
          <div className="flex items-center gap-2">
            <Banknote className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">
              Total Deposits
            </span>
          </div>
          <p className="text-2xl font-bold text-emerald-800 mt-1">
            ৳ {totalAmount.toLocaleString()}
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-100 to-red-50 rounded-xl p-4 border border-red-200">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-red-600" />
            <span className="text-sm font-medium text-red-700">
              Total Late Fees
            </span>
          </div>
          <p className="text-2xl font-bold text-red-800 mt-1">
            ৳ {totalLateFees.toLocaleString()}
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              Total Records
            </span>
          </div>
          <p className="text-2xl font-bold text-blue-800 mt-1">{totalCount}</p>
        </div>
      </div>

      {/* Deposits Table */}
      <div className="overflow-x-auto rounded-2xl shadow bg-gradient-to-br from-emerald-100 via-blue-50 to-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-emerald-200 to-blue-100 text-emerald-900">
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Late Fine</th>
              <th className="px-4 py-3 text-left">Fine Waived</th>
              <th className="px-4 py-3 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {deposits.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  No deposits found for this member.
                </td>
              </tr>
            ) : (
              deposits.map((deposit, idx) => (
                <tr
                  key={deposit.id || idx}
                  className="even:bg-gradient-to-r even:from-emerald-50 even:to-blue-50 odd:bg-white/80"
                >
                  <td className="px-4 py-2 font-medium text-emerald-700">
                    {(page - 1) * PAGE_SIZE + idx + 1}
                  </td>
                  <td className="px-4 py-2 font-semibold text-emerald-800">
                    ৳ {Number(deposit.amount || 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    {deposit.depositDate
                      ? new Date(deposit.depositDate).toLocaleDateString()
                      : new Date(deposit.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-2 sm:px-4 sm:py-2">
                    <span
                      className={`px-1 sm:px-2 sm:py-1 rounded-full text-xs font-semibold ${
                        (deposit.lateFee?.amount || 0) > 0
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      ৳ {deposit.lateFee?.amount || 0}
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
                  <td className="px-4 py-2 max-w-xs">{deposit.notes || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded bg-emerald-100 text-emerald-700 font-bold disabled:opacity-50"
          >
            Prev
          </button>

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
      )}

      {/* Pagination Info */}
      {totalCount > 0 && (
        <div className="text-center mt-4 text-sm text-gray-600">
          Showing {(page - 1) * PAGE_SIZE + 1} to{" "}
          {Math.min(page * PAGE_SIZE, totalCount)} of {totalCount} entries
        </div>
      )}
    </div>
  );
};

export default DepositDetails;
