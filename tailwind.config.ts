import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: ['variant', [
    '@media (prefers-color-scheme: dark) { &:not(.light *) }',
    '&:is(.dark *)',
  ]], theme: {
    extend: {
      colors:
      {
        'raisin_black': { DEFAULT: '#1e1e24', 100: '#060607', 200: '#0c0c0e', 300: '#121216', 400: '#18181d', 500: '#1e1e24', 600: '#474754', 700: '#6f6f85', 800: '#9e9eae', 900: '#cfcfd7' },
        'penn_red': { DEFAULT: '#92140c', 100: '#1d0402', 200: '#3a0805', 300: '#580c07', 400: '#751109', 500: '#92140c', 600: '#d31e11', 700: '#ef483c', 800: '#f4857d', 900: '#fac2be' },
        'floral_white': { DEFAULT: '#fff8f0', 100: '#633500', 200: '#c66a00', 300: '#ff9c2a', 400: '#ffca8d', 500: '#fff8f0', 600: '#fff9f3', 700: '#fffbf6', 800: '#fffcf9', 900: '#fffefc' },
        'sunset': { DEFAULT: '#ffcf99', 100: '#522c00', 200: '#a35700', 300: '#f58300', 400: '#ffa947', 500: '#ffcf99', 600: '#ffd9ad', 700: '#ffe2c2', 800: '#ffecd6', 900: '#fff5eb' },
        'space_cadet': { DEFAULT: '#111d4a', 100: '#03060f', 200: '#070c1e', 300: '#0a122d', 400: '#0e183c', 500: '#111d4a', 600: '#20388f', 700: '#3355d1', 800: '#778ee0', 900: '#bbc6f0' },
        'rich_black': { DEFAULT: '#0e1116', 100: '#030304', 200: '#060709', 300: '#080a0d', 400: '#0b0d11', 500: '#0e1116', 600: '#333d50', 700: '#586a8a', 800: '#8b9bb5', 900: '#c5cdda' },
        'vista_blue': { DEFAULT: '#7e9cd8', 100: '#101c35', 200: '#1f3869', 300: '#2f549e', 400: '#4973c9', 500: '#7e9cd8', 600: '#97b0e0', 700: '#b1c3e8', 800: '#cbd7f0', 900: '#e5ebf7' },
        'cool_gray': { DEFAULT: '#938aa9', 100: '#1d1a23', 200: '#393446', 300: '#564e6a', 400: '#72688d', 500: '#938aa9', 600: '#a8a1ba', 700: '#beb9cb', 800: '#d4d0dc', 900: '#e9e8ee' },
        'powder_blue': { DEFAULT: '#9cabca', 100: '#19202e', 200: '#32405d', 300: '#4b608b', 400: '#6d84b0', 500: '#9cabca', 600: '#afbcd4', 700: '#c3cddf', 800: '#d7ddea', 900: '#ebeef4' }
      }
    }
  },

  plugins: []
} satisfies Config;
