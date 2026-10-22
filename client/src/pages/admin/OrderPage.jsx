import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { FiClock, FiUser, FiHash, FiRefreshCw, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/orders");
      setOrders([...res.data].reverse());
    } catch (err) {
      toast.error("Sync Error with Kitchen Database");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 15000); // Poll every 15s for new orders
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/api/orders/${id}`, { status });
      toast.success(`Order #${id.slice(-6).toUpperCase()} marked ${status}`, {
        style: {
          background: '#0f1523',
          color: '#fef3c7',
          border: '1px solid rgba(244, 63, 94, 0.3)',
        },
      });
      fetchOrders();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white">
            Kitchen <span className="text-coral-400">Pipeline</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Live incoming food queue & order preparation board</p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button 
            onClick={fetchOrders}
            className="flex items-center gap-2 px-3.5 py-2 bg-dark-850 hover:bg-dark-800 border border-white/10 rounded-xl text-xs font-mono text-slate-300"
          >
            <FiRefreshCw className={loading ? "animate-spin" : ""} /> Sync
          </button>
          <span className="flex items-center gap-1.5 bg-coral-500/10 text-coral-400 text-xs font-mono font-bold px-3 py-2 rounded-xl border border-coral-500/20">
            <span className="w-2 h-2 rounded-full bg-coral-500 animate-ping" />
            {orders.filter(o => o.status !== "Completed").length} PENDING
          </span>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid gap-5">
        {orders.length === 0 ? (
          <div className="bg-dark-850/50 border border-dashed border-white/10 rounded-3xl p-14 text-center text-slate-400">
            No incoming tickets right now. Waiting for students to order...
          </div>
        ) : (
          orders.map((order) => (
            <motion.div
              key={order._id}
              layout
              className="bg-dark-850/80 border border-white/10 rounded-3xl overflow-hidden hover:border-coral-500/30 transition-all shadow-lg"
            >
              <div className="p-5 sm:p-7 flex flex-col md:flex-row justify-between gap-6">
                {/* User & Items info */}
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-gradient-to-br from-coral-500/20 to-brand-500/20 rounded-2xl flex items-center justify-center text-coral-400 border border-coral-500/20 text-lg">
                      <FiUser />
                    </div>
                    <div>
                      <p className="text-base font-display font-bold text-white">
                        {order.user?.name || "Campus Student"}
                      </p>
                      <p className="text-xs text-slate-500 font-mono">
                        {order.user?.email || "Student ID verified"}
                      </p>
                    </div>
                  </div>

                  <div className="bg-dark-950/60 rounded-2xl p-4 border border-white/5 space-y-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <span className="text-slate-300 font-medium">
                          <span className="text-coral-400 font-mono font-bold mr-2">
                            {item.quantity}x
                          </span>
                          {item.name}
                        </span>
                        <span className="font-mono text-xs text-slate-500">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amount & Pipeline Stages */}
                <div className="flex flex-col md:items-end justify-between border-t md:border-t-0 border-white/5 pt-4 md:pt-0 shrink-0">
                  <div className="md:text-right">
                    <span className="text-[10px] font-mono uppercase text-slate-500 tracking-widest">Ticket Value</span>
                    <p className="text-2xl sm:text-3xl font-display font-black text-white">
                      ₹{order.totalAmount}
                    </p>

                    <div className="mt-1">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider ${
                          order.status === "Completed"
                            ? "bg-slate-800 text-slate-400 border border-slate-700"
                            : order.status === "Ready"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse"
                        }`}
                      >
                        ● {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Stage actions */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {["Placed", "Preparing", "Ready", "Completed"].map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(order._id, s)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-display font-bold transition-all ${
                          order.status === s
                            ? "bg-gradient-to-r from-coral-500 to-brand-500 text-white shadow-glow-coral"
                            : "bg-dark-950/80 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Meta Bar */}
              <div className="bg-dark-950/90 px-6 py-3 border-t border-white/5 flex flex-wrap justify-between items-center text-[11px] font-mono text-slate-500 gap-2">
                <span className="flex items-center gap-1.5">
                  <FiHash /> TOKEN: <span className="text-slate-300 font-bold">{order._id.slice(-8).toUpperCase()}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <FiClock /> PLACED: {new Date(order.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminOrdersPage;
