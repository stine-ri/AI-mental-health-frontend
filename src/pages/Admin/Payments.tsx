import { useEffect, useState } from "react";
import AdminLayout from "../../Components/Admin/AdminLayout";

interface Payment {
  id: number;
  merchantRequestId: string;
  checkoutRequestId: string;
  phoneNumber: string;
  amount: string;
  referenceCode: string;
  description: string;
  transactionDate: string;
  mpesaReceiptNumber: string | null;
  resultCode: string | null;
  resultDescription: string | null;
  isComplete: boolean;
  isSuccessful: boolean;
}

const Payments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/transactions");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setPayments(data.data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.phoneNumber.includes(searchTerm) ||
      payment.amount.includes(searchTerm) ||
      payment.referenceCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "complete" && payment.isComplete) ||
      (statusFilter === "pending" && !payment.isComplete);
    
    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this payment record?")) return;
    try {
      const response = await fetch(`http://localhost:8000/api/transactions/${id}`, { 
        method: "DELETE" 
      });
      if (!response.ok) throw new Error("Failed to delete payment");
      fetchPayments();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Deletion failed");
    }
  };

  // New function to mark payment as complete (frontend only)
  const handleMarkComplete = (id: number) => {
    setPayments(prevPayments => 
      prevPayments.map(payment => 
        payment.id === id ? { ...payment, isComplete: true } : payment
      )
    );
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Payment Records</h2>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Payments</label>
              <input
                type="text"
                placeholder="Search by phone, amount, reference or description..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="complete">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors text-sm font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Payments Table */}
        {!loading && !error && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-green-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Reference</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.length > 0 ? (
                    filteredPayments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.phoneNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${payment.amount}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-[150px] truncate">{payment.referenceCode}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-[200px] truncate">{payment.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(payment.transactionDate)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${payment.isComplete ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {payment.isComplete ? 'Completed' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          {!payment.isComplete && (
                            <button
                              onClick={() => handleMarkComplete(payment.id)}
                              className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                            >
                              Complete
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(payment.id)}
                            className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                        No payments found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Payments;