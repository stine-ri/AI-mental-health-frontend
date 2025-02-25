import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

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

interface Session {
  id: number;
  therapist_id: number;
  session_date: string;
  session_notes: string;
}

const doctors: Doctor[] = [
    { id: 3, image: psychiatristImg, name: "Dr. Mark Okwena", specialty: "Psychiarist" },
    { id: 4, image: psychologistImg, name: "Dr. Celestina Kweyu", specialty: "Psychologist" },
    { id: 5, image: therapistImg, name: "Dr. Faith Ndungwa", specialty: "Therapist" },
    { id: 6, image: counselorImg, name: "Dr. Cyrus Kimutai", specialty: "Licensed Counsellor" },
    { id: 7, image: neuropsychiatristImg, name: "Dr. Riyan Moraa", specialty: "Neuropsychiatrist" },
    { id: 8, image: socialWorkerImg, name: "Dr. Christine Monyancha", specialty: "Clinical Social worker" },
  ];
  

const SessionBooking: React.FC = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      console.error("No token or user ID found, user must be logged in.");
      setError("User authentication required. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      const userId = parsedUser?.user?.id;
      console.log("Parsed User Data:", parsedUser);
      console.log("Extracted User ID:", userId);
 
      if (!userId) {
        console.error("User ID is missing in stored user data.");
        setError("User authentication required. Please log in.");
        setLoading(false);
        return;
      }

      setLoading(true);
      fetch(`https://ai-mentalhealthplatform.onrender.com/api/session`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(`Error ${res.status}`)))
        .then((data) => setSessions(data))
        .catch((err) => {
          console.error("Error fetching sessions:", err);
          setError("Failed to load sessions. Please try again.");
        })
        .finally(() => setLoading(false));
    } catch (err) {
      console.error("Error parsing stored user:", err);
      setError("Invalid user data. Please log in again.");
      setLoading(false);
    }
  }, []);

  const handleNavigateToBooking = (therapistId: number) => {
    navigate(`/book-session?therapistId=${therapistId}`);
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
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
              onClick={() => handleNavigateToBooking(doctor.id)}
            >
              Book Session
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Past Sessions</h2>

      {loading ? (
        <p className="text-gray-500">Loading sessions...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : sessions.length > 0 ? (
        <ul className="space-y-4">
          {sessions.map((session) => {
            const doctor = doctors.find((doc) => doc.id === session.therapist_id);
            return (
              <li key={session.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                <p><strong>Doctor:</strong> {doctor ? doctor.name : "Unknown"}</p>
                <p><strong>Date:</strong> {format(new Date(session.session_date), "PPpp")}</p>
                <p><strong>Notes:</strong> {session.session_notes}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-500">No past sessions found.</p>
      )}
    </div>
  );
};

export default SessionBooking;
