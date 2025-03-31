// import { useState } from "react";
// import { FaCalendarAlt,FaRegComment , FaChartLine, FaVideo, FaBars, FaTimes, FaHome, FaUserMd,  FaRobot, FaSignOutAlt } from "react-icons/fa";
// // FaMoneyBill,
// import { Link, useNavigate } from "react-router-dom";
// import { Bar } from "react-chartjs-2";
// import "chart.js/auto";

// // Import images
// import DashboardIllustration from "../assets/images/case3.avif";
// import AppointmentImg from "../assets/images/Doc 2.webp";

// const UserDashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [userInput, setUserInput] = useState("");
//   const [feedback, setFeedback] = useState("");
//   const navigate = useNavigate();

//   // Sample Graph Data
//   const chartData = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     datasets: [
//       {
//         label: "Activity Level",
//         data: [60, 75, 80, 70, 85, 90],
//         backgroundColor: "rgba(34, 197, 94, 0.5)", // Light green
//       },
//     ],
//   };

//   // Handle Check Condition
//   const handleCheckCondition = () => {
//     if (!userInput) {
//       setFeedback("Please enter your symptoms.");
//       return;
//     }

//     if (userInput.toLowerCase().includes("fever") || userInput.toLowerCase().includes("cough")) {
//       setFeedback("You might have flu. Please stay hydrated and rest.");
//     } else {
//       setFeedback("Your condition seems normal. Stay healthy!");
//     }
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     navigate("/login"); // Redirect to sign-in page
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <aside className={`bg-green-700 text-white w-64 p-5 transition-all duration-300 ${isSidebarOpen ? "block" : "hidden"} md:block`}>
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-bold">Dashboard</h2>
//           <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
//             <FaTimes size={20} />
//           </button>
//         </div>
//         <nav>
//           <ul>
//             <li className="mb-4">
//               <Link to="/" className="flex items-center p-2 hover:bg-green-600 rounded">
//                 <FaHome className="mr-3" /> Home
//               </Link>
//             </li>
//             <li className="mb-4">
//               <Link to="/user-bookings" className="flex items-center p-2 hover:bg-green-600 rounded">
//                 <FaCalendarAlt className="mr-3" /> Appointments
//               </Link>
//             </li>
//             <li className="mb-4">
//               <Link to="/doctor" className="flex items-center p-2 hover:bg-green-600 rounded">
//                 <FaUserMd className="mr-3" /> Doctors
//               </Link>
//             </li>
//             <li className="mb-4">
//               <Link to="/sessions" className="flex items-center p-2 hover:bg-green-600 rounded">
//                 <FaChartLine className="mr-3" /> Sessions
//               </Link>
//             </li>
//             <li className="mb-4">
//               <Link to="/user-message" className="flex items-center p-2 hover:bg-green-600 rounded">
//                 <FaRegComment  className="mr-3" /> Messages
//               </Link>
//             </li>
//             <li className="mb-4">
//               <Link to="/chatbot" className="flex items-center p-2 hover:bg-green-600 rounded">
//                 <FaRobot className="mr-3" /> Chatbot
//               </Link>
//             </li>
//             <li className="mb-4">
//               <button onClick={handleLogout} className="flex items-center p-2 w-full hover:bg-green-600 rounded">
//                 <FaSignOutAlt className="mr-3" /> Logout
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 p-6 bg-green-50">
//         {/* Top Section */}
//         <div className="flex justify-between items-center mb-6">
//           <button onClick={() => setIsSidebarOpen(true)} className="md:hidden">
//             <FaBars size={24} />
//           </button>
//           <h1 className="text-3xl font-bold">Welcome Back!</h1>
//           <img src={DashboardIllustration} alt="Dashboard" className="w-32 h-auto" />
//         </div>

//         {/* Grid Layout */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Check Condition */}
//           <div className="bg-white p-5 rounded-md shadow-md col-span-1 flex flex-col">
//             <FaChartLine size={24} className="text-green-500 mb-3" />
//             <h2 className="text-lg font-semibold">Check Your Condition</h2>
//             <input
//               type="text"
//               placeholder="Enter symptoms (e.g., fever, cough)"
//               className="p-2 border border-gray-300 rounded mt-3"
//               value={userInput}
//               onChange={(e) => setUserInput(e.target.value)}
//             />
//             <button onClick={handleCheckCondition} className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md">
//               Check Now
//             </button>
//             {feedback && <p className="text-sm text-gray-700 mt-3">{feedback}</p>}
//           </div>

//           {/* Upcoming Appointment */}
//           <div className="bg-white p-5 rounded-md shadow-md col-span-2 flex items-center">
//             <img src={AppointmentImg} alt="Appointment" className="w-16 h-auto mr-3" />
//             <div>
//               <h2 className="text-lg font-semibold">Upcoming Appointment</h2>
//               <p className="text-sm text-gray-500">Dr. Emilia Wilson - 14 Mar 2025, 9:00 PM</p>
//               <a
//                 href="https://meet.google.com/new"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md flex items-center"
//               >
//                 <FaVideo className="mr-2" /> Video Call
//               </a>
//             </div>
//           </div>

//           {/* Patient Activities with Graph */}
//           <div className="bg-white p-5 rounded-md shadow-md col-span-2">
//             <h2 className="text-lg font-semibold">Patient Activities</h2>
//             <p className="text-sm text-gray-500">Your activity levels over time.</p>
//             <Bar data={chartData} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;


import { useState } from "react";
import { FaCalendarAlt, FaRegComment, FaChartLine, FaBars, FaTimes, FaHome, FaUserMd, FaRobot, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

import DashboardIllustration from "../assets/images/case3.avif";
import AppointmentImg from "../assets/images/Doc 2.webp";

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
            <li><Link to="/" className="flex items-center p-3 rounded-lg hover:bg-green-800"><FaHome className="mr-2" /> Home</Link></li>
            <li><Link to="/appointments" className="flex items-center p-3 rounded-lg hover:bg-green-800"><FaCalendarAlt className="mr-2" /> Appointments</Link></li>
            <li><Link to="/doctor" className="flex items-center p-3 rounded-lg hover:bg-green-800"><FaUserMd className="mr-2" /> Doctors</Link></li>
            <li><Link to="/sessions" className="flex items-center p-3 rounded-lg hover:bg-green-800"><FaChartLine className="mr-2" /> Sessions</Link></li>
            <li><Link to="/user-message" className="flex items-center p-3 rounded-lg hover:bg-green-800"><FaRegComment className="mr-2" /> Messages</Link></li>
            <li><Link to="/chatbot" className="flex items-center p-3 rounded-lg hover:bg-green-800"><FaRobot className="mr-2" /> Chatbot</Link></li>
            <li><button onClick={handleLogout} className="flex items-center p-3 rounded-lg hover:bg-red-600"><FaSignOutAlt className="mr-2" /> Logout</button></li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => setIsSidebarOpen(true)} className="md:hidden">
            <FaBars size={24} />
          </button>
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <img src={DashboardIllustration} alt="Dashboard" className="w-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> 
  {["Appointments", "Sessions", "Doctor", "Messages", "Chatbot"].map((item, index) => {
    // Define the route paths
    const routePaths: { [key: string]: string } = {
      "Appointments": "/appointments",
      "Sessions": "/sessions",
      "Doctor": "/doctor",
      "Messages": "/user-message",
      "Chatbot": "/chatbot"
    };

    return (
      <div 
        key={index} 
        className="p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"
      >
        <h2 className="text-2xl font-bold mb-2">{item}</h2>
        <p className="text-4xl font-extrabold text-green-700">{[24, 5, 12, 8, 1][index]}</p>
        <button 
          onClick={() => navigate(routePaths[item])} 
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          View {item}
        </button>
      </div>
    );
  })}
</div>


        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-white rounded-lg shadow-lg">
            <FaChartLine className="text-green-500 mb-3" size={24} />
            <h2 className="text-lg font-semibold">Check Your Condition</h2>
            <input type="text" placeholder="Enter symptoms" className="border p-2 w-full rounded-md mt-2" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
            <button onClick={handleCheckCondition} className="mt-3 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Check Now</button>
            {feedback && <p className="mt-2 text-sm text-green-700">{feedback}</p>}
          </div>

          <div className="p-5 bg-white rounded-lg shadow-lg flex items-center">
            <img src={AppointmentImg} alt="Appointment" className="w-16 mr-3" />
            <div>
              <h2 className="text-lg font-semibold">Upcoming Appointment</h2>
              <p>Dr. Emilia Wilson - 14 Mar 2025</p>
              <a href="https://meet.google.com/new" className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Join Call</a>
            </div>
          </div>

          <div className="p-5 bg-white rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Patient Activities</h2>
            <Bar data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
