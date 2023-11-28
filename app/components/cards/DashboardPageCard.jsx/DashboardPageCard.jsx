import Image from "next/image";
import Link from "next/link";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";
import { LuUsers } from "react-icons/lu";

const DashboardCard = (data) => {
  data = [
    {
      name: "Borrowers",
      total: 5703,
      stat: {
        thisMonth: { total: 200, stat: "+ 20%" },
        today: { total: 9, stat: "- 8%" },
      },
    },
    {
      name: "Disbursements",
      total: 967.69,
      stat: {
        thisMonth: { total: 200, stat: "+ 20%" },
        today: { total: 9, stat: "- 8%" },
      },
    },
    {
      name: "Repayments",
      total: 967.69,
      stat: {
        thisMonth: { total: 200, stat: "+ 20%" },
        today: { total: 9, stat: "- 8%" },
      },
    },
    { name: "Open loans", total: 85, amount: 32.6, stat: "+ 20%" },
    {
      name: "Denied loans",
      total: 350,
      stat: {
        thisMonth: { total: 200, stat: "+ 20%" },
        today: { total: 9, stat: "- 8%" },
      },
    },
    { name: "Pending repayments", total: 35, amount: 8.2, stat: "+ 20%" },
    { name: "Fully paid loans", total: 2856, amount: 537.83, stat: "+ 20%" },
    {
      name: "Fees",
      total: 65.27,
      stat: {
        thisMonth: { total: 200, stat: "+ 20%" },
        today: { total: 9, stat: "- 8%" },
      },
    },
    {
      name: "Interests",
      total: 301.25,
      stat: {
        thisMonth: { total: 200, stat: "+ 20%" },
        today: { total: 9, stat: "- 8%" },
      },
    },
  ];
  return (
    <section className="grid grid-cols-3 gap-8">
      {data.map((item, index) => (
        <div className="rounded-xl p-3 border w-full bg-white" key={index}>
          <div
            className={`${
              item.name === "Denied loans" || item.name === "Pending repayments"
                ? "p-2"
                : ""
            } flex justify-between items-center`}
          >
            <div className="flex gap-2 items-center">
              <div
                className={`flex justify-center w-fit items-center p-2 rounded-full ${
                  item.name === "Borrowers"
                    ? "bg-blue-100 text-swBlue"
                    : item.name === "Disbursements"
                    ? "bg-yellow-50 text-yellow-400"
                    : item.name === "Repayments"
                    ? "bg-green-50 text-green-400"
                    : "hidden"
                }`}
              >
                {item.name === "Borrowers" ? (
                  <LuUsers size={20} />
                ) : item.name === "Disbursements" ? (
                  <IoMdArrowUp size={20} />
                ) : item.name === "Repayments" ? (
                  <IoMdArrowDown size={20} />
                ) : (
                  ""
                )}
              </div>
              <p className="font-semibold">{item.name}</p>
            </div>
            <Link
              href={
                item.name === "Borrowers"
                  ? "/create-borrower"
                  : item.name === "Disbursements"
                  ? "/disbursement"
                  : item.name === "Repayments"
                  ? ""
                  : ""
              }
              className={
                item.name === "Denied loans" ||
                item.name === "Pending repayments"
                  ? "hidden"
                  : "border py-2 px-4 rounded-lg text-sm font-semibold"
              }
            >
              {item.name === "Borrowers"
                ? "New Borrower"
                : item.name === "Repayments"
                ? "Update"
                : item.name === "Open loans"
                ? "View loans"
                : "View"}
            </Link>
          </div>

          <div className="mt-4">
            {item.name === "Open loans" ||
            item.name === "Pending repayments" ||
            item.name === "Fully paid loans" ? (
              <div className="flex justify-center">
                <div className="text-center pr-10">
                  <p className="text-sm ">
                    {item.name === "Open loans" && "Total open loans"}
                    {item.name === "Pending repayments" && "Total pending"}
                    {item.name === "Fully paid loans" && "Total poans paid"}
                  </p>
                  <p className="font-semibold mt-1">{item.total}</p>
                </div>
                <div className="border-l text-center pl-10">
                  <p className="text-sm">Amount</p>
                  <p className="font-semibold mt-1">{item.total} m</p>
                  <div
                    className={`${
                      item.stat.includes("-")
                        ? "bg-red-100 text-red-500"
                        : "bg-green-100 text-green-500"
                    } inline-block py-1 px-2 text-xs rounded-full`}
                  >
                    {item.stat}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="pr-10 text-center">
                  <p className="text-sm ">Total paid</p>
                  <p className="font-semibold mt-1">{item.total} m</p>
                </div>
                <div className="px-10 border-x text-center">
                  <p className="text-sm">This month</p>
                  <p className="font-semibold mt-1">{item.total} m</p>
                  <p
                    className={`${
                      item.stat.thisMonth.stat.includes("-")
                        ? "bg-red-100 text-red-500"
                        : "bg-green-100 text-green-500"
                    } inline-block py-1 px-2 text-xs mx-auto rounded-full`}
                  >
                    {item.stat.thisMonth.stat}
                  </p>
                </div>
                <div className="pl-10 text-center">
                  <p className="text-sm">Today</p>
                  <p className="font-semibold mt-1">{item.total} m</p>
                  <p
                    className={`${
                      item.stat.today.stat.includes("-")
                        ? "bg-red-100 text-red-500"
                        : "bg-green-100 text-green-500"
                    } inline-block py-1 px-2 text-xs mx-auto rounded-full`}
                  >
                    {item.stat.today.stat}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default DashboardCard;
