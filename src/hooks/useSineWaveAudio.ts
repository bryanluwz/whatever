import { useCallback, useEffect, useRef, useState } from 'react';

export const useSineWaveAudio = (initialFrequency = 440) => {
  const [frequency, setFrequency] = useState(initialFrequency);
  const [isPlaying, setIsPlaying] = useState(false);

  const contextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const frequencyRef = useRef(initialFrequency);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stop = useCallback(() => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

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

  const play = useCallback(
    async (duration?: number, resetTimeoutWhenChangeFrequency = false) => {
      // Reset previous timeout
      if (resetTimeoutWhenChangeFrequency && timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      let context = contextRef.current;

      if (!context || context.state === 'closed') {
        context = new AudioContext();
        contextRef.current = context;
      }

      await context.resume();

      let oscillator = oscillatorRef.current;
      let gain = gainRef.current;

      if (!oscillator || !gain) {
        oscillator = context.createOscillator();
        gain = context.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.value = frequencyRef.current;
        gain.gain.value = 0.15;

        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start();

        oscillatorRef.current = oscillator;
        gainRef.current = gain;
      }

      setIsPlaying(true);

      if (duration !== undefined && resetTimeoutWhenChangeFrequency) {
        timeoutRef.current = setTimeout(stop, duration);
      }
    },
    [stop]
  );

  const changeFrequency = useCallback((nextFrequency: number) => {
    if (nextFrequency <= 0) return;

    frequencyRef.current = nextFrequency;
    setFrequency(nextFrequency);

    const context = contextRef.current;
    const oscillator = oscillatorRef.current;

    if (context && oscillator && context.state !== 'closed') {
      const now = context.currentTime;

      oscillator.frequency.exponentialRampToValueAtTime(nextFrequency, now + 0.01);
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
