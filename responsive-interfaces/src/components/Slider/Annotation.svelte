<script>
  import Marker from "./Marker.svelte";

  export let point = 400;
  export let average = -200;
  export let max = 800;
  export let showAverage = false;
  export let width = 600;

  const threshold = 140;

  let adjustedPoint = null;
  let adjustedAverage = null;
  let rightPoint = false;
  let rightAverage = false;

  let pointStretch = 0;
  let averageStretch = 0;

  $: {
    if (width) {
      adjustedPoint = (point / max) * width;
      adjustedAverage = (average / max) * width;

      rightPoint = adjustedPoint >= adjustedAverage;
      rightAverage = adjustedPoint < adjustedAverage;

      if (adjustedPoint < threshold) {
        rightPoint = true;
      }
      if (adjustedAverage < threshold) {
        rightAverage = true;
      }
      if (adjustedPoint > width - threshold) {
        rightPoint = false;
      }
      if (adjustedAverage > width - threshold) {
        rightAverage = false;
      }

      if (
        !rightPoint &&
        !rightAverage &&
        Math.abs(adjustedAverage - adjustedPoint) < threshold
      ) {
        const stretch = threshold - Math.abs(adjustedPoint - adjustedAverage);
        if (adjustedPoint < adjustedAverage) pointStretch = stretch;
        else averageStretch = stretch;
      } else if (
        rightPoint &&
        rightAverage &&
        Math.abs(adjustedPoint - adjustedAverage) < threshold
      ) {
        const stretch = threshold - Math.abs(adjustedPoint - adjustedAverage);
        if (adjustedPoint < adjustedAverage) averageStretch = stretch;
        else pointStretch = stretch;
      } else {
        averageStretch = 0;
        pointStretch = 0;
      }
    }
  }
</script>

<div class="results-wrapper">
  <Marker right={rightPoint} x={adjustedPoint} stretch={pointStretch}>
    <div>
      <div>Lag</div>
      <div>{point}ms</div>
    </div></Marker
  >
  {#if showAverage}
    <Marker right={rightAverage} x={adjustedAverage} stretch={averageStretch}>
      <div>
        <div>Average</div>
        <div>{average}ms</div>
      </div>
    </Marker>
  {/if}
</div>

<style>
  .results-wrapper {
    position: relative;
    margin: 1rem 0;
  }
</style>
