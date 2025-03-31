import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Import images from assets
import defaultImage from "../assets/images/johndoc.avif";
import psychiatristImg from "../assets/images/Doc 1.webp";
import psychologistImg from "../assets/images/Doc6.jpg";
import therapistImg from "../assets/images/Doc 3.jpg";
import counselorImg from "../assets/images/Doc 4.webp";
import neuropsychiatristImg from "../assets/images/Doc5.avif";
import socialWorkerImg from "../assets/images/Doc 2.webp";

// Define therapist interface
interface Therapist {
  id: number;
  full_name: string;
  specialization: string;
  experience_years: number;
  contact_phone: string;
  availability: boolean;
}

// Map specialization to the correct image
const specializationImageMap: { [key: string]: string } = {
  psychiarist: psychiatristImg,
  psychologist: psychologistImg,
  Therapist: therapistImg,
  "Licensed Counsellor": counselorImg,
  Neuropsychiatrist: neuropsychiatristImg,
  "Clinical Social worker": socialWorkerImg,
};

const SessionBooking: React.FC = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch therapists from backend
  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await fetch(
          "https://ai-mentalhealthplatform.onrender.com/api/therapists"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch therapists.");
        }
        const data = await response.json();
        setTherapists(data);
      } catch (err) {
        setError((err as Error).message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    fetchTherapists();
  }, []);

  // Handle navigation to booking page
  const handleNavigateToBooking = (therapistId: number) => {
    navigate(`/book-session?therapistId=${therapistId}`);
  };

  // Get image based on specialization or fallback to default
  const getTherapistImage = (specialization: string) => {
    return specializationImageMap[specialization] || defaultImage;
  };

  if (loading) {
    return <p className="text-center mt-10">Loading therapists...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Book a Therapy Session
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {therapists.map((therapist) => (
          <div
            key={therapist.id}
            className="p-4 border rounded-lg shadow-md hover:shadow-lg transition bg-white text-center"
          >
            <img
              src={getTherapistImage(therapist.specialization)}
              alt={therapist.full_name}
              className="w-32 h-32 object-cover mx-auto rounded-full mb-3"
            />
            <h3 className="text-lg font-semibold">{therapist.full_name}</h3>
            <p className="text-sm text-gray-600 mb-1">
              {therapist.specialization}
            </p>
            <p className="text-sm text-gray-500 mb-3">
              {therapist.experience_years} years of experience
            </p>
            <button
              className="w-full py-2 rounded bg-green-500 hover:bg-green-600 text-white transition"
              onClick={() => handleNavigateToBooking(therapist.id)}
              disabled={!therapist.availability}
            >
              {therapist.availability ? "Book Session" : "Not Available"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionBooking;
