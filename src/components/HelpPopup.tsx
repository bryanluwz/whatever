import { useState } from 'react';
import type { HelpPopupProps } from '../typings/components/HelpPopup';
import clsx from 'clsx';

export const HelpPopup = ({ children }: HelpPopupProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className='bg-white shadow-soft rounded-full text-ink text-xl relative size-12 flex items-center justify-center cursor-pointer'
      onClick={() => setOpen((prev) => !prev)}
    >
      ?
      <div
        className={clsx(
          'absolute top-16 right-0 bg-panel p-3 rounded-lg transition-all pointer-events-none',
          {
            'opacity-0': !open,
            'opacity-100': open,
          }
        )}
      >
        {children}
      </div>
    </div>
  );
};
