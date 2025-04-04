// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { toast, ToastContainer } from "react-toastify";
// // import { FaCheckCircle, FaExclamationCircle, FaUserMd, FaClock, FaPhoneAlt, FaCalendarAlt } from "react-icons/fa";
// // import { Loader } from "lucide-react";
// // import "react-toastify/dist/ReactToastify.css";
// // import psychiatristImg from "../assets/images/Doc 1.webp";
// // import psychologistImg from "../assets/images/Doc6.jpg";
// // import therapistImg from "../assets/images/Doc 3.jpg";
// // import counselorImg from "../assets/images/Doc 4.webp";
// // import neuropsychiatristImg from "../assets/images/Doc5.avif";
// // import socialWorkerImg from "../assets/images/Doc 2.webp";

// // const doctors = [
// //   { id: 1, image: psychiatristImg, name: "Dr. Mark Okwena", specialty: "Psychiatrist" },
// //   { id: 2, image: psychologistImg, name: "Dr. Celestina Kweyu", specialty: "Psychologist" },
// //   { id: 3, image: therapistImg, name: "Dr. Faith Ndungwa", specialty: "Therapist" },
// //   { id: 4, image: counselorImg, name: "Dr. Cyrus Kimutai", specialty: "Licensed Counselor" },
// //   { id: 5, image: neuropsychiatristImg, name: "Dr. Riyan Moraa", specialty: "Neuropsychiatrist" },
// //   { id: 6, image: socialWorkerImg, name: "Dr. Christine Monyancha", specialty: "Clinical Social Worker" },
// //   { id: 7, image: socialWorkerImg, name: "Dr. John Smith", specialty: "Therapits" },
// //   { id: 8, image: socialWorkerImg, name: "Dr. Kimm taehyung", specialty: "Psychology" },
// // ];

// // interface BookedSlots {
// //   [doctorId: number]: { [date: string]: string[] };
// // }

// // const getBookedSlots = (doctorId: number, date: string): string[] => {
// //   const savedSlots: BookedSlots = JSON.parse(localStorage.getItem("bookedSlots") || "{}");
// //   return savedSlots[doctorId]?.[date] || [];
// // };

// // const updateBookedSlots = (doctorId: number, date: string, newSlot: string): void => {
// //   const savedSlots: BookedSlots = JSON.parse(localStorage.getItem("bookedSlots") || "{}");
// //   const doctorSlots = savedSlots[doctorId] || {};
// //   const updatedSlots = doctorSlots[date] ? [...doctorSlots[date], newSlot] : [newSlot];
// //   savedSlots[doctorId] = { ...doctorSlots, [date]: updatedSlots };
// //   localStorage.setItem("bookedSlots", JSON.stringify(savedSlots));
// // };

// // const timeSlotRanges = ["8:00-10:00", "11:00-1:00", "15:00-17:00"];

// // const BookPayment: React.FC = () => {
// //   const navigate = useNavigate();
// //   const [phoneNumber, setPhoneNumber] = useState("");
// //   const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);
// //   const [amount] = useState(50);
// //   const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
// //   const [selectedDate, setSelectedDate] = useState("");
// //   const [timeSlots, setTimeSlots] = useState<string[]>([]);
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     const storedDate = localStorage.getItem("selectedDate");
// //     if (storedDate) {
// //       setSelectedDate(storedDate);
// //     } else {
// //       navigate("/book-session"); // Redirect if no date found
// //     }
// //   }, [navigate]);

// //   useEffect(() => {
// //     if (selectedDate) {
// //       const booked = getBookedSlots(selectedDoctor.id, selectedDate);
// //       const available = timeSlotRanges.filter((slot) => !booked.includes(slot));
// //       setTimeSlots(available);
// //     }
// //   }, [selectedDoctor, selectedDate]);

// //   const handlePayment = async () => {
// //     if (!phoneNumber.trim() || !selectedTimeSlot || !selectedDate) {
// //       toast.error(
// //         <div className="flex items-center gap-2">
// //           <FaExclamationCircle className="text-red-600" /> Please fill all fields correctly.
// //         </div>
// //       );
// //       return;
// //     }

// //     const paymentData = {
// //       phoneNumber,
// //       amount,
// //       referenceCode: selectedDoctor.name,
// //       description: selectedDoctor.specialty,
// //       appointmentDate: selectedDate,
// //       appointmentTime: selectedTimeSlot,
// //     };

// //     setLoading(true);
// //     try {
// //       const response = await fetch("http://localhost:8000/api/initiate", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(paymentData),
// //       });

// //       if (!response.ok) throw new Error("Payment failed. Please try again.");

// //       updateBookedSlots(selectedDoctor.id, selectedDate, selectedTimeSlot);

// //       toast.success(
// //         <div className="flex items-center gap-2">
// //           <FaCheckCircle className="text-green-600" /> Payment successful!
// //         </div>
// //       );

// //       setLoading(false);

// //       setTimeout(() => {
// //         navigate("/confirmation", {
// //           state: {
// //             doctor: selectedDoctor,
// //             date: selectedDate,
// //             time: selectedTimeSlot,
// //           },
// //         });
// //       }, 1000);
// //     } catch (error) {
// //       toast.error(
// //         <div className="flex items-center gap-2">
// //           <FaExclamationCircle className="text-red-600" />
// //           {error instanceof Error ? error.message : "Network error. Please try again."}
// //         </div>
// //       );
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="max-w-lg mx-auto p-6 mt-10 mb-20 border rounded-lg shadow-lg bg-white animate-fadeIn 
// //                     sm:max-w-md md:max-w-lg">
// //       <ToastContainer position="top-right" autoClose={3000} />
// //       <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Confirm Payment</h2>

// //       <div className="space-y-4">
// //         <label className="font-medium text-gray-700 flex items-center gap-2">
// //           <FaUserMd className="text-green-600" /> Select a Doctor
// //         </label>
// //         <select
// //           value={selectedDoctor.id}
// //           onChange={(e) => setSelectedDoctor(doctors.find((doc) => doc.id === Number(e.target.value)) || doctors[0])}
// //           className="w-full p-3 border rounded-md"
// //         >
// //           {doctors.map((doctor) => (
// //             <option key={doctor.id} value={doctor.id}>
// //               {doctor.name} - {doctor.specialty}
// //             </option>
// //           ))}
// //         </select>

// //         <p className="text-gray-700 font-medium flex items-center gap-2">
// //           <FaCalendarAlt className="text-green-600" /> Appointment Date: {selectedDate}
// //         </p>

// //         <label className="font-medium text-gray-700 flex items-center gap-2">
// //           <FaClock className="text-green-600" /> Select Time Slot
// //         </label>
// //         <select
// //           value={selectedTimeSlot}
// //           onChange={(e) => setSelectedTimeSlot(e.target.value)}
// //           className="w-full p-3 border rounded-md"
// //           disabled={!selectedDate}
// //         >
// //           <option value="" disabled>
// //             Select a time
// //           </option>
// //           {timeSlots.map((slot, index) => (
// //             <option key={index} value={slot}>
// //               {slot}
// //             </option>
// //           ))}
// //         </select>

// //         <label className="font-medium text-gray-700 flex items-center gap-2">
// //           <FaPhoneAlt className="text-green-600" /> Enter Phone Number
// //         </label>
// //         <input
// //           type="text"
// //           value={phoneNumber}
// //           onChange={(e) => setPhoneNumber(e.target.value)}
// //           placeholder="Enter phone number"
// //           className="w-full p-3 border rounded-md"
// //         />
// //       </div>

// //       <button
// //         onClick={handlePayment}
// //         className="w-full py-3 mt-6 text-white bg-green-600 rounded-md shadow-md hover:bg-green-700 
// //                    flex justify-center items-center"
// //         disabled={loading}
// //       >
// //         {loading ? <Loader className="animate-spin w-5 h-5" /> : "Proceed to Payment"}
// //       </button>
// //     </div>
// //   );
// // };

// // export default BookPayment;


// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import { FaCheckCircle, FaExclamationCircle, FaPhoneAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
// import { Loader } from "lucide-react";
// import "react-toastify/dist/ReactToastify.css";

// const BookPayment: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [loading, setLoading] = useState(false);

//   const therapistName = location.state?.therapistName;
//   const specialization = location.state?.specialization;
//   const selectedDate = location.state?.selectedDate;
//   const selectedTime = location.state?.selectedTime;
//   const amount = 1000; // Default amount

//   useEffect(() => {
//     if (!therapistName || !selectedDate || !selectedTime) {
//       navigate("/book-session"); // Redirect if data is missing
//     }
//   }, [therapistName, selectedDate, selectedTime, navigate]);

//   const handlePayment = async () => {
//     if (!phoneNumber.trim()) {
//       toast.error(
//         <div className="flex items-center gap-2">
//           <FaExclamationCircle className="text-red-600" /> Please enter a valid phone number.
//         </div>
//       );
//       return;
//     }

//     const paymentData = {
//       phoneNumber,
//       amount,
//       referenceCode: therapistName, // Therapist name as reference code
//       description: specialization, // Therapist specialization as description
//       appointmentDate: selectedDate,
//       appointmentTime: selectedTime,
//     };

//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:8000/api/initiate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(paymentData),
//       });

//       if (!response.ok) throw new Error("Payment failed. Please try again.");

//       toast.success(
//         <div className="flex items-center gap-2">
//           <FaCheckCircle className="text-green-600" /> Payment successful!
//         </div>
//       );

//       setLoading(false);

//       setTimeout(() => {
//         navigate("/confirmation", {
//           state: {
//             doctor: therapistName, // Ensure this is correctly assigned
//             specialization: specialization, // Include specialization
//             date: selectedDate,
//             time: selectedTime,
//           },
//         });
        
//       }, 1000);
      
//     } catch (error) {
//       toast.error(
//         <div className="flex items-center gap-2">
//           <FaExclamationCircle className="text-red-600" />
//           {error instanceof Error ? error.message : "Network error. Please try again."}
//         </div>
//       );
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 mt-10 mb-20 border rounded-lg shadow-lg bg-white">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Confirm Payment</h2>

//       <div className="space-y-4">
//         <p className="text-gray-700 font-medium flex items-center gap-2">
//           <FaCalendarAlt className="text-green-600" /> Appointment Date: {selectedDate}
//         </p>
//         <p className="text-gray-700 font-medium flex items-center gap-2">
//           <FaClock className="text-green-600" /> Appointment Time: {selectedTime}
//         </p>
//         <p className="text-gray-700 font-medium flex items-center gap-2">
//           <FaCheckCircle className="text-green-600" /> Therapist: {therapistName} ({specialization})
//         </p>

//         <label className="font-medium text-gray-700 flex items-center gap-2">
//           <FaPhoneAlt className="text-green-600" /> Enter Phone Number
//         </label>
//         <input
//           type="text"
//           value={phoneNumber}
//           onChange={(e) => setPhoneNumber(e.target.value)}
//           placeholder="Enter phone number"
//           className="w-full p-3 border rounded-md"
//         />
//       </div>

//       <button
//         onClick={handlePayment}
//         className="w-full py-3 mt-6 text-white bg-green-600 rounded-md shadow-md hover:bg-green-700 flex justify-center items-center"
//         disabled={loading}
//       >
//         {loading ? <Loader className="animate-spin w-5 h-5" /> : "Proceed to Payment"}
//       </button>
//     </div>
//   );
// };

// export default BookPayment;


import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaCheckCircle, FaExclamationCircle, FaPhoneAlt, FaCalendarAlt, FaClock, FaCreditCard } from "react-icons/fa";
import { Loader } from "lucide-react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "react-toastify/dist/ReactToastify.css";
import StripeCheckoutForm from "./CheckoutForm";

// Load Stripe.js
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
console.log(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
stripePromise.then(stripe => {
  if (!stripe) {
    console.error("Stripe.js failed to load!");
  }
});

const BookPayment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "stripe">("mpesa");
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Static values as per your backend requirements
  const userId = 7;
  const sessionId = 1;
  
  const therapistName = location.state?.therapistName;
  const specialization = location.state?.specialization;
  const selectedDate = location.state?.selectedDate;
  const selectedTime = location.state?.selectedTime;
  const amount = 1000; // Default amount

  useEffect(() => {
    if (!therapistName || !selectedDate || !selectedTime) {
      navigate("/book-session");
    }
  }, [therapistName, selectedDate, selectedTime, navigate]);

  // Updated Stripe payment intent creation with required fields
  const createStripePaymentIntent = React.useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8000/api/payments/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          sessionId: sessionId,
          amount: amount * 100, // Convert to cents
          currency: "usd",
          paymentStatus: "pending",
          description: `Appointment with ${therapistName} (${specialization})`,
          metadata: {
            appointmentDate: selectedDate,
            appointmentTime: selectedTime
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to initialize payment");
      }

      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);
    } catch (error) {
      toast.error(
        <div className="flex items-center gap-2">
          <FaExclamationCircle className="text-red-600" />
          {error instanceof Error ? error.message : "Failed to initialize payment"}
        </div>
      );
    }
  }, [userId, sessionId, amount, therapistName, specialization, selectedDate, selectedTime]);

  useEffect(() => {
    if (paymentMethod === "stripe") {
      createStripePaymentIntent();
    }
  }, [paymentMethod, createStripePaymentIntent]);

  // M-Pesa payment handler
  const handleMpesaPayment = async () => {
    if (!phoneNumber.trim()) {
      toast.error(
        <div className="flex items-center gap-2">
          <FaExclamationCircle className="text-red-600" /> Please enter a valid phone number.
        </div>
      );
      return;
    }

    const paymentData = {
      phoneNumber,
      amount,
      referenceCode: therapistName,
      description: specialization,
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
    };

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) throw new Error("Payment failed. Please try again.");

      toast.success(
        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-green-600" /> Payment successful!
        </div>
      );

      setLoading(false);
      setTimeout(() => {
        navigateToConfirmation();
      }, 1000);
    } catch (error) {
      toast.error(
        <div className="flex items-center gap-2">
          <FaExclamationCircle className="text-red-600" />
          {error instanceof Error ? error.message : "Network error. Please try again."}
        </div>
      );
      setLoading(false);
    }
  };

  const navigateToConfirmation = () => {
    navigate("/confirmation", {
      state: {
        doctor: therapistName,
        specialization: specialization,
        date: selectedDate,
        time: selectedTime,
      },
    });
  };

  const handleStripeSuccess = () => {
    toast.success(
      <div className="flex items-center gap-2">
        <FaCheckCircle className="text-green-600" /> Payment successful!
      </div>
    );
    
    setTimeout(() => {
      navigateToConfirmation();
    }, 1000);
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 mb-20 border rounded-lg shadow-lg bg-white">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Confirm Payment</h2>

      <div className="space-y-4">
        <p className="text-gray-700 font-medium flex items-center gap-2">
          <FaCalendarAlt className="text-green-600" /> Appointment Date: {selectedDate}
        </p>
        <p className="text-gray-700 font-medium flex items-center gap-2">
          <FaClock className="text-green-600" /> Appointment Time: {selectedTime}
        </p>
        <p className="text-gray-700 font-medium flex items-center gap-2">
          <FaCheckCircle className="text-green-600" /> Therapist: {therapistName} ({specialization})
        </p>
        <p className="text-gray-700 font-medium">
          Amount: {paymentMethod === "mpesa" ? `KES ${amount.toLocaleString()}` : `$${(amount / 100).toFixed(2)}`}
        </p>

        <div className="mb-4">
          <label className="font-medium text-gray-700 mb-2 block">Payment Method</label>
          <div className="flex gap-4">
            <button
              onClick={() => setPaymentMethod("mpesa")}
              className={`flex-1 py-2 rounded-md border ${paymentMethod === "mpesa" ? "bg-green-100 border-green-500" : "bg-gray-100"}`}
            >
              M-Pesa
            </button>
            <button
              onClick={() => setPaymentMethod("stripe")}
              className={`flex-1 py-2 rounded-md border ${paymentMethod === "stripe" ? "bg-blue-100 border-blue-500" : "bg-gray-100"}`}
            >
              <span className="flex items-center justify-center gap-2">
                <FaCreditCard /> Card
              </span>
            </button>
          </div>
        </div>

        {paymentMethod === "mpesa" ? (
          <>
            <label className="font-medium text-gray-700 flex items-center gap-2">
              <FaPhoneAlt className="text-green-600" /> Enter Phone Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number (e.g., 254712345678)"
              className="w-full p-3 border rounded-md"
            />
          </>
        ) : (
          <div className="border rounded-md p-4">
            {clientSecret ? (
              <Elements 
                stripe={stripePromise} 
                options={{ 
                  clientSecret,
                  appearance: {
                    theme: "stripe",
                    variables: {
                      colorPrimary: "#16a34a",
                      colorBackground: "#ffffff",
                      colorText: "#374151",
                      fontSizeBase: "16px",
                    }
                  }
                }}
              >
                <StripeCheckoutForm 
                  amount={amount}
                  onSuccess={handleStripeSuccess}
                />
              </Elements>
            ) : (
              <div className="flex justify-center items-center py-4">
                <Loader className="animate-spin w-5 h-5" />
              </div>
            )}
          </div>
        )}
      </div>

      {paymentMethod === "mpesa" && (
        <button
          onClick={handleMpesaPayment}
          className="w-full py-3 mt-6 text-white bg-green-600 rounded-md shadow-md hover:bg-green-700 flex justify-center items-center"
          disabled={loading}
        >
          {loading ? <Loader className="animate-spin w-5 h-5" /> : "Pay with M-Pesa"}
        </button>
      )}
    </div>
  );
};

export default BookPayment;