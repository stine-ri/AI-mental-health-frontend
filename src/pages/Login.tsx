import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginBg from "../assets/images/lines.avif";
import logo from "../assets/images/login.png";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
  
    try {
      const response = await fetch("https://ai-mentalhealthplatform.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
  
      const data = await response.json();
      console.log("Login Response Data:", data);
  
      if (!data.token || !data.user || !data.user.role) {
        throw new Error("Invalid response from server");
      }
  
      // ✅ Store token, user, and role separately
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)); // Correct way
      localStorage.setItem("role", data.user.role); // Role should be stored independently
  
      console.log("User Info Stored:", JSON.parse(localStorage.getItem("user") || "{}"));
      console.log("User Role Stored:", localStorage.getItem("role"));
  
      // ✅ Redirect based on user role
      const userRole = data.user.role;
      if (userRole === "therapist") {
        navigate(`/therapist-dashboard/${data.user.id}`);
      } else if (userRole === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <img src={logo} alt="Mindful Logo" className="w-32 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-green-700">Welcome Back</h2>
        <p className="text-gray-500 mb-4">Sign in to continue</p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-green-700 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
