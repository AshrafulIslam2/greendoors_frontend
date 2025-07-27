"use client";
import React, { useState } from "react";

// Dummy data: 60 deposits, 6 users (M-001 to M-006), 10 deposits per user
const allDeposits = Array.from({ length: 60 }).map((_, i) => {
  const userIdx = Math.floor(i / 10) + 1;
  return {
    id: i + 1,
    memberId: `M-${String(userIdx).padStart(3, "0")}`,
    amount: Math.floor(Math.random() * 5000) + 1000,
    fine: Math.floor(Math.random() * 200),
    year: 2022 + (i % 3),
    month: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][i % 12],
  };
});

const PAGE_SIZE = 10;

const DepositDetailsPage = ({ params }) => {
  // Next.js 13/14: params.id from route
  const id = params?.id || "M-001";
  const [filterYear, setFilterYear] = useState("");
  const [page, setPage] = useState(1);

  // Filter deposits for this member
  const memberDeposits = allDeposits.filter((d) => d.memberId === id);
  const uniqueYears = [...new Set(memberDeposits.map((d) => d.year))].sort(
    (a, b) => b - a
  );

  // Filter by year if selected
  const filtered = memberDeposits.filter((d) =>
    filterYear ? d.year === Number(filterYear) : true
  );

  // Pagination
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  // Totals
  const totalDeposit = filtered.reduce((sum, d) => sum + d.amount, 0);
  const totalFine = filtered.reduce((sum, d) => sum + d.fine, 0);

  // Delete handler (removes from dummy array for demo)
  const [localDeposits, setLocalDeposits] = useState(filtered);

  const handleDelete = (depositId) => {
    const updated = localDeposits.filter((d) => d.id !== depositId);
    setLocalDeposits(updated);
  };

  // Keep localDeposits in sync with filtered data
  React.useEffect(() => {
    setLocalDeposits(filtered);
    setPage(1);
  }, [filterYear, id]);

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold text-emerald-700 mb-6">
        Deposit Details for <span className="text-blue-700">{id}</span>
      </h2>

      {/* Filter by Year */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg px-3 py-2 shadow border border-gray-100">
          <span className="text-emerald-400 font-bold">Year</span>
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
              <th className="px-4 py-3 text-left">Deposit ID</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Fine</th>
              <th className="px-4 py-3 text-left">Month</th>
              <th className="px-4 py-3 text-left">Year</th>
              <th className="px-4 py-3 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {localDeposits.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  No deposits found.
                </td>
              </tr>
            ) : (
              localDeposits
                .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
                .map((d) => (
                  <tr
                    key={d.id}
                    className="even:bg-gradient-to-r even:from-emerald-50 even:to-blue-50 odd:bg-white/80"
                  >
                    <td className="px-4 py-2 font-medium text-emerald-700">
                      {d.id}
                    </td>
                    <td className="px-4 py-2 font-semibold text-emerald-800">
                      ৳ {d.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-red-600">
                      {d.fine > 0 ? `৳ ${d.fine}` : "-"}
                    </td>
                    <td className="px-4 py-2">{d.month}</td>
                    <td className="px-4 py-2">{d.year}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete(d.id)}
                        className="inline-block px-4 py-1 rounded-full bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
          <tfoot>
            <tr className="bg-gradient-to-r from-emerald-200 to-blue-100 font-bold">
              <td className="px-4 py-2" colSpan={1}>
                Total
              </td>
              <td className="px-4 py-2">৳ {totalDeposit.toLocaleString()}</td>
              <td className="px-4 py-2 text-red-700">
                ৳ {totalFine.toLocaleString()}
              </td>
              <td colSpan={3} />
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
    </div>
  );
};

export default DepositDetailsPage;
