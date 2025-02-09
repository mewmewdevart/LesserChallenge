import adapter from '@sveltejs/adapter-static';
import { sveltePreprocess } from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [
        sveltePreprocess(),
        vitePreprocess()
    ],
    kit: {
        adapter: adapter({
            fallback: 'index.html'
        }),
        alias: {
            $lib: './src/lib', 
            $routes: './src/routes',
            $stores: './src/stores',
            $components: './src/components',
        }
    }
};

export default config;