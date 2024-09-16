import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "104.236.6.219",
    // host: "192.168.10.195",
    port: "3001"
  }
})
