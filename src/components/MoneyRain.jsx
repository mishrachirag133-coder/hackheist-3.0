const NOTE_TYPES = [
  { denomination: '₹500', bg: 'from-stone-100 to-stone-200', accent: 'bg-stone-400', text: 'text-stone-700', border: 'border-stone-300' },
  { denomination: '₹200', bg: 'from-amber-50 to-amber-100', accent: 'bg-amber-400', text: 'text-amber-800', border: 'border-amber-200' },
  { denomination: '₹2000', bg: 'from-pink-100 to-pink-200', accent: 'bg-pink-400', text: 'text-pink-800', border: 'border-pink-300' },
  { denomination: '₹100', bg: 'from-violet-50 to-violet-100', accent: 'bg-violet-400', text: 'text-violet-800', border: 'border-violet-200' },
  { denomination: '₹50', bg: 'from-cyan-50 to-cyan-100', accent: 'bg-cyan-400', text: 'text-cyan-800', border: 'border-cyan-200' },
];



function Note({ note }) {
  return (
    <div className={`rounded-[3px] border ${note.border} bg-gradient-to-br ${note.bg} shadow-md flex flex-col items-center justify-center px-1 overflow-hidden relative`}
      style={{ width: note.w, height: note.h }}
    >
      <div className={`absolute top-0 left-0 w-full h-[3px] ${note.accent} opacity-50`}></div>
      <div className={`absolute bottom-0 left-0 w-full h-[3px] ${note.accent} opacity-50`}></div>
      <div className={`text-[7px] font-black ${note.text} leading-none tracking-tight`}>
        {note.denomination}
      </div>
      <div className={`absolute top-0.5 left-0.5 w-1.5 h-1.5 rounded-full ${note.accent} opacity-30`}></div>
      <div className={`absolute bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full ${note.accent} opacity-30`}></div>
    </div>
  );
}

function Coin({ coin }) {
  return (
    <div className={`rounded-full ring-2 ${coin.ring} shadow-lg flex items-center justify-center`}
      style={{ width: coin.s, height: coin.s }}
    >
      <span className={`text-[6px] font-black ${coin.text} leading-none`}>{coin.value}</span>
    </div>
  );
}

export default function MoneyRain({ confetti }) {
  if (!confetti.length) return null;
  return (
  <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
    {confetti.map(c => (
      <div 
        key={c.id}
        className="absolute"
        style={{
          left: `${c.left}%`,
          top: '-50px',
          animation: `fallDown ${c.animDuration}s linear forwards`
        }}
      >
        {c.type === 'coin' ? <Coin coin={c} /> : <Note note={c} />}
      </div>
    ))}
  </div>
  );
}
