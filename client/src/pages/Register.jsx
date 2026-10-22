import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../api/authApi";
import { FiUser, FiMail, FiLock, FiArrowRight, FiZap, FiCheckCircle } from "react-icons/fi";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email.toLowerCase().endsWith("@ietlucknow.ac.in")) {
      alert("Please use your registered IET Lucknow college email (@ietlucknow.ac.in)");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        name,
        email,
        password,
        role: "student"
      });

      alert("Account created successfully! Please sign in with your credentials.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950 px-4 py-12 relative overflow-hidden">
      {/* Dynamic ambient backdrop */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-brand-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-coral-500/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-dark-900/90 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl relative z-10"
      >
        {/* Brand header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-brand-400 to-amber-600 rounded-2xl flex items-center justify-center text-dark-950 font-black shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-transform">
              <FiZap className="text-xl" />
            </div>
            <span className="font-display font-black text-2xl tracking-tight text-white">
              FLASH<span className="text-brand-400">EATS</span>
            </span>
          </Link>
          <h2 className="text-2xl font-display font-bold text-white tracking-tight">
            Create Student Account
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Join the smart dining express network at IET Lucknow
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider ml-1">
              Full Legal Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-base" />
              <input
                type="text"
                placeholder="Prajit Kumar Singh"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-dark-950/80 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-600 outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all"
              />
            </div>
          </div>

          {/* College Email */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider ml-1">
              College Email (@ietlucknow.ac.in)
            </label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-base" />
              <input
                type="email"
                placeholder="24005201000xx@ietlucknow.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-dark-950/80 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-600 outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all font-mono"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider ml-1">
              Choose Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-base" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-dark-950/80 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-600 outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all font-mono"
              />
            </div>
          </div>

          {/* Fixed Student Role Notice */}
          <div className="bg-dark-950/60 border border-white/5 p-3 rounded-xl flex items-center gap-2.5 text-xs text-slate-400">
            <FiCheckCircle className="text-emerald-400 text-base shrink-0" />
            <span>Assigned account tier: <strong className="text-white">Student Patron</strong></span>
          </div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full py-4 rounded-2xl font-display font-bold text-sm tracking-wide bg-gradient-to-r from-brand-500 via-amber-500 to-amber-600 hover:from-brand-400 hover:to-amber-500 text-dark-950 shadow-glow transition-all active:scale-[0.98] mt-3 flex items-center justify-center gap-2"
          >
            {loading ? "Registering..." : (
              <>
                Complete Registration <FiArrowRight />
              </>
            )}
          </motion.button>
        </form>

        <p className="text-slate-400 text-xs text-center mt-6">
          Already registered?{" "}
          <Link to="/login" className="text-brand-400 hover:text-brand-300 font-bold underline transition-colors">
            Log In Here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;
