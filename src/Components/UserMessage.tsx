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
}

const UserMessage = () => {
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

  // Function to scroll chat to the bottom when messages update
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleTherapistSelect = (therapist: Therapist) => {
    setSelectedTherapist(therapist);
    setMessages([]); // Clear previous messages when switching therapists
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedTherapist) {
      const userMessage: Message = {
        sender: 'User',
        recipient: selectedTherapist.name,
        text: message,
        role: 'user',
      };
  
      // Array of empathetic and calming responses from the therapist
      const therapistResponses = [
        "Thank you for sharing that. I'm here to listen and help you through this.",
        "I understand that it can be challenging. Please take your time, and I'm here to support you.",
        "You're not alone in this. Let's navigate it together at your pace.",
        "I appreciate your openness. Remember, it's okay to feel this way, and we'll work through it.",
        "Take a deep breath. We can explore this step by step.",
        "I'm here for you, and I'm here to help you feel heard and understood.",
        "I understand this may be difficult. Let's work together to find a way forward.",
        "Your feelings are valid, and it's okay to express them. I'm here for you.",
        "Whenever you're ready, we can discuss this further. There's no rush.",
        "Thank you for trusting me with this. I am here to support you.",
      ];
  
      // Select a random response
      const therapistResponse: Message = {
        sender: selectedTherapist.name,
        recipient: 'User',
        text: therapistResponses[Math.floor(Math.random() * therapistResponses.length)],
        role: 'therapist',
      };
  
      setMessages((prevMessages) => [...prevMessages, userMessage, therapistResponse]);
      setMessage('');
    }
  };
  

  return (
    <div className="flex max-w-5xl mx-auto p-8 bg-green-100 rounded-lg shadow-md">
      <div className="w-1/3 p-4 bg-green-200 rounded-lg">
        <h2 className="text-xl font-semibold text-green-800 mb-4">Choose a Therapist</h2>
        <ul className="space-y-2">
          {therapists.map((therapist) => (
            <li
              key={therapist.id}
              onClick={() => handleTherapistSelect(therapist)}
              className={`p-2 cursor-pointer rounded-lg text-green-900 hover:bg-green-400 transition ${
                selectedTherapist?.id === therapist.id ? 'bg-green-600 text-white' : 'bg-green-300'
              }`}
            >
              {therapist.name} - {therapist.specialty}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-2/3 p-4">
        {selectedTherapist ? (
          <>
            <h2 className="text-2xl font-semibold text-green-800 mb-4">
              Chat with {selectedTherapist.name}
            </h2>
            <div
              ref={chatRef}
              className="overflow-y-auto h-64 p-4 mb-4 bg-gray-100 rounded-lg shadow-inner"
            >
              {messages.map((msg, index) => (
                <p
                  key={index}
                  className={`mb-3 ${
                    msg.role === 'user' ? 'text-gray-800' : 'text-green-700 font-semibold'
                  }`}
                >
                  <strong>{msg.sender}:</strong> {msg.text}
                </p>
              ))}
            </div>
            <textarea
              className="w-full p-3 border border-green-500 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendMessage}
              className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition"
            >
              Send Message
            </button>
          </>
        ) : (
          <p className="text-green-700 font-semibold">Select a therapist to send a message</p>
        )}
      </div>
    </div>
  );
};

export default UserMessage;
