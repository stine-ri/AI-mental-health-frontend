import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import psychiatristImg from "../assets/images/Doc 1.webp";
import psychologistImg from "../assets/images/Doc6.jpg";
import therapistImg from "../assets/images/Doc 3.jpg";
import counselorImg from "../assets/images/Doc 4.webp";
import neuropsychiatristImg from "../assets/images/Doc5.avif";
import socialWorkerImg from "../assets/images/Doc 2.webp";

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

// Store booked time slots in localStorage
const getBookedSlots = () => {
  const today = new Date().toDateString();
  const savedSlots = JSON.parse(localStorage.getItem("bookedSlots") || "{}");

  // Reset booked slots every new day
  if (savedSlots.date !== today) {
    localStorage.setItem(
      "bookedSlots",
      JSON.stringify({ date: today, slots: [] })
    );
    return [];
  }

  return savedSlots.slots || [];
};

interface BookedSlots {
  date: string;
  slots: string[];
}

const updateBookedSlots = (newSlot: string): void => {
  const today = new Date().toDateString();
  const savedSlots: BookedSlots = JSON.parse(localStorage.getItem("bookedSlots") || "{}");

  const updatedSlots: BookedSlots = {
    date: today,
    slots: [...(savedSlots.slots || []), newSlot],
  };

  localStorage.setItem("bookedSlots", JSON.stringify(updatedSlots));
};

const getNextDayValidTimeSlots = () => {
  const timeSlots = [];
  for (let hour = 8; hour < 17; hour++) {
    if (hour < 12 || hour >= 14) {
      timeSlots.push(`${hour}:00`);
    }
  }
  return timeSlots;
};

const BookPayment: React.FC = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);
  const [amount] = useState(50);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  useEffect(() => {
    const allSlots = getNextDayValidTimeSlots();
    const bookedSlots = getBookedSlots();
    const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));
    setTimeSlots(availableSlots);
  }, []);

  const handlePayment = async () => {
    if (!phoneNumber.trim() || !selectedTimeSlot) {
      alert("Please enter a valid phone number and select a time slot.");
      return;
    }

    const paymentData = {
      phoneNumber,
      amount,
      referenceCode: selectedDoctor.name,
      description: selectedDoctor.specialty,
      appointmentDate: new Date().toISOString().split("T")[0],
      appointmentTime: selectedTimeSlot,
    };

    try {
      const response = await fetch("http://localhost:3000/api/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error("Payment failed. Please try again.");
      }

      alert("Payment successful!");

      // Mark the time slot as booked
      updateBookedSlots(selectedTimeSlot);

      navigate("/confirmation", {
        state: {
          doctor: selectedDoctor,
          date: paymentData.appointmentDate,
          time: selectedTimeSlot,
        },
      });
    } catch (error) {
      alert(error instanceof Error ? error.message : "Network error. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Confirm Payment</h2>

      <label className="block font-medium text-gray-700 mb-2">Select a Doctor</label>
      <select
        value={selectedDoctor.id}
        onChange={(e) =>
          setSelectedDoctor(doctors.find((doc) => doc.id === Number(e.target.value)) || doctors[0])
        }
        className="w-full p-3 border rounded-md mb-5"
      >
        {doctors.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name} - {doctor.specialty}
          </option>
        ))}
      </select>

      <label className="block font-medium text-gray-700 mb-2">Select Time Slot</label>
      <select
        value={selectedTimeSlot}
        onChange={(e) => setSelectedTimeSlot(e.target.value)}
        className="w-full p-3 border rounded-md mb-5"
      >
        <option value="" disabled>Select a time</option>
        {timeSlots.map((slot, index) => (
          <option key={index} value={slot}>{slot}</option>
        ))}
      </select>

      <label className="block font-medium text-gray-700 mb-2">Enter Phone Number</label>
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter phone number"
        className="w-full p-3 border rounded-md mb-5"
      />

      <button
        onClick={handlePayment}
        className="w-full py-3 text-white bg-green-600 rounded-md shadow-md hover:bg-green-700"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default BookPayment;
