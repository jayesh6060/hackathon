/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fantasy: {
          navy: '#101A2B',
          amber: '#F6A43A',     // Primary accent
          orange: '#FF7138',    // Warm secondary accent
          sky: '#8BC9ED',       // Sky blue
          cloud: '#F3EBDD',     // Cloud white text
          violet: '#8064A8',    // Muted violet
          forest: '#4D8060',    // Natural forest green
          surface: 'rgba(16, 26, 43, 0.72)',
          surfaceHover: 'rgba(22, 36, 60, 0.85)',
          border: 'rgba(246, 164, 58, 0.28)',
          borderSubtle: 'rgba(243, 235, 221, 0.12)',
        }
      },
      fontFamily: {
        display: ['"Chakra Petch"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Inter Tight"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        label: ['"Chakra Petch"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
        serif: ['"Chakra Petch"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
        accent: ['"Chakra Petch"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        cyber: ['"Chakra Petch"', 'ui-sans-serif', 'sans-serif'],
        heading: ['"Chakra Petch"', 'ui-sans-serif', 'sans-serif'],
        decorative: ['Anton', '"Chakra Petch"', 'sans-serif'],
        anton: ['Anton', 'sans-serif'],
        jp: ['"Inter Tight"', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 30px rgba(246, 164, 58, 0.25)',
        'gold-glow-lg': '0 0 60px rgba(246, 164, 58, 0.4)',
        'sky-glow': '0 0 30px rgba(139, 201, 237, 0.2)',
      }
    },
  },
  plugins: [],
}
