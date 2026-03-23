// components/LoanRestructureTable.tsx
"use client";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const repaymentTypeData = {
  bulletRepayment: "Bullet Repayment",
  interestServicing: "Interest Servicing",
  installmentPayment: "Installment Payment",
};

const headers = [
  "Date Requested",
  "Loan Package",
  "Loan Duration",
  "Interest Rate",
  "Repayment Type",
  "Loan Frequency Type",
  "Loan Amount",
  "Status",
];

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoanRestructureTable() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalDocuments: 0,
    perPage: 15,
  });
  const [loading, setLoading] = useState(false);

  let user;
  if (typeof window !== "undefined") {
    user = JSON.parse(localStorage.getItem("user"));
  }

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/loan-restructure/all`,
        {
          params: {
            page,
            per_page: 15,
            sortedBy: "-createdAt",
          },
          headers: {
            Authorization: `Bearer ${user?.data?.token}`,
          },
        }
      );

      setData(data?.data?.loanRestructureRequests || []);
      setPagination({
        currentPage: data?.data?.links.currentPage,
        totalPages: data?.data?.links.totalPages,
        totalDocuments: data?.data?.links.totalDocuments,
        perPage: data?.data?.links.totalPerPage,
      });
    } catch (error) {
      console.error("Failed to fetch loan restructures:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.currentPage);
  }, []);

  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.totalPages) return;
    fetchData(page);
  };

  const renderRows = () => {
    if (!data?.length) {
      return (
        <tr>
          <td
            colSpan={headers.length}
            className="px-4 py-10 text-center text-sm text-swGrey200"
          >
            No loan restructure requests found.
          </td>
        </tr>
      );
    }

    return data.map((item) => (
      <tr
        key={item?._id}
        onClick={() => {
          router.push(`loan-applications/view-loan/${item?.loanId?._id}`);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            router.push(`loan-applications/view-loan/${item?.loanId?._id}`);
          }
        }}
        className="cursor-pointer transition-colors hover:bg-swLightGray/60"
      >
        <td className="whitespace-nowrap px-4 py-4 text-sm text-swGrey500">
          {item?.createdAt ? format(new Date(item.createdAt), "PPP") : "—"}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-sm text-swGrey500">
          {item?.oldTerms?.loanPackageId?.name || "—"} &gt;{" "}
          {item?.newTerms?.loanPackageId?.name || "—"}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-sm text-swGrey500">
          {item?.oldTerms?.loanDuration ?? "—"}m &gt;{" "}
          {item?.newTerms?.loanDuration ?? "—"}m
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-sm text-swGrey500">
          {item?.oldTerms?.interestRate ?? "—"}% &gt;{" "}
          {item?.newTerms?.interestRate ?? "—"}%
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-sm text-swGrey500">
          {repaymentTypeData[item?.oldTerms?.repaymentType] || "—"} &gt;{" "}
          {repaymentTypeData[item?.newTerms?.repaymentType] || "—"}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-sm text-swGrey500">
          {item?.oldTerms?.loanFrequencyType || "—"} &gt;{" "}
          {item?.newTerms?.loanFrequencyType || "—"}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-sm text-swGrey500">
          ₦{item?.oldTerms?.loanAmount ?? "—"} &gt; ₦
          {item?.newTerms?.loanAmount ?? "—"}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-sm">
          <span
            className={[
              "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold",
              item?.status === "Approved"
                ? "border-[#107E4B]/20 bg-[#E8F7F0] text-[#107E4B]"
                : item?.status === "Pending"
                ? "border-gray-200 bg-gray-100 text-gray-600"
                : item?.status === "Approval Requested"
                ? "border-red-300 bg-red-400 text-white"
                : item?.status === "Declined"
                ? "border-red-400 bg-red-500 text-white"
                : "border-gray-200 bg-gray-100 text-gray-700",
            ].join(" ")}
          >
            {item?.status || "—"}
          </span>
        </td>
      </tr>
    ));
  };

  const renderPagination = () => (
    <div className="flex items-center justify-between mt-4 text-sm">
      <span>
        Page {pagination.currentPage} of {pagination.totalPages}
      </span>
      <div className="flex gap-2">
        <button
          disabled={pagination.currentPage === 1}
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-swGrey400 transition hover:bg-swLightGray/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <button
          disabled={pagination.currentPage === pagination.totalPages}
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-swGrey400 transition hover:bg-swLightGray/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full p-4">
      <div className="mb-4 rounded-2xl border border-gray-100/90 bg-white p-4 shadow-sm">
        <h2 className="text-xl font-semibold">Loan Restructure Requests</h2>
        <p className="mt-1 text-xs text-swGrey200">
          Click a row to open the linked loan application.
        </p>
      </div>
      {loading ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 text-sm text-swGrey200">
          Loading...
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse overflow-hidden rounded-xl bg-white">
            <thead>
              <tr className="bg-swLightGray/70">
                {headers.map((header) => (
                  <th
                    key={header}
                    className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-swGray"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">{renderRows()}</tbody>
          </table>
          {renderPagination()}
        </div>
      )}
    </div>
  );
}
