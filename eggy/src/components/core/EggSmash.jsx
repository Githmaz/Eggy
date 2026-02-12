import { useState, useCallback } from 'react';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

/**
 * EGG SMASH - Premium Interaction Effect
 *
 * When user taps anywhere:
 * - Egg drops from small height
 * - Small bounce
 * - Crack effect
 * - Shell pieces scatter outward
 * - Yolk splash spreads
 * - Fade out cleanly
 *
 * Physics-like animation, not cartoonish.
 */

// Shell piece component
const ShellPiece = ({ index, startX, startY }) => {
  const angle = (index * 60) + Math.random() * 30;
  const distance = 30 + Math.random() * 40;
  const rotation = Math.random() * 360;
  const size = 8 + Math.random() * 6;

  return (
    <motion.div
      initial={{
        x: startX,
        y: startY,
        scale: 1,
        opacity: 1,
        rotate: 0,
      }}
      animate={{
        x: startX + Math.cos(angle * Math.PI / 180) * distance,
        y: startY + Math.sin(angle * Math.PI / 180) * distance + 20,
        scale: 0.3,
        opacity: 0,
        rotate: rotation,
      }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{
        position: 'absolute',
        width: size,
        height: size * 0.8,
        background: 'linear-gradient(135deg, #FFFEF8 0%, #F5F0E8 100%)',
        borderRadius: '40% 60% 50% 50%',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        pointerEvents: 'none',
      }}
    />
  );
};

// Yolk splash component
const YolkSplash = ({ x, y }) => (
  <motion.div
    initial={{
      x: x - 25,
      y: y - 25,
      scale: 0.3,
      opacity: 1,
    }}
    animate={{
      scale: 1,
      opacity: 0,
    }}
    transition={{
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    }}
    style={{
      position: 'absolute',
      width: 50,
      height: 50,
      borderRadius: '45% 55% 50% 50%',
      background: 'radial-gradient(ellipse at 40% 40%, #FFD54F 0%, #FFAB40 60%, #FF9800 100%)',
      boxShadow: '0 2px 8px rgba(255, 152, 0, 0.3)',
      pointerEvents: 'none',
    }}
  />
);

// Dropping egg component
const DroppingEgg = ({ x, y, onComplete }) => (
  <motion.div
    initial={{
      x: x - 20,
      y: y - 60,
      scale: 0.8,
      opacity: 1,
    }}
    animate={{
      y: [y - 60, y - 5, y - 15, y - 5],
      scale: [0.8, 1, 0.95, 1],
      opacity: [1, 1, 1, 0],
    }}
    transition={{
      duration: 0.5,
      times: [0, 0.4, 0.6, 1],
      ease: [0.25, 0.46, 0.45, 0.94],
    }}
    onAnimationComplete={onComplete}
    style={{
      position: 'absolute',
      width: 40,
      height: 50,
      background: 'linear-gradient(165deg, #FFFFFF 0%, #FFFBF5 40%, #FFF5EA 100%)',
      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
      boxShadow: `
        0 4px 12px rgba(0,0,0,0.1),
        inset 0 -8px 16px rgba(0,0,0,0.02),
        inset 0 4px 10px rgba(255,255,255,0.9)
      `,
      pointerEvents: 'none',
    }}
  >
    {/* Yolk inside */}
    <Box
      sx={{
        position: 'absolute',
        top: '28%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '38%',
        height: '30%',
        borderRadius: '50%',
        background: 'linear-gradient(145deg, #FFD54F 0%, #FFAB40 100%)',
      }}
    />
    {/* Highlight */}
    <Box
      sx={{
        position: 'absolute',
        top: '12%',
        left: '22%',
        width: '20%',
        height: '12%',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.9)',
        filter: 'blur(2px)',
      }}
    />
  </motion.div>
);

// Crack lines component
const CrackLines = ({ x, y }) => (
  <motion.svg
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: [0, 1, 0], scale: 1 }}
    transition={{ duration: 0.6 }}
    style={{
      position: 'absolute',
      left: x - 30,
      top: y - 30,
      width: 60,
      height: 60,
      pointerEvents: 'none',
    }}
  >
    <motion.path
      d="M30 30 L20 15 L25 25 L10 20"
      stroke="rgba(0,0,0,0.2)"
      strokeWidth="1.5"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.3 }}
    />
    <motion.path
      d="M30 30 L40 12 L35 22 L50 18"
      stroke="rgba(0,0,0,0.2)"
      strokeWidth="1.5"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.3, delay: 0.05 }}
    />
    <motion.path
      d="M30 30 L45 40 L38 35 L48 50"
      stroke="rgba(0,0,0,0.2)"
      strokeWidth="1.5"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    />
  </motion.svg>
);

const EggSmash = ({ children }) => {
  const { isDark } = useTheme();
  const [smashes, setSmashes] = useState([]);

  const handleClick = useCallback((e) => {
    // Get click position relative to container
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const id = Date.now();
    setSmashes((prev) => [...prev, { id, x, y, phase: 'drop' }]);

    // Move to crack phase after drop
    setTimeout(() => {
      setSmashes((prev) =>
        prev.map((s) => (s.id === id ? { ...s, phase: 'crack' } : s))
      );
    }, 400);

    // Remove after animation
    setTimeout(() => {
      setSmashes((prev) => prev.filter((s) => s.id !== id));
    }, 1200);
  }, []);

  return (
    <Box
      onClick={handleClick}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        cursor: 'pointer',
      }}
    >
      {children}

      {/* Smash effects layer */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <AnimatePresence>
          {smashes.map((smash) => (
            <Box key={smash.id}>
              {smash.phase === 'drop' && (
                <DroppingEgg
                  x={smash.x}
                  y={smash.y}
                  onComplete={() => {}}
                />
              )}

              {smash.phase === 'crack' && (
                <>
                  {/* Crack lines */}
                  <CrackLines x={smash.x} y={smash.y} />

                  {/* Shell pieces */}
                  {[...Array(6)].map((_, i) => (
                    <ShellPiece
                      key={i}
                      index={i}
                      startX={smash.x}
                      startY={smash.y}
                    />
                  ))}

                  {/* Yolk splash */}
                  <YolkSplash x={smash.x} y={smash.y} />
                </>
              )}
            </Box>
          ))}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default EggSmash;
