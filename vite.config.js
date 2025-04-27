import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default ({ command }) => {
  const isProduction = command === 'build';
  const base = isProduction ? '/sdv-i18nifier-app/' : '/';

  return defineConfig({
    base,
    plugins: [vue()],
    build: {
      rollupOptions: {
        input: {
          main: 'index.html',
          404: 'index.html'
        }
      }
    }
  });
};