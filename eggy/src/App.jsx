import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import theme from './theme/theme';
import { TimerProvider } from './context/TimerContext';
import { SplashPage, TimerPage, HistoryPage, BenefitsPage } from './pages';
import { BottomNav } from './components';
import TopNotification from './components/common/TopNotification';
import TopProgressBar from './components/common/TopProgressBar';

/**
 * Main App Component
 * Sets up theme, global timer context, routing, and navigation
 * Timer persists across all pages via TimerProvider
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <TimerProvider>
          {/* Global notification when egg is done */}
          <TopNotification />

          {/* Progress bar shown on other pages when cooking */}
          <TopProgressBar />

          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<SplashPage />} />
              <Route path="/timer" element={<TimerPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/benefits" element={<BenefitsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>

          <BottomNav />
        </TimerProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
