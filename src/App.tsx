import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ChatButton from './components/ChatButton';
import ProductGrid from './components/ProductGrid';
import PoojaEssentials from './components/PoojaEssentials';
import TrustedTales from './components/TrustedTales';
import CategoryCircles from './components/CategoryCircles';
import WellnessGuide from './components/WellnessGuide';
import Footer from './components/Footer';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import SearchResults from './SearchResults';
import PromoPopup from './components/PromoPopup';
import { StoreProvider } from './StoreContext';
import { motion, AnimatePresence } from 'motion/react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      
      <div className="md:hidden">
        <CategoryCircles />
      </div>

      {/* Philosophy Section */}
      <section className="py-12 md:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="text-[11px] tracking-[0.4em] text-brand-gold font-semibold uppercase">
              Our Philosophy
            </span>
            <h2 className="text-xl md:text-4xl font-light tracking-[0.1em] text-brand-dark leading-relaxed">
              "Ayurveda is not just a system of medicine; it is a way of life that brings harmony between the body, mind, and soul."
            </h2>
            <div className="w-16 h-[1px] bg-brand-gold mx-auto" />
            <p className="text-[14px] text-gray-500 max-w-2xl mx-auto leading-loose tracking-wide">
              We believe in the power of nature to heal and rejuvenate. Every product is a testament to the ancient Vedic wisdom, 
              meticulously crafted with the purest botanicals and traditional methods to bring you the ultimate luxury in wellness.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="hidden md:block">
        <CategoryCircles />
      </div>

      {/* Featured Categories */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'DIABETES CARE', img: 'https://static.wixstatic.com/media/7fa905_7cb8ed2806a74428bbd4f10200968bee~mv2.jpg' },
            { title: 'HEART & BP', img: 'https://static.wixstatic.com/media/7fa905_9b73fa7de1e44db7b9d121b5e9f6f110~mv2.jpg' },
            { title: 'DIGESTIVE', img: 'https://static.wixstatic.com/media/7fa905_e3cd3b37178a40f28c6a44d08bfaf77b~mv2.jpg' },
          ].map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group cursor-pointer overflow-hidden aspect-[3/4]"
            >
              <img 
                src={cat.img} 
                alt={cat.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <h3 className="text-white text-[14px] tracking-[0.4em] font-medium border-b border-white/50 pb-2">
                  {cat.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <ProductGrid />

      {/* Inspired by Ayurveda Video Section */}
      <section className="relative h-[600px] w-full flex items-center justify-center overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://video.wixstatic.com/video/7fa905_bba61bd3dcb344ba83743232824c277c/1080p/mp4/file.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative z-10 text-center text-white px-4 max-w-3xl space-y-6">
          <span className="text-[12px] tracking-[0.5em] font-medium uppercase">
            NOURISHED BY NATURE
          </span>
          <h2 className="text-4xl md:text-5xl font-serif italic tracking-wide">
            Inspired by Ayurveda
          </h2>
          <p className="text-[15px] md:text-[17px] leading-relaxed tracking-wide font-light">
            We combine the wisdom of Ayurveda with pure, natural ingredients to craft 
            health & beauty products that nurture you—inside & out.
          </p>
          <div className="pt-4">
            <button className="bg-white text-brand-dark px-8 py-3 rounded-full text-[12px] tracking-[0.2em] font-bold hover:bg-brand-gold hover:text-white transition-all uppercase">
              DISCOVER OUR BESTSELLERS
            </button>
          </div>
        </div>
      </section>

      <PoojaEssentials />

      <TrustedTales />

      <WellnessGuide />

      {/* Newsletter / CTA Section */}
      <section className="py-24 bg-brand-green text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl font-light tracking-[0.2em]">JOIN OUR WORLD</h2>
          <p className="text-[13px] tracking-widest text-gray-300">
            Sign up for exclusive access to new launches, Ayurvedic tips, and special offers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="YOUR EMAIL ADDRESS" 
              className="w-full bg-transparent border border-white/30 px-6 py-4 text-[12px] tracking-widest focus:outline-none focus:border-white transition-colors"
            />
            <button className="w-full sm:w-auto px-10 py-4 bg-white text-brand-dark text-[12px] tracking-[0.3em] font-bold hover:bg-brand-gold hover:text-white transition-all">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <PromoPopup />
          <ChatButton />
          
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:handle" element={<ProductPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/search" element={<SearchResults />} />
              </Routes>
            </AnimatePresence>
          </main>

          <Footer />
        </div>
      </Router>
    </StoreProvider>
  );
}
