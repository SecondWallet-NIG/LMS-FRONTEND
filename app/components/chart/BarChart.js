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

// export const options = {
//   responsive: true,
//   maintainAspectRatio: false, // Set to false to allow custom height
//   scales: {
//     x: {
//       grid: {
//         display: false,
//       },
//     },
//     y: {
//       grid: {
//         display: false,
//       },
//     },
//   },
// };

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// export const data = {
//   labels,
//   datasets: [
//     {
//     //   label: 'Dataset 1',
//       data: [3000, 5000, 7000, 2000, 9000, 4000, 6000, 8000, 3000, 4000, 7000, 10000], // Replace with your actual data for each month
//       backgroundColor: 'rgba(255, 99, 132, 0.5)', // Customize the color here
//       barThickness: 5, // Customize the bar width
//     }
//   ],
// };

const BarChart = ({options, data}) => {
  return (
    <div style={{ height: '300px', borderRadius: '10px' }} className="border-1 mt-8 border-gray-100 p-4">
        <Bar options={options} data={data} />
    </div>
  )
}

export default BarChart;
