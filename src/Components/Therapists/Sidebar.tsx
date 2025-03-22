import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaCalendar, FaHeadSideVirus, FaComments, FaCog, FaSignOutAlt } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Navigate to the Login page
    navigate("/login");
  };

  return (
    <div 
      className={`fixed left-0 top-16 bg-green-900 text-white p-5 flex flex-col 
      ${isOpen ? "w-64" : "w-20"} h-[calc(100vh-4rem)] transition-all duration-300 shadow-lg overflow-y-auto`}
    >
      {/* Toggle Button */}
      <button 
        onClick={toggleSidebar} 
        className="text-xl mb-6 p-2 rounded bg-green-800 hover:bg-green-700 transition"
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation */}
      <nav className="flex flex-col space-y-6 text-lg">
        <Link to="/therapist-bookings" className="flex items-center gap-3 p-2 rounded hover:bg-green-700 transition">
          <FaCalendar size={24} /> <span className={`${isOpen ? "inline" : "hidden"} transition-all`}>Sessions</span>
        </Link>
        <Link to="/appointments-requests" className="flex items-center gap-3 p-2 rounded hover:bg-green-700 transition">
          <FaCalendar size={24} /> <span className={`${isOpen ? "inline" : "hidden"} transition-all`}>Appointments</span>
        </Link>
        <Link to="/patient-overview/:id" className="flex items-center gap-3 p-2 rounded hover:bg-green-700 transition">
          <FaHeadSideVirus size={24} /> <span className={`${isOpen ? "inline" : "hidden"} transition-all`}>Patients</span>
        </Link>
        <Link to="/chatbot" className="flex items-center gap-3 p-2 rounded hover:bg-green-700 transition">
          <FaComments size={24} /> <span className={`${isOpen ? "inline" : "hidden"} transition-all`}>Chatbot</span>
        </Link>
        <Link to="/settings" className="flex items-center gap-3 p-2 rounded hover:bg-green-700 transition">
          <FaCog size={24} /> <span className={`${isOpen ? "inline" : "hidden"} transition-all`}>Settings</span>
        </Link>

        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          className="flex items-center gap-3 p-2 text-red-400 hover:bg-red-700 hover:text-white rounded transition"
        >
          <FaSignOutAlt size={24} /> <span className={`${isOpen ? "inline" : "hidden"} transition-all`}>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
