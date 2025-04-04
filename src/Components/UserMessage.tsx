import { useState, useEffect, useRef } from 'react';

interface Therapist {
  id: number;
  name: string;
  specialty: string;
}

const therapists: Therapist[] = [
  { id: 1, name: 'Dr. Mark Okwena', specialty: 'Psychiatrist' },
  { id: 2, name: 'Dr. Celestina Kweyu', specialty: 'Psychologist' },
  { id: 3, name: 'Dr. Faith Ndungwa', specialty: 'Therapist' },
  { id: 4, name: 'Dr. Cyrus Kimutai', specialty: 'Licensed Counselor' },
  { id: 5, name: 'Dr. Riyan Moraa', specialty: 'Neuropsychiatrist' },
  { id: 6, name: 'Dr. Christine Monyancha', specialty: 'Clinical Social Worker' }
];

interface Message {
  sender: string;
  recipient: string;
  text: string;
  role: 'user' | 'therapist';
  timestamp: Date;
}

const UserMessage = () => {
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleTherapistSelect = (therapist: Therapist) => {
    setSelectedTherapist(therapist);
    setMessages([]);
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedTherapist) {
      const userMessage: Message = {
        sender: 'You',
        recipient: selectedTherapist.name,
        text: message,
        role: 'user',
        timestamp: new Date()
      };
  
      const therapistResponses = [
        "Thank you for sharing that. I'm here to listen and help you through this.",
        "I understand that it can be challenging. Please take your time.",
        "You're not alone in this. Let's navigate it together at your pace.",
        "I appreciate your openness. Remember, it's okay to feel this way.",
        "Take a deep breath. We can explore this step by step.",
        "I'm here to help you feel heard and understood.",
        "Let's work together to find a way forward.",
        "Your feelings are valid, and it's okay to express them.",
        "Whenever you're ready, we can discuss this further.",
        "Thank you for trusting me with this. I am here to support you.",
      ];
  
      const therapistResponse: Message = {
        sender: selectedTherapist.name,
        recipient: 'You',
        text: therapistResponses[Math.floor(Math.random() * therapistResponses.length)],
        role: 'therapist',
        timestamp: new Date()
      };
  
      setMessages((prevMessages) => [...prevMessages, userMessage, therapistResponse]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 my-8"> {/* Added my-8 for vertical spacing */}
      {/* Therapist List */}
      <div className="w-full md:w-1/3 p-4 bg-gradient-to-b from-green-50 to-white border-r border-gray-200">
        <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 pb-4">
          <h2 className="text-xl font-bold text-green-800 mb-1">Available Therapists</h2>
          <p className="text-sm text-gray-500">Select a professional to message</p>
        </div>
        <ul className="space-y-2 overflow-y-auto max-h-[80vh]">
          {therapists.map((therapist) => (
            <li
              key={therapist.id}
              onClick={() => handleTherapistSelect(therapist)}
              className={`p-3 cursor-pointer rounded-lg transition-all flex items-start gap-3 ${
                selectedTherapist?.id === therapist.id 
                  ? 'bg-green-100 border-l-4 border-green-600 shadow-sm' 
                  : 'hover:bg-gray-50 border-l-4 border-transparent'
              }`}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-medium">
                {therapist.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{therapist.name}</h3>
                <p className="text-sm text-gray-500">{therapist.specialty}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="w-full md:w-2/3 flex flex-col bg-white">
        {selectedTherapist ? (
          <>
            <div className="p-4 sticky top-0 bg-white/80 backdrop-blur-sm z-10 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-medium">
                  {selectedTherapist.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-bold text-green-800">{selectedTherapist.name}</h2>
                  <p className="text-sm text-gray-500">{selectedTherapist.specialty}</p>
                </div>
              </div>
            </div>
            
            <div 
              ref={chatRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
              style={{ minHeight: '400px' }} // Added minimum height for better spacing
            >
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700">Start your conversation</h3>
                  <p className="text-gray-500 mt-1">Send your first message to {selectedTherapist.name}</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md rounded-2xl px-4 py-2 ${
                        msg.role === 'user'
                          ? "bg-green-600 text-white rounded-br-none"
                          : "bg-gray-200 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      <div className="flex justify-between items-baseline gap-2">
                        <p className="text-sm font-medium">{msg.sender}</p>
                        <p className="text-xs opacity-70">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <p className="text-sm mt-1">{msg.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="p-4 border-t border-gray-200 bg-white mt-auto"> {/* Added mt-auto to push to bottom */}
              <div className="flex gap-2">
                <textarea
                  className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  rows={3}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="self-end px-4 h-12 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-medium rounded-xl transition flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50" style={{ minHeight: '500px' }}> {/* Added minHeight */}
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">Select a therapist</h3>
            <p className="text-gray-500 text-center max-w-md">
              Choose a mental health professional from the list to start your conversation
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMessage;