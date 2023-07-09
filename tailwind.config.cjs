/** @type {import('tailwindcss').Config} */
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	darkMode: 'class',

	theme: {
		extend: {}
	},

	plugins: [require('daisyui')],

	daisyui: {
		themes: [
			{
				light: {
					primary: '#83CCD2',
					'primary-content': '#1F2C36',
					secondary: '#FFEB3B',
					accent: '#11F4A5',
					neutral: '#666666',
					'base-100': '#FFFFFF'
				},
				dark: {
					primary: '#2196F3',
					'primary-content': '#CED1D4',
					secondary: '#D9FA6B',
					accent: '#11F4A5',
					neutral: '#333333',
					'base-100': '#1F2C36',
					'base-200': '#161F26'
				}
			}
		]
	}
};

module.exports = config;
