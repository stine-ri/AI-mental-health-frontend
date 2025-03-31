import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { MdPerson, MdWork } from "react-icons/md";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import { BiHomeAlt } from "react-icons/bi";

const Confirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve data from location.state
  const therapistName = location.state?.doctor ?? "Unknown";
  const specialization = location.state?.specialization ?? "Not Provided";
  const selectedDate = location.state?.date ?? "N/A";
  const selectedTime = location.state?.time ?? "N/A";

  // Redirect if session details are missing
  useEffect(() => {
    if (!location.state) {
      navigate("/user-dashboard");
    }
  }, [location.state, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-lg mx-auto p-6 mt-10 mb-20 border rounded-lg shadow-md bg-white"
    >
      <motion.h2
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-2xl font-semibold text-center mb-4 text-green-600 flex items-center justify-center gap-2"
      >
        ✅ Session Confirmed
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="p-4 bg-gray-100 rounded-lg mb-4 shadow-sm"
      >
        <div className="flex items-center mb-2 gap-2">
          <MdPerson className="text-green-500 text-2xl" />
          <p>
            <span className="font-semibold text-gray-700">Therapist:</span> {therapistName}
          </p>
        </div>

        <div className="flex items-center mb-2 gap-2">
          <MdWork className="text-green-500 text-2xl" />
          <p>
            <span className="font-semibold text-gray-700">Specialization:</span> {specialization}
          </p>
        </div>

        <div className="flex items-center mb-2 gap-2">
          <AiOutlineCalendar className="text-green-500 text-2xl" />
          <p>
            <span className="font-semibold text-gray-700">Date:</span> {selectedDate}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <AiOutlineClockCircle className="text-green-500 text-2xl" />
          <p>
            <span className="font-semibold text-gray-700">Time:</span> {selectedTime}
          </p>
        </div>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full mt-4 py-2 bg-green-500 text-white rounded-lg shadow-md 
                   hover:bg-green-600 transition-all duration-300 ease-in-out flex items-center justify-center gap-2"
        onClick={() => navigate("/user-dashboard")}
      >
        <BiHomeAlt size={20} /> Back to Home
      </motion.button>
    </motion.div>
  );
};

export default Confirmation;
