import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '.'),
            '@components': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@@types': path.resolve(__dirname, './src/@types'),
            '@classes': path.resolve(__dirname, './src/classes'),
            '@lib': path.resolve(__dirname, './src/lib'),
            '@assets': path.resolve(__dirname, './assets'),
        },
    },
    plugins: [react()],
})
