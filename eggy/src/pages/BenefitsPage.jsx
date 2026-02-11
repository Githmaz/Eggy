import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { EGG_BENEFITS } from '../utils/constants';
import { useTheme } from '../context/ThemeContext';

/**
 * BENEFITS PAGE - THEMED PREMIUM
 *
 * Modern infographic style.
 * Light: Cream background, warm cards
 * Dark: Deep blue, glass cards with glow
 */

const BenefitCard = ({ benefit, index, tokens, isDark }) => {
  const iconBg = isDark
    ? {
        protein: 'rgba(254, 226, 226, 0.15)',
        brain: 'rgba(219, 234, 254, 0.15)',
        energy: 'rgba(254, 243, 199, 0.15)',
        muscle: 'rgba(209, 250, 229, 0.15)',
        eyes: 'rgba(224, 231, 255, 0.15)',
        heart: 'rgba(252, 231, 243, 0.15)',
      }
    : {
        protein: '#FEE2E2',
        brain: '#DBEAFE',
        energy: '#FEF3C7',
        muscle: '#D1FAE5',
        eyes: '#E0E7FF',
        heart: '#FCE7F3',
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Box
        sx={{
          p: 2.5,
          bgcolor: isDark ? tokens.bg.card : tokens.bg.cardSolid,
          borderRadius: 4,
          boxShadow: tokens.shadow.soft,
          display: 'flex',
          gap: 2,
          backdropFilter: isDark ? 'blur(10px)' : 'none',
          border: isDark ? `1px solid ${tokens.surface.navBorder}` : 'none',
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 3,
            bgcolor: iconBg[benefit.id] || (isDark ? 'rgba(255,255,255,0.1)' : '#F0F0F0'),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            flexShrink: 0,
          }}
        >
          {benefit.icon}
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '0.9375rem',
              color: tokens.text.primary,
              mb: 0.5,
            }}
          >
            {benefit.title}
          </Typography>

          <Typography
            sx={{
              fontSize: '0.8125rem',
              color: tokens.text.secondary,
              lineHeight: 1.5,
            }}
          >
            {benefit.description}
          </Typography>

          {/* Stat badge */}
          <Box
            sx={{
              display: 'inline-block',
              mt: 1.5,
              px: 1.5,
              py: 0.5,
              bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
              borderRadius: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: tokens.text.tertiary,
              }}
            >
              {benefit.stats}
            </Typography>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

const BenefitsPage = () => {
  const { tokens, isDark } = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: tokens.bg.gradient,
        pb: 14,
        transition: 'background 0.4s ease',
      }}
    >
      <Box sx={{ maxWidth: 480, mx: 'auto', px: 2.5, pt: 4 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Typography variant="h2" sx={{ mb: 1, color: tokens.text.primary }}>
            Why Eggs?
          </Typography>
          <Typography
            sx={{
              color: tokens.text.secondary,
              fontSize: '0.9375rem',
              mb: 4,
            }}
          >
            Discover the health benefits of eggs
          </Typography>
        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              py: 3,
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: isDark ? `${tokens.accent.primary}30` : `${tokens.accent.primary}18`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                boxShadow: isDark ? `0 0 40px ${tokens.accent.glow}` : 'none',
              }}
            >
              🥚
            </Box>
          </Box>
        </motion.div>

        {/* Benefits */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {EGG_BENEFITS.map((benefit, index) => (
            <BenefitCard
              key={benefit.id}
              benefit={benefit}
              index={index}
              tokens={tokens}
              isDark={isDark}
            />
          ))}
        </Box>

        {/* Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Box
            sx={{
              mt: 4,
              p: 2.5,
              borderRadius: 4,
              bgcolor: isDark ? `${tokens.accent.primary}20` : `${tokens.accent.primary}0F`,
              textAlign: 'center',
              backdropFilter: isDark ? 'blur(10px)' : 'none',
            }}
          >
            <Typography
              sx={{
                fontSize: '0.8125rem',
                color: tokens.text.secondary,
              }}
            >
              Pair eggs with vegetables for maximum nutrition
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default BenefitsPage;
