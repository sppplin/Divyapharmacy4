import { useState } from 'react';
import { MessageSquareText, X } from 'lucide-react';
import ChatWindow from './ChatWindow';

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[80] w-14 h-14 bg-brand-dark text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 group"
      >
        {isOpen ? <X size={24} /> : <MessageSquareText size={24} />}
        {!isOpen && (
          <span className="absolute right-full mr-4 bg-white px-3 py-1.5 rounded-lg text-[10px] font-bold text-brand-dark shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest border border-brand-cream">
            Wellness Help?
          </span>
        )}
      </button>

      <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
