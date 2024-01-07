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
import { getDashboardCardData } from "@/redux/slices/dashboardSlice";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cardData = useSelector((state) => state.dashboardData);
  console.log(cardData);

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

  useEffect(() => {
    dispatch(getDashboardCardData());
  }, []);

  return (
    <DashboardLayout>
      {cardData && (
        <main className="text-swGray p-5 sm:p-10 bg-gray-50 h-full">
          {/* <DashboardPageCard /> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <DashboardCard
              blueBg={true}
              cardIcon={<LuUsers size={20} />}
              cardName={"Borrowers"}
              cardLinkLabel={"New Borrower"}
              cardLink={"/create-borrower"}
              firstStat={[
                "Total",
                cardData?.data?.data.borrowersData?.totalBorrowersCount,
              ]}
              secondStat={[
                "This month",
                cardData?.data?.data.borrowersData
                  ?.totalBorrowersCountThisMonth,
                cardData?.data?.data?.borrowersData
                  ?.percentageTotalBorrowersCountThisMonth?.toLocaleString(),
              ]}
              thirdStat={[
                "Today",
                cardData?.data?.data.borrowersData?.totalBorrowerCountLast24,
                cardData?.data?.data.borrowersData
                  ?.percentageTotalBorrowerCountLast24?.toLocaleString(),
              ]}
            />
            <DashboardCard
              blueBg={true}
              cardIcon={<IoMdArrowUp size={20} />}
              cardName={"Disbursements"}
              cardLinkLabel={"View"}
              cardLink={"/disbursement"}
              firstStat={[
                "Total",
                cardData?.data?.data.disbursementData?.totalDisbursementsPaid?.toLocaleString(),
              ]}
              secondStat={[
                "This month",
                cardData?.data?.data.disbursementData?.totalDisbursementsPaid?.toLocaleString(),
                cardData?.data?.data?.disbursementData?.percentageTotalDisbursementsPaidThisMonth?.toLocaleString(),
              ]}
              thirdStat={[
                "Today",
                cardData?.data?.data.disbursementData?.totalDisbursementsPaidLast24?.toLocaleString(),
                cardData?.data?.data.disbursementData?.percentageTotalDisbursementsPaidLast24?.toLocaleString(),
              ]}
            />
            <DashboardCard
              blueBg={true}
              cardIcon={<IoMdArrowDown size={20} />}
              cardName={"Repayments"}
              cardLinkLabel={"view"}
              cardLink={"/repayment"}
              firstStat={[
                "Total",
                cardData?.data?.data.repaymentData?.totalRepaymentsPaid?.toLocaleString(),
              ]}
              secondStat={[
                "This month",
                cardData?.data?.data.repaymentData?.totalRepaymentsPaid?.toLocaleString(),
                cardData?.data?.data?.repaymentData?.percentageTotalRepaymentsPaidThisMonth?.toLocaleString(),
              ]}
              thirdStat={[
                "Today",
                cardData?.data?.data.repaymentData?.totalRepaymentsPaidLast24?.toLocaleString(),
                cardData?.data?.data.repaymentData?.percentageTotalRepaymentsPaidLast24?.toLocaleString(),
              ]}
            />
            <DashboardCard
              cardName={"Pending loans"}
              cardLinkLabel={"View loans"}
              cardLink={"/pending-loans"}
              firstStat={[
                "Count",
                cardData?.data?.data.openLoanData?.totalOpenLoansCount,
              ]}
              secondStat={[
                "Total",
                cardData?.data?.data.openLoanData?.totalOpenLoansAmount?.toLocaleString(),
              ]}
            />
            <DashboardCard
              cardName={"Active loans"}
              cardLinkLabel={"View loans"}
              cardLink={"/active-loans"}
              firstStat={[
                "Count",
                cardData?.data?.data.activeLoanData?.totalOpenLoansCount,
              ]}
              secondStat={[
                "Total",
                cardData?.data?.data.activeLoanData?.totalOpenLoansAmount?.toLocaleString(),
              ]}
            />
            <DashboardCard
              cardName={"Disbursed loans"}
              cardLinkLabel={"View loans"}
              cardLink={"/disbursed-loans"}
              firstStat={[
                "Count",
                cardData?.data?.data.disbursedLoanData?.totalOpenLoansCount,
              ]}
              secondStat={[
                "Total",
                cardData?.data?.data.disbursedLoanData?.totalOpenLoansAmount?.toLocaleString(),
              ]}
            />
            <DashboardCard
              cardName={"Denied loans"}
              firstStat={[
                "Total",
                cardData?.data?.data.declinedLoanData
                  ?.totalDeclinedLoanApplicationsCount,
              ]}
              secondStat={[
                "This month",
                cardData?.data?.data?.declinedLoanData
                  ?.totalDeclinedLoanApplicationsCountThisMonth,
              ]}
              thirdStat={["null"]}
            />
            <DashboardCard
              cardName={"Pending repayments"}
              firstStat={[
                "Count",
                cardData?.data?.data.unpaidRepaymentData
                  ?.totalUnpaidRepaymentsCount,
              ]}
              secondStat={[
                "Total",
                cardData?.data?.data.unpaidRepaymentData
                  ?.totalUnpaidRepaymentsAmount?.toLocaleString(),
              ]}
              thirdStat={["null"]}
            />
            <DashboardCard
              cardName={"Fully paid loans"}
              cardLinkLabel={"View"}
              cardLink={""}
              firstStat={[
                "Count",
                cardData?.data?.data.fullyRepaidLoansData
                  ?.totalFullyPaidLoansCount?.toLocaleString(),
              ]}
              secondStat={[
                "Total",
                cardData?.data?.data.fullyRepaidLoansData
                  ?.totalFullyPaidLoansAmount?.toLocaleString(),
              ]}
              thirdStat={["null"]}
            />
            <DashboardCard
              cardName={"Fees"}
              cardLinkLabel={"View"}
              cardLink={""}
              firstStat={[
                "Total",
                cardData?.data?.data.feesData?.totalCommitmentFeePaid?.toLocaleString(),
              ]}
              secondStat={[
                "This month",
                cardData?.data?.data.feesData?.totalCommitmentFeePaidThisMonth?.toLocaleString(),
                cardData?.data?.data?.feesData
                  ?.percentageTotalCommitmentFeePaidThisMonth?.toLocaleString(),
              ]}
              thirdStat={[
                "Today",
                cardData?.data?.data.feesData?.totalCommitmentFeePaidLast24?.toLocaleString(),
                cardData?.data?.data.feesData
                  ?.percentageTotalCommitmentFeePaidLast24?.toLocaleString(),
              ]}
            />
            <DashboardCard
              cardName={"Interests"}
              cardLinkLabel={"View"}
              cardLink={""}
              firstStat={[
                "Total",
                cardData?.data?.data.borrowersData?.totalBorrowersCount,
              ]}
              secondStat={[
                "This month",
                cardData?.data?.data.borrowersData
                  ?.totalBorrowersCountThisMonth,
                cardData?.data?.data?.borrowersData
                  ?.percentageTotalBorrowersCountThisMonth?.toLocaleString(),
              ]}
              thirdStat={[
                "Today",
                cardData?.data?.data.borrowersData?.totalBorrowerCountLast24,
                cardData?.data?.data?.borrowersData
                  ?.percentageTotalBorrowerCountLast24?.toLocaleString()
              ]}
            />
          </div>

          <section className="mt-10">
            <div className="flex justify-between">
              <p className="text-xl font-semibold">Charts</p>
              <div className="flex gap-3 items-center">
                Select Timeframe
                <div className="flex items-center gap-2 border rounded-lg text-sm font-semibold py-2 px-4">
                  Month{" "}
                  <MdOutlineKeyboardArrowDown size={20} className="-mr-1" />
                </div>
              </div>
            </div>
          </section>
          <BarChart options={options} data={dataBorrower} />
          <BarChart options={options} data={dataDisbursement} />
          <BarChart options={options} data={dataFees} />
          <BarChart options={options} data={dataRepayments} />
        </main>
      )}
    </DashboardLayout>
  );
};

export default DashboardPage;
