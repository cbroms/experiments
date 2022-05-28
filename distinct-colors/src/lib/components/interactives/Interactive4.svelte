<script>
  import InteractiveLayout from '$lib/components/interactives/InteractiveLayout.svelte';

  import { makeLCHColor, generatePalette } from '$lib/colors.js';

  import { onMount } from 'svelte';
  import { debounce } from 'lodash-es';

  import InputControl from '$lib/components/InputControl.svelte';
  import Swatch from '$lib/components/Swatch.svelte';
  import DistanceMetrics from '$lib/components/DistanceMetrics.svelte';
  import SwatchLayout from '../SwatchLayout.svelte';

  let chroma = 0.25;
  let lightness = 0.6;
  let hue = 20;

  let minLightness = 0.6;
  let maxLightness = 0.8;
  let numColors = 15;

  let palette = { colors: [] };

  let paletteHex = '';

  onMount(() => {
    repaintMap();
  });

  const repaintMap = debounce(() => {
    const color = makeLCHColor({ l: lightness, c: chroma, h: hue });
    // generate palette
    palette = generatePalette(color.lch, numColors, [minLightness, maxLightness]);

    let hexed = palette.colors.map((color) => {
      return color.hex;
    });
    paletteHex = `[${hexed.join(', ')}]`;
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

  const onNumColorsChange = (e) => {
    numColors = parseInt(e.detail.value);
    repaintMap();
  };
</script>

<InteractiveLayout>
  <div slot="map" class="map">
    <SwatchLayout>
      {#each palette.colors as color}
        <Swatch hex={color.hex} />
      {/each}
    </SwatchLayout>
    {#if palette.distance}
      <DistanceMetrics distance={palette.distance} />
    {/if}
    <div class="label">Palette Hex</div>
    <pre>{paletteHex}</pre>
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
  </div>
</InteractiveLayout>

<style>
  .map {
    height: 100%;
    width: 720px;
    padding: 10px;
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

  @media (max-width: 1100px) {
    .map {
      width: 100%;
    }
  }
  pre {
    max-width: 700px;
    margin: 0;
    margin-top: 5px;
    display: inline-block;
    overflow: scroll;
    padding-bottom: 10px;
    width: 100%;
  }

  .label {
    margin-top: 20px;
  }
</style>
