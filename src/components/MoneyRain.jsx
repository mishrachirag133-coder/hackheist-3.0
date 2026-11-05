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
          fontSize: `${c.size}px`,
          animation: `fallDown ${c.animDuration}s linear forwards`
        }}
      >
        {c.icon}
      </div>
    ))}
  </div>
  );
}
