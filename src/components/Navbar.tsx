import { Search, User, ShoppingBag, Menu, X, ChevronDown, MapPin } from 'lucide-react';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../StoreContext';
import { CATEGORIES, PRODUCTS } from '../constants';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const { cartCount, user, logout } = useStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleMouseEnter = (category: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMegaMenu(category);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#fbf9f9] border-b border-brand-border">
      {/* Top Bar */}
      <div className="bg-black text-white text-[11px] tracking-[0.15em] py-2.5 text-center font-medium uppercase">
        <span className="lg:hidden">COMPLIMENTARY SAMPLES ABOVE ₹999!</span>
        <span className="hidden lg:inline">FREE BESTSELLER ON 1ST ORDER*. CODE:WELCOME</span>
      </div>

      {/* Middle Row */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-3 lg:py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4 lg:space-x-8">
          <button onClick={() => setIsMenuOpen(true)} className="lg:hidden text-brand-dark">
            <Menu size={24} />
          </button>
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="hidden lg:flex items-center space-x-2 cursor-pointer group"
          >
            <Search size={18} className="text-brand-dark group-hover:text-brand-gold transition-colors" />
          </button>
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="#" className="flex items-center space-x-2 text-[12px] tracking-[0.1em] font-medium text-brand-dark hover:text-brand-gold transition-colors cursor-pointer uppercase">
              <MapPin size={14} />
              <span>STORES</span>
            </Link>
            <div className="relative">
              <button 
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                className="flex items-center space-x-1 text-[12px] tracking-[0.1em] font-medium text-brand-dark hover:text-brand-gold transition-colors cursor-pointer uppercase"
              >
                <span>₹ INR</span>
                <ChevronDown size={12} className={`transition-transform duration-300 ${isCurrencyOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isCurrencyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 bg-[#fbf9f9] border border-brand-border shadow-xl py-2 min-w-[100px] z-50"
                  >
                    {['₹ INR', '$ USD', '€ EUR', '£ GBP'].map(curr => (
                      <button 
                        key={curr}
                        onClick={() => setIsCurrencyOpen(false)}
                        className="w-full text-left px-4 py-2 text-[11px] tracking-widest hover:bg-brand-cream transition-colors"
                      >
                        {curr}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Logo */}
        <Link to="/" className="flex flex-col items-center lg:transform lg:-translate-x-1/2 lg:absolute lg:left-1/2">
          <span className="text-sm lg:text-lg font-bold tracking-[0.15em] lg:tracking-[0.2em] text-brand-dark leading-none uppercase">DIVYA PHARMACY™</span>
          <span className="text-[7px] lg:text-[8px] tracking-[0.2em] lg:tracking-[0.3em] text-gray-500 mt-1 uppercase">Authentic Ayurveda</span>
        </Link>

        <div className="flex items-center space-x-4 lg:space-x-8">
          <div className="hidden lg:flex items-center space-x-8 text-[12px] tracking-[0.1em] font-medium text-brand-dark uppercase">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-brand-gold truncate max-w-[100px]">{user.email}</span>
                <button onClick={logout} className="hover:text-brand-gold transition-colors">LOGOUT</button>
              </div>
            ) : (
              <Link to="/login" className="hover:text-brand-gold transition-colors">ACCOUNT</Link>
            )}
            <Link to="#" className="hover:text-brand-gold transition-colors">SOUNDARYA CLUB</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="lg:hidden text-brand-dark">
              <User size={22} />
            </Link>
            <Link to="/checkout" className="relative group">
              <ShoppingBag size={22} className="text-brand-dark group-hover:text-brand-gold transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="relative">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="SEARCH THE WEB STORE..." 
            className="w-full border border-brand-border rounded-md py-2 px-4 text-[12px] tracking-widest focus:outline-none placeholder:text-gray-400"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={18} />
          </button>
        </form>
      </div>

      {/* Bottom Row - Desktop Categories */}
      <div className="hidden lg:block border-t border-brand-border">
        <div className="max-w-[1440px] mx-auto px-6">
          <ul className="flex justify-center items-center space-x-10 py-3">
            {CATEGORIES.map((cat) => (
              <li 
                key={cat}
                onMouseEnter={() => handleMouseEnter(cat)}
                onMouseLeave={handleMouseLeave}
                className="relative"
              >
                <Link 
                  to={`/category/${cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                  className="text-[11px] tracking-[0.15em] font-bold text-brand-dark hover:text-brand-gold transition-colors py-2 block uppercase"
                >
                  {cat === 'NEW ARRIVAL' || cat === 'COMBOS' ? (
                    <span className="relative">
                      {cat}
                      <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-600 text-white text-[8px] px-1.5 py-0.5 rounded uppercase font-bold">NEW</span>
                    </span>
                  ) : cat}
                </Link>

                {/* Mega Menu */}
                <AnimatePresence>
                  {activeMegaMenu === cat && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="fixed left-0 right-0 top-[140px] bg-[#fbf9f9] border-b border-brand-border shadow-2xl z-40 py-12"
                      onMouseEnter={() => handleMouseEnter(cat)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="max-w-[1440px] mx-auto px-12 grid grid-cols-4 gap-12">
                        <div className="col-span-1">
                          <h3 className="text-[12px] tracking-[0.2em] font-bold text-brand-dark mb-6 uppercase">SHOP BY {cat}</h3>
                          <ul className="space-y-4">
                            {PRODUCTS.filter(p => p.category === cat).slice(0, 5).map(p => (
                              <li key={p.handle}>
                                <Link 
                                  to={`/product/${p.handle}`}
                                  className="text-[11px] tracking-[0.1em] text-gray-600 hover:text-brand-gold transition-colors uppercase"
                                >
                                  {p.title}
                                </Link>
                              </li>
                            ))}
                            <li>
                              <Link to="#" className="text-[11px] tracking-[0.1em] text-brand-gold font-bold hover:underline uppercase">VIEW ALL</Link>
                            </li>
                          </ul>
                        </div>
                        <div className="col-span-3 grid grid-cols-3 gap-8">
                          {PRODUCTS.filter(p => p.category === cat).slice(0, 3).map(p => (
                            <Link key={p.handle} to={`/product/${p.handle}`} className="group flex flex-col items-center text-center">
                              <div className="w-full aspect-square bg-brand-cream luxury-border mb-4 overflow-hidden">
                                <img 
                                  src={p.image} 
                                  alt={p.title} 
                                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <h4 className="text-[11px] tracking-[0.1em] font-bold text-brand-dark group-hover:text-brand-gold transition-colors uppercase">{p.title}</h4>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-[60]"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-full max-w-xs bg-[#fbf9f9] z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-brand-border flex justify-between items-center">
                <span className="text-lg font-bold tracking-[0.2em]">MENU</span>
                <button onClick={() => setIsMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <div className="flex-grow overflow-y-auto p-6">
                <div className="flex flex-col space-y-6">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat}
                      to={`/category/${cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-sm tracking-[0.2em] font-bold border-b border-brand-border pb-4 flex justify-between items-center uppercase"
                    >
                      {cat}
                      <ChevronDown size={14} className="-rotate-90" />
                    </Link>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-brand-cream border-t border-brand-border space-y-4">
                <Link to="/login" className="block text-[12px] tracking-[0.2em] font-bold uppercase">MY ACCOUNT</Link>
                <Link to="#" className="block text-[12px] tracking-[0.2em] font-bold uppercase">STORES</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#fbf9f9] flex flex-col"
          >
            <div className="max-w-[1440px] mx-auto w-full px-6 py-8 flex flex-col h-full">
              <div className="flex justify-between items-center mb-12">
                <span className="text-[12px] tracking-[0.3em] font-bold">SEARCH</span>
                <button onClick={() => setIsSearchOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSearch} className="relative border-b border-brand-dark pb-4">
                <input 
                  autoFocus
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH THE WEB STORE..." 
                  className="w-full text-2xl lg:text-4xl font-light tracking-widest focus:outline-none placeholder:text-gray-300 uppercase"
                />
                <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={32} />
                </button>
              </form>
              <div className="mt-12">
                <h4 className="text-[11px] tracking-[0.2em] font-bold text-gray-400 mb-6 uppercase">Popular Searches</h4>
                <div className="flex flex-wrap gap-4">
                  {['Diabetes Care', 'Respiratory', 'Digestive', 'Pooja Essentials'].map(term => (
                    <button 
                      key={term} 
                      onClick={() => {
                        setSearchQuery(term);
                        navigate(`/search?q=${encodeURIComponent(term)}`);
                        setIsSearchOpen(false);
                      }}
                      className="px-6 py-2 border border-gray-200 rounded-full text-[11px] tracking-widest hover:border-brand-gold hover:text-brand-gold transition-colors uppercase"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
