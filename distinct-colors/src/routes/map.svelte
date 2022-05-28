<script context="module">
	export const prerender = true;
</script>

<script>
	import { debounce } from 'lodash-es';

	import {
		getOpposite,
		hexToLCH,
		LCHToHex,
		make2DCIELCHMap,
		make2DOKLCHMap,
		generateRandom,
		generatePalette,
		paletteToCvdPalette,
		modifyColor,
		generatePaletteIcosahedron
	} from '$lib/colors.js';

	import ColorMap from '$lib/components/ColorMap.svelte';
	import DistanceMetrics from '$lib/components/DistanceMetrics.svelte';
	import Swatch from '$lib/components/Swatch.svelte';
	import { onMount } from 'svelte';

	let inputColor = '#fff';
	let colors = [];
	let colorsCvd = [];

	let chroma;
	let lightness;
	let hue;

	let mapColors;
	let mapColorsCvd;

	let distance = { max: 0, min: 0, sum: 0 };
	let distanceCvd = { ...distance };

	let lightnessMax;
	let lightnessMin;

	let adjustForCvd = false;

	onMount(() => {
		// lightnessMax = 85;
		// lightnessMin = 50;
		// chroma = 120;

		lightnessMax = 0.9;
		lightnessMin = 0.5;
		chroma = 0.2;

		inputColor = generateRandom(chroma, [lightnessMin, lightnessMax]);
		// mapColors = make2DCIELCHMap(chroma, false);
		// mapColorsCvd = make2DCIELCHMap(chroma, true);
		mapColors = make2DOKLCHMap(chroma, false);
		mapColorsCvd = make2DOKLCHMap(chroma, true);

		updateValuesFromColor();
	});

	const updateValuesFromColor = () => {
		const newChoma = inputColor.c;
		if (newChoma !== chroma) {
			mapColors = make2DOKLCHMap(newChoma);
			mapColorsCvd = make2DOKLCHMap(newChoma, true);
		}
		chroma = newChoma;
		lightness = inputColor.l;
		hue = inputColor.h;

		updateColorPalette();
	};

	const updateColorPalette = () => {
		const newPalette = generatePalette(inputColor, 9, [lightnessMin, lightnessMax], adjustForCvd);
		const newPaletteCvd = paletteToCvdPalette(newPalette);
		// const newPalette = generatePaletteIcosahedron(chroma);
		colors = newPalette.colors;
		colorsCvd = newPaletteCvd.colors;
		distance = newPalette.distance;
		distanceCvd = newPaletteCvd.distance;
	};

	const onCvdCheck = (e) => {
		if (e.target.checked) {
			adjustForCvd = true;
			updateColorPalette();
		} else {
			adjustForCvd = false;
			updateColorPalette();
		}
	};

	const onChromaInput = (e) => {
		inputColor = modifyColor(inputColor, { c: parseFloat(e.target.value) });
		updateValuesFromColor();
	};

	const onHueInput = (e) => {
		inputColor = modifyColor(inputColor, { h: parseFloat(e.target.value) });
		updateValuesFromColor();
	};

	const onColorInput = debounce((e) => {
		inputColor = hexToLCH(e.target.value);
		updateValuesFromColor();
	}, 300);

	const onMinLightnessInput = (e) => {
		lightnessMin = parseFloat(e.target.value);
		updateValuesFromColor();
	};

	const onMaxLightnessInput = (e) => {
		lightnessMax = parseFloat(e.target.value);
		updateValuesFromColor();
	};

	const delay = (n) => {
		return new Promise(function (resolve) {
			setTimeout(resolve, n);
		});
	};

	const onGenerateOptimalPalette = async (e) => {
		let paletteOptions = [];
		for (let h = 1; h <= 360; h++) {
			inputColor = { mode: 'oklch', c: chroma, l: lightnessMin, h };
			updateValuesFromColor();
			await delay(20);
			paletteOptions.push({ color: inputColor, distance, distanceCvd });
		}

		const distancesMean =
			paletteOptions.reduce((a, p) => p.distance.min + a, 0) / paletteOptions.length;
		const distancesCvdMean =
			paletteOptions.reduce((a, p) => p.distanceCvd.min + a, 0) / paletteOptions.length;

		let maxDistFromMean = 0;
		let largestDistIdx = 0;

		for (let i = 0; i < paletteOptions.length; i++) {
			const distFromMean = paletteOptions[i].distance.min - distancesMean;
			const distFromMeanCvd = paletteOptions[i].distanceCvd.min - distancesCvdMean;
			if (distFromMean + distFromMeanCvd > maxDistFromMean) {
				maxDistFromMean = distFromMean + distFromMeanCvd;
				largestDistIdx = i;
			}
		}

		inputColor = paletteOptions[largestDistIdx].color;
		updateValuesFromColor();
	};
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div>hello</div>
	<input on:input={onColorInput} type="color" value={LCHToHex(inputColor)} />
	<div>
		<label for="chroma">Chroma</label>
		<input
			on:change={onChromaInput}
			value={chroma}
			id="chroma"
			type="range"
			min="0"
			max="0.322"
			step="0.01"
		/>
		<label for="hue">Hue</label>
		<input on:change={onHueInput} value={hue} id="hue" type="range" min="0" max="360" />
		<div>
			<label for="min-lightness">Min</label>

			<input
				on:change={onMinLightnessInput}
				value={lightnessMin}
				id="min-lightness"
				type="number"
				min="0"
				max="1"
				step="0.01"
			/>
			<label for="max-lightness">Max</label>
			<input
				on:change={onMaxLightnessInput}
				value={lightnessMax}
				id="max-lightness"
				type="number"
				min="0"
				max="1"
				step="0.01"
			/>
		</div>
	</div>
	<div />

	<input type="checkbox" on:change={onCvdCheck} />
	<button on:click={onGenerateOptimalPalette}>Generate Optimal Set</button>

	<div>
		{#each colors as col}
			<Swatch hex={col.hex} />
		{/each}
	</div>
	<div>
		<DistanceMetrics {distance} />
	</div>
	<div>
		<ColorMap colors={mapColors} palette={colors} {lightnessMax} {lightnessMin} />
	</div>

	<hr />
	<div>
		{#each colorsCvd as col}
			<Swatch hex={col.hex} />
		{/each}
	</div>
	<div>
		<DistanceMetrics distance={distanceCvd} />
	</div>
	<div>
		<ColorMap colors={mapColorsCvd} palette={colorsCvd} {lightnessMax} {lightnessMin} />
	</div>
</section>

<style>
</style>
