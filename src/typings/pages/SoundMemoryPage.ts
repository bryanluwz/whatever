import type { ReactNode } from 'react';

export interface SoundRectProps {
  frequency: number;
  children?: ReactNode;
}

export interface FrequencyPickerProps {
  minFrequency?: number;
  maxFrequency?: number;
  onFrequencyChange: (frequency: number) => void;
}

export interface SineWaveVisualiserProps {
  frequency: number;
  deviation?: number;
}
