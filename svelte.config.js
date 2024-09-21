import adapter from '@sveltejs/adapter-static'
const vitePreprocess = import('@sveltejs/vite-plugin-svelte').then(m => m.vitePreprocess())

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: {
		script: async options => (await vitePreprocess).script(options),
		style: async options => (await vitePreprocess).style(options)
	},
	kit: {
		adapter: adapter({
			fallback: 'index.html'
		}),
		prerender: {
			crawl: false,
			entries: []
		},
		alias: { src: './src' }
	}
}

export default config