import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import ThemeToggle from './button';

describe('ThemeToggle', () => {
  /**
   * Resets all renders after each test
   */
  afterEach(() => {
    cleanup();
  });

  it('renders a rounded button', () => {
    const { getByRole } = render(<ThemeToggle />);

    const button = getByRole('button');

    expect(button.className).not.include('rounded-full');
    expect(button.className).include('btn');
  });
});
