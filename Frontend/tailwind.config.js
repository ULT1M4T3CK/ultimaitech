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
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 4s ease infinite',
        'holographic-shift': 'holographicShift 8s ease-in-out infinite',
        'grid-move': 'gridMove 20s linear infinite',
        'neon-flicker': 'neonFlicker 3s ease-in-out infinite alternate',
        'particle-float': 'particleFloat 15s ease-in-out infinite',
        'matrix-rain': 'matrixRain 2s linear infinite',
        'cyber-pulse': 'cyberPulse 1.5s ease-in-out infinite',
        'data-stream': 'dataStream 3s ease-in-out infinite',
        'quantum-shift': 'quantumShift 4s ease-in-out infinite'
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
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotateX(0deg)' },
          '50%': { transform: 'translateY(-20px) rotateX(5deg)' }
        },
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(128, 73, 204, 0.3), 0 0 40px rgba(128, 73, 204, 0.1)',
            transform: 'scale(1)'
          },
          '50%': {
            boxShadow: '0 0 30px rgba(128, 73, 204, 0.6), 0 0 60px rgba(128, 73, 204, 0.3)',
            transform: 'scale(1.05)'
          }
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        },
        holographicShift: {
          '0%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
          '100%': { backgroundPosition: '0% 0%' }
        },
        gridMove: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(50px, 50px)' }
        },
        neonFlicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        particleFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0.6' },
          '50%': { transform: 'translateY(-30px) rotate(180deg)', opacity: '1' }
        },
        matrixRain: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        cyberPulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' }
        },
        dataStream: {
          '0%': { transform: 'translateX(-100%) scaleX(0)' },
          '50%': { transform: 'translateX(0%) scaleX(1)' },
          '100%': { transform: 'translateX(100%) scaleX(0)' }
        },
        quantumShift: {
          '0%': { filter: 'hue-rotate(0deg) brightness(1)' },
          '25%': { filter: 'hue-rotate(90deg) brightness(1.2)' },
          '50%': { filter: 'hue-rotate(180deg) brightness(0.8)' },
          '75%': { filter: 'hue-rotate(270deg) brightness(1.2)' },
          '100%': { filter: 'hue-rotate(360deg) brightness(1)' }
        }
      }
    },
  },
  plugins: [],
}
