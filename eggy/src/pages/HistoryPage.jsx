import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimerContext } from '../context/TimerContext';
import { useTheme } from '../context/ThemeContext';
import { dummyHistory } from '../data/dummyHistory';

/**
 * HISTORY PAGE - THEMED PREMIUM
 *
 * Dummy data: /src/data/dummyHistory.js
 *
 * Spacing system:
 * - 16px internal padding
 * - 12px gap between cards
 * - 24px top margin from header
 */

// Stats bar component - clean 3-column layout
const StatsBar = ({ stats, tokens, isDark }) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      bgcolor: isDark ? 'rgba(255, 255, 255, 0.06)' : '#FFFFFF',
      borderRadius: 3,
      overflow: 'hidden',
      boxShadow: isDark
        ? 'inset 0 1px 0 rgba(255,255,255,0.08)'
        : '0 2px 12px rgba(0, 0, 0, 0.06)',
      border: isDark
        ? '1px solid rgba(255, 255, 255, 0.08)'
        : '1px solid rgba(0, 0, 0, 0.04)',
    }}
  >
    {/* Total */}
    <Box sx={{ p: 2, textAlign: 'center' }}>
      <Typography
        sx={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: tokens.text.primary,
          lineHeight: 1.2,
        }}
      >
        {stats.total}
      </Typography>
      <Typography
        sx={{
          fontSize: '0.625rem',
          fontWeight: 600,
          color: tokens.text.tertiary,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          mt: 0.5,
        }}
      >
        Total
      </Typography>
    </Box>

    {/* Divider */}
    <Box
      sx={{
        borderLeft: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
        borderRight: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
        p: 2,
        textAlign: 'center',
      }}
    >
      <Typography
        sx={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: tokens.text.primary,
          lineHeight: 1.2,
        }}
      >
        {stats.thisWeek}
      </Typography>
      <Typography
        sx={{
          fontSize: '0.625rem',
          fontWeight: 600,
          color: tokens.text.tertiary,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          mt: 0.5,
        }}
      >
        This Week
      </Typography>
    </Box>

    {/* Favorite */}
    <Box sx={{ p: 2, textAlign: 'center' }}>
      <Typography
        sx={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: tokens.text.primary,
          lineHeight: 1.2,
        }}
      >
        {stats.favorite}
      </Typography>
      <Typography
        sx={{
          fontSize: '0.625rem',
          fontWeight: 600,
          color: tokens.text.tertiary,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          mt: 0.5,
        }}
      >
        Favorite
      </Typography>
    </Box>
  </Box>
);

// History card component - compact and clean
const HistoryCard = ({ item, onDelete, tokens, isDark }) => {
  const typeColors = isDark
    ? { soft: '#7BBFEF', medium: '#5BA4D9', hard: '#4A90C7' }
    : { soft: '#FFB84D', medium: '#FF8C42', hard: '#E85D4C' };

  const color = item.preset ? typeColors[item.preset] : tokens.accent.primary;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          p: '12px 16px',
          bgcolor: isDark ? 'rgba(255, 255, 255, 0.06)' : '#FFFFFF',
          borderRadius: 2.5,
          boxShadow: isDark
            ? 'inset 0 1px 0 rgba(255,255,255,0.06)'
            : '0 1px 8px rgba(0, 0, 0, 0.04)',
          border: isDark
            ? '1px solid rgba(255, 255, 255, 0.06)'
            : '1px solid rgba(0, 0, 0, 0.03)',
        }}
      >
        {/* Egg icon with colored background */}
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            bgcolor: isDark ? `${color}25` : `${color}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            flexShrink: 0,
          }}
        >
          🥚
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              sx={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: tokens.text.primary,
              }}
            >
              {item.type}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: tokens.text.secondary,
              }}
            >
              · {item.duration} min
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: '0.6875rem',
              color: tokens.text.tertiary,
              mt: 0.25,
            }}
          >
            {item.date}
          </Typography>
        </Box>

        {/* Delete button */}
        <Box
          component="button"
          onClick={() => onDelete(item.id)}
          sx={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            border: 'none',
            bgcolor: 'transparent',
            color: tokens.text.tertiary,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.125rem',
            flexShrink: 0,
            transition: 'all 0.15s',
            '&:hover': {
              bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              color: tokens.accent.primary,
            },
          }}
        >
          ×
        </Box>
      </Box>
    </motion.div>
  );
};

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const { isCompleted } = useTimerContext();
  const { tokens, isDark } = useTheme();

  // Calculate stats from history
  const stats = {
    total: history.length,
    thisWeek: history.filter((_, i) => i < 3).length, // Simplified for dummy data
    favorite: history.length > 0
      ? history.reduce((acc, item) => {
          acc[item.type] = (acc[item.type] || 0) + 1;
          return acc;
        }, {})
      : {},
  };

  const favoriteType = Object.entries(stats.favorite).sort((a, b) => b[1] - a[1])[0];
  stats.favorite = favoriteType ? favoriteType[0] : '—';

  useEffect(() => {
    // Load dummy data for UI testing
    setHistory(dummyHistory);
  }, [isCompleted]);

  const handleDelete = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClear = () => {
    setHistory([]);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: tokens.bg.gradient,
        pb: 14,
        transition: 'background 0.4s ease',
      }}
    >
      <Box sx={{ maxWidth: 480, mx: 'auto', px: 2, pt: 3 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: tokens.text.primary,
              }}
            >
              History
            </Typography>

            {history.length > 0 && (
              <Box
                component="button"
                onClick={handleClear}
                sx={{
                  background: 'transparent',
                  border: 'none',
                  color: tokens.text.tertiary,
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  p: 0,
                  '&:hover': { color: tokens.accent.primary },
                }}
              >
                Clear all
              </Box>
            )}
          </Box>
        </motion.div>

        {/* Stats Bar */}
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Box sx={{ mb: 3 }}>
              <StatsBar
                stats={{
                  total: stats.total,
                  thisWeek: stats.thisWeek,
                  favorite: stats.favorite,
                }}
                tokens={tokens}
                isDark={isDark}
              />
            </Box>
          </motion.div>
        )}

        {/* History List */}
        <AnimatePresence mode="popLayout">
          {history.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography sx={{ fontSize: '2.5rem', mb: 1 }}>🥚</Typography>
                <Typography
                  sx={{
                    color: tokens.text.secondary,
                    fontWeight: 500,
                    fontSize: '0.9375rem',
                  }}
                >
                  No eggs yet
                </Typography>
                <Typography
                  sx={{
                    color: tokens.text.tertiary,
                    fontSize: '0.8125rem',
                    mt: 0.5,
                  }}
                >
                  Start cooking to build your history
                </Typography>
              </Box>
            </motion.div>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {history.map((item, index) => (
                <HistoryCard
                  key={item.id}
                  item={item}
                  onDelete={handleDelete}
                  tokens={tokens}
                  isDark={isDark}
                />
              ))}
            </Box>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default HistoryPage;
