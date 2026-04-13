import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS } from './constants';
import ProductCard from './components/ProductCard';
import { motion } from 'motion/react';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  const results = PRODUCTS.filter(p => 
    p.title.toLowerCase().includes(query) || 
    p.description.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query)
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white flex flex-col"
    >
      <main className="flex-grow max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="mb-12">
          <h1 className="text-2xl lg:text-3xl tracking-[0.1em] font-light text-brand-dark mb-4 uppercase">
            Search Results for: <span className="font-bold">"{query}"</span>
          </h1>
          <p className="text-gray-500 text-sm">
            {results.length} products found
          </p>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-10 sm:gap-y-12">
            {results.map((product) => (
              <ProductCard key={product.handle} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-brand-cream/30 luxury-border">
            <p className="text-lg text-gray-500 mb-8">No products found matching your search.</p>
            <Link 
              to="/" 
              className="inline-block px-8 py-3 bg-brand-dark text-white text-[11px] tracking-[0.2em] font-medium uppercase hover:bg-brand-gold transition-colors"
            >
              Back to Home
            </Link>
          </div>
        )}
      </main>
    </motion.div>
  );
}
