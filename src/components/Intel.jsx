import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { faqItems } from '../data/faqs';

export default function Intel() {
  const [declassifiedFaqs, setDeclassifiedFaqs] = useState({});

  return (
<section id="intel" className="py-20 px-6 md:px-12 border-b border-neutral-800 bg-[#070809]">
  <div className="max-w-4xl mx-auto">
    
    <div className="text-center mb-12">
      <div className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] flex items-center justify-center space-x-2 mb-2">
        <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
        <span>PHASE 06 // INTERROGATION &amp; INTEL FILES</span>
      </div>
      <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
        Classified Intel Documents
      </h2>
      <p className="text-neutral-400 text-xs sm:text-sm mt-3 font-sans">
        All inquiries are strictly redacted under protocol. Click any folder to declassify the confidential answer.
      </p>
    </div>

    <div className="space-y-4">
      {faqItems.map((item, idx) => {
        const isRevealed = declassifiedFaqs[idx];
        return (
          <div
            key={idx}
            onClick={() => {
              setDeclassifiedFaqs(prev => ({ ...prev, [idx]: !prev[idx] }));
            }}
            data-interactive="true"
            className={`p-5 rounded-lg border transition-all cursor-pointer ${
              isRevealed 
                ? 'bg-neutral-950 border-red-500 shadow-[0_0_20px_rgba(229,9,20,0.2)]' 
                : 'bg-[#101114] border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-sm font-bold text-white font-mono">
                <span className="text-red-500 font-bold">0{idx + 1}.</span>
                <span>{item.q}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  isRevealed 
                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40' 
                    : 'bg-red-950/60 text-red-400 border border-red-500/40'
                }`}>
                  {isRevealed ? "DECLASSIFIED" : "REDACTED"}
                </span>
                {isRevealed ? <ChevronDown className="w-4 h-4 text-red-500" /> : <ChevronRight className="w-4 h-4 text-neutral-500" />}
              </div>
            </div>

            {/* Redacted Bar vs Declassified Text */}
            <div className="mt-4 pt-3 border-t border-neutral-800/80">
              {isRevealed ? (
                <div className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed flex items-start space-x-2">
                  <span className="text-emerald-500 font-mono font-bold">&gt;&gt;</span>
                  <span>{item.a}</span>
                </div>
              ) : (
                <div className="bg-black text-transparent select-none py-1.5 px-3 rounded font-mono text-xs tracking-widest inline-block border border-neutral-900">
                  {item.redacted}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>

  </div>
</section>
  );
}
