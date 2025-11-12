import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../ThemeProvider';

// Test component that uses the theme hook
const TestComponent = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
      <button onClick={() => setTheme('light')}>Set Light</button>
      <button onClick={() => setTheme('system')}>Set System</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should provide default theme', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
  });

  it('should change theme when setTheme is called', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>
    );

    const darkButton = screen.getByText('Set Dark');
    fireEvent.click(darkButton);

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });

  it('should persist theme to localStorage', () => {
    render(
      <ThemeProvider defaultTheme="light" storageKey="test-theme">
        <TestComponent />
      </ThemeProvider>
    );

    const darkButton = screen.getByText('Set Dark');
    fireEvent.click(darkButton);

    expect(localStorage.getItem('test-theme')).toBe('dark');
  });

  it('should load theme from localStorage', () => {
    localStorage.setItem('test-theme', 'dark');

    render(
      <ThemeProvider storageKey="test-theme">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });
});



