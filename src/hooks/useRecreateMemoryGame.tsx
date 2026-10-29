import { useCallback, useState } from 'react';
import { type GameState, Stage } from '../typings/hooks/useSimpleMemoryGame';
import { useCountdown } from './useCountdown';

export const useSimpleMemoryGame = () => {
  const [currentStage, setCurrentStage] = useState<Stage>(Stage.START);
  const [gameState, setGameState] = useState<GameState>({
    result: 0,
    targetValue: '',
    chosenValue: '',
  });

  const { timeLeft, reset: resetCountdown } = useCountdown();

  const handleMemoriseEnd = () => {
    setCurrentStage(Stage.RECREATE);
  };

  const handleStartGame = useCallback(
    (defaultChosenValue: string, targetValue: string) => {
      setCurrentStage(Stage.MEMORISE);
      setGameState((prev) => ({
        ...prev,
        chosenValue: defaultChosenValue,
        targetValue: targetValue,
      }));
      resetCountdown(5000, handleMemoriseEnd, 100);
    },
    [resetCountdown]
  );

  const handleChosenValueChange = useCallback((hexString: string) => {
    setGameState((prev) => ({ ...prev, chosenValue: hexString }));
  }, []);

  const handleSubmitResult = useCallback((result: number) => {
    setGameState((prev) => ({ ...prev, result: result }));
    setCurrentStage(Stage.RESULT);
  }, []);

  return {
    currentStage,
    setCurrentStage,
    gameState,
    setGameState,
    timeLeft,
    resetCountdown,
    handleMemoriseEnd,
    handleStartGame,
    handleChosenValueChange,
    handleSubmitResult,
  };
};
