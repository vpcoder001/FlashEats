import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiPlus, FiCheck } from "react-icons/fi";
import { useState } from "react";

function MenuCard({ item, addToCart }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(item);
    setAdded(true);
    toast.success(`${item.name} added to cart`, {
      style: {
        background: '#0f1523',
        color: '#fef3c7',
        border: '1px solid rgba(245, 158, 11, 0.3)',
      },
      iconTheme: {
        primary: '#f59e0b',
        secondary: '#070a0f',
      },
    });
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group bg-dark-850/80 hover:bg-dark-800/90 border border-white/5 hover:border-brand-500/30 rounded-3xl p-4 sm:p-5 shadow-lg hover:shadow-glow-sm transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Item Image with Category Tag */}
        <div className="relative rounded-2xl overflow-hidden mb-4 bg-dark-950 aspect-[4/3] w-full">
          <img
            src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600"}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent opacity-60" />
          
          {item.category && (
            <span className="absolute top-3 left-3 bg-dark-950/80 backdrop-blur-md text-amber-300 text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-amber-500/20">
              {item.category}
            </span>
          )}

          <div className="absolute bottom-3 right-3 bg-dark-950/90 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 font-display font-black text-white text-base">
            ₹{item.price}
          </div>
        </div>

        {/* Title and details */}
        <div className="mb-4">
          <h2 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-brand-300 transition-colors line-clamp-1">
            {item.name}
          </h2>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2">
            Freshly prepared on-campus delicacy. Fast service guaranteed.
          </p>
        </div>
      </div>

      {/* Action button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleAdd}
        className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
          added 
            ? "bg-emerald-500 text-dark-950 shadow-emerald-500/20" 
            : "bg-gradient-to-r from-brand-500 to-amber-600 hover:from-brand-400 hover:to-amber-500 text-dark-950 shadow-brand-500/20"
        }`}
      >
        {added ? (
          <>
            <FiCheck className="text-base" /> Added!
          </>
        ) : (
          <>
            <FiPlus className="text-base" /> Add to Order
          </>
        )}
      </motion.button>
    </motion.div>
  );
}

export default MenuCard;