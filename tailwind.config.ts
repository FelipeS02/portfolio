import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        neue: ['var(--font-ppNeueMontreal)'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        pallete: {
          100: 'hsl(var(--pallete-100, var(--fb-pallete-100)))',
          200: 'hsl(var(--pallete-200, var(--fb-pallete-200)))',
          300: 'hsl(var(--pallete-300, var(--fb-pallete-300)))',
          400: 'hsl(var(--pallete-400, var(--fb-pallete-400)))',
          500: 'hsl(var(--pallete-500, var(--fb-pallete-500)))',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
