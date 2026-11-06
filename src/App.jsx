import { useCallback, useEffect, useRef, useState } from 'react';
import CustomCursor from './components/CustomCursor';
import MoneyRain from './components/MoneyRain';
import TerminalIntro from './components/TerminalIntro';
import VideoIntro from './components/VideoIntro';
import Navbar from './components/Navbar';
import Recruitment from './components/Recruitment';
import Planning from './components/Planning';
import Blueprint from './components/Blueprint';
import Vault from './components/Vault';
import Syndicate from './components/Syndicate';
import Intel from './components/Intel';
import Escape from './components/Escape';
import Footer from './components/Footer';
import BadgeModal from './components/BadgeModal';

export default function App() {
  const [introPhase, setIntroPhase] = useState('terminal');
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [bellaCiaoMode, setBellaCiaoMode] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const konamiSequence = useRef([]);

  const triggerMoneyRain = useCallback(() => {
    const notes = [
      { denomination: '₹500', bg: 'from-stone-100 to-stone-200', accent: 'bg-stone-400', text: 'text-stone-700', border: 'border-stone-300' },
      { denomination: '₹2000', bg: 'from-pink-100 to-pink-200', accent: 'bg-pink-400', text: 'text-pink-800', border: 'border-pink-300' },
      { denomination: '₹100', bg: 'from-violet-50 to-violet-100', accent: 'bg-violet-400', text: 'text-violet-800', border: 'border-violet-200' },
    ];
    const next = Array.from({ length: 162 }).map((_, i) => {
      const note = notes[Math.floor(Math.random() * notes.length)];
      const w = 36 + Math.random() * 18;
      const h = w * 0.48;
      return { id: Date.now() + i, type: 'note', ...note, w, h, left: Math.random() * 100, animDuration: 1.8 + Math.random() * 2.2 };
    });
    setConfetti(next);
    setTimeout(() => setConfetti([]), 4500);
  }, []);

  const rainRef = useRef(triggerMoneyRain);
  rainRef.current = triggerMoneyRain;

  useEffect(() => {
    const handleKeyDown = (e) => {
      const expected = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a'
      ];
      konamiSequence.current.push(e.key.toLowerCase());
      if (konamiSequence.current.length > expected.length) konamiSequence.current.shift();
      if (konamiSequence.current.join(',') === expected.map((k) => k.toLowerCase()).join(',')) {
        setBellaCiaoMode(true);
        rainRef.current();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openBadge = () => setShowBadgeModal(true);
  const goVideo = useCallback(() => setIntroPhase('video'), []);
  const enterApp = useCallback(() => setIntroPhase('app'), []);

  return (
    <div className="min-h-screen bg-[#08090a] text-neutral-200 font-mono select-none relative overflow-x-hidden">
      <CustomCursor />
      <MoneyRain confetti={confetti} />

      {introPhase === 'terminal' && (
        <TerminalIntro
          onBypass={goVideo}
          onComplete={goVideo}
        />
      )}

      {introPhase === 'video' && (
        <VideoIntro
          onEnter={enterApp}
        />
      )}

      <div className="fixed inset-0 pointer-events-none z-30 scanlines opacity-60" />

      {bellaCiaoMode && (
        <div className="bg-red-600 text-white font-bold py-2 px-4 text-center text-xs tracking-widest uppercase flex items-center justify-center space-x-4 z-40 sticky top-0 shadow-[0_0_30px_#e50914]">
          <span className="animate-spin">🎭</span>
          <span>BELLA CIAO MODE ACTIVATED // UNLIMITED HACKER CONFETTI UNLOCKED!</span>
          <span className="animate-spin">🎭</span>
          <button onClick={() => setBellaCiaoMode(false)} className="ml-4 text-xs underline uppercase">
            Dismiss
          </button>
        </div>
      )}

      <Navbar
        onReplay={goVideo}
        onLogoClick={triggerMoneyRain}
      />

      <button
        onClick={triggerMoneyRain}
        title="Loot The Vault (Rain Cash!)"
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 border-2 border-amber-400 text-xl flex items-center justify-center shadow-[0_0_25px_rgba(229,9,20,0.8)] transition transform hover:scale-110 active:scale-95"
      >
        🎭
      </button>

      <Recruitment onForgeBadge={openBadge} />
      <Planning />
      <Blueprint />
      <Vault onUnlocked={triggerMoneyRain} />
      <Syndicate />
      <Intel />
      <Escape onForgeBadge={openBadge} />
      <Footer
        onBellaCiao={() => {
          setBellaCiaoMode(true);
          triggerMoneyRain();
        }}
      />
      <BadgeModal
        open={showBadgeModal}
        onClose={() => setShowBadgeModal(false)}
      />
    </div>
  );
}
