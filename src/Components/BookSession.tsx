// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, useSearchParams, useLocation } from "react-router-dom";
// import dayjs from "dayjs";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";
// import { Loader, Calendar, User, Phone, Clock } from "lucide-react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "react-toastify/dist/ReactToastify.css";

// const BookSession: React.FC = () => {
//   const { therapistId: paramTherapistId } = useParams<{ therapistId: string }>();
//   const [searchParams] = useSearchParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   interface Therapist {
//     id: number;
//     full_name: string;
//     specialization: string;
//     experience_years: number;
//     contact_phone: string;
//     availability: boolean;
//   }

//   const [therapist, setTherapist] = useState<Therapist | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isFetching, setIsFetching] = useState(true);
//   const [isBooking, setIsBooking] = useState(false);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
//   const [selectedTime, setSelectedTime] = useState<string>("");

//   const storedUser = localStorage.getItem("user");
//   const user = storedUser ? JSON.parse(storedUser).user : null;
//   const token = localStorage.getItem("token");

//   const therapistId = paramTherapistId || searchParams.get("therapistId");
//   const therapistIdNum = therapistId ? Number(therapistId) : NaN;
//   const userIdNum = user ? Number(user.id) : NaN;

//   useEffect(() => {
//     if (!token) {
//       setError("Please log in to book a session.");
//       setIsFetching(false);
//       return;
//     }

//     if (isNaN(therapistIdNum) || therapistIdNum <= 0) {
//       setError("Invalid therapist ID.");
//       setIsFetching(false);
//       return;
//     }

//     if (isNaN(userIdNum) || userIdNum <= 0) {
//       setError("Invalid user ID. Please log in again.");
//       setIsFetching(false);
//       return;
//     }

//     // Check if therapist data was passed from previous component
//     if (location.state?.therapist) {
//       setTherapist(location.state.therapist);
//       setIsFetching(false);
//       return;
//     }

//     // Fetch therapist details if not available in state
//     const fetchTherapist = async () => {
//       try {
//         setIsFetching(true);
//         const response = await fetch(
//           `https://ai-mentalhealthplatform.onrender.com/api/therapists/${therapistIdNum}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         if (!response.ok) {
//           throw new Error(`Failed to fetch therapist. Status: ${response.status}`);
//         }

//         const data = await response.json();
//         setTherapist(data);
//         localStorage.setItem(`therapist_${therapistIdNum}`, JSON.stringify(data));
//       } catch (err) {
//         console.error("Error fetching therapist:", err);
//         setError("Error loading therapist details. Please try again.");
//       } finally {
//         setIsFetching(false);
//       }
//     };

//     const storedTherapist = localStorage.getItem(`therapist_${therapistIdNum}`);
//     if (storedTherapist) {
//       setTherapist(JSON.parse(storedTherapist));
//       setIsFetching(false);
//     } else {
//       fetchTherapist();
//     }
//   }, [token, therapistIdNum, userIdNum, location.state]);

//   if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
//   if (isFetching) return <p className="text-center mt-10">Loading therapist details...</p>;
//   if (!therapist) return <p className="text-center mt-10 text-red-500">Therapist not found.</p>;

//   const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];

//   const handleConfirmBooking = async () => {
//     if (!selectedDate) {
//       toast.error(" Please select a date for the session.");
//       return;
//     }

//     if (!selectedTime) {
//       toast.error(" Please select a time slot for the session.");
//       return;
//     }

//     setError(null);
//     setIsBooking(true);

//     const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");

//     localStorage.setItem("selectedDate", formattedDate);
//     localStorage.setItem("selectedTime", selectedTime);

//     const bookingData = {
//       user_id: userIdNum,
//       therapist_id: therapistIdNum,
//       session_date: formattedDate,
//       session_time: selectedTime,
//       booking_status: "Pending",
//     };

//     try {
//       const response = await fetch(
//         "https://ai-mentalhealthplatform.onrender.com/api/bookings",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(bookingData),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to book session.");
//       }

//       toast.success(" Session booked successfully!");
//       navigate("/book-payment");
//     } catch (error) {
//       setError(error instanceof Error ? error.message : "Network error. Please try again.");
//       toast.error(`❌ ${error instanceof Error ? error.message : "Network error."}`);
//     } finally {
//       setIsBooking(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-lg mx-auto p-5 mt-6 border rounded-lg shadow-md bg-white mb-10"
//     >
//       <h2 className="text-xl font-semibold text-center mb-6">Confirm Booking</h2>

//       {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//       <motion.div
//         initial={{ scale: 0.9 }}
//         animate={{ scale: 1 }}
//         transition={{ duration: 0.3 }}
//         className="p-4 bg-gray-100 rounded-lg gap-4 flex flex-col"
//       >
//         <p className="flex items-center gap-2"><User className="text-green-500" /> <strong>Therapist:</strong> {therapist.full_name}</p>
//         <p className="flex items-center gap-2"><Calendar className="text-green-500" /> <strong>Specialization:</strong> {therapist.specialization}</p>
//         <p className="flex items-center gap-2"><User className="text-green-500" /> <strong>Experience:</strong> {therapist.experience_years} years</p>
//         <p className="flex items-center gap-2"><Phone className="text-green-500" /> <strong>Contact:</strong> {therapist.contact_phone}</p>
//       </motion.div>

//       <div className="mt-6">
//         <label className="flex items-center gap-2 text-sm mb-2"><Calendar className="text-green-500" /> Select Date</label>
//         <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} minDate={new Date()} className="p-2 border rounded w-full" />
//       </div>

//       <div className="mt-4">
//         <label className="flex items-center gap-2 text-sm mb-2"><Clock className="text-green-500" /> Select Time Slot</label>
//         <select className="p-2 border rounded w-full" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
//           <option value="">Select Time</option>
//           {timeSlots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
//         </select>
//       </div>

//       <button className="w-full mt-4 py-2 bg-green-500 text-white rounded flex justify-center items-center gap-2 hover:bg-green-600 transition" onClick={handleConfirmBooking} disabled={isBooking}>
//         {isBooking ? <Loader className="animate-spin" /> : "Confirm Booking"}
//       </button>
//     </motion.div>
//   );
// };

// export default BookSession;



import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Loader, Calendar, User, Phone, Clock } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";

const BookSession: React.FC = () => {
  const { therapistId: paramTherapistId } = useParams<{ therapistId: string }>();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  interface Therapist {
    id: number;
    full_name: string;
    specialization: string;
    experience_years: number;
    contact_phone: string;
    availability: boolean;
  }

  const [therapist, setTherapist] = useState<Therapist | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser).user : null;
  const token = localStorage.getItem("token");

  const therapistId = paramTherapistId || searchParams.get("therapistId");
  const therapistIdNum = therapistId ? Number(therapistId) : NaN;
  const userIdNum = user ? Number(user.id) : NaN;

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

    // Check if therapist data was passed from previous component
    if (location.state?.therapist) {
      setTherapist(location.state.therapist);
      setIsFetching(false);
      return;
    }

    // Fetch therapist details if not available in state
    const fetchTherapist = async () => {
      try {
        setIsFetching(true);
        const response = await fetch(
          `https://ai-mentalhealthplatform.onrender.com/api/therapists/${therapistIdNum}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch therapist. Status: ${response.status}`);
        }

        const data = await response.json();
        setTherapist(data);
        localStorage.setItem(`therapist_${therapistIdNum}`, JSON.stringify(data));
      } catch (err) {
        console.error("Error fetching therapist:", err);
        setError("Error loading therapist details. Please try again.");
      } finally {
        setIsFetching(false);
      }
    };

    const storedTherapist = localStorage.getItem(`therapist_${therapistIdNum}`);
    if (storedTherapist) {
      setTherapist(JSON.parse(storedTherapist));
      setIsFetching(false);
    } else {
      fetchTherapist();
    }
  }, [token, therapistIdNum, userIdNum, location.state]);

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (isFetching) return <p className="text-center mt-10">Loading therapist details...</p>;
  if (!therapist) return <p className="text-center mt-10 text-red-500">Therapist not found.</p>;

  const timeSlots = [
    { label: "08:00-10:00", value: "08:00:00" },
    { label: "11:00-13:00", value: "11:00:00" },
    { label: "14:00-17:00", value: "14:00:00" },
    { label: "17:00-19:00", value: "17:00:00" } // Added new time slot
  ];
  
  const getAvailableTimeSlots = () => {
    const now = dayjs().tz("Africa/Nairobi");
    const today = dayjs(selectedDate).isSame(now, "day");
    const bookedSlots = JSON.parse(localStorage.getItem("bookedSlots") || "{}");
    const selectedDateStr = dayjs(selectedDate).format("YYYY-MM-DD");
  
    return timeSlots.map(({ label, value }) => {
      const startHour = parseInt(value.split(":")[0]);
      const slotTime = dayjs(selectedDate)
        .tz("Africa/Nairobi")
        .hour(startHour)
        .minute(0)
        .second(0);
      
      // Check if slot is booked
      const isBooked = bookedSlots[selectedDateStr]?.includes(value);
      
      // Check if slot is in the past (only for today)
      const isPast = today && slotTime.isBefore(now);
      
      return {
        label,
        value,
        disabled: isPast || isBooked,
        booked: isBooked
      };
    });
  };
  
  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time slot for the session.");
      return;
    }
  
    setError(null);
    setIsBooking(true);
  
    const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
    const formattedTime = selectedTime.padEnd(8, ":00"); // Ensures "HH:mm" -> "HH:mm:ss"
  
    const bookingData = {
      user_id: userIdNum,
      therapist_id: therapistIdNum,
      therapist_name: therapist.full_name,
      specialization: therapist.specialization,
      session_date: formattedDate,
      session_time: formattedTime,
      booking_status: "Pending",
    };
  
    try {
      const response = await fetch(
        "https://ai-mentalhealthplatform.onrender.com/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookingData),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to book session.");
      }
  
      // Update local storage to mark this slot as booked
      const bookedSlots = JSON.parse(localStorage.getItem("bookedSlots") || "{}");
      if (!bookedSlots[formattedDate]) {
        bookedSlots[formattedDate] = [];
      }
      bookedSlots[formattedDate].push(formattedTime);
      localStorage.setItem("bookedSlots", JSON.stringify(bookedSlots));
  
      toast.success("Session booked successfully!");
      navigate("/book-payment", {
        state: {
          therapistName: therapist.full_name,
          specialization: therapist.specialization,
          selectedDate: formattedDate,
          selectedTime: formattedTime,
        },
      });
  
    } catch (error) {
      setError(error instanceof Error ? error.message : "Network error. Please try again.");
      toast.error(`❌ ${error instanceof Error ? error.message : "Network error."}`);
    } finally {
      setIsBooking(false);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto p-5 mt-6 border rounded-lg shadow-md bg-white mb-10"
    >
      <h2 className="text-xl font-semibold text-center mb-6">Confirm Booking</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="p-4 bg-gray-100 rounded-lg gap-4 flex flex-col"
      >
        <p className="flex items-center gap-2"><User className="text-green-500" /> <strong>Therapist:</strong> {therapist.full_name}</p>
        <p className="flex items-center gap-2"><Calendar className="text-green-500" /> <strong>Specialization:</strong> {therapist.specialization}</p>
        <p className="flex items-center gap-2"><User className="text-green-500" /> <strong>Experience:</strong> {therapist.experience_years} years</p>
        <p className="flex items-center gap-2"><Phone className="text-green-500" /> <strong>Contact:</strong> {therapist.contact_phone}</p>
      </motion.div>

      <div className="mt-6">
        <label className="flex items-center gap-2 text-sm mb-2"><Calendar className="text-green-500" /> Select Date</label>
        <DatePicker 
          selected={selectedDate} 
          onChange={(date) => {
            setSelectedDate(date);
            setSelectedTime(""); // Reset time when date changes
          }} 
          minDate={new Date()} 
          className="p-2 border rounded w-full" 
        />
      </div>

      <div className="mt-4">
        <label className="flex items-center gap-2 text-sm mb-2"><Clock className="text-green-500" /> Select Time Slot</label>
        <select 
          className="p-2 border rounded w-full" 
          value={selectedTime} 
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option value="">Select Time</option>
          {getAvailableTimeSlots().map(({ label, value, disabled, booked }) => (
            <option 
              key={value} 
              value={disabled ? "" : value} 
              disabled={disabled}
              className={disabled ? "text-gray-400" : ""}
            >
              {booked ? `${label} (Booked)` : label}
              {disabled && !booked ? " (Not available)" : ""}
            </option>
          ))}
        </select>
      </div>

      <button 
        className="w-full mt-4 py-2 bg-green-500 text-white rounded flex justify-center items-center gap-2 hover:bg-green-600 transition" 
        onClick={handleConfirmBooking} 
        disabled={isBooking || !selectedTime}
      >
        {isBooking ? <Loader className="animate-spin" /> : "Confirm Booking"}
      </button>
    </motion.div>
  );
};

export default BookSession;