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

  const createMeetLink = (userId: number, sessionDate: string) => {
    return `https://meet.google.com/new?authuser=${userId}&date=${encodeURIComponent(sessionDate)}`;
  };

  const handleJoinSession = (bookingId: number) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, booking_status: "completed" } 
        : booking
    ));
    toast.success("Session marked as completed!", { position: "top-right" });
  };

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-xl p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-green-800 text-center mb-2">Upcoming Therapy Sessions</h2>
        <p className="text-green-600 text-center mb-8">Manage your patient appointments and meetings</p>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
            <p className="text-red-700 font-medium">Error loading bookings:</p>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-green-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-green-800">No upcoming sessions</h3>
            <p className="mt-1 text-green-600">You don't have any bookings scheduled at this time.</p>
          </div>
        )}

        {!loading && !error && bookings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => {
              const meetLink = booking.meet_link || createMeetLink(booking.user_id, booking.session_date);
              const sessionDate = new Date(booking.session_date);
              const formattedDate = sessionDate.toLocaleDateString('en-US', { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              });

              return (
                <div key={booking.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-green-900">{formattedDate}</h3>
                        <p className="text-green-700 font-medium">{booking.session_time}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.booking_status === "completed" 
                          ? "bg-green-100 text-green-800" 
                          : booking.booking_status === "confirmed" 
                            ? "bg-amber-100 text-amber-800" 
                            : "bg-gray-100 text-gray-800"
                      }`}>
                        {booking.booking_status}
                      </span>
                    </div>

                    <div className="space-y-3 mt-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Client ID</p>
                        <p className="text-gray-800 font-semibold">{booking.user_id}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-500">Session Notes</p>
                        <p className="text-gray-800">
                          {booking.session_notes || <span className="text-gray-400">No notes provided</span>}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <a 
                        href={meetLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => handleJoinSession(booking.id)}
                        className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2 px-4 rounded-lg text-center transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        Join Session
                      </a>
                      
                      <button
                        onClick={() => sendMeetLink(booking.id, meetLink)}
                        disabled={booking.booking_status === "completed"}
                        className={`w-full font-semibold py-2 px-4 rounded-lg text-center transition-all duration-200 ${
                          booking.booking_status === "completed"
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-white border-2 border-green-500 text-green-600 hover:bg-green-50"
                        }`}
                      >
                        {booking.booking_status === "completed" ? "Session Completed" : "Send Meeting Link"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="shadow-lg"
        progressClassName="bg-green-500"
      />
    </div>
  );
};

export default TherapistsSession;