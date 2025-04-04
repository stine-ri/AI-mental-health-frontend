import { useState } from "react";
import { FaCalendarAlt, FaRegComment, FaChartLine, FaBars, FaTimes, FaHome, FaUserMd, FaRobot, FaSignOutAlt, FaCreditCard, FaStarOfLife } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

import DashboardIllustration from "../assets/images/case3.avif";
import AppointmentImg from "../assets/images/Doc 2.webp";
import ChatbotImg from "../assets/images/butterfly.jpg";
import BookAppointmentImg from "../assets/images/butterfly.jpg";
import DoctorImg from "../assets/images/butterfly.jpg";
const UserDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Activity Level",
        data: [60, 75, 80, 70, 85, 90],
        backgroundColor: "rgba(34, 197, 94, 0.5)",
      },
    ],
  };

  const handleCheckCondition = () => {
    if (!userInput) {
      setFeedback("Please enter your symptoms.");
      return;
    }

    if (userInput.toLowerCase().includes("fever") || userInput.toLowerCase().includes("cough")) {
      setFeedback("You might have flu. Please stay hydrated and rest.");
    } else {
      setFeedback("Your condition seems normal. Stay healthy!");
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-green-50">
      <aside className={`bg-green-700 text-white w-64 p-5 transition-all duration-300 ${isSidebarOpen ? "block" : "hidden"} md:block`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
            <FaTimes size={20} />
          </button>
        </div>
        <nav>
        <ul>
  <li className="mb-4"><Link to="/" className="flex items-center p-3 rounded-lg hover:bg-green-800"><FaHome className="mr-2" /> Home</Link></li>
  <li className="mb-4"><Link to="/appointments" className="flex items-center p-3 rounded-lg hover:bg-green-800"><FaCalendarAlt className="mr-2" /> Appointments</Link></li>
  <li className="mb-4"><Link to="/doctor" className="flex items-center p-3 rounded-lg hover:bg-green-800"><FaUserMd className="mr-2" /> Doctors</Link></li>
  <li className="mb-4"><Link to="/sessions" className="flex items-center p-3 rounded-lg hover:bg-green-800"><FaChartLine className="mr-2" /> Book appointment</Link></li>
  <li className="mb-4"><Link to="/user-message" className="flex items-center p-3 rounded-lg hover:bg-green-800"><FaRegComment className="mr-2" /> Messages</Link></li>
  <li className="mb-4"><Link to="/chatbot" className="flex items-center p-3 rounded-lg hover:bg-green-800"><FaRobot className="mr-2" /> Chatbot</Link></li>
  <li className="mb-4"><Link to="/user-payments/:id" className="flex items-center p-3 rounded-lg hover:bg-green-800"><FaCreditCard className="mr-2" /> My Payments</Link></li>
  <li className="mb-4"><Link to="/reviews" className="flex items-center p-3 rounded-lg hover:bg-green-800"><FaStarOfLife className="mr-2" /> Reviews</Link></li>
  <li className="mb-4"><button onClick={handleLogout} className="flex items-center p-3 rounded-lg hover:bg-red-600"><FaSignOutAlt className="mr-2" /> Logout</button></li>
</ul>

        </nav>
      </aside>

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => setIsSidebarOpen(true)} className="md:hidden">
            <FaBars size={24} />
          </button>
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <Link to="/profile" className="hover:scale-105 transition-transform duration-300">
      <img
        src={DashboardIllustration}
        alt="Dashboard"
        className="w-32 cursor-pointer" 
      />
    </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {["Book Appointment", "Doctors", "Chatbot"].map((item, index) => {
    const routePaths: { [key: string]: string } = {
      "Book Appointment": "/sessions",
      "Doctors": "/doctor",
      "Chatbot": "/chatbot",
    };

    return (
      <div
        key={index}
        className="p-6 bg-white rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer relative"
      >
        <div className="absolute top-3 left-3 flex -space-x-2">
        <img src={BookAppointmentImg} alt="Book Appointment" className="w-8 h-8 rounded-full border-2 border-white" />
        <img src={DoctorImg} alt="Doctor" className="w-8 h-8 rounded-full border-2 border-white" />
        <img src={ChatbotImg} alt="Chatbot" className="w-8 h-8 rounded-full border-2 border-white" />

        </div>
        <h2 className="text-xl font-bold mt-10">{item}</h2>
        <p className="text-4xl font-extrabold text-green-700 mt-2">{[5, 12, 1][index]}</p>
        <button
          onClick={() => navigate(routePaths[item])}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition w-full"
        >
          View {item}
        </button>
      </div>
    );
  })}
</div>


<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
  <div className="p-5 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
    <FaChartLine className="text-green-500 mb-3" size={24} />
    <h2 className="text-lg font-semibold">Check Your Condition</h2>
    <input
      type="text"
      placeholder="Enter symptoms"
      className="border p-2 w-full rounded-md mt-2"
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
    />
    <button
      onClick={handleCheckCondition}
      className="mt-3 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
    >
      Check Now
    </button>
    {feedback && <p className="mt-2 text-sm text-green-700">{feedback}</p>}
  </div>

  <div className="p-5 bg-white rounded-lg shadow-lg flex items-center transition-transform transform hover:scale-105 hover:shadow-2xl">
    <img src={AppointmentImg} alt="Appointment" className="w-16 mr-3" />
    <div>
      <h2 className="text-lg font-semibold">Upcoming Appointment</h2>
      <p>Dr. Emilia Wilson - 14 Mar 2025</p>
      <a
        href="https://meet.google.com/new"
        className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400"
      >
        Join Call
      </a>
    </div>
  </div>

  <div className="p-5 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
    <h2 className="text-lg font-semibold">Patient Activities</h2>
    <Bar data={chartData} />
  </div>
</div>

      </div>
    </div>
  );
};

export default UserDashboard;


