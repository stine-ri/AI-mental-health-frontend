import React from "react";
import { FaFacebook, FaTwitter, FaWhatsapp, FaPinterest, FaEnvelope } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-green-900 to-green-700 text-white p-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Left Section - Logo and About */}
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <span className="text-white">Mindful</span>
          </h1>
          <p className="mt-3 text-sm text-gray-200">
            Mindful is a mental health platform dedicated to promoting well-being and mindfulness. We provide resources, support, and expert guidance to help individuals navigate their mental health journey with confidence.
          </p>
        </div>

        {/* Middle Section - Office Details */}
        <div>
          <h2 className="text-lg font-semibold">Office</h2>
          <div className="w-10 h-1 bg-white mt-1 mb-3"></div>
          <p className="text-sm text-gray-200">
            123 Kutus Street, <br />
            Kutus City, KenyaState, 56789
          </p>
          <a href="mailto:support@mindful.com" className="text-white block mt-2 hover:underline">
            support@mindful.com
          </a>
          <p className="mt-1 text-gray-100">+254 734 567 890</p>
        </div>

        {/* Right Section - Links & Newsletter */}
        <div>
          <h2 className="text-lg font-semibold">Newsletter</h2>
          <div className="w-10 h-1 bg-white mt-1 mb-3"></div>
          <div className="flex items-center border-b border-gray-300 pb-2">
            <FaEnvelope className="text-gray-300" />
            <input
              type="email"
              placeholder="Enter your email id"
              className="bg-transparent ml-2 outline-none text-sm w-full placeholder-gray-300 text-white"
            />
            <button className="text-white hover:text-gray-300">→</button>
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-white hover:text-gray-300">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <FaWhatsapp size={20} />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <FaPinterest size={20} />
            </a>
          </div>
        </div>
      </div>

      <hr className="border-gray-500 mt-6" />
      <p className="text-center text-sm text-gray-200 mt-4">
        Mindful © 2025 - All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
