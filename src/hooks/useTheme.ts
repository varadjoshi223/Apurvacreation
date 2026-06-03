'use client';
import { useState, useEffect, useCallback } from 'react';

export function useTheme() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('apurva-theme');
    if (stored === 'light') {
      setIsDark(false);
      document.documentElement.classList.add('light-mode');
    }
  }, []);

  const toggle = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.remove('light-mode');
        localStorage.setItem('apurva-theme', 'dark');
      } else {
        document.documentElement.classList.add('light-mode');
        localStorage.setItem('apurva-theme', 'light');
      }
      return next;
    });
  }, []);

  return { isDark, toggle };
}
