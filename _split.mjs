import fs from 'fs';
import path from 'path';

const root = process.cwd();
const srcFile = path.join(root, '_hackheist_novideo.jsx');
const lines = fs.readFileSync(srcFile, 'utf8').split(/\r?\n/);
const slice = (a, b) => lines.slice(a - 1, b).map((l) => l.replace(/^ {6}/, '')).join('\n');

function write(rel, content) {
  const p = path.join(root, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content.replace(/\n+$/, '\n'), 'utf8');
}

write('src/data/terminalLines.js', `export const terminalLines = [
${lines.slice(157, 171).map((l) => l.replace(/^ {4}/, '  ')).join('\n')}
];
`);

const tracksBody = lines.slice(384, 450).map((l) => l.replace(/^ {4}/, '  ')).join('\n');
write('src/data/tracks.js', `import { Cpu, Layers, Server, Compass, Zap, Flame } from 'lucide-react';

export const tracks = [
${tracksBody}
];
`);

const teamBody = lines.slice(454, 527).map((l) => l.replace(/^ {4}/, '  ')).join('\n');
write('src/data/team.js', `export const teamDossiers = [
${teamBody}
];
`);

const faqBody = lines.slice(530, 561).map((l) => l.replace(/^ {4}/, '  ')).join('\n');
write('src/data/faqs.js', `export const faqItems = [
${faqBody}
];
`);

write('src/hooks/useHeistAudio.js', `import { useCallback, useRef } from 'react';

export function useHeistAudio(soundEnabled) {
  const audioCtxRef = useRef(null);
  const soundRef = useRef(soundEnabled);
  soundRef.current = soundEnabled;

  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  }, []);

  const playSynthSound = useCallback((type, force = false) => {
    if (!soundRef.current && !force) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;

      if (type === 'type') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800 + Math.random() * 400, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'tick') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'unlock') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.35);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
        setTimeout(() => {
          if (!audioCtxRef.current) return;
          const chimeOsc = audioCtxRef.current.createOscillator();
          const chimeGain = audioCtxRef.current.createGain();
          chimeOsc.connect(chimeGain);
          chimeGain.connect(audioCtxRef.current.destination);
          chimeOsc.type = 'sine';
          chimeOsc.frequency.setValueAtTime(880, audioCtxRef.current.currentTime);
          chimeGain.gain.setValueAtTime(0.2, audioCtxRef.current.currentTime);
          chimeGain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.6);
          chimeOsc.start();
          chimeOsc.stop(audioCtxRef.current.currentTime + 0.6);
        }, 200);
      } else if (type === 'alarm') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.linearRampToValueAtTime(900, now + 0.15);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'bellaciao') {
        const notes = [330, 440, 493.88, 523.25, 440];
        notes.forEach((freq, idx) => {
          setTimeout(() => {
            if (!audioCtxRef.current) return;
            const bOsc = audioCtxRef.current.createOscillator();
            const bGain = audioCtxRef.current.createGain();
            bOsc.connect(bGain);
            bGain.connect(audioCtxRef.current.destination);
            bOsc.type = 'triangle';
            bOsc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
            bGain.gain.setValueAtTime(0.2, audioCtxRef.current.currentTime);
            bGain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.25);
            bOsc.start();
            bOsc.stop(audioCtxRef.current.currentTime + 0.25);
          }, idx * 160);
        });
      }
    } catch (e) {
      console.warn('Audio synth error:', e);
    }
  }, [initAudio]);

  return { initAudio, playSynthSound };
}
`);

write('src/index.css', `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #08090a;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  overflow-x: hidden;
}

@keyframes scanlines {
  from { background-position: 0 0; }
  to { background-position: 0 100%; }
}

.scanlines {
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.04), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.04));
  background-size: 100% 4px, 6px 100%;
}

@keyframes fallDown {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
}

.perspective-1000 { perspective: 1000px; }
.transform-style-3d { transform-style: preserve-3d; }
.backface-hidden { backface-visibility: hidden; }
.rotate-y-180 { transform: rotateY(180deg); }
`);

write('src/components/CustomCursor.jsx', `import { useEffect, useState } from 'react';

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
${slice(616, 631)}
  );
}
`);

write('src/components/MoneyRain.jsx', `export default function MoneyRain({ confetti }) {
  if (!confetti.length) return null;
  return (
${slice(635, 650)}
  );
}
`);

write('src/components/TerminalIntro.jsx', `import { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';
import { terminalLines } from '../data/terminalLines';

export default function TerminalIntro({ onBypass, onComplete, playSynthSound }) {
  const [terminalIndex, setTerminalIndex] = useState(0);
  const [terminalProgress, setTerminalProgress] = useState(0);

  useEffect(() => {
    if (terminalIndex < terminalLines.length) {
      const timer = setTimeout(() => {
        setTerminalIndex((prev) => prev + 1);
        const pct = Math.round(((terminalIndex + 1) / terminalLines.length) * 100);
        setTerminalProgress(pct);
        playSynthSound('type');
      }, 240);
      return () => clearTimeout(timer);
    }
    const transitionTimer = setTimeout(() => {
      onComplete();
      playSynthSound('alarm');
    }, 450);
    return () => clearTimeout(transitionTimer);
  }, [terminalIndex, onComplete, playSynthSound]);

  return (
${slice(655, 708).replace("() => setIntroPhase('video')", 'onBypass')}
  );
}
`);

write('src/components/VideoIntro.jsx', `import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const VIDEO_SRC = '/final_video.mp4';

export default function VideoIntro({ onEnter, playSynthSound }) {
  const videoRef = useRef(null);
  const [videoMuted, setVideoMuted] = useState(true);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => console.log('Video autoplay handled:', err));
    }
  }, []);

  return (
${slice(713, 751).replaceAll('VIDEO_DATA_URI', 'VIDEO_SRC').replaceAll("setIntroPhase('app')", 'onEnter()')}
  );
}
`);

write('src/components/Navbar.jsx', `import { ExternalLink, Play, Volume2, VolumeX } from 'lucide-react';

export default function Navbar({ onReplay, onLogoClick, soundEnabled, onToggleSound }) {
  return (
${slice(775, 846)
  .replace('triggerMoneyRain()', 'onLogoClick()')
  .replace("setIntroPhase('video')", 'onReplay()')
  .replace(/onClick=\{\(\) => \{\s*const next = !soundEnabled;[\s\S]*?\}\}/, 'onClick={onToggleSound}')
}
  );
}
`);

write('src/components/Recruitment.jsx', `import { useEffect, useRef, useState } from 'react';
import { Clock, Key } from 'lucide-react';

export default function Recruitment({ onForgeBadge }) {
  const radarCanvasRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({ days: 28, hours: 14, mins: 32, secs: 45, ms: 88 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, mins, secs, ms } = prev;
        ms -= 4;
        if (ms < 0) { ms = 99; secs -= 1; }
        if (secs < 0) { secs = 59; mins -= 1; }
        if (mins < 0) { mins = 59; hours -= 1; }
        if (hours < 0) { hours = 23; days -= 1; }
        return { days, hours, mins, secs, ms };
      });
    }, 40);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const canvas = radarCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let angle = 0;
    let animId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = Math.min(cx, cy) - 20;

      ctx.strokeStyle = 'rgba(229, 9, 20, 0.25)';
      ctx.lineWidth = 1.5;
      for (let r = 40; r <= radius; r += 45) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.stroke();

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, angle, angle + 0.4);
      ctx.closePath();
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius);
      grad.addColorStop(0, 'rgba(229, 9, 20, 0.4)');
      grad.addColorStop(1, 'rgba(229, 9, 20, 0)');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();

      const blips = [
        { x: cx + Math.cos(angle - 0.8) * (radius * 0.7), y: cy + Math.sin(angle - 0.8) * (radius * 0.7) },
        { x: cx - 50, y: cy + 40 },
        { x: cx + 80, y: cy - 60 }
      ];
      blips.forEach((b) => {
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      angle += 0.03;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
${slice(858, 966).replace('() => setShowBadgeModal(true)', 'onForgeBadge')}
  );
}
`);

write('src/components/Planning.jsx', `import { MapPin, Radio } from 'lucide-react';

export default function Planning() {
  return (
${slice(969, 1069)}
  );
}
`);

write('src/components/Blueprint.jsx', `import { useState } from 'react';
import { tracks } from '../data/tracks';

export default function Blueprint({ playSynthSound }) {
  const [selectedTrack, setSelectedTrack] = useState(0);

  return (
${slice(1072, 1165)}
  );
}
`);

write('src/components/Vault.jsx', `import { useRef, useState } from 'react';
import { Award, CheckCircle2, Lock, Unlock } from 'lucide-react';

export default function Vault({ playSynthSound }) {
  const [isHolding, setIsHolding] = useState(false);
  const [holdingProgress, setHoldingProgress] = useState(0);
  const [vaultUnlocked, setVaultUnlocked] = useState(false);
  const holdIntervalRef = useRef(null);

  const startHolding = () => {
    if (vaultUnlocked) return;
    setIsHolding(true);
    playSynthSound('tick');
    holdIntervalRef.current = setInterval(() => {
      setHoldingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(holdIntervalRef.current);
          setIsHolding(false);
          setVaultUnlocked(true);
          playSynthSound('unlock');
          return 100;
        }
        playSynthSound('tick');
        return prev + 4;
      });
    }, 60);
  };

  const stopHolding = () => {
    if (vaultUnlocked) return;
    setIsHolding(false);
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    setHoldingProgress(0);
  };

  return (
${slice(1168, 1349)}
  );
}
`);

write('src/components/Syndicate.jsx', `import { useMemo, useState } from 'react';
import { Shield } from 'lucide-react';
import { teamDossiers } from '../data/team';

export default function Syndicate({ playSynthSound }) {
  const [teamFilter, setTeamFilter] = useState('all');
  const [flippedCards, setFlippedCards] = useState({});
  const filteredDossiers = useMemo(() => {
    if (teamFilter === 'all') return teamDossiers;
    return teamDossiers.filter((d) => d.dept === teamFilter);
  }, [teamFilter]);

  return (
${slice(1352, 1476)}
  );
}
`);

write('src/components/Intel.jsx', `import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { faqItems } from '../data/faqs';

export default function Intel({ playSynthSound }) {
  const [declassifiedFaqs, setDeclassifiedFaqs] = useState({});

  return (
${slice(1479, 1547)}
  );
}
`);

write('src/components/Escape.jsx', `import { Award, ExternalLink } from 'lucide-react';

export default function Escape({ onForgeBadge }) {
  return (
${slice(1551, 1597).replace('() => setShowBadgeModal(true)', 'onForgeBadge')}
  );
}
`);

write('src/components/Footer.jsx', `export default function Footer({ onBellaCiao }) {
  return (
${slice(1600, 1620).replace(/onClick=\{\(\) => \{\s*setBellaCiaoMode\(true\);[\s\S]*?\}\}/, 'onClick={onBellaCiao}')}
  );
}
`);

write('src/components/BadgeModal.jsx', `import { useState } from 'react';
import { Key, X } from 'lucide-react';

export default function BadgeModal({ open, onClose, playSynthSound }) {
  const [recruitName, setRecruitName] = useState('');
  const [recruitRole, setRecruitRole] = useState('CYBER_INFILTRATOR');
  const [generatedBadge, setGeneratedBadge] = useState(null);

  if (!open) return null;

  const handleGenerateBadge = (e) => {
    e.preventDefault();
    if (!recruitName.trim()) return;
    const badgeId = 'HH3-' + Math.floor(1000 + Math.random() * 9000);
    setGeneratedBadge({
      id: badgeId,
      name: recruitName.toUpperCase(),
      role: recruitRole,
      date: 'MARCH 28-29, 2026',
      authKey: '0x' + Math.random().toString(16).substr(2, 8).toUpperCase()
    });
    playSynthSound('unlock');
  };

  return (
${slice(1624, 1726)
  .replace('() => setShowBadgeModal(false)', 'onClose')
  .replace('() => setGeneratedBadge(null)', '() => setGeneratedBadge(null)')}
  );
}
`);

write('src/App.jsx', `import { useCallback, useEffect, useRef, useState } from 'react';
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
      <Vault playSynthSound={playSynthSound} />
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
`);

write('src/main.jsx', `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
`);

write('index.html', `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hack Heist 3.0</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`);

write('package.json', `{
  "name": "hack-heist",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.460.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.16",
    "vite": "^5.4.11"
  }
}
`);

write('vite.config.js', `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`);

write('tailwind.config.js', `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {} },
  plugins: [],
};
`);

write('postcss.config.js', `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`);

write('.gitignore', `node_modules
dist
.DS_Store
`);

console.log('wrote project files');
