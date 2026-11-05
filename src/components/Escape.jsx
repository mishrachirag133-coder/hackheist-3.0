import { Award, ExternalLink } from 'lucide-react';

export default function Escape({ onForgeBadge }) {
  return (
<section id="escape" className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#0a0b0e] to-black text-center relative overflow-hidden">
  
  {/* Glow */}
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/15 rounded-full blur-[150px] pointer-events-none"></div>

  <div className="relative z-10 max-w-3xl mx-auto">
    <div className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] flex items-center justify-center space-x-2 mb-3">
      <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
      <span>PHASE 07 // THE GETAWAY VAN (REGISTRATION)</span>
    </div>

    <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
      Claim Your Spot In The Syndicate
    </h2>

    <p className="text-neutral-400 text-sm sm:text-base mt-4 font-sans leading-relaxed">
      The MIET mainframe doors open on March 28-29, 2026. Only 500 recruits will be cleared for infiltration. Lock in your team's application on Devfolio today.
    </p>

    <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
      <a
        href="https://hack-heist-2.devfolio.co/"
        target="_blank"
        rel="noopener noreferrer"
        className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-bold tracking-widest uppercase text-sm border border-red-500 shadow-[0_0_30px_rgba(229,9,20,0.6)] transition flex items-center space-x-2"
      >
        <span>Register on Devfolio</span>
        <ExternalLink className="w-4 h-4" />
      </a>
      <button
        onClick={onForgeBadge}
        className="px-8 py-4 bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-bold tracking-widest uppercase text-sm border border-amber-500/50 transition flex items-center space-x-2"
      >
        <Award className="w-4 h-4 text-amber-400" />
        <span>Generate Recruit Pass</span>
      </button>
    </div>

    <div className="mt-12 text-xs text-neutral-500 flex flex-wrap items-center justify-center gap-6">
      <span>OFFICIAL INQUIRIES: gdgoncampus@miet.ac.in</span>
      <span>•</span>
      <span>MEERUT INSTITUTE OF ENGINEERING &amp; TECHNOLOGY</span>
      <span>•</span>
      <span>#HACKHEIST3</span>
    </div>
  </div>
</section>
  );
}
