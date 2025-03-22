import React, { JSX } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface StatsCardProps {
  title: string;
  value: string;
  percentage: string;
  isPositive: boolean;
  icon: JSX.Element;
  description: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, percentage, isPositive, icon, description }) => {
  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Progress",
        data: [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100],
        backgroundColor: isPositive ? "#4caf50" : "#f44336",
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-64 flex flex-col items-center text-center border border-gray-200 transition-transform duration-300 hover:scale-105">
      <div className="text-blue-700 mb-3 text-4xl">{icon}</div>
      <p className="text-gray-700 font-semibold mb-1">{title}</p>
      <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
      <p className={`mt-2 text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>
        {isPositive ? "▲" : "▼"} {percentage}
      </p>
      <p className="text-gray-500 mt-2 text-sm">{description}</p>

      {/* Bar Graph */}
      <div className="w-full mt-4">
        <Bar
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: { display: false },
              },
              x: {
                grid: { display: false },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default StatsCard;
