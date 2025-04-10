'use client';

import { useCallback, useContext } from 'react';
import { Moon, Sun } from 'react-feather';
import { Context } from './context';

export default function ThemeToggle() {
  const { setTheme, theme } = useContext(Context);
  const onChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.target?.checked) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  return (
    <label className='toggle toggle-lg text-base-content'>
      <input
        onChange={onChange}
        type='checkbox'
        className='theme-controller'
        checked={theme === 'dark'}
      />

      <Sun className='swap-off size-5 fill-current' />
      <Moon className='swap-on size-5 fill-current' />
    </label>
  );
}
