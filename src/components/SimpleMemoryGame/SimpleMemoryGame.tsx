import type { SimpleMemoryGameProps } from '../../typings/components/SimpleMemoryGame';
import { Stage } from '../../typings/hooks/useSimpleMemoryGame';

export const GameContent = ({
  currentStage,
  result,
  onStart,
  renderMemorise,
  renderRecreate,
  renderResult,
  renderDisplay,
}: SimpleMemoryGameProps) => {
  return (
    <div className='flex md:flex-row flex-col-reverse items-center justify-center h-full w-full relative gap-4'>
      {currentStage === Stage.START && (
        <button
          className='absolute transition-all text-2xl md:text-3xl px-5 py-2 rounded-lg shadow-soft bg-white cursor-pointer hover:scale-105 z-1'
          onClick={onStart}
        >
          Start
        </button>
      )}
      {currentStage === Stage.MEMORISE && renderMemorise?.()}
      {currentStage === Stage.RECREATE && renderRecreate?.()}
      {currentStage === Stage.RESULT && (
        <div className='flex flex-col gap-4 items-center justify-center bg-panel p-4 absolute z-1 rounded-lg text-3xl w-60 md:w-80 text-center'>
          {renderResult?.(result)}

          <button
            className='transition-all text-2xl px-5 py-2 rounded-lg shadow-soft bg-white cursor-pointer hover:scale-105'
            onClick={onStart}
          >
            Play Again
          </button>
        </div>
      )}
      {renderDisplay?.()}
    </div>
  );
};
