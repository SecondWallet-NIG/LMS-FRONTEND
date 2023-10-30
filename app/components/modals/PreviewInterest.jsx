"use client";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMail } from "react-icons/ai";
import { BsBack, BsBackspace } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/buttonComponent/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createLoanApplication } from "@/redux/slices/loanApplicationSlice";
const PreviewInterest = ({
  isOpen,
  onClose,
  width,
  data,
  formData,
  setCurrentStep,
}) => {
  const dispatch = useDispatch();
  const [loading , setLoading] = useState(false);
  const formatNumberWithCommas = (number) => {
    const formattedNumber = number.toFixed(2); 
    return formattedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const submitLoan = (e) => {
    setLoading(true);
      e.preventDefault();
      dispatch(createLoanApplication(formData))
        .unwrap()
        .then(() => {
          toast("Loan application successful")
          setLoading(false);
        })
        .catch((error) => {
          toast.error(`An error occured`);
          setLoading(false);
        });
    
  };
  return (
    <div className="">
      <div className="bg-swBlue flex justify-between items-center p-3 text-white">
        <div>
          <p className="text-base font-semibold pt-2 pb-2">Loan Summary </p>
        </div>
        <BsBack
          size={20}
          // onClick={onClose}
          className="cursor-pointer"
        />
      </div>
      {/* <div className="flex px-5 justify-between">
   

            <div className=" pt-2  w-1/5 bg-swLightGray ">
              <div className="text-swGray p-4 m-2 rounded-lg  mx-auto text-xs font-semibold pt-2">
                Loan Amount
              </div>
              <div >
                <div className="p-4 m-2 rounded-lg  mx-auto">
                  ₦
                  {formData.loanAmount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
                </div>
              </div>
            </div>
            <div className=" pt-2 w-1/5  bg-swLightGray">
              <div className="text-swGray text-xs font-semibold pt-2">
                Repayment Type
              </div>
              <div className="">
                <div className="p-4 m-2  rounded-lg  mx-auto">
                  {formData.repaymentType || "No Repayment Type Yet"}
                </div>
              </div>
            </div>
            <div className="pt-2 w-1/5  bg-swLightGray ">
              <div className="text-swGray text-xs font-semibold pt-2">
                Loan Duration
              </div>
              <div className="">
                <div className="p-4 m-2 rounded-lg  mx-auto">
                  {formData.loanDuration || 0}
                </div>
              </div>
            </div>
            <div className="w-1/5 pt-2 bg-swLightGray">
              <div className="text-swGray text-xs font-semibold pt-2">
                Numbers of Repayment
              </div>
              <div className="">
                <div className="p-4 m-2  rounded-lg  mx-auto">
                  {formData.numberOfRepayment || 0}
                </div>
              </div>
            </div>
      </div> */}
      <div className="flex w-full">
      <table className="w-3/5 divide-y divide-gray-200 border border-gray-200 ml-4 mt-4">
  <thead>
    <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-swGray uppercase tracking-wider">
        REPAYMENT ID
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-swGray uppercase tracking-wider">
        Total Payment
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-swGray uppercase tracking-wider text-end">
        Interest Payment
      </th>
    </tr>
  </thead>
  <tbody className="text-swGray">
    {data.installmentPayments.map((payment) => (
      <tr className="border-b border-gray-200" key={payment.id}>
        <td className="px-6 py-1 text-xs">Repayment {payment.id}</td>
        <td className="px-6 py-1 text-xs">
          ₦ {formatNumberWithCommas(payment.totalPayment)}
        </td>
        <td className="px-6 py-1 text-xs text-end">
          ₦ {formatNumberWithCommas(payment.interestPayment)}
        </td>
      </tr>
    ))}
  </tbody>
</table>


        <div className="w-2/5 text-end mb-2">
          <p className="px-6 py-3 font-semibold text-md">Summary Details</p>

          <p className="px-6 pb-2 text-xs font-semibold">
            Principal:{" "}
            ₦ {formatNumberWithCommas(data.totalPayments)}
          </p>
          <p className="px-6  pb-2  text-xs font-semibold">
            Loan Duration:{" "}
            {formData.loanDuration} ({formData.loanDurationMetrics})
          </p>
          <p className="px-6  pb-2  text-xs font-semibold">
            Committment Value:{" "}
            ₦ {formatNumberWithCommas(formData.commitmentTotal)} - ({formData.commitmentValue}%)
          </p>
          <p className="px-6  pb-2  text-xs font-semibold">
            Numbers of Repayment:{" "}
            {formData.numberOfRepayment} ({formData.repaymentType})
          </p>
          <p className="px-6  pb-2  text-xs font-semibold">
            Total Interest At Maturity: ₦ {data.totalInterestPayments}
          </p>
          <p className="px-6  pb-2 text-xs font-semibold">
            Total Payment At Maturity:{" "}
            ₦ {formatNumberWithCommas(data.totalPayments)}
          </p>
  
      
          <div className="py-6 px-5 mt-4 flex gap-3 justify-end">
            <Button
              className="rounded rounded-sm"
              variant="danger"
              onClick={() => {
                setCurrentStep(1);
              }}
            >
              Edit Loan
            </Button>
            <Button
              isDisabled={!loading ? true : false}
              className="rounded rounded-sm"
              variant="primary"
              onClick={submitLoan}
            >
              Initialize Loan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewInterest;
