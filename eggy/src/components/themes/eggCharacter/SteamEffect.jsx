import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box } from '@mui/material';
import { useTheme } from '../../../context/ThemeContext';

/**
 * STEAM EFFECT - HOT SPRING
 *
 * Gentle rising steam particles.
 * Slow, calm, spa-like.
 * Burst mode for timer completion.
 */

const SteamParticle = ({ config, tokens }) => (
  <motion.div
    initial={{
      x: config.startX,
      y: 0,
      opacity: 0,
      scale: config.startScale,
    }}
    animate={{
      x: config.startX + config.drift,
      y: -config.height,
      opacity: [0, config.maxOpacity, config.maxOpacity * 0.6, 0],
      scale: [config.startScale, config.endScale, config.endScale * 1.1],
    }}
    transition={{
      duration: config.duration,
      delay: config.delay,
      repeat: config.repeat ? Infinity : 0,
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
        ${tokens.steam || 'rgba(255, 255, 255, 0.6)'},
        ${tokens.steamGlow || 'rgba(255, 255, 255, 0.2)'} 60%,
        transparent
      )`,
      filter: `blur(${config.blur}px)`,
      pointerEvents: 'none',
    }}
  />
);

const SteamEffect = ({
  intensity = 'normal', // gentle, normal, burst
  poolWidth = 260,
}) => {
  const { tokens } = useTheme();
  const [particles, setParticles] = useState([]);
  const idRef = useRef(0);

  useEffect(() => {
    const configs = {
      gentle: {
        count: 4,
        heightMin: 60,
        heightMax: 90,
        sizeMin: 20,
        sizeMax: 35,
        durationMin: 4,
        durationMax: 6,
        delayMax: 3,
        opacity: 0.4,
        repeat: true,
      },
      normal: {
        count: 6,
        heightMin: 70,
        heightMax: 100,
        sizeMin: 25,
        sizeMax: 45,
        durationMin: 3.5,
        durationMax: 5,
        delayMax: 2,
        opacity: 0.5,
        repeat: true,
      },
      burst: {
        count: 10,
        heightMin: 80,
        heightMax: 130,
        sizeMin: 30,
        sizeMax: 55,
        durationMin: 1,
        durationMax: 1.5,
        delayMax: 0.3,
        opacity: 0.7,
        repeat: false,
      },
    };

    const cfg = configs[intensity] || configs.normal;
    const newParticles = [];
    const spreadWidth = poolWidth * 0.6;
    const offsetX = poolWidth * 0.2;

    for (let i = 0; i < cfg.count; i++) {
      newParticles.push({
        id: idRef.current++,
        startX: offsetX + Math.random() * spreadWidth,
        height: cfg.heightMin + Math.random() * (cfg.heightMax - cfg.heightMin),
        drift: (Math.random() - 0.5) * 30,
        size: cfg.sizeMin + Math.random() * (cfg.sizeMax - cfg.sizeMin),
        startScale: 0.4 + Math.random() * 0.2,
        endScale: 0.9 + Math.random() * 0.3,
        duration: cfg.durationMin + Math.random() * (cfg.durationMax - cfg.durationMin),
        delay: Math.random() * cfg.delayMax,
        blur: 5 + Math.random() * 5,
        maxOpacity: cfg.opacity,
        repeat: cfg.repeat,
      });
    }

    setParticles(newParticles);
  }, [intensity, poolWidth]);

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '85%',
        left: 0,
        right: 0,
        height: 140,
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
            tokens={tokens}
          />
        ))}
      </AnimatePresence>
    </Box>
  );
};

export default SteamEffect;
