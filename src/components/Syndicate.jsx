import { useMemo, useState } from 'react';
import { Shield } from 'lucide-react';
import { teamDossiers } from '../data/team';

export default function Syndicate() {
  const [teamFilter, setTeamFilter] = useState('all');
  const [flippedCards, setFlippedCards] = useState({});
  const filteredDossiers = useMemo(() => {
    if (teamFilter === 'all') return teamDossiers;
    return teamDossiers.filter((d) => d.dept === teamFilter);
  }, [teamFilter]);

  return (
<section id="syndicate" className="py-20 px-6 md:px-12 border-b border-neutral-800 bg-[#090a0c]">
  <div className="max-w-6xl mx-auto">
    
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
      <div>
        <div className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] flex items-center space-x-2 mb-2">
          <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
          <span>PHASE 05 // THE SYNDICATE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
          Wanted Dossier: Organizing Crew
        </h2>
      </div>
      
      {/* Department Filter Tabs */}
      <div className="flex flex-wrap gap-2 mt-4 md:mt-0 text-xs">
        {['all', 'lead', 'tech', 'creative', 'pr'].map(cat => (
          <button
            key={cat}
            onClick={() => {
              setTeamFilter(cat);
            }}
            className={`px-3 py-1.5 rounded uppercase font-bold tracking-wider transition ${
              teamFilter === cat
                ? 'bg-red-600 text-white'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>

    <p className="text-xs text-neutral-400 mb-8 font-sans">
      Hover or click on any wanted poster to flip and view the declassified operative records from GDG On Campus MIET.
    </p>

    {/* Dossier Cards Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {filteredDossiers.map((member, idx) => {
        const isFlipped = flippedCards[member.codename];
        return (
          <div
            key={member.codename}
            onClick={() => {
              setFlippedCards(prev => ({ ...prev, [member.codename]: !prev[member.codename] }));
            }}
            data-interactive="true"
            className="perspective-1000 h-80 cursor-pointer"
          >
            <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}>
              
              {/* FRONT: Interpol Wanted Poster */}
              <div className="absolute inset-0 bg-[#121316] border-2 border-neutral-800 p-5 rounded-lg flex flex-col justify-between backface-hidden shadow-xl">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold text-red-500 border-b border-red-900/60 pb-2 mb-3">
                    <span>INTERPOL // WANTED</span>
                    <span className="text-neutral-500">DOSSIER #{104 + idx}</span>
                  </div>

                  {/* Silhouette / Photo Placeholder */}
                  <div className="w-full h-32 bg-[#1a1b22] border border-neutral-800 rounded flex flex-col items-center justify-center relative overflow-hidden mb-3">
                    <span className="text-5xl opacity-80">🎭</span>
                    <div className="absolute bottom-1 bg-black/80 px-2 py-0.5 text-[9px] text-red-500 font-bold uppercase tracking-widest border border-red-600/40">
                      {member.dept.toUpperCase()} UNIT
                    </div>
                  </div>

                  <div className="text-center">
                    <h4 className="text-xl font-black text-white tracking-wider">{member.codename}</h4>
                    <div className="text-xs text-neutral-400 font-sans mt-0.5">{member.realName}</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800 text-center">
                  <div className="text-[10px] text-neutral-500 uppercase tracking-widest">BOUNTY REWARD</div>
                  <div className="text-base font-black text-amber-400 font-mono">{member.bounty}</div>
                  <div className="text-[9px] text-red-500 mt-1 uppercase font-bold tracking-tighter">Click to Declassify</div>
                </div>
              </div>

              {/* BACK: Classified Technical File */}
              <div className="absolute inset-0 bg-[#0d0e12] border-2 border-red-600/60 p-5 rounded-lg flex flex-col justify-between rotate-y-180 backface-hidden shadow-2xl">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold text-emerald-400 border-b border-neutral-800 pb-2 mb-3">
                    <span>RECORD DECLASSIFIED</span>
                    <Shield className="w-3.5 h-3.5 text-red-500" />
                  </div>

                  <div className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-1">ROLE:</div>
                  <div className="text-sm font-bold text-white mb-2">{member.role}</div>

                  <div className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-1">INTEL:</div>
                  <p className="text-[11px] text-neutral-300 font-sans leading-relaxed mb-3">
                    {member.bio}
                  </p>

                  <div className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-1">SPECIALTIES:</div>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.map(sk => (
                      <span key={sk} className="text-[9px] bg-red-950/60 text-red-300 px-1.5 py-0.5 rounded border border-red-800/40 font-mono">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-center text-[9px] text-neutral-500 border-t border-neutral-800 pt-2">
                  GDG ON CAMPUS MIET CREW
                </div>
              </div>

            </div>
          </div>
        );
      })}
    </div>

  </div>
</section>
  );
}
