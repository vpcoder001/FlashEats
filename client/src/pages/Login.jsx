import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

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

  // 👁️ NEW STATE
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
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-2xl w-96 shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-indigo-400 text-center mb-6">
          Canteen Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder={role === "admin" ? "Admin Email (admin@ietlucknow.ac.in)" : "College Email (roll@ietlucknow.ac.in)"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-800 p-3 rounded-lg text-white outline-none"
            required
          />

          {/* 🔐 PASSWORD WITH SHOW/HIDE */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 p-3 pr-12 rounded-lg text-white"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-300 hover:text-white"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-gray-800 p-3 rounded-lg text-white"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full bg-indigo-500 py-2 rounded-lg text-white hover:bg-indigo-600 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        {role === "student" &&
          import.meta.env.VITE_GOOGLE_CLIENT_ID &&
          !import.meta.env.VITE_GOOGLE_CLIENT_ID.includes("your_google_client_id") && (
            <div className="mt-6 flex flex-col items-center border-t border-white/10 pt-6">
              <GoogleLogin
                onSuccess={handleGoogleResponse}
                onError={() => alert("Google Login Failed")}
              />
            </div>
          )}

        <p className="text-gray-400 text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-400 hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;