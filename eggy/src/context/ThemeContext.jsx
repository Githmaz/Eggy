import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import {
  themeRegistry,
  getThemeTokens,
  getThemeAnimations,
  defaultThemeSettings,
  THEME_STORAGE_KEY,
} from '../themes';

/**
 * THEME CONTEXT
 *
 * Multi-theme system supporting:
 * - Theme styles: 'mechanical' | 'cookingPot'
 * - Color modes: 'light' | 'dark'
 *
 * Persists preferences in localStorage with format:
 * { "style": "mechanical", "mode": "light" }
 */

const ThemeContext = createContext(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Migrate old localStorage format to new format
const migrateOldTheme = () => {
  const oldTheme = localStorage.getItem('eggy-theme');
  if (oldTheme) {
    // Old format was just 'dark' or 'light'
    const newSettings = {
      style: 'mechanical',
      mode: oldTheme === 'dark' ? 'dark' : 'light',
    };
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newSettings));
    localStorage.removeItem('eggy-theme');
    return newSettings;
  }
  return null;
};

// Get stored theme settings
const getStoredSettings = () => {
  // Try migration first
  const migrated = migrateOldTheme();
  if (migrated) return migrated;

  // Try to load from new format
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Validate the settings
      if (
        parsed.style &&
        themeRegistry[parsed.style] &&
        ['light', 'dark'].includes(parsed.mode)
      ) {
        return parsed;
      }
    } catch (e) {
      console.warn('Invalid theme settings in localStorage');
    }
  }

  return defaultThemeSettings;
};

// Create MUI theme from tokens
const createAppTheme = (tokens) => {
  const isDark = tokens.mode === 'dark';

  return createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: tokens.accent.primary,
        light: tokens.accent.secondary,
      },
      background: {
        default: tokens.bg.primary,
        paper: tokens.bg.cardSolid,
      },
      text: {
        primary: tokens.text.primary,
        secondary: tokens.text.secondary,
      },
      success: {
        main: tokens.success,
      },
    },
    // Custom design tokens
    eggy: tokens,
    typography: {
      fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      h1: {
        fontSize: '3rem',
        fontWeight: 700,
        letterSpacing: '-0.03em',
        lineHeight: 1.1,
      },
      h2: {
        fontSize: '1.75rem',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
      },
      h3: {
        fontSize: '1.25rem',
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      h4: {
        fontSize: '1rem',
        fontWeight: 600,
      },
      body1: {
        fontSize: '0.9375rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.8125rem',
        lineHeight: 1.5,
      },
      caption: {
        fontSize: '0.6875rem',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: tokens.bg.primary,
            transition: 'background-color 0.3s ease',
          },
        },
      },
    },
  });
};

export const ThemeProvider = ({ children }) => {
  // Initialize from stored settings
  const [themeStyle, setThemeStyleState] = useState(() => {
    return getStoredSettings().style;
  });

  const [colorMode, setColorMode] = useState(() => {
    return getStoredSettings().mode;
  });

  // Persist theme preferences
  useEffect(() => {
    localStorage.setItem(
      THEME_STORAGE_KEY,
      JSON.stringify({ style: themeStyle, mode: colorMode })
    );
  }, [themeStyle, colorMode]);

  // Set theme style with validation
  const setThemeStyle = (newStyle) => {
    if (themeRegistry[newStyle]) {
      setThemeStyleState(newStyle);
    } else {
      console.warn(`Unknown theme style: ${newStyle}`);
    }
  };

  // Toggle color mode
  const toggleColorMode = () => {
    setColorMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Get current tokens
  const tokens = useMemo(
    () => getThemeTokens(themeStyle, colorMode),
    [themeStyle, colorMode]
  );

  // Get current animations config
  const animations = useMemo(
    () => getThemeAnimations(themeStyle),
    [themeStyle]
  );

  // Create MUI theme
  const theme = useMemo(() => createAppTheme(tokens), [tokens]);

  // Convenience derived values
  const isDark = colorMode === 'dark';

  const value = {
    // Core state
    themeStyle,
    colorMode,
    isDark,

    // Actions
    setThemeStyle,
    toggleColorMode,

    // Theme data
    tokens,
    animations,
    themeRegistry,

    // Legacy compatibility
    toggleTheme: toggleColorMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
