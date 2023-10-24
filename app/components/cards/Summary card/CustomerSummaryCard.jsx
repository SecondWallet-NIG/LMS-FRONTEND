import { BsFillStarFill, BsPentagonFill, BsTriangleFill } from "react-icons/bs";
import { FaCircle, FaSquareFull } from "react-icons/fa";
import { PiDiamondFill } from "react-icons/pi";

const CustomerSummaryCard = ({ data }) => {
  return (
    <main className="grid grid-cols-3 gap-4">
      {data.map((item, index) => (
        <div key={index} className="p-3 bg-gray-100 text-base rounded-xl">
          <div className="flex gap-2 text-red items-center">
            <div className="">
              {item.loan_type === "total_loan_applications" ||
              item.loan_type === "amount_borrowed" ? (
                <FaCircle
                  size={15}
                  className={`${
                    item.loan_type === "total_loan_applications"
                      ? "text-blue-600"
                      : "text-gray-300"
                  } `}
                />
              ) : (
                ""
              )}

              {item.loan_type === "approved" ||
              item.loan_type === "proposed_interest" ? (
                <FaSquareFull
                  size={15}
                  className={`${
                    item.loan_type === "approved"
                      ? "text-purple-600"
                      : "text-gray-300"
                  } `}
                />
              ) : (
                ""
              )}
              {item.loan_type === "disbursed" ||
              item.loan_type === "interest_paid" ? (
                <PiDiamondFill
                  size={15}
                  className={`${
                    item.loan_type === "disbursed"
                      ? "text-yellow-400"
                      : "text-gray-300"
                  } `}
                />
              ) : (
                ""
              )}
              {item.loan_type === "complete_repayments" && (
                <BsFillStarFill size={15} className="text-green-500" />
              )}
              {item.loan_type === "debts" && (
                <BsTriangleFill size={15} className="text-red-500" />
              )}
              {item.loan_type === "rejected/cancelled" && (
                <BsPentagonFill size={15} className="text-orange-400" />
              )}
            </div>
            <p className="capitalize font-medium text-sm  text-swGray">
              {item.loan_type.replace(/_/g, " ")}
            </p>
          </div>
          <div className="flex items-center justify-between font-semibold mt-5">
            <p className="text-xl text-swBlue">{item.number}</p>
            <p className="text-sm text-swGray font-light">{item.amount} NGN</p>
          </div>
        </div>
      ))}
    </main>
  );
};

export default CustomerSummaryCard;
