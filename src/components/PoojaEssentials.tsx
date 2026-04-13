import { PRODUCTS } from '../constants';
import ProductCard from './ProductCard';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PoojaEssentials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const poojaProducts = PRODUCTS.filter(p => p.category === 'POOJA ESSENTIALS');

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  if (poojaProducts.length === 0) return null;

  return (
    <section className="py-20 px-4 max-w-[1600px] mx-auto overflow-hidden relative group bg-brand-cream/30">
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl tracking-[0.2em] font-light text-brand-dark mb-4 uppercase">
          Rituals Rooted in Tradition, Made with Purity
        </h2>
        <div className="w-20 h-[1px] bg-brand-gold mx-auto" />
      </div>

      <div className="relative">
        {/* Navigation Arrows */}
        <button 
          onClick={() => scroll('left')}
          className="absolute -left-4 lg:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 border border-brand-dark flex items-center justify-center bg-white/80 backdrop-blur-sm hover:bg-brand-dark hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="absolute -right-4 lg:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 border border-brand-dark flex items-center justify-center bg-white/80 backdrop-blur-sm hover:bg-brand-dark hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={24} />
        </button>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 md:gap-8 pb-12 snap-x snap-mandatory no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {poojaProducts.map((product) => (
            <div key={product.handle} className="min-w-[calc(50%-8px)] md:min-w-[350px] lg:min-w-[calc(25%-24px)] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Custom Scroll Indicator */}
      {poojaProducts.length > 4 && (
        <div className="max-w-md mx-auto mt-8 px-4">
          <div className="h-[2px] w-full bg-gray-200 relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-brand-dark transition-all duration-300 ease-out"
              style={{ width: '33%', left: `${scrollProgress * 0.67}%` }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
