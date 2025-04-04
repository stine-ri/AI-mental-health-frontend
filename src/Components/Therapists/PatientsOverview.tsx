import { useState } from "react";

interface Patient {
  id: number;
  name: string;
  state: string;
  messages: { sender: string; text: string }[];
}

const patientsData: Patient[] = [
  { id: 1, name: "Christine Monyancha", state: "Anxious", messages: [{ sender: "Christine", text: "I've been feeling anxious lately." }] },
  { id: 2, name: "Ryan Kasire", state: "Depressed", messages: [{ sender: "Ryan", text: "I feel like nothing is going right." }] },
  { id: 3, name: "Abdirahman Sadiki", state: "Stressed", messages: [{ sender: "Sadiki", text: "Work has been overwhelming." }] },
  { id: 4, name: "Cyrus Kimutai", state: "Angry", messages: [{ sender: "Cyrus", text: "I can't control my temper sometimes." }] },
  { id: 5, name: "Faith Peter", state: "Fearful", messages: [{ sender: "Faith", text: "I'm afraid of failing." }] },
  { id: 6, name: "Chris Mutua", state: "Sad", messages: [{ sender: "Chris", text: "I feel down most of the time." }] },
  { id: 7, name: "Sophia Kweyu", state: "Confused", messages: [{ sender: "Sophia", text: "I don't know what to do with my life." }] },
  { id: 8, name: "Oliver Afanda", state: "Nervous", messages: [{ sender: "Oliver", text: "I feel nervous about upcoming exams." }] },
  { id: 9, name: "Isabella Moraa", state: "Lonely", messages: [{ sender: "Isabella", text: "I feel like no one understands me." }] },
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
    <div className="flex flex-col md:flex-row h-[calc(100vh-80px)] max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      {/* Sidebar for Patients */}
      <div className="md:w-1/3 w-full border-r border-gray-200 bg-gradient-to-b from-green-50 to-white">
        <div className="p-6 sticky top-0 bg-white/80 backdrop-blur-sm z-10 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-green-800 mb-1">Patients</h2>
          <p className="text-sm text-gray-500">Select a patient to view messages</p>
        </div>
        <div className="overflow-y-auto h-[calc(100%-80px)]">
          <ul className="space-y-2 p-4">
            {patientsData.map((patient) => (
              <li
                key={patient.id}
                onClick={() => handlePatientSelect(patient)}
                className={`p-4 cursor-pointer rounded-xl transition-all duration-200 flex items-start gap-3 ${
                  selectedPatient?.id === patient.id 
                    ? "bg-green-100 border-l-4 border-green-600 shadow-sm" 
                    : "hover:bg-gray-50 border-l-4 border-transparent"
                }`}
              >
                <div className={`flex-shrink-0 w-3 h-3 mt-1.5 rounded-full ${
                  patient.state === "Anxious" ? "bg-yellow-500" :
                  patient.state === "Depressed" ? "bg-blue-500" :
                  patient.state === "Stressed" ? "bg-orange-500" :
                  patient.state === "Angry" ? "bg-red-500" :
                  patient.state === "Fearful" ? "bg-purple-500" :
                  patient.state === "Sad" ? "bg-indigo-500" :
                  patient.state === "Confused" ? "bg-pink-500" :
                  patient.state === "Nervous" ? "bg-amber-500" : "bg-gray-500"
                }`}></div>
                <div>
                  <strong className="block font-medium text-gray-900">{patient.name}</strong>
                  <span className="block text-xs text-gray-500 mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-800">
                      {patient.state}
                    </span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Message Display */}
      <div className="md:w-2/3 w-full flex flex-col bg-white">
        {selectedPatient ? (
          <>
            <div className="p-6 sticky top-0 bg-white/80 backdrop-blur-sm z-10 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-green-800 mb-1">
                Conversation with {selectedPatient.name}
              </h2>
              <p className="text-sm text-gray-500">
                {selectedPatient.state} • Last message: {selectedPatient.messages.slice(-1)[0].text.substring(0, 30)}...
              </p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {selectedPatient.messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === "Therapist" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md rounded-2xl px-4 py-2 ${
                      message.sender === "Therapist"
                        ? "bg-green-600 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm font-medium">{message.sender}</p>
                    <p className="text-sm mt-1">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendReply()}
                  className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Type your response..."
                />
                <button
                  onClick={handleSendReply}
                  disabled={!reply.trim()}
                  className="px-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-medium rounded-xl transition duration-200 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No patient selected</h3>
            <p className="text-gray-500 text-center max-w-md">
              Select a patient from the sidebar to view and respond to their messages.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientMessages;