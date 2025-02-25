// src/pages/admin/AdminDashboard.tsx
import AdminLayout from "../../Components/Admin/AdminLayout";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
  // Sample Data for Charts
  const bookingsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Bookings",
        data: [30, 50, 80, 40, 100, 70],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4,
      },
    ],
  };

  const userRolesData = {
    labels: ["Users", "Therapists", "Admins"],
    datasets: [
      {
        data: [150, 50, 10],
        backgroundColor: ["#4CAF50", "#FF9800", "#F44336"],
      },
    ],
  };

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 md:p-8">
        {/* Header */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
          Welcome to Admin Dashboard
        </h2>
        <p className="text-gray-700 text-sm sm:text-base md:text-lg text-center md:text-left mb-6">
          Manage appointments, users, sessions, bookings, therapists, and payments.
        </p>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[
            { title: "Total Users", value: "200", color: "bg-blue-500" },
            { title: "Total Bookings", value: "450", color: "bg-green-500" },
            { title: "Total Payments", value: "$10,000", color: "bg-yellow-500" },
            { title: "Active Therapists", value: "35", color: "bg-red-500" },
          ].map((item, index) => (
            <div key={index} className={`${item.color} text-white p-5 rounded-lg shadow-md`}>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Line Chart for Bookings */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Monthly Bookings</h3>
            <Line data={bookingsData} />
          </div>

          {/* Doughnut Chart for User Roles */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">User Roles Distribution</h3>
            <Doughnut data={userRolesData} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
