import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Send } from 'lucide-react';
import { motion } from 'motion/react';

const TALES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=1935&auto=format&fit=crop",
    productIcon: "https://www.patanjaliayurved.net/assets/product_images/400x500/1764139919madhu1.webp",
    title: "Transformative Soundarya...",
    description: "This revolutionary Night Cream is a breakthrough blend immersed in an...",
    price: "INR 3375"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1974&auto=format&fit=crop",
    productIcon: "https://www.patanjaliayurved.net/assets/product_images/400x500/17643297541.webp",
    title: "Intense Perfume Kesari -...",
    description: "A captivating fragrance that captures the essence of India. The woody and...",
    price: "INR 6200"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1974&auto=format&fit=crop",
    productIcon: "https://www.patanjaliayurved.net/assets/product_images/400x500/1764149736peedanil20n1.webp",
    title: "Sheer Sun Fluid With SPF 50...",
    description: "Made with tender Coconut Water, fresh Basil leaves and cooling Aloe...",
    price: "INR 1575"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1552046122-03184de85e08?q=80&w=1887&auto=format&fit=crop",
    productIcon: "https://www.patanjaliayurved.net/assets/product_images/400x500/1764139919madhu1.webp",
    title: "Intensive Hair Repair Masqu...",
    description: "A rich creamy pre-shampoo masque, this Intensive Hair Repair Masque is...",
    price: "INR 2250"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=2070&auto=format&fit=crop",
    productIcon: "https://www.patanjaliayurved.net/assets/product_images/400x500/17643297541.webp",
    title: "Sheer Sunscreen Body Spra...",
    description: "1st ever Ayurvedic Sun Spray that gives broad-spectrum protection against th...",
    price: "INR 2250"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1921&auto=format&fit=crop",
    productIcon: "https://www.patanjaliayurved.net/assets/product_images/400x500/1764149736peedanil20n1.webp",
    title: "Advanced Hair Growth Serum",
    description: "This Advanced Hair Growth Serum is an innovative hair growth concentrat...",
    price: "INR 1975"
  }
];

export default function TrustedTales() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
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

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <h2 className="text-[32px] tracking-[0.15em] font-light text-brand-dark mb-4 uppercase">
            TRUSTED TALES
          </h2>
          <p className="text-[14px] text-gray-600 tracking-wide leading-relaxed">
            Experience Ayurveda, share your story. Be part of the #DivyaTribe—tag <span className="font-bold text-brand-dark">@divyapharmacy</span> to get featured.
          </p>
        </div>

        <div className="relative group">
          {/* Navigation Arrows */}
          <button 
            onClick={() => scroll('left')}
            className={`absolute -left-4 lg:-left-6 top-[40%] -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 border border-brand-dark flex items-center justify-center bg-white/90 backdrop-blur-sm hover:bg-brand-dark hover:text-white transition-all duration-300 ${!showLeftArrow ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className={`absolute -right-4 lg:-right-6 top-[40%] -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 border border-brand-dark flex items-center justify-center bg-white/90 backdrop-blur-sm hover:bg-brand-dark hover:text-white transition-all duration-300 ${!showRightArrow ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <ChevronRight size={24} />
          </button>

          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 lg:gap-5 pb-12 no-scrollbar snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {TALES.map((tale) => (
              <div 
                key={tale.id} 
                className="min-w-[260px] md:min-w-[300px] lg:min-w-[340px] snap-start bg-white rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={tale.image} 
                    alt={tale.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Icons on Image */}
                  <div className="absolute bottom-4 right-4 flex space-x-4 text-white drop-shadow-md">
                    <Heart size={20} className="cursor-pointer hover:text-red-400 transition-all" />
                    <Send size={20} className="cursor-pointer hover:scale-110 transition-all" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex space-x-3 items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-9 h-9 rounded-full border border-gray-200 overflow-hidden bg-white p-1">
                      <img 
                        src={tale.productIcon} 
                        alt="Product" 
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[12px] font-bold text-brand-dark mb-1 line-clamp-1 tracking-wide">
                      {tale.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 leading-[1.4] mb-2 line-clamp-2">
                      {tale.description}
                    </p>
                    <p className="text-[12px] font-bold text-brand-dark">
                      {tale.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
