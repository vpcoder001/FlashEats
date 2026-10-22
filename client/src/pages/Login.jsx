import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiShield, FiUserCheck, FiZap } from "react-icons/fi";

import API from "../api/axios";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleResponse = async (credentialResponse) => {
    try {
      setLoading(true);

      const res = await API.post("/api/auth/google", {
        token: credentialResponse.credential,
      });

      const user = res.data.user || res.data;
      const token = res.data.token;

      login(user, token);
      navigate(user.role === "admin" ? "/admin" : "/student", { replace: true });
    } catch (err) {
      alert("Google login failed. Use your college email.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await loginUser({
        email,
        password,
        role,
      });

      const { token, role: userRole, name } = res.data;
      const userData = { name, role: userRole, email };

      login(userData, token);
      navigate(userRole === "admin" ? "/admin" : "/student", {
        replace: true,
      });
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950 px-4 py-12 relative overflow-hidden">
      {/* Dynamic ambient backdrop */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-brand-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-coral-500/10 blur-[120px] rounded-full pointer-events-none" />

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
            Welcome Back
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Sign in to access your campus dining portal
          </p>
        </div>

        {/* Role Switcher Pill */}
        <div className="grid grid-cols-2 gap-2 bg-dark-950/80 p-1.5 rounded-2xl border border-white/5 mb-6">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`py-2.5 px-4 rounded-xl text-xs font-display font-bold transition-all flex items-center justify-center gap-2 ${
              role === "student"
                ? "bg-gradient-to-r from-brand-500 to-amber-600 text-dark-950 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <FiUserCheck /> Student
          </button>
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`py-2.5 px-4 rounded-xl text-xs font-display font-bold transition-all flex items-center justify-center gap-2 ${
              role === "admin"
                ? "bg-gradient-to-r from-coral-500 to-rose-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <FiShield /> Kitchen Admin
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider ml-1">
              {role === "admin" ? "Admin Identifier" : "College Email ID"}
            </label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-base" />
              <input
                type="text"
                placeholder={role === "admin" ? "admin@ietlucknow.ac.in or admin" : "24005201000xx@ietlucknow.ac.in"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-dark-950/80 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-600 outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all"
                required
              />
            </div>
          </div>

          {/* Password with Eye Toggle */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                Password
              </label>
            </div>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-base" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-dark-950/80 border border-white/10 rounded-2xl py-3.5 pl-11 pr-12 text-sm text-white placeholder-slate-600 outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all font-mono"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-display font-bold text-sm tracking-wide transition-all shadow-lg mt-2 flex items-center justify-center gap-2 ${
              role === "admin"
                ? "bg-gradient-to-r from-coral-500 to-rose-600 hover:from-coral-400 hover:to-rose-500 text-white shadow-glow-coral"
                : "bg-gradient-to-r from-brand-500 via-amber-500 to-amber-600 hover:from-brand-400 hover:to-amber-500 text-dark-950 shadow-glow"
            }`}
          >
            {loading ? "Authenticating..." : (
              <>
                Continue to Portal <FiArrowRight />
              </>
            )}
          </motion.button>
        </form>

        {/* Google OAuth (only for student login if configured) */}
        {role === "student" &&
          import.meta.env.VITE_GOOGLE_CLIENT_ID &&
          !import.meta.env.VITE_GOOGLE_CLIENT_ID.includes("your_google_client_id") && (
            <div className="mt-6 pt-6 border-t border-white/5 flex flex-col items-center">
              <p className="text-xs text-slate-500 mb-3 font-mono">OR SIGN IN WITH</p>
              <GoogleLogin
                onSuccess={handleGoogleResponse}
                onError={() => alert("Google Login Failed")}
              />
            </div>
          )}

        {/* Footer Link */}
        <p className="text-slate-400 text-xs text-center mt-6">
          New on campus?{" "}
          <Link to="/register" className="text-brand-400 hover:text-brand-300 font-bold underline transition-colors">
            Create an Account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
