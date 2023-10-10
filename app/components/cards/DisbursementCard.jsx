import { FiArrowUpRight } from "react-icons/fi";

const DisbursementCard = ({ data }) => {
  data = [
    {
      disbursement_type: "Approved for disbursement",
      disbursement_no: 54,
      disbursement_amount: 460930903.03,
    },
    {
      disbursement_type: "Total payouts",
      disbursement_no: 51,
      disbursement_amount: 460930903.03,
    },
    {
      disbursement_type: "Pending payouts",
      disbursement_no: 3,
      disbursement_amount: 23000383.93,
    },
    {
      disbursement_type: "Cancelled loan payout",
      disbursement_no: 0,
      disbursement_amount: 0.0,
    },
  ];

  return (
    <main className="grid lg:grid-cols-4 grid-cols-2 gap-2 text-sm">
      {data.map((item, index) => (
        <div
          key={index}
          className={`${
            item.disbursement_type.includes("Approved")
              ? "border-swBlue text-swBlue"
              : item.disbursement_type.includes("Total")
              ? "border-green-600 text-green-600"
              : item.disbursement_type.includes("Pending")
              ? "border-red-500 text-red-500"
              : "border-swGray text-black"
          } border rounded-lg p-2 w-full`}
        >
          <p className="font-semibold">{item.disbursement_type}</p>
          <div className="flex justify-between items-center my-4">
            <p className="text-2xl font-semibold">{item.disbursement_no}</p>
            <p className="font-semibold">
              &#8358;{" "}
              {item.disbursement_amount.toFixed(2).toLocaleString("en-US")}
            </p>
          </div>
          <p
            className={`${
              item.disbursement_type.includes("Approved")
                ? "bg-blue-200"
                : item.disbursement_type.includes("Total")
                ? "bg-green-100"
                : item.disbursement_type.includes("Pending")
                ? "bg-red-100"
                : "bg-swLightGray"
            } w-full flex justify-between items-center text-[0.65rem] px-2 rounded-full`}
          >
            <span>
              {" "}
              {item.disbursement_no}{" "}
              {item.disbursement_type.includes("Approved")
                ? "approvals"
                : item.disbursement_type.includes("Total")
                ? "payouts"
                : item.disbursement_type.includes("Pending")
                ? "pending payouts"
                : "payouts cancelled"}{" "}
              in 24 hours
            </span>

            <FiArrowUpRight size={13} />
          </p>
        </div>
      ))}
    </main>
  );
};

export default DisbursementCard;
