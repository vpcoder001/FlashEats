import { useState, useEffect } from "react";
import MenuCard from "../../components/MenuCard";
import { useCart } from "../../context/CartContext";
import { getMenu } from "../../api/menuApi";
import { motion } from "framer-motion";
import { FiSearch, FiSliders, FiClock, FiZap } from "react-icons/fi";

const categories = ["All", "Snacks", "Drinks", "Meals", "Desserts"];

function MenuPage() {
  const { addToCart } = useCart();
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await getMenu();
        setMenu(res.data || []);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredMenu = menu.filter((item) => {
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = !searchQuery || item.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* 🌟 HERO BANNER / HEADER */}
      <header className="relative rounded-[2rem] overflow-hidden p-6 sm:p-10 bg-gradient-to-br from-dark-850 via-dark-800 to-dark-900 border border-white/10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/15 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-coral-500/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-mono uppercase tracking-wider mb-4">
            <FiZap /> Live Canteen Kitchen • 8-10 Min Prep Time
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white leading-tight mb-3">
            Fresh Food, <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-400 via-amber-300 to-coral-400">
              Zero Waiting Lines.
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Order your campus meals right from your desk, track kitchen prep in real-time, and pick up hot food seamlessly.
          </p>
        </div>
      </header>

      {/* 🔍 FILTER & SEARCH BAR (Sticky on scroll) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-dark-850/60 backdrop-blur-xl p-3 sm:p-4 rounded-2xl border border-white/5 sticky top-2 z-20 shadow-lg">
        {/* Horizontal Category Carousel */}
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl transition-all whitespace-nowrap text-xs sm:text-sm font-semibold border ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-brand-500 to-brand-600 border-brand-400 text-dark-950 shadow-glow-sm"
                  : "bg-white/[0.03] border-white/5 text-slate-400 hover:bg-white/[0.08] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
          <input 
            type="text" 
            placeholder="Search items, snacks..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-dark-950/80 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all w-full text-sm text-white placeholder-slate-500"
          />
        </div>
      </div>

      {/* 🍲 MENU ITEMS GRID */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-dark-850 border border-white/5 p-5 rounded-3xl animate-pulse space-y-4">
              <div className="h-44 bg-dark-950/80 rounded-2xl" />
              <div className="h-5 bg-white/10 rounded-md w-3/4" />
              <div className="h-4 bg-white/5 rounded-md w-1/2" />
              <div className="h-10 bg-white/10 rounded-xl" />
            </div>
          ))}
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-6"
        >
          {filteredMenu.length > 0 ? (
            filteredMenu.map((item) => (
              <MenuCard key={item._id} item={item} addToCart={addToCart} />
            ))
          ) : (
            <div className="col-span-full py-20 px-4 text-center bg-dark-850/40 border border-dashed border-white/10 rounded-3xl max-w-md mx-auto">
              <div className="w-16 h-16 bg-brand-500/10 rounded-full flex items-center justify-center text-brand-400 text-2xl mx-auto mb-4">
                <FiSliders />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-1">No items found</h3>
              <p className="text-slate-400 text-sm mb-4">
                We couldn't find anything matching your filter.
              </p>
              <button 
                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                className="text-xs font-bold text-brand-400 underline uppercase tracking-wider"
              >
                Reset Filters
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default MenuPage;