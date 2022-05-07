<script context="module">
	export const prerender = true;
</script>

<script>
	import {generateRandom} from '$lib/colors.js'
	// import Counter from '$lib/Counter.svelte';

	const randomColor = () => {
		console.log(generateRandom())
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div>hello</div>
	<button on:click="{randomColor}">Generate Random</button>
</section>

<style>
	
</style>
