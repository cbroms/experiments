<script>
	import { onMount } from 'svelte';

	export let canvas;
	export let width = 500;
	export let height = 400;

	const baseHeight = 400;

	let myCanvas;
	let ctx;

	onMount(() => {
		ctx = myCanvas.getContext('2d');
		ctx.scale(1, height / baseHeight);
	});

	$: {
		if (canvas && ctx) {
			ctx.clearRect(0, 0, width, height);
			ctx.drawImage(canvas, 0, 0);
		}
	}
</script>

<canvas bind:this={myCanvas} {height} {width} />

<style>
	canvas {
		overflow: hidden;
		border-radius: 12px;
	}
</style>
