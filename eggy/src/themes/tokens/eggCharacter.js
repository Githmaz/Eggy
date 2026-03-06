/**
 * HOT SPRING EGG THEME TOKENS
 * Japanese onsen minimal aesthetic
 * Calm, premium, spa-like
 */

export const eggCharacterTokens = {
  light: {
    mode: 'light',
    // Backgrounds - warm cream with soft warmth
    bg: {
      primary: '#FDF9F6',
      secondary: '#F8F2ED',
      gradient: 'linear-gradient(180deg, #FDF9F6 0%, #F8F2ED 50%, #F0E8E0 100%)',
      card: 'rgba(255, 255, 255, 0.8)',
      cardSolid: '#FFFFFF',
      glass: 'rgba(255, 255, 255, 0.6)',
    },
    // Accent - warm terracotta
    accent: {
      primary: '#C4784A',
      secondary: '#D4915A',
      gradient: 'linear-gradient(135deg, #D4915A 0%, #C4784A 100%)',
      glow: 'rgba(196, 120, 74, 0.3)',
    },
    // Text
    text: {
      primary: '#2A2A2A',
      secondary: '#5D5D5D',
      tertiary: '#9D9D9D',
      inverse: '#FFFFFF',
    },
    // Surfaces
    surface: {
      nav: 'rgba(255, 255, 255, 0.9)',
      navBorder: 'rgba(42, 42, 42, 0.08)',
      elevated: '#FFFFFF',
    },
    // Bubbles - subtle water bubbles
    bubble: {
      primary: 'rgba(255, 255, 255, 0.6)',
      secondary: 'rgba(255, 255, 255, 0.3)',
      glow: 'rgba(255, 255, 255, 0.8)',
    },
    // Progress
    progress: {
      track: 'rgba(42, 42, 42, 0.08)',
      ring: '#C4784A',
    },
    // Egg character - minimal, clean
    egg: {
      body: '#FFFDF9',
      bodyGradient: 'linear-gradient(180deg, #FFFDF9 0%, #FFF8F0 50%, #F5EBE0 100%)',
      shadow: 'rgba(0, 0, 0, 0.08)',
      shadowDark: 'rgba(0, 0, 0, 0.12)',
      eyes: '#3A3A3A',
      cheek: 'rgba(255, 180, 180, 0.4)',
    },
    // Hot spring pool - warm aqua/teal
    pool: {
      water: 'linear-gradient(180deg, rgba(127, 199, 199, 0.7) 0%, rgba(100, 180, 180, 0.85) 100%)',
      waterSurface: 'rgba(180, 230, 230, 0.5)',
      waterDeep: 'rgba(80, 160, 160, 0.9)',
      edge: 'linear-gradient(180deg, #E8E0D8 0%, #D8CFC5 50%, #C8BFB5 100%)',
      edgeInner: 'linear-gradient(180deg, #D8CFC5 0%, #C8BFB5 100%)',
      stone: '#C8BFB5',
      ripple: 'rgba(255, 255, 255, 0.4)',
      glass: 'rgba(255, 255, 255, 0.25)',
    },
    // Steam - soft white
    steam: 'rgba(255, 255, 255, 0.7)',
    steamGlow: 'rgba(255, 255, 255, 0.4)',
    // Control buttons
    stove: {
      surface: 'linear-gradient(180deg, #E8E0D8 0%, #D8CFC5 100%)',
      knob: 'linear-gradient(145deg, #F5F0EB 0%, #E8E0D8 100%)',
      knobSelected: 'linear-gradient(145deg, #FFFFFF 0%, #F5F0EB 100%)',
      indicator: '#C4784A',
      indicatorGlow: 'rgba(196, 120, 74, 0.4)',
    },
    // Ignition button
    ignition: {
      base: 'linear-gradient(180deg, #D8CFC5 0%, #C8BFB5 100%)',
      ring: 'rgba(196, 120, 74, 0.5)',
      ringActive: '#C4784A',
      text: '#3A3A3A',
    },
    // States
    success: '#4CAF7C',
    shadow: {
      soft: '0 4px 24px rgba(0, 0, 0, 0.06)',
      medium: '0 8px 32px rgba(0, 0, 0, 0.1)',
      glow: '0 0 40px rgba(196, 120, 74, 0.2)',
    },
    wave: 'rgba(196, 120, 74, 0.1)',
  },
  dark: {
    mode: 'dark',
    // Backgrounds - warm dark
    bg: {
      primary: '#1A1816',
      secondary: '#242220',
      gradient: 'linear-gradient(180deg, #1A1816 0%, #242220 50%, #2E2C28 100%)',
      card: 'rgba(255, 255, 255, 0.08)',
      cardSolid: '#2A2826',
      glass: 'rgba(255, 255, 255, 0.1)',
    },
    // Accent - warm copper
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
      tertiary: 'rgba(255, 255, 255, 0.45)',
      inverse: '#1A1816',
    },
    // Surfaces
    surface: {
      nav: 'rgba(26, 24, 22, 0.95)',
      navBorder: 'rgba(255, 255, 255, 0.08)',
      elevated: '#3A3836',
    },
    // Bubbles
    bubble: {
      primary: 'rgba(180, 230, 230, 0.5)',
      secondary: 'rgba(180, 230, 230, 0.25)',
      glow: 'rgba(180, 230, 230, 0.6)',
    },
    // Progress
    progress: {
      track: 'rgba(255, 255, 255, 0.12)',
      ring: '#D4915A',
    },
    // Egg character
    egg: {
      body: '#FFF8F0',
      bodyGradient: 'linear-gradient(180deg, #FFF8F0 0%, #F5EBE0 50%, #E8DED4 100%)',
      shadow: 'rgba(0, 0, 0, 0.25)',
      shadowDark: 'rgba(0, 0, 0, 0.35)',
      eyes: '#2A2A2A',
      cheek: 'rgba(255, 160, 160, 0.5)',
    },
    // Hot spring pool - warm aqua/teal in dark
    pool: {
      water: 'linear-gradient(180deg, rgba(100, 170, 170, 0.75) 0%, rgba(70, 140, 140, 0.9) 100%)',
      waterSurface: 'rgba(140, 200, 200, 0.4)',
      waterDeep: 'rgba(50, 120, 120, 0.95)',
      edge: 'linear-gradient(180deg, #4A4644 0%, #3A3836 50%, #2A2826 100%)',
      edgeInner: 'linear-gradient(180deg, #3A3836 0%, #2A2826 100%)',
      stone: '#4A4644',
      ripple: 'rgba(180, 230, 230, 0.35)',
      glass: 'rgba(255, 255, 255, 0.15)',
    },
    // Steam
    steam: 'rgba(255, 255, 255, 0.5)',
    steamGlow: 'rgba(255, 255, 255, 0.25)',
    // Control buttons
    stove: {
      surface: 'linear-gradient(180deg, #3A3836 0%, #2A2826 100%)',
      knob: 'linear-gradient(145deg, #4A4644 0%, #3A3836 100%)',
      knobSelected: 'linear-gradient(145deg, #5A5654 0%, #4A4644 100%)',
      indicator: '#D4915A',
      indicatorGlow: 'rgba(212, 145, 90, 0.5)',
    },
    // Ignition button
    ignition: {
      base: 'linear-gradient(180deg, #4A4644 0%, #3A3836 100%)',
      ring: 'rgba(212, 145, 90, 0.6)',
      ringActive: '#D4915A',
      text: '#FFFFFF',
    },
    // States
    success: '#4CAF7C',
    shadow: {
      soft: '0 4px 24px rgba(0, 0, 0, 0.3)',
      medium: '0 8px 32px rgba(0, 0, 0, 0.4)',
      glow: '0 0 60px rgba(212, 145, 90, 0.3)',
    },
    wave: 'rgba(46, 44, 40, 0.5)',
  },
};

export default eggCharacterTokens;
