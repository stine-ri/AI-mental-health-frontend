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

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("https://ai-mentalhealthplatform.onrender.com/api/bookings");
      if (!response.ok) throw new Error("Failed to fetch appointments");

      const data: Appointment[] = await response.json();
      setAppointments(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
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
      alert((err as Error).message);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Appointment Records</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border-r">User ID</th>
                <th className="px-4 py-2 border-r">Therapist ID</th>
                <th className="px-4 py-2 border-r">Session Date</th>
                <th className="px-4 py-2 border-r">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-r text-center">{appointment.user_id}</td>
                  <td className="px-4 py-2 border-r text-center">{appointment.therapist_id}</td>
                  <td className="px-4 py-2 border-r text-center">{appointment.session_date}</td>
                  <td className="px-4 py-2 border-r text-center font-semibold text-blue-600">{appointment.booking_status}</td>
                  <td className="px-4 py-2 text-center">
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(appointment.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
