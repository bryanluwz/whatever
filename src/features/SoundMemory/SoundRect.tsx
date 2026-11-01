import type { SoundRectProps } from '../../typings/pages/SoundMemoryPage';
import { SineWaveVisualiser } from './SineWaveVisualiser';

export const SoundRect = ({ frequency, children }: SoundRectProps) => {
  return (
    <div
      className='relative flex flex-col h-80 w-80 md:h-100 md:w-150 shadow-soft relative rounded-xl
      bg-[#FFF8F5]
      bg-[radial-gradient(ellipse_at_20%_20%,rgba(239,127,154,0.18),transparent_50%),radial-gradient(ellipse_at_80%_70%,rgba(167,139,250,0.20),transparent_50%),radial-gradient(ellipse_at_50%_100%,rgba(147,197,253,0.15),transparent_50%)]'
    >
      <div className='h-full rounded-xl'>
        <SineWaveVisualiser frequency={frequency} />
      </div>
      {children}
    </div>
  );
};
