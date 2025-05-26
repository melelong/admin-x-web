import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        UnoCSS(),
    ],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@views': path.resolve(__dirname, 'src/views'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@store': path.resolve(__dirname, 'src/store'),
            '@router': path.resolve(__dirname, 'src/router'),
        }
    }
})

