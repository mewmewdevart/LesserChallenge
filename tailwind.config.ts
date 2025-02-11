import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,ts,jsx,tsx,svelte}'],
	theme: {
		extend: {
			colors: {
				'custom-purple': '#A073B0',
				'custom-blue': '#3B82F6',
				'custom-orange': '#EF9629',
			},
			keyframes: {
				fly: {
					'0%': { bottom: '-250px' },
					'100%': { bottom: '100%' },
				},
			},
			animation: {
				fly: 'fly 2s 0.5s ease-in',
			},
		},
	},
	plugins: [typography, forms, daisyui],
} satisfies Config;
