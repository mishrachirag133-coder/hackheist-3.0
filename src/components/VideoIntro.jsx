import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const VIDEO_SRC = '/final_video.mp4';

export default function VideoIntro({ onEnter }) {
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
  <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
    <video 
      ref={videoRef}
      src={VIDEO_SRC}
      autoPlay
      playsInline
      muted={videoMuted}
      onEnded={() => {
        onEnter();
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
          onEnter();
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
  );
}
