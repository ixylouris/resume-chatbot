import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './components/ChatMessage';
import './App.css'

function App() {

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const IsEmpty = messages.length === 0;
  const exampleQuestions = [
    "Hello!",
    "Tell me about your studies",
    "What are your hobbies?",
    "What sports do you like?",
  ];
  const handleSend = async (customMessage) => {
    const messageToSend = customMessage || input.trim();
    if (!messageToSend.trim()) return;
    const userMessage = {
      sender: "user",
      text: messageToSend,
      id: Date.now()
    }
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    const responseText = await sendMessage(messageToSend);
    if (responseText) {
      const botMessage = {
        sender: "bot",
        text: responseText,
        id: Date.now().toString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }

  }


  const sendMessage = async (message) => {
    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response from server:', data);
        return data.text;
      } else {
        console.error('Error in response:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-600 mb-6 tracking-tight">
        🤖 Resume Chatbot
      </h1>

      <div className="flex flex-col w-[800px] h-[700px]  rounded-xl p-4 shadow-lg items-center bg-gray-100">
        <div className="w-full h-full flex flex-col ">
          <div className="flex-1 overflow-y-auto bg-gray-200 rounded-lg p-4 shadow-inner">
            {IsEmpty ? (
              <div className="flex flex-col items-center gap-2">
                <p className="text-lg font-semibold mb-4 text-gray-500">Welcome to Resume Chatbot</p>
                <p className="mb-4 text-gray-500">You can start by asking one of these:</p>


                {exampleQuestions.map((question, index) => (
                  <button key={index} onClick={() => handleSend(question)} >
                    {question}
                  </button>

                ))}
              </div>
            ) : (
              messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))
            )}



          </div>

          <div className="mt-4 flex">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 px-4 py-2 border text-black rounded-l-lg"
              placeholder="Type your message..."
            />
            <button
              onClick={() => handleSend()}
              className="bg-blue-500 text-white px-4 py-2 "
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}

export default App
