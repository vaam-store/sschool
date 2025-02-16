import { type ThemeType } from './types';

export const defaultTheme: ThemeType = 'light';

export const themes: Record<'dark' | 'light', ThemeType> = {
  dark: 'dark',
  light: 'light',
};

export const themeKey = 'theme';
