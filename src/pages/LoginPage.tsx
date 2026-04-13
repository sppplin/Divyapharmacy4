import { useState, FormEvent } from 'react';
import { useStore } from '../StoreContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
      navigate('/');
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white luxury-border w-full max-w-md p-12 space-y-10"
      >
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-light tracking-widest uppercase">SIGN IN</h1>
          <p className="text-[12px] tracking-widest text-gray-500">Enter your details to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] tracking-[0.2em] font-bold text-brand-dark uppercase">EMAIL ADDRESS</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-brand-cream border border-brand-border px-4 py-4 text-[13px] focus:outline-none focus:border-brand-gold transition-colors"
              placeholder="name@example.com"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] tracking-[0.2em] font-bold text-brand-dark uppercase">PASSWORD</label>
              <Link to="#" className="text-[10px] tracking-widest text-brand-gold hover:underline">FORGOT PASSWORD?</Link>
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-brand-cream border border-brand-border px-4 py-4 text-[13px] focus:outline-none focus:border-brand-gold transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-brand-dark text-white text-[12px] tracking-[0.3em] font-bold hover:bg-brand-gold transition-all flex items-center justify-center space-x-3"
          >
            <span>SIGN IN</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="text-center space-y-6 pt-6 border-t border-brand-border">
          <p className="text-[12px] tracking-widest text-gray-500">Don't have an account?</p>
          <button className="w-full py-5 border border-brand-dark text-[12px] tracking-[0.3em] font-bold hover:bg-brand-dark hover:text-white transition-all">
            CREATE ACCOUNT
          </button>
        </div>

        <div className="flex items-center justify-center space-x-3 text-gray-400">
          <ShieldCheck size={18} />
          <span className="text-[9px] tracking-[0.2em] font-bold uppercase">SECURE & ENCRYPTED</span>
        </div>
      </motion.div>
    </div>
  );
}
