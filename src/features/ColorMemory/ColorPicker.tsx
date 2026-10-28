import { useEffect, useState } from 'react';
import type { ColorPickerProps } from '../../typings/pages/ColorMemoryPage';
import { hsvToHex } from '../../utils/color';

export const ColorPicker = ({ onColorChange }: ColorPickerProps) => {
  const [hue, setHue] = useState(330);
  const [saturation, setSaturation] = useState(0.35);
  const [brightness, setBrightness] = useState(0.85);

  // const color = hsvToHex(hue, saturation, brightness);
  useEffect(() => {
    onColorChange(hsvToHex(hue, saturation, brightness));
  }, [brightness, hue, onColorChange, saturation]);
  const updateColorPosition = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    setSaturation(x);
    setBrightness(1 - y);
  };
  return (
    <div className='flex gap-2 h-full bg-panel p-3 rounded-xl'>
      <div
        className='relative flex-1 cursor-crosshair rounded-xl touch-none w-auto'
        style={{
          backgroundColor: `hsl(${hue} 100% 50%)`,
          backgroundImage: `linear-gradient(to top, black, transparent), linear-gradient(to right, white, transparent)`,
        }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          updateColorPosition(e);
        }}
        onPointerMove={(e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            updateColorPosition(e);
          }
        }}
      >
        <div
          className='pointer-events-none absolute size-4 rounded-full border-2 border-white shadow-soft'
          style={{
            left: `${saturation * 100}%`,
            top: `${(1 - brightness) * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Vertical hue slider */}
      <input
        type='range'
        min='0'
        max='360'
        value={hue}
        onChange={(e) => setHue(Number(e.target.value))}
        className='w-5 cursor-pointer appearance-none rounded-full
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
          writingMode: 'vertical-lr',
          direction: 'rtl',
          background: 'linear-gradient(to bottom, red, magenta, blue, cyan, lime, yellow, red)',
        }}
      />
    </div>
  );
};
