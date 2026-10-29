import { useCallback, useMemo } from 'react';
import { PageTitle } from '../../components/PageTitle';
import { SimpleHelpPopup } from '../../components/HelpPopup/SimpleHelpPopup';
import { Stage } from '../../typings/hooks/useSimpleMemoryGame';
import { getColorSimilarity, randomHexColor } from '../../utils/color';
import { ColorRect } from './ColorRect';
import { ColorPicker } from './ColorPicker';
import { useSimpleMemoryGame } from '../../hooks/useRecreateMemoryGame';
import { GameContent } from '../../components/SimpleMemoryGame/GameContent';

export const ColorMemoryPage = () => {
  const {
    currentStage,
    gameState,
    timeLeft,
    handleStartGame,
    handleChosenValueChange,
    handleSubmitResult,
  } = useSimpleMemoryGame();

  const handleStartGameClick = useCallback(() => {
    handleStartGame('#000000', randomHexColor());
  }, [handleStartGame]);

  const handleChosenColorSubmit = useCallback(() => {
    const result = getColorSimilarity(gameState.targetValue, gameState.chosenValue);
    handleSubmitResult(result);
  }, [gameState.chosenValue, gameState.targetValue, handleSubmitResult]);

  const content2 = useMemo(
    () => (
      <GameContent
        currentStage={currentStage}
        result={gameState.result}
        onStart={handleStartGameClick}
        renderRecreate={() => (
          <div className='flex flex-col h-80 w-80 md:h-100 gap-2'>
            <div className='flex-1'>
              <ColorPicker onColorChange={handleChosenValueChange} />
            </div>
            <button
              className='transition-all text-xl px-4 py-1 rounded-lg shadow-soft bg-white'
              onClick={handleChosenColorSubmit}
            >
              Submit
            </button>
          </div>
        )}
        renderResult={(result) => (
          <>
            <span>{(result * 100).toFixed(2)}%</span>
            <span className='text-base text-rose'>
              {result <= 0.25
                ? 'you got the eye of the tiger, but tigers are colour blind'
                : result <= 0.5
                  ? "it's okay we all have it some point"
                  : result <= 0.75
                    ? 'not bad i guess'
                    : result <= 0.9
                      ? 'almost there'
                      : 'wonderful!'}
            </span>
          </>
        )}
        renderDisplay={() => {
          const colorRectColor =
            currentStage === Stage.START
              ? 'var(--color-soft)'
              : currentStage === Stage.RECREATE
                ? gameState.chosenValue
                : gameState.targetValue;

          return (
            <ColorRect
              color={colorRectColor}
              otherColor={currentStage === Stage.RESULT ? gameState.chosenValue : undefined}
            >
              {currentStage === Stage.MEMORISE && (
                <div className='bg-ink right-0 top-0 absolute w-24 translate-x-[50%] translate-y-[-50%] px-3 py-1 rounded-lg flex items-center justify-center'>
                  <span className='font-semibold text-2xl text-white'>
                    {(timeLeft / 1000).toFixed(1)}
                  </span>
                </div>
              )}
            </ColorRect>
          );
        }}
      />
    ),
    [
      currentStage,
      gameState.chosenValue,
      gameState.result,
      gameState.targetValue,
      handleChosenColorSubmit,
      handleChosenValueChange,
      handleStartGameClick,
      timeLeft,
    ]
  );

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
      {content2}
    </div>
  );
};
