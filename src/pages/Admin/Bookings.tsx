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
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [newBooking, setNewBooking] = useState({
    user_id: "",
    therapist_id: "",
    session_date: "",
    booking_status: "Booked",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [bookings, searchTerm, statusFilter]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://ai-mentalhealthplatform.onrender.com/api/bookings");
      if (!response.ok) throw new Error("Failed to fetch bookings");
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    let results = bookings;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (booking) =>
          booking.user_id.toString().includes(term) ||
          booking.therapist_id.toString().includes(term) ||
          booking.session_date.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== "all") {
      results = results.filter((booking) => booking.booking_status === statusFilter);
    }

    setFilteredBookings(results);
  };

  const handleCreate = async () => {
    if (!newBooking.user_id || !newBooking.therapist_id || !newBooking.session_date) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch("https://ai-mentalhealthplatform.onrender.com/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newBooking,
          user_id: Number(newBooking.user_id),
          therapist_id: Number(newBooking.therapist_id)
        }),
      });

      if (!response.ok) throw new Error("Failed to create booking");

      setNewBooking({ user_id: "", therapist_id: "", session_date: "", booking_status: "Booked" });
      fetchBookings();
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      const response = await fetch(`https://ai-mentalhealthplatform.onrender.com/api/bookings/${id}`, { 
        method: "DELETE" 
      });
      if (!response.ok) throw new Error("Failed to delete booking");
      fetchBookings();
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleMarkCompleted = (id: number) => {
    setBookings(prevBookings => 
      prevBookings.map(booking => 
        booking.id === id ? { ...booking, booking_status: "Completed" } : booking
      )
    );
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Booking Management</h2>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                placeholder="Search bookings..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="Booked">Booked</option>
                <option value="Completed">Completed</option>
                <option value="Canceled">Canceled</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors text-sm font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Add Booking Form */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Add New Booking</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
              <input
                type="number"
                placeholder="User ID"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={newBooking.user_id}
                onChange={(e) => setNewBooking({ ...newBooking, user_id: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Therapist ID</label>
              <input
                type="number"
                placeholder="Therapist ID"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={newBooking.therapist_id}
                onChange={(e) => setNewBooking({ ...newBooking, therapist_id: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Session Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={newBooking.session_date}
                onChange={(e) => setNewBooking({ ...newBooking, session_date: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={newBooking.booking_status}
                onChange={(e) => setNewBooking({ ...newBooking, booking_status: e.target.value })}
              >
                <option value="Booked">Booked</option>
                <option value="Completed">Completed</option>
                <option value="Canceled">Canceled</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleCreate}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md shadow-sm transition-colors text-sm font-medium"
              >
                Add Booking
              </button>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Bookings Table */}
        {!loading && !error && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-green-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">User ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Therapist ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Session Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.user_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.therapist_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(booking.session_date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${booking.booking_status === 'Completed' ? 'bg-green-100 text-green-800' : 
                              booking.booking_status === 'Canceled' ? 'bg-red-100 text-red-800' : 
                              'bg-yellow-100 text-yellow-800'}`}>
                            {booking.booking_status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            onClick={() => handleMarkCompleted(booking.id)}
                            className={`${booking.booking_status === 'Completed' 
                              ? 'bg-gray-200 text-gray-600 cursor-not-allowed' 
                              : 'text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100'} 
                              px-3 py-1 rounded-md text-sm font-medium transition-colors`}
                            disabled={booking.booking_status === 'Completed'}
                          >
                            {booking.booking_status === 'Completed' ? 'Completed' : 'Complete'}
                          </button>
                          <button
                            onClick={() => handleDelete(booking.id)}
                            className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                        No bookings found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Bookings;