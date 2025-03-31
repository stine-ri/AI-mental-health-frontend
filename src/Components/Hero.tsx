import React from "react";
import { useNavigate } from "react-router-dom";
const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-green-800 text-white text-center py-16">
      <h1 className="text-5xl font-bold">Embrace Your Mental Health</h1>
      <p className="mt-4">We understand your challenges. We are here to help.</p>
      <button 
        className="bg-green-500 px-6 py-3 mt-6 rounded" 
        onClick={() => navigate('/login')}
      >
        Book an   Appointment
      </button>
    </section>
  );
};

export default Hero;




