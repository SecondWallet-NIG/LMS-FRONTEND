import { BsFillStarFill, BsPentagonFill, BsTriangleFill } from "react-icons/bs";
import { FaCircle, FaSquareFull } from "react-icons/fa";
import { PiDiamondFill } from "react-icons/pi";

const SummaryCard = ({ data }) => {
  return (
    <main className="grid grid-cols-3 gap-4">
      {data.map((item, index) => (
        <div key={index} className="p-3 bg-gray-100 text-base rounded-xl">
          <div className="flex gap-2 items-center">
            <div>
              {item.loan_type === "total_loan_applications" ||
              item.loan_type === "amount_borrowed" ? (
                <FaCircle
                  size={20}
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
                  size={20}
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
                  size={20}
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
                <BsFillStarFill size={20} className="text-green-500" />
              )}
              {item.loan_type === "debts" && (
                <BsTriangleFill size={20} className="text-red-500" />
              )}
              {item.loan_type === "rejected/cancelled" && (
                <BsPentagonFill size={20} className="text-orange-400" />
              )}
            </div>
            <p className="capitalize font-semibold">
              {item.loan_type.replace(/_/g, " ")}
            </p>
          </div>
          <div className="flex items-center justify-between font-semibold mt-5">
            <p className="text-4xl">{item.number}</p>
            <p className="text-base">{item.amount} NGN</p>
          </div>
        </div>
      ))}
    </main>
  );
};

export default SummaryCard;
