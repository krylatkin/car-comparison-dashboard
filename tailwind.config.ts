import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './tests/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#f5f1e8',
        ink: '#15241f',
        accent: '#c4662f',
        accentDark: '#8e451d',
        line: '#d7cfbe',
        surface: '#fffdf8',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px rgba(21, 36, 31, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;

