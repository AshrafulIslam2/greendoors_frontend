"use client";
import React, { useState } from "react";
import { Search, PlusCircle, Banknote } from "lucide-react";
import Link from "next/link";
import Model from "../shared/Model";
import AddDepositForm from "./AddDepositForm";
import { useDispatch, useSelector } from "react-redux";
import { openModel, closeModel } from "@/state/helper_slice/modelOpenSlice";

const mockDeposits = Array.from({ length: 60 }).map((_, i) => ({
  id: i + 1,
  memberId: `M-${String(i + 1).padStart(3, "0")}`,
  amount: Math.floor(Math.random() * 5000) + 1000,
  year: 2022 + (i % 3), // 2022, 2023, 2024
  fine: Math.floor(Math.random() * 200),
}));

const PAGE_SIZE = 10;

const uniqueYears = [...new Set(mockDeposits.map((d) => d.year))].sort(
  (a, b) => b - a
);

const Deposit = () => {
  const [page, setPage] = useState(1);
  const [filterYear, setFilterYear] = useState("");
  const dispatch = useDispatch();
  const isModelOpen = useSelector((state) => state.model.isModelOpen);

  // Filtering logic
  const filtered = mockDeposits.filter((d) =>
    filterYear ? d.year === Number(filterYear) : true
  );

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const totalDeposit = filtered.reduce((sum, d) => sum + d.amount, 0);
  const totalFine = filtered.reduce((sum, d) => sum + d.fine, 0);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

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
            onChange={(e) => {
              setFilterYear(e.target.value);
              setPage(1);
            }}
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
      </div>

      <div className="overflow-x-auto rounded-2xl shadow bg-gradient-to-br from-emerald-100 via-blue-50 to-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-emerald-200 to-blue-100 text-emerald-900">
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Member ID</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Fine</th>
              <th className="px-4 py-3 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-400">
                  No deposits found.
                </td>
              </tr>
            ) : (
              paginated.map((d, idx) => (
                <tr
                  key={d.id}
                  className="even:bg-gradient-to-r even:from-emerald-50 even:to-blue-50 odd:bg-white/80"
                >
                  <td className="px-4 py-2 font-medium text-emerald-700">
                    {(page - 1) * PAGE_SIZE + idx + 1}
                  </td>
                  <td className="px-4 py-2">{d.memberId}</td>
                  <td className="px-4 py-2 font-semibold text-emerald-800">
                    ৳ {d.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-red-600">
                    {d.fine > 0 ? `৳ ${d.fine}` : "-"}
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      href={`/deposits/${d.memberId}`}
                      className="inline-block px-4 py-1 rounded-full bg-emerald-500 text-white text-xs font-semibold hover:bg-emerald-600 transition"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr className="bg-gradient-to-r from-emerald-200 to-blue-100 font-bold">
              <td className="px-4 py-2" colSpan={2}>
                Total
              </td>
              <td className="px-4 py-2">৳ {totalDeposit.toLocaleString()}</td>
              <td className="px-4 py-2 text-red-700">
                ৳ {totalFine.toLocaleString()}
              </td>
              <td />
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
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded font-bold ${
              page === i + 1
                ? "bg-emerald-500 text-white"
                : "bg-emerald-50 text-emerald-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded bg-emerald-100 text-emerald-700 font-bold disabled:opacity-50"
        >
          Next
        </button>
      </div>
      {/* Modal for Add Deposit */}

      <Model modelTitle={"Add New Deposit"}>
        <AddDepositForm />
      </Model>
    </div>
  );
};

export default Deposit;
