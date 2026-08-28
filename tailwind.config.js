/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#07080d',
          900: '#0c0e16',
          800: '#12141f',
          700: '#1a1d2b',
          600: '#242838',
        },
        accent: {
          blue: '#3b82f6',
          bluedim: '#1d4ed8',
          violet: '#8b5cf6',
          violetdim: '#6d28d9',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-fade': 'linear-gradient(to bottom, rgba(7,8,13,0) 0%, #07080d 100%)',
        'brand-gradient': 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
        'brand-radial': 'radial-gradient(circle at 20% 20%, rgba(59,130,246,0.25), transparent 45%), radial-gradient(circle at 80% 0%, rgba(139,92,246,0.25), transparent 45%)',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(59,130,246,0.45)',
        card: '0 8px 30px rgba(0,0,0,0.35)',
      },
    },
  },
  plugins: [],
}
