import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiGrid, 
  FiShoppingCart, 
  FiClock, 
  FiLogOut, 
  FiUser, 
  FiZap,
  FiMenu,
  FiX
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [userName, setUserName] = useState("Student User");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setUserName(user.name || user.fullName || "Student User");
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out safely");
    navigate("/login");
  };

  const cartCount = cart?.reduce((acc, item) => acc + (item.qty || 0), 0) || 0;

  const navItems = [
    { name: "Explore Menu", path: "/student/menu", icon: <FiGrid className="text-lg" /> },
    { 
      name: "My Cart", 
      path: "/student/cart", 
      icon: <FiShoppingCart className="text-lg" />,
      badge: cartCount > 0 ? cartCount : null
    },
    { name: "Order History", path: "/student/orders", icon: <FiClock className="text-lg" /> },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-6">
      <div>
        {/* Brand Header */}
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-500/25 text-dark-950 font-black">
              <FiZap className="text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-display font-black tracking-tight text-white flex items-center gap-1">
                FLASH<span className="text-brand-400">EATS</span>
              </h1>
              <p className="text-[10px] text-amber-300/60 font-mono uppercase tracking-[0.2em] leading-none mt-0.5">
                Campus Express
              </p>
            </div>
          </div>
          {/* Close button for mobile */}
          <button 
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-gray-400 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `
                relative flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group font-medium text-sm
                ${isActive 
                  ? "bg-gradient-to-r from-brand-500/20 to-brand-500/5 text-brand-300 border border-brand-500/30 shadow-glow-sm" 
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3.5">
                    <span className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-brand-400" : "text-slate-400 group-hover:text-brand-300"}`}>
                      {item.icon}
                    </span>
                    <span className="tracking-wide">
                      {item.name}
                    </span>
                  </div>

                  {item.badge !== null && item.badge !== undefined && (
                    <span className="bg-gradient-to-r from-brand-500 to-brand-600 text-dark-950 text-xs font-black px-2 py-0.5 rounded-full shadow-sm">
                      {item.badge}
                    </span>
                  )}

                  {isActive && (
                    <motion.div 
                      layoutId="activeGlowStudent"
                      className="absolute left-0 top-2 bottom-2 w-1 bg-brand-400 rounded-r-full"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* User profile & Logout */}
      <div className="space-y-3 pt-6 border-t border-white/5">
        <div className="bg-dark-850/90 border border-white/5 rounded-2xl p-3.5 flex items-center gap-3 shadow-inner">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 to-amber-600 flex items-center justify-center text-dark-950 font-bold shrink-0 shadow-md">
            <FiUser className="text-lg" />
          </div>
          <div className="overflow-hidden min-w-0">
            <p className="text-sm font-bold text-white truncate">
              {userName}
            </p>
            <p className="text-[11px] text-brand-400/80 font-mono tracking-tight truncate flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span> Student Hub
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-slate-400 hover:text-coral-400 hover:bg-coral-500/10 border border-transparent hover:border-coral-500/20 transition-all duration-300 group text-sm font-semibold"
        >
          <FiLogOut className="text-base group-hover:-translate-x-1 transition-transform" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* 📱 Mobile Top Bar with Hamburger */}
      <header className="md:hidden sticky top-0 z-40 bg-dark-900/90 backdrop-blur-xl border-b border-white/10 px-4 py-3.5 flex items-center justify-between w-full">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl flex items-center justify-center text-dark-950 font-black shadow-md shadow-brand-500/20">
            <FiZap className="text-lg" />
          </div>
          <span className="font-display font-black text-lg text-white">
            FLASH<span className="text-brand-400">EATS</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {cartCount > 0 && (
            <NavLink 
              to="/student/cart" 
              className="relative p-2 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-300"
            >
              <FiShoppingCart className="text-lg" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-500 text-dark-950 font-black text-[10px] rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </NavLink>
          )}

          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-slate-300 hover:text-white rounded-xl bg-white/5 border border-white/10 transition-colors"
            aria-label="Open navigation menu"
          >
            <FiMenu className="text-xl" />
          </button>
        </div>
      </header>

      {/* 📱 Mobile Slide-over Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="md:hidden fixed top-0 bottom-0 left-0 w-72 bg-dark-950 border-r border-white/10 z-50 shadow-2xl"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 🖥️ Desktop Permanent Sidebar */}
      <aside className="hidden md:flex w-72 h-screen sticky top-0 bg-dark-950/80 backdrop-blur-2xl border-r border-white/5 flex-col justify-between overflow-hidden shrink-0 z-30">
        <div className="absolute top-[-10%] left-[-20%] w-44 h-44 bg-brand-500/10 blur-[90px] rounded-full -z-10" />
        <div className="absolute bottom-[5%] right-[-10%] w-32 h-32 bg-coral-500/5 blur-[80px] rounded-full -z-10" />
        {sidebarContent}
      </aside>
    </>
  );
}

export default Sidebar;