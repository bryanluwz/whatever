import { useState, type ReactNode } from 'react';
import type { SidebarContextType } from '../../typings/context/Sidebar';
import { SidebarContext } from './SidebarContext';

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const value: SidebarContextType = {
    isSidebarOpen,
    openSidebar: () => setIsSidebarOpen(true),
    closeSidebar: () => setIsSidebarOpen(false),
    toggleSidebar: () => setIsSidebarOpen((prev) => !prev),
  };

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};
