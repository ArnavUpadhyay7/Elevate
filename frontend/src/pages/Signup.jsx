import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { playerStore } from "../store/authStore";

/* ─────────────────────────────────────────────────────────────
   Rank ladder — lowest to highest
   Clicking cycles UP; wraps back to Iron at top
───────────────────────────────────────────────────────────── */
const RANKS = ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Ascendant", "Immortal", "Radiant"];

/* ─────────────────────────────────────────────────────────────
   Roles with subtle accent colors
───────────────────────────────────────────────────────────── */
const ROLES = [
  { name: "Duelist",   color: "#A01E2E", bg: "rgba(160,30,46,0.12)",  border: "rgba(160,30,46,0.3)"  },
  { name: "Initiator", color: "#C4943A", bg: "rgba(196,148,58,0.10)", border: "rgba(196,148,58,0.28)" },
  { name: "Sentinel",  color: "#3F8CC9", bg: "rgba(63,140,201,0.10)", border: "rgba(63,140,201,0.28)" },
  { name: "Controller",color: "#3FA89A", bg: "rgba(63,168,154,0.10)", border: "rgba(63,168,154,0.28)" },
];

const rankColor = (rank) => {
  const r = rank.toLowerCase();
  if (r === "radiant")   return "#A01E2E";
  if (r === "immortal")  return "#7B6FA0";
  if (r === "ascendant") return "#4F9A8C";
  if (r === "diamond")   return "#4F8CC9";
  if (r === "platinum")  return "#3FA89A";
  if (r === "gold")      return "#C4943A";
  if (r === "silver")    return "#8A9BAE";
  return "#4A5568";
};

/* ─────────────────────────────────────────────────────────────
   Input field — shared style
───────────────────────────────────────────────────────────── */
const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/40">{label}</label>
    {children}
  </div>
);

const inputCls = "w-full bg-white/[0.03] border border-white/[0.07] rounded-lg py-3 text-[13.5px] text-white placeholder:text-white/20 outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all duration-200";

/* ─────────────────────────────────────────────────────────────
   Signup
───────────────────────────────────────────────────────────── */
const Signup = () => {
  const navigate  = useNavigate();
  const signup    = playerStore((state) => state.signup);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading,    setIsLoading]    = useState(false);

  const [rankIdx, setRankIdx] = useState(0);           // starts at Iron
  const [roleIdx, setRoleIdx] = useState(0);           // starts at Duelist

  const [formData, setFormData] = useState({
    fullname: "", email: "", password: "",
    about: "", profilePic: "",
  });

  const currentRank = RANKS[rankIdx];
  const currentRole = ROLES[roleIdx];
  const rc = rankColor(currentRank);

  const cycleRank = () => setRankIdx((i) => (i + 1) % RANKS.length);
  const cycleRole = () => setRoleIdx((i) => (i + 1) % ROLES.length);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signup({ ...formData, rank: currentRank, role: currentRole.name }, navigate);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090D] text-white font-['DM_Sans',system-ui,sans-serif] antialiased flex">

      {/* Grain */}
      <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.024]"
        style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat:"repeat", backgroundSize:"160px" }}
      />

      {/* ── LEFT — form panel ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 sm:px-12 py-14 relative overflow-y-auto">

        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background:"radial-gradient(circle, rgba(160,30,46,0.06) 0%, transparent 70%)" }}
        />

        <div className="w-full max-w-sm relative">

          {/* Logo + heading */}
          <div className="mb-8">
            <span className="font-['Syne',sans-serif] font-extrabold text-[13px] tracking-[0.18em] text-white/60 uppercase">Elevate</span>
            <div className="w-6 h-px bg-[#A01E2E] mt-3 mb-6" />
            <h1 className="font-['Syne',sans-serif] font-extrabold text-3xl text-white tracking-tight leading-tight mb-1.5">
              Create account.
            </h1>
            <p className="text-[13px] text-white/35 tracking-wide">Get ready to elevate your game.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Full name */}
            <Field label="Full Name">
              <input type="text" placeholder="Arnav Upadhyay" value={formData.fullname}
                onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                className={`${inputCls} px-4`} />
            </Field>

            {/* Email */}
            <Field label="Email">
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 pointer-events-none" />
                <input type="email" placeholder="you@example.com" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`${inputCls} pl-10 pr-4`} />
              </div>
            </Field>

            {/* Password */}
            <Field label="Password">
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 pointer-events-none" />
                <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`${inputCls} pl-10 pr-10`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </Field>

            {/* ── RANK + ROLE selectors ── */}
            <div className="flex gap-3">

              {/* Rank cycler */}
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/40">Rank</label>
                <button type="button" onClick={cycleRank}
                  className="group relative flex flex-col items-start justify-between rounded-lg border px-4 py-3 transition-all duration-300 text-left overflow-hidden"
                  style={{ borderColor: `${rc}55`, background: `${rc}0D` }}>
                  {/* Rank name */}
                  <span className="font-['Syne',sans-serif] font-extrabold text-[15px] tracking-tight leading-none transition-all duration-300"
                    style={{ color: rc }}>
                    {currentRank}
                  </span>
                  {/* Progress bar — shows how far up the ladder */}
                  <div className="mt-2.5 w-full h-px bg-white/[0.06] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500"
                      style={{ width:`${((rankIdx + 1) / RANKS.length) * 100}%`, background: rc }} />
                  </div>
                  {/* Hint */}
                  <span className="mt-1.5 text-[9.5px] uppercase tracking-[0.12em] text-white/25 group-hover:text-white/40 transition-colors">
                    Tap to rank up ↑
                  </span>
                </button>
              </div>

              {/* Role cycler */}
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/40">Role</label>
                <button type="button" onClick={cycleRole}
                  className="group relative flex flex-col items-start justify-between rounded-lg border px-4 py-3 transition-all duration-300 text-left overflow-hidden"
                  style={{ borderColor: currentRole.border, background: currentRole.bg }}>
                  {/* Role name */}
                  <span className="font-['Syne',sans-serif] font-extrabold text-[15px] tracking-tight leading-none transition-all duration-300"
                    style={{ color: currentRole.color }}>
                    {currentRole.name}
                  </span>
                  {/* Role index dots */}
                  <div className="mt-2.5 flex gap-1">
                    {ROLES.map((r, i) => (
                      <div key={r.name} className="w-4 h-px rounded-full transition-all duration-300"
                        style={{ background: i === roleIdx ? currentRole.color : "rgba(255,255,255,0.08)" }} />
                    ))}
                  </div>
                  <span className="mt-1.5 text-[9.5px] uppercase tracking-[0.12em] text-white/25 group-hover:text-white/40 transition-colors">
                    Tap to switch →
                  </span>
                </button>
              </div>

            </div>

            {/* About */}
            <Field label="About You">
              <textarea placeholder="4 years in Valorant, former Diamond, looking to hit Radiant this act…"
                value={formData.about}
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                className={`${inputCls} px-4 pt-3 h-24 resize-none`} />
            </Field>

            {/* Optional fields */}
            <Field label="Profile Picture URL (Optional)">
              <input type="text" placeholder="https://…" value={formData.profilePic}
                onChange={(e) => setFormData({ ...formData, profilePic: e.target.value })}
                className={`${inputCls} px-4`} />
            </Field>

            {/* Submit */}
            <button type="submit" disabled={isLoading}
              className="mt-2 w-full bg-[#A01E2E] hover:bg-[#8E1C2A] disabled:opacity-50 text-white text-[13px] font-semibold py-3.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)] tracking-[0.03em]">
              {isLoading ? "Creating account…" : "Create Account"}
            </button>

          </form>

          <p className="text-center text-[12.5px] text-white/30 mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-[#A01E2E] hover:text-[#C0242E] font-semibold transition-colors">
              Sign in
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
          <div className="w-5 h-px bg-[#A01E2E] mb-4" />
          <h2 className="font-['Syne',sans-serif] font-extrabold text-3xl text-white tracking-tight leading-tight mb-3">
            Get your free account right now.
          </h2>
          <p className="text-[13px] text-white/40 leading-relaxed">
            Sign up to explore verified Radiant coaches and start your climb today.
          </p>
          <div className="mt-8 flex gap-6">
            {[["500+","Coaches"],["4.9★","Rating"],["12K+","Sessions"]].map(([n,l])=>(
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

export default Signup;