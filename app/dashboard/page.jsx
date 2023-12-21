"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPost } from "@/redux/slices/postSlice";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import ReusableDataTable from "../components/shared/tables/ReusableDataTable";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import BarChart from "../components/chart/BarChart";
import DashboardCard from "../components/cards/dashboard/DashboardCard";
import { LuUsers } from "react-icons/lu";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";

const DashboardPage = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Set to false to allow custom height
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dataBorrower = {
    labels,
    datasets: [
      {
        label: "Borrowers",
        data: [
          3000, 5000, 7000, 2000, 9000, 4000, 6000, 8000, 3000, 4000, 7000,
          10000,
        ],
        backgroundColor: "#2769B3",
        barThickness: 10,
        borderRadius: 10,
      },
    ],
  };

  const dataDisbursement = {
    labels,
    datasets: [
      {
        label: "Disbursements",
        data: [
          3000, 5000, 7000, 2000, 9000, 4000, 6000, 8000, 3000, 4000, 7000,
          10000,
        ],
        backgroundColor: "#E3AF0E",
        barThickness: 10,
        borderRadius: 10,
      },
    ],
  };

  const dataFees = {
    labels,
    datasets: [
      {
        label: "Fees",
        data: [
          3000, 5000, 7000, 2000, 9000, 4000, 6000, 8000, 3000, 4000, 7000,
          10000,
        ],
        backgroundColor: "#F04438",
        barThickness: 10,
        borderRadius: 10,
      },
    ],
  };

  const dataRepayments = {
    labels,
    datasets: [
      {
        label: "Repayments",
        data: [
          3000, 5000, 7000, 2000, 9000, 4000, 6000, 8000, 3000, 4000, 7000,
          10000,
        ],
        backgroundColor: "#00AEE8",
        barThickness: 10,
        borderRadius: 10,
      },
    ],
  };

  return (
    <DashboardLayout>
      <main className="text-swGray p-5 sm:p-10 bg-gray-50 h-full">
        {/* <DashboardPageCard /> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <DashboardCard
            blueBg={true}
            cardIcon={<LuUsers size={20} />}
            cardName={"Borrowers"}
            cardLinkLabel={"New Borrower"}
            cardLink={"/create-borrower"}
            firstStat={["Total", "5,703"]}
            secondStat={["This month", "200", "+ 8%"]}
            thirdStat={["Today", 7, "- 20%"]}
          />
          <DashboardCard
            blueBg={true}
            cardIcon={<IoMdArrowUp size={20} />}
            cardName={"Disbursements"}
            cardLinkLabel={"View"}
            cardLink={"/disbursement"}
            firstStat={["Total", "5,703"]}
            secondStat={["This month", "200", "+ 8%"]}
            thirdStat={["Today", 7, "- 20%"]}
          />
          <DashboardCard
            blueBg={true}
            cardIcon={<IoMdArrowDown size={20} />}
            cardName={"Repayments"}
            cardLinkLabel={"Update"}
            cardLink={"/repayments"}
            firstStat={["Total", "5,703"]}
            secondStat={["This month", "200", "+ 8%"]}
            thirdStat={["Today", 7, "+ 20%"]}
          />
          <DashboardCard
            cardName={"Open loans"}
            cardLinkLabel={"View loans"}
            cardLink={"/loan-applications"}
            firstStat={["Total", "5,703"]}
            secondStat={["This month", "200", "+ 8%"]}
          />
          <DashboardCard
            cardName={"Denied loans"}
            firstStat={["Total", "5,703"]}
            secondStat={["This month", "200", "+ 8%"]}
            thirdStat={["Today", 7, "+ 20%"]}
          />
          <DashboardCard
            cardName={"Pending repayments"}
            firstStat={["Total", "5,703"]}
            secondStat={["This month", "200", "+ 8%"]}
          />
          <DashboardCard
            cardName={"Fully paid loans"}
            cardLinkLabel={"View"}
            cardLink={""}
            firstStat={["Total", "5,703"]}
            secondStat={["This month", "200", "+ 8%"]}
          />
          <DashboardCard
            cardName={"Fees"}
            cardLinkLabel={"View"}
            cardLink={""}
            firstStat={["Total", "5,703"]}
            secondStat={["This month", "200", "+ 8%"]}
            thirdStat={["Today", 7, "+ 20%"]}
          />
          <DashboardCard
            cardName={"Interests"}
            cardLinkLabel={"View"}
            cardLink={""}
            firstStat={["Total", "5,703"]}
            secondStat={["This month", "200", "+ 8%"]}
            thirdStat={["Today", 7, "+ 20%"]}
          />
        </div>

        <section className="mt-10">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Charts</p>
            <div className="flex gap-3 items-center">
              Select Timeframe
              <div className="flex items-center gap-2 border rounded-lg text-sm font-semibold py-2 px-4">
                Month <MdOutlineKeyboardArrowDown size={20} className="-mr-1" />
              </div>
            </div>
          </div>
        </section>
        <BarChart options={options} data={dataBorrower} />
        <BarChart options={options} data={dataDisbursement} />
        <BarChart options={options} data={dataFees} />
        <BarChart options={options} data={dataRepayments} />
      </main>
    </DashboardLayout>
  );
};

export default DashboardPage;
