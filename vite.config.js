import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/ogrenci/', // GitHub Pages'de doğru çalışması için proje yolu
  server: {
    open: true, // Sunucu başlatıldığında tarayıcı otomatik açılsın
    port: 5173, // Varsayılan port
    proxy: {
      '/api': {
        target: 'https://dlnk.one', // CORS sorunları için proxy
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // '/api' ile başlayan yolları yeniden yönlendirme
      },
    },
  },
  build: {
    outDir: 'dist', // Derleme çıktısının konumu
    emptyOutDir: true, // Derleme sırasında 'dist' klasörünü temizle
  },
  resolve: {
    alias: {
      '@': '/src', // Daha temiz import yolları için alias
    },
  },
});
