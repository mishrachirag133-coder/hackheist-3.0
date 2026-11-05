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
import { useHeistAudio } from './hooks/useHeistAudio';

export default function App() {
  const [introPhase, setIntroPhase] = useState('terminal');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [bellaCiaoMode, setBellaCiaoMode] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const { initAudio, playSynthSound } = useHeistAudio(soundEnabled);
  const konamiSequence = useRef([]);

  const triggerMoneyRain = useCallback(() => {
    playSynthSound('unlock');
    const items = ['💵', '💶', '💰', '💸', '🪙', '💎'];
    const next = Array.from({ length: 40 }).map((_, i) => ({
      id: Date.now() + i,
      icon: items[Math.floor(Math.random() * items.length)],
      left: Math.random() * 100,
      animDuration: 1.5 + Math.random() * 2,
      size: 20 + Math.random() * 24
    }));
    setConfetti(next);
    setTimeout(() => setConfetti([]), 3500);
  }, [playSynthSound]);

  const rainRef = useRef(triggerMoneyRain);
  const soundRef = useRef(playSynthSound);
  rainRef.current = triggerMoneyRain;
  soundRef.current = playSynthSound;

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
        soundRef.current('bellaciao');
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
          playSynthSound={playSynthSound}
        />
      )}

      {introPhase === 'video' && (
        <VideoIntro
          onEnter={enterApp}
          playSynthSound={playSynthSound}
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
        soundEnabled={soundEnabled}
        onToggleSound={() => {
          const next = !soundEnabled;
          setSoundEnabled(next);
          if (next) {
            initAudio();
            setTimeout(() => playSynthSound('unlock', true), 0);
          }
        }}
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
      <Blueprint playSynthSound={playSynthSound} />
      <Vault playSynthSound={playSynthSound} onUnlocked={triggerMoneyRain} />
      <Syndicate playSynthSound={playSynthSound} />
      <Intel playSynthSound={playSynthSound} />
      <Escape onForgeBadge={openBadge} />
      <Footer
        onBellaCiao={() => {
          setBellaCiaoMode(true);
          playSynthSound('bellaciao');
          triggerMoneyRain();
        }}
      />
      <BadgeModal
        open={showBadgeModal}
        onClose={() => setShowBadgeModal(false)}
        playSynthSound={playSynthSound}
      />
    </div>
  );
}
