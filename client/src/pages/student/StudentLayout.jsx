import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

function StudentLayout() {
  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 flex flex-col md:flex-row">
      {/* Background Ambience Blobs */}
      <div className="fixed top-0 right-0 w-[420px] h-[420px] bg-brand-500/10 blur-[130px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-1/3 w-[350px] h-[350px] bg-coral-500/5 blur-[120px] pointer-events-none -z-10" />
      
      <Sidebar />

      <main className="flex-1 px-4 py-6 sm:px-6 md:px-8 lg:px-10 overflow-y-auto md:h-screen custom-scrollbar w-full min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="pb-16 md:pb-6"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}

export default StudentLayout;