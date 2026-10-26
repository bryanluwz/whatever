import type { ReactNode } from 'react';

export interface HelpPopupProps {
  children: ReactNode;
}

export interface SimpleHelpPopupProps {
  title: string;
  steps: string[];
}
