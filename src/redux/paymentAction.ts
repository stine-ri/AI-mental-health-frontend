export const initiateMpesaPayment = async (phone: string, amount: number) => {
    try {
        const response = await fetch("http://localhost:3000/api/initiate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone, amount }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Payment Error:", error);
        return { error: "Payment request failed" };
    }
};
