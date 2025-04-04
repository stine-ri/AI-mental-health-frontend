import { useEffect, useState } from "react";
import AdminLayout from "../../Components/Admin/AdminLayout";

interface Therapist {
  id: number;
  full_name: string;
  specialization: string;
  experience_years: number;
  contact_phone: string;
}

const Therapists = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [filteredTherapists, setFilteredTherapists] = useState<Therapist[]>([]);
  const [newTherapist, setNewTherapist] = useState({
    full_name: "",
    specialization: "",
    experience_years: "",
    contact_phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTherapists();
  }, []);

  useEffect(() => {
    filterTherapists();
  }, [therapists, searchTerm]);

  const fetchTherapists = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://ai-mentalhealthplatform.onrender.com/api/therapists");
      if (!response.ok) throw new Error("Failed to fetch therapists");
      const data = await response.json();
      setTherapists(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const filterTherapists = () => {
    if (!searchTerm) {
      setFilteredTherapists(therapists);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = therapists.filter(
      (therapist) =>
        therapist.full_name.toLowerCase().includes(term) ||
        therapist.specialization.toLowerCase().includes(term) ||
        therapist.contact_phone.includes(term) ||
        therapist.experience_years.toString().includes(term)
    );
    setFilteredTherapists(filtered);
  };

  const handleCreate = async () => {
    if (!newTherapist.full_name || !newTherapist.specialization || !newTherapist.contact_phone) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch("https://ai-mentalhealthplatform.onrender.com/api/therapists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newTherapist,
          experience_years: Number(newTherapist.experience_years) || 0
        }),
      });

      if (!response.ok) throw new Error("Failed to create therapist");

      setNewTherapist({ full_name: "", specialization: "", experience_years: "", contact_phone: "" });
      fetchTherapists();
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this therapist?")) return;
    try {
      const response = await fetch(`https://ai-mentalhealthplatform.onrender.com/api/therapists/${id}`, { 
        method: "DELETE" 
      });
      if (!response.ok) throw new Error("Failed to delete therapist");
      fetchTherapists();
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Therapist Management</h2>
        </div>

        {/* Search Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Therapists</label>
              <input
                type="text"
                placeholder="Search by name, specialization, phone or experience..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Add Therapist Form */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Add New Therapist</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={newTherapist.full_name}
                onChange={(e) => setNewTherapist({ ...newTherapist, full_name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
              <input
                type="text"
                placeholder="Specialization"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={newTherapist.specialization}
                onChange={(e) => setNewTherapist({ ...newTherapist, specialization: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
              <input
                type="number"
                placeholder="Experience"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={newTherapist.experience_years}
                onChange={(e) => setNewTherapist({ ...newTherapist, experience_years: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
              <input
                type="text"
                placeholder="Phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={newTherapist.contact_phone}
                onChange={(e) => setNewTherapist({ ...newTherapist, contact_phone: e.target.value })}
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={handleCreate}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md shadow-sm transition-colors text-sm font-medium"
            >
              Add Therapist
            </button>
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

        {/* Therapists Table */}
        {!loading && !error && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-green-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Full Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Specialization</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Experience</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTherapists.length > 0 ? (
                    filteredTherapists.map((therapist) => (
                      <tr key={therapist.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{therapist.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{therapist.full_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{therapist.specialization}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{therapist.experience_years} years</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{therapist.contact_phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleDelete(therapist.id)}
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
                        No therapists found matching your criteria
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

export default Therapists;