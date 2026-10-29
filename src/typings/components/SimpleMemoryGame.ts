import type { Stage } from '../hooks/useSimpleMemoryGame';

export interface SimpleMemoryGameProps {
  currentStage: Stage;
  result: number;
  onStart: () => void;
  renderMemorise?: () => React.ReactNode;
  renderRecreate?: () => React.ReactNode;
  renderResult?: (result: number) => React.ReactNode;
  renderDisplay?: () => React.ReactNode;
}
