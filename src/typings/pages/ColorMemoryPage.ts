import type { ReactNode } from 'react';

export const Stage = {
  START: 'START',
  MEMORISE: 'MEMORISE',
  RECREATE: 'RECREATE',
  RESULT: 'RESULT',
} as const;

export type Stage = (typeof Stage)[keyof typeof Stage];

export interface GameState {
  result: number;
  targetColor: string;
  chosenColor: string;
}

export interface ColorRectProps {
  color: string;
  otherColor?: string;
  children?: ReactNode;
}

export interface ColorPickerProps {
  onColorChange: (hexString: string) => void;
}
