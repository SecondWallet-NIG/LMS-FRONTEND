"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import { format } from "date-fns";
import { FiEdit2 } from "react-icons/fi";
import Link from "next/link";
import { FaRegTrashAlt } from "react-icons/fa";
import { createLoanAuthRoles } from "../components/helpers/pageAuthRoles";

const SavedLoans = () => {
  const [allSavedLoans, setAllSavedLoans] = useState([]);
  const [checkedLoans, setCheckedLoans] = useState([]);

  const getAllSavedLoans = () => {
    const saved = localStorage.getItem("savedLoans");
    const savedLoans = saved ? JSON.parse(saved) : null;
    if (savedLoans) {
      setAllSavedLoans(savedLoans);
    }
  };

  useEffect(() => {
    getAllSavedLoans();
  }, []);

  const handleCheckAll = () => {
    if (checkedLoans.length === allSavedLoans.length) {
      setCheckedLoans([]);
    } else {
      setCheckedLoans(allSavedLoans.map((_, index) => index));
    }
  };

  const handleDeleteAll = () => {
    localStorage.setItem("savedLoans", JSON.stringify([]));
    setCheckedLoans([]);
    getAllSavedLoans();
  };

  const handleCheckbox = (e, index) => {
    if (e.target.checked) {
      setCheckedLoans((prev) => [...prev, index]);
    } else {
      setCheckedLoans((prev) => prev.filter((item) => item !== index));
    }
  };

  const handleDelete = (checkIndex) => {
    const newSavedLoans = allSavedLoans.filter(
      (_, index) => index !== checkIndex
    );
    setCheckedLoans((prev) => prev.filter((item) => item !== checkIndex));
    localStorage.setItem("savedLoans", JSON.stringify(newSavedLoans));
    getAllSavedLoans();
  };

  return (
    <DashboardLayout paths={["Saved Loans"]} roles={createLoanAuthRoles}>
      <div className="p-5 overflow-x-auto">
        <table className="w-full">
          {/* px-5 py-4 bg-swightGray text-swGray border-0 font-[500] cursor-pointer text-start */}
          <thead className="bg-swLightGray text-swGray font-[500] cursor-pointer text-start">
            <tr className="">
              <td className="px-5 py-4 border-0">
                <div className="flex gap-5 items-center">
                  <input
                    type="checkbox"
                    checked={
                      checkedLoans.length > 0 &&
                      checkedLoans.length === allSavedLoans.length
                    }
                    className="h-5 w-5"
                    onChange={(e) => handleCheckAll(e)}
                  />

                  <p>Date and Time</p>
                </div>
              </td>
              <td className="px-5 py-4 border-0">
                Borrower first and last names
              </td>
              <td className="px-5 py-4 border-0">
                <div className="flex items-center gap-12">
                  Action{" "}
                  <div
                    className={`relative flex gap-2 items-center rounded-xl border-2 border-transparent text-red-500 hover:bg-white hover:border-red-300 w-fit py-2 px-4 cursor-pointer  ${
                      checkedLoans.length > 0 &&
                      checkedLoans.length === allSavedLoans.length
                        ? "opacity-100"
                        : "cursor-not-allowed opacity-0 pointer-events-none"
                    }`}
                    onClick={handleDeleteAll}
                  >
                    <FaRegTrashAlt size={20} />
                  </div>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            {allSavedLoans.length > 0 ? (
              allSavedLoans.map((loan, index) => (
                <tr
                  key={loan.id}
                  className="hover:bg-swLightGray cursor-pointer"
                >
                  <td className="px-5 py-4 border-0">
                    <div className="flex gap-5 items-center">
                      <input
                        type="checkbox"
                        checked={checkedLoans.includes(index)}
                        className="h-5 w-5"
                        onChange={(e) => handleCheckbox(e, index)}
                      />
                      <div>
                        <p>{format(new Date(loan?.savedAt), "PPP")}</p>
                        <p>{format(new Date(loan?.savedAt), "h:mm a")}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 border-0">
                    <Link
                      href={`/borrowers/profile/${loan?.selectedCustomer?._id}`}
                      className="flex gap-5 items-center hover:underline text-lg font-medium capitalize"
                    >
                      <p>
                        {loan?.selectedCustomer?.lastName}{" "}
                        {loan?.selectedCustomer?.firstName}
                      </p>
                    </Link>
                  </td>
                  <td className="px-5 py-4 border-0">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/saved-loans/${index}`}
                        className="flex gap-2 items-center rounded-xl border-2 border-transparent text-swBlue hover:bg-white hover:border-blue-300 w-fit py-2 px-4 cursor-pointer"
                      >
                        Edit <FiEdit2 size={20} />
                      </Link>

                      <div
                        className={`relative flex gap-2 items-center rounded-xl border-2 border-transparent text-red-500 hover:bg-white hover:border-red-300 w-fit py-2 px-4 cursor-pointer  ${
                          checkedLoans.includes(index)
                            ? "opacity-100"
                            : "cursor-not-allowed opacity-0 pointer-events-none"
                        }`}
                        onClick={() => handleDelete(index)}
                      >
                        <FaRegTrashAlt size={20} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="p-10">
                <td
                  colSpan={3}
                  className="w-full text-center text-lg font-medium p-10"
                >
                  No saved loans
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default SavedLoans;
