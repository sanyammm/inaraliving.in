import React from "react";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsappProps {
  message: string; // Accept a message prop
}

const Whatsapp: React.FC<WhatsappProps> = ({ message }) => {
  const encodedMessage = encodeURIComponent(message); // Encode the message for the URL

  return (
    <a
      href={`https://wa.me/917454943021?text=${encodedMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-green-500 p-3 rounded-full shadow-lg z-50 hover:bg-green-600 transition animate-bounce"
    >
      <FaWhatsapp className="text-white text-2xl" />
    </a>
  );
};

export default Whatsapp;
