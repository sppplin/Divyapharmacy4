import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { useStore } from '../StoreContext';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ChevronRight, Star, Heart, Plus, Minus, Gift, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const INGREDIENTS_DATA = [
  { name: 'Bakuchiol', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=200&h=200&auto=format&fit=crop', desc: 'An extract from the Ayurvedic herb Bakuchi which visibly reduces pigmentation and plumps skin by boosting collagen.' },
  { name: 'Bala', image: 'https://images.unsplash.com/photo-1615485242231-973f5a732be9?q=80&w=200&h=200&auto=format&fit=crop', desc: 'A renowned Ayurvedic herb strengthens hair roots and prevents breakage. It offers natural nourishment.' },
  { name: 'Bhringraj', image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=200&h=200&auto=format&fit=crop', desc: 'Bhringraj is excellent for hair growth, strength, nourishment, and prevents dandruff.' },
  { name: 'Brahmi', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=200&h=200&auto=format&fit=crop', desc: 'Brahmi is traditionally used for its hair-strengthening properties. It nourishes, promotes growth.' }
];

export default function ProductPage() {
  const { handle } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('200ml');
  const [activeAccordion, setActiveAccordion] = useState<string | null>('description');

  const product = PRODUCTS.find(p => p.handle === handle);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-light tracking-widest">PRODUCT NOT FOUND</h2>
        <button onClick={() => navigate('/')} className="text-brand-gold hover:underline">Return to Home</button>
      </div>
    );
  }

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      {/* Breadcrumbs */}
      <div className="max-w-[1440px] mx-auto px-6 py-6 flex items-center space-x-2 text-[11px] tracking-[0.1em] text-gray-500 uppercase">
        <button onClick={() => navigate('/')} className="hover:text-brand-dark">HOME</button>
        <ChevronRight size={12} className="text-gray-300" />
        <span className="text-brand-dark">{product.title}</span>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative aspect-[4/5] bg-[#F9F9F9] flex items-center justify-center overflow-hidden group">
            <motion.img 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={product.image} 
              alt={product.title} 
              className="max-w-[80%] max-h-[80%] object-contain mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
            <button className="absolute top-6 right-6 p-2 bg-white rounded-full shadow-sm hover:text-brand-gold transition-colors">
              <Heart size={20} />
            </button>
            
            {/* Carousel Dots */}
            <div className="absolute bottom-10 flex space-x-2">
              {[...Array(10)].map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-gray-400' : 'bg-gray-200'}`} />
              ))}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`aspect-square bg-[#F9F9F9] border ${i === 0 ? 'border-brand-gold' : 'border-transparent'} p-2 cursor-pointer`}>
                <img src={product.image} alt="" className="w-full h-full object-contain mix-blend-multiply" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 italic text-center">
            Disclaimer: The image is for representation purposes only. The packaging you receive might vary.
          </p>
        </div>

        {/* Right: Product Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl font-serif text-brand-dark leading-tight">
              {product.title}
            </h1>
            
            <div className="space-y-2">
              <span className="text-[12px] tracking-[0.1em] font-bold text-gray-600 uppercase">SIZE :</span>
              <div className="flex space-x-3">
                {['50ml', '200ml'].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-2 border text-[12px] tracking-widest transition-all ${
                      selectedSize === size 
                        ? 'bg-[#4A4A4A] text-white border-[#4A4A4A]' 
                        : 'bg-white text-brand-dark border-gray-300 hover:border-brand-dark'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4 py-2">
              <div className="flex text-brand-gold">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} className={i < 4 ? "" : "text-gray-300"} />)}
              </div>
              <span className="text-[12px] text-gray-400">(155)</span>
              <span className="text-[12px] text-gray-400">|</span>
              <span className="text-[12px] text-gray-400">9 Questions \ 12 Answers</span>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-medium text-brand-dark">₹{product.price.toLocaleString()}</span>
                <span className="text-[10px] text-gray-400 uppercase">(MRP INCLUSIVE OF ALL TAXES)</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 h-12">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 h-full hover:bg-gray-50 transition-colors border-r border-gray-300">
                <Minus size={14} />
              </button>
              <span className="px-6 font-medium text-[14px]">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 h-full hover:bg-gray-50 transition-colors border-l border-gray-300">
                <Plus size={14} />
              </button>
            </div>
            <button 
              onClick={() => addToCart(product, quantity)}
              className="flex-grow h-12 border border-brand-dark text-brand-dark text-[12px] tracking-[0.2em] font-bold hover:bg-brand-dark hover:text-white transition-all uppercase"
            >
              ADD TO BAG
            </button>
          </div>

          {/* Delivery Options */}
          <div className="space-y-4 pt-4">
            <h3 className="text-[16px] font-serif text-brand-dark">Delivery Options</h3>
            <div className="flex items-center border border-gray-300 p-1">
              <input 
                type="text" 
                placeholder="ENTER PIN CODE" 
                className="flex-grow px-4 py-2 text-[12px] tracking-widest focus:outline-none"
              />
              <button className="px-6 py-2 text-brand-gold text-[12px] tracking-widest font-bold hover:text-brand-dark transition-colors">
                CHECK
              </button>
            </div>
            <p className="text-[12px] text-gray-500 leading-relaxed">
              Delivery outside India? <br />
              Guaranteed dispatch within 48 Hrs.
            </p>
          </div>

          {/* Offers & What's New */}
          <div className="flex space-x-4">
            <button className="flex-1 py-3 bg-[#F2EFE9] text-brand-dark text-[11px] tracking-[0.1em] font-bold flex items-center justify-center space-x-2 uppercase">
              <Gift size={16} className="text-brand-gold" />
              <span>AVAILABLE OFFERS</span>
            </button>
            <button className="flex-1 py-3 bg-[#F2EFE9] text-brand-dark text-[11px] tracking-[0.1em] font-bold flex items-center justify-center space-x-2 uppercase">
              <Sparkles size={16} className="text-brand-gold" />
              <span>WHAT'S NEW</span>
            </button>
          </div>

          {/* Accordions */}
          <div className="border-t border-gray-200">
            <div className="border-b border-gray-200">
              <button 
                onClick={() => toggleAccordion('description')}
                className="w-full py-4 flex justify-between items-center text-left"
              >
                <span className="text-[18px] font-serif text-brand-dark">Description</span>
                {activeAccordion === 'description' ? <Minus size={18} /> : <Plus size={18} />}
              </button>
              <AnimatePresence>
                {activeAccordion === 'description' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-[14px] text-gray-600 leading-relaxed tracking-wide">
                      {product.longDescription || product.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="border-b border-gray-200">
              <button 
                onClick={() => toggleAccordion('benefits')}
                className="w-full py-4 flex justify-between items-center text-left"
              >
                <span className="text-[18px] font-serif text-brand-dark">Benefits</span>
                {activeAccordion === 'benefits' ? <Minus size={18} /> : <Plus size={18} />}
              </button>
              <AnimatePresence>
                {activeAccordion === 'benefits' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <ul className="pb-6 list-disc list-inside text-[14px] text-gray-600 space-y-2">
                      {product.benefits.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* What's Inside Section */}
      <section className="mt-24 py-20 bg-[#F9F9F9]">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-baseline justify-between mb-16 border-b border-gray-200 pb-8">
            <div className="space-y-2">
              <span className="text-[11px] tracking-[0.2em] text-gray-400 font-bold uppercase">KEY INGREDIENTS</span>
              <h2 className="text-4xl font-serif text-brand-dark">What's inside that really matters</h2>
            </div>
            <button className="text-[12px] tracking-[0.2em] font-bold text-brand-dark border-b border-brand-dark pb-1 uppercase hover:text-brand-gold hover:border-brand-gold transition-colors">
              VIEW FULL LIST
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {INGREDIENTS_DATA.map((ing) => (
              <div key={ing.name} className="space-y-6">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden luxury-border bg-white p-2">
                  <img src={ing.image} alt={ing.name} className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-4 text-center lg:text-left">
                  <h3 className="text-xl font-serif text-brand-dark border-b border-gray-200 pb-2 inline-block">{ing.name}</h3>
                  <p className="text-[13px] text-gray-500 leading-loose tracking-wide">
                    {ing.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
