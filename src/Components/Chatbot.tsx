// import React, { useState } from "react";

// const Chatbot: React.FC = () => {
//   const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
//   const [input, setInput] = useState("");

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { text: input, sender: "user" };
//     setMessages([...messages, userMessage]);

//     try {
//       const response = await fetch("http://localhost:3000/get-response", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: input }),
//       });

//       const data = await response.json();
//       const botMessage = { text: data.reply, sender: "bot" };

//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.error("Error:", error);
//     }

//     setInput("");
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Main Content Area: Chatbot Centered */}
//       <main className="flex-1 flex items-center justify-center p-4">
//         <div className="w-full max-w-md bg-white border shadow-lg rounded-lg flex flex-col">
//           {/* Chatbot Header */}
//           <div className="bg-green-600 text-white p-3 font-bold text-center rounded-t-lg">
//             Chatbot
//           </div>

//           {/* Chat Messages */}
//           <div className="p-3 h-64 overflow-y-auto flex flex-col space-y-2">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex ${
//                   msg.sender === "user" ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <span
//                   className={`px-4 py-2 rounded-lg text-sm max-w-xs ${
//                     msg.sender === "user"
//                       ? "bg-green-500 text-white"
//                       : "bg-gray-200 text-black"
//                   }`}
//                 >
//                   {msg.text}
//                 </span>
//               </div>
//             ))}
//           </div>

//           {/* Chat Input */}
//           <div className="p-2 flex border-t">
//             <input
//               type="text"
//               className="flex-1 border p-2 rounded-l-lg outline-none text-sm"
//               placeholder="Type a message..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             />
//             <button
//               className="bg-green-600 text-white px-4 rounded-r-lg text-sm hover:bg-green-700"
//               onClick={sendMessage}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Chatbot;

import React from "react";

const Chatbot: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 120px)", // Adjusting height for header and footer
        margin: "60px 0", // Space for header and footer (assumed 60px each)
        padding: "20px", // Padding for better spacing on small screens
      }}
    >
      <div
        style={{
          width: "90vw",
          height: "70vh",
          backgroundColor: "#1a1a1a",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          maxWidth: "900px",  // Max width for larger screens
          minWidth: "300px",  // Ensures usability on small screens
          overflow: "hidden",
        }}
      >
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/LlL4TiFs541QRazwQjuMB"
          title="Mental Health AI Chatbot"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
          allow="microphone;"
        ></iframe>
      </div>
    </div>
  );
};

export default Chatbot;
