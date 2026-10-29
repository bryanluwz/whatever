export const Stage = {
  START: 'START',
  MEMORISE: 'MEMORISE',
  RECREATE: 'RECREATE',
  RESULT: 'RESULT',
} as const;

export type Stage = (typeof Stage)[keyof typeof Stage];

export interface GameState {
  result: number;
  targetValue: string;
  chosenValue: string;
}
