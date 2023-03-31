import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			injectRegister: 'auto',
			devOptions: { enabled: false },
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
			}
		})
	],
	define: {
		APP_VERSION: JSON.stringify(process.env.npm_package_version)
	},
	server: {
		hmr: {
			clientPort: process.env.HMR_HOST ? 443 : 5173,
			host: process.env.HMR_HOST
				? new URL(process.env.HMR_HOST).hostname
				: 'localhost',
			protocol: 'wss'
		}
	}
});
