<script>
  import Button from "../Button.svelte";
  import { createEventDispatcher } from "svelte";

  export let min = 0;
  export let max = 1000;
  export let value = 0;

  let interacted = false;

  const dispatch = createEventDispatcher();

  const onInput = (e) => {
    if (e) onChange(e);
    if (!interacted) {
      dispatch("interact");
      interacted = true;
    }
  };

  const onChange = (e, changeVal) => {
    const change = parseInt(e?.target?.value || changeVal || value);
    if (change > max) dispatch("change", max);
    else if (change < min) dispatch("change", min);
    else dispatch("change", change);

    onInput();
  };
</script>

<div class="slider-wrapper">
  <input
    class="slider"
    type="range"
    {min}
    {max}
    {value}
    on:change={onChange}
    on:input={onInput}
  />
  <div class="slider-legend">
    <Button on:click={() => onChange(null, parseInt(value) - 50)}
      >- Less Lag</Button
    >
    <Button on:click={() => onChange(null, parseInt(value) + 50)}
      >+ More Lag</Button
    >
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
    background-color: var(--primary);
    cursor: grab;
    border: 1px solid;
    border-radius: var(--border-radius-interact);
    box-shadow: var(--shadow-interact);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .slider::-moz-range-thumb {
    width: 10px;
    height: 50px;
    border-radius: 0;
    background-color: var(--primary);
    cursor: grab;
    border: 1px solid;
    border-radius: var(--border-radius-interact);
    box-shadow: var(--shadow-interact);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .slider:active::-moz-range-thumb {
    cursor: grabbing;
    transform: scale(1.1);
    box-shadow: var(--shadow-interact-active);
  }

  .slider:active::-webkit-slider-thumb {
    cursor: grabbing;
    transform: scale(1.1);
    box-shadow: var(--shadow-interact-active);
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
