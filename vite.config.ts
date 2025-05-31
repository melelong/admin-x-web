import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import path from 'path';
import eslint from '@nabla/vite-plugin-eslint';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        UnoCSS(),
        eslint({
            eslintOptions: {
                fix: true,
                cache: true,
            },
        }),
    ],
    build: {
        outDir: 'dist'
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
});
