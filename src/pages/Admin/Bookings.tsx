import { useEffect, useState } from "react";
import AdminLayout from "../../Components/Admin/AdminLayout";

interface Booking {
  id: number;
  user_id: number;
  therapist_id: number;
  session_date: string;
  booking_status: string;
}

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [newBooking, setNewBooking] = useState({
    user_id: "",
    therapist_id: "",
    session_date: "",
    booking_status: "Booked",
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  // Fetch Bookings from Backend
  const fetchBookings = async () => {
    const response = await fetch("https://ai-mentalhealthplatform.onrender.com/api/bookings");
    const data = await response.json();
    setBookings(data);
  };

  // Create a New Booking
  const handleCreate = async () => {
    await fetch("https://ai-mentalhealthplatform.onrender.com/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooking),
    });
    setNewBooking({ user_id: "", therapist_id: "", session_date: "", booking_status: "Booked" });
    fetchBookings();
  };

  // Delete a Booking
  const handleDelete = async (id: number) => {
    await fetch(`https://ai-mentalhealthplatform.onrender.com/api/bookings/${id}`, { method: "DELETE" });
    fetchBookings();
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Bookings</h2>

      {/* Create Booking Form */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="number"
          placeholder="User ID"
          className="border p-2 w-full sm:w-auto"
          value={newBooking.user_id}
          onChange={(e) => setNewBooking({ ...newBooking, user_id: e.target.value })}
        />
        <input
          type="number"
          placeholder="Therapist ID"
          className="border p-2 w-full sm:w-auto"
          value={newBooking.therapist_id}
          onChange={(e) => setNewBooking({ ...newBooking, therapist_id: e.target.value })}
        />
        <input
          type="date"
          className="border p-2 w-full sm:w-auto"
          value={newBooking.session_date}
          onChange={(e) => setNewBooking({ ...newBooking, session_date: e.target.value })}
        />
        <select
          className="border p-2 w-full sm:w-auto"
          value={newBooking.booking_status}
          onChange={(e) => setNewBooking({ ...newBooking, booking_status: e.target.value })}
        >
          <option value="Booked">Booked</option>
          <option value="Completed">Completed</option>
          <option value="Canceled">Canceled</option>
        </select>
        <button onClick={handleCreate} className="bg-green-600 text-white px-4 py-2 w-full sm:w-auto">
          Add Booking
        </button>
      </div>

      {/* Scrollable Table for Small Screens */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-green-600 text-white border-b border-gray-300">
              <th className="p-2 border-r">ID</th>
              <th className="p-2 border-r">User ID</th>
              <th className="p-2 border-r">Therapist ID</th>
              <th className="p-2 border-r">Session Date</th>
              <th className="p-2 border-r">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-gray-300 text-center">
                <td className="p-2 border-r">{booking.id}</td>
                <td className="p-2 border-r">{booking.user_id}</td>
                <td className="p-2 border-r">{booking.therapist_id}</td>
                <td className="p-2 border-r">{booking.session_date}</td>
                <td
                  className={`p-2 border-r ${
                    booking.booking_status === "Completed"
                      ? "text-green-600"
                      : booking.booking_status === "Canceled"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {booking.booking_status}
                </td>
                <td className="p-2">
                  <button onClick={() => handleDelete(booking.id)} className="bg-red-600 text-white px-4 py-1">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Bookings;
