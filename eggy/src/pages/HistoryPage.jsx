import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Delete, DeleteSweep } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import PageContainer from '../components/common/PageContainer';
import { useTimerContext } from '../context/TimerContext';
import { getHistory, deleteHistoryItem, clearHistory, getStats } from '../utils/storage';
import { formatTime, formatDate, EGG_PRESETS } from '../utils/constants';

/**
 * History Page
 * Displays cooking history with stats and management options
 * Auto-refreshes when timer completes
 */
const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  const { isCompleted } = useTimerContext();

  // Load history and stats on mount and when timer completes
  useEffect(() => {
    const loadData = () => {
      setHistory(getHistory());
      setStats(getStats());
    };

    loadData();
  }, [isCompleted]); // Refresh when timer completes

  // Handle delete single item
  const handleDelete = (id) => {
    const updated = deleteHistoryItem(id);
    setHistory(updated);
    setStats(getStats());
  };

  // Handle clear all
  const handleClearAll = () => {
    clearHistory();
    setHistory([]);
    setStats(getStats());
    setClearDialogOpen(false);
  };

  // Get preset color for history item
  const getPresetColor = (item) => {
    if (item.preset && EGG_PRESETS[item.preset]) {
      return EGG_PRESETS[item.preset].color;
    }
    return '#FF9500';
  };

  return (
    <PageContainer>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            History
          </Typography>

          {history.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<DeleteSweep />}
              onClick={() => setClearDialogOpen(true)}
              sx={{ fontSize: '0.8rem' }}
            >
              Clear
            </Button>
          )}
        </Box>
      </motion.div>

      {/* Stats Section */}
      {stats && stats.totalEggs > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card
            sx={{
              mb: 3,
              background: 'linear-gradient(135deg, #FF9500 0%, #E08600 100%)',
              color: 'white',
              '&:hover': {
                transform: 'none',
              },
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 500, opacity: 0.9 }}>
                Your Stats
              </Typography>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 1.5,
                  textAlign: 'center',
                }}
              >
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {stats.totalEggs}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.85 }}>
                    Total
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {stats.eggsThisWeek}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.85 }}>
                    This Week
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>
                    {stats.favoriteType ? stats.favoriteType.split(' ')[0] : '-'}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.85 }}>
                    Favorite
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* History List */}
      <AnimatePresence mode="popLayout">
        {history.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Box
              sx={{
                textAlign: 'center',
                py: 6,
                px: 3,
              }}
            >
              <Typography sx={{ fontSize: '3.5rem', mb: 2 }}>
                🥚
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                No eggs cooked yet
              </Typography>
              <Typography variant="body2" color="text.disabled" sx={{ mt: 0.5 }}>
                Start cooking to build your history
              </Typography>
            </Box>
          </motion.div>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {history.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
                layout
              >
                <Card
                  sx={{
                    '&:hover': {
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 2,
                      '&:last-child': { pb: 2 },
                    }}
                  >
                    {/* Color indicator */}
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        background: `linear-gradient(145deg, ${getPresetColor(item)}dd, ${getPresetColor(item)})`,
                        boxShadow: `0 3px 10px ${getPresetColor(item)}30`,
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.3rem',
                      }}
                    >
                      🥚
                    </Box>

                    {/* Info */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 0.25,
                        }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {item.eggType}
                        </Typography>
                        <Chip
                          label={formatTime(item.duration)}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            bgcolor: 'rgba(0, 0, 0, 0.05)',
                          }}
                        />
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(item.completedAt)}
                      </Typography>
                    </Box>

                    {/* Delete button */}
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(item.id)}
                      sx={{
                        color: 'text.disabled',
                        '&:hover': {
                          color: 'error.main',
                          bgcolor: 'rgba(239, 68, 68, 0.08)',
                        },
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        )}
      </AnimatePresence>

      {/* Clear All Dialog */}
      <Dialog
        open={clearDialogOpen}
        onClose={() => setClearDialogOpen(false)}
        PaperProps={{ sx: { borderRadius: 4, p: 1, maxWidth: 340 } }}
      >
        <DialogTitle sx={{ fontWeight: 600, pb: 1 }}>Clear All History?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            This will permanently delete all {history.length} cooking records.
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 1 }}>
          <Button onClick={() => setClearDialogOpen(false)} sx={{ fontWeight: 500 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleClearAll}
          >
            Clear All
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default HistoryPage;
