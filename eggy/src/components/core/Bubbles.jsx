import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';
import { useTheme } from '../../context/ThemeContext';

/**
 * BUBBLE SYSTEM - THEMED
 *
 * Light mode: Soft, subtle white bubbles
 * Dark mode: Glowing blue bubbles with more visibility
 *
 * States:
 * - Idle: Few slow bubbles, calm
 * - Cooking: Many fast bubbles, active boiling
 *
 * Modes:
 * - fullscreen: Bubbles across entire screen (mechanical theme)
 * - confined: Bubbles within specified bounds (cooking pot theme)
 */

const Bubble = ({ config, windowHeight, isBoiling, tokens, isDark, confined }) => {
  const duration = isBoiling
    ? 1.5 + Math.random() * 2 // 1.5-3.5s when boiling
    : 6 + Math.random() * 4; // 6-10s when idle

  // Different bubble styles for light/dark modes
  const bubbleStyle = isDark
    ? {
        background: `radial-gradient(
          circle at 30% 30%,
          ${tokens.bubble.glow},
          ${tokens.bubble.primary} 40%,
          ${tokens.bubble.secondary} 70%,
          transparent
        )`,
        boxShadow: `
          inset 0 0 ${config.size * 0.3}px ${tokens.bubble.glow},
          0 0 ${config.size * 0.5}px ${tokens.bubble.primary},
          0 0 ${config.size}px ${tokens.bubble.secondary}
        `,
        border: `1px solid ${tokens.bubble.primary}`,
      }
    : {
        background: `radial-gradient(
          circle at 30% 30%,
          rgba(255, 255, 255, 1),
          rgba(255, 255, 255, 0.8) 40%,
          rgba(255, 255, 255, 0.4) 70%,
          transparent
        )`,
        boxShadow: `
          inset 0 0 ${config.size * 0.3}px rgba(255,255,255,0.9),
          0 0 ${config.size * 0.4}px rgba(255,255,255,0.6),
          0 ${config.size * 0.1}px ${config.size * 0.3}px rgba(0,0,0,0.04)
        `,
        border: '1px solid rgba(255,255,255,0.7)',
      };

  const travelDistance = confined ? confined.height : windowHeight + 150;

  return (
    <motion.div
      initial={{
        y: confined ? confined.height : windowHeight + 20,
        x: config.x,
        scale: 0.2,
        opacity: 0,
      }}
      animate={{
        y: confined ? -20 : -150,
        scale: [0.2, 1, 0.9],
        opacity: [0, config.opacity, config.opacity * 0.8, 0],
      }}
      transition={{
        duration,
        delay: config.delay,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        position: 'absolute',
        bottom: confined ? 0 : 0,
        left: 0,
        width: config.size,
        height: config.size,
        borderRadius: '50%',
        pointerEvents: 'none',
        ...bubbleStyle,
      }}
    />
  );
};

const Bubbles = ({
  isBoiling = false,
  confined = null, // { width, height } for pot-confined mode
}) => {
  const { tokens, isDark, themeStyle } = useTheme();
  const [windowHeight, setWindowHeight] = useState(800);
  const [bubbles, setBubbles] = useState([]);
  const idRef = useRef(0);

  // Don't render fullscreen bubbles for cooking pot theme
  // (that theme uses PotBubbles instead)
  if (themeStyle === 'cookingPot' && !confined) {
    return null;
  }

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate bubbles based on state
  useEffect(() => {
    const count = isBoiling ? 45 : 8;
    const newBubbles = [];

    const maxX = confined ? confined.width : window.innerWidth;

    for (let i = 0; i < count; i++) {
      newBubbles.push({
        id: idRef.current++,
        x: Math.random() * (maxX - 60) + 30,
        // Larger bubbles in dark mode for visibility
        size: isBoiling
          ? (isDark ? 20 : 16) + Math.random() * (isDark ? 40 : 36)
          : (isDark ? 24 : 20) + Math.random() * (isDark ? 36 : 32),
        delay: Math.random() * (isBoiling ? 1.5 : 4),
        // Higher opacity in dark mode
        opacity: isBoiling
          ? (isDark ? 0.7 : 0.6) + Math.random() * 0.3
          : (isDark ? 0.6 : 0.5) + Math.random() * 0.3,
      });
    }

    setBubbles(newBubbles);
  }, [isBoiling, isDark, confined]);

  return (
    <Box
      sx={{
        position: confined ? 'absolute' : 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        ...(confined && {
          width: confined.width,
          height: confined.height,
        }),
      }}
    >
      {bubbles.map((bubble) => (
        <Bubble
          key={bubble.id}
          config={bubble}
          windowHeight={windowHeight}
          isBoiling={isBoiling}
          tokens={tokens}
          isDark={isDark}
          confined={confined}
        />
      ))}
    </Box>
  );
};

export default Bubbles;
