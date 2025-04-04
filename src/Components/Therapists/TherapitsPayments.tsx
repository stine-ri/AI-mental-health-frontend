import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

interface Payment {
  id: number;
  referenceCode: string;
  description: string;
  amount: string;
  isSuccessful: boolean;
  transactionDate: string;
  phoneNumber: string;
  mpesaReceiptNumber: string | null;
}

const TherapistPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTherapistPayments();
  }, []);

  const fetchTherapistPayments = async () => {
    if (!token) {
      setError("Unauthorized: No token found.");
      setLoading(false);
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setError("No user data found in local storage.");
      setLoading(false);
      return;
    }

    let loggedInUser;
    try {
      loggedInUser = JSON.parse(storedUser);
    } catch {
      setError("Error parsing user data.");
      setLoading(false);
      return;
    }

    const therapistFullName = loggedInUser.user.full_name.trim();
    if (!therapistFullName) {
      setError("Invalid user data format. Missing 'full_name'.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch payments");

      const responseData = await response.json();

      if (!Array.isArray(responseData.data)) {
        setError("Invalid response format from server.");
        setLoading(false);
        return;
      }

      const therapistPayments = responseData.data.filter((payment: Payment) => {
        const paymentReference: string = payment.referenceCode.trim().replace(/^Dr\s/, "");
        return paymentReference === therapistFullName;
      });

      setPayments(therapistPayments);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Therapist Payments", 14, 20);
    
    let yPosition = 30;
    payments.forEach((payment) => {
      doc.setFontSize(12);
      doc.text(`Therapist: ${payment.referenceCode}`, 14, yPosition);
      doc.text(`Role: ${payment.description}`, 14, yPosition + 10);
      doc.text(`Amount: $${payment.amount}`, 14, yPosition + 20);
      doc.text(`Status: ${payment.isSuccessful ? "Successful" : "Failed"}`, 14, yPosition + 30);
      doc.text(`Date: ${new Date(payment.transactionDate).toLocaleDateString()}`, 14, yPosition + 40);
      doc.text(`Phone: ${payment.phoneNumber}`, 14, yPosition + 50);
      doc.text(`Receipt: ${payment.mpesaReceiptNumber || "N/A"}`, 14, yPosition + 60);
      yPosition += 70;
      
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
    });

    doc.save("therapist_payments.pdf");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full">
          <div className="text-red-500 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-bold mb-2">Error Loading Payments</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8 bg-gradient-to-r from-green-600 to-emerald-600">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl font-bold text-white">Payment History</h1>
                <p className="text-emerald-100">View all your transaction records</p>
              </div>
              <button
                onClick={generatePDF}
                className="flex items-center gap-2 bg-white text-green-700 hover:bg-gray-100 font-medium py-2 px-4 rounded-lg transition-colors shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export as PDF
              </button>
            </div>
          </div>

          <div className="p-6">
            {payments.length > 0 ? (
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Therapist
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Receipt
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {payment.referenceCode}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {payment.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ${payment.amount}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            payment.isSuccessful
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                            {payment.isSuccessful ? "Successful" : "Failed"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(payment.transactionDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {payment.phoneNumber}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {payment.mpesaReceiptNumber || "N/A"}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No payments found</h3>
                <p className="mt-1 text-gray-500">You don't have any payment records yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistPayments;