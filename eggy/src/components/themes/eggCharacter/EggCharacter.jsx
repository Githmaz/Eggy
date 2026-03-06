import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';
import {
  IdleExpression,
  NervousExpression,
  ExcitedExpression,
  BoilingExpression,
  HappyExpression,
} from './EggExpressions';

/**
 * EGG CHARACTER - MINIMAL
 *
 * Clean, minimal egg with subtle expressions.
 * Soft shadows, no outlines.
 * Japanese onsen aesthetic.
 */

const EggCharacter = ({
  expression = 'idle', // idle, nervous, excited, relaxed, happy
  size = 100,
  animate = true,
}) => {
  const { tokens } = useTheme();

  // Get the expression component
  const ExpressionComponent = {
    idle: IdleExpression,
    nervous: NervousExpression,
    excited: ExcitedExpression,
    boiling: BoilingExpression,
    relaxed: BoilingExpression,
    happy: HappyExpression,
  }[expression] || IdleExpression;

  // Subtle floating animation for bathing
  const floatAnimation = animate && (expression === 'relaxed' || expression === 'boiling') ? {
    y: [0, -2, 0, -1, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  } : {};

  // Gentle idle animation
  const idleAnimation = animate && expression === 'idle' ? {
    y: [0, -2, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  } : {};

  // Happy subtle bounce
  const happyAnimation = animate && expression === 'happy' ? {
    y: [0, -8, 0],
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  } : {};

  // Combine animations
  const animationProps = expression === 'happy'
    ? happyAnimation
    : (expression === 'relaxed' || expression === 'boiling')
    ? floatAnimation
    : idleAnimation;

  return (
    <motion.div
      animate={animationProps}
      style={{
        width: size,
        height: size * 1.2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        viewBox="0 0 100 120"
        width={size}
        height={size * 1.2}
        style={{ overflow: 'visible' }}
      >
        {/* Definitions */}
        <defs>
          {/* Soft drop shadow */}
          <filter id="eggShadow" x="-30%" y="-20%" width="160%" height="150%">
            <feDropShadow
              dx="0"
              dy="6"
              stdDeviation="8"
              floodColor={tokens.egg?.shadow || 'rgba(0,0,0,0.1)'}
            />
          </filter>
          {/* Egg body gradient */}
          <linearGradient id="eggBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF9" />
            <stop offset="40%" stopColor="#FFF8F0" />
            <stop offset="100%" stopColor="#F5EBE0" />
          </linearGradient>
          {/* Subtle highlight */}
          <radialGradient id="eggHighlight" cx="30%" cy="20%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {/* Egg body - smooth organic shape */}
        <path
          d="M 50 12
             C 22 32, 18 60, 18 75
             C 18 98, 32 108, 50 108
             C 68 108, 82 98, 82 75
             C 82 60, 78 32, 50 12
             Z"
          fill="url(#eggBodyGradient)"
          filter="url(#eggShadow)"
        />

        {/* Highlight overlay */}
        <ellipse
          cx="36"
          cy="32"
          rx="16"
          ry="14"
          fill="url(#eggHighlight)"
          opacity="0.8"
        />

        {/* Expression */}
        <ExpressionComponent tokens={tokens} />
      </svg>
    </motion.div>
  );
};

export default EggCharacter;
