import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tspaths2alias from '../dist/index.js'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),tspaths2alias({
    log:true,
  })]
})
