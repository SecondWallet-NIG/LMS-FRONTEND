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

const BarChart = ({options, data}) => {
  return (
    <div style={{ height: '300px', borderRadius: '10px' }} className="border-1 mt-8 border-gray-100 p-4">
        <Line  options={options} data={data} />
    </div>
  )
}

export default BarChart;
