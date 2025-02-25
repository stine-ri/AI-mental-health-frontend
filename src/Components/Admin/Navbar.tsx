// src/components/admin/Navbar.tsx
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Remove the user token and any other relevant data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className="bg-white shadow flex justify-between items-center p-4">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      <div className="flex items-center space-x-4">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search..."
          className="border rounded px-3 py-1 hidden sm:block" // Hidden on small screens, visible on medium and above
        />
        {/* Logout button */}
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
