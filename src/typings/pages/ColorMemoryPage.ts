import type { ReactNode } from 'react';

export interface ColorRectProps {
  color: string;
  otherColor?: string;
  children?: ReactNode;
}

export interface ColorPickerProps {
  onColorChange: (hexString: string) => void;
}
