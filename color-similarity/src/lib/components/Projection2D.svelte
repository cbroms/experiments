<script>
	import { onMount } from 'svelte';

	export let canvas;

	let myCanvas;
	let ctx;

	onMount(() => {
		ctx = myCanvas.getContext('2d');
	});

	$: {
		if (canvas && ctx) {
			ctx.clearRect(0, 0, 500, 400);
			ctx.drawImage(canvas, 0, 0);
		}
	}
</script>

<canvas bind:this={myCanvas} height="400" width="500" />

<style>
	canvas {
		overflow: hidden;
		border-radius: 12px;
	}
</style>
