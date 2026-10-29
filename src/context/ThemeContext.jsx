
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

const ThemeContext = createContext(null);

const THEME_KEY = 'elicit-theme';

function getSavedTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);

    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch (error) {
    console.warn('Unable to read saved theme:', error);
  }

  return 'light';
}

function applyTheme(theme) {
  const root = document.documentElement;
  const isDark = theme === 'dark';

  root.classList.toggle('dark', isDark);
  root.classList.toggle('light', !isDark);
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getSavedTheme);

  // Apply theme globally and persist it.
  useEffect(() => {
    applyTheme(theme);

    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
      console.warn('Unable to save theme:', error);
    }
  }, [theme]);

  // Keep the theme synchronized across browser tabs.
  useEffect(() => {
    const handleStorage = (event) => {
      if (
        event.key === THEME_KEY &&
        (event.newValue === 'light' ||
          event.newValue === 'dark')
      ) {
        setTheme(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) =>
      current === 'dark' ? 'light' : 'dark'
    );
  }, []);

  const effectiveTheme = theme;
  const isDark = effectiveTheme === 'dark';

  return (
    <ThemeContext.Provider
      value={{
        theme,
        effectiveTheme,
        isDark,
        userPrefersDark: isDark,
        toggleTheme,
        isHome: false,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useTheme must be used within a ThemeProvider'
    );
  }

  return context;
}

