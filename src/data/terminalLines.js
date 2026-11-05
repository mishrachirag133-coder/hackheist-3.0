export const terminalLines = [
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
];
