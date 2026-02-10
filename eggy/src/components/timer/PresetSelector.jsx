import { Box, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { EGG_PRESETS } from '../../utils/constants';

/**
 * Preset Selector Component
 * Allows user to select egg cooking presets (Soft, Medium, Hard)
 *
 * @param {string} selectedPreset - Currently selected preset ID
 * @param {Function} onSelect - Callback when preset is selected
 * @param {boolean} disabled - Whether selector is disabled
 */
const PresetSelector = ({ selectedPreset, onSelect, disabled = false }) => {
  const presets = Object.values(EGG_PRESETS);

  return (
    <Box
      sx={{
        display: 'flex',
        gap: { xs: 1.5, sm: 2 },
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {presets.map((preset, index) => {
        const isSelected = selectedPreset === preset.id;

        return (
          <motion.div
            key={preset.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
          >
            <Button
              onClick={() => onSelect(preset.id)}
              disabled={disabled}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                p: { xs: 2, sm: 2.5 },
                minWidth: { xs: 100, sm: 120 },
                borderRadius: 3,
                border: '2px solid',
                borderColor: isSelected ? 'primary.main' : 'rgba(0, 0, 0, 0.08)',
                bgcolor: isSelected ? 'rgba(255, 149, 0, 0.08)' : 'background.paper',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: isSelected ? 'rgba(255, 149, 0, 0.12)' : 'rgba(0, 0, 0, 0.02)',
                  borderColor: isSelected ? 'primary.main' : 'rgba(0, 0, 0, 0.15)',
                },
                '&:disabled': {
                  opacity: 0.6,
                },
              }}
            >
              {/* Color indicator */}
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: `linear-gradient(145deg, ${preset.color}cc, ${preset.color})`,
                  boxShadow: isSelected
                    ? `0 4px 15px ${preset.color}40`
                    : '0 2px 8px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  transition: 'all 0.2s ease',
                }}
              >
                {preset.icon}
              </Box>

              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: isSelected ? 700 : 600,
                    color: isSelected ? 'primary.main' : 'text.primary',
                    lineHeight: 1.2,
                  }}
                >
                  {preset.name.split(' ')[0]}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: 'text.secondary', display: 'block' }}
                >
                  {Math.floor(preset.duration / 60)} min
                </Typography>
              </Box>
            </Button>
          </motion.div>
        );
      })}
    </Box>
  );
};

export default PresetSelector;
