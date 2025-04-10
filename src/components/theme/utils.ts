'use client';

import { defaultTheme, themeKey, themes } from './constants';
import { type ThemeType } from './types';

export const loadTheme = (): ThemeType => {
  if (typeof window === 'undefined') {
    return defaultTheme;
  }

  const theme = localStorage.getItem(themeKey);
  switch (theme) {
    case themes.light:
    case themes.dark:
      return theme;
    default:
      return defaultTheme;
  }
};

export const saveTheme = (theme: ThemeType): void => {
  localStorage.setItem(themeKey, theme);
};
