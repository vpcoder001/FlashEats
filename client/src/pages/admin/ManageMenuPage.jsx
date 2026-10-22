import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { FiPlus, FiTrash2, FiBox, FiDollarSign, FiImage, FiGrid, FiSliders } from "react-icons/fi";
import { motion } from "framer-motion";

const categories = ["All", "Snacks", "Meals", "Drinks", "Desserts"];

function ManageMenuPage() {
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [form, setForm] = useState({ name: "", price: "", image: "", category: "Snacks" });
  const [loading, setLoading] = useState(false);

  const fetchMenu = async () => {
    try {
      const res = await api.get("/api/menu");
      setMenu(res.data || []);
    } catch (err) {
      toast.error("Failed to fetch menu");
    }
  };

  useEffect(() => { fetchMenu(); }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price) {
      return toast.error("Name and Price are required");
    }

    try {
      setLoading(true);
      await api.post("/api/menu", form);
      toast.success("Item launched to menu! 🚀", {
        style: {
          background: '#0f1523',
          color: '#fef3c7',
          border: '1px solid rgba(245, 158, 11, 0.3)',
        },
      });
      setForm({ name: "", price: "", image: "", category: "Snacks" });
      fetchMenu();
    } catch (err) {
      toast.error("Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name || 'this item'}" from the menu?`)) return;

    try {
      await api.delete(`/api/menu/${id}`);
      toast.success("Item removed from canteen menu");
      fetchMenu();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const filteredItems = menu.filter((i) => selectedCategory === "All" || i.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white">
            Menu <span className="text-coral-400">Inventory</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Real-time kitchen catalogue & pricing controller
          </p>
        </div>
        <div className="bg-dark-850 px-4 py-2 rounded-xl border border-white/10 text-xs font-mono text-slate-400 self-start sm:self-auto">
          TOTAL ITEMS: <span className="text-coral-400 font-bold">{menu.length}</span>
        </div>
      </header>

      {/* 🍲 Add New Item Form */}
      <section className="bg-dark-850/80 border border-white/10 p-6 sm:p-8 rounded-[2rem] shadow-xl relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-coral-500/10 blur-[90px] rounded-full pointer-events-none" />

        <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2.5 text-white">
          <span className="w-8 h-8 rounded-lg bg-coral-500/15 text-coral-400 flex items-center justify-center text-sm">
            <FiPlus />
          </span>
          Create New Delicacy
        </h2>

        <form onSubmit={handleAddItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Item Title
            </label>
            <div className="relative">
              <FiBox className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Samosa Chaat"
                className="w-full bg-dark-950/80 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-600 outline-none focus:border-coral-500/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Price (₹)
            </label>
            <div className="relative">
              <FiDollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="40"
                className="w-full bg-dark-950/80 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-600 outline-none focus:border-coral-500/50 transition-all font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Photo URL
            </label>
            <div className="relative">
              <FiImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://..."
                className="w-full bg-dark-950/80 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-600 outline-none focus:border-coral-500/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Department
            </label>
            <div className="relative">
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-dark-950/80 border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-coral-500/50 transition-all cursor-pointer"
              >
                <option value="Snacks">Snacks</option>
                <option value="Meals">Meals</option>
                <option value="Drinks">Drinks</option>
                <option value="Desserts">Desserts</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="sm:col-span-2 lg:col-span-4 bg-gradient-to-r from-coral-500 via-rose-500 to-amber-500 hover:from-coral-400 hover:to-amber-400 text-white font-display font-bold py-3.5 px-6 rounded-xl transition-all shadow-glow-coral active:scale-[0.99] disabled:opacity-50 text-sm mt-2"
          >
            {loading ? "Registering Item..." : "Publish Item to Live Menu"}
          </button>
        </form>
      </section>

      {/* Categories Filter Tabs */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-coral-500 text-white border-coral-400 shadow-glow-coral"
                : "bg-dark-850/60 border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <motion.div
            key={item._id}
            layout
            className="group bg-dark-850/70 border border-white/5 p-4 rounded-3xl hover:border-coral-500/30 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 rounded-2xl overflow-hidden mb-4 bg-dark-950">
                <img
                  src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600"}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600";
                  }}
                />
                <span className="absolute top-3 left-3 bg-dark-950/80 backdrop-blur-md text-coral-300 text-[10px] font-mono uppercase font-bold px-3 py-1 rounded-full border border-coral-500/20">
                  {item.category}
                </span>
              </div>

              <div className="flex justify-between items-center mb-4 px-1">
                <h3 className="font-display font-bold text-white text-base truncate">{item.name}</h3>
                <span className="text-amber-400 font-mono font-bold text-lg">₹{item.price}</span>
              </div>
            </div>

            <button
              onClick={() => handleDelete(item._id, item.name)}
              className="w-full bg-coral-500/10 hover:bg-coral-500 text-coral-400 hover:text-white py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-xs font-bold border border-coral-500/20 mt-2"
            >
              <FiTrash2 size={14} /> Remove Delicacy
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ManageMenuPage;
