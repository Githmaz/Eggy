import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import {
  Egg as EggIcon,
  History as HistoryIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Bottom Navigation Component
 * Provides navigation between main screens
 */
const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = [
    { path: '/timer', label: 'Timer', icon: <EggIcon /> },
    { path: '/history', label: 'History', icon: <HistoryIcon /> },
    { path: '/benefits', label: 'Benefits', icon: <FavoriteIcon /> },
  ];

  const currentIndex = routes.findIndex((route) => route.path === location.pathname);

  const handleChange = (_, newValue) => {
    navigate(routes[newValue].path);
  };

  // Don't show on splash screen
  if (location.pathname === '/') {
    return null;
  }

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
    >
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          borderRadius: '24px 24px 0 0',
          overflow: 'hidden',
        }}
        elevation={8}
      >
        <BottomNavigation
          value={currentIndex >= 0 ? currentIndex : 0}
          onChange={handleChange}
          sx={{
            height: { xs: 70, sm: 80 },
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            '& .MuiBottomNavigationAction-root': {
              minWidth: 80,
              py: 1.5,
              '&.Mui-selected': {
                '& .MuiSvgIcon-root': {
                  transform: 'scale(1.15)',
                },
              },
            },
          }}
        >
          {routes.map((route) => (
            <BottomNavigationAction
              key={route.path}
              label={route.label}
              icon={route.icon}
              sx={{
                '& .MuiBottomNavigationAction-label': {
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  mt: 0.5,
                  '&.Mui-selected': {
                    fontWeight: 600,
                  },
                },
                '& .MuiSvgIcon-root': {
                  transition: 'transform 0.2s ease',
                },
              }}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </motion.div>
  );
};

export default BottomNav;
