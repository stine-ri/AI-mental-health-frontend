import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Confirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctor, date, time } = location.state || {};

  return (
    <div className="max-w-lg mx-auto p-5 mt-10 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold text-center mb-4 text-green-600">Session Confirmed ✅</h2>

      {doctor && date && time ? (
        <div className="p-4 bg-gray-100 rounded-lg mb-4">
          <p><strong>Doctor:</strong> {doctor.name}</p>
          <p><strong>Specialization:</strong> {doctor.specialty}</p>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Time:</strong> {time}</p>
        </div>
      ) : (
        <p className="text-red-500 text-center">No session details found.</p>
      )}

      <button
        className="w-full mt-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        onClick={() => navigate("/user-dashboard")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default Confirmation;
