/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#00e0c4',
                accent: '#d767eb',
                secondary: '#677beb',
                container: '#aaf2e6',
                triadic1: '#001ae0',
                triadic2: '#c600e0',
                complementary: '#e0001a'
            },
            fontFamily: {
                sans: ['Inter', 'Roboto', 'Poppins', 'sans-serif']
            },
            keyframes: {
                fall: {
                    '0%': { transform: 'translateY(-5px)' },
                    '100%': { transform: 'translateY(100vh)' }
                }
            },
            animation: {
                'fall-fast': 'fall linear infinite 7s',
                'fall-med': 'fall linear infinite 12s',
                'fall-slow': 'fall linear infinite 20s'
            }
        }
    },
    plugins: []
}
