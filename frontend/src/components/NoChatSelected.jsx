const NoChatSelected = () => (
  <div className="flex-1 flex flex-col items-center justify-center bg-[#07090D] relative overflow-hidden select-none">

    {/* Ambient red glow */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: "radial-gradient(ellipse 52% 38% at 50% 54%, rgba(160,30,46,0.055) 0%, transparent 70%)",
      }}
    />

    {/* Subtle grid pattern */}
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.018]"
      style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />

    <div className="relative z-10 text-center px-10 max-w-[300px]">

      {/* Icon box */}
      <div className="w-[52px] h-[52px] rounded-xl border border-white/[0.07] bg-white/[0.02] flex items-center justify-center mx-auto mb-6 relative">
        {/* Corner accent */}
        <div className="absolute top-0 left-0 right-0 h-px rounded-t-xl bg-gradient-to-r from-transparent via-[#A01E2E]/40 to-transparent" />
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="rgba(160,30,46,0.65)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </div>

      {/* Accent line */}
      <div className="w-5 h-px bg-[#A01E2E] mx-auto mb-4" />

      <h2 className="font-['Syne',sans-serif] font-extrabold text-[18px] text-white tracking-tight mb-2 leading-tight">
        Start a conversation
      </h2>
      <p className="text-[12px] text-white/28 leading-relaxed">
        Select a coach from the sidebar to begin your session.
      </p>
    </div>
  </div>
);

export default NoChatSelected;