import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: [
            {
                // this is required for the SCSS modules
                find: /^~(.*)$/,
                replacement: '$1',
            },
        ],
    },
    // server: {
    //     host: '0.0.0.0', // Ini sangat PENTING! Agar bisa diakses dari IP publik VPS
    //     port: 45676, // Port default Vite, bisa diganti kalau ada konflik
    //     hmr: {
    //         // Ini PENTING kalau kamu mengakses Vite dari luar VPS
    //         // Ganti 'your_vps_ip_or_domain' dengan IP publik VPS atau domain kamu
    //         host: 'demo.harmonylaundry.my.id',
    //         clientPort: 443, // Penting! Beri tahu Vite client untuk terhubung ke port HTTPS default (443)
    //         protocol: 'wss', // Penting! Gunakan WebSocket Secure

    //     },
    //     // Kalau ada masalah CORS, bisa tambahkan origin spesifik:
    //     // cors: {
    //     //     origin: 'http://your_local_ip:port_laravel_kamu', // Misal: http://192.168.1.100:8000
    //     //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    //     //     credentials: true,
    //     // },
    // },
});
