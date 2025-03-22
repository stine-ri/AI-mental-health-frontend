import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaRegComment, FaMinus, FaUser, FaCalendar, FaComments, FaCog, FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Navigate to the login page
    navigate("/login");
  };

  return (
    <div
      className={`h-screen bg-green-900 text-white p-5 flex flex-col items-center ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 rounded-r-lg fixed left-0 top-0`}
    >
      <button onClick={toggleSidebar} className="text-xl mb-6">
        {isOpen ? <FaMinus /> : <FaPlus />}
      </button>
      <nav className="flex flex-col space-y-6 text-lg">
        <Link to="/profile" className="flex items-center gap-2">
          <FaUser size={20} /> {!isOpen && "Profile"}
        </Link>
        <Link to="/sessions" className="flex items-center gap-2">
          <FaCalendar size={20} /> {!isOpen && "Sessions"}
        </Link>
        <Link to="/user-bookings" className="flex items-center gap-2">
          <FaCalendar size={20} /> {!isOpen && "Appointments"}
        </Link>
        <Link to="/user-message" className="flex items-center gap-2">
          <FaRegComment size={20} /> {!isOpen && "Payments"}
        </Link>
        <Link to="/chatbot" className="flex items-center gap-2">
          <FaComments size={20} /> {!isOpen && "Chatbot"}
        </Link>
        <Link to="/settings" className="flex items-center gap-2">
          <FaCog size={20} /> {!isOpen && "Settings"}
        </Link>
        <button onClick={handleLogout} className="flex items-center gap-2 text-red-400">
          <FaSignOutAlt size={20} /> {!isOpen && "Logout"}
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
