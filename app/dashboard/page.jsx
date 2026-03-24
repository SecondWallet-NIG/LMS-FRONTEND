"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { format } from "date-fns";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import BarChart from "../components/chart/BarChart";
import DashboardCard from "../components/cards/dashboard/DashboardCard";
import {
  LuActivity,
  LuBanknote,
  LuBarChart3,
  LuClipboardCheck,
  LuLandmark,
  LuLayers,
  LuLayoutDashboard,
  LuPercent,
  LuPieChart,
  LuReceipt,
  LuRefreshCw,
  LuSend,
  LuSparkles,
  LuTrendingUp,
  LuUsers,
  LuWallet,
} from "react-icons/lu";

const ICON_SIZE = 22;
import {
  getDashboardCardData,
  getDashboardGraphData,
} from "@/redux/slices/dashboardSlice";
import { dashboardAuthRoles } from "../components/helpers/pageAuthRoles";

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
        label: "Disbursed Loans",
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

  const todayLabel = useMemo(
    () => format(new Date(), "EEEE, MMMM d, yyyy"),
    []
  );

  const displayName =
    user?.data?.user?.firstName ||
    user?.firstName ||
    user?.data?.firstName ||
    "";

  return (
    <DashboardLayout roles={dashboardAuthRoles}>
      {cardData && (
        <main className="min-h-full bg-gradient-to-b from-[#f0f6fc] via-gray-50 to-gray-50 text-swGray">
          <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-8 sm:py-8 lg:px-10">
            {/* Page header */}
            <header className="mb-8 flex flex-col gap-6 rounded-2xl border border-white/60 bg-gradient-to-br from-white via-white to-swBlueActiveStateBg/40 p-6 shadow-md shadow-swBlue/5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 flex-1 gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-swBlue to-swDarkBlue text-white shadow-lg shadow-swBlue/25 ring-4 ring-white/80"
                  aria-hidden
                >
                  <LuLayoutDashboard size={28} strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-swBlue/80">
                    Dashboard
                  </p>
                  <h1 className="mt-1 text-2xl font-bold tracking-tight text-swGrey500 sm:text-3xl">
                    {displayName
                      ? `Welcome back, ${displayName}`
                      : "Welcome back"}
                  </h1>
                  <p className="mt-2 flex items-center gap-2 text-sm text-swGrey200">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-swGreen" />
                    {todayLabel}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 sm:justify-end">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-swGreen/25 bg-white/80 px-3 py-1.5 text-xs font-semibold text-swGreen700 shadow-sm">
                  <LuSparkles size={14} className="text-swGreen" />
                  Live overview
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-swBlue/20 bg-swBlueActiveStateBg px-3 py-1.5 text-xs font-semibold text-swBlue shadow-sm">
                  <LuBarChart3 size={14} />
                  Loan management
                </span>
              </div>
            </header>

            <section aria-labelledby="overview-heading" className="mb-4">
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-swBlue/15 to-swBlue/5 text-swBlue shadow-sm ring-1 ring-swBlue/10"
                  aria-hidden
                >
                  <LuSparkles size={22} strokeWidth={2} />
                </span>
                <div>
                  <h2
                    id="overview-heading"
                    className="text-lg font-bold text-swGrey500 sm:text-xl"
                  >
                    Overview
                  </h2>
                  <p className="mt-1 text-sm text-swGrey200">
                    Key metrics across borrowers, disbursements, and repayments.
                  </p>
                </div>
              </div>
            </section>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6">
            <DashboardCard
              iconBg="bg-sky-100"
              iconColor="text-sky-600"
              cardIcon={<LuUsers size={ICON_SIZE} strokeWidth={2.25} />}
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
              iconBg="bg-amber-100"
              iconColor="text-amber-600"
              cardIcon={<LuSend size={ICON_SIZE} strokeWidth={2.25} />}
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
              iconBg="bg-emerald-100"
              iconColor="text-emerald-600"
              cardIcon={<LuWallet size={ICON_SIZE} strokeWidth={2.25} />}
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
              iconBg="bg-violet-100"
              iconColor="text-violet-600"
              cardIcon={<LuLayers size={ICON_SIZE} strokeWidth={2.25} />}
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
              iconBg="bg-orange-100"
              iconColor="text-orange-600"
              cardIcon={
                <LuClipboardCheck size={ICON_SIZE} strokeWidth={2.25} />
              }
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
              iconBg="bg-rose-100"
              iconColor="text-rose-600"
              cardIcon={<LuActivity size={ICON_SIZE} strokeWidth={2.25} />}
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
              iconBg="bg-cyan-100"
              iconColor="text-cyan-600"
              cardIcon={<LuPieChart size={ICON_SIZE} strokeWidth={2.25} />}
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
              iconBg="bg-yellow-100"
              iconColor="text-yellow-700"
              cardIcon={<LuReceipt size={ICON_SIZE} strokeWidth={2.25} />}
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
              iconBg="bg-indigo-100"
              iconColor="text-indigo-600"
              cardIcon={<LuLandmark size={ICON_SIZE} strokeWidth={2.25} />}
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
              iconBg="bg-slate-100"
              iconColor="text-slate-600"
              cardIcon={<LuRefreshCw size={ICON_SIZE} strokeWidth={2.25} />}
              cardName={"Restructured Loans"}
              cardLink={""}
              cardLinkLabel={"View"}
              firstStat={["Total", "Coming soon"]}
              secondStat={["Count", "Coming soon"]}
            />
            <DashboardCard
              iconBg="bg-fuchsia-100"
              iconColor="text-fuchsia-600"
              cardIcon={<LuTrendingUp size={ICON_SIZE} strokeWidth={2.25} />}
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
              iconBg="bg-purple-100"
              iconColor="text-purple-600"
              cardIcon={<LuPercent size={ICON_SIZE} strokeWidth={2.25} />}
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

          <section
            className="mt-12 rounded-2xl border border-gray-100/90 bg-white/90 p-5 shadow-sm backdrop-blur-sm sm:p-8"
            aria-labelledby="analytics-heading"
          >
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/15 to-swBlue/10 text-emerald-700 shadow-sm ring-1 ring-emerald-500/15"
                  aria-hidden
                >
                  <LuBarChart3 size={22} strokeWidth={2} />
                </span>
                <div>
                  <h2
                    id="analytics-heading"
                    className="text-lg font-bold text-swGrey500 sm:text-xl"
                  >
                    Analytics
                  </h2>
                  <p className="mt-1 text-sm text-swGrey200">
                    Monthly trends for loans, repayments, and fees.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-swGrey200">
                  Timeframe
                </span>
                <div className="flex cursor-default items-center gap-2 rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-2.5 text-sm font-semibold text-swGrey500 shadow-inner">
                  Month
                  <MdOutlineKeyboardArrowDown
                    size={20}
                    className="-mr-0.5 text-swGrey200"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="w-full">
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                    <LuBanknote size={18} strokeWidth={2.25} />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-wide text-swGrey200">
                    Disbursed loans (monthly)
                  </p>
                </div>
                <BarChart options={options} data={dataLoans} />
              </div>
              <div className="flex flex-col gap-6 lg:flex-row">
                <div className="w-full lg:w-1/2">
                  <div className="mb-3 flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                      <LuWallet size={18} strokeWidth={2.25} />
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-wide text-swGrey200">
                      Repayments — expected vs actual
                    </p>
                  </div>
                  <BarChart options={options} data={dataRepayments} />
                </div>
                <div className="w-full lg:w-1/2">
                  <div className="mb-3 flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
                      <LuReceipt size={18} strokeWidth={2.25} />
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-wide text-swGrey200">
                      Fees & expected interest
                    </p>
                  </div>
                  <BarChart options={_options} data={dataFees} />
                </div>
              </div>
            </div>
          </section>
          </div>
        </main>
      )}
    </DashboardLayout>
  );
};

export default DashboardPage;
