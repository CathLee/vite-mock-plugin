import process from 'node:process'
import vue from '@vitejs/plugin-vue'
/*
 * @Date: 2024-06-16 11:18:58
 * @Description:
 */
import { defineConfig } from 'vite'
import { ViteMockServer } from '../../src/index.js'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteMockServer({
      ignore: /^_/,
      mockPath: 'mock',
      watchFiles: true,
      localEnabled: process.env.NODE_ENV === 'development',
    }),
  ],
})
