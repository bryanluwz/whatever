import { useEffect, useState } from 'react';
import type { SineWaveVisualiserProps } from '../../typings/pages/SoundMemoryPage';

const WAVE_COUNT = 7;
const VIEW_WIDTH = 100;
const VIEW_HEIGHT = 100;

// AI Disclaimer: yes gamxia chatgpt
export const SineWaveVisualiser = ({ frequency, deviation = 100 }: SineWaveVisualiserProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let animationFrame: number;
    let start: number;

    const animate = (time: number) => {
      if (!start) start = time;

      setPhase((time - start) * 0.002);
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const waves = Array.from({ length: WAVE_COUNT }, (_, i) => {
    const offset = (i / (WAVE_COUNT - 1)) * 2 - 1;

    const waveFrequency = Math.max(1, frequency + offset * deviation);

    // Deterministic pseudo-random values per wave
    const random = (seed: number) => {
      const x = Math.sin(seed * 127.1 + i * 311.7) * 4.5453;
      return x - Math.floor(x);
    };

    const cycles = 2 + ((waveFrequency - 200) / 1800) * 6;

    const baseAmplitude = 8 + random(1) * 8;
    const amplitudeSpeed = 0.2 + random(2) * 0.6;
    const amplitudeVariation = 0.2 + random(3) * 0.25;

    const speed = 0.3 + random(4) * 0.8;
    const phaseOffset = random(5) * Math.PI * 2;
    const yOffset = (i - (WAVE_COUNT - 1) / 2) * 6 + (random(6) - 0.5) * 5;

    const frequencyVariation = 0.85 + random(7) * 0.3;
    const opacity = 0.15 + (1 - Math.abs(offset)) * 0.5;

    const amplitude =
      baseAmplitude * (1 + Math.sin(phase * amplitudeSpeed + phaseOffset) * amplitudeVariation);

    const points = Array.from({ length: 201 }, (_, j) => {
      const progress = j / 200;
      const x = progress * VIEW_WIDTH;

      const angle =
        progress * cycles * frequencyVariation * Math.PI * 2 + phase * speed + phaseOffset;

      // Main wave
      const main = Math.sin(angle);

      // Secondary irregularities
      const secondary = Math.sin(angle * 2.3 + phaseOffset) * 0.18;
      const tertiary = Math.sin(angle * 0.47 + phase * 0.6) * 0.12;

      // Subtle travelling distortion
      const distortion =
        Math.sin(progress * 19 + phase * 0.8 + i) * 0.12 +
        Math.sin(progress * 37 - phase * 0.5 + i * 2) * 0.06;

      const combined = main + secondary + tertiary + distortion;

      const y = VIEW_HEIGHT / 2 + yOffset + combined * amplitude;

      return `${x},${y}`;
    }).join(' ');

    return { points, opacity };
  });

  return (
    <svg
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      preserveAspectRatio='none'
      className='h-full w-full'
    >
      {waves.map((wave, i) => (
        <polyline
          key={i}
          points={wave.points}
          fill='none'
          stroke='#EF7F9A'
          strokeWidth='1'
          strokeOpacity={wave.opacity}
          strokeLinecap='round'
        />
      ))}
    </svg>
  );
};
