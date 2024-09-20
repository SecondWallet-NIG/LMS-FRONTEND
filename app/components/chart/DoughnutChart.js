import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ options,data }) => {
  return (
    <div
      style={{ height: "300px", borderRadius: "10px" }}
      className="border-1 mt-8 border-gray-100 p-4"
    >
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
