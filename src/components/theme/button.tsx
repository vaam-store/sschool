'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Moon, Sun } from 'react-feather';
import { themeChange } from 'theme-change';
import { type ThemeType } from './types';
import { calculateNextTheme, loadTheme, saveTheme } from './utils';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeType>(loadTheme);

  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);

  const nextTheme = useMemo(() => calculateNextTheme(theme), [theme]);

  const onChange = useCallback(() => {
    setTheme((prev) => calculateNextTheme(prev));
  }, []);

  return (
    <button
      className='btn btn-circle btn-soft btn-primary'
      data-set-theme={nextTheme}
      onClick={onChange}
      data-click-track-event='theme-toggle'>
      {/* sun icon */}
      {theme === 'light' && <Sun />}

      {/* moon icon */}
      {theme === 'dark' && <Moon />}
    </button>
  );
}
