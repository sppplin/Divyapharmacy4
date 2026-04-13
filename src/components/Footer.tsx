import { Instagram, Facebook, Twitter, Youtube, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white text-brand-dark pt-20 pb-12 border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* SHOP */}
          <div>
            <h4 className="text-[13px] tracking-[0.2em] font-medium mb-10 uppercase text-gray-900">SHOP</h4>
            <ul className="space-y-4 text-[11px] tracking-[0.1em] text-gray-600 font-medium uppercase">
              <li><Link to="#" className="hover:text-brand-gold transition-colors">MAKEUP</Link></li>
              <li><Link to="#" className="hover:text-brand-gold transition-colors">FACIAL CARE</Link></li>
              <li><Link to="#" className="hover:text-brand-gold transition-colors">BODY CARE</Link></li>
              <li><Link to="#" className="hover:text-brand-gold transition-colors">HAIR CARE</Link></li>
              <li><Link to="#" className="hover:text-brand-gold transition-colors">MEN'S CARE</Link></li>
              <li><Link to="#" className="hover:text-brand-gold transition-colors">MOTHER & BABY CARE</Link></li>
              <li><Link to="#" className="hover:text-brand-gold transition-colors">WELLNESS</Link></li>
              <li><Link to="#" className="hover:text-brand-gold transition-colors">GIFTING</Link></li>
            </ul>
          </div>

          {/* ABOUT */}
          <div>
            <h4 className="text-[13px] tracking-[0.2em] font-medium mb-10 uppercase text-gray-900">ABOUT</h4>
            <ul className="space-y-4 text-[11px] tracking-[0.1em] text-gray-600 font-medium uppercase">
              <li><Link to="#" className="hover:text-brand-gold transition-colors">OUR PHILOSOPHY</Link></li>
              <li><Link to="#" className="hover:text-brand-gold transition-colors">SOCIAL RESPONSIBILITY</Link></li>
              <li><Link to="#" className="hover:text-brand-gold transition-colors">MEDIA & PRESS</Link></li>
              <li><Link to="#" className="hover:text-brand-gold transition-colors">POLICIES</Link></li>
              <li><Link to="#" className="hover:text-brand-gold transition-colors">TERMS</Link></li>
              <li><Link to="#" className="hover:text-brand-gold transition-colors">FAQS</Link></li>
              <li><Link to="#" className="hover:text-brand-gold transition-colors">SOUNDARYA CLUB FAQS</Link></li>
              <li><Link to="#" className="hover:text-brand-gold transition-colors">STORES</Link></li>
              <li>
                <Link to="#" className="hover:text-brand-gold transition-colors flex items-center space-x-2">
                  <span>CAREERS</span>
                  <span className="bg-blue-50 text-blue-600 text-[9px] px-2 py-0.5 rounded-full normal-case">We're Hiring!</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-[13px] tracking-[0.2em] font-medium mb-10 uppercase text-gray-900">QUICK LINKS</h4>
            <ul className="space-y-4 text-[11px] tracking-[0.1em] text-gray-600 font-medium uppercase">
              <li><Link to="/login" className="hover:text-brand-gold transition-colors">MY ACCOUNT</Link></li>
              <li><Link to="#" className="hover:text-brand-gold transition-colors">SOUNDARYA CLUB SIGN IN</Link></li>
              <li><Link to="#" className="hover:text-brand-gold transition-colors">CURRENT OFFERS</Link></li>
              <li><Link to="#" className="hover:text-brand-gold transition-colors">CUSTOMISED SKINCARE</Link></li>
              <li><Link to="#" className="hover:text-brand-gold transition-colors">BLOG</Link></li>
              <li><Link to="#" className="hover:text-brand-gold transition-colors">MY ORDER(S)</Link></li>
              <li><Link to="#" className="hover:text-brand-gold transition-colors">TRACK MY ORDER</Link></li>
              <li><Link to="#" className="hover:text-brand-gold transition-colors">OUR INGREDIENTS</Link></li>
              <li><Link to="#" className="hover:text-brand-gold transition-colors">DIVYA PHARMACY UK</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-[13px] tracking-[0.2em] font-medium mb-10 uppercase text-gray-900">CONTACT</h4>
            <div className="space-y-6 text-[11px] tracking-[0.1em] text-gray-600 font-medium">
              <div>
                <p className="text-gray-400 mb-1 normal-case">Email:</p>
                <a href="mailto:service@divyapharmacy.com" className="hover:text-brand-gold transition-colors border-b border-gray-300 pb-0.5">service@divyapharmacy.com</a>
              </div>
              <div>
                <p className="text-gray-400 mb-1 normal-case">Phone:</p>
                <a href="tel:+918010200666" className="hover:text-brand-gold transition-colors border-b border-gray-300 pb-0.5">+91-8010200666</a>
              </div>
              <div>
                <Link to="#" className="hover:text-brand-gold transition-colors border-b border-gray-300 pb-0.5 uppercase">Contact Us</Link>
              </div>

              <div className="pt-8">
                <h4 className="text-[13px] tracking-[0.2em] font-medium mb-6 uppercase text-gray-900">FOLLOW</h4>
                <div className="flex space-x-4 text-gray-400">
                  <Instagram size={20} className="cursor-pointer hover:text-brand-gold transition-colors" />
                  <Facebook size={20} className="cursor-pointer hover:text-brand-gold transition-colors" />
                  <Youtube size={20} className="cursor-pointer hover:text-brand-gold transition-colors" />
                  <Twitter size={20} className="cursor-pointer hover:text-brand-gold transition-colors" />
                  <Linkedin size={20} className="cursor-pointer hover:text-brand-gold transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-12 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="flex flex-col space-y-4 items-center md:items-start">
            <span className="text-[10px] tracking-[0.2em] font-bold text-gray-900 uppercase">PAYMENT METHODS</span>
            <img 
              src="https://img.forestessentialsindia.com/pub/media/payment-method-new.png" 
              alt="Payment Methods" 
              className="h-6 w-auto grayscale opacity-80"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-[11px] tracking-[0.1em] text-gray-500 font-medium">
            ©Divya Pharmacy
          </div>
        </div>
      </div>
    </footer>
  );
}
