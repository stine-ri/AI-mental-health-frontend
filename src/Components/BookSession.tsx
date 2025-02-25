import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

const BookSession: React.FC = () => {
  const { therapistId: paramTherapistId } = useParams<{ therapistId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  interface Therapist {
    id: number;
    full_name: string;
    specialization: string;
    experience_years: number;
    contact_phone: string;
  }

  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [sessionNotes, setSessionNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  // Retrieve user and token correctly
  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser).user.id : 0;
  const token = localStorage.getItem("token");

  // Parse IDs safely
  const therapistId = paramTherapistId || searchParams.get("therapistId");
  const therapistIdNum = therapistId ? Number(therapistId) : NaN;
  const userIdNum = Number(userId);

  useEffect(() => {
    if (!token) {
      setError("Please log in to book a session.");
      setIsFetching(false);
      return;
    }

    if (isNaN(therapistIdNum) || therapistIdNum <= 0) {
      setError("Invalid therapist ID.");
      setIsFetching(false);
      return;
    }

    if (isNaN(userIdNum) || userIdNum <= 0) {
      setError("Invalid user ID. Please log in again.");
      setIsFetching(false);
      return;
    }

    const fetchTherapists = async () => {
      setIsFetching(true);
      try {
        const response = await fetch("https://ai-mentalhealthplatform.onrender.com/api/therapists", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch therapists. Status: ${response.status}`);
        }

        const data = await response.json();
        setTherapists(data);
        localStorage.setItem("therapists", JSON.stringify(data));
      } catch {
        setError("Error loading therapists. Please try again.");
      } finally {
        setIsFetching(false);
      }
    };

    try {
      const storedTherapists = JSON.parse(localStorage.getItem("therapists") || "[]");
      if (Array.isArray(storedTherapists) && storedTherapists.length > 0) {
        setTherapists(storedTherapists);
        setIsFetching(false);
      } else {
        fetchTherapists();
      }
    } catch {
      fetchTherapists();
    }
  }, [token]);

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  if (isFetching) {
    return <p className="text-center mt-10">Loading therapists...</p>;
  }

  const therapist = therapists.find((doc) => doc.id === therapistIdNum);
  if (!therapist) {
    return <p className="text-center mt-10 text-red-500">Therapist not found.</p>;
  }

  const handleConfirmBooking = async () => {
    setLoading(true);
    setError(null);

    const bookingData = {
      user_id: userIdNum,
      therapist_id: therapistIdNum,
      session_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      booking_status: "Pending",
      session_notes: sessionNotes,
    };

    try {
      const response = await fetch("https://ai-mentalhealthplatform.onrender.com/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to book session.");
      }

      alert("Session booked successfully!");
      navigate("/checkout");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-5 mt-10 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Confirm Booking</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="p-4 bg-gray-100 rounded-lg">
        <p><strong>Doctor:</strong> {therapist.full_name}</p>
        <p><strong>Specialization:</strong> {therapist.specialization}</p>
        <p><strong>Experience:</strong> {therapist.experience_years} years</p>
        <p><strong>Contact:</strong> {therapist.contact_phone}</p>
        <p><strong>Date:</strong> {dayjs().format("DD MMM YYYY")}</p>
      </div>

      <textarea
        className="w-full p-2 border rounded text-sm mt-4"
        placeholder="Enter session notes (optional)"
        value={sessionNotes}
        onChange={(e) => setSessionNotes(e.target.value)}
      ></textarea>

      <button
        className="w-full mt-4 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        onClick={handleConfirmBooking}
        disabled={loading}
      >
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
    </div>
  );
};

export default BookSession;