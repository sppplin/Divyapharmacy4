import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeen = localStorage.getItem('hasSeenPromo');
      if (!hasSeen) {
        setIsOpen(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenPromo', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-brand-cream w-full max-w-2xl overflow-hidden flex flex-col md:flex-row luxury-border shadow-2xl"
          >
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 z-10 text-brand-dark hover:text-brand-gold transition-colors"
            >
              <X size={24} />
            </button>

            <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop" 
                alt="Promo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="w-full md:w-1/2 p-12 flex flex-col justify-center text-center space-y-6">
              <span className="text-[11px] tracking-[0.4em] text-brand-gold font-bold uppercase">Exclusive Offer</span>
              <h2 className="text-3xl font-light tracking-widest text-brand-dark uppercase leading-tight">
                GET 15% OFF <br />
                <span className="italic font-serif">Your First Order</span>
              </h2>
              <p className="text-[12px] tracking-widest text-gray-500 leading-relaxed">
                Join the Soundarya Club and unlock timeless Ayurvedic secrets.
              </p>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); closePopup(); }}>
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="w-full bg-white border border-brand-border px-4 py-4 text-[12px] tracking-widest focus:outline-none focus:border-brand-gold transition-colors"
                  required
                />
                <button 
                  type="submit"
                  className="w-full py-4 bg-brand-dark text-white text-[11px] tracking-[0.3em] font-bold hover:bg-brand-gold transition-all"
                >
                  REVEAL MY CODE
                </button>
              </form>
              <button 
                onClick={closePopup}
                className="text-[10px] tracking-[0.2em] text-gray-400 hover:text-brand-dark transition-colors uppercase"
              >
                No thanks, I'll pay full price
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
