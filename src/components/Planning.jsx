import { MapPin, Radio } from 'lucide-react';

export default function Planning() {
  return (
<section id="planning" className="py-20 px-6 md:px-12 border-b border-neutral-800 bg-[#0a0b0d]">
  <div className="max-w-6xl mx-auto">
    
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
      <div>
        <div className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] flex items-center space-x-2 mb-2">
          <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
          <span>PHASE 02 // TACTICAL PLANNING</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
          The Heist Blueprint &amp; Protocol
        </h2>
      </div>
      <div className="text-xs text-neutral-500 font-mono mt-4 md:mt-0">
        LOCATION: MIET MEERUT // N.H. 58 DELHI-ROORKEE HIGHWAY
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* The Professor's Briefing Box */}
      <div className="lg:col-span-2 bg-neutral-950 border border-neutral-800 p-6 sm:p-8 rounded-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-red-600/10 border-l border-b border-red-600/30 px-3 py-1 text-[10px] text-red-400 font-bold tracking-widest uppercase">
          CONFIDENTIAL INTEL
        </div>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-500 flex items-center justify-center text-red-500">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-white font-bold text-sm tracking-wider">AUDIO TRANSMISSION: THE PROFESSOR</div>
            <div className="text-[11px] text-neutral-500">FREQUENCY: 142.85 MHz // ENCRYPTED</div>
          </div>
        </div>

        <blockquote className="text-neutral-300 text-sm leading-relaxed border-l-2 border-red-600 pl-4 py-1 italic font-sans">
          "Welcome to the plan, recruit. You are stepping onto the grounds of Meerut Institute of Engineering &amp; Technology for 36 non-stop hours. Last year was just reconnaissance. This year, we execute. No recycled templates. No pre-written code. You arrive with your crew, decrypt the problem statement, and build an unstoppable prototype. The vault holds bounties, cloud grants, and venture eyes. Stick to the plan, and everyone leaves legendary."
        </blockquote>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-neutral-800 text-xs">
          <div className="bg-[#111215] p-3.5 rounded border border-neutral-800">
            <div className="text-red-500 font-bold uppercase tracking-wider mb-1">01. Assemble Crew</div>
            <div className="text-neutral-400 text-[11px]">2 to 4 members. Cross-domain synergy (dev + design + pitch) increases survival rate.</div>
          </div>
          <div className="bg-[#111215] p-3.5 rounded border border-neutral-800">
            <div className="text-amber-400 font-bold uppercase tracking-wider mb-1">02. 36H Mainframe</div>
            <div className="text-neutral-400 text-[11px]">On-site overnight coding sprint at MIET. Zero sleep, unlimited caffeine &amp; snacks.</div>
          </div>
          <div className="bg-[#111215] p-3.5 rounded border border-neutral-800">
            <div className="text-emerald-400 font-bold uppercase tracking-wider mb-1">03. Loot The Bounty</div>
            <div className="text-neutral-400 text-[11px]">Demonstrate working build to industry judges. Cash prizes, GCP vouchers, and jobs.</div>
          </div>
        </div>
      </div>

      {/* Venue & Organizer Dossier */}
      <div className="bg-neutral-950 border border-neutral-800 p-6 rounded-lg flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-red-500 uppercase tracking-widest mb-4">
            <MapPin className="w-4 h-4" />
            <span>The Target Venue</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">MIET Meerut</h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-sans mb-4">
            Meerut Institute of Engineering &amp; Technology (N.H. 58, Delhi-Roorkee Highway, Baghpat Bypass Road Crossing, Meerut, UP 250005).
          </p>
          <div className="space-y-2 text-xs text-neutral-300 font-mono">
            <div className="flex justify-between py-1 border-b border-neutral-800">
              <span className="text-neutral-500">ORGANIZED BY:</span>
              <span className="text-red-400 font-bold">GDG On Campus MIET</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-800">
              <span className="text-neutral-500">IN ALLIANCE WITH:</span>
              <span className="text-neutral-300">GDG Cloud Noida</span>
            </div>
            <div className="flex justify-between py-1 border-b border-neutral-800">
              <span className="text-neutral-500">EVENT MODE:</span>
              <span className="text-emerald-400 font-bold">36H On-Site Sprint</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-500">MEALS &amp; STAY:</span>
              <span className="text-amber-400 font-bold">100% Free / Hosted</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-800">
          <a
            href="https://maps.google.com/?q=Meerut+Institute+of+Engineering+and+Technology"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-bold uppercase tracking-wider rounded text-center block text-neutral-300 hover:text-white transition"
          >
            View Coordinates on Map &gt;&gt;
          </a>
        </div>
      </div>

    </div>
  </div>
</section>
  );
}
