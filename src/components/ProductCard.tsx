import { Product } from '../types';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Heart, Star, ChevronDown } from 'lucide-react';
import { useStore } from '../StoreContext';

interface ProductCardProps {
  product: Product;
  key?: string | number;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useStore();
  const hasOptions = product.options && product.options.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col w-full transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square mb-5 bg-[#F2F2F2] overflow-hidden">
        <Link to={`/product/${product.handle}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
            referrerPolicy="no-referrer"
          />
        </Link>
        
        {/* Wishlist Icon */}
        <button className="absolute bottom-4 right-4 p-1.5 bg-transparent text-brand-dark hover:text-brand-gold transition-colors">
          <Heart size={20} />
        </button>

        {/* Badges */}
        {product.tags?.includes('best seller') && (
          <div className="absolute top-0 left-0 bg-[#4A4A4A] text-white text-[10px] tracking-[0.1em] px-3 py-1.5 font-bold uppercase">
            BEST SELLER
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col space-y-2 text-left px-1">
        <Link to={`/product/${product.handle}`}>
          <h3 className="text-[13px] tracking-[0.05em] font-bold text-brand-dark line-clamp-1 hover:text-brand-gold transition-colors uppercase">
            {product.title}
          </h3>
        </Link>
        
        <p className="text-[12px] text-gray-500 line-clamp-1">
          {product.description}
        </p>

        <span className="text-[12px] text-gray-500">
          {hasOptions ? '2 Sizes Available' : '200 g'}
        </span>

        <div className="flex items-center space-x-2">
          <span className="text-[15px] font-bold text-brand-dark">
            ₹{product.price.toLocaleString()}.00
          </span>
        </div>

        {/* Ratings */}
        <div className="flex items-center space-x-1.5 py-1">
          <div className="flex text-gray-300">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < 4 ? "#C5A059" : "none"} className={i < 4 ? "text-brand-gold" : "text-gray-300"} />
            ))}
          </div>
          <span className="text-[11px] text-gray-400">(258)</span>
        </div>
      </div>
      
      {/* Action Button */}
      <div className="mt-5 px-1">
        {hasOptions ? (
          <Link 
            to={`/product/${product.handle}`}
            className="w-full h-12 border border-brand-dark text-[12px] tracking-[0.1em] font-medium flex items-center justify-center space-x-2 hover:bg-brand-dark hover:text-white transition-all uppercase"
          >
            <span>SELECT SIZE</span>
            <ChevronDown size={16} />
          </Link>
        ) : (
          <button 
            onClick={() => addToCart(product, 1)}
            className="w-full h-12 border border-brand-dark text-[12px] tracking-[0.1em] font-medium flex items-center justify-center hover:bg-brand-dark hover:text-white transition-all uppercase"
          >
            Add to Bag
          </button>
        )}
      </div>
    </motion.div>
  );
}
