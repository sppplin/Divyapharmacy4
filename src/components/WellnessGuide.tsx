import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const BLOGS = [
  {
    id: 1,
    title: "The Ancient Secret to Radiant Skin: Kumkumadi Oil",
    excerpt: "Discover how this 'miraculous elixir' made with 26 precious herbs can transform your nighttime skincare routine...",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1974&auto=format&fit=crop",
    date: "OCTOBER 12, 2023",
    category: "SKINCARE"
  },
  {
    id: 2,
    title: "5 Ayurvedic Herbs to Boost Your Immunity This Winter",
    excerpt: "From Ashwagandha to Giloy, learn about the powerful botanicals that have been used for centuries to strengthen the body...",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop",
    date: "OCTOBER 08, 2023",
    category: "WELLNESS"
  },
  {
    id: 3,
    title: "Understanding Your Dosha: A Beginner's Guide",
    excerpt: "Vata, Pitta, or Kapha? Take our deep dive into the three fundamental energies that govern our physical and mental processes...",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1920&auto=format&fit=crop",
    date: "SEPTEMBER 28, 2023",
    category: "AYURVEDA 101"
  }
];

export default function WellnessGuide() {
  return (
    <section className="py-24 bg-[#F9F8F6]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <span className="text-[11px] tracking-[0.4em] text-brand-gold font-semibold uppercase">
              Knowledge Base
            </span>
            <h2 className="text-[32px] tracking-[0.1em] font-light text-brand-dark uppercase">
              Wellness Guide
            </h2>
          </div>
          <button className="group flex items-center space-x-2 text-[12px] tracking-[0.2em] font-bold text-brand-dark hover:text-brand-gold transition-colors uppercase">
            <span>View All Articles</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {BLOGS.map((blog, i) => (
            <motion.article 
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden mb-6 luxury-border">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[9px] tracking-[0.2em] font-bold text-brand-dark uppercase">
                  {blog.category}
                </div>
              </div>
              <div className="space-y-3">
                <span className="text-[10px] tracking-widest text-gray-400 font-medium">
                  {blog.date}
                </span>
                <h3 className="text-[18px] leading-snug font-light text-brand-dark group-hover:text-brand-gold transition-colors tracking-wide">
                  {blog.title}
                </h3>
                <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2 tracking-wide">
                  {blog.excerpt}
                </p>
                <div className="pt-2">
                  <span className="text-[11px] tracking-[0.2em] font-bold text-brand-dark border-b border-brand-dark/20 pb-1 group-hover:border-brand-gold group-hover:text-brand-gold transition-all uppercase">
                    Read More
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
