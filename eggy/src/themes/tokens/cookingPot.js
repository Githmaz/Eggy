/**
 * COOKING POT THEME TOKENS
 * Warm copper/brown kitchen aesthetic with pot visuals
 */

export const cookingPotTokens = {
  light: {
    mode: 'light',
    // Backgrounds - warm kitchen tones
    bg: {
      primary: '#FFF8F0',
      secondary: '#FFF5EB',
      gradient: 'linear-gradient(180deg, #FFF8F0 0%, #FFEFE0 50%, #FFE8D6 100%)',
      card: 'rgba(255, 255, 255, 0.8)',
      cardSolid: '#FFFFFF',
      glass: 'rgba(255, 255, 255, 0.6)',
    },
    // Accent - copper
    accent: {
      primary: '#B87333',
      secondary: '#CD853F',
      gradient: 'linear-gradient(135deg, #CD853F 0%, #B87333 100%)',
      glow: 'rgba(184, 115, 51, 0.3)',
    },
    // Text - deep brown
    text: {
      primary: '#3E2723',
      secondary: '#5D4037',
      tertiary: '#8D6E63',
      inverse: '#FFFFFF',
    },
    // Surfaces
    surface: {
      nav: 'rgba(255, 255, 255, 0.9)',
      navBorder: 'rgba(62, 39, 35, 0.08)',
      elevated: '#FFFFFF',
    },
    // Bubbles - water bubbles in pot
    bubble: {
      primary: 'rgba(135, 206, 250, 0.7)',
      secondary: 'rgba(135, 206, 250, 0.4)',
      glow: 'rgba(135, 206, 250, 0.9)',
    },
    // Progress
    progress: {
      track: 'rgba(62, 39, 35, 0.08)',
      ring: '#B87333',
    },
    // Pot-specific colors
    pot: {
      body: 'linear-gradient(180deg, #8B4513 0%, #654321 50%, #4A3728 100%)',
      rim: 'linear-gradient(180deg, #CD853F 0%, #B87333 50%, #8B6914 100%)',
      rimHighlight: 'linear-gradient(90deg, #DDA15E 0%, #CD853F 30%, #B87333 50%, #CD853F 70%, #DDA15E 100%)',
      water: 'rgba(135, 206, 250, 0.6)',
      waterDeep: 'rgba(100, 180, 230, 0.8)',
      handle: 'linear-gradient(180deg, #5D4037 0%, #3E2723 100%)',
      interior: 'linear-gradient(180deg, #6B4423 0%, #4A3020 100%)',
    },
    // States
    success: '#4CAF7C',
    shadow: {
      soft: '0 4px 24px rgba(62, 39, 35, 0.1)',
      medium: '0 8px 32px rgba(62, 39, 35, 0.15)',
      glow: '0 0 40px rgba(184, 115, 51, 0.25)',
    },
    // Steam
    steam: 'rgba(255, 255, 255, 0.8)',
    // Wave shapes (not used in pot theme, but keeping for consistency)
    wave: 'rgba(184, 115, 51, 0.15)',
  },
  dark: {
    mode: 'dark',
    // Backgrounds - dark kitchen
    bg: {
      primary: '#1A1210',
      secondary: '#231815',
      gradient: 'linear-gradient(180deg, #1A1210 0%, #2A1F1C 50%, #3A2D28 100%)',
      card: 'rgba(255, 255, 255, 0.08)',
      cardSolid: '#2A1F1C',
      glass: 'rgba(255, 255, 255, 0.1)',
    },
    // Accent - bright copper
    accent: {
      primary: '#D4915A',
      secondary: '#E5A76A',
      gradient: 'linear-gradient(135deg, #E5A76A 0%, #D4915A 100%)',
      glow: 'rgba(212, 145, 90, 0.4)',
    },
    // Text
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.75)',
      tertiary: 'rgba(255, 255, 255, 0.5)',
      inverse: '#1A1210',
    },
    // Surfaces
    surface: {
      nav: 'rgba(26, 18, 16, 0.95)',
      navBorder: 'rgba(255, 255, 255, 0.08)',
      elevated: '#3A2D28',
    },
    // Bubbles - glowing water bubbles
    bubble: {
      primary: 'rgba(135, 206, 250, 0.6)',
      secondary: 'rgba(135, 206, 250, 0.35)',
      glow: 'rgba(135, 206, 250, 0.8)',
    },
    // Progress
    progress: {
      track: 'rgba(255, 255, 255, 0.12)',
      ring: '#D4915A',
    },
    // Pot-specific colors
    pot: {
      body: 'linear-gradient(180deg, #654321 0%, #4A3020 50%, #3A251A 100%)',
      rim: 'linear-gradient(180deg, #B87333 0%, #A0642D 50%, #8B5523 100%)',
      rimHighlight: 'linear-gradient(90deg, #CD853F 0%, #B87333 30%, #A0642D 50%, #B87333 70%, #CD853F 100%)',
      water: 'rgba(100, 180, 230, 0.5)',
      waterDeep: 'rgba(80, 150, 200, 0.7)',
      handle: 'linear-gradient(180deg, #4A3728 0%, #3A251A 100%)',
      interior: 'linear-gradient(180deg, #4A3020 0%, #3A2515 100%)',
    },
    // States
    success: '#4CAF7C',
    shadow: {
      soft: '0 4px 24px rgba(0, 0, 0, 0.4)',
      medium: '0 8px 32px rgba(0, 0, 0, 0.5)',
      glow: '0 0 60px rgba(212, 145, 90, 0.35)',
    },
    // Steam
    steam: 'rgba(255, 255, 255, 0.6)',
    // Wave shapes
    wave: 'rgba(58, 45, 40, 0.6)',
  },
};

export default cookingPotTokens;
