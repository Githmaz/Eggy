import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { TimerProvider } from './context/TimerContext';
import { SplashPage, TimerPage, HistoryPage, BenefitsPage } from './pages';
import BottomBar from './components/core/BottomBar';
import TopNotification from './components/core/TopNotification';
import ThemeToggle from './components/core/ThemeToggle';

/**
 * EGGY APP - 2025 PREMIUM DESIGN
 * Light Cream / Dark Deep Blue Themes
 */
function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <BrowserRouter>
        <TimerProvider>
          <TopNotification />
          <ThemeToggle />

          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<SplashPage />} />
              <Route path="/timer" element={<TimerPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/benefits" element={<BenefitsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>

          <BottomBar />
        </TimerProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
