import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';
import WaterRipple from './WaterRipple';
import SteamEffect from './SteamEffect';

/**
 * HOT SPRING POOL
 *
 * Modern minimal hot spring / onsen pool.
 * Soft rounded shape, warm aqua water, gentle steam.
 * Japanese spa aesthetic.
 */

// Subtle water surface shimmer
const WaterSurface = ({ tokens }) => (
  <motion.div
    animate={{
      opacity: [0.3, 0.5, 0.3],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    style={{
      position: 'absolute',
      top: 8,
      left: '10%',
      right: '10%',
      height: 12,
      background: `linear-gradient(90deg,
        transparent 0%,
        ${tokens.pool?.glass || 'rgba(255,255,255,0.25)'} 30%,
        ${tokens.pool?.glass || 'rgba(255,255,255,0.25)'} 70%,
        transparent 100%
      )`,
      borderRadius: '50%',
      filter: 'blur(2px)',
    }}
  />
);

// Glass reflection effect
const GlassReflection = ({ tokens }) => (
  <Box
    sx={{
      position: 'absolute',
      top: 15,
      left: '15%',
      width: '30%',
      height: '25%',
      background: `linear-gradient(180deg,
        ${tokens.pool?.glass || 'rgba(255,255,255,0.2)'} 0%,
        transparent 100%
      )`,
      borderRadius: '50%',
      filter: 'blur(4px)',
      pointerEvents: 'none',
    }}
  />
);

const HotSpringPool = ({
  showEgg = false,
  eggComponent = null,
  isActive = false, // Timer running
  showSplash = false,
  showRipples = false,
  steamIntensity = 'normal', // none, gentle, normal, burst
}) => {
  const { tokens, isDark } = useTheme();

  const poolWidth = 260;
  const poolHeight = 120;
  const waterDepth = 85;

  return (
    <Box
      sx={{
        position: 'relative',
        width: poolWidth,
        height: poolHeight + 100, // Extra space for steam
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Steam effect */}
      <AnimatePresence>
        {(isActive || steamIntensity === 'burst') && (
          <SteamEffect
            intensity={steamIntensity}
            poolWidth={poolWidth}
          />
        )}
      </AnimatePresence>

      {/* Main pool */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          width: poolWidth,
          height: poolHeight,
        }}
      >
        {/* Pool outer edge (stone rim) */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: tokens.pool?.edge || 'linear-gradient(180deg, #E8E0D8 0%, #D8CFC5 50%, #C8BFB5 100%)',
            borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
            boxShadow: isDark
              ? '0 8px 32px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.05)'
              : '0 8px 32px rgba(0,0,0,0.12), inset 0 2px 4px rgba(255,255,255,0.5)',
          }}
        />

        {/* Pool inner edge */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            right: 8,
            bottom: 8,
            background: tokens.pool?.edgeInner || 'linear-gradient(180deg, #D8CFC5 0%, #C8BFB5 100%)',
            borderRadius: '50% 50% 50% 50% / 35% 35% 65% 65%',
          }}
        />

        {/* Water container */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            right: 16,
            bottom: 16,
            borderRadius: '50% 50% 50% 50% / 30% 30% 70% 70%',
            overflow: 'hidden',
          }}
        >
          {/* Water fill */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: tokens.pool?.water || 'linear-gradient(180deg, rgba(127, 199, 199, 0.7) 0%, rgba(100, 180, 180, 0.85) 100%)',
            }}
          />

          {/* Water surface shimmer */}
          <WaterSurface tokens={tokens} />

          {/* Glass reflection */}
          <GlassReflection tokens={tokens} />

          {/* Ripples */}
          <AnimatePresence>
            {(showRipples || isActive) && (
              <WaterRipple intensity={showSplash ? 'splash' : 'gentle'} />
            )}
          </AnimatePresence>

          {/* Splash effect */}
          <AnimatePresence>
            {showSplash && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute',
                  top: '30%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 10,
                }}
              >
                {/* Splash droplets */}
                {[...Array(6)].map((_, i) => {
                  const angle = (i / 6) * Math.PI + Math.PI;
                  const distance = 20 + Math.random() * 25;
                  return (
                    <motion.div
                      key={i}
                      initial={{
                        x: 0,
                        y: 0,
                        scale: 0,
                        opacity: 1,
                      }}
                      animate={{
                        x: Math.cos(angle) * distance,
                        y: Math.sin(angle) * distance - 15,
                        scale: [0, 1, 0.5],
                        opacity: [1, 1, 0],
                      }}
                      transition={{
                        duration: 0.35,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      style={{
                        position: 'absolute',
                        width: 6 + Math.random() * 6,
                        height: 6 + Math.random() * 6,
                        borderRadius: '50%',
                        background: tokens.pool?.waterSurface || 'rgba(180, 230, 230, 0.7)',
                        boxShadow: `0 0 4px ${tokens.pool?.waterSurface || 'rgba(180, 230, 230, 0.5)'}`,
                      }}
                    />
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Egg in water */}
          {showEgg && eggComponent && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 5,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 5,
              }}
            >
              {eggComponent}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HotSpringPool;
