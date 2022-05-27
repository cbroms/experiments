<script context="module">
  export const prerender = true;
  export const router = false;
</script>

<script>
  import Interactive1 from '$lib/components/interactives/Interactive1.svelte';
  import Interactive2 from '$lib/components/interactives/Interactive2.svelte';
  import Interactive3 from '$lib/components/interactives/Interactive3.svelte';
  import Interactive4 from '$lib/components/interactives/Interactive4.svelte';
  import Swatch from '$lib/components/Swatch.svelte';
  import SwatchLayout from '$lib/components/SwatchLayout.svelte';

  import hljs from 'highlight.js/lib/core';
  import javascript from 'highlight.js/lib/languages/javascript';
  hljs.registerLanguage('javascript', javascript);

  import 'highlight.js/styles/stackoverflow-light.css';
  import { afterUpdate } from 'svelte';

  const colormapCode = `
import { clampChroma, formatHex } from "culori"

const generateColormap = (chroma = 0.3, lightness = 0.8) => {
    const colormap = []
    // create a color for every hue with this chroma and lightness
    for (let h = 1; h <= 360; h++) {
        const color = {
            mode: "oklch",
            l: lightness,
            c: chroma,
            h
        }
        // convert the OKLCh color to hex
        colormap.push(formatHex(clampChroma(color)))
    }

    return colormap
}`;

  const colormapCode2 = `
const lightColormap = generateColormap(0.3, 0.65)
const darkColormap = generateColormap(0.3, 0.75)
`;

  const colorPaletteCode = `
const numColors = 12;
const stepSize = Math.round(360 / numColors)

const palette = []

for (let i = 0; i < numColors; i += stepSize) {
    if (i % 2 === 0) palette.push(lightColormap[i * stepSize])
    else palette.push(darkColormap[i * stepSize])
}
`;

  afterUpdate(() => {
    hljs.highlightAll();
  });
</script>

<svelte:head>
  <title>Colors</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<article>
  <section>
    <h1>A simple method to create a maximally distinct set of colors</h1>
    <p>
      What is a set of eight colors look as different from each other as possible? Or ten colors,
      fifteen? Is there a generalizable approch for creating such a set?
    </p>
    <h3>Existing options: hand picked sets</h3>
    <p>
      There’s plenty of sets that can be found online that’ve been curated to contain colors that
      are visually distinct. Many are based on the colors of lines on transit maps from around the
      world, a clever way to get started. A few examples include <a
        href="http://www.iscc-archive.org/pdf/PC54_1724_001.pdf"
        target="_blank">Kelley's 22 colors of maximum contrast</a
      >
      (a set developed in 1965),
      <a href="https://personal.sron.nl/~pault/#sec:qualitative" target="_blank">Paul Tol's sets</a>
      developed from transit maps, and
      <a href="https://sashamaps.net/docs/resources/20-colors/" target="_blank"
        >Sasha Trubetskoy's 20 color set</a
      >, developed from both Kelley's set and transit maps.
    </p>

    <p>
      <SwatchLayout title="Excerpt of Kelley's 22 Color Set">
        <Swatch hex={'#F3C300'} />
        <Swatch hex={'#875692'} />
        <Swatch hex={'#F38400'} />
        <Swatch hex={'#A1CAF1'} />
        <Swatch hex={'#BE0032'} />
        <Swatch hex={'#C2B280'} />
        <Swatch hex={'#848482'} />
        <Swatch hex={'#008856'} />
      </SwatchLayout>
    </p>
    <p>
      <SwatchLayout title="Excerpt of Tol's light color set">
        <Swatch hex={'#77AADD'} />
        <Swatch hex={'#EE8866'} />
        <Swatch hex={'#EEDD88'} />
        <Swatch hex={'#FFAABB'} />
        <Swatch hex={'#99DDFF'} />
        <Swatch hex={'#44BB99'} />
        <Swatch hex={'#BBCC33'} />
        <Swatch hex={'#AAAA00'} />
      </SwatchLayout>
    </p>
    <p>
      <SwatchLayout title="Excerpt of Trubetskoy's 20 color set">
        <Swatch hex={'#e6194b'} />
        <Swatch hex={'#3cb44b'} />
        <Swatch hex={'#ffe119'} />
        <Swatch hex={'#4363d8'} />
        <Swatch hex={'#f58231'} />
        <Swatch hex={'#911eb4'} />
        <Swatch hex={'#46f0f0'} />
        <Swatch hex={'#f032e6'} />
      </SwatchLayout>
    </p>

    <details>
      <summary>More hand-picked sets and resources</summary>
      <ul>
        <li>
          <a href="http://phrogz.net/tmp/24colors.html" target="_blank">Another set</a>.
        </li>
        <li>
          <a href="https://healthdataviz.com/2012/02/02/optimal-colors-for-graphs/" target="_blank"
            >And another set</a
          >.
        </li>
        <li>
          <a
            href="https://eleanormaclure.files.wordpress.com/2011/03/colour-coding.pdf"
            target="_blank">A Colour Alphabet and the Limits of Colour Coding</a
          >, a nice review paper.
        </li>
      </ul>
    </details>

    <p>
      But curated sets only go so far; what if you need more colors, or if the colors supplied are
      too light or dark? And how do we know the colors are really that distinct? For this we need
      some kind of a generative approach.
    </p>
    <h3>Generative approaches for more flexibility</h3>

    <p>
      Probably the most well known generative approach is the <a
        href="https://strathprints.strath.ac.uk/30312/1/colorpaper_2006.pdf"
        target="_blank">Glasbey algorithm</a
      >, which builds a set by finding colors that are maximally perceptually distinct from all
      other colors in the set. It results in sets of colors like this:
    </p>
    <p>
      <SwatchLayout title="Excerpt of a glasbey generated set">
        <Swatch hex={'#5c000d'} />
        <Swatch hex={'#00ffde'} />
        <Swatch hex={'#17a8ff'} />
        <Swatch hex={'#ffe800'} />
        <Swatch hex={'#08005c'} />
        <Swatch hex={'#ffd1c7'} />
        <Swatch hex={'#05ff05'} />
        <Swatch hex={'#0000ff'} />
      </SwatchLayout>
    </p>
    <details>
      <summary>More Glasbey resources</summary>
      <ul>
        <li>
          <a href="https://strathprints.strath.ac.uk/30312/1/colorpaper_2006.pdf" target="_blank"
            >The original paper</a
          >.
        </li>
        <li>
          <a href="https://github.com/taketwo/glasbey" target="_blank">Python implementation</a>.
        </li>
        <li>
          <a href="https://github.com/btupper/catecolors" target="_blank">R implementation</a>.
        </li>
        <li>
          <a href="https://colorcet.holoviz.org/user_guide/Categorical.html" target="_blank"
            >Pre-generated colormaps in Python</a
          >.
        </li>
      </ul>
    </details>
    <p>
      The Glasbey algorithm chooses colors that are varied on three dimensions: chroma (the
      colorfulness of the color), lightness, and hue.
    </p>
    <p>
      <SwatchLayout title="Varying chroma">
        <Swatch hex={'#fe692b'} />
        <Swatch hex={'#ca8d78'} />
        <Swatch hex={'#af9890'} />
      </SwatchLayout>
    </p>
    <p>
      But in information visualization, varying the chroma can come at a cost: it can change the
      interpretation of the category. A category that’s more colorful might pop out, while a greyer
      category may get lost in comparison. The same is true of lightness: very light or dark colors
      can get lost in the background and may be interpreted differently. <a
        href="https://www.r-project.org/conferences/DSC-2003/Proceedings/Ihaka.pdf"
        target="_blank">It’s been suggested</a
      > that the safest way to generate a set of colors for visualizing categorical variables is to keep
      chroma and lightness fixed.
    </p>

    <!-- <p>
            <SwatchLayout title="Varying lightness">
                <Swatch hex={'#fe692b'} />
                <Swatch hex={'#ff9b77'} />
                <Swatch hex={'#ffc5b1'} />
            </SwatchLayout>
        </p> -->
    <p>
      The Glasbey algorithm is also quite demanding to run; it requires building a color lookup
      table and doing some amount of random sampling.
    </p>
    <details>
      <summary>More generative approaches and resources</summary>
      <ul>
        <li>
          <a href="https://ieeexplore.ieee.org/abstract/document/7539386" target="_blank"
            >Colorgorical: Creating discriminable and preferable color palettes for information
            visualization</a
          >.
        </li>
      </ul>
    </details>
    <p>
      Is there a simpler approach? If we don’t vary chroma at all, only vary lightness within a
      certain range, and vary hue, is there an easier path to generating palettes of colors?
    </p>
  </section>
  <section>
    <h2>Choosing a color space</h2>
    <p>
      The first choice we need to make is which <a
        href="https://en.wikipedia.org/wiki/Color_space"
        target="_blank"
        >color space
      </a>we'll use to generate the set.
    </p>
    <h3>Avoiding visual lightness discrepancies</h3>
    <p>
      The problem with the basic <a
        href="https://en.wikipedia.org/wiki/RGB_color_spaces"
        target="_blank">RGB</a
      >
      or <a href="https://en.wikipedia.org/wiki/HSL_and_HSV" target="_blank">HSL</a> color spaces that
      are often used in color pickers is they aren’t perceptually uniform. Meaning that changing just
      hue also changes how light the color appears. Here’s an example from HSL, just changing the hue
      and keeping everything else fixed:
    </p>
    <p>
      <SwatchLayout title="Changing hues in HSL">
        <Swatch hex={'#4C6AFF'} />
        <Swatch hex={'#FFFF4C'} />
        <Swatch hex={'#4CFFC3'} />
      </SwatchLayout>
    </p>
    <p>
      This visual discrepancy ocurrs beacuse our perception of color isn’t uniform; yellow appears
      lighter and blue appears darker despite having the exact same lightness values in the HSL
      colorspace.
    </p>
    <p>
      This <a href="https://bottosson.github.io/misc/colorpicker/" target="_blank"
        >interactive color picker</a
      > makes it clear how much lightness variation there is in the HSL color space.
    </p>
    <h3>Perceptually uniform color spaces</h3>
    <p>
      In order to avoid this, our color palette needs to be generated in a <a
        href="https://en.wikipedia.org/wiki/Color_appearance_model"
        target="_blank">perceptually uniform color space</a
      >: a space that has been designed to more closely mimic the way color is perceived by the rods
      and cones in our eyes.
    </p>
    <p>
      In a perceptually uniform color space, changing one dimension doesn’t affect the perceptual
      qualities of the other dimensions. So our example above would look more uniform; changing only
      the hue would keep the relative lightness of the color the same:
    </p>
    <p>
      <SwatchLayout title="Changing hues in OKLAB">
        <Swatch hex={'#0099E0'} />
        <Swatch hex={'#D17400'} />
        <Swatch hex={'#00AC4F'} />
      </SwatchLayout>
    </p>
    <p>
      There are lots of these perceptually uniform colorspaces, including <a
        href="https://en.wikipedia.org/wiki/CIELAB_color_space"
        target="_blank">CIELAB</a
      >, <a href="https://en.wikipedia.org/wiki/CIELUV" target="_blank">CIELUV</a>,
      <a href="https://en.wikipedia.org/wiki/CIECAM02" target="_blank">CIECAM02</a>,
      <a href="https://opg.optica.org/oe/fulltext.cfm?uri=oe-25-13-15131&id=368272" target="_blank"
        >J<sub>z</sub>A<sub>z</sub>B<sub>z</sub></a
      >, and <a href="https://bottosson.github.io/posts/oklab/" target="_blnak">OKLAB</a>. Each is
      an imperfect approximation and each have areas where they under and outperform their peers. I
      went with the OKLAB space as it seemed to
      <a href="https://bottosson.github.io/posts/oklab/#munsell-data" target="_blank"
        >perform best</a
      > all around.
    </p>
    <h3>Visualizing the color space</h3>
    <p>OKLAB (and any other *LAB-type color space) has three dimensions:</p>
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
    <p>
      Lightness is the y-axis of the space, from totally black at the bottom to totally white at the
      top. Chroma is the radius of the cylinder, with a lower chroma corresponding to a smaller and
      less colorful section of the space closer to the center of the cylinder. Hue is the rotation
      around the center axis and is measured from 0 to 360&deg;.
    </p>
  </section>

  <section>
    <h2>Generating the set of colors</h2>
    <h3>Measuring perceptual distance</h3>
    <p>
      One useful characteristic of a colorspace like OKLCh is that measuring how different two
      colors appear is quite easy. Since the colorspace has already been adjusted to be perceptually
      uniform, the distance between two colors in space can be interpreted as the perceptual
      distance between the colors.
    </p>
    <p>
      So in order to get the most perceptually most distinct color from another, we rotate the hue
      180&deg; around to the opposite side of the colorspace, maximizing the distance between it and
      the existing color.
    </p>
    <h3>Rotating hue</h3>
    <p>
      With this property in mind, to generate a palette of colors of a particular size all we need
      to do is divide the number of hues (360) by the desired number of colors we want and rotate by
      that amount at each step.
    </p>
    <Interactive2 />
    <h3>Adding a lightness range</h3>
    <p>The next dimension to consider is lightness.</p>
    <p>
      One of the original requirements was to bind lightness to a certain range, so we don’t have
      any colors in the set that are too light or dark but can still take advantage of the
      additional perceptual variation we get with different lightnesses.
    </p>
    <p>
      So, we'll adjust the color selection at each hue step. Rather than just picking the color with
      the same lightness, we’ll find the next color by looping through the possible lightness values
      at this hue value and recording minimum distance between the test color and the existing
      colors in the set. Whichever test color has the furthest minimum distance we’ll add to the
      set.
    </p>
    <Interactive3 />

    <p>
      For most lightness ranges and chromas, this method has the effect of pushing the color at each
      hue step to the opposite lightness bound as the previous color in the set. This seems like a
      good property to take advantage of to simplifying the process.
    </p>
    <h3>A simple generation method</h3>
    <p>
      To implement we'll use <a href="https://culorijs.org/" target="_blank">culori</a>, a fantastic
      color library for javascript.
    </p>
    <p>
      Given the exploration above, it seems like the simplest way to generate the palette is to
      start by creating two colormaps: one at the max lightness value and one at the minimum. Then,
      we'll create a palette by dividing up the colormap into evenly sized chunks and pick each hue
      alternating from the light to the dark colormaps.
    </p>
    <p>To begin, we'll define a way to create a colormap in OKLCh space, converted to hex:</p>
    <pre><code class="language-javascript">{colormapCode.trim()}</code></pre>
    <p>Then, we can create the light and dark colormaps:</p>
    <pre><code class="language-javascript">{colormapCode2.trim()}</code></pre>
    <p>
      Finally, we can choose a palette by selecting colors from each of the two colormaps. We'll
      divide each colormap into chunks sized based on the number of colors in the palette, then
      alternate between the light and dark maps to create the set.
    </p>
    <pre><code class="language-javascript">{colorPaletteCode.trim()}</code></pre>
  </section>
  <section>
    <h2>Generate color sets</h2>
    <p>
      With that we have a quick and simple way of creating maximally distinct sets of colors with a
      few useful parameters.
    </p>
    <Interactive4 />
    <h3>Next</h3>
    <p>
      One obvious limitation to this method is it assumes perfect color vision. An important
      addition would be to adjust for deuteranopia, protanopia, and tritanopia. Naturally the number
      of colors in the palette will be much lower, but it should be possible to adjust the
      colorspace to account for these types of vision and pick colors taking these spaces into
      account.
    </p>
  </section>
  <footer>
    <p>Published May 2022</p>
    <p>Thanks to Sydney Zheng for discussions about this experiment.</p>
    <p>
      Body text is <a href="https://rsms.me/inter/" target="_blank">Inter</a>, previews are
      <a href="https://github.com/cbroms/link-previews">Hyperfov link previews</a>, colors generated
      with <a href="https://culorijs.org/" target="_blank">culori</a>, interactive examples built
      with <a href="https://threejs.org/" target="_blank">threejs</a>, components built with
      <a href="https://kit.svelte.dev/" target="_blank">sveltekit</a>.
    </p>
  </footer>
</article>

<style>
  p,
  h1,
  h2,
  h3,
  ul,
  footer {
    max-width: 620px;
  }

  h1 {
    margin-top: 5rem;
  }

  h2 {
    margin-top: 3rem;
  }

  h3 {
    margin-top: 2rem;
  }

  article {
    margin: 0 auto;
    max-width: 1100px;
    padding: 10px;
  }

  summary {
    cursor: pointer;
    color: var(--mid-grey);
    font-size: var(--font-small);
    text-transform: uppercase;
    font-weight: bold;
  }

  summary::after {
    content: '...';
  }

  pre {
    max-width: 720px;
  }

  footer {
    margin: 48px 0;
    border-top: 1px solid var(--mid-grey);
    color: var(--mid-grey);
    font-size: var(--font-medium);
  }
</style>
