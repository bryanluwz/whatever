import { useEffect, useState } from 'react';
import type { FrequencyPickerProps } from '../../typings/pages/SoundMemoryPage';

export const FrequencyPicker = ({
  minFrequency = 200,
  maxFrequency = 2000,
  onFrequencyChange,
}: FrequencyPickerProps) => {
  const [frequency, setFrequency] = useState(440);

  useEffect(() => {
    onFrequencyChange(frequency);
  }, [frequency, onFrequencyChange]);

  return (
    <div className='flex gap-2 h-auto bg-panel p-3 rounded-xl'>
      <input
        type='range'
        min={minFrequency}
        max={maxFrequency}
        value={frequency}
        onChange={(e) => setFrequency(Number(e.target.value))}
        className='w-full cursor-pointer appearance-none rounded-md
					[&::-webkit-slider-runnable-track]:rounded-full
					[&::-webkit-slider-thumb]:size-4
					[&::-webkit-slider-thumb]:appearance-none
					[&::-webkit-slider-thumb]:rounded-full
					[&::-webkit-slider-thumb]:border-2
					[&::-webkit-slider-thumb]:border-white
					[&::-webkit-slider-thumb]:bg-transparent
					[&::-webkit-slider-thumb]:shadow-soft"
				'
        style={{
          background: 'linear-gradient(to right, #5B8DEF, #8B7CF6, #EF7F9A, #F5A65B)',
        }}
      />
    </div>
  );
};
