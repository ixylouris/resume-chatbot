import React from "react";
import  Message  from "../interfaces/Message.ts";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === "user";
  
  const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
  console.log("ChatMessage rendered:", timestamp, message.text);
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-2`}>
      <div className={`px-4 py-2 rounded-lg max-w-xs text-white ${isUser ? "bg-blue-500" : "bg-gray-700"}`}>
        
        {isUser ? (
          <div className="flex items-center justify-end space-x-2">
            <img src="./user.png" alt="User Icon" className="w-8 h-8 rounded-full"/>
            <span className="text-xs text-gray-300">{timestamp}   </span>
            
            </div>
        ) : (
            <div className="flex items-center justify-start space-x-4">
            <img src="./bot.png" alt="User Icon" className="w-8 h-8 rounded-full"/>
            <span className="text-xs text-gray-300">{timestamp}</span>
            
            </div>
        )}
        {message.text}
      </div>
    </div>
  );
};

export default ChatMessage;