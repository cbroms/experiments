<script>
  export let right = false;
  export let x = null;
  export let stretch = null;

  let defaultWidth = 20;

  let width = defaultWidth;
  let height = 70;

  let eltWidth;

  let xPos = 0;

  $: {
    if (stretch !== null) {
      width = defaultWidth + stretch;
    }
    if (x !== null) {
      if (right) {
        xPos = x;
      } else {
        xPos = x - eltWidth;
      }
    }
  }
</script>

<div
  class="result-marker-wrapper"
  style="left: {xPos}px;"
  bind:offsetWidth={eltWidth}
>
  <div class="result-marker" style="height: {height}px;">
    <svg
      style="float: {right ? 'left' : 'right'}"
      version="1.1"
      {width}
      {height}
      xmlns="http://www.w3.org/2000/svg"
    >
      {#if !right}
        <line
          x1={width - 1}
          x2={width - 1}
          y1="0"
          y2="50"
          stroke="black"
          stroke-width="1px"
        />
        <line
          x1="0"
          x2={width - 1}
          y1={height}
          y2="50"
          stroke="black"
          stroke-width="1px"
        />
      {:else if right}
        <line x1="1" x2="1" y1="0" y2="50" stroke="black" stroke-width="1px" />
        <line
          x1="1"
          x2={width}
          y1={50}
          y2={height}
          stroke="black"
          stroke-width="1px"
        />
      {/if}
    </svg>
  </div>

  <div
    class="result-marker-text"
    style={right ? `padding-left: ${width}px` : `padding-right: ${width}px`}
  >
    <slot />
  </div>
</div>

<style>
  .result-marker-wrapper {
    display: inline-block;
    position: absolute;
    z-index: 1;
  }

  .result-marker {
    width: 100%;
  }
</style>
