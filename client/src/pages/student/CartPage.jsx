import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../api/orderApi";
import toast from "react-hot-toast";
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function CartPage() {
  const { cart, increaseQty, decreaseQty, removeItem, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const placeOrder = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    try {
      setLoading(true);
      const orderData = {
        items: cart.map(item => ({
          menuItem: item._id,
          name: item.name,
          price: item.price,
          quantity: item.qty
        })),
        totalAmount: total
      };
      await createOrder(orderData);
      clearCart();
      toast.success("Order placed! Redirecting to orders...", {
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
      setTimeout(() => navigate("/student/orders"), 1000);
    } catch (err) {
      toast.error("Order processing failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-brand-500/15 text-brand-400 flex items-center justify-center text-xl">
              <FiShoppingBag />
            </span>
            Your Tray
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Review your delicacies before sending to kitchen.
          </p>
        </div>

        {cart.length > 0 && (
          <button 
            onClick={clearCart}
            className="text-xs font-mono uppercase tracking-wider text-slate-500 hover:text-coral-400 transition-colors"
          >
            Clear Tray
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-850/60 border border-dashed border-white/10 p-10 sm:p-14 rounded-3xl text-center flex flex-col items-center justify-center"
            >
              <div className="w-20 h-20 rounded-3xl bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center text-3xl mb-4">
                🍲
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">Your tray is empty</h3>
              <p className="text-slate-400 text-sm max-w-xs mb-6">
                Looks like you haven't picked any food yet. Browse our freshly cooked menu!
              </p>
              <Link 
                to="/student/menu"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-500 to-amber-600 hover:from-brand-400 hover:to-amber-500 text-dark-950 font-bold px-6 py-3 rounded-xl transition-all shadow-glow-sm"
              >
                Explore Menu <FiArrowRight />
              </Link>
            </motion.div>
          ) : (
            cart.map(item => (
              <motion.div 
                key={item._id} 
                layout
                className="bg-dark-850/80 border border-white/5 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-brand-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-16 h-16 rounded-xl bg-dark-950 border border-white/10 overflow-hidden shrink-0">
                    <img 
                      src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=200"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-base sm:text-lg text-white truncate">{item.name}</h3>
                    <p className="text-brand-400 font-mono font-bold text-sm">₹{item.price}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                  {/* Quantity controls */}
                  <div className="flex items-center gap-3 bg-dark-950/80 border border-white/10 px-3 py-1.5 rounded-xl">
                    <button 
                      onClick={() => decreaseQty(item._id)} 
                      className="p-1 text-slate-400 hover:text-brand-400 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="w-6 text-center font-mono font-bold text-sm text-white">{item.qty}</span>
                    <button 
                      onClick={() => increaseQty(item._id)} 
                      className="p-1 text-slate-400 hover:text-brand-400 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>

                  {/* Subtotal & Delete */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-white text-base min-w-[60px] text-right">
                      ₹{item.price * item.qty}
                    </span>
                    <button 
                      onClick={() => removeItem(item._id)} 
                      className="p-2 text-slate-500 hover:text-coral-400 rounded-lg hover:bg-coral-500/10 transition-colors"
                      aria-label="Remove item"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Order Summary Checkout Card */}
        <div className="bg-gradient-to-b from-dark-850 to-dark-900 border border-white/10 p-6 sm:p-7 rounded-[2rem] h-fit sticky top-24 shadow-2xl space-y-6">
          <div>
            <h2 className="text-xl font-display font-bold text-white">Order Summary</h2>
            <p className="text-xs text-slate-400 mt-0.5">IET Lucknow Canteen Counter #1</p>
          </div>

          <div className="space-y-3 text-sm border-y border-white/5 py-4">
            <div className="flex justify-between text-slate-400">
              <span>Items Total ({cart.reduce((a, b) => a + b.qty, 0)})</span>
              <span className="font-mono text-white">₹{total}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Kitchen Convenience Fee</span>
              <span className="text-emerald-400 font-mono text-xs font-bold">FREE (₹0)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Estimated Pickup</span>
              <span className="text-amber-300 font-mono text-xs font-bold">~8-12 mins</span>
            </div>
          </div>

          <div className="flex justify-between items-baseline pt-1">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">Grand Total</span>
              <p className="text-3xl font-display font-black text-white">₹{total}</p>
            </div>
            <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
              <FiCheckCircle /> Verified
            </span>
          </div>

          <button
            onClick={placeOrder}
            disabled={loading || cart.length === 0}
            className="w-full bg-gradient-to-r from-brand-500 via-amber-500 to-amber-600 hover:from-brand-400 hover:to-amber-500 disabled:opacity-40 disabled:cursor-not-allowed py-4 rounded-xl font-display font-bold text-dark-950 transition-all shadow-glow active:scale-[0.98] text-base"
          >
            {loading ? "Transmitting to Kitchen..." : "Place Order & Pay"}
          </button>

          <p className="text-[11px] text-center text-slate-500 leading-tight">
            Order tokens are generated instantly and displayed in your history tab.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
