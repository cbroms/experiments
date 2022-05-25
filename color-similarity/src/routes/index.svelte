<script context="module">
	export const prerender = true;
</script>

<script>
	import Interactive from '$lib/components/interactives/Interactive.svelte';
</script>

<svelte:head>
	<title>Colors</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<Interactive />
</section>

<style>
	/* .map-wrapper {
		display: flex;
	}

	.map-controls {
		padding: 4rem;
	}

	.map {
		width: 500px;
		height: auto;
		background-color: #f5f5f5;
		display: flex;
		justify-content: center;
		border-radius: 12px;
		background-clip: border-box;
	}

	.map-content {
		max-width: 500px;
		display: flex;
		flex-flow: column;
	} */
</style>
