export const colors = {
  primary: {
    main: '#635BFF',
    light: '#7A73FF',
    dark: '#4F46E5',
    contrastText: '#FFFFFF',
  },
  accent: {
    main: '#0EA5E9',
    light: '#38BDF8',
    dark: '#0284C7',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#10B981',
    light: '#34D399',
    dark: '#059669',
  },
  warning: {
    main: '#F59E0B',
    light: '#FBBF24',
    dark: '#D97706',
  },
  danger: {
    main: '#EF4444',
    light: '#F87171',
    dark: '#DC2626',
  },
  light: {
    background: {
      default: '#F6F9FC',
      paper: '#FFFFFF',
      elevated: 'rgba(255, 255, 255, 0.88)',
    },
    text: {
      primary: '#0A2540',
      secondary: '#425466',
      disabled: '#8898AA',
    },
    border: 'rgba(10, 37, 64, 0.08)',
    divider: 'rgba(10, 37, 64, 0.06)',
    gradient: {
      hero: 'linear-gradient(135deg, #635BFF 0%, #0EA5E9 100%)',
      card: 'linear-gradient(135deg, rgba(99, 91, 255, 0.06) 0%, rgba(14, 165, 233, 0.06) 100%)',
      subtle: 'linear-gradient(180deg, #F6F9FC 0%, #EEF2FF 50%, #F6F9FC 100%)',
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.78)',
      border: 'rgba(10, 37, 64, 0.08)',
      shadow: '0 8px 32px rgba(10, 37, 64, 0.08)',
    },
  },
  dark: {
    background: {
      default: '#0A0B0F',
      paper: '#13141A',
      elevated: 'rgba(19, 20, 26, 0.92)',
    },
    text: {
      primary: '#F6F9FC',
      secondary: '#94A3B8',
      disabled: '#64748B',
    },
    border: 'rgba(255, 255, 255, 0.08)',
    divider: 'rgba(255, 255, 255, 0.06)',
    gradient: {
      hero: 'linear-gradient(135deg, #635BFF 0%, #0EA5E9 100%)',
      card: 'linear-gradient(135deg, rgba(99, 91, 255, 0.12) 0%, rgba(14, 165, 233, 0.08) 100%)',
      subtle: 'linear-gradient(180deg, #0A0B0F 0%, #13141A 100%)',
    },
    glass: {
      background: 'rgba(19, 20, 26, 0.82)',
      border: 'rgba(255, 255, 255, 0.08)',
      shadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    },
  },
};

export const shadows = {
  soft: '0 1px 3px rgba(10, 37, 64, 0.06), 0 4px 16px rgba(10, 37, 64, 0.04)',
  medium: '0 4px 12px rgba(10, 37, 64, 0.08), 0 12px 32px rgba(10, 37, 64, 0.06)',
  large: '0 8px 24px rgba(10, 37, 64, 0.1), 0 24px 48px rgba(10, 37, 64, 0.08)',
  glow: '0 0 0 1px rgba(99, 91, 255, 0.12), 0 8px 32px rgba(99, 91, 255, 0.2)',
};

export const borderRadius = {
  sm: 8,
  md: 10,
  lg: 14,
  xl: 18,
  xxl: 24,
  full: 9999,
};

export const typography = {
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

export const layout = {
  maxContentWidth: 1280,
  navHeight: 64,
};
