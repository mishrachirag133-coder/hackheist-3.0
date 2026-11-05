import { useEffect, useRef, useState } from 'react';
import { Clock, Key } from 'lucide-react';

export default function Recruitment({ onForgeBadge }) {
  const radarCanvasRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({ days: 28, hours: 14, mins: 32, secs: 45, ms: 88 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, mins, secs, ms } = prev;
        ms -= 4;
        if (ms < 0) { ms = 99; secs -= 1; }
        if (secs < 0) { secs = 59; mins -= 1; }
        if (mins < 0) { mins = 59; hours -= 1; }
        if (hours < 0) { hours = 23; days -= 1; }
        return { days, hours, mins, secs, ms };
      });
    }, 40);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const canvas = radarCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let angle = 0;
    let animId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = Math.min(cx, cy) - 20;

      ctx.strokeStyle = 'rgba(229, 9, 20, 0.25)';
      ctx.lineWidth = 1.5;
      for (let r = 40; r <= radius; r += 45) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.stroke();

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, angle, angle + 0.4);
      ctx.closePath();
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius);
      grad.addColorStop(0, 'rgba(229, 9, 20, 0.4)');
      grad.addColorStop(1, 'rgba(229, 9, 20, 0)');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();

      const blips = [
        { x: cx + Math.cos(angle - 0.8) * (radius * 0.7), y: cy + Math.sin(angle - 0.8) * (radius * 0.7) },
        { x: cx - 50, y: cy + 40 },
        { x: cx + 80, y: cy - 60 }
      ];
      blips.forEach((b) => {
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      angle += 0.03;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
<section id="recruitment" className="relative min-h-[92vh] flex flex-col justify-center items-center px-6 py-16 text-center overflow-hidden border-b border-neutral-800">
  {/* Radar Background Canvas */}
  <canvas 
    ref={radarCanvasRef}
    width={650}
    height={650}
    className="absolute opacity-25 pointer-events-none"
  />

  {/* Ambient Glows */}
  <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none"></div>
  <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>

  <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
    {/* Target Confirmed Badge */}
    <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-red-950/40 border border-red-600/50 rounded-full text-[11px] text-red-400 font-bold uppercase tracking-widest mb-6">
      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
      <span>OPERATION ACTIVE // TARGET: MIET MAINFRAME MEERUT</span>
    </div>

    {/* Main Glitch Title */}
    <h1 className="text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tight text-white drop-shadow-[0_10px_35px_rgba(229,9,20,0.6)]">
      HACK HEIST <span className="text-red-600">3.0</span>
    </h1>

    <p className="max-w-2xl text-neutral-400 text-sm sm:text-base mt-6 tracking-wide leading-relaxed font-sans font-medium">
      36 Hours of Code, Decryption, and High-Stakes Innovation. Assemble your 4-person crew, breach the mainframe at Meerut Institute of Engineering & Technology, and claim your share of the bounty.
    </p>

    {/* BOMB COUNTDOWN TIMER */}
    <div className="mt-10 w-full max-w-xl bg-neutral-950/90 border border-red-900/60 p-4 sm:p-6 rounded-lg shadow-[0_0_30px_rgba(229,9,20,0.15)] relative">
      <div className="flex items-center justify-between text-[11px] text-red-500 font-bold tracking-widest uppercase mb-3 pb-2 border-b border-neutral-800">
        <span className="flex items-center space-x-1.5">
          <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
          <span>T-MINUS UNTIL INFILTRATION</span>
        </span>
        <span className="text-neutral-500 font-mono">NODE // MARCH 28-29, 2026</span>
      </div>

      <div className="grid grid-cols-5 gap-2 text-center">
        <div className="bg-[#121317] border border-neutral-800 p-2 sm:p-3 rounded">
          <div className="text-2xl sm:text-4xl font-black text-white font-mono">{String(timeLeft.days).padStart(2, '0')}</div>
          <div className="text-[9px] uppercase tracking-widest text-neutral-500 mt-1">Days</div>
        </div>
        <div className="bg-[#121317] border border-neutral-800 p-2 sm:p-3 rounded">
          <div className="text-2xl sm:text-4xl font-black text-white font-mono">{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className="text-[9px] uppercase tracking-widest text-neutral-500 mt-1">Hours</div>
        </div>
        <div className="bg-[#121317] border border-neutral-800 p-2 sm:p-3 rounded">
          <div className="text-2xl sm:text-4xl font-black text-white font-mono">{String(timeLeft.mins).padStart(2, '0')}</div>
          <div className="text-[9px] uppercase tracking-widest text-neutral-500 mt-1">Mins</div>
        </div>
        <div className="bg-[#121317] border border-neutral-800 p-2 sm:p-3 rounded">
          <div className="text-2xl sm:text-4xl font-black text-red-500 font-mono">{String(timeLeft.secs).padStart(2, '0')}</div>
          <div className="text-[9px] uppercase tracking-widest text-neutral-500 mt-1">Secs</div>
        </div>
        <div className="bg-[#121317] border border-neutral-800 p-2 sm:p-3 rounded border-red-600/30">
          <div className="text-2xl sm:text-4xl font-black text-amber-400 font-mono">{String(timeLeft.ms).padStart(2, '0')}</div>
          <div className="text-[9px] uppercase tracking-widest text-neutral-500 mt-1">MS</div>
        </div>
      </div>
    </div>

    {/* Hero Action CTA Buttons */}
    <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
      <a
        href="https://hack-heist-2.devfolio.co/"
        target="_blank"
        rel="noopener noreferrer"
        className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold tracking-widest uppercase text-xs border border-red-500 shadow-[0_0_25px_rgba(229,9,20,0.5)] transition"
      >
        Apply With Devfolio
      </a>
      <button
        onClick={onForgeBadge}
        className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 hover:text-amber-300 font-bold tracking-widest uppercase text-xs border border-amber-500/40 transition flex items-center space-x-2"
      >
        <Key className="w-4 h-4 text-amber-400" />
        <span>Forge Recruit ID</span>
      </button>
      <a
        href="#blueprint"
        className="px-6 py-3.5 bg-transparent hover:bg-neutral-900 text-neutral-300 font-bold tracking-widest uppercase text-xs border border-neutral-700 transition"
      >
        View Blueprint
      </a>
    </div>

    {/* Quick Metrics Bar */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl mt-12 pt-8 border-t border-neutral-800/80 text-left">
      <div>
        <div className="text-xs text-neutral-500 uppercase tracking-widest">Prize Pool</div>
        <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono mt-0.5">₹2,000,000+</div>
      </div>
      <div>
        <div className="text-xs text-neutral-500 uppercase tracking-widest">Duration</div>
        <div className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">36H SPRINT</div>
      </div>
      <div>
        <div className="text-xs text-neutral-500 uppercase tracking-widest">Recruits</div>
        <div className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">500+ HACKERS</div>
      </div>
      <div>
        <div className="text-xs text-neutral-500 uppercase tracking-widest">Entry Fee</div>
        <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-0.5">100% FREE</div>
      </div>
    </div>
  </div>
</section>
  );
}
