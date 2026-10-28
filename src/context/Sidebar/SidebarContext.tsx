import { createContext } from 'react';
import type { SidebarContextType } from '../../typings/context/Sidebar';

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);
