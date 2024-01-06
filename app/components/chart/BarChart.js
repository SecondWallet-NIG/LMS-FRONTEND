import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const BarChart = ({options, data}) => {
  return (
    <div style={{ height: '300px', borderRadius: '10px' }} className="border-1 mt-8 border-gray-100 p-4">
        <Bar options={options} data={data} />
    </div>
  )
}

export default BarChart;
