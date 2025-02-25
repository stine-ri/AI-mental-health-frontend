import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaCalendar, FaCreditCard, FaComments, FaCog, FaSignOutAlt } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
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
        <Link to="/sessions" className="flex items-center gap-3 p-2 rounded hover:bg-green-700 transition">
          <FaCalendar size={24} /> <span className={`${isOpen ? "inline" : "hidden"} transition-all`}>Sessions</span>
        </Link>
        <Link to="/appointments" className="flex items-center gap-3 p-2 rounded hover:bg-green-700 transition">
          <FaCalendar size={24} /> <span className={`${isOpen ? "inline" : "hidden"} transition-all`}>Appointments</span>
        </Link>
        <Link to="/checkout" className="flex items-center gap-3 p-2 rounded hover:bg-green-700 transition">
          <FaCreditCard size={24} /> <span className={`${isOpen ? "inline" : "hidden"} transition-all`}>Payments</span>
        </Link>
        <Link to="/chatbot" className="flex items-center gap-3 p-2 rounded hover:bg-green-700 transition">
          <FaComments size={24} /> <span className={`${isOpen ? "inline" : "hidden"} transition-all`}>Chatbot</span>
        </Link>
        <Link to="/settings" className="flex items-center gap-3 p-2 rounded hover:bg-green-700 transition">
          <FaCog size={24} /> <span className={`${isOpen ? "inline" : "hidden"} transition-all`}>Settings</span>
        </Link>

        {/* Logout Button */}
        <button className="flex items-center gap-3 p-2 text-red-400 hover:bg-red-700 rounded transition">
          <FaSignOutAlt size={24} /> <span className={`${isOpen ? "inline" : "hidden"} transition-all`}>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
