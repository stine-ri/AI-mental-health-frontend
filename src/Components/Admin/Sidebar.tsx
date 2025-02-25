// src/components/admin/Sidebar.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-4 text-green-600">
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <div className={`fixed md:static top-0 left-0 w-64 bg-green-600 text-white min-h-screen p-5 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform md:translate-x-0`}>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <button onClick={() => setIsOpen(false)} className="md:hidden">
            <FaTimes size={24} />
          </button>
        </div>
        <nav className="mt-6">
          <ul className="space-y-4">
            <li><Link to="/admin/appointments" className="block p-2 hover:bg-green-500 rounded">Appointments</Link></li>
            <li><Link to="/admin/users" className="block p-2 hover:bg-green-500 rounded">Users</Link></li>
            <li><Link to="/admin/sessions" className="block p-2 hover:bg-green-500 rounded">Sessions</Link></li>
            <li><Link to="/admin/bookings" className="block p-2 hover:bg-green-500 rounded">Bookings</Link></li>
            <li><Link to="/admin/therapists" className="block p-2 hover:bg-green-500 rounded">Therapists</Link></li>
            <li><Link to="/admin/payments" className="block p-2 hover:bg-green-500 rounded">Payments</Link></li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
