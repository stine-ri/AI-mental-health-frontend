import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for the mobile menu
import { Link } from "react-router-dom";
const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-green-900 text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-2xl font-bold">Mindful</h1>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex">
        <ul className="flex space-x-6">
          <li><a href="/doctor" className="hover:underline">Doctors</a></li>
          <li><a href="/login" className="hover:underline">Login</a></li>
          <li><a href="/register" className="hover:underline">Register</a></li>
          <li><a href="/booktraining" className="hover:underline">Book Training</a></li>
          <li><a href="/case" className="hover:underline">Case Studies</a></li>
        </ul>
      </nav>

      {/* Contact Button (Always Visible) */}
      <Link to="/contact" className="hidden md:block bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600 transition">
                   Contact Us
         </Link>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden focus:outline-none" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-green-900 text-white flex flex-col items-center space-y-4 py-6 md:hidden">
          <a href="/doctor" className="hover:underline" onClick={() => setIsOpen(false)}>Doctors</a>
          <a href="/login" className="hover:underline" onClick={() => setIsOpen(false)}>Login</a>
          <a href="/register" className="hover:underline" onClick={() => setIsOpen(false)}>Register</a>
          <a href="/booktraining" className="hover:underline" onClick={() => setIsOpen(false)}>Book Training</a>
          <a href="/case" className="hover:underline" onClick={() => setIsOpen(false)}>Case Studies</a>
          <Link to="/contact" className="hidden md:block bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600 transition">
                   Contact Us
         </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
