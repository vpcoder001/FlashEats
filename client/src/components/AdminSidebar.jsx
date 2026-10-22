import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiDatabase, 
  FiActivity, 
  FiPieChart, 
  FiLogOut, 
  FiShield, 
  FiMenu,
  FiX,
  FiZap
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function AdminSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Admin session terminated");
    navigate("/login");
  };

  const navItems = [
    { name: "Manage Menu", path: "/admin/menu", icon: <FiDatabase /> },
    { name: "Live Pipeline", path: "/admin/orders", icon: <FiActivity />, badge: "LIVE" },
    { name: "Intelligence", path: "/admin/analytics", icon: <FiPieChart /> },
  ];

  const adminContent = (
    <div className="h-full flex flex-col justify-between p-6">
      <div>
        {/* Admin Header */}
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-coral-500 to-brand-500 rounded-2xl flex items-center justify-center shadow-lg shadow-coral-500/20 text-white font-black">
              <FiShield className="text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-display font-black tracking-tight text-white flex items-center gap-1">
                CORE<span className="text-coral-400">ADMIN</span>
              </h1>
              <p className="text-[10px] text-coral-400/80 font-mono uppercase tracking-[0.2em] flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 bg-coral-500 rounded-full animate-pulse" /> Privileged Terminal
              </p>
            </div>
          </div>
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
                  ? "bg-gradient-to-r from-coral-500/20 to-brand-500/10 text-white border border-coral-500/30 shadow-glow-coral" 
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3.5">
                    <span className={`text-lg transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-coral-400" : "text-slate-400 group-hover:text-coral-300"}`}>
                      {item.icon}
                    </span>
                    <span className="tracking-wide">
                      {item.name}
                    </span>
                  </div>

                  {/* Special Badge for Live Orders */}
                  {item.badge && (
                    <span className="text-[10px] bg-coral-500/20 text-coral-400 px-2 py-0.5 rounded-md font-mono font-black border border-coral-500/30 animate-pulse">
                      {item.badge}
                    </span>
                  )}

                  {/* Active Slide Indicator */}
                  {isActive && (
                    <motion.div 
                      layoutId="adminIndicatorActive"
                      className="absolute left-0 top-2 bottom-2 w-1 bg-coral-400 rounded-r-full"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Admin Footer Controls */}
      <div className="pt-6 border-t border-white/5 space-y-3">
        <div className="bg-dark-850/80 border border-white/5 rounded-2xl p-3 text-xs text-slate-400 flex items-center justify-between">
          <span className="font-mono text-[11px] text-slate-500">KITCHEN SYNC</span>
          <span className="text-emerald-400 font-bold font-mono text-[11px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" /> ONLINE
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-2xl bg-coral-500/10 text-coral-400 border border-coral-500/20 hover:bg-coral-500 hover:text-white transition-all duration-300 shadow-lg shadow-coral-950/30 text-sm font-bold"
        >
          <FiLogOut className="text-base" />
          <span className="uppercase tracking-wider text-xs">Terminate Session</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* 📱 Mobile Top Bar for Admin */}
      <header className="md:hidden sticky top-0 z-40 bg-dark-900/95 backdrop-blur-xl border-b border-coral-500/20 px-4 py-3.5 flex items-center justify-between w-full">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-coral-500 to-brand-500 rounded-xl flex items-center justify-center text-white font-black shadow-md shadow-coral-500/20">
            <FiShield className="text-lg" />
          </div>
          <span className="font-display font-black text-lg text-white">
            CORE<span className="text-coral-400">ADMIN</span>
          </span>
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-slate-300 hover:text-white rounded-xl bg-white/5 border border-white/10 transition-colors"
          aria-label="Open admin navigation"
        >
          <FiMenu className="text-xl" />
        </button>
      </header>

      {/* 📱 Mobile Slide Drawer */}
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
              className="md:hidden fixed top-0 bottom-0 left-0 w-72 bg-dark-950 border-r border-coral-500/20 z-50 shadow-2xl"
            >
              {adminContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 🖥️ Desktop Permanent Admin Sidebar */}
      <aside className="hidden md:flex w-72 h-screen sticky top-0 bg-dark-950/80 backdrop-blur-2xl border-r border-white/5 flex-col justify-between overflow-hidden shrink-0 z-30">
        <div className="absolute top-[-5%] left-[-10%] w-48 h-48 bg-coral-500/10 blur-[100px] rounded-full -z-10" />
        <div className="absolute bottom-[10%] right-[-10%] w-36 h-36 bg-brand-500/5 blur-[90px] rounded-full -z-10" />
        {adminContent}
      </aside>
    </>
  );
}

export default AdminSidebar;
