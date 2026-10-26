import { NavLink, Outlet } from 'react-router-dom';
import clsx from 'clsx';

export const AppLayout = () => {
  const tabs = [
    { label: 'Color Memory', to: '/color-memory' },
    { label: 'Sound Memory', to: '/sound-memory' },
    { label: 'Tic Tac Noe', to: '/tic-tac-noe' },
    { label: 'Fourier Transform', to: '/fourier-transform' },
  ];

  return (
    <div className='flex h-screen bg-background font-klee text-ink text-base shadow-soft'>
      <aside className='w-64 flex flex-col shrink-0 bg-panel p-6 gap-4'>
        <div className='flex flex-col'>
          <span className='font-[600] text-3xl'>Whatever</span>
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
