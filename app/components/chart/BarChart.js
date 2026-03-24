import React from 'react';
import { Chart as  ChartJS, CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ options, data }) => {
  return (
    <div
      style={{ height: "300px" }}
      className="rounded-2xl border border-gray-100/90 bg-gradient-to-b from-white to-gray-50/50 p-4 shadow-sm"
    >
      <Line options={options} data={data} />
    </div>
  );
};

export default BarChart;
