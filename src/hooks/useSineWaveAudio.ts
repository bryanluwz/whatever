import { useCallback, useEffect, useRef, useState } from 'react';

export const useSineWaveAudio = (initialFrequency = 440) => {
  const [frequency, setFrequency] = useState(initialFrequency);
  const [isPlaying, setIsPlaying] = useState(false);

  const contextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const frequencyRef = useRef(initialFrequency);

  const play = useCallback(async (duration?: number) => {
    let context = contextRef.current;

    if (!context || context.state === 'closed') {
      context = new AudioContext();
      contextRef.current = context;
    }

    await context.resume();

    // Stop the previous oscillator if one exists.
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
    }

    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = frequencyRef.current;
    gain.gain.value = 0.15;

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();

    if (duration) oscillator.stop(context.currentTime + duration / 1000);

    oscillatorRef.current = oscillator;
    gainRef.current = gain;
    setIsPlaying(true);
  }, []);

  const stop = useCallback(() => {
    const context = contextRef.current;
    const oscillator = oscillatorRef.current;
    const gain = gainRef.current;

    if (!context || !oscillator || !gain) return;

    const now = context.currentTime;

    gain.gain.cancelScheduledValues(now);
    gain.gain.setTargetAtTime(0, now, 0.02);
    oscillator.stop(now + 0.1);

    oscillatorRef.current = null;
    gainRef.current = null;
    setIsPlaying(false);
  }, []);

  const changeFrequency = useCallback((nextFrequency: number) => {
    frequencyRef.current = nextFrequency;
    setFrequency(nextFrequency);

    const context = contextRef.current;
    const oscillator = oscillatorRef.current;

    if (context && oscillator && context.state !== 'closed') {
      oscillator.frequency.setTargetAtTime(nextFrequency, context.currentTime, 0.05);
    }
  }, []);

  useEffect(() => {
    return () => {
      const oscillator = oscillatorRef.current;

      if (oscillator) {
        try {
          oscillator.stop();
        } catch {
          // It may already have stopped.
        }
      }

      void contextRef.current?.close();
    };
  }, []);

  return {
    frequency,
    isPlaying,
    play,
    stop,
    changeFrequency,
  };
};
