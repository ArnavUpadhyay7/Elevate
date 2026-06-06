import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { playerStore } from "../store/authStore";

const RANKS = ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Ascendant", "Immortal", "Radiant"];

const ROLES = [
  { name: "Duelist", color: "text-[#A01E2E]", bg: "bg-[#A01E2E]/[0.12]", border: "border-[#A01E2E]/30", bar: "bg-[#A01E2E]" },
  { name: "Initiator", color: "text-[#C4943A]", bg: "bg-[#C4943A]/10", border: "border-[#C4943A]/30", bar: "bg-[#C4943A]" },
  { name: "Sentinel", color: "text-[#3F8CC9]", bg: "bg-[#3F8CC9]/10", border: "border-[#3F8CC9]/30", bar: "bg-[#3F8CC9]" },
  { name: "Controller", color: "text-[#3FA89A]", bg: "bg-[#3FA89A]/10", border: "border-[#3FA89A]/30", bar: "bg-[#3FA89A]" },
];

const rankColor = (rank) => {
  const r = rank.toLowerCase();
  if (r === "radiant") return { text: "text-[#A01E2E]", bg: "bg-[#A01E2E]", soft: "bg-[#A01E2E]/[0.05]", border: "border-[#A01E2E]/35" };
  if (r === "immortal") return { text: "text-[#7B6FA0]", bg: "bg-[#7B6FA0]", soft: "bg-[#7B6FA0]/[0.05]", border: "border-[#7B6FA0]/35" };
  if (r === "ascendant") return { text: "text-[#4F9A8C]", bg: "bg-[#4F9A8C]", soft: "bg-[#4F9A8C]/[0.05]", border: "border-[#4F9A8C]/35" };
  if (r === "diamond") return { text: "text-[#4F8CC9]", bg: "bg-[#4F8CC9]", soft: "bg-[#4F8CC9]/[0.05]", border: "border-[#4F8CC9]/35" };
  if (r === "platinum") return { text: "text-[#3FA89A]", bg: "bg-[#3FA89A]", soft: "bg-[#3FA89A]/[0.05]", border: "border-[#3FA89A]/35" };
  if (r === "gold") return { text: "text-[#C4943A]", bg: "bg-[#C4943A]", soft: "bg-[#C4943A]/[0.05]", border: "border-[#C4943A]/35" };
  if (r === "silver") return { text: "text-[#8A9BAE]", bg: "bg-[#8A9BAE]", soft: "bg-[#8A9BAE]/[0.05]", border: "border-[#8A9BAE]/35" };
  return { text: "text-[#4A5568]", bg: "bg-[#4A5568]", soft: "bg-[#4A5568]/[0.05]", border: "border-[#4A5568]/35" };
};

const rankProgress = ["w-[11.111%]", "w-[22.222%]", "w-[33.333%]", "w-[44.444%]", "w-[55.555%]", "w-[66.666%]", "w-[77.777%]", "w-[88.888%]", "w-full"];

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/40">{label}</label>
    {children}
  </div>
);

const inputCls = "w-full bg-white/[0.03] border border-white/[0.07] rounded-lg py-3 text-[13.5px] text-white placeholder:text-white/20 outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all duration-200";

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
    <div className="min-h-screen bg-[var(--elv-bg)] text-white font-['DM_Sans',system-ui,sans-serif] antialiased flex">

      {/* Grain */}
      <div className="elv-grain-bg pointer-events-none fixed inset-0 z-[9998] opacity-[0.024]" />

      {/* ── LEFT — form panel ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 sm:px-12 py-14 relative overflow-y-auto">

        {/* Ambient glow */}
        <div className="elv-red-glow pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full" />

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
                  className={`group relative flex flex-col items-start justify-between overflow-hidden rounded-lg border px-4 py-3 text-left transition-all duration-300 ${rc.border} ${rc.soft}`}>
                  {/* Rank name */}
                  <span className={`font-['Syne',sans-serif] text-[15px] font-extrabold leading-none tracking-tight transition-all duration-300 ${rc.text}`}>
                    {currentRank}
                  </span>
                  {/* Progress bar — shows how far up the ladder */}
                  <div className="mt-2.5 w-full h-px bg-white/[0.06] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${rankProgress[rankIdx]} ${rc.bg}`} />
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
                  className={`group relative flex flex-col items-start justify-between overflow-hidden rounded-lg border px-4 py-3 text-left transition-all duration-300 ${currentRole.border} ${currentRole.bg}`}>
                  {/* Role name */}
                  <span className={`font-['Syne',sans-serif] text-[15px] font-extrabold leading-none tracking-tight transition-all duration-300 ${currentRole.color}`}>
                    {currentRole.name}
                  </span>
                  {/* Role index dots */}
                  <div className="mt-2.5 flex gap-1">
                    {ROLES.map((r, i) => (
                      <div key={r.name} className={`h-px w-4 rounded-full transition-all duration-300 ${i === roleIdx ? currentRole.bar : "bg-white/[0.08]"}`} />
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
        <div className="elv-auth-art absolute inset-0 bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--elv-bg)] via-[var(--elv-bg)]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--elv-bg)] via-transparent to-transparent" />
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
