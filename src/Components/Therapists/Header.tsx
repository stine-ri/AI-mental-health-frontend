import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [therapistName, setTherapistName] = useState<string>("Therapist");

  useEffect(() => {
    const loginData = localStorage.getItem("loginResponse");

    if (loginData) {
      const parsedData = JSON.parse(loginData);
      const fullName = parsedData.user?.full_name;
      if (fullName) setTherapistName(fullName);
    }
  }, []);

  return (
    <div className="flex justify-between items-center p-4 bg-green-500 text-white shadow-md">
      {/* Welcome Text */}
      <h2 className="text-2xl font-semibold">Welcome, {therapistName}!</h2>

      {/* Profile Icon - Redirects to /profile */}
      <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
        <p className="hidden md:block">Profile</p>
        <FaUserCircle className="text-white text-3xl md:text-2xl hover:text-green-200 transition duration-200" />
      </Link>
    </div>
  );
};

export default Header;