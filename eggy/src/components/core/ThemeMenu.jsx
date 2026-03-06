import { useState, useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

/**
 * THEME MENU
 *
 * Popover theme selector with:
 * - Theme style previews (Mechanical, Cooking Pot)
 * - Color mode toggle (Light/Dark)
 * - Positioned at top-right corner
 * - Hidden on splash page
 */

// Theme preview card
const ThemePreviewCard = ({ theme, isSelected, onClick, tokens, isDark }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    style={{
      width: 90,
      padding: 8,
      border: 'none',
      borderRadius: 12,
      cursor: 'pointer',
      background: isSelected
        ? isDark
          ? 'rgba(255, 255, 255, 0.15)'
          : 'rgba(0, 0, 0, 0.06)'
        : 'transparent',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      transition: 'background 0.2s ease',
    }}
  >
    {/* Preview icon */}
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: 10,
        background: isDark
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(0, 0, 0, 0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        boxShadow: isSelected ? tokens.shadow.soft : 'none',
      }}
    >
      {theme.icon}
    </Box>

    {/* Name */}
    <Typography
      sx={{
        fontSize: '0.6875rem',
        fontWeight: 600,
        color: tokens.text.primary,
        textAlign: 'center',
        lineHeight: 1.2,
      }}
    >
      {theme.name}
    </Typography>

    {/* Selection indicator */}
    <Box
      sx={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        border: `2px solid ${isSelected ? tokens.accent.primary : tokens.text.tertiary}`,
        background: isSelected ? tokens.accent.primary : 'transparent',
        transition: 'all 0.2s ease',
      }}
    />
  </motion.button>
);

// Color mode toggle
const ColorModeToggle = ({ isDark, onToggle, tokens }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      py: 1,
    }}
  >
    <Typography
      sx={{
        fontSize: '0.75rem',
        color: !isDark ? tokens.text.primary : tokens.text.tertiary,
        fontWeight: !isDark ? 600 : 400,
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
      }}
    >
      <span style={{ fontSize: '0.875rem' }}>☀️</span> Light
    </Typography>

    <motion.button
      onClick={onToggle}
      style={{
        width: 48,
        height: 26,
        borderRadius: 13,
        border: 'none',
        padding: 3,
        cursor: 'pointer',
        background: isDark
          ? tokens.accent.primary
          : 'rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isDark ? 'flex-end' : 'flex-start',
      }}
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: '#FFFFFF',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      />
    </motion.button>

    <Typography
      sx={{
        fontSize: '0.75rem',
        color: isDark ? tokens.text.primary : tokens.text.tertiary,
        fontWeight: isDark ? 600 : 400,
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
      }}
    >
      Dark <span style={{ fontSize: '0.875rem' }}>🌙</span>
    </Typography>
  </Box>
);

const ThemeMenu = () => {
  const {
    themeStyle,
    colorMode,
    isDark,
    setThemeStyle,
    toggleColorMode,
    tokens,
    themeRegistry,
  } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  // Hide on splash
  if (location.pathname === '/') return null;

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const themes = Object.values(themeRegistry);

  return (
    <Box
      ref={menuRef}
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 1001,
      }}
    >
      {/* Menu toggle button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: 44,
          height: 44,
          borderRadius: 14,
          border: 'none',
          cursor: 'pointer',
          background: tokens.surface.nav,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: tokens.shadow.soft,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.25rem',
        }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          🎨
        </motion.div>
      </motion.button>

      {/* Popover menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            style={{
              position: 'absolute',
              top: 52,
              right: 0,
              width: 220,
              background: tokens.surface.nav,
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderRadius: 16,
              boxShadow: tokens.shadow.medium,
              border: `1px solid ${tokens.surface.navBorder}`,
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <Box
              sx={{
                px: 2,
                py: 1.5,
                borderBottom: `1px solid ${tokens.surface.navBorder}`,
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: tokens.text.secondary,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                🎨 Theme
              </Typography>
            </Box>

            {/* Theme style selection */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 1,
                p: 2,
                borderBottom: `1px solid ${tokens.surface.navBorder}`,
              }}
            >
              {themes.map((theme) => (
                <ThemePreviewCard
                  key={theme.id}
                  theme={theme}
                  isSelected={themeStyle === theme.id}
                  onClick={() => setThemeStyle(theme.id)}
                  tokens={tokens}
                  isDark={isDark}
                />
              ))}
            </Box>

            {/* Color mode toggle */}
            <Box sx={{ px: 2, py: 1.5 }}>
              <ColorModeToggle
                isDark={isDark}
                onToggle={toggleColorMode}
                tokens={tokens}
              />
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default ThemeMenu;
