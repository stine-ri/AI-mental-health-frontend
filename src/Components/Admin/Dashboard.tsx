// src/components/admin/DashboardOverview.tsx
import { useEffect, useState } from "react";

interface DashboardData {
  totalAppointments: number;
  totalUsers: number;
  revenue: number;
}

const DashboardOverview = () => {
  const [data, setData] = useState<DashboardData>({
    totalAppointments: 0,
    totalUsers: 0,
    revenue: 0,
  });

  useEffect(() => {
    // Fetch dashboard stats from backend
    const fetchStats = async () => {
      try {
        const response = await fetch("https://ai-mentalhealthplatform.onrender.com/api/admin/stats");
        const stats = await response.json();
        setData({
          totalAppointments: stats.totalAppointments,
          totalUsers: stats.totalUsers,
          revenue: stats.revenue,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white shadow-lg p-6 rounded-lg border-l-4 border-green-600">
          <h3 className="text-lg font-semibold">Total Appointments</h3>
          <p className="text-3xl font-bold text-green-600">{data.totalAppointments}</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg border-l-4 border-green-600">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-3xl font-bold text-green-600">{data.totalUsers}</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg border-l-4 border-green-600">
          <h3 className="text-lg font-semibold">Revenue</h3>
          <p className="text-3xl font-bold text-green-600">${data.revenue}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
