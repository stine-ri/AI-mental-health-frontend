import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Doctor images (Replace with actual imports)
import psychiatristImg from "../assets/images/Doc 1.webp";
import psychologistImg from "../assets/images/Doc6.jpg";
import therapistImg from "../assets/images/Doc 3.jpg";
import counselorImg from "../assets/images/Doc 4.webp";
import neuropsychiatristImg from "../assets/images/Doc5.avif";
import socialWorkerImg from "../assets/images/Doc 2.webp";

interface Doctor {
  id: number;
  image: string;
  name: string;
  specialty: string;
}

const doctors: Doctor[] = [
  { id: 3, image: psychiatristImg, name: "Dr. Mark Okwena", specialty: "Psychiatrist" },
  { id: 4, image: psychologistImg, name: "Dr. Celestina Kweyu", specialty: "Psychologist" },
  { id: 5, image: therapistImg, name: "Dr. Faith Ndungwa", specialty: "Therapist" },
  { id: 6, image: counselorImg, name: "Dr. Cyrus Kimutai", specialty: "Licensed Counsellor" },
  { id: 7, image: neuropsychiatristImg, name: "Dr. Riyan Moraa", specialty: "Neuropsychiatrist" },
  { id: 8, image: socialWorkerImg, name: "Dr. Christine Monyancha", specialty: "Clinical Social Worker" },
];

const SessionBooking: React.FC = () => {
  const navigate = useNavigate();
  const [sessionCounts, setSessionCounts] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const today = new Date().toDateString();
    const storedData = localStorage.getItem("sessionCounts");
    const storedDate = localStorage.getItem("sessionDate");

    if (storedData && storedDate === today) {
      setSessionCounts(JSON.parse(storedData));
    } else {
      localStorage.removeItem("sessionCounts");
      localStorage.setItem("sessionDate", today);
    }
  }, []);

  const handleNavigateToBooking = (therapistId: number) => {
    if ((sessionCounts[therapistId] || 0) < 3) {
      const newCounts = { ...sessionCounts, [therapistId]: (sessionCounts[therapistId] || 0) + 1 };
      setSessionCounts(newCounts);
      localStorage.setItem("sessionCounts", JSON.stringify(newCounts));
      navigate(`/book-session?therapistId=${therapistId}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-2xl font-semibold text-center mb-6">Book a Therapy Session</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="p-4 border rounded-lg shadow-md hover:shadow-lg transition bg-white text-center">
            <img src={doctor.image} alt={doctor.name} className="w-32 h-32 object-cover mx-auto rounded-full mb-3" />
            <h3 className="text-lg font-semibold">{doctor.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{doctor.specialty}</p>
            <button
              className={`w-full py-2 rounded transition ${sessionCounts[doctor.id] >= 3 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'}`}
              onClick={() => handleNavigateToBooking(doctor.id)}
              disabled={sessionCounts[doctor.id] >= 3}
            >
              {sessionCounts[doctor.id] >= 3 ? "Fully Booked Today" : "Book Session"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionBooking;
