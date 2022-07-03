/* var { VitePWA } = require('vite-plugin-pwa') */
/* var manifest = require('./src/manifest.json') */
const { resolve } = require('path')
module.exports = {
	base: '/',
	title: 'Charcoal',
	description: 'a effortless music streaming app',
	root: './',
	dest: './dist',
	build: {
		outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        app: resolve(__dirname, 'src/app/index.html')
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