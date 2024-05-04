import { defineConfig, presetAttributify, presetUno, transformerVariantGroup } from 'unocss';

export default defineConfig({
	presets: [
		presetUno({
			dark: 'media'
		}),
		presetAttributify()
	],
	transformers: [transformerVariantGroup()],
	shortcuts: {
		'bg-main': 'bg-white dark:bg-#1F2C36',
		'text-main': 'text-black dark:text-light-100',
		'text-gray': 'text-gray-500 dark:text-gray-400',
		'text-reverse': 'text-white dark:text-black'
	},
	theme: {
		colors: {
			accent: '#D9FA6B'
		}
	}
});
