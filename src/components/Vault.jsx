import { useRef, useState } from 'react';
import { Award, CheckCircle2, Lock, Unlock } from 'lucide-react';

export default function Vault({ onUnlocked }) {
  const [isHolding, setIsHolding] = useState(false);
  const [holdingProgress, setHoldingProgress] = useState(0);
  const [vaultUnlocked, setVaultUnlocked] = useState(false);
  const holdIntervalRef = useRef(null);

  const startHolding = () => {
    if (vaultUnlocked) return;
    setIsHolding(true);
    holdIntervalRef.current = setInterval(() => {
      setHoldingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(holdIntervalRef.current);
          setIsHolding(false);
          setVaultUnlocked(true);
          onUnlocked?.();
          return 100;
        }
        return prev + 4;
      });
    }, 60);
  };

  const stopHolding = () => {
    if (vaultUnlocked) return;
    setIsHolding(false);
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    setHoldingProgress(0);
  };

  return (
<section id="vault" className="py-20 px-6 md:px-12 border-b border-neutral-800 bg-[#07080a]">
  <div className="max-w-5xl mx-auto text-center">
    
    <div className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] flex items-center justify-center space-x-2 mb-2">
      <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
      <span>PHASE 04 // THE VAULT (HOLD TO AUTHENTICATE)</span>
    </div>
    <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
      Bounty Pool: ₹2,000,000+
    </h2>
    <p className="text-neutral-400 text-xs sm:text-sm mt-3 max-w-xl mx-auto font-sans">
      The vault is locked by biometric encryption. Hold down the authentication hub below to override system locks and reveal the loot.
    </p>

    {/* Interactive Vault Scanner Hub */}
    <div className="my-12 flex flex-col items-center justify-center">
      
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* SVG Circular Progress Ring */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="110"
            stroke="currentColor"
            strokeWidth="8"
            className="text-neutral-900"
            fill="transparent"
          />
          <circle
            cx="128"
            cy="128"
            r="110"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={2 * Math.PI * 110}
            strokeDashoffset={2 * Math.PI * 110 * (1 - holdingProgress / 100)}
            className="text-red-600 transition-all duration-75"
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center Trigger Button */}
        <div 
          onMouseDown={startHolding}
          onMouseUp={stopHolding}
          onMouseLeave={stopHolding}
          onTouchStart={startHolding}
          onTouchEnd={stopHolding}
          data-interactive="true"
          className={`absolute w-44 h-44 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
            vaultUnlocked 
              ? 'bg-emerald-600 shadow-[0_0_40px_#10b981]' 
              : isHolding 
                ? 'bg-red-700 scale-95 shadow-[0_0_50px_#e50914]' 
                : 'bg-[#181920] border-4 border-neutral-700 hover:border-red-600 shadow-[0_0_30px_rgba(0,0,0,0.8)]'
          }`}
        >
          {vaultUnlocked ? (
            <>
              <Unlock className="w-10 h-10 text-black mb-1 animate-bounce" />
              <span className="text-black font-black text-xs uppercase tracking-widest">ACCESS GRANTED</span>
            </>
          ) : (
            <>
              <Lock className={`w-8 h-8 mb-1.5 ${isHolding ? 'text-white' : 'text-red-500'}`} />
              <span className="text-white font-bold text-xs uppercase tracking-wider">
                {isHolding ? `DECRYPTING ${holdingProgress}%` : "HOLD TO UNLOCK"}
              </span>
              <span className="text-[9px] text-neutral-400 mt-1">Press &amp; Hold</span>
            </>
          )}
        </div>
      </div>

      {/* Instruction status */}
      <div className="mt-4 text-xs font-mono">
        {vaultUnlocked ? (
          <div className="flex items-center space-x-2 text-emerald-400 font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>VAULT OVERRIDE COMPLETE // ALL PRIZE TIERS ACCESSIBLE</span>
            <button 
              onClick={() => {
                setVaultUnlocked(false);
                setHoldingProgress(0);
              }}
              className="ml-3 underline text-neutral-400 hover:text-white"
            >
              Lock Vault
            </button>
          </div>
        ) : (
          <div className="text-neutral-500">
            {isHolding ? "HOLDING BIOMETRIC OVERRIDE..." : "PRESS & HOLD SCANNER TO TRIGGER NUMBER COUNTER"}
          </div>
        )}
      </div>

    </div>

    {/* Prize Cards Breakdown */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
      
      {/* 1st Place */}
      <div className={`p-6 rounded-lg border transition-all ${
        vaultUnlocked 
          ? 'bg-amber-950/30 border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.3)]' 
          : 'bg-neutral-950 border-neutral-800'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">1ST PRIZE // THE MASTERMIND</span>
          <Award className="w-6 h-6 text-amber-400" />
        </div>
        <div className="text-3xl sm:text-4xl font-black text-white font-mono">
          {vaultUnlocked ? "₹1,00,000" : "₹ •••••••"}
        </div>
        <p className="text-xs text-neutral-400 font-sans mt-3 leading-relaxed">
          Direct Cash Grant + Devfolio Golden Pass + 1 Year Cloud Credits + Trophy of the Heist + Exclusive Direct Mentorship.
        </p>
      </div>

      {/* 2nd Place */}
      <div className={`p-6 rounded-lg border transition-all ${
        vaultUnlocked 
          ? 'bg-neutral-900/60 border-neutral-400 shadow-[0_0_20px_rgba(255,255,255,0.15)]' 
          : 'bg-neutral-950 border-neutral-800'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-neutral-300 tracking-widest uppercase">2ND PRIZE // THE INSIDE AGENT</span>
          <Award className="w-6 h-6 text-neutral-300" />
        </div>
        <div className="text-3xl sm:text-4xl font-black text-white font-mono">
          {vaultUnlocked ? "₹60,000" : "₹ ••••••"}
        </div>
        <p className="text-xs text-neutral-400 font-sans mt-3 leading-relaxed">
          Direct Cash Grant + Specialized Sponsor Vouchers + Swag Boxes + Fast-Track Job/Internship Screening.
        </p>
      </div>

      {/* 3rd Place */}
      <div className={`p-6 rounded-lg border transition-all ${
        vaultUnlocked 
          ? 'bg-amber-950/20 border-amber-700/60' 
          : 'bg-neutral-950 border-neutral-800'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-amber-600 tracking-widest uppercase">3RD PRIZE // THE ENFORCER</span>
          <Award className="w-6 h-6 text-amber-600" />
        </div>
        <div className="text-3xl sm:text-4xl font-black text-white font-mono">
          {vaultUnlocked ? "₹40,000" : "₹ ••••••"}
        </div>
        <p className="text-xs text-neutral-400 font-sans mt-3 leading-relaxed">
          Direct Cash Grant + Cloud Deployment Bundles + MIET Trophy + Hacker Merchandise Kits.
        </p>
      </div>

    </div>

    {/* Additional Special Bounties */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-xs text-left">
      <div className="bg-[#101115] p-4 rounded border border-neutral-800">
        <div className="text-red-500 font-bold uppercase tracking-wider mb-1">Tokyo All-Women Award</div>
        <div className="text-xl font-bold text-white font-mono mb-1">{vaultUnlocked ? "₹25,000" : "₹ •••••"}</div>
        <div className="text-neutral-400 text-[11px]">Dedicated prize category for the highest-scoring all-women engineering crew.</div>
      </div>
      <div className="bg-[#101115] p-4 rounded border border-neutral-800">
        <div className="text-amber-400 font-bold uppercase tracking-wider mb-1">Track Category Bounties</div>
        <div className="text-xl font-bold text-white font-mono mb-1">{vaultUnlocked ? "₹5,00,000+" : "₹ •••••••"}</div>
        <div className="text-neutral-400 text-[11px]">Distributed across AI, Web3, Cloud, Spatial, IoT &amp; Open Innovation.</div>
      </div>
      <div className="bg-[#101115] p-4 rounded border border-neutral-800">
        <div className="text-emerald-400 font-bold uppercase tracking-wider mb-1">Cloud Credits &amp; Per-Recruit Swags</div>
        <div className="text-xl font-bold text-white font-mono mb-1">{vaultUnlocked ? "₹12,75,000+" : "₹ ••••••••"}</div>
        <div className="text-neutral-400 text-[11px]">GCP Credits, domain coupons, stickers, badges, and T-shirts for every attendee.</div>
      </div>
    </div>

  </div>
</section>
  );
}
