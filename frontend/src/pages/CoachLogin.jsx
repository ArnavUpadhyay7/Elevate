import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { coachStore } from "../store/authStore";

const CoachLogin = () => {
  const navigate = useNavigate();
  const login = coachStore((store) => store.login);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try { await login(formData, navigate); }
    finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#07090D] text-white font-['DM_Sans',system-ui,sans-serif] antialiased flex">

      {/* Grain */}
      <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.024]"
        style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat:"repeat", backgroundSize:"160px" }}
      />

      {/* ── LEFT — form ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 sm:px-12 py-16 relative">

        {/* Ambient glow — slightly gold to differentiate from player login */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background:"radial-gradient(circle, rgba(160,30,46,0.08) 0%, transparent 70%)" }}
        />

        <div className="w-full max-w-sm relative">

          {/* Logo + heading */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-['Syne',sans-serif] font-extrabold text-[13px] tracking-[0.18em] text-white/60 uppercase">Elevate</span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#A01E2E] border border-[#A01E2E]/40 rounded px-1.5 py-0.5">Coach</span>
            </div>
            <div className="w-6 h-px bg-[#A01E2E] mb-6" />
            <h1 className="font-['Syne',sans-serif] font-extrabold text-3xl text-white tracking-tight leading-tight mb-1.5">
              Welcome back, Captain.
            </h1>
            <p className="text-[13px] text-white/35 tracking-wide">Sign in to your coach account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div className="flex flex-col gap-1.5">
              <label className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/40">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 pointer-events-none" />
                <input type="email" placeholder="you@example.com" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.07] rounded-lg pl-10 pr-4 py-3 text-[13.5px] text-white placeholder:text-white/20 outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/40">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 pointer-events-none" />
                <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.07] rounded-lg pl-10 pr-10 py-3 text-[13.5px] text-white placeholder:text-white/20 outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all duration-200"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading}
              className="mt-2 w-full bg-[#A01E2E] hover:bg-[#8E1C2A] disabled:opacity-50 text-white text-[13px] font-semibold py-3.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)] tracking-[0.03em]">
              {isLoading ? "Signing in…" : "Sign In"}
            </button>

          </form>

          <p className="text-center text-[12.5px] text-white/30 mt-6">
            Don't have an account?{" "}
            <Link to="/coach-signup" className="text-[#A01E2E] hover:text-[#C0242E] font-semibold transition-colors">
              Create account
            </Link>
          </p>

        </div>
      </div>

      {/* ── RIGHT — cinematic panel ── */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden items-end">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage:"url('https://i.pinimg.com/1200x/5c/77/b4/5c77b498d943184c08da0b6d9dc174aa.jpg')", filter:"brightness(0.35) saturate(0.6)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090D] via-[#07090D]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090D] via-transparent to-transparent" />
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#A01E2E]/40 to-transparent" />

        <div className="relative z-10 p-14 pb-16 max-w-sm">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-5 h-px bg-[#A01E2E]" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#A01E2E]">Coach Portal</span>
          </div>
          <h2 className="font-['Syne',sans-serif] font-extrabold text-3xl text-white tracking-tight leading-tight mb-3">
            Welcome back, Captain!
          </h2>
          <p className="text-[13px] text-white/40 leading-relaxed">
            Sign in to manage your sessions, connect with players, and grow your coaching reputation.
          </p>
          <div className="mt-8 flex gap-6">
            {[["500+","Active Coaches"],["12K+","Sessions"],["4.9★","Avg Rating"]].map(([n,l])=>(
              <div key={l}>
                <p className="font-['Syne',sans-serif] font-extrabold text-lg text-white leading-none">{n}</p>
                <p className="text-[9.5px] uppercase tracking-[0.14em] text-white/30 mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default CoachLogin;