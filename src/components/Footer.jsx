export default function Footer({ onBellaCiao }) {
  return (
<footer className="py-8 px-6 md:px-12 border-t border-neutral-800 bg-[#050506] text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-4">
  <div>
    © 2026 HACK HEIST 3.0 // GDG ON CAMPUS MIET. ALL RIGHTS RESERVED.
  </div>
  <div className="flex items-center space-x-6">
    <a href="#recruitment" className="hover:text-red-500 transition">Back to Top</a>
    <button 
      onClick={onBellaCiao}
      className="hover:text-amber-400 transition underline"
    >
      Bella Ciao Mode
    </button>
    <a href="https://devfolio.co/code-of-conduct" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400 transition">
      Code of Conduct
    </a>
  </div>
</footer>
  );
}
