import { defineConfig } from 'vite';
import path from "path";
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Path alias for src
    },
  } // <- Close the resolve object here
});

