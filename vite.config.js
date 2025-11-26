import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ayplast-website/', // <-- BURAYA GITHUB REPO ADINI YAZ (başında ve sonunda / olsun)
})