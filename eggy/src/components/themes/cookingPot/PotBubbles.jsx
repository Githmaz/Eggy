import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box } from '@mui/material';
import { useTheme } from '../../../context/ThemeContext';

/**
 * POT BUBBLES
 *
 * Bubbles confined to the water area inside the pot.
 * More active when boiling.
 */

const PotBubble = ({ config, isBoiling, tokens }) => {
  const duration = isBoiling
    ? 1 + Math.random() * 1.5 // 1-2.5s when boiling
    : 3 + Math.random() * 2;   // 3-5s when idle

  return (
    <motion.div
      initial={{
        x: config.x,
        y: config.startY,
        scale: 0.2,
        opacity: 0,
      }}
      animate={{
        y: config.endY,
        scale: [0.2, 1, 0.8],
        opacity: [0, config.opacity, 0],
      }}
      transition={{
        duration,
        delay: config.delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: config.size,
        height: config.size,
        borderRadius: '50%',
        background: `radial-gradient(
          circle at 30% 30%,
          ${tokens.bubble.glow},
          ${tokens.bubble.primary} 40%,
          ${tokens.bubble.secondary} 70%,
          transparent
        )`,
        boxShadow: `
          inset 0 0 ${config.size * 0.2}px ${tokens.bubble.glow},
          0 0 ${config.size * 0.3}px ${tokens.bubble.primary}
        `,
        border: `1px solid ${tokens.bubble.primary}`,
        pointerEvents: 'none',
      }}
    />
  );
};

const PotBubbles = ({ isBoiling = false, containerHeight = 100 }) => {
  const { tokens } = useTheme();
  const [bubbles, setBubbles] = useState([]);
  const idRef = useRef(0);

  // Generate bubbles based on state
  useEffect(() => {
    const count = isBoiling ? 20 : 6;
    const newBubbles = [];

    for (let i = 0; i < count; i++) {
      const size = isBoiling
        ? 8 + Math.random() * 16
        : 10 + Math.random() * 12;

      newBubbles.push({
        id: idRef.current++,
        x: 10 + Math.random() * 80 + '%', // Keep bubbles within pot width
        startY: containerHeight * 0.7 + Math.random() * (containerHeight * 0.3),
        endY: 10 + Math.random() * 30,
        size,
        delay: Math.random() * (isBoiling ? 1 : 2.5),
        opacity: isBoiling
          ? 0.7 + Math.random() * 0.3
          : 0.5 + Math.random() * 0.3,
      });
    }

    setBubbles(newBubbles);
  }, [isBoiling, containerHeight]);

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <PotBubble
            key={bubble.id}
            config={bubble}
            isBoiling={isBoiling}
            tokens={tokens}
          />
        ))}
      </AnimatePresence>
    </Box>
  );
};

export default PotBubbles;
