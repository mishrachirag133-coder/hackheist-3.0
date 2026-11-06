import { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';
import { terminalLines } from '../data/terminalLines';

export default function TerminalIntro({ onBypass, onComplete }) {
  const [terminalIndex, setTerminalIndex] = useState(0);
  const [terminalProgress, setTerminalProgress] = useState(0);

  useEffect(() => {
    if (terminalIndex < terminalLines.length) {
      const timer = setTimeout(() => {
        setTerminalIndex((prev) => prev + 1);
        const pct = Math.round(((terminalIndex + 1) / terminalLines.length) * 100);
        setTerminalProgress(pct);
      }, 240);
      return () => clearTimeout(timer);
    }
    const transitionTimer = setTimeout(() => {
      onComplete();
    }, 450);
    return () => clearTimeout(transitionTimer);
  }, [terminalIndex, onComplete]);

  return (
  <div className="fixed inset-0 z-50 bg-[#070809] flex flex-col justify-between p-6 md:p-14 scanlines">
    {/* Top Bar */}
    <div className="flex flex-wrap items-center justify-between border-b border-red-950/60 pb-4 text-xs font-bold tracking-widest">
      <div className="flex items-center space-x-3">
        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
        <span className="text-red-500">MIET MAINFRAME // BREACH INITIATION</span>
      </div>
      <div className="flex items-center space-x-4 text-neutral-500">
        <span>TARGET NODE: 192.168.0.1</span>
        <span>STATUS: {terminalProgress}% ACCESSED</span>
        <button 
          onClick={onBypass}
          className="px-3 py-1 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-600/50 text-[10px] uppercase font-bold tracking-widest transition"
        >
          Bypass &gt;&gt;
        </button>
      </div>
    </div>

    {/* Terminal Body */}
    <div className="max-w-3xl my-auto py-8">
      <div className="space-y-1.5 font-mono text-xs md:text-sm leading-relaxed">
        {terminalLines.slice(0, terminalIndex).map((line, idx) => (
          <div key={idx} className={line.color}>
            {line.text}
          </div>
        ))}
        {terminalIndex < terminalLines.length && (
          <div className="text-red-500 font-bold animate-pulse">
            &gt; Decrypting payload stream... <span className="inline-block w-2 h-4 bg-red-600 ml-1"></span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mt-8 border border-neutral-800 bg-neutral-950/80 p-1">
        <div 
          className="h-2 bg-gradient-to-r from-red-700 via-red-600 to-amber-500 transition-all duration-200"
          style={{ width: `${terminalProgress}%` }}
        ></div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="flex items-center justify-between border-t border-neutral-800/80 pt-4 text-[11px] text-neutral-500">
      <div className="flex items-center space-x-2">
        <Terminal className="w-3.5 h-3.5 text-red-500" />
        <span className="text-neutral-400 font-semibold tracking-wider">THE PROFESSOR: INITIATING RECRUITMENT</span>
      </div>
      <div className="text-red-500 font-bold tracking-widest">
        BREACH PROGRESS: {terminalProgress}%
      </div>
    </div>
  </div>
  );
}
