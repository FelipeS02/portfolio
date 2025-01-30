import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['selector', '.dark'],
  theme: {
    extend: {
      transitionDelay: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
        '450': '450ms',
      },
      transitionProperty: {
        loading: 'height, background-color',
      },
      dropShadow: {
        'hero-dark': '0 0px 8px hsl(var(--palette-800) / 30%)',
        'hero-light': '0 0px 8px hsl(var(--palette-300) / 30%)',
        current: '0 0px 4px currentColor',
        
      },
      boxShadow: {
        'loading-line':
          '0 2px 3px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        'figma-toolbar':
          '0px 3px 8px rgba(0, 0, 0, .35), 0px 1px 3px rgba(0, 0, 0, .5), inset 0px 1px 0px rgba(255, 255, 255, .08), inset 0px 0px 1px rgba(255, 255, 255, .3)',
        'dev-mode-icon':
          '0px 0px .5px rgba(0, 0, 0, .5), 0px 1px 3px rgba(0, 0, 0, .4), inset 0px 1px 0px rgba(255, 255, 255, .1), inset 0px 0px 1px rgba(255, 255, 255, .3)',
        globe:
          '0 0px 80px 15px hsl(var(--palette-500) / 20%), 0 4px 6px -3px hsl(var(--palette-500) / 50%)',
      },
      fontFamily: {
        neue: ['var(--font-ppNeueMontreal)'],
        archivo: ['var(--font-archivo)'],
      },
      backgroundImage: {
        theme: 'var(--theme-image)',
      },
      keyframes: {
        blink: {
          '0%, 100%': {
            opacity: '0',
          },
          '50%': {
            opacity: '1',
          },
        },
      },
      animation: {
        blink: 'blink 1s ease infinite',
        'orbit-rings': 'spin 3s linear infinite',
        radar: 'spin 8s linear infinite',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        'foreground-secondary': 'hsl(var(--foreground) / 70%)',
        palette: {
          '50': 'hsl(var(--palette-50))',
          '100': 'hsl(var(--palette-100))',
          '200': 'hsl(var(--palette-200))',
          '300': 'hsl(var(--palette-300))',
          '400': 'hsl(var(--palette-400))',
          '500': 'hsl(var(--palette-500))',
          '600': 'hsl(var(--palette-600))',
          '700': 'hsl(var(--palette-700))',
          '800': 'hsl(var(--palette-800))',
          '900': 'hsl(var(--palette-900))',
          '950': 'hsl(var(--palette-950))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
