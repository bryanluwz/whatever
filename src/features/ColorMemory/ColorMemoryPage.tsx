import { useCallback, useMemo, useState } from 'react';
import { PageTitle } from '../../components/PageTitle';
import { SimpleHelpPopup } from '../../components/HelpPopup/SimpleHelpPopup';
import type { GameState } from '../../typings/pages/ColorMemoryPage';
import { Stage } from '../../typings/pages/ColorMemoryPage';
import { getColorSimilarity, randomHexColor } from '../../utils/color';
import { ColorRect } from './ColorRect';
import { useCountdown } from '../../hooks/useCountdown';
import { ColorPicker } from './ColorPicker';

export const ColorMemoryPage = () => {
  const [currentStage, setCurrentStage] = useState<Stage>(Stage.START);
  const [gameState, setGameState] = useState<GameState>({
    result: 0,
    targetColor: '',
    chosenColor: '',
  });

  const { timeLeft, reset: resetCountdown } = useCountdown();

  const handleMemoriseEnd = () => {
    setCurrentStage(Stage.RECREATE);
  };

  const startGame = useCallback(() => {
    setCurrentStage(Stage.MEMORISE);
    setGameState((prev) => ({ ...prev, chosenColor: '#000000', targetColor: randomHexColor() }));
    resetCountdown(5000, handleMemoriseEnd, 100);
  }, [resetCountdown]);

  const handleChosenColorChange = useCallback((hexString: string) => {
    setGameState((prev) => ({ ...prev, chosenColor: hexString }));
  }, []);

  const handleChosenColorSubmit = useCallback(() => {
    const result = getColorSimilarity(gameState.targetColor, gameState.chosenColor);
    setGameState((prev) => ({ ...prev, result: result }));
    setCurrentStage(Stage.RESULT);
  }, [gameState.chosenColor, gameState.targetColor]);

  const content = useMemo(() => {
    const colorRectColor =
      currentStage === Stage.START
        ? 'var(--color-soft)'
        : currentStage === Stage.MEMORISE
          ? gameState.targetColor
          : currentStage === Stage.RECREATE
            ? gameState.chosenColor
            : gameState.targetColor;
    return (
      <div className='flex items-center justify-center h-full w-full relative gap-4'>
        {currentStage === Stage.START && (
          <button
            className='absolute transition-all text-3xl px-5 py-2 rounded-lg shadow-soft bg-white cursor-pointer hover:scale-105 z-1'
            onClick={startGame}
          >
            Start
          </button>
        )}
        {currentStage === Stage.RESULT && (
          <div className='flex flex-col gap-4 items-center justify-center bg-panel p-4 absolute z-1 rounded-lg text-3xl w-80 text-center'>
            <span>{(gameState.result * 100).toFixed(2)}%</span>
            <span className='text-base text-rose'>
              {gameState.result <= 0.25
                ? 'you got the eye of the tiger, but tigers are colour blind'
                : gameState.result <= 0.5
                  ? "it's okay we all have it some point"
                  : gameState.result <= 0.75
                    ? 'not bad i guess'
                    : gameState.result <= 0.9
                      ? 'almost there'
                      : 'wonderful!'}
            </span>
            <button
              className='transition-all text-2xl px-5 py-2 rounded-lg shadow-soft bg-white cursor-pointer hover:scale-105 z-1'
              onClick={startGame}
            >
              Play Again
            </button>
          </div>
        )}
        {currentStage === Stage.RECREATE && (
          <div className='flex flex-col h-100 gap-2'>
            <div className='flex-1'>
              <ColorPicker onColorChange={handleChosenColorChange} />
            </div>
            <button
              className='transition-all text-xl px-4 py-1 rounded-lg shadow-soft bg-white'
              onClick={handleChosenColorSubmit}
            >
              Submit
            </button>
          </div>
        )}
        <ColorRect
          color={colorRectColor}
          otherColor={currentStage === Stage.RESULT ? gameState.chosenColor : undefined}
        >
          {currentStage === Stage.MEMORISE && (
            <div className='bg-ink right-0 top-0 absolute w-24 translate-x-[50%] translate-y-[-50%] px-3 py-1 rounded-lg flex items-center justify-center'>
              <span className='font-semibold text-2xl text-white'>
                {(timeLeft / 1000).toFixed(1)}
              </span>
            </div>
          )}
        </ColorRect>
      </div>
    );
  }, [
    currentStage,
    gameState.chosenColor,
    gameState.result,
    gameState.targetColor,
    handleChosenColorChange,
    handleChosenColorSubmit,
    startGame,
    timeLeft,
  ]);

  return (
    <div className='flex flex-col gap-4 h-full'>
      <PageTitle
        title='Colour Memory'
        help={
          <SimpleHelpPopup
            title='Colour Memory'
            steps={[
              'Click "Start" and remember the colour on the screen before the timer runs out.',
              'Try to reconstruct the colour using the sliders',
              'Stonks',
            ]}
          />
        }
      />
      {content}
    </div>
  );
};
