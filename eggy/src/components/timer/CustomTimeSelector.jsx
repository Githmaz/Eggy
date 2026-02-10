import { Box, Typography, Slider, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { formatTime } from '../../utils/constants';

/**
 * Custom Time Selector Component
 * Allows user to set custom cooking time with slider and +/- buttons
 *
 * @param {number} value - Current time in seconds
 * @param {Function} onChange - Callback when time changes
 * @param {boolean} disabled - Whether selector is disabled
 * @param {number} min - Minimum time in seconds
 * @param {number} max - Maximum time in seconds
 */
const CustomTimeSelector = ({
  value = 360,
  onChange,
  disabled = false,
  min = 60,
  max = 1200,
}) => {
  const handleIncrement = () => {
    const newValue = Math.min(value + 30, max);
    onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - 30, min);
    onChange(newValue);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Box
        sx={{
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
          border: '1px solid rgba(0, 0, 0, 0.04)',
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', mb: 2, textAlign: 'center' }}
        >
          Or set custom time
        </Typography>

        {/* Time display with +/- buttons */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            mb: 3,
          }}
        >
          <IconButton
            onClick={handleDecrement}
            disabled={disabled || value <= min}
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.04)',
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.08)' },
              '&:disabled': { opacity: 0.3 },
            }}
          >
            <Remove />
          </IconButton>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontFamily: 'SF Mono, Monaco, Consolas, monospace',
              minWidth: 120,
              textAlign: 'center',
            }}
          >
            {formatTime(value)}
          </Typography>

          <IconButton
            onClick={handleIncrement}
            disabled={disabled || value >= max}
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.04)',
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.08)' },
              '&:disabled': { opacity: 0.3 },
            }}
          >
            <Add />
          </IconButton>
        </Box>

        {/* Slider */}
        <Slider
          value={value}
          onChange={(_, newValue) => onChange(newValue)}
          disabled={disabled}
          min={min}
          max={max}
          step={30}
          sx={{
            color: 'primary.main',
            '& .MuiSlider-thumb': {
              '&:hover, &.Mui-focusVisible': {
                boxShadow: '0 0 0 8px rgba(255, 149, 0, 0.16)',
              },
            },
          }}
        />

        {/* Min/Max labels */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 1,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {formatTime(min)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatTime(max)}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

export default CustomTimeSelector;
