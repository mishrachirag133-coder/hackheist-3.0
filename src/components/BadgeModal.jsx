import { useState } from 'react';
import { Key, X } from 'lucide-react';

export default function BadgeModal({ open, onClose }) {
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
  };

  return (
  <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
    <div className="bg-[#111216] border border-red-600/60 w-full max-w-lg p-6 sm:p-8 rounded-lg shadow-[0_0_50px_rgba(229,9,20,0.4)] relative">
      
      <button 
        onClick={onClose}
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
              onClick={onClose}
              className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded border border-red-500"
            >
              Proceed To Vault
            </button>
          </div>
        </div>
      )}

    </div>
  </div>
  );
}
