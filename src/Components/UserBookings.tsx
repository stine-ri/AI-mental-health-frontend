import { useEffect, useState } from "react";

interface Appointment {
  id: number;
  user_id: number;
  therapist_id: number;
  session_date: string;
  booking_status: string;
}

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Retrieve the logged-in user from localStorage
// Get logged-in user from localStorage
const storedUser = localStorage.getItem("user");
const loggedUser = storedUser ? JSON.parse(storedUser) : null;
const userId = loggedUser?.user?.id; // Correctly access the user ID

useEffect(() => {
  console.log("Parsed loggedUser:", loggedUser); // Debugging log
  console.log("Extracted userId:", userId); // Debugging log

  if (!userId) {
    setError("No logged-in user found.");
    setLoading(false);
    return;
  }

  fetchAppointments(userId);
}, [userId]);


  const fetchAppointments = async (userId: number) => {
    try {
      const url = `https://ai-mentalhealthplatform.onrender.com/api/bookings?userId=${userId}`;
      console.log("API Request URL:", url);

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch appointments");

      const data: Appointment[] = await response.json();
      console.log("Fetched Appointments:", data);

      setAppointments(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;

    try {
      console.log("Deleting appointment with ID:", id);

      const response = await fetch(`https://ai-mentalhealthplatform.onrender.com/api/bookings/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete appointment");

      console.log("Appointment deleted successfully.");
      setAppointments((prev) => prev.filter((appt) => appt.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert((err as Error).message);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">My Appointments</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Therapist ID</th>
                <th className="border px-4 py-2">Session Date</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-gray-500">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-100 text-center">
                    <td className="border px-4 py-2">{appointment.therapist_id}</td>
                    <td className="border px-4 py-2">{appointment.session_date}</td>
                    <td className="border px-4 py-2 font-semibold text-blue-600">{appointment.booking_status}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleDelete(appointment.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
