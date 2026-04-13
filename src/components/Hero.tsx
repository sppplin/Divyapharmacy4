import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BANNERS = [
  {
    desktop: "https://static.wixstatic.com/media/7fa905_afd984aef76543ffb6941211ce32c673~mv2.png",
    mobile: null, // Removed from mobile
    alt: "Divya Pharmacy Banner 1"
  },
  {
    desktop: "https://static.wixstatic.com/media/7fa905_d81e4b0ccfdf4a549770256de087229a~mv2.png",
    mobile: null, // Added as desktop-only
    alt: "Divya Pharmacy Banner 2"
  },
  {
    desktop: "https://static.wixstatic.com/media/7fa905_86e2dbb47ab84177868a9c28269620c7~mv2.png",
    mobile: "https://static.wixstatic.com/media/7fa905_f50781dbfbe7491194ecca4117b1637b~mv2.png",
    alt: "Divya Pharmacy Banner 3"
  }
];

export default function Hero() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [current, setCurrent] = useState(0);

  // Filter banners based on device
  const activeBanners = BANNERS.filter(b => isMobile ? b.mobile !== null : true);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      if (mobile !== isMobile) {
        setIsMobile(mobile);
        setCurrent(0); // Reset to first slide on resize to avoid index out of bounds
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % activeBanners.length);
  }, [activeBanners.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  }, [activeBanners.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full overflow-hidden bg-white group">
      <div className="relative w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${isMobile}-${current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="w-full"
          >
            {/* Desktop View */}
            {!isMobile && (
              <div className="w-full">
                <img
                  src={activeBanners[current].desktop}
                  alt={activeBanners[current].alt}
                  className="w-full h-auto block"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            
            {/* Mobile View */}
            {isMobile && activeBanners[current].mobile && (
              <div className="w-full">
                <img
                  src={activeBanners[current].mobile!}
                  alt={activeBanners[current].alt}
                  className="w-full h-auto block"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 border border-brand-dark flex items-center justify-center bg-white/20 backdrop-blur-sm hover:bg-brand-dark hover:text-white transition-all duration-300"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 border border-brand-dark flex items-center justify-center bg-white/20 backdrop-blur-sm hover:bg-brand-dark hover:text-white transition-all duration-300"
        >
          <ChevronRight size={24} />
        </button>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
          {activeBanners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                current === i ? 'w-8 bg-brand-gold' : 'w-4 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
