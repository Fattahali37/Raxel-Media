import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        surface: '#121212',
        primary: '#0FBF6A',
        'primary-dim': '#0A8F4F',
        foreground: '#F5F5F5',
        muted: '#8A8A8A',
        border: '#262626',
      },
      fontFamily: {
        'space-grotesk': ['var(--font-space-grotesk)', 'sans-serif'],
        'inter': ['var(--font-inter)', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--color-foreground)',
            a: {
              color: 'var(--color-primary)',
              '&:hover': {
                color: 'var(--color-primary-dim)',
              },
            },
            strong: {
              color: 'var(--color-foreground)',
            },
            code: {
              color: 'var(--color-primary)',
            },
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
