import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

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

const UserPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUserPayments();
  }, []);

  // Proper Kenyan date formatting that handles timezone correctly
  const formatKenyanDateTime = (dateString: string) => {
    try {
      // Create date object and adjust for Kenyan timezone (UTC+3)
      const date = new Date(dateString);
      const offset = date.getTimezoneOffset();
      const kenyanOffset = -180; // Kenya is UTC+3 (3*60 minutes)
      const adjustedDate = new Date(date.getTime() + (offset - kenyanOffset) * 60 * 1000);

      return adjustedDate.toLocaleString('en-US', {
        timeZone: 'Africa/Nairobi',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  const fetchUserPayments = async () => {
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

    const userPhone = loggedInUser.user.contact_phone.replace(/^0/, "254");

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

      const userPayments = responseData.data.filter(
        (payment: Payment) => payment.phoneNumber === userPhone
      );

      setPayments(userPayments);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.setTextColor(5, 150, 105);
    doc.text("Payment History", 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${formatKenyanDateTime(new Date().toISOString())}`, 14, 28);

    autoTable(doc, {
      startY: 35,
      head: [['Therapist', 'Description', 'Amount', 'Status', 'Date & Time (EAT)', 'Receipt']],
      body: payments.map(payment => [
        payment.referenceCode,
        payment.description,
        `$${payment.amount}`,
        payment.isSuccessful ? 'Successful' : 'Failed',
        formatKenyanDateTime(payment.transactionDate),
        payment.mpesaReceiptNumber || 'N/A'
      ]),
      headStyles: {
        fillColor: [5, 150, 105],
        textColor: 255
      },
      alternateRowStyles: {
        fillColor: [240, 252, 245]
      },
      styles: {
        cellPadding: 5,
        fontSize: 10,
        valign: 'middle'
      }
    });

    doc.save("payment_history.pdf");
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full text-center">
        <div className="text-red-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-800 mb-2">Error Loading Payments</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button 
          onClick={fetchUserPayments}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>
            <p className="text-gray-600 mt-1">
              {payments.length} {payments.length === 1 ? 'transaction' : 'transactions'} found
            </p>
          </div>
          <button
            onClick={generatePDF}
            className="mt-4 md:mt-0 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export to PDF
          </button>
        </div>

        {payments.length === 0 ? (
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No payment history</h3>
              <p className="mt-1 text-sm text-gray-500">You don't have any payment records yet.</p>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-green-600">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Therapist
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Date & Time (EAT)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Receipt
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {payment.referenceCode}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${payment.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          payment.isSuccessful 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {payment.isSuccessful ? 'Successful' : 'Failed'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatKenyanDateTime(payment.transactionDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.mpesaReceiptNumber || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPayments;