import { MessageCircle } from "lucide-react";

const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/6282136421628"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full text-white flex items-center justify-center shadow-lg shadow-black/20 hover:scale-110 hover:shadow-xl transition-all duration-300 bg-secondary">
      
      <MessageCircle className="w-6 h-6 fill-white" />
    </a>);

};

export default WhatsAppFloat;