import { useEffect, useState } from "react";
import CheckoutPage from "./CheckoutPage";
import { useNavigate } from "react-router-dom";

const UserPayment: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [amount] = useState<number>(1000); // Amount set to 1000
  const [currency] = useState<string>("usd"); // Currency
  const [paymentStatus] = useState<string>("complete"); // Payment Status
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication token missing. Please log in.");
        setLoading(false);
        return;
      }

      try {
        // Fetch user session data (userId, sessionId) first
        const response = await fetch("https://ai-mentalhealthplatform.onrender.com/api/payments/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          credentials: "include", // Include credentials (cookies) with the request
          body: JSON.stringify({
            amount,
            currency,
            paymentStatus,
          }),
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          const message = `Failed to create payment intent: ${response.status} - ${errorResponse?.message || "Unknown error"}`;
          console.error(message);
          setError(message);

          if (response.status === 401) {
            localStorage.removeItem("token");
            setError("Session expired. Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000); // Give users a brief notice
          }
          return;
        }

        const data = await response.json();

        if (data.userId && data.sessionId) {
          setUserId(data.userId);
          setSessionId(data.sessionId);
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("sessionId", data.sessionId);
        } else {
          setError("Missing required data from the backend response.");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching user session.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handlePaymentIntent = async () => {
    if (!userId || !sessionId) return;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("https://ai-mentalhealthplatform.onrender.com/api/payments/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          sessionId,
          amount,
          currency,
          paymentStatus,
        }),
      });

      if (response.ok) {
        console.log("Payment intent created successfully.");
        // Redirect to CheckoutPage or other actions
      } else {
        console.error("Failed to create payment intent.");
      }
    } catch (error) {
      console.error("Error during payment intent creation:", error);
    }
  };

  if (loading) return <p>Loading payment details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Wait for userId and sessionId to be available
  return (
    <div className="payment-container">
      <h2 className="text-2xl font-bold">Secure Payment</h2>
      {userId && sessionId ? (
        <>
          <CheckoutPage amount={amount} />
          <button onClick={handlePaymentIntent}>Finalize Payment</button>
        </>
      ) : (
        <p style={{ color: "red" }}>User authentication required. Please log in.</p>
      )}
    </div>
  );
};

export default UserPayment;
