import { useStore } from '../StoreContext';
import { motion } from 'motion/react';
import { Trash2, ShoppingBag, ArrowLeft, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cart, cartTotal, removeFromCart, updateQuantity, clearCart } = useStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-brand-green text-white rounded-full flex items-center justify-center mb-8"
        >
          <ShieldCheck size={40} />
        </motion.div>
        <h2 className="text-3xl font-light tracking-widest mb-4 uppercase">ORDER PLACED SUCCESSFULLY</h2>
        <p className="text-gray-500 mb-8 max-w-md">Your order has been confirmed and will be shipped shortly. A confirmation email has been sent to you.</p>
        <button 
          onClick={() => navigate('/')}
          className="px-12 py-4 bg-brand-dark text-white text-[12px] tracking-[0.3em] font-bold hover:bg-brand-gold transition-all"
        >
          CONTINUE SHOPPING
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8">
        <ShoppingBag size={64} className="text-gray-200" />
        <h2 className="text-2xl font-light tracking-widest uppercase">YOUR BAG IS EMPTY</h2>
        <Link 
          to="/" 
          className="px-10 py-4 border border-brand-dark text-[11px] tracking-[0.3em] font-bold hover:bg-brand-dark hover:text-white transition-all"
        >
          START SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-cream min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-3xl font-light tracking-widest uppercase">SHOPPING BAG</h1>
          <Link to="/" className="flex items-center space-x-2 text-[11px] tracking-[0.2em] font-bold text-gray-500 hover:text-brand-dark transition-colors uppercase">
            <ArrowLeft size={14} />
            <span>CONTINUE SHOPPING</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <motion.div 
                layout
                key={item.handle}
                className="bg-white luxury-border p-6 flex flex-col sm:flex-row items-center gap-8"
              >
                <div className="w-32 h-32 flex-shrink-0 bg-brand-cream p-4 luxury-border">
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-grow space-y-2 text-center sm:text-left">
                  <span className="text-[10px] tracking-[0.2em] text-brand-gold font-bold uppercase">{item.vendor}</span>
                  <h3 className="text-[14px] font-bold tracking-tight uppercase">{item.title}</h3>
                  <p className="text-[12px] text-gray-500 line-clamp-1">{item.description}</p>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="flex items-center border border-brand-border h-10">
                    <button onClick={() => updateQuantity(item.handle, item.quantity - 1)} className="px-3 hover:bg-gray-50">-</button>
                    <span className="px-4 font-bold text-[12px]">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.handle, item.quantity + 1)} className="px-3 hover:bg-gray-50">+</button>
                  </div>
                  <div className="text-right min-w-[80px]">
                    <p className="text-[14px] font-bold">₹{item.price * item.quantity}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.handle)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white luxury-border p-8 sticky top-40 space-y-8">
              <h2 className="text-[14px] tracking-[0.2em] font-bold uppercase border-b border-brand-border pb-4">ORDER SUMMARY</h2>
              
              <div className="space-y-4 text-[13px] tracking-wide">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-brand-green font-bold">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax</span>
                  <span className="font-bold">₹0</span>
                </div>
                <div className="border-t border-brand-border pt-4 flex justify-between text-lg">
                  <span className="font-light tracking-widest uppercase">TOTAL</span>
                  <span className="font-bold">₹{cartTotal}</span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[11px] text-gray-400 text-center italic">Shipping, taxes, and discounts will be calculated at checkout.</p>
                <button 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full py-5 bg-brand-dark text-white text-[12px] tracking-[0.3em] font-bold hover:bg-brand-gold transition-all disabled:bg-gray-400"
                >
                  {isProcessing ? 'PROCESSING...' : 'PROCEED TO CHECKOUT'}
                </button>
              </div>

              <div className="pt-6 border-t border-brand-border flex items-center justify-center space-x-4 text-gray-400">
                <ShieldCheck size={20} />
                <span className="text-[10px] tracking-widest font-bold uppercase">SECURE CHECKOUT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
