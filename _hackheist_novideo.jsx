import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Terminal, Shield, Lock, Unlock, Play, Volume2, VolumeX, Eye, 
  Flame, MapPin, Users, Award, HelpCircle, FileText, ExternalLink, 
  Sparkles, CheckCircle2, ChevronDown, ChevronRight, X, AlertTriangle, 
  Crosshair, Radio, RefreshCw, Download, Zap, Key, Clock, DollarSign,
  Compass, Cpu, Layers, Database, Globe, Smartphone, Server
} from 'lucide-react';

const VIDEO_SRC = "/final_video.mp4";

export default function App() {
  // Navigation & Phase State
  const [activePhase, setActivePhase] = useState('recruitment');
  const [introPhase, setIntroPhase] = useState('terminal'); // 'terminal' | 'video' | 'app'
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);

  // Terminal Loader State
  const [terminalIndex, setTerminalIndex] = useState(0);
  const [terminalProgress, setTerminalProgress] = useState(0);

  // Bomb Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 28, hours: 14, mins: 32, secs: 45, ms: 88 });

  // Vault "Hold to Authenticate" State
  const [isHolding, setIsHolding] = useState(false);
  const [holdingProgress, setHoldingProgress] = useState(0);
  const [vaultUnlocked, setVaultUnlocked] = useState(false);
  const holdIntervalRef = useRef(null);

  // Tracks State
  const [selectedTrack, setSelectedTrack] = useState(0);

  // FAQ Declassified State
  const [declassifiedFaqs, setDeclassifiedFaqs] = useState({});

  // Team Dossier Filter State
  const [teamFilter, setTeamFilter] = useState('all');
  const [flippedCards, setFlippedCards] = useState({});

  // Modal & Badge Generator
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [recruitName, setRecruitName] = useState('');
  const [recruitRole, setRecruitRole] = useState('CYBER_INFILTRATOR');
  const [generatedBadge, setGeneratedBadge] = useState(null);

  // Easter Eggs
  const [bellaCiaoMode, setBellaCiaoMode] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const konamiSequence = useRef([]);

  // Mouse Cursor Coordinates
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  // Video Reference
  const videoRef = useRef(null);
  const radarCanvasRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Audio Synthesizer (Web Audio API)
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtxRef.current = new AudioContext();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playSynthSound = (type) => {
    if (!soundEnabled) return;
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
  };

  // Terminal Lines
  const terminalLines = useMemo(() => [
    { text: "#EE50914 -- error warning", color: "text-red-500 font-bold" },
    { text: "import network_security", color: "text-amber-400" },
    { text: "#E50914 error warning", color: "text-red-500 font-bold" },
    { text: "def bypass_firewall():", color: "text-blue-400 font-semibold" },
    { text: "    try:", color: "text-amber-400" },
    { text: '        vault_lock = decrypt_system_key("0x7F2B")', color: "text-neutral-300" },
    { text: "        if vault_lock.status == 'LOCKED':", color: "text-neutral-300" },
    { text: "            inject_exploit_sequence()", color: "text-emerald-400" },
    { text: '            print("[SUCCESS] SYSTEM OVERRIDE INITIATED")', color: "text-emerald-400 font-bold" },
    { text: "    except AccessDenied:", color: "text-red-400" },
    { text: '        print("[ALERT] ALERT LEVEL RAISED")', color: "text-red-400" },
    { text: "        retry_sequence(nodes=128)", color: "text-yellow-400" },
    { text: "THE PROFESSOR: Recruit identified. Target: MIET Mainframe.", color: "text-red-500 font-bold tracking-wider" },
    { text: "COMMENCING HEIST EXECUTION SEQUENCE...", color: "text-emerald-400 font-bold animate-pulse" }
  ], []);

  // Run Terminal Typing Effect
  useEffect(() => {
    if (introPhase !== 'terminal') return;
    
    if (terminalIndex < terminalLines.length) {
      const timer = setTimeout(() => {
        setTerminalIndex(prev => prev + 1);
        const pct = Math.round(((terminalIndex + 1) / terminalLines.length) * 100);
        setTerminalProgress(pct);
        playSynthSound('type');
      }, 240);
      return () => clearTimeout(timer);
    } else {
      const transitionTimer = setTimeout(() => {
        setIntroPhase('video');
        playSynthSound('alarm');
      }, 450);
      return () => clearTimeout(transitionTimer);
    }
  }, [terminalIndex, introPhase, terminalLines]);

  // Video Autoplay & Handling
  useEffect(() => {
    if (introPhase === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log('Video autoplay handled:', err);
        });
      }
    }
  }, [introPhase]);

  // Live Bomb Countdown Timer (Target: March 28, 2026)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, mins, secs, ms } = prev;
        ms -= 4;
        if (ms < 0) {
          ms = 99;
          secs -= 1;
        }
        if (secs < 0) {
          secs = 59;
          mins -= 1;
        }
        if (mins < 0) {
          mins = 59;
          hours -= 1;
        }
        if (hours < 0) {
          hours = 23;
          days -= 1;
        }
        return { days, hours, mins, secs, ms };
      });
    }, 40);
    return () => clearInterval(timer);
  }, []);

  // Custom Cursor Movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      const target = e.target;
      if (target.closest('button, a, input, select, [data-interactive="true"]')) {
        setIsHoveringClickable(true);
      } else {
        setIsHoveringClickable(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Konami Code Detection
  useEffect(() => {
    const handleKeyDown = (e) => {
      const expected = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
        'b', 'a'
      ];
      konamiSequence.current.push(e.key.toLowerCase());
      if (konamiSequence.current.length > expected.length) {
        konamiSequence.current.shift();
      }
      if (konamiSequence.current.join(',') === expected.map(k => k.toLowerCase()).join(',')) {
        setBellaCiaoMode(true);
        playSynthSound('bellaciao');
        triggerMoneyRain();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Money Rain Confetti Trigger
  const triggerMoneyRain = () => {
    playSynthSound('unlock');
    const items = ['💵', '💶', '💰', '💸', '🪙', '💎'];
    const newConfetti = Array.from({ length: 40 }).map((_, i) => ({
      id: Date.now() + i,
      icon: items[Math.floor(Math.random() * items.length)],
      left: Math.random() * 100,
      animDuration: 1.5 + Math.random() * 2,
      size: 20 + Math.random() * 24
    }));
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 3500);
  };

  // 3D Canvas Radar Animation
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

      // Draw concentric vault rings
      ctx.strokeStyle = 'rgba(229, 9, 20, 0.25)';
      ctx.lineWidth = 1.5;
      for (let r = 40; r <= radius; r += 45) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.stroke();

      // Sweeping radar beam
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

      // Target blips
      const blips = [
        { x: cx + Math.cos(angle - 0.8) * (radius * 0.7), y: cy + Math.sin(angle - 0.8) * (radius * 0.7) },
        { x: cx - 50, y: cy + 40 },
        { x: cx + 80, y: cy - 60 }
      ];
      blips.forEach(b => {
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

  // "Hold to Authenticate" Handlers
  const startHolding = () => {
    if (vaultUnlocked) return;
    initAudio();
    setIsHolding(true);
    playSynthSound('tick');

    holdIntervalRef.current = setInterval(() => {
      setHoldingProgress(prev => {
        if (prev >= 100) {
          clearInterval(holdIntervalRef.current);
          setIsHolding(false);
          setVaultUnlocked(true);
          playSynthSound('unlock');
          triggerMoneyRain();
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

  // Track Data
  const tracks = [
    {
      id: "ai-ml",
      code: "TRK-01",
      title: "Neural Infiltration",
      category: "Artificial Intelligence & LLMs",
      icon: Cpu,
      bounty: "₹3,50,000 In Prizes & Bounties",
      desc: "Train autonomous LLM agent swarms, build zero-shot vision exploits, and develop predictive threat intelligence for high-stakes decentralized environments.",
      stack: ["PyTorch", "Gemini API", "LangChain", "FastAPI", "VectorDB"],
      mission: "Bypass algorithmic firewalls and automate defense decisions with high-speed agentic loops."
    },
    {
      id: "web3",
      code: "TRK-02",
      title: "The Decentralized Ledger",
      category: "Web3, Blockchain & ZK",
      icon: Layers,
      bounty: "₹3,00,000 In Prizes & Grants",
      desc: "Architect tamper-proof smart contracts, zero-knowledge anonymity protocols, and frictionless peer-to-peer asset transfer channels.",
      stack: ["Solidity", "Ethers.js", "Polygon", "The Graph", "Foundry"],
      mission: "Construct an untraceable digital getaway tunnel using zero-knowledge cryptographic proofs."
    },
    {
      id: "cloud",
      code: "TRK-03",
      title: "Mainframe Infrastructure",
      category: "Cloud Architecture & DevOps",
      icon: Server,
      bounty: "₹2,50,000 In GCP Credits & Cash",
      desc: "Deploy bulletproof microservices, self-healing Kubernetes clusters, and low-latency serverless pipelines that never crash under heavy traffic.",
      stack: ["Google Cloud Platform", "Kubernetes", "Docker", "Terraform", "Go"],
      mission: "Keep the heist command-and-control server online across distributed global clusters."
    },
    {
      id: "spatial",
      code: "TRK-04",
      title: "Virtual Reconnaissance",
      category: "AR / VR & Spatial Computing",
      icon: Compass,
      bounty: "₹2,00,000 In Bounties",
      desc: "Map the physical vault in interactive 3D, simulate hostage scenarios, and create spatial interfaces for remote tactical coordination.",
      stack: ["Three.js", "WebXR", "Blender", "React Three Fiber", "GLSL"],
      mission: "Render an interactive 1:1 holographic twin of the target venue for real-time surveillance."
    },
    {
      id: "iot",
      code: "TRK-05",
      title: "Physical Hardware Bypass",
      category: "IoT & Embedded Systems",
      icon: Zap,
      bounty: "₹2,00,000 In Kits & Bounties",
      desc: "Hack biometric readers, interface with microcontroller sensors, and build wireless relay beacons for covert field transmission.",
      stack: ["ESP32", "Arduino", "Raspberry Pi", "MQTT", "C++"],
      mission: "Disable laser tripwires and physical vault lock electromagnets using hardware interrupts."
    },
    {
      id: "wildcard",
      code: "TRK-06",
      title: "The Wildcard Heist",
      category: "Open Innovation & Social Impact",
      icon: Flame,
      bounty: "₹2,50,000 In Cash & Swag",
      desc: "Have a radical idea that breaks existing paradigms? Disrupt healthcare, finance, climate tech, or public infrastructure with unconstrained code.",
      stack: ["React", "Python", "Node.js", "Flutter", "TailwindCSS"],
      mission: "Execute an audacious solution for pressing civic and economic challenges."
    }
  ];

  // Team Dossier Data
  const teamDossiers = [
    {
      codename: "THE PROFESSOR",
      realName: "Tanishq Taliyan",
      role: "Lead Mastermind & GDG Organizer",
      dept: "lead",
      bounty: "€1,500,000",
      skills: ["Strategic Architecture", "Event Direction", "AI Systems", "Security"],
      bio: "Calculates every contingency. Directs the Hack Heist mainframe with military precision."
    },
    {
      codename: "TOKYO",
      realName: "Srishti Ruhal",
      role: "Infiltration Architect & GDG Lead",
      dept: "lead",
      bounty: "€1,200,000",
      skills: ["Rapid Deployment", "Community Dynamics", "System Design"],
      bio: "Fierce, relentless execution. Breaches through logistical roadblocks without hesitation."
    },
    {
      codename: "BERLIN",
      realName: "Harsh Mavi",
      role: "Operations Commander",
      dept: "lead",
      bounty: "€1,000,000",
      skills: ["Execution Oversight", "Team Command", "Risk Mitigation"],
      bio: "Unshakable elegance under pressure. Ensures 36 hours run strictly according to plan."
    },
    {
      codename: "RIO",
      realName: "Arpan Singh",
      role: "Technical Head // Cyber Warfare",
      dept: "tech",
      bounty: "€950,000",
      skills: ["Full-Stack Architecture", "DevOps", "Database Sharding"],
      bio: "Young prodigy behind the portal code, API gateways, and breach security checks."
    },
    {
      codename: "DENVER",
      realName: "Hardik Dhawan",
      role: "Technical Head // Infrastructure",
      dept: "tech",
      bounty: "€850,000",
      skills: ["Cloud Deployment", "Kubernetes", "Linux Hardening"],
      bio: "Pure mechanical power. Keeps server infrastructure stable during thousands of concurrent requests."
    },
    {
      codename: "HELSINKI",
      realName: "Chirag Mishra",
      role: "Technical Head // Core Systems",
      dept: "tech",
      bounty: "€800,000",
      skills: ["Backend Engineering", "Platform Scaling", "Security Auditing"],
      bio: "The heavy artillery. Resolves catastrophic bugs and network breaches in seconds."
    },
    {
      codename: "NAIROBI",
      realName: "Khushbu Rawat",
      role: "Content & Propaganda Head",
      dept: "creative",
      bounty: "€900,000",
      skills: ["Narrative Direction", "Brand Identity", "Copywriting"],
      bio: "Controls the narrative. Forges the visual words that rally 500+ hackers into action."
    },
    {
      codename: "STOCKHOLM",
      realName: "Anshika Malik",
      role: "Socials & Signal Interceptor",
      dept: "pr",
      bounty: "€750,000",
      skills: ["Signal Broadcasting", "Social Warfare", "PR Amplification"],
      bio: "Monitors the airwaves. Broadcasts the heist message across every digital channel."
    }
  ];

  // FAQs
  const faqItems = [
    {
      q: "Who is eligible to participate in Hack Heist 3.0?",
      a: "Any university student, developer, designer, or tech enthusiast across India is eligible. Whether you are in your 1st year or final year, beginner or expert hacker, everyone is invited to join the heist.",
      redacted: "██████ ANY UNIVERSITY STUDENT OR DEVELOPER ██████ ZERO EXPERIENCE REQUIRED ██████ ALL DOMAINS WELCOME ██████"
    },
    {
      q: "What is the team size limit?",
      a: "Teams can consist of 2 to 4 members. You can form your own syndicate beforehand or find teammates on our official Discord server before the breach.",
      redacted: "██████ 2 TO 4 MEMBERS PER CREW ██████ LONE WOLVES CAN TEAM UP ON DISCORD ██████"
    },
    {
      q: "What are the registration fees?",
      a: "₹0. Zero registration fees. Hack Heist 3.0 is a 100% free community hackathon organized by GDG On Campus MIET in collaboration with GDG Cloud Noida.",
      redacted: "██████ ABSOLUTELY FREE ██████ 100% COMMUNITY FUNDED ██████ NO HIDDEN CHARGES ██████"
    },
    {
      q: "Will food and accommodation be provided at MIET?",
      a: "Yes! All selected participants get free on-site meals, midnight pizzas, snacks, unlimited coffee/Red Bull, and secure resting lounges during the entire 36-hour hackathon.",
      redacted: "██████ 36 HOURS OF NON-STOP HOT MEALS ██████ MIDNIGHT ENERGY RATIONS ██████ REST LOUNGES INCLUDED ██████"
    },
    {
      q: "What should we bring to the venue?",
      a: "Bring your laptop, chargers, extension cords, college ID card, any specialized hardware (if competing in IoT track), and your hacker mindset.",
      redacted: "██████ LAPTOP + CHARGERS ██████ OFFICIAL STUDENT ID ██████ RELENTLESS INTELLECT ██████"
    },
    {
      q: "How will project evaluations be conducted?",
      a: "Projects will be judged by an elite panel of Google Developer Experts, industry leaders, and startup founders based on innovation, technical complexity, real-world utility, and pitch presentation.",
      redacted: "██████ EVALUATION BY GDE EXPERTS ██████ WORKING PROTOTYPE REQUIRED ██████ OBJECTIVE SCORING ██████"
    }
  ];

  // Filtered Dossiers
  const filteredDossiers = useMemo(() => {
    if (teamFilter === 'all') return teamDossiers;
    return teamDossiers.filter(d => d.dept === teamFilter);
  }, [teamFilter, teamDossiers]);

  // Handle Badge Download Simulation
  const handleGenerateBadge = (e) => {
    e.preventDefault();
    if (!recruitName.trim()) return;
    const badgeId = "HH3-" + Math.floor(1000 + Math.random() * 9000);
    setGeneratedBadge({
      id: badgeId,
      name: recruitName.toUpperCase(),
      role: recruitRole,
      date: "MARCH 28-29, 2026",
      authKey: "0x" + Math.random().toString(16).substr(2, 8).toUpperCase()
    });
    playSynthSound('unlock');
  };

  return (
    <div className="min-h-screen bg-[#08090a] text-neutral-200 font-mono select-none relative overflow-x-hidden">
      
      {/* Custom Styles */}
      <style>{`
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
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>

      {/* Laser Crosshair Custom Cursor */}
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

      {/* Money Rain Confetti Layer */}
      {confetti.length > 0 && (
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
      )}

      {/* 1. TERMINAL INTRO OVERLAY */}
      {introPhase === 'terminal' && (
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
                onClick={() => setIntroPhase('video')}
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
      )}

      {/* 2. FULLSCREEN VIDEO CINEMATIC */}
      {introPhase === 'video' && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
          <video 
            ref={videoRef}
            src={VIDEO_DATA_URI}
            autoPlay
            playsInline
            muted={videoMuted}
            onEnded={() => {
              playSynthSound('unlock');
              setIntroPhase('app');
            }}
            className="w-full h-full object-cover"
          />

          {/* Video Control Overlays */}
          <div className="absolute top-6 right-6 flex items-center space-x-3 z-30">
            <button
              onClick={() => setVideoMuted(!videoMuted)}
              className="px-4 py-2 bg-black/70 hover:bg-black text-neutral-300 hover:text-white border border-neutral-700 rounded text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition"
            >
              {videoMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              <span>{videoMuted ? "Unmute Audio" : "Muted"}</span>
            </button>
            <button
              onClick={() => {
                playSynthSound('unlock');
                setIntroPhase('app');
              }}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white border border-red-500 text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(229,9,20,0.6)] transition"
            >
              Enter Mainframe &gt;&gt;
            </button>
          </div>

          <div className="absolute bottom-6 left-6 z-30 bg-black/60 backdrop-blur-sm px-4 py-2 border-l-2 border-red-600 text-xs text-neutral-300">
            <span className="text-red-500 font-bold uppercase tracking-widest mr-2">Cinematic Briefing</span>
            <span>Target: MIET Mainframe Vault // Code: 3.0</span>
          </div>
        </div>
      )}

      {/* 3. MAIN HEIST WEB APPLICATION */}
      
      {/* Scanline CRT overlay */}
      <div className="fixed inset-0 pointer-events-none z-30 scanlines opacity-60"></div>

      {/* Bella Ciao Konami Mode Banner */}
      {bellaCiaoMode && (
        <div className="bg-red-600 text-white font-bold py-2 px-4 text-center text-xs tracking-widest uppercase flex items-center justify-center space-x-4 z-40 sticky top-0 shadow-[0_0_30px_#e50914]">
          <span className="animate-spin">🎭</span>
          <span>BELLA CIAO MODE ACTIVATED // UNLIMITED HACKER CONFETTI UNLOCKED!</span>
          <span className="animate-spin">🎭</span>
          <button 
            onClick={() => setBellaCiaoMode(false)}
            className="ml-4 text-xs underline uppercase"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#08090a]/95 backdrop-blur-md border-b border-neutral-800/80 px-4 md:px-10 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => triggerMoneyRain()}>
          <div className="w-9 h-9 rounded bg-red-600 flex items-center justify-center font-black text-black text-xl shadow-[0_0_15px_rgba(229,9,20,0.6)]">
            H3
          </div>
          <div>
            <div className="text-white font-black text-base tracking-wider flex items-center space-x-1.5">
              <span>HACK HEIST</span>
              <span className="text-red-500 text-xs px-1.5 py-0.5 bg-red-950/60 border border-red-600/40 rounded">3.0</span>
            </div>
            <div className="text-[10px] text-neutral-400 tracking-wider">
              GDG ON CAMPUS MIET MEERUT
            </div>
          </div>
        </div>

        {/* Phase Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs uppercase font-bold tracking-widest text-neutral-400">
          <a href="#recruitment" className="hover:text-red-500 transition">01 // Recruitment</a>
          <a href="#planning" className="hover:text-red-500 transition">02 // Planning</a>
          <a href="#blueprint" className="hover:text-red-500 transition">03 // Blueprint</a>
          <a href="#vault" className="hover:text-red-500 transition">04 // The Vault</a>
          <a href="#syndicate" className="hover:text-red-500 transition">05 // Syndicate</a>
          <a href="#intel" className="hover:text-red-500 transition">06 // Intel</a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {/* Replay Cinematic Intro */}
          <button
            onClick={() => {
              setIntroPhase('video');
            }}
            title="Replay Video Briefing"
            className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 text-xs font-semibold rounded flex items-center space-x-1.5 transition"
          >
            <Play className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span className="hidden sm:inline">Replay Intro</span>
          </button>

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              if (next) {
                initAudio();
                playSynthSound('unlock');
              }
            }}
            className={`p-2 border rounded text-xs transition ${
              soundEnabled 
                ? 'bg-red-600/20 border-red-500 text-red-400 shadow-[0_0_10px_rgba(229,9,20,0.3)]' 
                : 'bg-neutral-900 border-neutral-700 text-neutral-400 hover:text-white'
            }`}
            title={soundEnabled ? "Mute Heist SFX" : "Enable Heist Sound FX"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-red-500" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Primary CTA */}
          <a
            href="https://hack-heist-2.devfolio.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest border border-red-500 shadow-[0_0_20px_rgba(229,9,20,0.4)] transition flex items-center space-x-1.5"
          >
            <span>Devfolio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Floating Dali Mask Money Button */}
      <button
        onClick={() => triggerMoneyRain()}
        title="Loot The Vault (Rain Cash!)"
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 border-2 border-amber-400 text-xl flex items-center justify-center shadow-[0_0_25px_rgba(229,9,20,0.8)] transition transform hover:scale-110 active:scale-95"
      >
        🎭
      </button>

      {/* PHASE 01: RECRUITMENT (HERO) */}
      <section id="recruitment" className="relative min-h-[92vh] flex flex-col justify-center items-center px-6 py-16 text-center overflow-hidden border-b border-neutral-800">
        {/* Radar Background Canvas */}
        <canvas 
          ref={radarCanvasRef}
          width={650}
          height={650}
          className="absolute opacity-25 pointer-events-none"
        />

        {/* Ambient Glows */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          {/* Target Confirmed Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-red-950/40 border border-red-600/50 rounded-full text-[11px] text-red-400 font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span>OPERATION ACTIVE // TARGET: MIET MAINFRAME MEERUT</span>
          </div>

          {/* Main Glitch Title */}
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tight text-white drop-shadow-[0_10px_35px_rgba(229,9,20,0.6)]">
            HACK HEIST <span className="text-red-600">3.0</span>
          </h1>

          <p className="max-w-2xl text-neutral-400 text-sm sm:text-base mt-6 tracking-wide leading-relaxed font-sans font-medium">
            36 Hours of Code, Decryption, and High-Stakes Innovation. Assemble your 4-person crew, breach the mainframe at Meerut Institute of Engineering & Technology, and claim your share of the bounty.
          </p>

          {/* BOMB COUNTDOWN TIMER */}
          <div className="mt-10 w-full max-w-xl bg-neutral-950/90 border border-red-900/60 p-4 sm:p-6 rounded-lg shadow-[0_0_30px_rgba(229,9,20,0.15)] relative">
            <div className="flex items-center justify-between text-[11px] text-red-500 font-bold tracking-widest uppercase mb-3 pb-2 border-b border-neutral-800">
              <span className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
                <span>T-MINUS UNTIL INFILTRATION</span>
              </span>
              <span className="text-neutral-500 font-mono">NODE // MARCH 28-29, 2026</span>
            </div>

            <div className="grid grid-cols-5 gap-2 text-center">
              <div className="bg-[#121317] border border-neutral-800 p-2 sm:p-3 rounded">
                <div className="text-2xl sm:text-4xl font-black text-white font-mono">{String(timeLeft.days).padStart(2, '0')}</div>
                <div className="text-[9px] uppercase tracking-widest text-neutral-500 mt-1">Days</div>
              </div>
              <div className="bg-[#121317] border border-neutral-800 p-2 sm:p-3 rounded">
                <div className="text-2xl sm:text-4xl font-black text-white font-mono">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-[9px] uppercase tracking-widest text-neutral-500 mt-1">Hours</div>
              </div>
              <div className="bg-[#121317] border border-neutral-800 p-2 sm:p-3 rounded">
                <div className="text-2xl sm:text-4xl font-black text-white font-mono">{String(timeLeft.mins).padStart(2, '0')}</div>
                <div className="text-[9px] uppercase tracking-widest text-neutral-500 mt-1">Mins</div>
              </div>
              <div className="bg-[#121317] border border-neutral-800 p-2 sm:p-3 rounded">
                <div className="text-2xl sm:text-4xl font-black text-red-500 font-mono">{String(timeLeft.secs).padStart(2, '0')}</div>
                <div className="text-[9px] uppercase tracking-widest text-neutral-500 mt-1">Secs</div>
              </div>
              <div className="bg-[#121317] border border-neutral-800 p-2 sm:p-3 rounded border-red-600/30">
                <div className="text-2xl sm:text-4xl font-black text-amber-400 font-mono">{String(timeLeft.ms).padStart(2, '0')}</div>
                <div className="text-[9px] uppercase tracking-widest text-neutral-500 mt-1">MS</div>
              </div>
            </div>
          </div>

          {/* Hero Action CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
              href="https://hack-heist-2.devfolio.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold tracking-widest uppercase text-xs border border-red-500 shadow-[0_0_25px_rgba(229,9,20,0.5)] transition"
            >
              Apply With Devfolio
            </a>
            <button
              onClick={() => setShowBadgeModal(true)}
              className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 hover:text-amber-300 font-bold tracking-widest uppercase text-xs border border-amber-500/40 transition flex items-center space-x-2"
            >
              <Key className="w-4 h-4 text-amber-400" />
              <span>Forge Recruit ID</span>
            </button>
            <a
              href="#blueprint"
              className="px-6 py-3.5 bg-transparent hover:bg-neutral-900 text-neutral-300 font-bold tracking-widest uppercase text-xs border border-neutral-700 transition"
            >
              View Blueprint
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl mt-12 pt-8 border-t border-neutral-800/80 text-left">
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-widest">Prize Pool</div>
              <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono mt-0.5">₹2,000,000+</div>
            </div>
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-widest">Duration</div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">36H SPRINT</div>
            </div>
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-widest">Recruits</div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">500+ HACKERS</div>
            </div>
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-widest">Entry Fee</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-0.5">100% FREE</div>
            </div>
          </div>
        </div>
      </section>

      {/* PHASE 02: PLANNING (ABOUT) */}
      <section id="planning" className="py-20 px-6 md:px-12 border-b border-neutral-800 bg-[#0a0b0d]">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] flex items-center space-x-2 mb-2">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                <span>PHASE 02 // TACTICAL PLANNING</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
                The Heist Blueprint &amp; Protocol
              </h2>
            </div>
            <div className="text-xs text-neutral-500 font-mono mt-4 md:mt-0">
              LOCATION: MIET MEERUT // N.H. 58 DELHI-ROORKEE HIGHWAY
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* The Professor's Briefing Box */}
            <div className="lg:col-span-2 bg-neutral-950 border border-neutral-800 p-6 sm:p-8 rounded-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-600/10 border-l border-b border-red-600/30 px-3 py-1 text-[10px] text-red-400 font-bold tracking-widest uppercase">
                CONFIDENTIAL INTEL
              </div>

              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-500 flex items-center justify-center text-red-500">
                  <Radio className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm tracking-wider">AUDIO TRANSMISSION: THE PROFESSOR</div>
                  <div className="text-[11px] text-neutral-500">FREQUENCY: 142.85 MHz // ENCRYPTED</div>
                </div>
              </div>

              <blockquote className="text-neutral-300 text-sm leading-relaxed border-l-2 border-red-600 pl-4 py-1 italic font-sans">
                "Welcome to the plan, recruit. You are stepping onto the grounds of Meerut Institute of Engineering &amp; Technology for 36 non-stop hours. Last year was just reconnaissance. This year, we execute. No recycled templates. No pre-written code. You arrive with your crew, decrypt the problem statement, and build an unstoppable prototype. The vault holds bounties, cloud grants, and venture eyes. Stick to the plan, and everyone leaves legendary."
              </blockquote>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-neutral-800 text-xs">
                <div className="bg-[#111215] p-3.5 rounded border border-neutral-800">
                  <div className="text-red-500 font-bold uppercase tracking-wider mb-1">01. Assemble Crew</div>
                  <div className="text-neutral-400 text-[11px]">2 to 4 members. Cross-domain synergy (dev + design + pitch) increases survival rate.</div>
                </div>
                <div className="bg-[#111215] p-3.5 rounded border border-neutral-800">
                  <div className="text-amber-400 font-bold uppercase tracking-wider mb-1">02. 36H Mainframe</div>
                  <div className="text-neutral-400 text-[11px]">On-site overnight coding sprint at MIET. Zero sleep, unlimited caffeine &amp; snacks.</div>
                </div>
                <div className="bg-[#111215] p-3.5 rounded border border-neutral-800">
                  <div className="text-emerald-400 font-bold uppercase tracking-wider mb-1">03. Loot The Bounty</div>
                  <div className="text-neutral-400 text-[11px]">Demonstrate working build to industry judges. Cash prizes, GCP vouchers, and jobs.</div>
                </div>
              </div>
            </div>

            {/* Venue & Organizer Dossier */}
            <div className="bg-neutral-950 border border-neutral-800 p-6 rounded-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 text-xs font-bold text-red-500 uppercase tracking-widest mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>The Target Venue</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">MIET Meerut</h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans mb-4">
                  Meerut Institute of Engineering &amp; Technology (N.H. 58, Delhi-Roorkee Highway, Baghpat Bypass Road Crossing, Meerut, UP 250005).
                </p>
                <div className="space-y-2 text-xs text-neutral-300 font-mono">
                  <div className="flex justify-between py-1 border-b border-neutral-800">
                    <span className="text-neutral-500">ORGANIZED BY:</span>
                    <span className="text-red-400 font-bold">GDG On Campus MIET</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-800">
                    <span className="text-neutral-500">IN ALLIANCE WITH:</span>
                    <span className="text-neutral-300">GDG Cloud Noida</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-800">
                    <span className="text-neutral-500">EVENT MODE:</span>
                    <span className="text-emerald-400 font-bold">36H On-Site Sprint</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-neutral-500">MEALS &amp; STAY:</span>
                    <span className="text-amber-400 font-bold">100% Free / Hosted</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800">
                <a
                  href="https://maps.google.com/?q=Meerut+Institute+of+Engineering+and+Technology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-bold uppercase tracking-wider rounded text-center block text-neutral-300 hover:text-white transition"
                >
                  View Coordinates on Map &gt;&gt;
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PHASE 03: THE BLUEPRINT (TRACKS) */}
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

      {/* PHASE 04: THE VAULT (PRIZES - "HOLD TO AUTHENTICATE") */}
      <section id="vault" className="py-20 px-6 md:px-12 border-b border-neutral-800 bg-[#07080a]">
        <div className="max-w-5xl mx-auto text-center">
          
          <div className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] flex items-center justify-center space-x-2 mb-2">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
            <span>PHASE 04 // THE VAULT (HOLD TO AUTHENTICATE)</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Bounty Pool: ₹2,000,000+
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm mt-3 max-w-xl mx-auto font-sans">
            The vault is locked by biometric encryption. Hold down the authentication hub below to override system locks and reveal the loot.
          </p>

          {/* Interactive Vault Scanner Hub */}
          <div className="my-12 flex flex-col items-center justify-center">
            
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* SVG Circular Progress Ring */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="110"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-neutral-900"
                  fill="transparent"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="110"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 110}
                  strokeDashoffset={2 * Math.PI * 110 * (1 - holdingProgress / 100)}
                  className="text-red-600 transition-all duration-75"
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              {/* Center Trigger Button */}
              <div 
                onMouseDown={startHolding}
                onMouseUp={stopHolding}
                onMouseLeave={stopHolding}
                onTouchStart={startHolding}
                onTouchEnd={stopHolding}
                data-interactive="true"
                className={`absolute w-44 h-44 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                  vaultUnlocked 
                    ? 'bg-emerald-600 shadow-[0_0_40px_#10b981]' 
                    : isHolding 
                      ? 'bg-red-700 scale-95 shadow-[0_0_50px_#e50914]' 
                      : 'bg-[#181920] border-4 border-neutral-700 hover:border-red-600 shadow-[0_0_30px_rgba(0,0,0,0.8)]'
                }`}
              >
                {vaultUnlocked ? (
                  <>
                    <Unlock className="w-10 h-10 text-black mb-1 animate-bounce" />
                    <span className="text-black font-black text-xs uppercase tracking-widest">ACCESS GRANTED</span>
                  </>
                ) : (
                  <>
                    <Lock className={`w-8 h-8 mb-1.5 ${isHolding ? 'text-white' : 'text-red-500'}`} />
                    <span className="text-white font-bold text-xs uppercase tracking-wider">
                      {isHolding ? `DECRYPTING ${holdingProgress}%` : "HOLD TO UNLOCK"}
                    </span>
                    <span className="text-[9px] text-neutral-400 mt-1">Press &amp; Hold</span>
                  </>
                )}
              </div>
            </div>

            {/* Instruction status */}
            <div className="mt-4 text-xs font-mono">
              {vaultUnlocked ? (
                <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>VAULT OVERRIDE COMPLETE // ALL PRIZE TIERS ACCESSIBLE</span>
                  <button 
                    onClick={() => {
                      setVaultUnlocked(false);
                      setHoldingProgress(0);
                      playSynthSound('alarm');
                    }}
                    className="ml-3 underline text-neutral-400 hover:text-white"
                  >
                    Lock Vault
                  </button>
                </div>
              ) : (
                <div className="text-neutral-500">
                  {isHolding ? "HOLDING BIOMETRIC OVERRIDE..." : "PRESS & HOLD SCANNER TO TRIGGER NUMBER COUNTER"}
                </div>
              )}
            </div>

          </div>

          {/* Prize Cards Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            {/* 1st Place */}
            <div className={`p-6 rounded-lg border transition-all ${
              vaultUnlocked 
                ? 'bg-amber-950/30 border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.3)]' 
                : 'bg-neutral-950 border-neutral-800'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">1ST PRIZE // THE MASTERMIND</span>
                <Award className="w-6 h-6 text-amber-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                {vaultUnlocked ? "₹1,00,000" : "₹ •••••••"}
              </div>
              <p className="text-xs text-neutral-400 font-sans mt-3 leading-relaxed">
                Direct Cash Grant + Devfolio Golden Pass + 1 Year Cloud Credits + Trophy of the Heist + Exclusive Direct Mentorship.
              </p>
            </div>

            {/* 2nd Place */}
            <div className={`p-6 rounded-lg border transition-all ${
              vaultUnlocked 
                ? 'bg-neutral-900/60 border-neutral-400 shadow-[0_0_20px_rgba(255,255,255,0.15)]' 
                : 'bg-neutral-950 border-neutral-800'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-neutral-300 tracking-widest uppercase">2ND PRIZE // THE INSIDE AGENT</span>
                <Award className="w-6 h-6 text-neutral-300" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                {vaultUnlocked ? "₹60,000" : "₹ ••••••"}
              </div>
              <p className="text-xs text-neutral-400 font-sans mt-3 leading-relaxed">
                Direct Cash Grant + Specialized Sponsor Vouchers + Swag Boxes + Fast-Track Job/Internship Screening.
              </p>
            </div>

            {/* 3rd Place */}
            <div className={`p-6 rounded-lg border transition-all ${
              vaultUnlocked 
                ? 'bg-amber-950/20 border-amber-700/60' 
                : 'bg-neutral-950 border-neutral-800'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-amber-600 tracking-widest uppercase">3RD PRIZE // THE ENFORCER</span>
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                {vaultUnlocked ? "₹40,000" : "₹ ••••••"}
              </div>
              <p className="text-xs text-neutral-400 font-sans mt-3 leading-relaxed">
                Direct Cash Grant + Cloud Deployment Bundles + MIET Trophy + Hacker Merchandise Kits.
              </p>
            </div>

          </div>

          {/* Additional Special Bounties */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-xs text-left">
            <div className="bg-[#101115] p-4 rounded border border-neutral-800">
              <div className="text-red-500 font-bold uppercase tracking-wider mb-1">Tokyo All-Women Award</div>
              <div className="text-xl font-bold text-white font-mono mb-1">{vaultUnlocked ? "₹25,000" : "₹ •••••"}</div>
              <div className="text-neutral-400 text-[11px]">Dedicated prize category for the highest-scoring all-women engineering crew.</div>
            </div>
            <div className="bg-[#101115] p-4 rounded border border-neutral-800">
              <div className="text-amber-400 font-bold uppercase tracking-wider mb-1">Track Category Bounties</div>
              <div className="text-xl font-bold text-white font-mono mb-1">{vaultUnlocked ? "₹5,00,000+" : "₹ •••••••"}</div>
              <div className="text-neutral-400 text-[11px]">Distributed across AI, Web3, Cloud, Spatial, IoT &amp; Open Innovation.</div>
            </div>
            <div className="bg-[#101115] p-4 rounded border border-neutral-800">
              <div className="text-emerald-400 font-bold uppercase tracking-wider mb-1">Cloud Credits &amp; Per-Recruit Swags</div>
              <div className="text-xl font-bold text-white font-mono mb-1">{vaultUnlocked ? "₹12,75,000+" : "₹ ••••••••"}</div>
              <div className="text-neutral-400 text-[11px]">GCP Credits, domain coupons, stickers, badges, and T-shirts for every attendee.</div>
            </div>
          </div>

        </div>
      </section>

      {/* PHASE 05: THE SYNDICATE (WANTED DOSSIER CARDS) */}
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
                    playSynthSound('type');
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
                    playSynthSound('type');
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

      {/* PHASE 06: INTEL FILES & INTERROGATION (CLASSIFIED FAQS) */}
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
                    playSynthSound('type');
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

      {/* PHASE 07: ESCAPE ROUTE (REGISTRATION & CTA) */}
      <section id="escape" className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#0a0b0e] to-black text-center relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/15 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] flex items-center justify-center space-x-2 mb-3">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
            <span>PHASE 07 // THE GETAWAY VAN (REGISTRATION)</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
            Claim Your Spot In The Syndicate
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base mt-4 font-sans leading-relaxed">
            The MIET mainframe doors open on March 28-29, 2026. Only 500 recruits will be cleared for infiltration. Lock in your team's application on Devfolio today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
              href="https://hack-heist-2.devfolio.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-bold tracking-widest uppercase text-sm border border-red-500 shadow-[0_0_30px_rgba(229,9,20,0.6)] transition flex items-center space-x-2"
            >
              <span>Register on Devfolio</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={() => setShowBadgeModal(true)}
              className="px-8 py-4 bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-bold tracking-widest uppercase text-sm border border-amber-500/50 transition flex items-center space-x-2"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Generate Recruit Pass</span>
            </button>
          </div>

          <div className="mt-12 text-xs text-neutral-500 flex flex-wrap items-center justify-center gap-6">
            <span>OFFICIAL INQUIRIES: gdgoncampus@miet.ac.in</span>
            <span>•</span>
            <span>MEERUT INSTITUTE OF ENGINEERING &amp; TECHNOLOGY</span>
            <span>•</span>
            <span>#HACKHEIST3</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 md:px-12 border-t border-neutral-800 bg-[#050506] text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          © 2026 HACK HEIST 3.0 // GDG ON CAMPUS MIET. ALL RIGHTS RESERVED.
        </div>
        <div className="flex items-center space-x-6">
          <a href="#recruitment" className="hover:text-red-500 transition">Back to Top</a>
          <button 
            onClick={() => {
              setBellaCiaoMode(true);
              playSynthSound('bellaciao');
              triggerMoneyRain();
            }}
            className="hover:text-amber-400 transition underline"
          >
            Bella Ciao Mode
          </button>
          <a href="https://devfolio.co/code-of-conduct" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400 transition">
            Code of Conduct
          </a>
        </div>
      </footer>

      {/* MODAL: RECRUIT ID PASS GENERATOR */}
      {showBadgeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111216] border border-red-600/60 w-full max-w-lg p-6 sm:p-8 rounded-lg shadow-[0_0_50px_rgba(229,9,20,0.4)] relative">
            
            <button 
              onClick={() => setShowBadgeModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 text-red-500 font-bold uppercase tracking-widest text-xs mb-4">
              <Key className="w-4 h-4" />
              <span>SECURITY CLEARANCE // FORGE RECRUIT PASS</span>
            </div>

            {!generatedBadge ? (
              <form onSubmit={handleGenerateBadge} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-neutral-400 mb-1">
                    Operative Codename / Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={recruitName}
                    onChange={(e) => setRecruitName(e.target.value)}
                    placeholder="e.g. TOKYO / ARJUN"
                    className="w-full bg-[#181920] border border-neutral-700 focus:border-red-500 px-4 py-2.5 rounded text-white text-sm outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-neutral-400 mb-1">
                    Specialized Role / Domain:
                  </label>
                  <select
                    value={recruitRole}
                    onChange={(e) => setRecruitRole(e.target.value)}
                    className="w-full bg-[#181920] border border-neutral-700 focus:border-red-500 px-4 py-2.5 rounded text-white text-sm outline-none font-mono"
                  >
                    <option value="NEURAL_EXPLOIT_ENGINEER">AI / Neural Exploit Engineer</option>
                    <option value="SMART_CONTRACT_BREACHER">Web3 / Smart Contract Breacher</option>
                    <option value="MAINFRAME_DEVOPS_CHIEF">Cloud Infrastructure Architect</option>
                    <option value="SPATIAL_RECON_AGENT">AR / Spatial Recon Agent</option>
                    <option value="HARDWARE_OVERRIDE_SPECIALIST">IoT / Hardware Bypass Specialist</option>
                    <option value="WILDCARD_MASTERMIND">Wildcard Heist Mastermind</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest text-xs rounded border border-red-500 shadow-[0_0_20px_rgba(229,9,20,0.5)] transition"
                  >
                    Generate Clearance Pass
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                {/* Generated Recruit Card */}
                <div className="bg-[#181922] border-2 border-dashed border-red-500 p-6 rounded-lg my-4 text-left relative overflow-hidden">
                  <div className="flex justify-between items-center text-[10px] text-red-500 font-bold tracking-widest border-b border-neutral-800 pb-2 mb-4">
                    <span>HACK HEIST 3.0 // OFFICIAL PASS</span>
                    <span>MIET MEERUT</span>
                  </div>
                  <div className="text-xs text-neutral-400">OPERATIVE CODENAME:</div>
                  <div className="text-2xl font-black text-white font-mono tracking-wider mb-2">{generatedBadge.name}</div>

                  <div className="text-xs text-neutral-400">DESIGNATION:</div>
                  <div className="text-sm font-bold text-amber-400 font-mono mb-3">{generatedBadge.role}</div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] text-neutral-400 border-t border-neutral-800 pt-3">
                    <div>
                      <span>PASS ID:</span>
                      <span className="text-white font-mono block font-bold">{generatedBadge.id}</span>
                    </div>
                    <div>
                      <span>ENCRYPTED KEY:</span>
                      <span className="text-emerald-400 font-mono block font-bold">{generatedBadge.authKey}</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setGeneratedBadge(null)}
                    className="flex-1 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-bold uppercase tracking-wider text-neutral-300 rounded"
                  >
                    New Pass
                  </button>
                  <button
                    onClick={() => setShowBadgeModal(false)}
                    className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded border border-red-500"
                  >
                    Proceed To Vault
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
