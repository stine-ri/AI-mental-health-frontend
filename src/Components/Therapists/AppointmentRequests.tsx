import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Appointment {
  id: number;
  user_id: number;
  therapist_id: number;
  session_date: string; // Format: "YYYY-MM-DD"
  session_time: string; // Format: "HH:MM:SS"
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

  const storedUser = localStorage.getItem("user");
  const loggedUser = storedUser ? JSON.parse(storedUser) : null;
  const userId = loggedUser?.user?.id;

  // Function to combine date and time and format for Kenyan time display
// Updated formatSessionDateTime function
const formatSessionDateTime = (dateStr: string, timeStr: string) => {
  try {
    // Remove seconds if present in time string
    const sanitizedTime = timeStr.split(':').slice(0, 2).join(':');
    const combinedDateTime = `${dateStr}T${sanitizedTime}:00`;
    
    // Create date in UTC (assuming backend stores time in UTC)
    const date = new Date(combinedDateTime + 'Z'); // 'Z' indicates UTC
    
    if (isNaN(date.getTime())) {
      console.error("Invalid date/time:", dateStr, timeStr);
      return "Invalid date/time";
    }

    // Format for Kenyan time (EAT)
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Africa/Nairobi'
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  } catch (err) {
    console.error("Error formatting date/time:", err);
    return "Invalid date/time";
  }
};

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
      
      // Debug log to verify raw data
      console.log("Raw booking data:", data.map(a => ({
        id: a.id,
        date: a.session_date,
        time: a.session_time,
        combined: `${a.session_date}T${a.session_time}`,
        status: a.booking_status
      })));

      const therapistIds = [...new Set(data.map((appt) => appt.therapist_id))];
      const therapistDetails = await Promise.all(therapistIds.map((id) => fetchTherapistDetails(id)));

      const enrichedAppointments = data.map((appt) => ({
        ...appt,
        therapist_details: therapistDetails.find((t) => t?.id === appt.therapist_id) || null,
      }));

      setAppointments(enrichedAppointments);
    } catch (err) {
      console.error("Error Fetching Appointments:", err);
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
      console.error(`Error fetching therapist with ID ${id}:`, err);
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
      console.error("Error Deleting Appointment:", err);
      alert((err as Error).message);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("My Appointments", 14, 10);

    autoTable(doc, {
      startY: 20,
      head: [["Therapist Name", "Specialization", "Experience (Years)", "Phone", "Session Date", "Status"]],
      body: appointments.map((appt) => [
        appt.therapist_details?.full_name || "N/A",
        appt.therapist_details?.specialization || "N/A",
        appt.therapist_details?.experience_years || "N/A",
        appt.therapist_details?.contact_phone || "N/A",
        formatSessionDateTime(appt.session_date, appt.session_time),
        appt.booking_status,
      ]),
    });

    doc.save("appointments.pdf");
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full text-center">
        <div className="text-red-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-800 mb-2">Error Loading Appointments</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
            <p className="text-gray-600 mt-1">
              {appointments.length} upcoming {appointments.length === 1 ? 'appointment' : 'appointments'}
            </p>
          </div>
          <button
            onClick={downloadPDF}
            className="mt-4 md:mt-0 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export to PDF
          </button>
        </div>

        {appointments.length === 0 ? (
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No appointments scheduled</h3>
              <p className="mt-1 text-sm text-gray-500">You don't have any upcoming appointments yet.</p>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Therapist
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Specialization
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Experience
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Session Date (EAT)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-green-600 font-medium">
                              {appointment.therapist_details?.full_name?.charAt(0) || 'T'}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {appointment.therapist_details?.full_name || "N/A"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {appointment.therapist_details?.contact_phone || "N/A"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {appointment.therapist_details?.specialization || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {appointment.therapist_details?.experience_years || "N/A"} years
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatSessionDateTime(appointment.session_date, appointment.session_time)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.booking_status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : appointment.booking_status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {appointment.booking_status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDelete(appointment.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;