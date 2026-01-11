import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    appType: 'spa',
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@component': resolve(__dirname, 'src/components'),
            '@pages': resolve(__dirname, 'src/pages'),
            '@store': resolve(__dirname, 'src/store'),
            '@types': resolve(__dirname, 'src/types'),
            '@assets': resolve(__dirname, 'src/assets'),
            '@data': resolve(__dirname, 'src/data'),
            '@constant': resolve(__dirname, 'src/constant'),
        },
    },
    server: {
        port: 3000,
    },
});
