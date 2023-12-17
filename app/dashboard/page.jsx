"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPost } from "@/redux/slices/postSlice";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import ReusableDataTable from "../components/shared/tables/ReusableDataTable";
import DashboardCard from "../components/cards/DashboardPageCard.jsx/DashboardPageCard";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import BarChart from "../components/chart/BarChart";

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
  
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
const dataBorrower = {
    labels,
    datasets: [
      {
        label: 'Borrowers',
        data: [3000, 5000, 7000, 2000, 9000, 4000, 6000, 8000, 3000, 4000, 7000, 10000],
        backgroundColor: '#2769B3', 
        barThickness: 10, 
        borderRadius: 10,
      }
    ],
  };


  const dataDisbursement = {
    labels,
    datasets: [
      {
        label: 'Disbursements',
        data: [3000, 5000, 7000, 2000, 9000, 4000, 6000, 8000, 3000, 4000, 7000, 10000],
        backgroundColor: '#E3AF0E', 
        barThickness: 10, 
        borderRadius: 10,
      }
    ],
  };

  const dataFees = {
    labels,
    datasets: [
      {
        label: 'Fees',
        data: [3000, 5000, 7000, 2000, 9000, 4000, 6000, 8000, 3000, 4000, 7000, 10000],
        backgroundColor: '#F04438', 
        barThickness: 10, 
        borderRadius: 10,
      }
    ],
  };

  const dataRepayments = {
    labels,
    datasets: [
      {
        label: 'Repayments',
        data: [3000, 5000, 7000, 2000, 9000, 4000, 6000, 8000, 3000, 4000, 7000, 10000],
        backgroundColor: '#00AEE8', 
        barThickness: 10, 
        borderRadius: 10,
      }
    ],
  };

  



  return (
    <DashboardLayout>
      <main className="text-swGray p-10 bg-gray-50 h-full">
        <DashboardCard />

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
