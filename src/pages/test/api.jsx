// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://xxxx/master/topSellingItems?ProfileId=00000093_Live&StartDate=2023-06-01%2000:00:00&EndDate=2023-07-01%2023:59:59&PartyId=1661', // Replace with your API base URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
