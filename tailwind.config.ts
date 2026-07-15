import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1400px' }
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        kingdom: ['var(--font-kingdom)', 'Cinzel', 'serif'],
        'kingdom-display': ['var(--font-kingdom-display)', 'Cinzel Decorative', 'serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        gold: {
          DEFAULT: '#F0B429',
          deep: '#7A5B1A',
          base: '#C9922A',
          bright: '#F0B429',
          shine: '#FFD878',
        },
        brand: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d8fe',
          300: '#a5c1fb',
          400: '#819df5',
          500: '#6173ec',
          600: '#4d51da',
          700: '#4040c2',
          800: '#34359c',
          900: '#2f337c',
          950: '#1d1d4a'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.97)' },
          to: { opacity: '1', transform: 'scale(1)' }
        },
        'shimmer': {
          '100%': { transform: 'translateX(100%)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        'breathe': {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' }
        },
        'torch-flicker': {
          '0%,100%': { opacity: '1' },
          '20%': { opacity: '0.85' },
          '40%': { opacity: '1' },
          '60%': { opacity: '0.9' },
          '80%': { opacity: '1' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-up': 'fade-up 0.4s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        shimmer: 'shimmer 1.5s infinite',
        float: 'float 6s ease-in-out infinite',
        breathe: 'breathe 4s ease-in-out infinite',
        'torch-flicker': 'torch-flicker 3s ease-in-out infinite',
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};

export default config;
