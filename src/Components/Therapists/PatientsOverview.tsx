import { useState } from "react";

interface Patient {
  id: number;
  name: string;
  state: string;
  messages: { sender: string; text: string }[];
}

const patientsData: Patient[] = [
  { id: 1, name: "John Doe", state: "Anxious", messages: [{ sender: "John", text: "I've been feeling anxious lately." }] },
  { id: 2, name: "Jane Smith", state: "Depressed", messages: [{ sender: "Jane", text: "I feel like nothing is going right." }] },
  { id: 3, name: "Alice Brown", state: "Stressed", messages: [{ sender: "Alice", text: "Work has been overwhelming." }] },
  { id: 4, name: "Mike Johnson", state: "Angry", messages: [{ sender: "Mike", text: "I can't control my temper sometimes." }] },
  { id: 5, name: "Emma Davis", state: "Fearful", messages: [{ sender: "Emma", text: "I'm afraid of failing." }] },
  { id: 6, name: "Chris Wilson", state: "Sad", messages: [{ sender: "Chris", text: "I feel down most of the time." }] },
  { id: 7, name: "Sophia Martinez", state: "Confused", messages: [{ sender: "Sophia", text: "I don't know what to do with my life." }] },
  { id: 8, name: "Oliver Green", state: "Nervous", messages: [{ sender: "Oliver", text: "I feel nervous about upcoming exams." }] },
  { id: 9, name: "Isabella White", state: "Lonely", messages: [{ sender: "Isabella", text: "I feel like no one understands me." }] },
];

const PatientMessages = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [reply, setReply] = useState("");

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const handleSendReply = () => {
    if (selectedPatient && reply.trim() !== "") {
      selectedPatient.messages.push({ sender: "Therapist", text: reply });
      setReply("");
    }
  };

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto bg-green-100 rounded-lg shadow-xl overflow-hidden">
      {/* Sidebar for Patients */}
      <div className="md:w-1/3 w-full p-6 bg-green-300">
        <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-4">Patients</h2>
        <ul className="space-y-3">
          {patientsData.map((patient) => (
            <li
              key={patient.id}
              onClick={() => handlePatientSelect(patient)}
              className={`p-3 cursor-pointer rounded-lg shadow-md ${
                selectedPatient?.id === patient.id ? "bg-green-600 text-white" : "bg-green-400 text-green-900"
              } hover:bg-green-500 transition duration-200`}
            >
              <strong className="block">{patient.name}</strong>
              <span className="block text-sm">State: {patient.state}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Message Display */}
      <div className="md:w-2/3 w-full p-6 bg-white">
        {selectedPatient ? (
          <>
            <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-4">
              Messages with {selectedPatient.name}
            </h2>
            <div className="overflow-y-auto h-64 md:h-72 p-4 mb-4 bg-gray-100 rounded-lg shadow-inner">
              {selectedPatient.messages.map((message, index) => (
                <p
                  key={index}
                  className={`mb-3 ${
                    message.sender === "Therapist" ? "text-green-700 font-semibold" : "text-gray-800"
                  }`}
                >
                  <strong>{message.sender}:</strong> {message.text}
                </p>
              ))}
            </div>
            <input
              type="text"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className="w-full p-3 border border-green-500 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Type your response..."
            />
            <button
              onClick={handleSendReply}
              className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 rounded-lg transition duration-200"
            >
              Send Reply
            </button>
          </>
        ) : (
          <p className="text-green-700 font-semibold">Select a patient to view messages</p>
        )}
      </div>
    </div>
  );
};

export default PatientMessages;
