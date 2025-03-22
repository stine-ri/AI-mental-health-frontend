import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaBell, FaClock } from "react-icons/fa";

const TherapistSettings: React.FC = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [password, setPassword] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [availability, setAvailability] = useState("9 AM - 5 PM");

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Password changed successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-green-700">
          Therapist Settings
        </h2>

        {/* Profile Management */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <FaUser className="text-green-600" /> Profile Management
          </h3>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="flex items-center border-b border-gray-300 py-2">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                placeholder="Enter your name"
              />
            </div>
            <div className="flex items-center border-b border-gray-300 py-2">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors w-full shadow-md"
            >
              Update Profile
            </button>
          </form>
        </section>

        {/* Notification Settings */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <FaBell className="text-green-600" /> Notification Settings
          </h3>
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="w-5 h-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <span className="text-gray-700">Receive Notifications for New Appointments</span>
          </div>
        </section>

        {/* Availability Settings */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <FaClock className="text-green-600" /> Availability Settings
          </h3>
          <div className="flex items-center border-b border-gray-300 py-2">
            <FaClock className="text-gray-500 mr-2" />
            <input
              type="text"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 9 AM - 5 PM"
            />
          </div>
        </section>

        {/* Account Security */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <FaLock className="text-green-600" /> Account Security
          </h3>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="flex items-center border-b border-gray-300 py-2">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                placeholder="Enter new password"
              />
            </div>
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors w-full shadow-md"
            >
              Update Password
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default TherapistSettings;
