import { useEffect, useState, useCallback } from "react";
import CheckoutPage from "./CheckoutPage";
import { useNavigate } from "react-router-dom";

const UserPayment: React.FC = () => {
  const navigate = useNavigate();

  // Retrieve and parse user data correctly from localStorage
  const getStoredUser = () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;

    try {
      const parsedUser = JSON.parse(storedUser);
      return parsedUser?.id || parsedUser?.sub?.id || null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  };

  const [userId, setUserId] = useState<string | null>(getStoredUser());
  const [sessionId, setSessionId] = useState<string | null>(localStorage.getItem("sessionId"));
  const [amount] = useState<number>(1000); // Fixed amount
  const [currency] = useState<string>("usd"); // Default currency
  const [paymentStatus] = useState<string>("pending"); // Payment status
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Ensure token is available
  const token = localStorage.getItem("token");

  // Fetch User Session Data
  const fetchUserData = useCallback(async () => {
    if (!token) {
      setError("Authentication token missing. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://ai-mentalhealthplatform.onrender.com/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ amount, currency, paymentStatus }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        setError(`Failed to create payment intent: ${errorResponse?.message || "Unknown error"}`);

        if (response.status === 401) {
          localStorage.removeItem("token");
          setError("Session expired. Redirecting to login...");
          setTimeout(() => navigate("/login"), 2000);
        }
        return;
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.userId && data.sessionId) {
        setUserId(data.userId);
        setSessionId(data.sessionId);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("sessionId", data.sessionId);
      } else {
        setError("Missing required data from the backend response.");
      }
    } catch (err) {
      console.error("Error fetching user session:", err);
      setError("Error fetching user session.");
    } finally {
      setLoading(false);
    }
  }, [amount, currency, paymentStatus, navigate, token]);

  useEffect(() => {
    if (!userId || !sessionId) {
      fetchUserData();
    }
  }, [fetchUserData, userId, sessionId]);

  // Handle Payment Intent
  const handlePaymentIntent = async () => {
    if (!userId || !sessionId) {
      setError("User authentication required.");
      return;
    }

    try {
      const response = await fetch("https://ai-mentalhealthplatform.onrender.com/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, sessionId, amount, currency, paymentStatus }),
      });

      if (response.ok) {
        console.log("Payment intent created successfully.");
      } else {
        setError("Failed to create payment intent.");
      }
    } catch (error) {
      console.error("Error during payment intent creation:", error);
      setError("Error creating payment intent.");
    }
  };

  if (loading) return <p>Loading payment details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="payment-container">
      <h2 className="text-2xl font-bold">Secure Payment</h2>
      {userId && sessionId ? (
        <>
          <CheckoutPage amount={amount} />
          <button onClick={handlePaymentIntent} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            Finalize Payment
          </button>
        </>
      ) : (
        <p style={{ color: "red" }}>User authentication required. Please log in.</p>
      )}
    </div>
  );
};

export default UserPayment;
