import { useEffect, useState } from "react";
import AdminLayout from "../../Components/Admin/AdminLayout";

interface User {
  id: number;
  full_name: string;
  email: string;
  contact_phone: string;
  address: string;
  role: string;
  password?: string; // Make password optional in the User interface
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    full_name: "",
    email: "",
    contact_phone: "",
    address: "",
    role: "user",
    password: "", // Add password field
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://ai-mentalhealthplatform.onrender.com/api/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newUser.full_name || !newUser.email || !newUser.contact_phone || !newUser.address || !newUser.password) {
      alert("Please fill in all fields.");
      return;
    }

    // Prepare the user data excluding 'id' (which backend doesn't expect)
    const userToCreate = {
      full_name: newUser.full_name,
      email: newUser.email,
      contact_phone: newUser.contact_phone,
      address: newUser.address,
      role: newUser.role,
      password: newUser.password, // Include password
    };

    try {
      const response = await fetch("https://ai-mentalhealthplatform.onrender.com/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userToCreate),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        throw new Error("Failed to create user");
      }

      // Reset the form after successful creation
      setNewUser({
        id: 0,
        full_name: "",
        email: "",
        contact_phone: "",
        address: "",
        role: "user",
        password: "", // Reset password
      });
      fetchUsers(); // Re-fetch the updated users list
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const response = await fetch(`https://ai-mentalhealthplatform.onrender.com/api/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete user");
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdate = async () => {
    if (!editingUser) return;
    try {
      const response = await fetch(`https://ai-mentalhealthplatform.onrender.com/api/users/${editingUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingUser),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        throw new Error("Failed to update user");
      }
      setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)));
      setEditingUser(null);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Users</h2>

      {/* Add User Form */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 w-full sm:w-auto"
          value={newUser.full_name}
          onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full sm:w-auto"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          className="border p-2 w-full sm:w-auto"
          value={newUser.contact_phone}
          onChange={(e) => setNewUser({ ...newUser, contact_phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          className="border p-2 w-full sm:w-auto"
          value={newUser.address}
          onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full sm:w-auto"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <select
          className="border p-2 w-full sm:w-auto"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="therapist">Therapist</option>
        </select>
        <button onClick={handleCreate} className="bg-green-600 text-white px-4 py-2">
          Add User
        </button>
      </div>

      {loading && <p className="text-center text-gray-500">Loading users...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Users Table */}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="p-2">ID</th>
                <th className="p-2">Full Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Address</th>
                <th className="p-2">Role</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 text-center">
                  {editingUser?.id === user.id ? (
                    <>
                      <td className="p-2">{user.id}</td>
                      <td className="p-2">
                        <input type="text" value={editingUser.full_name} onChange={(e) => setEditingUser({ ...editingUser, full_name: e.target.value })} />
                      </td>
                      <td className="p-2">
                        <input type="email" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} />
                      </td>
                      <td className="p-2">
                        <input type="text" value={editingUser.contact_phone} onChange={(e) => setEditingUser({ ...editingUser, contact_phone: e.target.value })} />
                      </td>
                      <td className="p-2">
                        <input type="text" value={editingUser.address} onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })} />
                      </td>
                      <td className="p-2">
                        <select value={editingUser.role} onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}>
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                          <option value="therapist">Therapist</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-1 mr-2">Save</button>
                        <button onClick={() => setEditingUser(null)} className="bg-gray-600 text-white px-4 py-1">Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-2">{user.id}</td>
                      <td className="p-2">{user.full_name}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2">{user.contact_phone}</td>
                      <td className="p-2">{user.address}</td>
                      <td className="p-2">{user.role}</td>
                      <td className="p-2">
                        <button onClick={() => handleEdit(user)} className="bg-yellow-600 text-white px-4 py-1 mr-2">Edit</button>
                        <button onClick={() => handleDelete(user.id)} className="bg-red-600 text-white px-4 py-1">Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default Users;
