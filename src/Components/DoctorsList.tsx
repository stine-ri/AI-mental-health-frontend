import React from "react";
import { useNavigate } from "react-router-dom";
import psychiatristImg from "../assets/images/Doc 1.webp";
import psychologistImg from "../assets/images/Doc6.jpg";
import therapistImg from "../assets/images/Doc 3.jpg";
import counselorImg from "../assets/images/Doc 4.webp";
import neuropsychiatristImg from "../assets/images/Doc5.avif";
import socialWorkerImg from "../assets/images/Doc 2.webp";

// Dummy user authentication check
const isAuthenticated = () => {
  return localStorage.getItem("user") !== null;
};

const doctors = [
  {
    id: 1,
    image: psychiatristImg,
    name: "Dr. Mark Okwena",
    specialty: "Psychiatrist",
    description:
      "A psychiatrist is a medical doctor specializing in diagnosing, treating, and preventing mental illnesses. They can prescribe medication and provide therapy.",
  },
  {
    id: 2,
    image: psychologistImg,
    name: "Dr. Celestina Kweyu",
    specialty: "Psychologist",
    description:
      "A psychologist helps patients understand and manage mental health conditions using talk therapy, behavioral therapy, and psychological assessments.",
  },
  {
    id: 3,
    image: therapistImg,
    name: "Dr. Faith Ndungwa",
    specialty: "Therapist",
    description:
      "Therapists provide support and coping strategies for various mental health challenges, including stress, trauma, and relationship issues.",
  },
  {
    id: 4,
    image: counselorImg,
    name: "Dr. Cyrus Kimutai",
    specialty: "Licensed Counselor",
    description:
      "A licensed counselor offers therapy and guidance for individuals dealing with anxiety, depression, and emotional struggles.",
  },
  {
    id: 5,
    image: neuropsychiatristImg,
    name: "Dr. Riyan Moraa",
    specialty: "Neuropsychiatrist",
    description:
      "Neuropsychiatrists specialize in the link between mental health and brain disorders, treating conditions like schizophrenia and dementia.",
  },
  {
    id: 6,
    image: socialWorkerImg,
    name: "Dr. Christine Monyancha",
    specialty: "Clinical Social Worker",
    description:
      "A clinical social worker provides therapy and connects patients with community resources to improve mental well-being.",
  },
];

const DoctorsList: React.FC = () => {
  const navigate = useNavigate();

  const handleBooking = () => {
    if (isAuthenticated()) {
      navigate("/register"); // Redirect to booking page
    } else {
      navigate("/register"); // Redirect to register page if not logged in
    }
  };

  return (
    <section className="py-16 px-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-green-900 mb-16">Meet Our Mental Health Experts</h2>

      <div className="max-w-5xl mx-auto space-y-20">
        {doctors.map((doctor, index) => (
          <div
            key={doctor.id}
            className={`flex flex-col md:flex-row items-center md:items-start md:gap-12 space-y-6 md:space-y-0 ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full md:w-1/2 rounded-lg shadow-lg"
            />
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-semibold text-green-800 mb-2">{doctor.name}</h3>
              <h4 className="text-lg font-medium text-green-600 mb-4">{doctor.specialty}</h4>
              <p className="text-gray-700 leading-relaxed mb-4">{doctor.description}</p>
              <button
                onClick={handleBooking}
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DoctorsList;