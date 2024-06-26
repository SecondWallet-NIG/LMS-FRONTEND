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
import {
  getDashboardCardData,
  getDashboardGraphData,
} from "@/redux/slices/dashboardSlice";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cardData = useSelector((state) => state.dashboardData);
  const graphData = useSelector((state) => state.dashboardData);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Set to false to allow custom height
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        grid: {
          display: true,
        },
      },
    },
  };

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dataValues = Array(12).fill(0);
  const dataValuesFees = Array(12).fill(0);
  const dataValuesRepayment = Array(12).fill(0);
  const dataValuesPaymentRecovered = Array(12).fill(0);
  const dataValuesDisbursement = Array(12).fill(0);

  // Extracting data from loanGraphData
  graphData.data1?.data?.loanGraphData?.forEach((entry) => {
    const index = entry.month - 1; // Adjusting month to be 0-based index
    dataValues[index] = entry.totalLoanAmount;
  });

  graphData.data1?.data?.feesGraphData.forEach((entry) => {
    const index = entry.month - 1; // Adjusting month to be 0-based index
    dataValuesFees[index] = entry.totalCommitmentFeePaid;
  });

  graphData.data1?.data?.repaymentsGraphData.forEach((entry) => {
    const index = entry.month - 1; // Adjusting month to be 0-based index
    dataValuesRepayment[index] = entry.amountPaid;
  });
  graphData.data1?.data?.disbursementsGraphData.forEach((entry) => {
    const index = entry.month - 1; // Adjusting month to be 0-based index
    dataValuesDisbursement[index] = entry.totalLoanAmount;
  });
  graphData.data1?.data?.paymentHistory.forEach((entry) => {
    const index = entry.month - 1; // Adjusting month to be 0-based index
    dataValuesPaymentRecovered[index] = entry.totalAmountLogged;
  });

  // Creating the dataFees object
  const _labels = Array.from({ length: 12 }, (_, i) => i + 1); // Months from 1 to 12
  const dataLoans = {
    labels,
    datasets: [
      {
        label: "Loans",
        data: dataValues,
        backgroundColor: "#4aba5b",
        barThickness: 10,
        borderRadius: 8,
      },
    ],
  };

  const dataFees = {
    labels,
    datasets: [
      {
        label: "Commitment Fees",
        data: dataValuesFees,
        backgroundColor: "#ba5b4a",
        barThickness: 10, // Adjust the width of each bar
        borderRadius: 8,
        stack: "Stack 0",
      },
      {
        label: "Monthly Expected Interest",
        data: dataValuesFees,
        backgroundColor: "#4aba5b",
        barThickness: 10,
        borderRadius: 8,
        stack: "Stack 1",
      },
    ],
  };

  const _options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    maintainAspectRatio: false, // Set to false to allow custom height
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        grid: {
          display: true,
        },
      },
    },
  };

  const dataRepayments = {
    labels,
    datasets: [
      {
        label: "Expected Repayments",
        data: dataValuesRepayment,
        backgroundColor: "#3562a1",
        barThickness: 10,
        borderRadius: 8,
      },
      {
        label: "Actual Repayments",
        data: dataValuesPaymentRecovered,
        backgroundColor: "#ba5b4a",
        barThickness: 10,
        borderRadius: 8,
      },
    ],
  };

  const dataDisbursements = {
    labels,
    datasets: [
      {
        label: "Disbursement",
        data: dataValuesDisbursement,
        backgroundColor: "#4aba5b",
        barThickness: 10,
        borderRadius: 8,
      },
    ],
  };

  useEffect(() => {
    dispatch(getDashboardCardData());
    dispatch(getDashboardGraphData());
  }, []);

  return (
    <DashboardLayout>
      {cardData && (
        <main className="text-swGray text-lg p-5 sm:p-10 bg-gray-50 h-full">
          {/* <DashboardPageCard /> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <DashboardCard
              // blueBg={true}
              iconBg="bg-blue-200"
              iconColor="text-swBlue"
              cardIcon={<LuUsers size={20} />}
              cardName={"Borrowers"}
              cardLinkLabel={"View"}
              cardLink={"/borrowers"}
              firstStat={[
                "Total Borrowers",
                cardData?.data?.data.borrowersData?.totalBorrowersCount,
              ]}
              secondStat={[
                "This month",
                cardData?.data?.data.borrowersData
                  ?.totalBorrowersCountThisMonth,
              ]}
            />
            <DashboardCard
              // blueBg={true}
              iconBg="bg-yellow-200"
              iconColor="text-yellow-500"
              cardIcon={<IoMdArrowUp size={20} />}
              cardName={"Disbursements"}
              cardLinkLabel={"View"}
              cardLink={"/disbursement"}
              firstStat={[
                "Total",
                "₦ " +
                  cardData?.data?.data.disbursementData?.totalDisbursementsPaid?.toLocaleString(),
              ]}
              secondStat={[
                "This month",
                "₦ " +
                  cardData?.data?.data.disbursementData?.totalDisbursementsPaidThisMonth?.toLocaleString(),
              ]}
            />
            <DashboardCard
              // blueBg={true}
              iconBg="bg-blue-200"
              iconColor="text-[#00AEE8]"
              cardIcon={<IoMdArrowDown size={20} />}
              cardName={"Repayments"}
              cardLinkLabel={"View"}
              cardLink={"/repayment"}
              firstStat={[
                "Total",
                "₦ " +
                  cardData?.data?.data.repaymentData?.totalRepaymentsPaid?.toLocaleString(),
              ]}
              secondStat={[
                "This month",
                "₦ " +
                  cardData?.data?.data.repaymentData?.totalRepaymentsPaidThisMonth?.toLocaleString(),
              ]}
            />
            <DashboardCard
              cardName={"All Loans (DL | OVD | FPL)"}
              cardLinkLabel={"View"}
              cardLink={"/loan-applications"}
              firstStat={[
                "Count",
                cardData?.data?.data.allLoanData?.totalOpenLoansCount,
              ]}
              secondStat={[
                "Total",
                "₦ " +
                  cardData?.data?.data.allLoanData?.totalOpenLoansAmount?.toLocaleString(),
              ]}
            />
            <DashboardCard
              cardName={"Loans Approved for Disbursement"}
              cardLinkLabel={"View"}
              cardLink={"/pending-loans"}
              firstStat={[
                "Count",
                cardData?.data?.data.disbursementData
                  ?.totalReadyDisbursementsPaidCount || 0,
              ]}
              secondStat={[
                "Total",
                "₦ " +
                  cardData?.data?.data.disbursementData?.totalReadyDisbursed?.toLocaleString() ||
                  0,
              ]}
            />
            <DashboardCard
              cardName={"Total Outstanding Active Loans"}
              cardLinkLabel={"View"}
              cardLink={"/active-loans"}
              firstStat={[
                "Count",
                cardData?.data?.data.activeLoanData?.totalOpenLoansCount,
              ]}
              secondStat={[
                "Total",
                "₦ " +
                  cardData?.data?.data.activeLoanData?.totalOpenLoansAmount?.toLocaleString(),
              ]}
            />

            <DashboardCard
              cardName={"Active / Fully Paid Loans"}
              // cardLinkLabel={"View"}
              // cardLink={"/loan-applications"}
              firstStat={[
                "Total Outstanding Active Loans",
                "₦ " +
                  cardData?.data?.data.activeLoanData?.totalOpenLoansAmount?.toLocaleString(),
              ]}
              secondStat={[
                "Fully Paid Loans",
                "₦ " +
                  cardData?.data?.data.fullyRepaidLoansData?.totalFullyPaidLoansAmount?.toLocaleString(),
              ]}
            />
            <DashboardCard
              cardName={"Total Fees"}
              firstStat={[
                "Management Fees",
                "₦ " +
                  cardData?.data?.data.feesData?.totalCommitmentFeePaid?.toLocaleString(),
              ]}
              secondStat={[
                "Commitment Fees",
                "₦ " +
                  cardData?.data?.data.feesData?.totalCommitmentFeePaid?.toLocaleString(),
              ]}
              thirdStat={["null"]}
            />
            <DashboardCard
              cardName={"Principal Outstanding Active Loans"}
              cardLinkLabel={"View"}
              cardLink={"/fully-paid-loans"}
              firstStat={[
                "Total",
                "₦ " +
                  cardData?.data?.data.activeLoanData?.totalActivePrincipal?.toLocaleString(),
              ]}
              thirdStat={["null"]}
            />
            <DashboardCard
              cardName={"Restructured Loans"}
              cardLink={""}
              cardLinkLabel={"View"}
              firstStat={["Total", "Coming soon"]}
              secondStat={["Count", "Coming soon"]}
            />
            <DashboardCard
              cardLinkLabel={"View"}
              cardName={"Expected Interest"}
              cardLink={""}
              firstStat={[
                "Total",
                "₦ " +
                  cardData?.data?.data.interestData?.totalExpectedInterest.toLocaleString(),
              ]}
              secondStat={[
                "This month",
                "₦ " +
                  cardData?.data?.data.interestData?.totalExpectedInterestThisMonth.toLocaleString(),
              ]}
            />
            <DashboardCard
              cardLinkLabel={"View"}
              cardName={"Interest Outstanding Active Loans"}
              cardLink={""}
              firstStat={[
                "Expected Interest",
                "₦ " +
                  cardData?.data?.data.activeLoanData?.totalActiveInterest.toLocaleString(),
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
          <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/2">
              <BarChart options={options} data={dataLoans} />
            </div>
            <div className="w-full sm:w-1/2">
              <BarChart options={_options} data={dataFees} />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/2">
              <BarChart options={options} data={dataDisbursements} />
            </div>
            <div className="w-full sm:w-1/2">
              <BarChart options={options} data={dataRepayments} />
            </div>
          </div>
        </main>
      )}
    </DashboardLayout>
  );
};

export default DashboardPage;
