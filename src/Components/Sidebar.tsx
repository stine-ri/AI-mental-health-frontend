import { Link } from "react-router-dom";
import { FaPlus, FaMinus, FaUser, FaCalendar, FaCreditCard, FaComments, FaCog, FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => {
  return (
    <div className={`h-screen bg-green-900 text-white p-5 flex flex-col items-center ${isOpen ? "w-64" : "w-20"} transition-all duration-300 rounded-r-lg fixed left-0 top-0`}>
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
        <Link to="/appointments" className="flex items-center gap-2">
          <FaCalendar size={20} /> {!isOpen && "Appointments"}
        </Link>
        <Link to="/checkout" className="flex items-center gap-2">
          <FaCreditCard size={20} /> {!isOpen && "Payments"}
        </Link>
        <Link to="/chatbot" className="flex items-center gap-2">
          <FaComments size={20} /> {!isOpen && "Chatbot"}
        </Link>
        <Link to="/settings" className="flex items-center gap-2">
          <FaCog size={20} /> {!isOpen && "Settings"}
        </Link>
        <button className="flex items-center gap-2 text-red-400">
          <FaSignOutAlt size={20} /> {!isOpen && "Logout"}
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
