import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const CATEGORY_DATA = [
  { name: 'DIABETES CARE', img: 'https://static.wixstatic.com/media/7fa905_7cb8ed2806a74428bbd4f10200968bee~mv2.jpg' },
  { name: 'RESPIRATORY', img: 'https://www.cornerstoneuc.com/wp-content/uploads/sites/522/2024/03/Asthma-Patient.jpg' },
  { name: 'BRAIN & MEMORY', img: 'https://frontiermgmt.com/wp-content/uploads/2024/04/iStock-1367834825.jpg' },
  { name: 'HEART & BP', img: 'https://static.wixstatic.com/media/7fa905_9b73fa7de1e44db7b9d121b5e9f6f110~mv2.jpg' },
  { name: 'JOINT CARE', img: 'https://nutraceuticalbusinessreview.com/article-image-alias/bone-and-joint-health-ingredients-for.jpg' },
  { name: 'DIGESTIVE', img: 'https://static.wixstatic.com/media/7fa905_e3cd3b37178a40f28c6a44d08bfaf77b~mv2.jpg' },
];

export default function CategoryCircles() {
  return (
    <section className="pt-8 pb-4 md:pt-12 md:pb-8 bg-white overflow-hidden border-b border-gray-50">
      <div className="max-w-[1600px] mx-auto px-4 relative group">
        <div 
          className="grid grid-cols-3 md:flex md:flex-wrap gap-4 md:gap-10 lg:gap-16 pb-4 justify-items-center md:justify-center"
        >
          {CATEGORY_DATA.map((cat, i) => (
            <Link 
              key={cat.name}
              to={`/search?q=${encodeURIComponent(cat.name.toLowerCase())}`}
              className="flex flex-col items-center space-y-3 w-full md:w-auto md:min-w-[140px] group"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 border-brand-cream group-hover:border-brand-gold transition-all duration-500 shadow-sm relative"
              >
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-dark/5 group-hover:bg-transparent transition-colors duration-300" />
              </motion.div>
              <span className="text-[8px] md:text-[10px] lg:text-[11px] tracking-[0.15em] font-bold text-brand-dark text-center uppercase leading-tight max-w-[80px] md:max-w-[120px]">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
