import { motion } from 'framer-motion';
import { Box } from '@mui/material';
import Bubbles from './Bubbles';
import Steam from './Steam';
import Egg from './Egg';

/**
 * Complete Pot Component with Egg, Water, Bubbles, and Steam
 * Main visual component for the cooking screen
 *
 * @param {number} progress - Cooking progress from 0 to 1
 * @param {boolean} isBoiling - Whether currently cooking
 * @param {boolean} isCompleted - Whether cooking is complete
 */
const Pot = ({ progress = 0, isBoiling = false, isCompleted = false }) => {
  // Water level animation based on boiling state
  const waterAnimation = isBoiling
    ? {
        y: [0, -2, 0, -1, 0],
        scaleY: [1, 1.02, 1, 1.01, 1],
      }
    : {};

  return (
    <Box
      sx={{
        position: 'relative',
        width: { xs: 280, sm: 320, md: 360 },
        height: { xs: 280, sm: 320, md: 360 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Steam effect above pot */}
      <Box sx={{ position: 'absolute', top: 20, left: 0, right: 0 }}>
        <Steam isActive={isBoiling} count={6} />
      </Box>

      {/* Pot container */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '70%',
          marginTop: '15%',
        }}
      >
        {/* Pot body */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: '10%',
            width: '80%',
            height: '75%',
            background: 'linear-gradient(180deg, #4A4A4A 0%, #2D2D2D 50%, #1A1A1A 100%)',
            borderRadius: '10% 10% 45% 45% / 5% 5% 35% 35%',
            boxShadow: `
              inset 0 -20px 40px rgba(0, 0, 0, 0.4),
              inset 0 10px 20px rgba(255, 255, 255, 0.1),
              0 20px 40px rgba(0, 0, 0, 0.3)
            `,
            overflow: 'hidden',
          }}
        >
          {/* Water */}
          <motion.div
            animate={waterAnimation}
            transition={{
              duration: 0.8,
              repeat: isBoiling ? Infinity : 0,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '85%',
              background: 'linear-gradient(180deg, rgba(135, 206, 250, 0.7) 0%, rgba(100, 180, 230, 0.8) 50%, rgba(70, 150, 200, 0.9) 100%)',
              borderRadius: '0 0 42% 42% / 0 0 30% 30%',
            }}
          >
            {/* Water surface highlight */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: '10%',
                right: '10%',
                height: 8,
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                borderRadius: '50%',
              }}
            />

            {/* Bubbles animation */}
            <Bubbles isActive={isBoiling} count={15} />
          </motion.div>

          {/* Egg in the pot */}
          <Box
            sx={{
              position: 'absolute',
              bottom: '15%',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
            }}
          >
            <Egg
              progress={progress}
              isBoiling={isBoiling}
              isCompleted={isCompleted}
              size={80}
            />
          </Box>
        </Box>

        {/* Pot rim */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '72%',
            left: '5%',
            width: '90%',
            height: '12%',
            background: 'linear-gradient(180deg, #5A5A5A 0%, #3D3D3D 50%, #4A4A4A 100%)',
            borderRadius: '50% 50% 40% 40% / 100% 100% 30% 30%',
            boxShadow: `
              inset 0 -5px 10px rgba(0, 0, 0, 0.3),
              inset 0 5px 10px rgba(255, 255, 255, 0.1),
              0 5px 15px rgba(0, 0, 0, 0.2)
            `,
          }}
        />

        {/* Left handle */}
        <Box
          sx={{
            position: 'absolute',
            top: '25%',
            left: '-8%',
            width: '18%',
            height: '20%',
            background: 'linear-gradient(90deg, #3D3D3D 0%, #5A5A5A 50%, #3D3D3D 100%)',
            borderRadius: '30% 0 0 30%',
            boxShadow: 'inset 2px 0 5px rgba(255, 255, 255, 0.1), -3px 3px 10px rgba(0, 0, 0, 0.3)',
          }}
        />

        {/* Right handle */}
        <Box
          sx={{
            position: 'absolute',
            top: '25%',
            right: '-8%',
            width: '18%',
            height: '20%',
            background: 'linear-gradient(90deg, #3D3D3D 0%, #5A5A5A 50%, #3D3D3D 100%)',
            borderRadius: '0 30% 30% 0',
            boxShadow: 'inset -2px 0 5px rgba(255, 255, 255, 0.1), 3px 3px 10px rgba(0, 0, 0, 0.3)',
          }}
        />
      </Box>

      {/* Completion glow effect */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.5, 0.3], scale: [0.8, 1.1, 1] }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            inset: -20,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 149, 0, 0.3) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      )}
    </Box>
  );
};

export default Pot;
