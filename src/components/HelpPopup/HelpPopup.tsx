import { useState } from 'react';
import type { HelpPopupProps } from '../../typings/components/HelpPopup';
import clsx from 'clsx';

export const HelpPopup = ({ children }: HelpPopupProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <div className='fixed inset-0 z-40' onClick={() => setOpen(false)} />}
      <div
        className='bg-white shadow-soft rounded-full text-ink text-lg md:text-xl relative size-8 md:size-12 flex items-center justify-center cursor-pointer'
        onClick={() => setOpen((prev) => !prev)}
      >
        ?
        <div
          className={clsx(
            'absolute top-16 right-0 bg-panel p-3 rounded-lg transition-all cursor-default z-41',
            {
              'opacity-0 pointer-events-none': !open,
              'opacity-100': open,
            }
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
};
