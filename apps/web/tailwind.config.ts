module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          0: '#0a0a0a',
          1: '#111111',
          2: '#1a1a1a',
          3: '#242424',
        },
        border: '#2a2a2a',
        'border-focus': '#3f3f3f',
        'text-primary': '#f0f0f0',
        'text-secondary': '#888888',
        'text-muted': '#555555',
        accent: '#4ade80',
        'accent-dim': '#16532d',
        'accent-fg': '#052e16',
        warn: '#fb923c',
        danger: '#f87171',
        info: '#60a5fa',
      },
      fontFamily: {
        mono: ['DM Mono', 'monospace'],
        serif: ['Instrument Serif', 'serif'],
        sans: ['Geist', 'sans-serif'],
      },
    },
  },
  plugins: [],
}