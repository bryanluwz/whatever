import type { Stage } from '../hooks/useSimpleMemoryGame';

export interface GameContentProps {
  currentStage: Stage;
  result: number;
  // timeLeft: number;
  onStart: () => void;
  renderMemorise?: () => React.ReactNode;
  renderRecreate?: () => React.ReactNode;
  renderResult?: (result: number) => React.ReactNode;
  renderDisplay?: () => React.ReactNode;
}
