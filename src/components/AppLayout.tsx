import { NavLink, Outlet } from 'react-router-dom';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { useSidebar } from '../context/Sidebar/useSidebar';

export const AppLayout = () => {
  const { isSidebarOpen, closeSidebar } = useSidebar();

  const tabs = [
    { label: 'Color Memory', to: '/color-memory' },
    { label: 'Sound Memory', to: '/sound-memory' },
    { label: 'Tic Tac Noe', to: '/tic-tac-noe' },
    { label: 'Fourier Transform', to: '/fourier-transform' },
    { label: 'Pong but balls just go whereever they want', to: '/pong' },
  ];

  return (
    <div className='flex h-screen bg-background font-klee text-ink text-base shadow-soft'>
      {isSidebarOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/40 md:hidden transition-all'
          onClick={closeSidebar}
        />
      )}
      <aside
        className={clsx(
          'fixed inset-y-0 w-64 flex flex-col shrink-0 bg-panel p-6 gap-4 md:static md:translate-x-0 transition-all z-41',
          { 'translate-x-0': isSidebarOpen },
          { '-translate-x-full': !isSidebarOpen }
        )}
      >
        <div className='flex flex-col'>
          <div className='flex'>
            <span className='font-[600] text-3xl'>Whatever</span>
            <button
              className='md:hidden absolute right-6 top-6 translate-[50%] ml-auto'
              onClick={closeSidebar}
              aria-label='Close sidebar'
            >
              <X />
            </button>
          </div>
          <span className='text-rose'>idk what im planning here</span>
        </div>
        <nav className='flex flex-col gap-2'>
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.to === '/dashboard'}
              className={({ isActive }) =>
                clsx('transition-all text-xl px-4 py-1 rounded-lg shadow-soft', {
                  'text-white bg-rose': isActive,
                  'bg-white hover:scale-105': !isActive,
                })
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className='flex-1 overflow-auto'>
        <div className='p-8 h-dvh'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
