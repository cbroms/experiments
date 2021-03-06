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
	import DistanceMetrics from '$lib/components/DistanceMetrics.svelte';
	import SwatchLayout from '../SwatchLayout.svelte';

	let canvas;
	let mapColors;

	let chroma = 0.25;
	let lightness = 0.6;
	let hue = 20;

	let minLightness = 0.6;
	let maxLightness = 0.8;
	let numColors = 8;

	let palette = { colors: [] };

	let project3D = true;

	let radius = null;
	let width = 720;
	let height;

	onMount(() => {
		canvas = setupCanvas(720, 400);
		repaintMap();
	});

	const chromaToRadius = (chroma) => {
		return map(chroma, 0, 0.322, 0, 1);
	};

	const repaintMap = debounce(() => {
		const color = makeLCHColor({ l: lightness, c: chroma, h: hue });

		// generate palette
		palette = generatePalette(color.lch, numColors, [minLightness, maxLightness]);

		mapColors = make2DOKLCHMap(chroma);
		canvas = renderColorMap(canvas, mapColors, palette.colors, [minLightness, maxLightness]);
		radius = chromaToRadius(chroma);
	}, 300);

	const onChromaChange = (e) => {
		chroma = e.detail.value;
		repaintMap();
	};

	const onHueChange = (e) => {
		hue = e.detail.value;
		repaintMap();
	};

	const onMinLightnessChange = (e) => {
		minLightness = e.detail.value;
		repaintMap();
	};

	const onMaxLightnessChange = (e) => {
		maxLightness = e.detail.value;
		repaintMap();
	};

	const onProject3DChange = (e) => {
		project3D = e.detail;
		repaintMap();
	};

	const onNumColorsChange = (e) => {
		numColors = parseInt(e.detail.value);
		repaintMap();
	};
</script>

<InteractiveLayout>
	<div slot="map" bind:clientHeight={height} class="map">
		{#if project3D}
			<Projection3D {canvas} {radius} rotation={hue} {width} {height} />
		{:else}
			<Projection2D {canvas} {width} height={Math.round(height) - 5} />
		{/if}
		<ProjectionControl {project3D} interactiveId={3} on:change={onProject3DChange} />
	</div>

	<div slot="controls">
		<InputControl
			name="Palette size"
			min={2}
			max={40}
			value={numColors}
			step={1}
			interactiveId={3}
			on:change={onNumColorsChange}
			slider={false}
		/>

		<div class="lightness-range">
			<InputControl
				name="Min Lightness"
				min={0}
				max={0.99}
				value={minLightness}
				step={0.01}
				interactiveId={3}
				on:change={onMinLightnessChange}
				slider={false}
			/>
			<div class="dash" />
			<InputControl
				name="Max Lightness"
				min={0}
				max={0.99}
				value={maxLightness}
				step={0.01}
				interactiveId={3}
				on:change={onMaxLightnessChange}
				slider={false}
			/>
		</div>

		<InputControl
			name="Palette chroma"
			min={0}
			max={0.322}
			value={chroma}
			step={0.01}
			interactiveId={3}
			on:change={onChromaChange}
		/>

		<InputControl
			name="First color hue"
			min={0}
			max={360}
			value={hue}
			step={1}
			interactiveId={3}
			on:change={onHueChange}
		/>

		<SwatchLayout>
			{#each palette.colors as color}
				<Swatch hex={color.hex} />
			{/each}
		</SwatchLayout>
		{#if palette.distance}
			<DistanceMetrics distance={palette.distance} />
		{/if}
	</div>
</InteractiveLayout>

<style>
	.map {
		height: 100%;
	}

	.dash {
		width: 30px;
		height: 1px;
		margin: 0 5px;
		margin-top: 46px;
		border-bottom: 1px solid var(--mid-grey);
	}

	.lightness-range {
		display: flex;
		align-items: bottom;
	}
</style>
