import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface User {
  id: number;
  full_name: string;
  email: string;
  contact_phone: string;
  address: string;
}

interface Appointment {
  id: number;
  user_id: number;
  therapist_id: number;
  session_date: string; // YYYY-MM-DD
  session_time: string; // HH:mm
  booking_status: string;
  created_at: string;
  userDetails?: User | null;
}

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [therapistId, setTherapistId] = useState<number | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTherapistAppointments();
  }, []);

  const fetchTherapistAppointments = async () => {
    if (!token) {
      setError("Unauthorized: No token found.");
      setLoading(false);
      return;
    }
  
    // Retrieve user info from localStorage
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setError("No user data found.");
      setLoading(false);
      return;
    }
  
    const loggedInUser = JSON.parse(storedUser);
    const therapistIdFromUser = loggedInUser.id; // Extract therapist ID
  
    setTherapistId(therapistIdFromUser);
  
    try {
      // Fetch all appointments
      const response = await fetch(
        `https://ai-mentalhealthplatform.onrender.com/api/bookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) throw new Error("Failed to fetch appointments");
  
      const data: Appointment[] = await response.json();
  
      if (data.length === 0) {
        setError("No bookings found for this therapist.");
        setLoading(false);
        return;
      }
  
      // Filter appointments for the logged-in therapist
      const filteredAppointments = data.filter(
        (appointment) => appointment.therapist_id === therapistIdFromUser
      );
  
      const appointmentsWithUserDetails = await Promise.allSettled(
        filteredAppointments.map(async (appointment) => {
          const userDetails = await fetchUserDetails(appointment.user_id);
          return { ...appointment, userDetails };
        })
      );
  
      const successfulAppointments = appointmentsWithUserDetails
        .filter((result) => result.status === "fulfilled")
        .map((result) => (result as PromiseFulfilledResult<Appointment>).value);
  
      setAppointments(successfulAppointments);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };
  

  const fetchUserDetails = async (userId: number): Promise<User | null> => {
    try {
      const response = await fetch(
        `https://ai-mentalhealthplatform.onrender.com/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch user details");

      const data: User = await response.json();
      return data;
    } catch (err) {
      console.error(`Error fetching user ${userId}:`, err);
      return null;
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Appointments Report", 14, 15);

    autoTable(doc, {
      startY: 20,
      head: [["User Name", "Email", "Phone", "Session Date", "Session Time", "Status"]],
      body: appointments.map((appointment) => [
        appointment.userDetails?.full_name || "N/A",
        appointment.userDetails?.email || "N/A",
        appointment.userDetails?.contact_phone || "N/A",
        appointment.session_date,
        appointment.session_time,
        appointment.booking_status,
      ]),
    });

    doc.save("appointments_report.pdf");
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const handleDelete = async (id: number): Promise<void> => {
    if (!token) {
      setError("Unauthorized: No token found.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://ai-mentalhealthplatform.onrender.com/api/bookings/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete appointment");

      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== id)
      );
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Appointments for Therapist ID: {therapistId || "Unknown"}
        </h2>

        <div className="flex justify-end mb-4">
          <button
            onClick={downloadPDF}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
          >
            Download as PDF
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-2 py-2">User Name</th>
                <th className="border px-2 py-2">Email</th>
                <th className="border px-2 py-2">Phone</th>
                <th className="border px-2 py-2">Session Date</th>
                <th className="border px-2 py-2">Session Time</th>
                <th className="border px-2 py-2">Status</th>
                <th className="border px-2 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-100">
                    <td className="border px-2 py-2">{appointment.userDetails?.full_name || "N/A"}</td>
                    <td className="border px-2 py-2">{appointment.userDetails?.email || "N/A"}</td>
                    <td className="border px-2 py-2">{appointment.userDetails?.contact_phone || "N/A"}</td>
                    <td className="border px-2 py-2">{appointment.session_date}</td>
                    <td className="border px-2 py-2">{appointment.session_time}</td>
                    <td className="border px-2 py-2">{appointment.booking_status}</td>
                    <td className="border px-2 py-2">
                      <button onClick={() => handleDelete(appointment.id)} className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={7} className="text-center py-4">No appointments found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Appointments;


