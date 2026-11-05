import { useCallback, useRef } from 'react';

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
