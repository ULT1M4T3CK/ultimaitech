/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8049cc',
        secondary: '#6643c5',
        light: '#EFEAF3',
        dark: '#2D2D2D',
        'dark-secondary': '#1A1A1A'
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #8049cc, 0 0 10px #8049cc, 0 0 15px #8049cc' },
          '100%': { boxShadow: '0 0 10px #8049cc, 0 0 20px #8049cc, 0 0 30px #8049cc' }
        }
      }
    },
  },
  plugins: [],
}
