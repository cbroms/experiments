<script context="module">
	export const prerender = true;
</script>

<script>
	import {
		getOpposite,
		generateRandom,
		generatePalette,
		paletteToCvdPalette,
		getPaletteDistances,
		adjustPaletteForCvd
	} from '$lib/colors.js';
	import Swatch from '$lib/components/Swatch.svelte';

	let inputColor = generateRandom();
	let colors = generatePalette(inputColor, 10, [50, 90]);
	let colorsCvd = paletteToCvdPalette(colors);

	// const randomColor = () => {
	// 	colors = [...colors, generateRandom()];
	// 	// colors = sortRandomColors();
	// 	console.log(colors);
	// };

	const onCvdCheck = (e) => {
		if (e.target.checked) {
			console.log('pre reg: ', getPaletteDistances(colors));
			console.log('pre cvd: ', getPaletteDistances(colorsCvd));

			colors = adjustPaletteForCvd(colors, [50, 90]);
			colorsCvd = paletteToCvdPalette(colors);

			console.log('post reg: ', getPaletteDistances(colors));
			console.log('post cvd: ', getPaletteDistances(colorsCvd));
		} else {
			colors = generatePalette(inputColor, 10, [50, 90]);
			colorsCvd = paletteToCvdPalette(colors);
		}
	};

	const onInput = (e) => {
		inputColor = e.target.value;
		colors = generatePalette(inputColor, 10, [50, 90]);
		colorsCvd = paletteToCvdPalette(colors);
	};
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div>hello</div>
	<input on:input={onInput} type="color" value={inputColor} />
	<input type="checkbox" on:change={onCvdCheck} />
	<!-- <button on:click={randomColor}>Generate Random</button> -->

	<div>
		<Swatch hex={inputColor} />
	</div>
	<div>
		{#each colors as hex}
			<Swatch {hex} />
		{/each}
	</div>
	<hr />
	<div>
		{#each colorsCvd as hex}
			<Swatch {hex} />
		{/each}
	</div>
</section>

<style>
</style>
