import { useCallback, useEffect, useMemo } from 'react';
import { PageTitle } from '../../components/PageTitle';
import { SimpleHelpPopup } from '../../components/HelpPopup/SimpleHelpPopup';
import { Stage } from '../../typings/hooks/useSimpleMemoryGame';
import { useSimpleMemoryGame } from '../../hooks/useRecreateMemoryGame';
import { SimpleMemoryGame } from '../../components/SimpleMemoryGame/SimpleMemoryGame';
import { randomNumber } from '../../utils/number';
import { FrequencyPicker } from './FrequencyPicker';
import { SoundRect } from './SoundRect';
import { useSineWaveAudio } from '../../hooks/useSineWaveAudio';

export const SoundMemoryPage = () => {
  const {
    currentStage,
    gameState,
    timeLeft,
    handleStartGame,
    handleChosenValueChange: handleChosenStringValueChange,
    handleSubmitResult,
  } = useSimpleMemoryGame();

  const handleStartGameClick = useCallback(() => {
    handleStartGame(String(440), randomNumber(200, 2000).toFixed(0));
  }, [handleStartGame]);

  const handleChosenValueChange = useCallback(
    (frequency: number) => handleChosenStringValueChange(String(frequency)),
    [handleChosenStringValueChange]
  );

  const handleChosenFrequencySubmit = useCallback(() => {
    const chosen = Number(gameState.chosenValue);
    const target = Number(gameState.targetValue);
    const distance = Math.abs(chosen - target) / 1800; // 1800 is min max diff
    handleSubmitResult(Math.pow(1 - distance, 2.5));
  }, [gameState.chosenValue, gameState.targetValue, handleSubmitResult]);

  const { changeFrequency, play, stop } = useSineWaveAudio();
  useEffect(() => {
    if (currentStage === Stage.MEMORISE) {
      changeFrequency(Number(gameState.targetValue));
    } else if (currentStage === Stage.RECREATE) {
      changeFrequency(Number(gameState.chosenValue));
    }
  }, [currentStage, gameState.targetValue, gameState.chosenValue, changeFrequency]);

  useEffect(() => {
    if (currentStage === Stage.MEMORISE) {
      play(5000);
    } else if (currentStage === Stage.RECREATE) {
      play(1000);
    } else {
      stop();
    }
  }, [currentStage, play, stop]);

  const content = useMemo(
    () => (
      <SimpleMemoryGame
        currentStage={currentStage}
        result={gameState.result}
        onStart={handleStartGameClick}
        renderRecreate={() => (
          <div className='flex flex-col w-80 md:h-100 gap-2 justify-center'>
            <div className='w-auto'>
              <FrequencyPicker
                minFrequency={200}
                maxFrequency={2000}
                onFrequencyChange={handleChosenValueChange}
              />
            </div>
            <button
              className='transition-all text-xl px-4 py-1 rounded-lg shadow-soft bg-white'
              onClick={handleChosenFrequencySubmit}
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
                ? 'please clean your ears'
                : result <= 0.5
                  ? "it's okay we all start to lose hearing at some point"
                  : result <= 0.75
                    ? 'not bad i guess'
                    : result <= 0.9
                      ? 'almost there'
                      : 'wonderful!'}
            </span>
          </>
        )}
        renderDisplay={() => {
          return (
            <SoundRect
              frequency={
                currentStage === Stage.MEMORISE
                  ? Number(gameState.targetValue)
                  : Number(gameState.chosenValue)
              }
            >
              {currentStage === Stage.MEMORISE && (
                <div className='bg-ink right-0 top-0 absolute w-24 translate-x-[50%] translate-y-[-50%] px-3 py-1 rounded-lg flex items-center justify-center'>
                  <span className='font-semibold text-2xl text-white'>
                    {(timeLeft / 1000).toFixed(1)}
                  </span>
                </div>
              )}
            </SoundRect>
          );
        }}
      />
    ),
    [
      currentStage,
      gameState.chosenValue,
      gameState.result,
      gameState.targetValue,
      handleChosenFrequencySubmit,
      handleChosenValueChange,
      handleStartGameClick,
      timeLeft,
    ]
  );

  return (
    <div className='flex flex-col gap-4 h-full'>
      <PageTitle
        title='Sound Memory'
        help={
          <SimpleHelpPopup
            title='Sound Memory'
            steps={[
              'Make sure your volume is up and you can hear.',
              'Click "Start" and remember the frequency of the sine wave before the timer runs out.',
              'Try to estimate the frequency of the sine wave.',
              'Stonks',
            ]}
          />
        }
      />
      {content}
    </div>
  );
};
