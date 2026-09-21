import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    // Указываем, что корень для Vite — текущая папка
    root: '.',
    // Указываем, где искать глобальный .env (на 2 уровня выше, в корне FS_66)
    envDir: '../../',
    server: {
        port: 3000,
        open: true
    }
});
