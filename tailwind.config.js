/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FFFBF5',
          100: '#FFF3E0',
          200: '#FFE0B2',
          300: '#FFCC80',
          400: '#FFB74D',
          500: '#FFA726',
          600: '#F59E0B',
          700: '#D97706',
          800: '#B45309',
          900: '#92400E',
        },
        ink: {
          950: '#1C1917',
          900: '#292524',
          700: '#44403C',
          500: '#78716C',
          400: '#A8A29E',
          300: '#D6D3D1',
          200: '#E7E5E4',
          100: '#F5F5F4',
          50: '#FAFAF9',
        },
        canvas: '#FAFAF8',
        surface: '#FFFFFF',
        warm: {
          50: '#FEFDFB',
          100: '#FBF9F6',
          200: '#F5F0EB',
        },
        success: {
          DEFAULT: '#10B981',
          subtle: '#ECFDF5',
          border: '#A7F3D0',
          text: '#065F46'
        },
        warning: {
          DEFAULT: '#F59E0B',
          subtle: '#FFFBEB',
          border: '#FDE68A',
          text: '#92400E'
        },
        error: {
          DEFAULT: '#EF4444',
          subtle: '#FEF2F2',
          border: '#FECACA',
          text: '#991B1B'
        },
        info: {
          DEFAULT: '#3B82F6',
          subtle: '#EFF6FF',
          border: '#BFDBFE',
          text: '#1E40AF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(28, 25, 23, 0.04)',
        'card': '0 1px 3px 0 rgba(28, 25, 23, 0.06), 0 1px 2px -1px rgba(28, 25, 23, 0.06)',
        'elevated': '0 4px 12px -2px rgba(28, 25, 23, 0.08), 0 2px 6px -2px rgba(28, 25, 23, 0.04)',
        'modal': '0 20px 60px -12px rgba(28, 25, 23, 0.15), 0 8px 20px -8px rgba(28, 25, 23, 0.08)',
        'dropdown': '0 4px 16px -2px rgba(28, 25, 23, 0.08), 0 2px 6px -2px rgba(28, 25, 23, 0.04)',
        'glow': '0 0 20px rgba(245, 158, 11, 0.15)',
      },
      borderRadius: {
        'button': '12px',
        'card': '16px',
        'modal': '20px',
        'pill': '9999px'
      }
    },
  },
  plugins: [],
}
