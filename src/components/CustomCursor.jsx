import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      const target = e.target;
      setIsHoveringClickable(Boolean(target.closest('button, a, input, select, [data-interactive="true"]')));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
<div 
  className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out hidden md:block"
  style={{
    transform: `translate3d(${cursorPos.x - 16}px, ${cursorPos.y - 16}px, 0)`
  }}
>
  <div className={`relative flex items-center justify-center transition-all duration-200 ${isHoveringClickable ? 'scale-125' : 'scale-100'}`}>
    <div className="w-8 h-8 rounded-full border border-red-600/40 border-dashed animate-spin" style={{ animationDuration: '6s' }}></div>
    <div className="absolute w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_#e50914]"></div>
    {isHoveringClickable && (
      <div className="absolute -top-4 text-[9px] font-bold text-red-500 tracking-tighter whitespace-nowrap bg-black/80 px-1 border border-red-500/40">
        LOCK-ON
      </div>
    )}
  </div>
</div>
  );
}
