import { useEffect, useState } from "react";
import { getMyOrders } from "../../api/orderApi";
import { FiPackage, FiClock, FiCheckCircle, FiActivity, FiArrowUpRight, FiRefreshCw } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getMyOrders();
      setOrders(res.data || []);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusInfo = (status) => {
    switch (status) {
      case "Preparing": 
        return { 
          badgeClass: "text-amber-300 bg-amber-500/15 border-amber-500/30", 
          dotClass: "bg-amber-400 animate-ping",
          icon: <FiActivity />, 
          text: "Kitchen Preparing" 
        };
      case "Ready": 
        return { 
          badgeClass: "text-emerald-300 bg-emerald-500/15 border-emerald-500/30 shadow-sm", 
          dotClass: "bg-emerald-400 animate-pulse",
          icon: <FiPackage />, 
          text: "Ready for Pickup!" 
        };
      case "Completed": 
        return { 
          badgeClass: "text-slate-400 bg-white/5 border-white/10", 
          dotClass: "bg-slate-400",
          icon: <FiCheckCircle />, 
          text: "Delivered & Closed" 
        };
      default: 
        return { 
          badgeClass: "text-brand-300 bg-brand-500/15 border-brand-500/30", 
          dotClass: "bg-brand-400",
          icon: <FiClock />, 
          text: "Order Received" 
        };
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header with quick refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-brand-500/15 text-brand-400 flex items-center justify-center text-xl">
              <FiClock />
            </span>
            Active Orders & History
          </h1>
          <p className="text-slate-400 text-sm mt-1">Live tracking of your campus canteen orders</p>
        </div>

        <button 
          onClick={fetchOrders}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono uppercase tracking-wider text-slate-300 transition-colors"
        >
          <FiRefreshCw className={loading ? "animate-spin" : ""} /> Refresh Status
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-40 bg-dark-850/60 border border-white/5 animate-pulse rounded-3xl" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 px-4 bg-dark-850/40 border border-dashed border-white/10 rounded-3xl">
          <div className="w-16 h-16 rounded-full bg-white/5 text-slate-400 flex items-center justify-center text-2xl mx-auto mb-4">
            <FiPackage />
          </div>
          <h3 className="text-xl font-display font-bold text-white mb-2">No orders yet</h3>
          <p className="text-slate-400 text-sm max-w-sm mx-auto mb-6">
            Whenever you order delicious snacks from FlashEats, your live ticket and history will appear right here.
          </p>
          <Link
            to="/student/menu"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-500 to-amber-600 text-dark-950 font-bold px-6 py-2.5 rounded-xl text-sm shadow-glow-sm"
          >
            Order Now <FiArrowUpRight />
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order, idx) => {
            const status = getStatusInfo(order.status);
            return (
              <motion.div 
                key={order._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-dark-850/80 hover:bg-dark-800/80 border border-white/10 hover:border-brand-500/30 rounded-3xl p-5 sm:p-7 shadow-lg transition-all duration-300"
              >
                {/* Order Top Bar */}
                <div className="flex flex-wrap justify-between items-start gap-4 mb-5 pb-4 border-b border-white/5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] uppercase text-brand-400/80 font-mono font-bold tracking-widest">
                        TOKEN
                      </span>
                      <span className="text-sm font-mono font-bold text-white bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                        #{order._id.slice(-6).toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 font-mono">
                      {new Date(order.createdAt).toLocaleDateString()} • {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-bold text-xs border ${status.badgeClass}`}>
                    <span className={`w-2 h-2 rounded-full ${status.dotClass}`} />
                    {status.icon}
                    <span>{status.text}</span>
                  </div>
                </div>

                {/* Items Ordered */}
                <div className="space-y-2.5 mb-5">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <span className="text-slate-300 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-white/5 border border-white/10 text-brand-400 font-mono font-bold text-xs flex items-center justify-center">
                          {item.quantity}
                        </span>
                        <span className="font-medium">{item.name}</span>
                      </span>
                      <span className="text-slate-400 font-mono text-xs">
                        ₹{(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Order Footer Total */}
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <span className="text-xs text-slate-500 font-mono uppercase tracking-wider">
                    Total Settled
                  </span>
                  <div className="text-right">
                    <span className="text-2xl font-display font-black text-white">
                      ₹{order.totalAmount}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
