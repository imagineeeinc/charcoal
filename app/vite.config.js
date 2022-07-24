const { defineConfig, loadEnv } = require('vite')
/* var { VitePWA } = require('vite-plugin-pwa') */
/* var manifest = require('./src/manifest.json') */
const { resolve } = require('path')
const { triggerAsyncId } = require('async_hooks')
module.exports = defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: '/',
    title: 'Charcoal',
    description: 'a effortless music streaming app',
    root: './',
    dest: './dist',
    /* define: {
      __APP_ENV__: env.APP_ENV
    }, */
    server: {
      https: true
    },
    build: {
      outDir: './dist',
      rollupOptions: {
        input: {
          main: resolve(__dirname, './index.html'),
          app: resolve(__dirname, './app/index.html')
        }
      }
    },
    /* plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        manifest: process.env.DEPO == 'vercel' ? manifest : {...manifest, start_url: 'https://paper-clip.web.app/app/', scope: 'https://paper-clip.web.app/'},
        workbox: {
          cleanupOutdatedCaches: false,
          globPatterns: ["**\/*.{js,css,html,png,svg,jpg,jpeg,gif,json,woff,woff2,ttf,eot}"],
        }
      })
    ] */
  }
})