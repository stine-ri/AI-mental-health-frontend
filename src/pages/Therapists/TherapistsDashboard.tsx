import React, { useState } from "react";
import { Users, CalendarCheck, MessageSquare, Smile } from "lucide-react";
import Header from "../../Components/Therapists/Header";
import Sidebar from "../../Components/Therapists/Sidebar";
import StatsCard from "../../Components/Therapists/StatsCard";

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main Content */}
      <div className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-16"}`}>
        <Header />

        {/* Stats Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <StatsCard
            title="Total Patients"
            value="1.2K"
            percentage="8%"
            isPositive={true}
            icon={<Users size={32} />}
            description="Number of active patients receiving therapy"
          />
          <StatsCard
            title="Upcoming Appointments"
            value="45"
            percentage="3%"
            isPositive={true}
            icon={<CalendarCheck size={32} />}
            description="Scheduled therapy sessions this week"
          />
          <StatsCard
            title="Messages"
            value="120"
            percentage="2%"
            isPositive={false}
            icon={<MessageSquare size={32} />}
            description="Unread messages from patients"
          />
          <StatsCard
            title="Positive Feedback"
            value="96%"
            percentage="1%"
            isPositive={true}
            icon={<Smile size={32} />}
            description="Patients reporting improved mental health"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
