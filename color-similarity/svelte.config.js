import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			precompress: true
		}),
		files: {
			assets: 'static'
		},
		paths: {
			base: dev ? '' : '/experiment/simple-distinct-colors'
		},
		browser: {
			router: false
		}
	}
};

export default config;
