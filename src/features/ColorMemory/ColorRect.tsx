import clsx from 'clsx';
import type { ColorRectProps } from '../../typings/pages/ColorMemoryPage';

export const ColorRect = ({ color, otherColor, children }: ColorRectProps) => {
  return (
    <div className='flex flex-col h-80 w-80 md:h-100 md:w-150 shadow-soft relative rounded-xl'>
      <div
        className={clsx({ 'h-1/2 rounded-t-xl': otherColor, 'h-full rounded-xl': !otherColor })}
        style={{ backgroundColor: color }}
      />
      {otherColor ? (
        <div className='h-1/2 rounded-b-xl' style={{ backgroundColor: otherColor }} />
      ) : null}
      {children}
    </div>
  );
};
