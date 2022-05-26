<script>
	import Projection3D from '$lib/components/Projection3D.svelte';
	import Projection2D from '$lib/components/Projection2D.svelte';
	import ProjectionControl from '$lib/components/ProjectionControl.svelte';
	import InteractiveLayout from '$lib/components/interactives/InteractiveLayout.svelte';

	import { make2DOKLCHMap, makeLCHColor, generatePalette } from '$lib/colors.js';
	import { setupCanvas, renderColorMap } from '$lib/canvas';
	import { map } from '$lib/math';
	import { onMount } from 'svelte';
	import { debounce } from 'lodash-es';

	import InputControl from '$lib/components/InputControl.svelte';
	import Swatch from '$lib/components/Swatch.svelte';
	import SwatchLayout from '../SwatchLayout.svelte';

	let canvas;
	let mapColors;

	let chroma = 0.25;
	let lightness = 0.6;
	let hue = 20;

	let palette = { colors: [] };

	let project3D = true;

	let radius = null;
	let width = 720;

	onMount(() => {
		canvas = setupCanvas(720, 400);
		repaintMap();
	});

	const chromaToRadius = (chroma) => {
		return map(chroma, 0, 0.322, 0, 1);
	};

	const repaintMap = debounce(() => {
		const color = makeLCHColor({ l: lightness, c: chroma, h: hue });

		palette = { colors: [color] };

		mapColors = make2DOKLCHMap(chroma);
		canvas = renderColorMap(canvas, mapColors, palette.colors, []);
		radius = chromaToRadius(chroma);
	}, 300);

	const onChromaChange = (e) => {
		chroma = e.detail.value;
		repaintMap();
	};

	const onLightnessChange = (e) => {
		lightness = e.detail.value;
		repaintMap();
	};

	const onHueChange = (e) => {
		hue = e.detail.value;
		repaintMap();
	};

	const onProject3DChange = (e) => {
		project3D = e.detail;
		repaintMap();
	};
</script>

<InteractiveLayout>
	<div slot="map">
		{#if project3D}
			<Projection3D {canvas} {radius} rotation={hue} {width} />
		{:else}
			<Projection2D {canvas} {width} />
		{/if}
		<ProjectionControl {project3D} interactiveId={1} on:change={onProject3DChange} />
	</div>

	<div slot="controls">
		<InputControl
			name="Chroma"
			min={0}
			max={0.322}
			value={chroma}
			step={0.01}
			interactiveId={1}
			on:change={onChromaChange}
		/>
		<InputControl
			name="Lightness"
			min={0}
			max={0.99}
			value={lightness}
			step={0.01}
			interactiveId={1}
			on:change={onLightnessChange}
		/>
		<InputControl
			name="Hue"
			min={0}
			max={360}
			value={hue}
			step={1}
			interactiveId={1}
			on:change={onHueChange}
		/>

		<SwatchLayout title="Color">
			{#each palette.colors as color}
				<Swatch hex={color.hex} />
			{/each}
		</SwatchLayout>
	</div>
</InteractiveLayout>
