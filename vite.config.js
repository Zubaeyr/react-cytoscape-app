import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080, // Specify the port for development
  },  
  build: {
    outDir: 'dist', // Output directory for the build
    sourcemap: true, // Generate source maps for debugging
  },
})