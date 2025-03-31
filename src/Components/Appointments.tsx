import { useEffect, useState } from "react";

// Define Interfaces
interface Appointment {
  id: number;
  user_id: number;
  therapist_id: number;
  session_date: string;
  booking_status: string;
  created_at: string;
}

interface Therapist {
  id: number;
  full_name: string;
  specialization: string;
  experience_years: number;
  contact_phone: string;
  availability: boolean;
  created_at: string;
  updated_at: string;
}

interface AppointmentWithTherapist extends Appointment {
  therapist_details?: Therapist | null;
}

const Appointments = () => {
  const [appointments, setAppointments] = useState<AppointmentWithTherapist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Retrieve logged-in user ID from localStorage
  const storedUser = localStorage.getItem("user");
  const loggedUser = storedUser ? JSON.parse(storedUser) : null;
  const userId = loggedUser?.user?.id;

  useEffect(() => {
    if (!userId) {
      setError("No logged-in user found.");
      setLoading(false);
      return;
    }
    fetchAppointments(userId);
  }, [userId]);

  const fetchAppointments = async (userId: number) => {
    try {
      console.log("📥 Fetching Appointments for User ID:", userId);
      const token = localStorage.getItem("token");

      if (!token) throw new Error("User not logged in");

      const response = await fetch(`https://ai-mentalhealthplatform.onrender.com/api/bookings?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch appointments");

      const data: Appointment[] = await response.json();
      console.log("✅ Fetched Appointments:", data);

      // Fetch therapist details only for the fetched appointments
      const therapistIds = [...new Set(data.map((appt) => appt.therapist_id))];
      const therapistDetails = await Promise.all(therapistIds.map((id) => fetchTherapistDetails(id)));

      const enrichedAppointments = data.map((appt) => ({
        ...appt,
        therapist_details: therapistDetails.find((t) => t?.id === appt.therapist_id) || null,
      }));

      setAppointments(enrichedAppointments);
    } catch (err) {
      console.error("❌ Error Fetching Appointments:", err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTherapistDetails = async (id: number): Promise<Therapist | null> => {
    try {
      const response = await fetch(`https://ai-mentalhealthplatform.onrender.com/api/therapists/${id}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (err) {
      console.error(`❌ Error fetching therapist with ID ${id}:`, err);
      return null;
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;

    try {
      const response = await fetch(`https://ai-mentalhealthplatform.onrender.com/api/bookings/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete appointment");

      setAppointments((prev) => prev.filter((appt) => appt.id !== id));
    } catch (err) {
      console.error("❌ Error Deleting Appointment:", err);
      alert((err as Error).message);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">My Appointments</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Therapist Name</th>
                <th className="border px-4 py-2">Specialization</th>
                <th className="border px-4 py-2">Experience (Years)</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Availability</th>
                <th className="border px-4 py-2">Session Date</th>
                <th className="border px-4 py-2">Booking Time</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center p-4 text-gray-500">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2 text-center">{appointment.therapist_details?.full_name || "N/A"}</td>
                    <td className="border px-4 py-2 text-center">{appointment.therapist_details?.specialization || "N/A"}</td>
                    <td className="border px-4 py-2 text-center">{appointment.therapist_details?.experience_years || "N/A"}</td>
                    <td className="border px-4 py-2 text-center">{appointment.therapist_details?.contact_phone || "N/A"}</td>
                    <td className="border px-4 py-2 text-center">
                      {appointment.therapist_details?.availability ? "Available" : "Not Available"}
                    </td>
                    <td className="border px-4 py-2 text-center">{appointment.session_date}</td>
                    <td className="border px-4 py-2 text-center">{new Date(appointment.created_at).toLocaleString()}</td>
                    <td className="border px-4 py-2 text-center font-semibold text-blue-600">{appointment.booking_status}</td>
                    <td className="border px-4 py-2 text-center">
                    <button className="bg-green-500 text-white w-24 h-10 rounded text-xs sm:text-sm hover:bg-green-600 transform hover:scale-105 transition-all duration-300 ease-in-out">
                       Edit
                        </button>
                       <button
                     onClick={() => handleDelete(appointment.id)}
                     className="bg-green-500 text-white w-24 h-10 rounded text-xs sm:text-sm hover:bg-green-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
                             >
                         Delete
                       </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
