"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { FiUser } from "react-icons/fi";
import Image from "next/image";
import EditableButton from "../shared/editableButtonComponent/EditableButton";
import { handleCaptureClick } from "../helpers/utils";
// import html2canvas from "html2canvas";
const PreviewInterest = ({
  isOpen,
  onClose,
  width,
  data,
  formData,
  selectedCustomer,
  setCurrentStep,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const formatNumberWithCommas = (number) => {
    const formattedNumber = number?.toFixed(2);
    return formattedNumber?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // const handleCaptureClick = () => {
  //   setLoading(true);
  //   const captureDiv = document.getElementById("captureDiv");

  //   if (captureDiv) {
  //     html2canvas(captureDiv).then((canvas) => {
  //       const dataUrl = canvas.toDataURL("image/png");
  //       downloadScreenshot(dataUrl);
  //     });
  //   }
  // };

  // const downloadScreenshot = (dataUrl) => {
  //   // Create an anchor element with a download attribute to download the screenshot
  //   const a = document.createElement("a");
  //   a.href = dataUrl;
  //   a.download = `${selectedCustomer?.firstName} ${selectedCustomer?.lastName} loan.png`;
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  //   setLoading(false);
  // };
  const handleCapture = () => {
    handleCaptureClick(
      setLoading,
      "captureDiv",
      `${selectedCustomer?.firstName} ${selectedCustomer?.lastName} loan`
    );
  };

  return (
    <div id="captureDiv">
      <div className=" w-full">
        <div className="p-5">
          <div className="bg-swBlue rounded-2xl p-10 text-white">
            <div className="flex justify-between items-start gap-5 flex-wrap">
              <div className="flex gap-5 items-start">
                {selectedCustomer?.profilePicture &&
                selectedCustomer?.profilePicture !== "null" ? (
                  <div className="h-[4.7rem] w-[4.7rem] border-2 rounded-full relative overflow-hidden">
                    <Image
                      src={selectedCustomer && selectedCustomer?.profilePicture}
                      alt="profile"
                      fill
                      sizes="100%"
                    />
                  </div>
                ) : (
                  <div className="border-2 p-4 rounded-full">
                    <FiUser size={40} color="white" />
                  </div>
                )}
                <div>
                  <div className="flex gap-3 items-end">
                    <p className="font-medium text-2xl">
                      {selectedCustomer?.firstName} {selectedCustomer?.lastName}
                    </p>
                    {/* <p className="text-sm">{data?.status}</p>  */}
                  </div>
                  <p className="font-light">{selectedCustomer.email}</p>
                  <p className="font-light">
                    {selectedCustomer.phoneNumber.slice(1)}
                  </p>
                  {/* <div className="flex gap-5 items-center mt-5">
                    <div className="hover:bg-white hover:text-swBlue p-2 rounded-md cursor-pointer">
                      <MdOutlineEmail size="22" />
                    </div>
                    <div className="hover:bg-white hover:text-swBlue p-2 rounded-md cursor-pointer">
                      <FiPhone size="20" />
                    </div>
                    <div className="hover:bg-white hover:text-swBlue p-2 rounded-md cursor-pointer">
                      <FiEdit2 size="20" />
                    </div>
                  </div> */}
                </div>
              </div>
              <div>
                <EditableButton
                  whiteBtn={true}
                  label={loading ? "Exporting" : "Export"}
                  disabled={loading ? true : false}
                  className={"text-swGray"}
                  onClick={handleCapture}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="text-center pt-3 pb-3">Repayment Plan</div>
        <div className="overflow-auto">
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
                  Principal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-swGray tracking-wider text-end">
                  Total Repayment
                </th>
              </tr>
            </thead>
            <tbody className="text-swGray">
              {data.installmentPayments.map((payment) => (
                <tr
                  className="border-b border-gray-200 pt-2 pb-2"
                  key={payment.id}
                >
                  <td className="px-6 py-6 text-xs">Repayment {payment.id}</td>
                  {/* <td className="px-6 py-6 text-xs">
                  ₦ {formatNumberWithCommas(payment.totalPayment)}
                </td> */}
                  <td className="px-6 py-6 text-xs">
                    ₦ {formatNumberWithCommas(payment.interestPayment)}
                  </td>
                  <td className="px-6 py-6 text-xs text-end">
                    ₦ {formatNumberWithCommas(payment?.principal)}
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
    </div>
  );
};

export default PreviewInterest;
