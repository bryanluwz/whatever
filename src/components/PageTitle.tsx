import { Menu } from 'lucide-react';
import { useSidebar } from '../context/Sidebar/useSidebar';
import type { PageTitleProps } from '../typings/components/PageTitle';

export const PageTitle = ({ title, help }: PageTitleProps) => {
  const { openSidebar } = useSidebar();
  return (
    <div className='w-full grid grid-cols-[auto_minmax(0,1fr)_auto] items-center'>
      <div className='col-start-1 justify-self-start self-center h-6 visible md:hidden mt-2'>
        <button onClick={openSidebar}>
          <Menu />
        </button>
      </div>
      <div className='col-start-2 justify-self-center'>
        <span className='text-3xl font-klee text-ink md:text-4xl'>{title}</span>
      </div>
      {help && <div className='col-start-3 justify-self-end mt-1'>{help}</div>}
    </div>
  );
};
