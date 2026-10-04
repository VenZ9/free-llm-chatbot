/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        border: 'var(--border)',
        text: 'var(--text)',
        'text-muted': 'var(--text-muted)',
        accent: 'var(--accent)',
        'accent-2': 'var(--accent-2)',
        'accent-soft': 'var(--accent-soft)',
        'code-bg': 'var(--code-bg)',
      },
      fontFamily: {
        sans: ['var(--sans)'],
        mono: ['var(--mono)'],
      },
      borderRadius: {
        '9': '9px',
        '13': '13px',
        '17': '17px',
      },
      keyframes: {
        bounce: {
          '0%, 70%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '35%': { transform: 'translateY(-5px)', opacity: '1' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        bounce: 'bounce 1.25s infinite ease-in-out',
        blink: 'blink 0.9s steps(2) infinite',
        fadeUp: 'fadeUp 0.28s ease both',
      },
    },
  },
  plugins: [],
}