import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box } from '@mui/material';

/**
 * EGG DROP ANIMATION
 *
 * Sequence when timer starts:
 * 1. Egg drops from above with bounce
 * 2. Splash effect on impact
 * 3. Egg settles in water
 */

// Water splash droplets
const SplashDroplet = ({ index, centerX }) => {
  const angle = (index * 45) + Math.random() * 20;
  const distance = 20 + Math.random() * 30;
  const size = 4 + Math.random() * 6;

  return (
    <motion.div
      initial={{
        x: centerX,
        y: 0,
        opacity: 1,
        scale: 0,
      }}
      animate={{
        x: centerX + Math.cos((angle * Math.PI) / 180) * distance,
        y: -Math.sin((angle * Math.PI) / 180) * distance,
        opacity: 0,
        scale: [0, 1.5, 0.5],
      }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
      }}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'rgba(135, 206, 250, 0.8)',
        boxShadow: '0 0 4px rgba(135, 206, 250, 0.5)',
        pointerEvents: 'none',
      }}
    />
  );
};

// Splash ring effect
const SplashRing = ({ centerX }) => (
  <motion.div
    initial={{
      x: centerX - 30,
      y: -10,
      opacity: 0.8,
      scale: 0.3,
    }}
    animate={{
      opacity: 0,
      scale: 1.5,
    }}
    transition={{
      duration: 0.6,
      ease: 'easeOut',
    }}
    style={{
      position: 'absolute',
      width: 60,
      height: 20,
      borderRadius: '50%',
      border: '2px solid rgba(135, 206, 250, 0.6)',
      background: 'transparent',
      pointerEvents: 'none',
    }}
  />
);

// Dropping egg component
const DroppingEgg = ({ onLand }) => (
  <motion.div
    initial={{
      y: -150,
      scale: 0.6,
      opacity: 1,
    }}
    animate={{
      y: [- 150, 0, -15, 0],
      scale: [0.6, 1, 0.95, 1],
    }}
    transition={{
      duration: 0.6,
      times: [0, 0.5, 0.7, 1],
      ease: [0.25, 0.46, 0.45, 0.94],
    }}
    onAnimationComplete={onLand}
    style={{
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 50,
      height: 62,
      background: 'linear-gradient(165deg, #FFFFFF 0%, #FFFBF5 40%, #FFF5EA 100%)',
      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
      boxShadow: `
        0 4px 16px rgba(0, 0, 0, 0.15),
        inset 0 -10px 20px rgba(0, 0, 0, 0.03),
        inset 0 4px 12px rgba(255, 255, 255, 0.9)
      `,
      pointerEvents: 'none',
      zIndex: 10,
    }}
  >
    {/* Yolk visible inside */}
    <Box
      sx={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '40%',
        height: '32%',
        borderRadius: '50%',
        background: 'linear-gradient(145deg, #FFD54F 0%, #FFAB40 100%)',
        opacity: 0.9,
      }}
    />
    {/* Highlight */}
    <Box
      sx={{
        position: 'absolute',
        top: '12%',
        left: '20%',
        width: '25%',
        height: '15%',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.95)',
        filter: 'blur(2px)',
      }}
    />
  </motion.div>
);

// Settled egg in water
const SettledEgg = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    style={{
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 50,
      height: 62,
      background: 'linear-gradient(165deg, #FFFFFF 0%, #FFFBF5 40%, #FFF5EA 100%)',
      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
      boxShadow: `
        0 4px 16px rgba(0, 0, 0, 0.1),
        inset 0 -10px 20px rgba(0, 0, 0, 0.02),
        inset 0 4px 12px rgba(255, 255, 255, 0.9)
      `,
      pointerEvents: 'none',
      zIndex: 10,
    }}
  >
    {/* Yolk */}
    <Box
      sx={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '40%',
        height: '32%',
        borderRadius: '50%',
        background: 'linear-gradient(145deg, #FFD54F 0%, #FFAB40 100%)',
        opacity: 0.9,
      }}
    />
    {/* Highlight */}
    <Box
      sx={{
        position: 'absolute',
        top: '12%',
        left: '20%',
        width: '25%',
        height: '15%',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.95)',
        filter: 'blur(2px)',
      }}
    />
  </motion.div>
);

const EggDropAnimation = ({ isActive = false, hasDropped = false }) => {
  const [phase, setPhase] = useState('idle'); // 'idle' | 'dropping' | 'splash' | 'settled'

  useEffect(() => {
    if (isActive && !hasDropped) {
      // Start drop animation
      setPhase('dropping');
    } else if (hasDropped) {
      setPhase('settled');
    } else {
      setPhase('idle');
    }
  }, [isActive, hasDropped]);

  const handleLand = () => {
    setPhase('splash');
    setTimeout(() => {
      setPhase('settled');
    }, 500);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 80,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <AnimatePresence mode="wait">
        {phase === 'dropping' && (
          <DroppingEgg key="dropping" onLand={handleLand} />
        )}

        {phase === 'splash' && (
          <Box key="splash" sx={{ position: 'absolute', width: '100%', height: '100%' }}>
            <SettledEgg />
            <SplashRing centerX="50%" />
            {[...Array(8)].map((_, i) => (
              <SplashDroplet key={i} index={i} centerX="50%" />
            ))}
          </Box>
        )}

        {phase === 'settled' && (
          <SettledEgg key="settled" />
        )}
      </AnimatePresence>
    </Box>
  );
};

export default EggDropAnimation;
