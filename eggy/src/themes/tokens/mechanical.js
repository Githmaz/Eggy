/**
 * MECHANICAL THEME TOKENS
 * Premium metallic dial aesthetic - the current Eggy design
 */

export const mechanicalTokens = {
  light: {
    mode: 'light',
    // Backgrounds - soft warm cream gradient
    bg: {
      primary: '#FDF8F3',
      secondary: '#FAF5EF',
      gradient: 'linear-gradient(180deg, #FDF8F3 0%, #F5EDE4 50%, #EDE4D9 100%)',
      card: 'rgba(255, 255, 255, 0.7)',
      cardSolid: '#FFFFFF',
      glass: 'rgba(255, 255, 255, 0.5)',
    },
    // Accent - warm coral
    accent: {
      primary: '#E07B67',
      secondary: '#F09080',
      gradient: 'linear-gradient(135deg, #E8896F 0%, #E07B67 100%)',
      glow: 'rgba(224, 123, 103, 0.3)',
    },
    // Text
    text: {
      primary: '#2D2D2D',
      secondary: '#6B6B6B',
      tertiary: '#9A9A9A',
      inverse: '#FFFFFF',
    },
    // Surfaces
    surface: {
      nav: 'rgba(255, 255, 255, 0.85)',
      navBorder: 'rgba(0, 0, 0, 0.06)',
      elevated: '#FFFFFF',
    },
    // Bubbles
    bubble: {
      primary: 'rgba(255, 255, 255, 0.8)',
      secondary: 'rgba(255, 255, 255, 0.5)',
      glow: 'rgba(255, 255, 255, 0.9)',
    },
    // Progress
    progress: {
      track: 'rgba(0, 0, 0, 0.06)',
      ring: '#E07B67',
    },
    // States
    success: '#4CAF7C',
    shadow: {
      soft: '0 4px 24px rgba(0, 0, 0, 0.06)',
      medium: '0 8px 32px rgba(0, 0, 0, 0.08)',
      glow: '0 0 40px rgba(224, 123, 103, 0.2)',
    },
    // Wave shapes
    wave: 'rgba(255, 255, 255, 0.4)',
  },
  dark: {
    mode: 'dark',
    // Backgrounds - deep blue gradient
    bg: {
      primary: '#0A1628',
      secondary: '#0D1B2A',
      gradient: 'linear-gradient(180deg, #0D1B2A 0%, #132238 50%, #1B3A5C 100%)',
      card: 'rgba(255, 255, 255, 0.08)',
      cardSolid: '#152535',
      glass: 'rgba(255, 255, 255, 0.1)',
    },
    // Accent - light blue
    accent: {
      primary: '#5BA4D9',
      secondary: '#7BBFEF',
      gradient: 'linear-gradient(135deg, #7BBFEF 0%, #5BA4D9 100%)',
      glow: 'rgba(91, 164, 217, 0.4)',
    },
    // Text
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
      tertiary: 'rgba(255, 255, 255, 0.5)',
      inverse: '#0A1628',
    },
    // Surfaces
    surface: {
      nav: 'rgba(13, 27, 42, 0.9)',
      navBorder: 'rgba(255, 255, 255, 0.08)',
      elevated: '#1A3045',
    },
    // Bubbles - more visible in dark mode
    bubble: {
      primary: 'rgba(91, 164, 217, 0.6)',
      secondary: 'rgba(123, 191, 239, 0.4)',
      glow: 'rgba(91, 164, 217, 0.8)',
    },
    // Progress
    progress: {
      track: 'rgba(255, 255, 255, 0.12)',
      ring: '#5BA4D9',
    },
    // States
    success: '#4CAF7C',
    shadow: {
      soft: '0 4px 24px rgba(0, 0, 0, 0.3)',
      medium: '0 8px 32px rgba(0, 0, 0, 0.4)',
      glow: '0 0 60px rgba(91, 164, 217, 0.3)',
    },
    // Wave shapes
    wave: 'rgba(27, 58, 92, 0.6)',
  },
};

export default mechanicalTokens;
