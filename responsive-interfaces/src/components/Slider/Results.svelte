<script>
  import ResultMarker from "./ResultMarker.svelte";
  export let point = 400;
  export let average = 300;
  export let max = 800;

  let eltWidth;

  let adjustedPoint = null;
  let adjustedAverage = null;
  let rightPoint = false;
  let rightAverage = false;

  let stretch = 0;

  $: {
    if (eltWidth) {
      adjustedPoint = (point / max) * eltWidth;
      adjustedAverage = (average / max) * eltWidth;

      rightPoint = adjustedPoint >= adjustedAverage;
      rightAverage = adjustedPoint < adjustedAverage;

      if (adjustedPoint < 100) {
        rightPoint = true;
      }
      if (adjustedAverage < 100) {
        rightAverage = true;
      }
      if (adjustedPoint > eltWidth - 100) {
        rightPoint = false;
      }
      if (adjustedAverage > eltWidth - 100) {
        rightAverage = false;
      }

      if (
        !rightPoint &&
        !rightAverage &&
        Math.abs(adjustedAverage - adjustedPoint) < 100
      ) {
        stretch = 100 - Math.abs(adjustedAverage - adjustedPoint);
      } else if (
        rightPoint &&
        rightAverage &&
        Math.abs(adjustedPoint - adjustedAverage) < 100
      ) {
        stretch = 100 - Math.abs(adjustedPoint - adjustedAverage);
      } else {
        stretch = 0;
      }
    }
  }
</script>

<div class="results-wrapper">
  <div class="results" bind:offsetWidth={eltWidth} />
  <ResultMarker right={rightPoint} x={adjustedPoint} {stretch}>
    <div>Your point</div>
  </ResultMarker>
  <ResultMarker right={rightAverage} x={adjustedAverage}>
    <div>Average</div>
  </ResultMarker>
</div>

<style>
  .results {
    position: absolute;
    width: 100%;
    height: 30px;
    border-radius: 5px;
    background: #d3d3d3;
    margin: 10px 0;
    z-index: 1;
  }

  .results-wrapper {
    position: relative;
    margin: 1rem 0;
    height: 90px;
  }
</style>
