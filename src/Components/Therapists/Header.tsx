import { FaSearch, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* Search Bar - Adjusts for Mobile */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <FaSearch className="text-gray-500 text-lg" />
        <input 
          type="text" 
          placeholder="Search" 
          className="outline-none hidden sm:block bg-gray-100 rounded-md px-2 py-1 w-60"
        />
      </div>

      {/* Profile Section - Clickable */}
      <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
        <p className="text-gray-700 hidden md:block">Dr. C.Monyancha</p>
        <FaUserCircle className="text-gray-500 text-3xl md:text-2xl hover:text-green-500 transition duration-200" />
      </Link>
    </div>
  );
};

export default Header;
