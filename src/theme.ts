// src/theme.ts
import { createTheme, ThemeOptions } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import { createContext, useMemo, useState } from 'react';

// Color design tokens (customize as needed)
export const tokens = (mode: PaletteMode) => ({
  ...(mode === 'dark'
    ? {
        // Dark mode colors
        primary: {
          main: '#90CAF9', // Light Blue
          light: '#E3F2FD',
          dark: '#42A5F5',
        },
        secondary: {
          main: '#CE93D8', // Light Purple
          light: '#F3E5F5',
          dark: '#AB47BC',
        },
        background: {
          default: '#121212',
          paper: '#1E1E1E',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#B0B0B0',
        },
      }
    : {
        // Light mode colors
        primary: {
          main: '#1976D2', // Blue
          light: '#BBDEFB',
          dark: '#0D47A1',
        },
        secondary: {
          main: '#8E24AA', // Purple
          light: '#E1BEE7',
          dark: '#4A148C',
        },
        background: {
          default: '#F5F7FA',
          paper: '#FFFFFF',
        },
        text: {
          primary: '#212121',
          secondary: '#757575',
        },
      }),
});

// Function to create the theme
export const themeSettings = (mode: PaletteMode): ThemeOptions => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary.main,
            },
            secondary: {
              main: colors.secondary.main,
            },
            background: {
              default: colors.background.default,
              paper: colors.background.paper,
            },
            text: {
              primary: colors.text.primary,
              secondary: colors.text.secondary,
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary.main,
            },
            secondary: {
              main: colors.secondary.main,
            },
            background: {
              default: colors.background.default,
              paper: colors.background.paper,
            },
            text: {
              primary: colors.text.primary,
              secondary: colors.text.secondary,
            },
          }),
    },
    typography: {
      fontFamily: ['Roboto', 'sans-serif'].join(','),
      fontSize: 12,
      h1: { fontSize: 40 },
      h2: { fontSize: 32 },
      h3: { fontSize: 24 },
      h4: { fontSize: 20 },
      h5: { fontSize: 16 },
      h6: { fontSize: 14 },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                },
            },
        },
        // TODO: Add more component specific overrides here
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light' as PaletteMode,
});

export const useMode = () => {
  const [mode, setMode] = useState<PaletteMode>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
      mode,
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode] as const;
};