import { createContext } from 'react';
import { type ThemeType } from './types';

export const Context = createContext<{
  theme: ThemeType;
  setTheme: 
    | ((t: ThemeType) => void)
    | ((prev: ThemeType) => ThemeType)
}>({
  theme: 'dark',
  setTheme: () => {
    throw Error('setTheme not initialized');
  },
});
