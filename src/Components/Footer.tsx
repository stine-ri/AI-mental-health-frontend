import React from "react";
import { FaInstagram, FaTwitter, FaTiktok, FaYoutube, FaPhone } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900 text-white text-center p-6">
      <div className="flex justify-center space-x-6 mb-4">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300">
          <FaInstagram size={24} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300">
          <FaTwitter size={24} />
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300">
          <FaTiktok size={24} />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300">
          <FaYoutube size={24} />
        </a>
      </div>

      <div className="flex justify-center items-center space-x-2 text-sm">
        <FaPhone />
        <span>0798 765 432</span>
      </div>

      <p className="mt-4 text-sm">© 2025 Mindful. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
