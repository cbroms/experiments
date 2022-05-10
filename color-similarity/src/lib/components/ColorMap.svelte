<script>
	import { onMount } from 'svelte';
	import { getDistance } from '$lib/colors.js';

	export let colors;
	export let palette;
	export let lightnessMin;
	export let lightnessMax;

	let canvas;

	onMount(() => {
		if (canvas) {
			let ctx = canvas.getContext('2d');
			ctx.scale(2, 2);
		}
	});

	$: {
		if (colors && canvas) {
			let ctx = canvas.getContext('2d');

			ctx.clearRect(0, 0, 720, 300);

			for (let h = 0; h < 360; h++) {
				for (let l = 0; l < 100; l++) {
					if (colors[h][l] !== null) {
						ctx.strokeStyle = colors[h][l].hex;
						ctx.strokeWidth = '1px';
						ctx.beginPath();
						ctx.moveTo(h, l);
						ctx.lineTo(h, l + 1);
						ctx.stroke();
					}
				}
			}

			if (lightnessMax) {
				ctx.strokeStyle = '#fff';
				ctx.beginPath();
				ctx.moveTo(0, lightnessMax);
				ctx.lineTo(360, lightnessMax);
				ctx.stroke();
			}

			if (lightnessMin) {
				ctx.strokeStyle = '#fff';
				ctx.beginPath();
				ctx.moveTo(0, lightnessMin);
				ctx.lineTo(360, lightnessMin);
				ctx.stroke();
			}

			for (const color of palette) {
				const h = Math.round(color.lch.h);
				const l = Math.round(color.lch.l);

				ctx.fillStyle = color.hex;
				ctx.strokeStyle = '#fff';
				ctx.strokeWidth = '1px';
				ctx.fillRect(h - 5, l - 5, 10, 10);
				ctx.strokeRect(h - 5, l - 5, 10, 10);
			}
		}
	}
</script>

<canvas bind:this={canvas} width="720" height="300" />
