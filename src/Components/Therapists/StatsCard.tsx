import React, { JSX } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  percentage: string;
  isPositive: boolean;
  icon: JSX.Element;
  description: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, percentage, isPositive, icon, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-60 flex flex-col items-center text-center border border-gray-200">
      <div className="text-blue-700 mb-3">{icon}</div>
      <p className="text-gray-600 font-medium">{title}</p>
      <h2 className="text-2xl font-bold mt-1">{value}</h2>
      <p className={`mt-1 ${isPositive ? "text-green-500" : "text-red-500"}`}>
        {isPositive ? "▲" : "▼"} {percentage}
      </p>
      <p className="text-xs text-gray-500 mt-2">{description}</p>
    </div>
  );
};

export default StatsCard;
