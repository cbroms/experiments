<script>
	import Projection3D from '$lib/components/Projection3D.svelte';

	import { make2DOKLCHMap } from '$lib/colors.js';
	import { setupCanvas, renderColorMap } from '$lib/canvas';
	import { onMount } from 'svelte';
	import { debounce } from 'lodash';

	import SliderControl from '$lib/components/SliderControl.svelte';

	let canvas;
	let mapColors;

	let chroma = 0.1;
	let radius = null;

	const maxProjectionRadius = 2;
	const minProjectionRadius = 0.2;

	onMount(() => {
		canvas = setupCanvas();
		mapColors = make2DOKLCHMap(chroma);
		canvas = renderColorMap(canvas, mapColors);
		radius = chromaToRadius(chroma);
	});

	const chromaToRadius = (chroma) => {
		return (
			((chroma - 0) / (0.322 - 0)) * (maxProjectionRadius - minProjectionRadius) +
			minProjectionRadius
		);
	};

	const repaintMap = debounce(() => {
		mapColors = make2DOKLCHMap(chroma);
		canvas = renderColorMap(canvas, mapColors);
		radius = chromaToRadius(chroma);
	}, 300);

	const onChromaChange = (e) => {
		chroma = e.detail.value;
		repaintMap();
	};
</script>

<SliderControl min={0} max={0.322} value={chroma} step={0.01} on:change={onChromaChange} />
<Projection3D {canvas} {radius} />
