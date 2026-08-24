import { MessageCircle } from "lucide-react";

function WhatsAppButton() {
  return (
    <a href="https://wa.me/97466310125" target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="Chat on WhatsApp">
      <MessageCircle size={26} color="#fff" fill="#25d366" />
    </a>
  );
}

export default WhatsAppButton;