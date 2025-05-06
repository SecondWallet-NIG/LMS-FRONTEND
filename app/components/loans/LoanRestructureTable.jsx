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

  const renderRows = () =>
    data.map((item) => (
      <tr
        key={item?._id}
        onClick={() =>
          router.push(`loan-applications/view-loan/${item?.loanId?._id}`)
        }
        className="border pt-2 pb-2 hover:bg-swLightGray h-20 px-4 cursor-pointer"
      >
        <td>{item?.createdAt && format(new Date(item?.createdAt), "PPP")}</td>
        <td>
          {item.oldTerms?.loanPackageId?.name} &gt;{" "}
          {item?.newTerms?.loanPackageId?.name}
        </td>
        <td>
          {item.oldTerms?.loanDuration}m &gt; {item?.newTerms?.loanDuration}m
        </td>
        <td>
          {item?.oldTerms?.interestRate}% &gt; {item?.newTerms?.interestRate}%
        </td>
        <td>
          {repaymentTypeData[item?.oldTerms?.repaymentType]} &gt;{" "}
          {repaymentTypeData[item?.newTerms?.repaymentType]}
        </td>
        <td>
          {item?.oldTerms?.loanFrequencyType} &gt;{" "}
          {item?.newTerms?.loanFrequencyType}
        </td>
        <td>
          ₦{item?.oldTerms?.loanAmount} &gt; ₦{item?.newTerms?.loanAmount}
        </td>
        <td>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              item?.status === "Approved"
                ? "bg-[#E8F7F0] text-[#107E4B]"
                : item?.status === "Pending"
                ? "bg-gray-200 text-gray-600"
                : item?.status === "Approval Requested"
                ? "bg-red-400 text-white"
                : item?.status === "Declined"
                ? "bg-red-500 text-white"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            {item?.status}
          </span>
        </td>
      </tr>
    ));

  const renderPagination = () => (
    <div className="flex items-center justify-between mt-4 text-sm">
      <span>
        Page {pagination.currentPage} of {pagination.totalPages}
      </span>
      <div className="flex gap-2">
        <button
          disabled={pagination.currentPage === 1}
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          className="px-2 py-1 bg-gray-100 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          disabled={pagination.currentPage === pagination.totalPages}
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          className="px-2 py-1 bg-gray-100 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold mb-4">Loan Restructure Requests</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border overflow-hidden">
            <thead>
              <tr className="bg-gray-100 py-3 px-2">
                {headers.map((header) => (
                  <th
                    key={header}
                    className={`capitalize text-md px-4 py-6 bg-gray-50 text-black border-0 font-[500] cursor-pointer text-start`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{renderRows()}</tbody>
          </table>
          {renderPagination()}
        </div>
      )}
    </div>
  );
}
