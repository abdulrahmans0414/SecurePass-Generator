/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'move-circle-1': 'moveCircle1 10s infinite',
        'move-circle-2': 'moveCircle2 8s infinite',
        'move-circle-3': 'moveCircle3 12s infinite',
      },
      keyframes: {
        moveCircle1: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(20px, 20px)' },
        },
        moveCircle2: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-30px, 15px)' },
        },
        moveCircle3: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(10px, -25px)' },
        },
      },
    },
  },
  plugins: [],
}

