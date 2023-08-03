import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/sdv-i18nifier-app/', 
  plugins: [vue()],
});