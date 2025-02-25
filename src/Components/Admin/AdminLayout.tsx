// src/components/admin/AdminLayout.tsx
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";


const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
      
    </div>
  );
};

export default AdminLayout;
