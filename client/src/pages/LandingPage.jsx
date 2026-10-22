import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle, FiClock, FiShield, FiBarChart2, FiZap, FiShoppingBag, FiSmartphone, FiUsers } from "react-icons/fi";
import analyticsVideo from "../assets/videos/Analytics.mp4";
import menuVideo from "../assets/videos/Menu.mp4";
import orderVideo from "../assets/videos/Order.mp4";
import { useRef } from "react";

function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const FeatureCard = ({ icon, title, desc, video, badge }) => {
    const videoRef = useRef(null);

    const handlePlay = async () => {
      try {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.currentTime = 0;
          await videoRef.current.play();
        }
      } catch (error) {
        console.log("Autoplay blocked:", error);
      }
    };

    return (
      <motion.div
        variants={itemVariants}
        onViewportEnter={handlePlay}
        className="group rounded-[2.5rem] border border-white/10 bg-dark-850/80 p-6 sm:p-8 transition-all duration-500 hover:border-brand-500/30 hover:shadow-glow hover:-translate-y-1.5 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="w-14 h-14 rounded-2xl bg-dark-950/80 border border-white/10 flex items-center justify-center text-brand-400 shadow-md">
              {icon}
            </div>
            {badge && (
              <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 font-bold">
                {badge}
              </span>
            )}
          </div>

          <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-brand-300 transition-colors">
            {title}
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            {desc}
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/5 bg-dark-950 transition-all duration-500 group-hover:border-white/15">
          <div className="relative h-[200px] sm:h-[230px] w-full overflow-hidden bg-dark-950">
            {video ? (
              <>
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover scale-[1.03] group-hover:scale-[1.08] transition-transform duration-700 ease-out"
                  src={video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  onLoadedData={handlePlay}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[11px] tracking-[0.35em] text-slate-500 font-mono">
                INTERACTIVE PREVIEW
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-dark-950 text-slate-100 min-h-screen font-sans selection:bg-brand-500/30 selection:text-amber-300 relative overflow-x-hidden">
      {/* 🌫 Ambient Gradient Atmosphere */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[55%] h-[55%] bg-brand-500/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[45%] h-[45%] bg-coral-500/10 blur-[130px] rounded-full" />
      </div>

      {/* 🧭 NAVBAR */}
      <nav className="flex items-center justify-between px-6 sm:px-10 py-5 max-w-7xl mx-auto backdrop-blur-xl bg-dark-950/70 border-b border-white/5 sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-amber-600 rounded-xl flex items-center justify-center text-dark-950 font-black shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform">
            <FiZap className="text-xl" />
          </div>
          <span className="font-display font-black text-xl tracking-tight text-white">
            FLASH<span className="text-brand-400">EATS</span>
          </span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6 text-sm font-semibold">
          <a href="#features" className="hidden md:inline-block text-slate-400 hover:text-white transition-colors">
            Capabilities
          </a>
          <a href="#stats" className="hidden md:inline-block text-slate-400 hover:text-white transition-colors">
            Impact
          </a>
          <Link 
            to="/login" 
            className="text-white hover:text-brand-300 bg-white/5 hover:bg-white/10 px-4 sm:px-5 py-2.5 rounded-xl transition-all border border-white/10 text-xs sm:text-sm font-display"
          >
            Sign In
          </Link>
          <Link 
            to="/register" 
            className="hidden sm:inline-flex bg-gradient-to-r from-brand-500 to-amber-600 hover:from-brand-400 hover:to-amber-500 text-dark-950 font-display font-bold px-5 py-2.5 rounded-xl transition-all shadow-glow-sm text-xs sm:text-sm"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* 🔥 HERO SECTION */}
      <section className="relative pt-16 sm:pt-24 pb-24 sm:pb-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-mono font-bold uppercase tracking-wider">
              <FiZap className="text-brand-400" /> Next-Gen Smart Canteen System
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black leading-[1.08] mb-6 tracking-tight text-white">
              Instant Ordering. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-400 via-amber-300 to-coral-400">
                Zero Campus Lines.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Order hot food from your lecture halls, skip long physical cafeteria queues, and get alerted precisely when your order token is ready for instant pick up.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to="/register" 
                className="group bg-gradient-to-r from-brand-500 via-amber-500 to-amber-600 hover:from-brand-400 hover:to-amber-500 text-dark-950 px-8 py-4 rounded-2xl font-display font-black text-base flex items-center justify-center gap-2.5 transition-all shadow-glow active:scale-[0.98]"
              >
                Join FlashEats Free
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/login" 
                className="bg-dark-850 hover:bg-dark-800 border border-white/10 px-8 py-4 rounded-2xl font-display font-bold text-base text-slate-300 hover:text-white transition-all flex items-center justify-center"
              >
                Explore Live Canteen
              </Link>
            </div>

            {/* Quick trust metrics */}
            <div className="mt-10 pt-8 border-t border-white/5 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5"><FiCheckCircle className="text-emerald-400" /> IET Lucknow Verified</span>
              <span className="flex items-center gap-1.5"><FiCheckCircle className="text-emerald-400" /> Real-time Kitchen Sync</span>
              <span className="flex items-center gap-1.5"><FiCheckCircle className="text-emerald-400" /> Digital Tokens</span>
            </div>
          </motion.div>

          {/* Hero Visual Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full relative max-w-lg lg:max-w-none"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-dark-950 aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000"
                alt="Smart Canteen Food Experience"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />
            </div>

            {/* Floating Order Status Pill */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 z-20 bg-dark-900/90 backdrop-blur-2xl p-4 sm:p-5 rounded-2xl border border-white/10 shadow-2xl max-w-xs"
            >
              <div className="flex items-center gap-3.5">
                <div className="bg-emerald-500/20 p-2.5 rounded-xl text-emerald-400 text-lg border border-emerald-500/30">
                  <FiCheckCircle />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Order Token #42 Ready!</p>
                  <p className="text-sm font-display font-bold text-white">Pick up at Express Counter 1</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 📊 STATS BANNER */}
      <section id="stats" className="py-16 border-y border-white/5 bg-dark-850/40">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Campus Patrons", val: "10,000+" },
            { label: "Orders Fulfilled", val: "50,000+" },
            { label: "Average Wait Cut", val: "78%" },
            { label: "Pickup Time", val: "< 2 mins" },
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <h3 className="text-3xl sm:text-4xl font-display font-black text-white">{stat.val}</h3>
              <p className="text-brand-400/80 font-mono text-xs uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ✨ CAPABILITIES GRID */}
      <section id="features" className="py-24 sm:py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
            ENGINEERED FOR SPEED
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mt-4 mb-4">
            Built for High-Velocity Dining
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            From digital pre-ordering to kitchen telemetry and live order progression.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          <FeatureCard
            icon={<FiClock size={24} />}
            badge="STUDENTS"
            title="Pre-Order Express"
            desc="Select snacks right between classes and pick them up hot the moment your lecture concludes."
            video={orderVideo}
          />

          <FeatureCard
            icon={<FiShield size={24} />}
            badge="KITCHEN"
            title="Catalogue Controller"
            desc="Add delicacies, update pricing, and adjust live item availability dynamically from your admin dashboard."
            video={menuVideo}
          />

          <FeatureCard
            icon={<FiBarChart2 size={24} />}
            badge="ANALYTICS"
            title="Kitchen Telemetry"
            desc="Actionable intelligence on peak rush hours, top-selling items, and daily throughput."
            video={analyticsVideo}
          />
        </motion.div>
      </section>

      {/* 🚀 CALL TO ACTION */}
      <section className="py-20 sm:py-28 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-brand-600 via-amber-600 to-coral-600 rounded-[3rem] p-10 sm:p-16 md:p-20 text-center relative overflow-hidden shadow-glow">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-display font-black text-dark-950 leading-tight">
              Ready to experience modern campus dining?
            </h2>
            <p className="text-dark-950/80 text-base font-medium">
              Create your account in 30 seconds with your college email and start skipping queues today.
            </p>
            <div>
              <Link 
                to="/register" 
                className="bg-dark-950 hover:bg-dark-900 text-white px-9 py-4 rounded-2xl font-display font-bold text-base transition-transform active:scale-95 inline-flex items-center gap-2 shadow-2xl"
              >
                Create Student Account <FiArrowRight />
              </Link>
            </div>
          </div>

          {/* Decorative ambient elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/15 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-black/20 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        </div>
      </section>

      {/* ⚓ FOOTER */}
      <footer className="py-12 px-6 border-t border-white/5 text-center text-xs text-slate-500 font-mono">
        <div className="flex justify-center gap-6 mb-4 text-slate-400">
          <Link to="/login" className="hover:text-brand-400 transition-colors">Student Login</Link>
          <Link to="/login" className="hover:text-coral-400 transition-colors">Kitchen Portal</Link>
          <a href="#features" className="hover:text-white transition-colors">System Capabilities</a>
        </div>
        <p>© 2026 FlashEats Smart Dining Infrastructure. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
