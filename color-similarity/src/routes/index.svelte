<script context="module">
	export const prerender = true;
</script>

<script>
	import {
		getOpposite,
		hexToLCH,
		LCHToHex,
		make2DCIELCHMap,
		generateRandom,
		generatePalette,
		paletteToCvdPalette,
		getPaletteDistances,
		adjustPaletteForCvd,
		modifyColor
	} from '$lib/colors.js';

	import ColorMap from '$lib/components/ColorMap.svelte';
	import Swatch from '$lib/components/Swatch.svelte';
	import { onMount } from 'svelte';

	let inputColor = '#fff';
	let colors = [];
	let colorsCvd = [];

	let chroma;
	let lightness;
	let hue;

	let mapColors;

	let distance = 0;

	let lightnessMax;
	let lightnessMin;

	onMount(() => {
		lightnessMax = 85;
		lightnessMin = 50;
		chroma = 120;

		inputColor = generateRandom(chroma, [lightnessMin, lightnessMax]);
		mapColors = make2DCIELCHMap(chroma);

		updateValuesFromColor();
	});

	const updateValuesFromColor = () => {
		const newChoma = Math.round(inputColor.c);
		if (newChoma !== chroma) {
			mapColors = make2DCIELCHMap(newChoma);
		}
		chroma = newChoma;
		lightness = Math.round(inputColor.l);
		hue = Math.round(inputColor.h);

		const newPalette = generatePalette(inputColor, 20, [lightnessMin, lightnessMax]);
		colors = newPalette.colors;
		distance = newPalette.distance;
	};

	// const onCvdCheck = (e) => {
	// 	if (e.target.checked) {
	// 		console.log('pre reg: ', getPaletteDistances(colors));
	// 		console.log('pre cvd: ', getPaletteDistances(colorsCvd));

	// 		colors = adjustPaletteForCvd(colors, [50, 90]);
	// 		colorsCvd = paletteToCvdPalette(colors);

	// 		console.log('post reg: ', getPaletteDistances(colors));
	// 		console.log('post cvd: ', getPaletteDistances(colorsCvd));
	// 	} else {
	// 		colors = generatePalette(inputColor, 10, [50, 90]);
	// 		colorsCvd = paletteToCvdPalette(colors);
	// 	}
	// };

	const onChromaInput = (e) => {
		inputColor = modifyColor(inputColor, { c: parseInt(e.target.value) });
		updateValuesFromColor();
	};

	const onHueInput = (e) => {
		inputColor = modifyColor(inputColor, { h: parseInt(e.target.value) });
		updateValuesFromColor();
	};

	const onInput = (e) => {
		inputColor = hexToLCH(e.target.value);
		updateValuesFromColor();
		// colors = generatePalette(inputColor, 10, [50, 90]);
		// colorsCvd = paletteToCvdPalette(colors);
	};

	const onMinLightnessInput = (e) => {
		lightnessMin = parseInt(e.target.value);
		updateValuesFromColor();
	};

	const onMaxLightnessInput = (e) => {
		lightnessMax = parseInt(e.target.value);
		updateValuesFromColor();
	};
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div>hello</div>
	<input on:input={onInput} type="color" value={LCHToHex(inputColor)} />
	<div>
		<label for="chroma">Chroma</label>
		<input on:change={onChromaInput} value={chroma} id="chroma" type="range" min="0" max="133" />
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
				max="100"
			/>
			<label for="max-lightness">Max</label>
			<input
				on:change={onMaxLightnessInput}
				value={lightnessMax}
				id="max-lightness"
				type="number"
				min="0"
				max="100"
			/>
		</div>
	</div>
	<div />

	<!-- <input type="checkbox" on:change={onCvdCheck} /> -->
	<!-- <button on:click={randomColor}>Generate Random</button> -->

	<div>
		{#each colors as col}
			<Swatch hex={col.hex} />
		{/each}
	</div>
	<hr />
	<div>
		{#each colorsCvd as hex}
			<Swatch {hex} />
		{/each}
	</div>
	<div>
		Distance: {distance}
	</div>
	<div>
		<ColorMap colors={mapColors} palette={colors} {lightnessMax} {lightnessMin} />
	</div>
</section>

<style>
</style>
