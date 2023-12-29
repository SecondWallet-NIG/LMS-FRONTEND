"use clients";
import { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getLoanApplicationLogs } from "@/redux/slices/loanApplicationLogSlice";
import { useParams } from "next/navigation";
import { formatDate, formatTimeToAMPM } from "@/helpers";

const CustomerActivityLogsCard = ({ data }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const logs = useSelector((state) => state.loanApplicationLogs);
  console.log({ logs: logs?.data?.data });
  data = [
    {
      loan_state: "disbursed",
      by: {
        id: "JDL-287301",
        name: "Benjamin franklin",
        profile_pic: "https://cdn-icons-png.flaticon.com/512/4128/4128349.png",
      },
      amount: 25000000,
      duration: "6 months",
    },
  ];

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
                <p className="pb-2 m-0 text-sm">
                  {item.action === "UPDATE"
                    ? "Loan updated by "
                    : item.action === "CREATE"
                    ? "Loan created by"
                    : ""}{" "}
                  {item.updatedBy.firstName} {item.updatedBy.lastName} with
                  email , {item.updatedBy.email} on{" "}
                  {formatDate(item?.createdAt.slice(0, 10))}
                </p>
              </div>
              <div className="p-4 w-full bg-gray-100 mt-2 rounded-lg font-medium">
                <div className="flex justify-between mb-2 text-lg">
                  {item?.newValue?.hasOwnProperty("loanAmount") ? (
                    <p className="text-sm text-swBlue">
                      Loan Amount updated from{" "}
                      <span>
                        ₦ {item?.oldValue?.loanAmount?.toLocaleString()} to ₦{" "}
                        {parseInt(item?.newValue?.loanAmount)?.toLocaleString()}
                      </span>
                    </p>
                  ) : null}
                  {item?.newValue?.hasOwnProperty("loanPackage") ? (
                    <p className="text-sm text-swBlue">
                      Loan package updated to{" "}
                      <span>{item?.newValue?.loanPackage?.name}</span>
                    </p>
                  ) : null}

                  {item?.newValue?.hasOwnProperty("interestRate") ? (
                    <p className="text-sm text-swBlue">
                      Loan interest rate updated from{" "}
                      {item?.oldValue?.interestRate * 100} % to{" "}
                      <span>{item?.newValue?.interestRate * 100} %</span>
                    </p>
                  ) : null}

                  {item?.newValue?.hasOwnProperty("repaymentType") ? (
                    <p className="text-sm text-swBlue">
                      Loan repayment type updated to{" "}
                      <span>
                        {item?.newValue?.repaymentType == "interestServicing"
                          ? "Interest Servicing"
                          : item?.newValue?.repaymentType ==
                            "installmentPayment"
                          ? "Installment Payment"
                          : "Bullet Repayment"}
                      </span>
                    </p>
                  ) : null}

                  {item?.newValue?.hasOwnProperty("collaterals") ? (
                    <p className="text-sm text-swBlue">
                      Loan collateral document uploaded
                    </p>
                  ) : null}
                     {item?.newValue?.hasOwnProperty("loanAffidavit") ? (
                    <p className="text-sm text-swBlue">
                      Loan affidavit document uploaded
                    </p>
                  ) : null}
                     {item?.newValue?.hasOwnProperty("guarantorForm") ? (
                    <p className="text-sm text-swBlue">
                      Loan guarantor's form uploaded
                    </p>
                  ) : null}
                     {item?.newValue?.hasOwnProperty("applicationForm") ? (
                    <p className="text-sm text-swBlue">
                      Loan application document uploaded
                    </p>
                  ) : null}

                </div>
              </div>
            </div>
          </div>
          <div className="text-xs text-swGreen font-semibold whitespace-nowrap pt-3">
            {formatTimeToAMPM(item.createdAt)}
          </div>
        </div>
      ))}
    </main>
  );
};

export default CustomerActivityLogsCard;
