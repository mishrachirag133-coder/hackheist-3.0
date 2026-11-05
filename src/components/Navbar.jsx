import { ExternalLink, Play, Volume2, VolumeX } from 'lucide-react';

export default function Navbar({ onReplay, onLogoClick, soundEnabled, onToggleSound }) {
  return (
<header className="sticky top-0 z-40 bg-[#08090a]/95 backdrop-blur-md border-b border-neutral-800/80 px-4 md:px-10 py-3.5 flex items-center justify-between">
  <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onLogoClick()}>
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
        onReplay();
      }}
      title="Replay Video Briefing"
      className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 text-xs font-semibold rounded flex items-center space-x-1.5 transition"
    >
      <Play className="w-3.5 h-3.5 text-red-500 fill-red-500" />
      <span className="hidden sm:inline">Replay Intro</span>
    </button>

    {/* Sound Synthesizer Toggle */}
    {/* <button
      onClick={onToggleSound}
      className={`p-2 border rounded text-xs transition ${
        soundEnabled 
          ? 'bg-red-600/20 border-red-500 text-red-400 shadow-[0_0_10px_rgba(229,9,20,0.3)]' 
          : 'bg-neutral-900 border-neutral-700 text-neutral-400 hover:text-white'
      }`}
      title={soundEnabled ? "Mute Heist SFX" : "Enable Heist Sound FX"}
    >
      {soundEnabled ? <Volume2 className="w-4 h-4 text-red-500" /> : <VolumeX className="w-4 h-4" />}
    </button> */}

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
  );
}
