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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8 bg-gradient-to-r from-green-600 to-emerald-600">
            <h1 className="text-2xl font-bold text-white">Therapist Settings</h1>
            <p className="text-emerald-100">Manage your account preferences and security</p>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Profile Management */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-100 text-green-600">
                  <FaUser className="text-lg" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
              </div>
              
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      required
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  Update Profile
                </button>
              </form>
            </section>

            {/* Notification Settings */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-100 text-green-600">
                  <FaBell className="text-lg" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Notification Preferences</h2>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FaBell className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Receive appointment notifications
                  </span>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </section>

            {/* Availability Settings */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-100 text-green-600">
                  <FaClock className="text-lg" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Working Hours</h2>
              </div>

              <div className="space-y-2">
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                  Your regular availability
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaClock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="availability"
                    type="text"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., 9 AM - 5 PM"
                  />
                </div>
              </div>
            </section>

            {/* Account Security */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-100 text-green-600">
                  <FaLock className="text-lg" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Security Settings</h2>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      required
                      placeholder="Enter new password"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  Change Password
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistSettings;