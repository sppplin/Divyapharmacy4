import { motion } from 'motion/react';

const CATEGORIES = [
  'DIABETES CARE',
  'RESPIRATORY',
  'BRAIN & MEMORY',
  'HEART & BP',
  'JOINT CARE',
  'DIGESTIVE',
  'POOJA ESSENTIALS'
];

export default function CategoryPills() {
  return (
    <div className="lg:hidden w-full bg-white border-b border-brand-border py-4 overflow-x-auto no-scrollbar">
      <div className="flex space-x-3 px-4 min-w-max">
        {CATEGORIES.map((cat, i) => (
          <motion.button
            key={cat}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="px-6 py-2 border border-gray-400 rounded-full text-[11px] tracking-widest font-bold text-gray-600 hover:border-brand-dark hover:text-brand-dark transition-colors uppercase"
          >
            {cat}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
