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
        label: "Management Fees",
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
        <main className="text-swGray p-5 sm:p-10 bg-gray-50 h-full">
          {/* <DashboardPageCard /> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <DashboardCard
              blueBg={true}
              cardIcon={<LuUsers size={20} />}
              cardName={"Borrowers"}
              cardLinkLabel={"View"}
              cardLink={"/borrowers"}
              firstStat={[
                "Total",
                cardData?.data?.data.borrowersData?.totalBorrowersCount,
              ]}
              secondStat={[
                "This month",
                cardData?.data?.data.borrowersData
                  ?.totalBorrowersCountThisMonth,
                cardData?.data?.data?.borrowersData?.percentageTotalBorrowersCountThisMonth?.toLocaleString(),
                cardData?.data?.data?.borrowersData?.percentageTotalBorrowersCountThisMonth?.toLocaleString(),
              ]}
              thirdStat={[
                "Today",
                cardData?.data?.data.borrowersData?.totalBorrowerCountLast24,
                cardData?.data?.data.borrowersData?.percentageTotalBorrowerCountLast24?.toLocaleString(),
                cardData?.data?.data.borrowersData?.percentageTotalBorrowerCountLast24?.toLocaleString(),
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
                "₦ " +
                  cardData?.data?.data.disbursementData?.totalDisbursementsPaid?.toLocaleString(),
              ]}
              secondStat={[
                "This month",
                "₦ " +
                  cardData?.data?.data.disbursementData?.totalDisbursementsPaidThisMonth?.toLocaleString(),
                cardData?.data?.data?.disbursementData?.percentageTotalDisbursementsPaidThisMonth?.toLocaleString(),
              ]}
              // thirdStat={[
              //   "Today",
              //   "₦ " +
              //     cardData?.data?.data.disbursementData?.totalDisbursementsPaidLast24?.toLocaleString(),
              //   cardData?.data?.data.disbursementData?.percentageTotalDisbursementsPaidLast24?.toLocaleString(),
              // ]}
            />
            <DashboardCard
              blueBg={true}
              cardIcon={<IoMdArrowDown size={20} />}
              cardName={"Repayments"}
              cardLinkLabel={"view"}
              cardLink={"/repayment"}
              firstStat={[
                "Total",
                "₦ " +
                  cardData?.data?.data.repaymentData?.totalRepaymentsPaid?.toLocaleString(),
              ]}
              secondStat={[
                "This month",
                "₦ " +
                  cardData?.data?.data.repaymentData?.totalRepaymentsPaid?.toLocaleString(),
                cardData?.data?.data?.repaymentData?.percentageTotalRepaymentsPaidThisMonth?.toLocaleString(),
              ]}
              thirdStat={[
                "Today",
                "₦ " +
                  cardData?.data?.data.repaymentData?.totalRepaymentsPaidLast24?.toLocaleString(),
                cardData?.data?.data.repaymentData?.percentageTotalRepaymentsPaidLast24?.toLocaleString(),
              ]}
            />
            <DashboardCard
              cardName={"All Loans"}
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
              cardName={"New loans"}
              cardLinkLabel={"View"}
              cardLink={"/pending-loans"}
              firstStat={[
                "Count",
                cardData?.data?.data.openLoanData?.totalOpenLoansCount,
              ]}
              secondStat={[
                "Total",
                "₦ " +
                  cardData?.data?.data.openLoanData?.totalOpenLoansAmount?.toLocaleString(),
              ]}
            />
            <DashboardCard
              cardName={"Active loans"}
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
              cardName={"Denied loans"}
              firstStat={[
                "Total",
                cardData?.data?.data.declinedLoanData
                  ?.totalDeclinedLoanApplicationsCount,
              ]}
              secondStat={[
                "This month",
                "₦ " +
                  cardData?.data?.data?.declinedLoanData
                    ?.totalDeclinedLoanApplicationsCountThisMonth,
              ]}
              thirdStat={["null"]}
            />
            <DashboardCard
              cardLinkLabel={"View"}
              cardLink={"/unpaid-repayment"}
              cardName={"Pending repayments"}
              firstStat={[
                "Count",
                cardData?.data?.data.unpaidRepaymentData
                  ?.totalUnpaidRepaymentsCount,
              ]}
              secondStat={[
                "Total",
                "₦ " +
                  cardData?.data?.data.unpaidRepaymentData?.totalUnpaidRepaymentsAmount?.toLocaleString(),
              ]}
              thirdStat={["null"]}
            />
            <DashboardCard
              cardName={"Fully paid loans"}
              cardLinkLabel={"View"}
              cardLink={"/fully-paid-loans"}
              firstStat={[
                "Count",
                cardData?.data?.data.fullyRepaidLoansData?.totalFullyPaidLoansCount?.toLocaleString(),
                cardData?.data?.data.fullyRepaidLoansData?.totalFullyPaidLoansCount?.toLocaleString(),
              ]}
              secondStat={[
                "Total",
                "₦ " +
                  cardData?.data?.data.fullyRepaidLoansData?.totalFullyPaidLoansAmount?.toLocaleString(),
              ]}
              thirdStat={["null"]}
            />
            <DashboardCard
              cardName={"Commitment Fees"}
              cardLink={""}
              cardLinkLabel={"View"}
              firstStat={[
                "Total",
                "₦ " +
                  cardData?.data?.data.feesData?.totalCommitmentFeePaid?.toLocaleString(),
              ]}
              secondStat={[
                "This month",
                "₦ " +
                  cardData?.data?.data.feesData?.totalCommitmentFeePaidThisMonth?.toLocaleString(),
                cardData?.data?.data?.feesData?.percentageTotalCommitmentFeePaidThisMonth?.toLocaleString(),
              ]}
              // thirdStat={[
              //   "Today",
              //   "₦ " +  cardData?.data?.data.feesData?.totalCommitmentFeePaidLast24?.toLocaleString(),
              //   cardData?.data?.data.feesData?.percentageTotalCommitmentFeePaidLast24?.toLocaleString(),
              // ]}
            />
            <DashboardCard
              cardLinkLabel={"View"}
              cardName={"Management Fees"}
              cardLink={""}
              firstStat={[
                "Total",
                "₦ " +
                  cardData?.data?.data.feesData?.totalCommitmentFeePaid?.toLocaleString(),
              ]}
              secondStat={[
                "This month",
                "₦ " +
                  cardData?.data?.data.feesData?.totalCommitmentFeePaidThisMonth?.toLocaleString(),
                cardData?.data?.data?.feesData?.percentageTotalCommitmentFeePaidThisMonth?.toLocaleString(),
                cardData?.data?.data?.feesData?.percentageTotalCommitmentFeePaidThisMonth?.toLocaleString(),
              ]}
              // thirdStat={[
              //   "Today",
              //   "₦ " + cardData?.data?.data.feesData?.totalCommitmentFeePaidLast24?.toLocaleString(),
              //   cardData?.data?.data.feesData?.percentageTotalCommitmentFeePaidLast24?.toLocaleString(),
              //   cardData?.data?.data.feesData?.percentageTotalCommitmentFeePaidLast24?.toLocaleString(),
              // ]}
            />
            <DashboardCard
              cardLinkLabel={"View"}
              cardName={"Interests"}
              cardLink={""}
              firstStat={[
                "Expected Interest",
                "₦ " +
                  cardData?.data?.data.interestData?.totalExpectedInterest.toLocaleString(),
              ]}
              // secondStat={[
              //   "Actual Interest",
              //   cardData?.data?.data.interestData?.totalExpectedInterest.toLocaleString(),
              // ]}
              // thirdStat={[
              //   "Today",
              //   cardData?.data?.data.borrowersData?.totalBorrowerCountLast24,
              //   cardData?.data?.data?.borrowersData?.percentageTotalBorrowerCountLast24?.toLocaleString(),
              //   cardData?.data?.data?.borrowersData?.percentageTotalBorrowerCountLast24?.toLocaleString(),
              // ]}
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
