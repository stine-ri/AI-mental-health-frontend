// import { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// interface Booking {
//   id: number;
//   user_id: number;
//   therapist_id: number;
//   session_date: string;
//   booking_status: string;
//   session_notes?: string;
//   meet_link?: string;
// }

// const Bookings = ({ therapistId }: { therapistId: number }) => {
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!therapistId) {
//       setError("Therapist ID is missing. Unable to fetch bookings.");
//       setLoading(false);
//       return;
//     }

//     const fetchBookings = async () => {
//       setLoading(true);
//       setError(null);
    
//       try {
//         console.log("Fetching bookings for therapist ID:", therapistId);
//         const response = await fetch(
//           `https://ai-mentalhealthplatform.onrender.com/api/bookings?therapist_id=${therapistId}`
//         );
    
//         if (!response.ok) {
//           throw new Error(`Failed to fetch bookings: ${response.statusText}`);
//         }
    
//         const data: Booking[] = await response.json();
//         console.log("Raw API Data:", data);
    
//         if (!Array.isArray(data)) {
//           setError("Invalid data format received.");
//           return;
//         }
    
//         if (data.length === 0) {
//           setBookings([]);
//           return;
//         }
        
//         const today = new Date();
//         const filteredData = data.filter(
//           (booking) => new Date(booking.session_date) >= today
//         );
//         console.log("Filtered Bookings:", filteredData);
//         setBookings(filteredData);
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//         setError(error instanceof Error ? error.message : "An unknown error occurred.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, [therapistId]);

//   const createMeetLink = (userId: number, sessionDate: string) => {
//     return `https://meet.google.com/new?authuser=${userId}&date=${encodeURIComponent(sessionDate)}`;
//   };

//   const sendMeetLink = async (bookingId: number, meetLink: string) => {
//     if (!bookingId || !meetLink) {
//       toast.error("Booking ID and Meet link are required.", { position: "top-right" });
//       return;
//     }

//     console.log("Sending Meet Link - Booking ID:", bookingId, "Meet Link:", meetLink);

//     try {
//       const response = await fetch(`http://localhost:8000/api/send-meet-link`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ bookingId, meetLink }),
//       });

//       const responseData = await response.json();
//       console.log("Backend Response:", responseData);

//       if (!response.ok) {
//         throw new Error(responseData.message || responseData.error || "Failed to send Meet link.");
//       }

//       toast.success(`Meet link sent successfully for booking ${bookingId}`, { position: "top-right" });
//     } catch (error) {
//       console.error("Failed to send Meet link:", error);
//       toast.error("Failed to send Meet link. Please try again.", { position: "top-right" });
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-green-100 rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold text-green-800 text-center mb-6">Booked Sessions</h2>

//       {loading && <p className="text-green-700 text-center font-semibold">Loading bookings...</p>}
//       {error && <p className="text-red-500 text-center font-semibold">Error: {error}</p>}

//       {!loading && !error && bookings.length === 0 && (
//         <p className="text-green-700 text-center font-semibold">No bookings yet.</p>
//       )}

//       {!loading && !error && bookings.length > 0 && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {bookings.map((booking) => {
//             const meetLink = booking.meet_link || createMeetLink(booking.user_id, booking.session_date);

//             return (
//               <div key={booking.id} className="p-4 bg-white border-l-4 border-green-500 rounded-lg shadow-md">
//                 <p>
//                   <strong className="text-green-900">Date:</strong>{" "}
//                   {new Date(booking.session_date).toLocaleDateString()}
//                 </p>
//                 <p>
//                   <strong className="text-green-900">User ID:</strong> {booking.user_id}
//                 </p>
//                 <p>
//                   <strong className="text-green-900">Status:</strong>
//                   <span
//                     className={`ml-2 px-2 py-1 rounded text-white ${
//                       booking.booking_status === "confirmed" ? "bg-green-600" : "bg-yellow-500"
//                     }`}
//                   >
//                     {booking.booking_status}
//                   </span>
//                 </p>
//                 <p>
//                   <strong className="text-green-900">Notes:</strong> {booking.session_notes || "No notes available"}
//                 </p>

//                 <a href={meetLink} target="_blank" rel="noopener noreferrer">
//                   <button className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
//                     Join Google Meet
//                   </button>
//                 </a>

//                 <button
//                   className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
//                   onClick={() => sendMeetLink(booking.id, meetLink)}
//                 >
//                   Send Meet Link to User
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       )}
//       <ToastContainer />
//     </div>
//   );
// };

// export default Bookings;


import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Booking {
  id: number;
  user_id: number;
  therapist_id: number;
  session_date: string;
  session_time: string;
  booking_status: string;
  session_notes?: string;
  meet_link?: string;
}

const TherapistsSession = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("📡 Fetching bookings...");
        const response = await fetch(`https://ai-mentalhealthplatform.onrender.com/api/bookings`);
        if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

        const data: Booking[] = await response.json();
        console.log("🔹 API Response:", data);

        if (data.length === 0) {
          console.warn("⚠️ No bookings found!");
          setBookings([]);
          return;
        }

        // Extract the therapist_id from the first booking and filter by it
        const filteredBookings = data.filter((booking) => booking.therapist_id === data[0]?.therapist_id);
        setBookings(filteredBookings);
      } catch (error) {
        console.error("❌ Error fetching bookings:", error);
        setError(error instanceof Error ? error.message : "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Function to create a Google Meet link
  const createMeetLink = (userId: number, sessionDate: string) => {
    return `https://meet.google.com/new?authuser=${userId}&date=${encodeURIComponent(sessionDate)}`;
  };

  // Function to send the Meet link to the user
  const sendMeetLink = async (bookingId: number, meetLink: string) => {
    if (!bookingId || !meetLink) {
      toast.error("Booking ID and Meet link are required.", { position: "top-right" });
      return;
    }

    console.log("📨 Sending Meet Link - Booking ID:", bookingId, "Meet Link:", meetLink);

    try {
      const response = await fetch(`http://localhost:8000/api/send-meet-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, meetLink }),
      });

      const responseData = await response.json();
      console.log("✅ Backend Response:", responseData);

      if (!response.ok) {
        throw new Error(responseData.message || responseData.error || "Failed to send Meet link.");
      }

      toast.success(`Meet link sent successfully for booking ${bookingId}`, { position: "top-right" });
    } catch (error) {
      console.error("❌ Failed to send Meet link:", error);
      toast.error("Failed to send Meet link. Please try again.", { position: "top-right" });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-blue-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-blue-800 text-center mb-6">Therapist Sessions</h2>

      {loading && <p className="text-blue-700 text-center font-semibold">Loading bookings...</p>}
      {error && <p className="text-red-500 text-center font-semibold">Error: {error}</p>}

      {!loading && !error && bookings.length === 0 && (
        <p className="text-blue-700 text-center font-semibold">No bookings available.</p>
      )}

      {!loading && !error && bookings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bookings.map((booking) => {
            const meetLink = booking.meet_link || createMeetLink(booking.user_id, booking.session_date);

            return (
              <div key={booking.id} className="p-4 bg-white border-l-4 border-blue-500 rounded-lg shadow-md">
                <p>
                  <strong className="text-blue-900">Date:</strong>{" "}
                  {new Date(booking.session_date).toLocaleDateString()}
                </p>
                <p>
                  <strong className="text-blue-900">Time:</strong> {booking.session_time}
                </p>
                <p>
                  <strong className="text-blue-900">User ID:</strong> {booking.user_id}
                </p>
                <p>
                  <strong className="text-blue-900">Status:</strong>
                  <span
                    className={`ml-2 px-2 py-1 rounded text-white ${
                      booking.booking_status === "confirmed" ? "bg-green-600" : "bg-yellow-500"
                    }`}
                  >
                    {booking.booking_status}
                  </span>
                </p>
                <p>
                  <strong className="text-blue-900">Notes:</strong> {booking.session_notes || "No notes available"}
                </p>

                <a href={meetLink} target="_blank" rel="noopener noreferrer">
                  <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                    Join Google Meet
                  </button>
                </a>

                <button
                  className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => sendMeetLink(booking.id, meetLink)}
                >
                  Send Meet Link to User
                </button>
              </div>
            );
          })}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default TherapistsSession;
