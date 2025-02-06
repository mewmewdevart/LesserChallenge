import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				'custom-purple': '#A073B0', // Add your custom color here
			},
		},
	},

	plugins: [typography, forms, daisyui],
} satisfies Config;