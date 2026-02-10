// Egg cooking presets with times in seconds
export const EGG_PRESETS = {
  soft: {
    id: 'soft',
    name: 'Soft Boiled',
    description: 'Runny yolk, set whites',
    duration: 360, // 6 minutes
    color: '#FFD93D',
    icon: '🥚',
  },
  medium: {
    id: 'medium',
    name: 'Medium Boiled',
    description: 'Jammy, creamy yolk',
    duration: 480, // 8 minutes
    color: '#FF9500',
    icon: '🥚',
  },
  hard: {
    id: 'hard',
    name: 'Hard Boiled',
    description: 'Fully set yolk',
    duration: 720, // 12 minutes
    color: '#8B5A2B',
    icon: '🥚',
  },
};

// Timer states
export const TIMER_STATES = {
  IDLE: 'idle',
  RUNNING: 'running',
  PAUSED: 'paused',
  COMPLETED: 'completed',
};

// Animation durations (in seconds)
export const ANIMATION_DURATIONS = {
  splash: 2.5,
  pageTransition: 0.4,
  eggProgress: 0.5,
  bubbleFloat: 2,
  steamRise: 3,
};

// Egg benefits data
export const EGG_BENEFITS = [
  {
    id: 'protein',
    title: 'High-Quality Protein',
    description: 'One large egg contains 6g of complete protein with all essential amino acids your body needs.',
    icon: '💪',
    color: '#FF6B6B',
    stats: '6g per egg',
  },
  {
    id: 'brain',
    title: 'Brain Health',
    description: 'Rich in choline, essential for brain development, memory, and cognitive function.',
    icon: '🧠',
    color: '#4ECDC4',
    stats: '147mg choline',
  },
  {
    id: 'energy',
    title: 'Sustained Energy',
    description: 'B vitamins in eggs help convert food into energy, keeping you alert and focused.',
    icon: '⚡',
    color: '#FFE66D',
    stats: 'B2, B5, B12',
  },
  {
    id: 'muscle',
    title: 'Muscle Growth',
    description: 'Leucine-rich protein supports muscle synthesis and recovery after exercise.',
    icon: '🏋️',
    color: '#95E1D3',
    stats: '0.5g leucine',
  },
  {
    id: 'eyes',
    title: 'Eye Health',
    description: 'Lutein and zeaxanthin protect eyes from harmful light and reduce macular degeneration risk.',
    icon: '👁️',
    color: '#A8E6CF',
    stats: 'Antioxidants',
  },
  {
    id: 'heart',
    title: 'Heart Health',
    description: 'Omega-3 enriched eggs can help reduce triglycerides and support cardiovascular health.',
    icon: '❤️',
    color: '#FF8B94',
    stats: 'Omega-3s',
  },
];

// Format time helper
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Format date helper
export const formatDate = (isoString) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
};
