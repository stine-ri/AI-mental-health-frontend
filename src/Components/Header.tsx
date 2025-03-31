import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-green-900 text-white p-4 flex justify-between items-center shadow-lg">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold no-underline transition-transform duration-300 hover:scale-110"
      >
        Mindful
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex">
        <ul className="flex space-x-6">
          <li>
            <a
              href="/doctor-without-booking"
              className="transition-all duration-300 hover:text-green-300 hover:scale-105"
            >
              Doctors
            </a>
          </li>
          <li>
            <a
              href="/login"
              className="transition-all duration-300 hover:text-green-300 hover:scale-105"
            >
              Login
            </a>
          </li>
          <li>
            <a
              href="/register"
              className="transition-all duration-300 hover:text-green-300 hover:scale-105"
            >
              Register
            </a>
          </li>
          <li>
            <a
              href="/booktraining"
              className="transition-all duration-300 hover:text-green-300 hover:scale-105"
            >
              Book Training
            </a>
          </li>
          <li>
            <a
              href="/case"
              className="transition-all duration-300 hover:text-green-300 hover:scale-105"
            >
              Case Studies
            </a>
          </li>
        </ul>
      </nav>

      {/* Contact Button (Always Visible) */}
      <Link
        to="/contact"
        className="hidden md:block bg-green-500 px-4 py-2 rounded-lg text-white shadow-md hover:bg-green-600 transition-transform duration-300 hover:scale-105"
      >
        Contact Us
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden focus:outline-none z-20"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Dropdown */}
      <div
        className={`absolute top-16 left-0 w-full bg-green-900 text-white flex flex-col items-center space-y-6 py-8 md:hidden rounded-lg shadow-md transition-all duration-500 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <a
          href="/doctor-without-booking"
          className="hover:text-green-300 transition-transform duration-300 hover:scale-105"
          onClick={() => setIsOpen(false)}
        >
          Doctors
        </a>
        <a
          href="/login"
          className="hover:text-green-300 transition-transform duration-300 hover:scale-105"
          onClick={() => setIsOpen(false)}
        >
          Login
        </a>
        <a
          href="/register"
          className="hover:text-green-300 transition-transform duration-300 hover:scale-105"
          onClick={() => setIsOpen(false)}
        >
          Register
        </a>
        <a
          href="/booktraining"
          className="hover:text-green-300 transition-transform duration-300 hover:scale-105"
          onClick={() => setIsOpen(false)}
        >
          Book Training
        </a>
        <a
          href="/case"
          className="hover:text-green-300 transition-transform duration-300 hover:scale-105"
          onClick={() => setIsOpen(false)}
        >
          Case Studies
        </a>
        <Link
          to="/contact"
          className="bg-green-500 px-4 py-2 rounded-lg text-white shadow-md hover:bg-green-600 transition-transform duration-300 hover:scale-105"
          onClick={() => setIsOpen(false)}
        >
          Contact Us
        </Link>
      </div>
    </header>
  );
};

export default Header;
