"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPost } from "@/redux/slices/postSlice";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import ReusableDataTable from "../components/shared/tables/ReusableDataTable";
import DashboardCard from "../components/cards/DashboardPageCard.jsx/DashboardPageCard";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const DashboardPage = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  return (
    <DashboardLayout>
      <main className="text-swGray p-10 bg-gray-50 h-full">
        <DashboardCard />

        <section className="mt-10">
          <div className="flex justify-between">
            <p className="text-2xl font-semibold">Charts</p>
            <div className="flex gap-3 items-center">
              Select Timeframe
              <div className="flex items-center gap-2 border rounded-lg text-sm font-semibold py-2 px-4">
                Month <MdOutlineKeyboardArrowDown size={20} className="-mr-1" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
};

export default DashboardPage;
