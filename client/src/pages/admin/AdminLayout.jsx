import AdminSidebar from "../../components/AdminSidebar";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col md:flex-row">
      {/* Admin specific warm crimson & gold glow */}
      <div className="fixed top-0 left-0 w-[550px] h-[550px] bg-coral-500/10 blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-brand-500/5 blur-[120px] pointer-events-none -z-10" />
      
      <AdminSidebar />

      <main className="flex-1 px-4 py-6 sm:px-6 md:px-8 lg:px-10 overflow-y-auto md:h-screen custom-scrollbar w-full min-w-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="pb-16 md:pb-6"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}

export default AdminLayout;