/**
 * THEME REGISTRY
 *
 * Central registry for all theme styles.
 * Each theme has light/dark modes and animation metadata.
 */

import { mechanicalTokens } from './tokens/mechanical';
import { eggCharacterTokens } from './tokens/eggCharacter';

// Theme definitions with metadata
export const themeRegistry = {
  mechanical: {
    id: 'mechanical',
    name: 'Mechanical',
    description: 'Premium metallic dial',
    icon: '⏱️',
    tokens: mechanicalTokens,
    animations: {
      hasRotaryDial: true,
      hasEggSmash: true,
      hasBubbles: true,
      hasWaves: true,
      hasSteam: false,
      hasPotBubbles: false,
      hasEggDrop: false,
    },
  },
  eggCharacter: {
    id: 'eggCharacter',
    name: 'Hot Spring',
    description: 'Relaxing onsen spa',
    icon: '♨️',
    tokens: eggCharacterTokens,
    animations: {
      hasRotaryDial: false,
      hasEggSmash: false,
      hasBubbles: false,
      hasWaves: false,
      hasSteam: true,
      hasPotBubbles: true,
      hasEggCharacter: true,
    },
  },
};

// Available theme style IDs
export const themeStyles = Object.keys(themeRegistry);

// Get tokens for a specific theme and mode
export const getThemeTokens = (style, mode) => {
  const theme = themeRegistry[style];
  if (!theme) {
    console.warn(`Unknown theme style: ${style}, falling back to mechanical`);
    return mechanicalTokens[mode] || mechanicalTokens.light;
  }
  return theme.tokens[mode] || theme.tokens.light;
};

// Get animations config for a theme
export const getThemeAnimations = (style) => {
  const theme = themeRegistry[style];
  if (!theme) {
    return themeRegistry.mechanical.animations;
  }
  return theme.animations;
};

// Default theme settings
export const defaultThemeSettings = {
  style: 'mechanical',
  mode: 'dark',
};

// LocalStorage key
export const THEME_STORAGE_KEY = 'eggy-theme-v2';

export default themeRegistry;
