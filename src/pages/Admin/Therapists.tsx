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
  const [newTherapist, setNewTherapist] = useState({
    full_name: "",
    specialization: "",
    experience_years: "",
    contact_phone: "",
  });

  useEffect(() => {
    fetchTherapists();
  }, []);

  // Fetch Therapists from Backend
  const fetchTherapists = async () => {
    const response = await fetch("https://ai-mentalhealthplatform.onrender.com/api/therapists");
    const data = await response.json();
    setTherapists(data);
  };

  // Create a New Therapist
  const handleCreate = async () => {
    await fetch("https://ai-mentalhealthplatform.onrender.com/api/therapists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTherapist),
    });
    setNewTherapist({ full_name: "", specialization: "", experience_years: "", contact_phone: "" });
    fetchTherapists();
  };

  // Delete a Therapist
  const handleDelete = async (id: number) => {
    await fetch(`https://ai-mentalhealthplatform.onrender.com/api/therapists/${id}`, { method: "DELETE" });
    fetchTherapists();
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Therapists</h2>

      {/* Create Therapist Form */}
      <div className="flex flex-wrap sm:flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 rounded w-full sm:w-auto"
          value={newTherapist.full_name}
          onChange={(e) => setNewTherapist({ ...newTherapist, full_name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Specialization"
          className="border p-2 rounded w-full sm:w-auto"
          value={newTherapist.specialization}
          onChange={(e) => setNewTherapist({ ...newTherapist, specialization: e.target.value })}
        />
        <input
          type="number"
          placeholder="Experience (years)"
          className="border p-2 rounded w-full sm:w-auto"
          value={newTherapist.experience_years}
          onChange={(e) => setNewTherapist({ ...newTherapist, experience_years: e.target.value })}
        />
        <input
          type="text"
          placeholder="Contact Phone"
          className="border p-2 rounded w-full sm:w-auto"
          value={newTherapist.contact_phone}
          onChange={(e) => setNewTherapist({ ...newTherapist, contact_phone: e.target.value })}
        />
        <button onClick={handleCreate} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
          Add Therapist
        </button>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-green-600 text-white border-b border-gray-300 text-sm">
              <th className="p-2 border-r">ID</th>
              <th className="p-2 border-r">Full Name</th>
              <th className="p-2 border-r">Specialization</th>
              <th className="p-2 border-r">Experience (years)</th>
              <th className="p-2 border-r">Contact Phone</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {therapists.map((therapist) => (
              <tr key={therapist.id} className="border-b border-gray-300 text-center text-sm">
                <td className="p-2 border-r">{therapist.id}</td>
                <td className="p-2 border-r">{therapist.full_name}</td>
                <td className="p-2 border-r">{therapist.specialization}</td>
                <td className="p-2 border-r">{therapist.experience_years}</td>
                <td className="p-2 border-r">{therapist.contact_phone}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(therapist.id)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                  >
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

export default Therapists;
