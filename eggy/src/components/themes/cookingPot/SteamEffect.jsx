import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box } from '@mui/material';
import { useTheme } from '../../../context/ThemeContext';

/**
 * STEAM EFFECT
 *
 * Rising steam particles for cooking pot theme.
 * Increases intensity when boiling (timer running).
 */

const SteamParticle = ({ config, isBoiling, tokens }) => {
  const duration = isBoiling
    ? 2 + Math.random() * 1.5 // 2-3.5s when boiling
    : 4 + Math.random() * 2;   // 4-6s when idle

  return (
    <motion.div
      initial={{
        x: config.startX,
        y: 0,
        opacity: 0,
        scale: 0.3,
      }}
      animate={{
        x: config.startX + config.drift,
        y: -config.height,
        opacity: [0, 0.6, 0.4, 0],
        scale: [0.3, 1, 1.2, 0.8],
      }}
      transition={{
        duration,
        delay: config.delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: config.size,
        height: config.size,
        borderRadius: '50%',
        background: `radial-gradient(
          circle at 50% 50%,
          ${tokens.steam || 'rgba(255, 255, 255, 0.8)'},
          transparent
        )`,
        filter: `blur(${config.blur}px)`,
        pointerEvents: 'none',
      }}
    />
  );
};

const SteamEffect = ({ isBoiling = false, potBounds = null }) => {
  const { tokens } = useTheme();
  const [particles, setParticles] = useState([]);
  const idRef = useRef(0);

  // Generate particles based on state
  useEffect(() => {
    const count = isBoiling ? 15 : 5;
    const newParticles = [];

    // Default bounds if not provided
    const bounds = potBounds || { width: 200, offsetX: 0 };

    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: idRef.current++,
        startX: bounds.offsetX + Math.random() * bounds.width,
        height: 80 + Math.random() * 60,
        drift: (Math.random() - 0.5) * 40, // Side drift
        size: isBoiling
          ? 24 + Math.random() * 32
          : 20 + Math.random() * 24,
        delay: Math.random() * (isBoiling ? 1 : 2.5),
        blur: 4 + Math.random() * 6,
      });
    }

    setParticles(newParticles);
  }, [isBoiling, potBounds]);

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '100%',
        left: 0,
        right: 0,
        height: 150,
        overflow: 'visible',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    >
      <AnimatePresence>
        {particles.map((particle) => (
          <SteamParticle
            key={particle.id}
            config={particle}
            isBoiling={isBoiling}
            tokens={tokens}
          />
        ))}
      </AnimatePresence>
    </Box>
  );
};

export default SteamEffect;
