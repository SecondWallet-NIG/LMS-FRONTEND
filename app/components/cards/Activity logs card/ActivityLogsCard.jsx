"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoanApplicationLogs } from "@/redux/slices/loanApplicationLogSlice";
import { useParams } from "next/navigation";
import { formatDate, formatTimeToAMPM } from "@/helpers";
import Link from "next/link";

const CustomerActivityLogsCard = ({ data }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const logs = useSelector((state) => state.loanApplicationLogs);

  useEffect(() => {
    dispatch(getLoanApplicationLogs(id));
  }, []);
  return (
    <main>
      {logs?.data?.data.map((item, index) => (
        <div className="flex" key={index}>
          <div className="flex gap-2 py-4 w-full">
            <div className="flex flex-col items-center">
              <div className={`p-1 rounded-full bg-purple-600`} />
              <div className="h-8 w-[0.6rem] border-2 border-gray-300 mt-1 ml-[0.35rem] border-r-0 border-t-0 rounded-bl-md" />
            </div>
            <div className="w-full">
              <div className="flex gap-3 -mt-2">
                <p className="pb-2 m-0 text-xs sm:text-sm">
                  {item.action === "UPDATE"
                    ? "Loan updated by "
                    : item.action === "LOAN_CREATION"
                    ? "Loan created by"
                    : ""}{" "}
                  {item?.updatedBy?.firstName} {item?.updatedBy?.lastName} with
                  email , {item?.updatedBy?.email} on{" "}
                  {formatDate(item?.createdAt.slice(0, 10))}
                </p>
              </div>
              {item.action === "UPDATE" ? (
                <div className="p-4 w-full bg-gray-100 mt-2 rounded-lg font-medium">
                  <div className="flex justify-between mb-2 text-sm sm:text-lg">
                    {item?.newValue?.hasOwnProperty("loanAmount") ? (
                      <p className="text-xs sm:text-sm text-swBlue">
                        Loan Amount updated from{" "}
                        <span>
                          ₦ {item?.oldValue?.loanAmount?.toLocaleString()} to ₦{" "}
                          {parseInt(
                            item?.newValue?.loanAmount
                          )?.toLocaleString()}
                        </span>
                      </p>
                    ) : null}
                    {item?.newValue?.hasOwnProperty("loanPackage") ? (
                      <p className="text-xs sm:text-sm text-swBlue">
                        Loan package updated to{" "}
                        <span>{item?.newValue?.loanPackage?.name}</span>
                      </p>
                    ) : null}

                    {item?.newValue?.hasOwnProperty("interestRate") ? (
                      <p className="text-xs sm:text-sm text-swBlue">
                        Loan interest rate updated from{" "}
                        {item?.oldValue?.interestRate * 100} % to{" "}
                        <span>{item?.newValue?.interestRate * 100} %</span>
                      </p>
                    ) : null}

                    {item?.newValue?.hasOwnProperty("createdBy") ? (
                      <p className="text-xs sm:text-sm text-swBlue">
                        Loan management has been reassigned to{" "}
                        <Link
                          className="underline"
                          href={`/team-management/staff/${item?.newValue?.createdBy}`}
                        >
                          User
                        </Link>
                      </p>
                    ) : null}

                    {item?.newValue?.hasOwnProperty("loanDuration") &&
                    item?.newValue?.hasOwnProperty("loanDurationMetrics") &&
                    item?.newValue?.hasOwnProperty("numberOfRepayment") ? (
                      <p className="text-xs sm:text-sm text-swBlue">
                        Loan duration updated from {item?.oldValue.loanDuration}{" "}
                        {item?.oldValue.loanDurationMetrics === "Monthly"
                          ? "Month(s)"
                          : "Years(s)"}{" "}
                        to{" "}
                        <span>
                          {item?.newValue.loanDuration}{" "}
                          {item?.newValue.loanDurationMetrics === "Monthly"
                            ? "Month(s)"
                            : "Years(s)"}
                        </span>
                      </p>
                    ) : null}

                    {item?.newValue?.hasOwnProperty("loanFrequencyType") &&
                    item?.newValue?.hasOwnProperty("numberOfRepayment") ? (
                      <p className="text-xs sm:text-sm text-swBlue">
                        Loan frequency type updated from{" "}
                        {item?.oldValue.loanFrequencyType} to{" "}
                        <span>{item?.newValue.loanFrequencyType} </span>
                      </p>
                    ) : null}

                    {item?.newValue?.hasOwnProperty("repaymentType") ? (
                      <p className="text-xs sm:text-sm text-swBlue">
                        Loan repayment type updated from{" "}
                        {item?.oldValue.repaymentType === "bulletRepayment"
                          ? "Bullet Repayment"
                          : item?.oldValue.repaymentType === "interestServicing"
                          ? "Interest Servicing"
                          : "Installment Payment"}{" "}
                        to{" "}
                        <span>
                          {" "}
                          {item?.newValue.repaymentType === "bulletRepayment"
                            ? "Bullet Repayment"
                            : item?.newValue.repaymentType ===
                              "interestServicing"
                            ? "Interest Servicing"
                            : "Installment Payment"}{" "}
                        </span>
                      </p>
                    ) : null}

                    {item?.newValue?.hasOwnProperty("collaterals") ? (
                      <p className="text-xs sm:text-sm text-swBlue">
                        Loan collateral document uploaded
                      </p>
                    ) : null}
                    {item?.newValue?.hasOwnProperty("loanAffidavit") ? (
                      <p className="text-xs sm:text-sm text-swBlue">
                        Loan affidavit document uploaded
                      </p>
                    ) : null}
                    {item?.newValue?.hasOwnProperty("guarantorForm") ? (
                      <p className="text-xs sm:text-sm text-swBlue">
                        Loan guarantor's form uploaded
                      </p>
                    ) : null}
                    {item?.newValue?.hasOwnProperty("applicationForm") ? (
                      <p className="text-xs sm:text-sm text-swBlue">
                        Loan application document uploaded
                      </p>
                    ) : null}
                  </div>
                </div>
              ) : item.action === "APPROVAL_REQUEST" ? (
                <div className="p-4 w-full bg-gray-100 mt-2 rounded-lg">
                  <p className="text-xs sm:text-sm text-swBlue  font-medium">
                    Approval request sent to {item?.newValue?.approvalTitle}
                  </p>
                  <p className="text-xs sm:text-sm mt-2">
                    View assignee{" "}
                    <Link
                      className="underline"
                      href={`/team-management/staff/${item?.newValue?.assignee}`}
                    >
                      Assignee
                    </Link>
                  </p>
                  <div className="flex justify-end text-xs font-medium text-green-500 sm:hidden">
                    {formatTimeToAMPM(item.createdAt)}
                  </div>
                </div>
              ) : item.action === "APPROVAL_DECLINE" ? (
                <div className="p-4 w-full bg-gray-100 mt-2 rounded-lg">
                  <p className="text-xs sm:text-sm text-swBlue font-medium">
                    {item?.newValue?.approvalTitle} declined approval request.
                  </p>
                  <p className="text-xs sm:text-sm mt-2">
                    View who declined the loan{" "}
                    <Link
                      className="underline"
                      href={`/team-management/staff/${item?.newValue?.assignee}`}
                    >
                      User
                    </Link>
                  </p>
                  <div className="flex justify-end text-xs font-medium text-green-500 sm:hidden">
                    {formatTimeToAMPM(item.createdAt)}
                  </div>
                </div>
              ) : item.action === "APPROVAL_SUCCESS" ? (
                <div className="p-4 w-full bg-gray-100 mt-2 rounded-lg">
                  <p className="text-xs sm:text-sm text-swBlue  font-medium">
                    {item?.newValue?.approvalTitle} approval done.
                  </p>
                  <p className="text-xs sm:text-sm mt-2">
                    View who approved the loan{" "}
                    <Link
                      className="underline"
                      href={`/team-management/staff/${item?.newValue?.assignee}`}
                    >
                      User
                    </Link>
                  </p>
                  <div className="flex justify-end text-xs font-medium text-green-500 sm:hidden">
                    {formatTimeToAMPM(item.createdAt)}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-xs sm:text-sm text-swBlue p-4 w-full bg-gray-100 mt-2 rounded-lg font-medium">
                    Loan created with Loan ID, SWL-{item?.newValue.loanId}
                    <div className="flex justify-end text-xs font-medium text-green-500 sm:hidden">
                      {formatTimeToAMPM(item.createdAt)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="text-xs hidden sm:block text-swGreen font-semibold whitespace-nowrap pt-3">
            {formatTimeToAMPM(item.createdAt)}
          </div>
        </div>
      ))}
    </main>
  );
};

export default CustomerActivityLogsCard;
