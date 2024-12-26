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
                },
                windRight: {
                    '0%': { translate: '0px' },
                    '100%': { translate: '60vw' }
                },
                windLeft: {
                    '0%': { translate: '0px' },
                    '100%': { translate: '-60vw' }
                },
                lightwindRight: {
                    '0%': { translate: '0px' },
                    '100%': { translate: '20vw' }
                },
                lightwindLeft: {
                    '0%': { translate: '0px' },
                    '100%': { translate: '-20vw' }
                }
            },
            animation: {
                'fall-right': 'windRight 5s linear forwards',
                'fall-left': 'windLeft 5s linear forwards',
                'fall-slow-right-light':
                    'fall 20s linear infinite, lightwindRight 25s linear forwards',
                'fall-medium-right-light':
                    'fall 10s linear infinite, lightwindRight 12s linear forwards',
                'fall-fast-right-light':
                    'fall 5s linear infinite, lightwindRight 6s linear forwards',
                'fall-slow-left-light':
                    'fall 20s linear infinite, lightwindLeft 25s linear forwards',
                'fall-medium-left-light':
                    'fall 10s linear infinite, lightwindLeft 12s linear forwards',
                'fall-fast-left-light':
                    'fall 5s linear infinite, lightwindLeft 6s linear forwards',
                'fall-slow-right-strong':
                    'fall 20s linear infinite, windRight 25s linear forwards',
                'fall-medium-right-strong':
                    'fall 10s linear infinite, windRight 12s linear forwards',
                'fall-fast-right-strong':
                    'fall 5s linear infinite, windRight 6s linear forwards',
                'fall-slow-left-strong':
                    'fall 20s linear infinite, windLeft 25s linear forwards',
                'fall-medium-left-strong':
                    'fall 10s linear infinite, windLeft 12s linear forwards',
                'fall-fast-left-strong':
                    'fall 5s linear infinite, windLeft 6s linear forwards'
            }
        }
    },
    plugins: []
}
