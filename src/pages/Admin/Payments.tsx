import { useEffect, useState } from "react";
import AdminLayout from "../../Components/Admin/AdminLayout";

interface Payment {
  id: number;
  userId: number;
  sessionId: number;
  amount: number;
  currency: string;
  paymentStatus: string;
  paymentDate: string;
  stripePaymentId: string;
}

const Payments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [newPayment, setNewPayment] = useState({
    userId: "",
    sessionId: "",
    amount: "",
    currency: "usd",
    paymentStatus: "pending",
    paymentDate: "",
    stripePaymentId: "",
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  // Fetch Payments from Backend
  const fetchPayments = async () => {
    try {
      console.log("Fetching payments...");
      const response = await fetch("https://ai-mentalhealthplatform.onrender.com/api/payments", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Payments fetched successfully:", data);

      // Convert snake_case to camelCase
      const formattedPayments = data.map((payment: { 
        id: number; 
        user_id: number; 
        session_id: number; 
        amount: number; 
        currency: string; 
        payment_status: string; 
        payment_date: string; 
        stripe_payment_id: string; 
      }) => ({
        id: payment.id,
        userId: payment.user_id,
        sessionId: payment.session_id,
        amount: payment.amount,
        currency: payment.currency,
        paymentStatus: payment.payment_status,
        paymentDate: payment.payment_date,
        stripePaymentId: payment.stripe_payment_id,
      }));

      setPayments(formattedPayments);
    } catch (error) {
      console.error("Error fetching payments:", error);
      if (error instanceof Error) {
        alert(`Failed to fetch payments: ${error.message}`);
      } else {
        alert("Failed to fetch payments: An unknown error occurred.");
      }
    }
  };

  // Create a New Payment
  const handleCreate = async () => {
    await fetch("https://ai-mentalhealthplatform.onrender.com/api/payments/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPayment),
    });
    setNewPayment({ userId: "", sessionId: "", amount: "", currency: "usd", paymentStatus: "pending", paymentDate: "", stripePaymentId: "" });
    fetchPayments();
  };

  // Delete a Payment
  const handleDelete = async (id: number) => {
    await fetch(`https://ai-mentalhealthplatform.onrender.com/api/payments/create-payment-intent/${id}`, { method: "DELETE" });
    fetchPayments();
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4 text-center">Payments</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <input type="number" placeholder="User ID" className="border p-2 w-full" value={newPayment.userId} onChange={(e) => setNewPayment({ ...newPayment, userId: e.target.value })} />
        <input type="number" placeholder="Session ID" className="border p-2 w-full" value={newPayment.sessionId} onChange={(e) => setNewPayment({ ...newPayment, sessionId: e.target.value })} />
        <input type="number" placeholder="Amount" className="border p-2 w-full" value={newPayment.amount} onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })} />
        <input type="date" className="border p-2 w-full" value={newPayment.paymentDate} onChange={(e) => setNewPayment({ ...newPayment, paymentDate: e.target.value })} />
        <input type="text" placeholder="Stripe Payment ID" className="border p-2 w-full" value={newPayment.stripePaymentId} onChange={(e) => setNewPayment({ ...newPayment, stripePaymentId: e.target.value })} />
        <select className="border p-2 w-full" value={newPayment.paymentStatus} onChange={(e) => setNewPayment({ ...newPayment, paymentStatus: e.target.value })}>
          <option value="complete">Complete</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
        <button onClick={handleCreate} className="bg-green-600 text-white px-4 py-2 w-full">Add Payment</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm md:text-base">
          <thead>
            <tr className="bg-green-600 text-white border-b border-gray-300">
              <th className="p-2 border-r">ID</th>
              <th className="p-2 border-r">User ID</th>
              <th className="p-2 border-r">Session ID</th>
              <th className="p-2 border-r">Amount</th>
              <th className="p-2 border-r">Currency</th>
              <th className="p-2 border-r">Status</th>
              <th className="p-2 border-r">Payment Date</th>
              <th className="p-2 border-r">Stripe ID</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b border-gray-300 text-center">
                <td className="p-2 border-r">{payment.id}</td>
                <td className="p-2 border-r">{payment.userId}</td>
                <td className="p-2 border-r">{payment.sessionId}</td>
                <td className="p-2 border-r">${payment.amount}</td>
                <td className="p-2 border-r uppercase">{payment.currency}</td>
                <td className={`p-2 border-r ${payment.paymentStatus === "complete" ? "text-green-600" : payment.paymentStatus === "failed" ? "text-red-600" : "text-yellow-600"}`}>
                  {payment.paymentStatus}
                </td>
                <td className="p-2 border-r">{payment.paymentDate}</td>
                <td className="p-2 border-r">{payment.stripePaymentId}</td>
                <td className="p-2">
                  <button onClick={() => handleDelete(payment.id)} className="bg-red-600 text-white px-4 py-1">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Payments;
