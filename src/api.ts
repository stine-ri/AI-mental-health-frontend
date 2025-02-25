export const createPaymentIntent = async (amount: number) => {
  // 🔹 Retrieve `userId` and `token` from localStorage
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (!userId || !token) {
    throw new Error("❌ User ID or Token is missing in localStorage.");
  }

  try {
    // 🔹 Fetch `sessionId` from the backend
    const sessionResponse = await fetch(`https://ai-mentalhealthplatform.onrender.com/api/session/${userId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, // Send token for authentication
        "Content-Type": "application/json"
      },
    });

    if (!sessionResponse.ok) {
      throw new Error("❌ Failed to fetch session ID.");
    }

    const sessionData = await sessionResponse.json();
    const sessionId = sessionData.sessionId;

    if (!sessionId) {
      throw new Error("❌ Session ID is missing from backend response.");
    }

    // 🔹 Proceed to create payment intent
    const paymentResponse = await fetch("https://ai-mentalhealthplatform.onrender.com/api/payments/create-payment-intent", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`, // Include token
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount,
        currency: "usd",
        userId,
        sessionId,
      }),
    });

    if (!paymentResponse.ok) {
      const errorData = await paymentResponse.json();
      console.error("❌ Failed to create payment intent:", errorData);
      throw new Error(errorData.error || "Failed to create payment intent.");
    }

    const data = await paymentResponse.json();
    return data.clientSecret;
    
  } catch (error) {
    console.error("❌ Error in createPaymentIntent:", error);
    throw error;
  }
};
