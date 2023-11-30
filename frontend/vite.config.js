import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },build: {
    outDir: 'dist', // o el directorio que estás utilizando
    assetsDir: 'assets',
    // otras opciones de construcción
  },
})
