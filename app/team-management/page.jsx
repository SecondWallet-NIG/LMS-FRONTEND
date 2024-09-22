"use client";
import { useState } from "react";
import DashboardLayout from "../components/dashboardLayout/DashboardLayout";
import TeamManagementCard from "../components/cards/Team management card/TeamManagementCard";
import BarChart from "../components/chart/BarChart";
import { teamManagementAuthRoles } from "../components/helpers/pageAuthRoles";

const TeamManagement = () => {
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

  const department = {
    labels,
    datasets: [
      {
        label: "Department",
        data: [],
        backgroundColor: "#3562a1",
        barThickness: 10,
        borderRadius: 8,
      },
    ],
  };
  const staff = {
    labels,
    datasets: [
      {
        label: "Staff",
        data: [],
        backgroundColor: "#3562a1",
        barThickness: 10,
        borderRadius: 8,
      },
    ],
  };
  const role = {
    labels,
    datasets: [
      {
        label: "Role",
        data: [],
        backgroundColor: "#3562a1",
        barThickness: 10,
        borderRadius: 8,
      },
    ],
  };
  const financial_year = {
    labels,
    datasets: [
      {
        label: "Financial year",
        data: [],
        backgroundColor: "#3562a1",
        barThickness: 10,
        borderRadius: 8,
      },
    ],
  };
  return (
    <DashboardLayout roles={teamManagementAuthRoles}>
      <div className="mx-5">
        <TeamManagementCard />
      </div>
    </DashboardLayout>
  );
};

export default TeamManagement;
