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
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(100vh)' }
                },
                windRight: {
                    '0%': { translate: '0px' },
                    '100%': { translate: '20vw' }
                },
                windLeft: {
                    '0%': { translate: '0px' },
                    '100%': { translate: '-20vw' }
                },
                lightwindRight: {
                    '0%': { translate: '0px' },
                    '100%': { translate: '5vw' }
                },
                lightwindLeft: {
                    '0%': { translate: '0px' },
                    '100%': { translate: '-5vw' }
                }
            },
            animation: {
                'fall-slow-right-light':
                    'fall 20s linear infinite, lightwindRight 10s alternate infinite',
                'fall-medium-right-light':
                    'fall 10s linear infinite, lightwindRight 5s alternate infinite',
                'fall-fast-right-light':
                    'fall 5s linear infinite, lightwindRight 3s alternate infinite',
                'fall-slow-left-light':
                    'fall 20s linear infinite, lightwindLeft 10s alternate infinite',
                'fall-medium-left-light':
                    'fall 10s linear infinite, lightwindLeft 5s alternate infinite',
                'fall-fast-left-light':
                    'fall 5s linear infinite, lightwindLeft 3s alternate infinite',
                'fall-slow-right-strong':
                    'fall 20s linear infinite, windRight 10s alternate infinite',
                'fall-medium-right-strong':
                    'fall 10s linear infinite, windRight 5s alternate infinite',
                'fall-fast-right-strong':
                    'fall 5s linear infinite, windRight 3s alternate infinite',
                'fall-slow-left-strong':
                    'fall 20s linear infinite, windLeft 10s alternate infinite',
                'fall-medium-left-strong':
                    'fall 10s linear infinite, windLeft 5s alternate infinite',
                'fall-fast-left-strong':
                    'fall 5s linear infinite, windLeft 3s alternate infinite'
            }
        }
    },
    plugins: []
}
