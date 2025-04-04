import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Appointment {
  id: number;
  user_id: number;
  therapist_id: number;
  session_date: string;
  session_time: string;
  booking_status: string;
  created_at: string;
  updated_at: string;
}

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [appointments, searchTerm, statusFilter]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("https://ai-mentalhealthplatform.onrender.com/api/bookings");
      if (!response.ok) throw new Error("Failed to fetch appointments");

      const data: Appointment[] = await response.json();
      setAppointments(data);
      setFilteredAppointments(data);
    } catch (err) {
      setError((err as Error).message);
      toast.error("Error fetching appointments!");
    } finally {
      setLoading(false);
    }
  };

  const filterAppointments = () => {
    let results = appointments;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (appt) =>
          appt.user_id.toString().includes(term) ||
          appt.therapist_id.toString().includes(term) ||
          appt.session_date.toLowerCase().includes(term) ||
          appt.session_time.toLowerCase().includes(term) ||
          appt.booking_status.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== "all") {
      results = results.filter((appt) => appt.booking_status === statusFilter);
    }

    setFilteredAppointments(results);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;

    try {
      const response = await fetch(`https://ai-mentalhealthplatform.onrender.com/api/bookings/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete appointment");

      setAppointments((prev) => prev.filter((appt) => appt.id !== id));
      toast.success("Appointment deleted successfully!");
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const handleEdit = async (appointment: Appointment) => {
    const updatedStatus = prompt("Enter new status for the appointment:", appointment.booking_status);
    if (!updatedStatus) return;

    try {
      const response = await fetch(`https://ai-mentalhealthplatform.onrender.com/api/bookings/${appointment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...appointment, booking_status: updatedStatus }),
      });

      if (!response.ok) throw new Error("Failed to update appointment");

      const updatedAppointment = await response.json();
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === updatedAppointment.id ? updatedAppointment : appt))
      );
      toast.success("Appointment updated successfully!");
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  // New function to mark appointment as completed (frontend only)
  const handleComplete = (id: number) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appt =>
        appt.id === id ? { ...appt, booking_status: "confirmed" } : appt
      )
    );
    toast.success("Appointment marked as completed!");
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Appointment Management</h1>
        </div>

        {/* Filter Controls */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                id="search"
                placeholder="Search appointments..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                id="status"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Therapist ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.user_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.therapist_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.session_date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.session_time}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${appointment.booking_status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                            appointment.booking_status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}>
                          {appointment.booking_status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(appointment.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(appointment.updated_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleComplete(appointment.id)}
                            className={`${appointment.booking_status === 'confirmed' 
                              ? 'bg-gray-200 text-gray-600 cursor-not-allowed' 
                              : 'text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100'} 
                              px-3 py-1 rounded-md text-sm font-medium transition-colors`}
                            disabled={appointment.booking_status === 'confirmed'}
                          >
                            {appointment.booking_status === 'confirmed' ? 'Completed' : 'Complete'}
                          </button>
                          <button
                            onClick={() => handleEdit(appointment)}
                            className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(appointment.id)}
                            className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                      No appointments found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;