// LocalStorage utility functions with error handling

const STORAGE_KEYS = {
  HISTORY: 'eggy_history',
  SETTINGS: 'eggy_settings',
};

/**
 * Get item from localStorage with JSON parsing
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {any} Parsed value or default
 */
export const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage: ${key}`, error);
    return defaultValue;
  }
};

/**
 * Set item in localStorage with JSON stringification
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 * @returns {boolean} Success status
 */
export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage: ${key}`, error);
    return false;
  }
};

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 */
export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage: ${key}`, error);
  }
};

// History-specific functions
export const getHistory = () => getStorageItem(STORAGE_KEYS.HISTORY, []);

export const addToHistory = (entry) => {
  const history = getHistory();
  const newEntry = {
    id: Date.now(),
    ...entry,
    completedAt: new Date().toISOString(),
  };
  const updatedHistory = [newEntry, ...history];
  setStorageItem(STORAGE_KEYS.HISTORY, updatedHistory);
  return updatedHistory;
};

export const clearHistory = () => {
  setStorageItem(STORAGE_KEYS.HISTORY, []);
  return [];
};

export const deleteHistoryItem = (id) => {
  const history = getHistory();
  const updatedHistory = history.filter((item) => item.id !== id);
  setStorageItem(STORAGE_KEYS.HISTORY, updatedHistory);
  return updatedHistory;
};

// Statistics helpers
export const getStats = () => {
  const history = getHistory();
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const thisWeek = history.filter(
    (item) => new Date(item.completedAt) >= startOfWeek
  );

  const eggTypeCounts = history.reduce((acc, item) => {
    acc[item.eggType] = (acc[item.eggType] || 0) + 1;
    return acc;
  }, {});

  const favoriteType = Object.entries(eggTypeCounts).sort((a, b) => b[1] - a[1])[0];

  return {
    totalEggs: history.length,
    eggsThisWeek: thisWeek.length,
    favoriteType: favoriteType ? favoriteType[0] : null,
    eggTypeCounts,
  };
};

export { STORAGE_KEYS };
