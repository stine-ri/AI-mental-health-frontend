import React from "react";
import { useNavigate } from "react-router-dom";
import specialist1 from "../assets/images/Doc 1.webp";
import specialist2 from "../assets/images/Doc 2.webp";
import specialist3 from "../assets/images/Doc 3.jpg";
import specialist4 from "../assets/images/Doc 4.webp";

const specialists = [
  { id: 1, name: "Dr. Rachel Porter", experience: "10+ Years", image: specialist1, specialty: "Psychiatry" },
  { id: 2, name: "Dr. Ray Lawson", experience: "8+ Years", image: specialist2, specialty: "Therapy" },
  { id: 3, name: "Dr. Dorothy Brien", experience: "5+ Years", image: specialist3, specialty: "Mental Health" },
  { id: 4, name: "Dr. Jane Traversa", experience: "7+ Years", image: specialist4, specialty: "Counseling" },
];

const Specialists: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-green-50 text-center">
      <h2 className="text-3xl font-bold text-green-900 mb-8">Get Treatment From Our Specialists</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
        {specialists.map((specialist) => (
          <div
            key={specialist.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 text-center"
          >
            <img
              src={specialist.image}
              alt={specialist.name}
              className="w-28 h-28 mx-auto rounded-full border-4 border-green-200 mb-4"
            />
            <h3 className="text-lg font-semibold text-green-900">{specialist.name}</h3>
            <p className="text-sm text-gray-600">{specialist.specialty} - {specialist.experience}</p>
            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
              onClick={() => navigate(`/specialist/${specialist.id}`)}
            >
              Book Doctor
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Specialists;
