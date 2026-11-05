import { useState } from 'react';
import { tracks } from '../data/tracks';

export default function Blueprint({ playSynthSound }) {
  const [selectedTrack, setSelectedTrack] = useState(0);

  return (
<section id="blueprint" className="py-20 px-6 md:px-12 border-b border-neutral-800 bg-[#08090a]">
  <div className="max-w-6xl mx-auto">
    
    <div className="text-center max-w-2xl mx-auto mb-14">
      <div className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] flex items-center justify-center space-x-2 mb-2">
        <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
        <span>PHASE 03 // THE BLUEPRINT</span>
      </div>
      <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
        Mission Infiltration Tracks
      </h2>
      <p className="text-neutral-400 text-xs sm:text-sm mt-3 font-sans">
        Choose your sector of breach. Each track comes with designated bounties, dedicated mentors, and specialized problem statements.
      </p>
    </div>

    {/* Tracks Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tracks.map((t, idx) => {
        const IconComp = t.icon;
        const isSelected = selectedTrack === idx;
        return (
          <div
            key={t.id}
            onClick={() => {
              setSelectedTrack(idx);
              playSynthSound('type');
            }}
            data-interactive="true"
            className={`p-6 rounded-lg border transition-all cursor-pointer relative flex flex-col justify-between ${
              isSelected 
                ? 'bg-neutral-900/90 border-red-500 shadow-[0_0_30px_rgba(229,9,20,0.3)]' 
                : 'bg-neutral-950/70 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/40'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold text-red-500 tracking-widest">{t.code}</span>
                <div className="p-2 bg-red-600/10 border border-red-500/30 rounded text-red-500">
                  <IconComp className="w-5 h-5" />
                </div>
              </div>

              <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider mb-1">
                {t.category}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t.title}</h3>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed mb-4">
                {t.desc}
              </p>
            </div>

            <div>
              {/* Bounty Badge */}
              <div className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-600/40 px-2.5 py-1 rounded inline-block mb-4">
                {t.bounty}
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-800/80">
                {t.stack.map(st => (
                  <span key={st} className="text-[10px] bg-neutral-900 text-neutral-300 px-2 py-0.5 rounded border border-neutral-800">
                    {st}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {/* Selected Track Deep-Dive Drawer */}
    <div className="mt-8 bg-neutral-950 border border-red-900/50 p-6 rounded-lg text-xs">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-3">
        <span className="text-red-500 font-bold uppercase tracking-widest">
          TARGET BRIEFING: {tracks[selectedTrack].title} ({tracks[selectedTrack].code})
        </span>
        <span className="text-emerald-400 font-mono font-bold">{tracks[selectedTrack].bounty}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-300 font-sans">
        <div>
          <span className="text-neutral-500 font-mono uppercase block text-[10px] mb-1">OPERATIONAL OBJECTIVE:</span>
          <p className="leading-relaxed">{tracks[selectedTrack].mission}</p>
        </div>
        <div>
          <span className="text-neutral-500 font-mono uppercase block text-[10px] mb-1">RECOMMENDED FRAMEWORKS:</span>
          <p className="leading-relaxed text-amber-300 font-mono">{tracks[selectedTrack].stack.join(' • ')}</p>
        </div>
      </div>
    </div>

  </div>
</section>
  );
}
