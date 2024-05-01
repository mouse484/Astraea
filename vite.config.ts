import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			strategies: 'generateSW',
			useCredentials: true,
			manifest: {
				name: `Astraea`,
				short_name: 'astraea',
				theme_color: '#d9fa6b',
				icons: [
					{
						src: 'icon.png',
						type: 'image/png',
						purpose: 'any',
						sizes: '48x48, 144x144'
					}
				]
			},
			devOptions: {
				enabled: true
			}
		})
	],
	define: {
		APP_VERSION: JSON.stringify(process.env.npm_package_version)
	},
	ssr: {
		noExternal: ['emoji-mart']
	}
});
