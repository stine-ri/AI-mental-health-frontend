import React, { useState } from "react";
import { FaInstagram, FaXTwitter, FaTiktok, FaYoutube, FaPhone, FaEnvelope } from "react-icons/fa6";
import { toast } from "react-hot-toast";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if fields are filled
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Show success message
    toast.success("Message sent successfully!");
    
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="py-12 px-4 bg-gray-100 text-center">
      <h2 className="text-2xl font-bold text-green-900 mb-6">Contact Us</h2>

      <div className="max-w-md mx-auto bg-white p-5 rounded-lg shadow-md">
        <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
          <button className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
            Send Message
          </button>
        </form>

        <div className="mt-4 text-gray-700 text-sm">
          <div className="flex justify-center items-center space-x-2">
            <FaPhone className="text-green-700" />
            <span>0798 765 432</span>
          </div>
          <div className="flex justify-center items-center space-x-2 mt-2">
            <FaEnvelope className="text-green-700" />
            <span>info@34mindful.com</span>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-5">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-500">
            <FaInstagram size={22} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-500">
            <FaXTwitter size={22} />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-500">
            <FaTiktok size={22} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-500">
            <FaYoutube size={22} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
