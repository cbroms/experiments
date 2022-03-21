<script>
  export let min = 0;
  export let max = 1000;
  export let value = 0;

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const onChange = (e) => {
    dispatch("change", e.target.value);
  };
</script>

<div class="slider-wrapper">
  <input class="slider" type="range" {min} {max} {value} on:change={onChange} />
  <div class="slider-legend">
    <div>&larr; less lag</div>
    <div>more lag &rarr;</div>
  </div>
</div>

<style>
  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 30px;
    border-radius: 5px;
    background: #d3d3d3;
    outline: none;
    margin: 10px 0;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 0;
    background: #04aa6d;
    cursor: grab;
    border: none;
    border-radius: 2px;
  }

  .slider::-moz-range-thumb {
    width: 10px;
    height: 50px;
    border-radius: 0;
    background: #04aa6d;
    cursor: grab;
    border: none;
    border-radius: 2px;
  }

  .slider:active::-moz-range-thumb {
    cursor: grabbing;
  }

  .slider:active::-webkit-slider-thumb {
    cursor: grabbing;
  }

  .slider-legend {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .slider-wrapper {
    margin: 1rem 0;
  }
</style>
