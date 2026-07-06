import { createTheme } from '@mui/material/styles';
import { colors, shadows, borderRadius, typography } from './tokens';

const getDesignTokens = (mode) => {
  const palette = mode === 'light' ? colors.light : colors.dark;

  return {
    palette: {
      mode,
      primary: colors.primary,
      secondary: colors.accent,
      success: colors.success,
      warning: colors.warning,
      error: colors.danger,
      background: palette.background,
      text: palette.text,
      divider: palette.divider,
    },
    typography: {
      fontFamily: typography.fontFamily,
      h1: {
        fontWeight: 700,
        letterSpacing: '-0.03em',
        lineHeight: 1.1,
      },
      h2: {
        fontWeight: 700,
        letterSpacing: '-0.025em',
        lineHeight: 1.15,
      },
      h3: {
        fontWeight: 600,
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
      },
      h4: {
        fontWeight: 600,
        letterSpacing: '-0.015em',
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      subtitle1: {
        fontWeight: 500,
        letterSpacing: '-0.01em',
      },
      subtitle2: {
        fontWeight: 500,
      },
      body1: {
        lineHeight: 1.6,
      },
      body2: {
        lineHeight: 1.5,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
    },
    shape: {
      borderRadius: borderRadius.md,
    },
    shadows: [
      'none',
      shadows.soft,
      shadows.medium,
      shadows.large,
      shadows.glow,
      ...Array(20).fill(shadows.medium),
    ],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background: palette.background.default,
            backgroundImage: palette.gradient.subtle,
            backgroundAttachment: 'fixed',
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: 8,
              height: 8,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: mode === 'light' ? '#CBD5E1' : '#334155',
              borderRadius: 4,
            },
          },
          '*': {
            boxSizing: 'border-box',
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: borderRadius.md,
            padding: '10px 20px',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-1px)',
            },
          },
          containedPrimary: {
            background: colors.light.gradient.hero,
            boxShadow: '0 1px 2px rgba(10, 37, 64, 0.06), 0 4px 12px rgba(99, 91, 255, 0.25)',
            '&:hover': {
              background: colors.light.gradient.hero,
              filter: 'brightness(1.04)',
              boxShadow: '0 4px 16px rgba(99, 91, 255, 0.35)',
            },
          },
          outlined: {
            borderWidth: 1.5,
            '&:hover': {
              borderWidth: 1.5,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius.lg,
            border: `1px solid ${palette.border}`,
            backgroundImage: 'none',
            boxShadow: shadows.soft,
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              boxShadow: shadows.medium,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
          rounded: {
            borderRadius: borderRadius.lg,
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
        },
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: borderRadius.md,
              transition: 'all 0.2s ease',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius.sm,
            fontWeight: 500,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            boxShadow: 'none',
            borderBottom: `1px solid ${palette.border}`,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: `1px solid ${palette.border}`,
            backgroundImage: 'none',
          },
        },
      },
    },
  };
};

export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));

export const getPaletteTokens = (mode) => (mode === 'light' ? colors.light : colors.dark);
