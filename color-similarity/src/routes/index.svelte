<script context="module">
	export const prerender = true;
</script>

<script>
	import Interactive1 from '$lib/components/interactives/Interactive1.svelte';
	import Interactive2 from '$lib/components/interactives/Interactive2.svelte';
	import Interactive3 from '$lib/components/interactives/Interactive3.svelte';
	import Swatch from '$lib/components/Swatch.svelte';
	import SwatchLayout from '$lib/components/SwatchLayout.svelte';
</script>

<svelte:head>
	<title>Colors</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<article>
	<section>
		<h1>Creating a maximally distinct set of colors</h1>
	</section>
	<section>
		<h2>Perceptually uniform color spaces</h2>
		<p>
			The problem with the basic RGB or HSL color spaces that are often used in color pickers is
			they aren’t perceptually uniform. Meaning that changing the just hue also changes how light
			the color appears, even if the lightness value doesn’t actually change. Here’s an example from
			HSL, just changing the hue and keeping everything else fixed:
		</p>
		<SwatchLayout title="Changing hues in HSL">
			<Swatch hex={'#4C6AFF'} />
			<Swatch hex={'#FFFF4C'} />
			<Swatch hex={'#4CFFC3'} />
		</SwatchLayout>
		<p>
			This visual discrepancy ocurrs beacuse our perception of color isn’t uniform; yellow appears
			lighter and blue appears darker despite having the exact same lightness values in the HSL
			colorspace.
		</p>
		<p>
			In order to avoid this, our color palette needs to be generated in a perceptually uniform
			color space: a space that has been designed to more closely mimic the way color is perceived
			by the rods and cones in our eyes.
		</p>
		<p>
			In a perceptually uniform color space, changing one dimension doesn’t affect the perceptual
			qualities of the other dimensions. So our example above would look more uniform; changing only
			the hue would keep the relative lightness of the color the same:
		</p>
		<SwatchLayout title="Changing hues in OKLAB">
			<Swatch hex={'#0099E0'} />
			<Swatch hex={'#D17400'} />
			<Swatch hex={'#00AC4F'} />
		</SwatchLayout>
		<p>
			There are lots of these perceptually uniform colorspaces out there, such as CIELAB, CIELUV,
			CIECAM02, J<sub>z</sub>A<sub>z</sub>B<sub>z</sub>, and OKLAB. Each is a different
			approximation and each have areas where they under and outperform their peers. I went with the
			OKLAB space as it seemed to perform best all around.
		</p>
		<p>OKLAB has three dimensions:</p>
		<ul>
			<li><strong>L</strong>. Lightness: how light or dark the color appears.</li>
			<li><strong>a</strong>. The green-red component of our vision.</li>
			<li><strong>b</strong>. The blue-yellow component of our vision.</li>
		</ul>
		<p>
			However, these dimensions aren’t the most intuitive to work with. An alternative mapping is
			the OKLCh space, which has these dimensions:
		</p>
		<ul>
			<li><strong>L</strong>. Lightness: how light or dark the color appears.</li>
			<li><strong>C</strong>. Chroma: the colorfulness, from fully colored to grey.</li>
			<li><strong>h</strong>. The hue, from 0-360&deg;.</li>
		</ul>
		<p>
			The CKLCh colorspace is a cylindrical colorspace, and can be visualized in 3D space as a
			cylinder. Every color exists somewhere in this shape:
		</p>
		<Interactive1 />
	</section>

	<section>
		<h2>Generating the set of colors</h2>
		<p>
			One useful characteristic of a colorspace like OKLCh is that measuring how different two
			colors appear is quite easy. Since the colorspace has already been adjusted to be perceptually
			uniform, the distance between two colors in space can be interpreted as the perceptual
			distance between the colors.
		</p>
		<p>
			In order to get the most perceptually most distinct color from another, we rotate the hue
			180&deg; around to the opposite side of the colorspace.
		</p>
		<p>
			To generate a palette of colors of a particular size, all we need to do is divide the number
			of hues (360) by the desired number of colors and rotate by that amount.
		</p>
		<Interactive2 />
		<p>The next dimension to consider is lightness.</p>
		<p>
			One of the original requirements was to bind lightness to a certain range, so that we don’t
			have any colors in the set that are too light or dark.
		</p>
		<p>
			So, at each hue step, we’ll find the next color by looping through the possible lightness
			values and recording minimum distance between test color and the existing colors in the set.
			Whichever color has the furthest minimum distance we’ll add to the set.
		</p>
		<Interactive3 />
	</section>
</article>

<style>
	p,
	h1,
	h2 {
		max-width: 720px;
	}

	article {
		margin: 0 auto;
		max-width: 1100px;
		padding: 10px;
	}
</style>
