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
  console.log({data});
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const formatNumberWithCommas = (number) => {
    const formattedNumber = number.toFixed(2);
    return formattedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="">
      <div className=" w-full">
        <div className="text-center pt-3 pb-3">Repayment Plan</div>
        <table className="w-full">
          <thead>
            <tr className="bg-swLightGray">
              <th className="px-6 py-3 text-left text-xs font-medium text-swGray tracking-wider">
                Repayment ID
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-swGray tracking-wider">
                Principal
              </th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-swGray tracking-wider">
                Interest
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-swGray tracking-wider text-end">
                Principal Repayment
              </th>
            </tr>
          </thead>
          <tbody className="text-swGray">
            {data.installmentPayments.map((payment) => (
              <tr className="border-b border-gray-200 pt-2 pb-2" key={payment.id}>
                <td className="px-6 py-6 text-xs">Repayment {payment.id}</td>
                {/* <td className="px-6 py-6 text-xs">
                  ₦ {formatNumberWithCommas(payment.totalPayment)}
                </td> */}
                  <td className="px-6 py-6 text-xs">
                  ₦ {formatNumberWithCommas(payment.interestPayment)}
                </td>
                <td className="px-6 py-6 text-xs text-end">
                ₦ {formatNumberWithCommas(payment.totalPayment)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PreviewInterest;
