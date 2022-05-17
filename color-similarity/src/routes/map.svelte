<script>
	import Projection3D from '$lib/components/Projection3D.svelte';
	import Projection2D from '$lib/components/Projection2D.svelte';

	import { make2DOKLCHMap, makeLCHColor, generatePalette } from '$lib/colors.js';
	import { setupCanvas, renderColorMap } from '$lib/canvas';
	import { onMount } from 'svelte';
	import { debounce } from 'lodash';

	import InputControl from '$lib/components/InputControl.svelte';
	import Swatch from '$lib/components/Swatch.svelte';
	import DistanceMetrics from '$lib/components/DistanceMetrics.svelte';

	let canvas;
	let mapColors;

	let chroma = 0.25;
	let lightness = 0.6;
	let hue = 20;

	let minLightness = 0.6;
	let maxLightness = 0.8;
	let numColors = 8;

	let palette = { colors: [] };

	let generatePaletteMode = false;
	let project3D = true;

	let radius = null;

	const maxProjectionRadius = 2;
	const minProjectionRadius = 0.2;

	onMount(() => {
		canvas = setupCanvas();
		repaintMap();
	});

	const chromaToRadius = (chroma) => {
		return (
			((chroma - 0) / (0.322 - 0)) * (maxProjectionRadius - minProjectionRadius) +
			minProjectionRadius
		);
	};

	const repaintMap = debounce(() => {
		const color = makeLCHColor({ l: lightness, c: chroma, h: hue });
		if (!generatePaletteMode) {
			palette = { colors: [color] };
		} else {
			// generate palette
			palette = generatePalette(color.lch, numColors, [minLightness, maxLightness]);
		}
		mapColors = make2DOKLCHMap(chroma);
		canvas = renderColorMap(
			canvas,
			mapColors,
			palette.colors,
			generatePaletteMode ? [minLightness, maxLightness] : []
		);
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

	const onMinLightnessChange = (e) => {
		minLightness = e.detail.value;
		repaintMap();
	};

	const onMaxLightnessChange = (e) => {
		maxLightness = e.detail.value;
		repaintMap();
	};

	const onGeneratePaletteChange = (e) => {
		generatePaletteMode = e.target.checked;
		repaintMap();
	};

	const onProject3DChange = (e) => {
		project3D = e.target.checked;
		repaintMap();
	};

	const onNumColorsChange = (e) => {
		numColors = parseInt(e.detail.value);
		repaintMap();
	};
</script>

<div class="map-wrapper">
	<div class="map-controls">
		<InputControl
			name="Chroma (C*)"
			min={0}
			max={0.322}
			value={chroma}
			step={0.01}
			on:change={onChromaChange}
		/>
		<InputControl
			name="Lightness (L*)"
			min={0}
			max={0.99}
			value={lightness}
			step={0.01}
			on:change={onLightnessChange}
		/>
		<InputControl name="Hue (h°)" min={0} max={360} value={hue} step={1} on:change={onHueChange} />

		<input
			id="generate"
			type="checkbox"
			checked={generatePaletteMode}
			on:change={onGeneratePaletteChange}
		/>
		<label for="generate">Generate palette</label>

		{#if generatePaletteMode}
			<InputControl
				name="Palette size"
				min={2}
				max={40}
				value={numColors}
				step={1}
				on:change={onNumColorsChange}
				slider={false}
			/>
			<InputControl
				name="L* Min"
				min={0}
				max={0.99}
				value={minLightness}
				step={0.01}
				on:change={onMinLightnessChange}
				slider={false}
			/>
			<InputControl
				name="L* Max"
				min={0}
				max={0.99}
				value={maxLightness}
				step={0.01}
				on:change={onMaxLightnessChange}
				slider={false}
			/>
		{/if}
	</div>

	<div class="map-content">
		<!-- <div>
			<input id="projection" type="checkbox" checked={project3D} on:change={onProject3DChange} />
			<label for="projection">3D Projection</label>
		</div> -->

		<div class="map">
			{#if project3D}
				<Projection3D {canvas} {radius} maxRadius={maxProjectionRadius} />
			{:else}
				<Projection2D {canvas} />
			{/if}
		</div>
		<div class="map-palette">
			{#each palette.colors as color}
				<Swatch hex={color.hex} />
			{/each}
		</div>
		{#if generatePaletteMode && palette.distance}
			<DistanceMetrics distance={palette.distance} />
		{/if}
	</div>
</div>

<style>
	.map-wrapper {
		display: flex;
	}

	.map-controls {
		padding: 4rem;
	}

	.map {
		width: 500px;
		background-color: #f5f5f5;
		display: flex;
		justify-content: center;
		border-radius: 12px;
	}

	.map-content {
		max-width: 500px;
		display: flex;
		flex-flow: column;
	}
</style>
