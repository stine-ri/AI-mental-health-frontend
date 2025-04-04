import { useEffect, useState } from "react";
import AdminLayout from "../../Components/Admin/AdminLayout";

interface Session {
  id: number;
  user_id: number;
  therapist_id: number;
  session_date: string;
  session_notes: string;
}

const Sessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [newSession, setNewSession] = useState({
    user_id: "",
    therapist_id: "",
    session_date: "",
    session_notes: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://ai-mentalhealthplatform.onrender.com/api/session");
      if (!response.ok) throw new Error("Failed to fetch sessions");
      const data = await response.json();
      setSessions(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const filteredSessions = sessions.filter(session => 
    session.user_id.toString().includes(searchTerm) ||
    session.therapist_id.toString().includes(searchTerm) ||
    session.session_date.includes(searchTerm) ||
    session.session_notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = async () => {
    if (!newSession.user_id || !newSession.therapist_id || !newSession.session_date) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch("https://ai-mentalhealthplatform.onrender.com/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newSession,
          user_id: Number(newSession.user_id),
          therapist_id: Number(newSession.therapist_id)
        }),
      });

      if (!response.ok) throw new Error("Failed to create session");

      setNewSession({ user_id: "", therapist_id: "", session_date: "", session_notes: "" });
      fetchSessions();
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this session?")) return;
    try {
      const response = await fetch(`https://ai-mentalhealthplatform.onrender.com/api/session/${id}`, { 
        method: "DELETE" 
      });
      if (!response.ok) throw new Error("Failed to delete session");
      fetchSessions();
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Therapy Sessions</h2>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Sessions</label>
              <input
                type="text"
                placeholder="Search by user, therapist, date or notes..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Add Session Form */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Add New Session</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
              <input
                type="number"
                placeholder="User ID"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={newSession.user_id}
                onChange={(e) => setNewSession({ ...newSession, user_id: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Therapist ID</label>
              <input
                type="number"
                placeholder="Therapist ID"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={newSession.therapist_id}
                onChange={(e) => setNewSession({ ...newSession, therapist_id: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Session Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={newSession.session_date}
                onChange={(e) => setNewSession({ ...newSession, session_date: e.target.value })}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleCreate}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md shadow-sm transition-colors text-sm font-medium"
              >
                Add Session
              </button>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Session Notes</label>
            <textarea
              placeholder="Session notes..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              rows={2}
              value={newSession.session_notes}
              onChange={(e) => setNewSession({ ...newSession, session_notes: e.target.value })}
            />
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

        {/* Sessions Table */}
        {!loading && !error && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-green-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">User ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Therapist ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Notes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSessions.length > 0 ? (
                    filteredSessions.map((session) => (
                      <tr key={session.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{session.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{session.user_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{session.therapist_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(session.session_date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                          {session.session_notes}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleDelete(session.id)}
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
                        No sessions found matching your criteria
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

export default Sessions;