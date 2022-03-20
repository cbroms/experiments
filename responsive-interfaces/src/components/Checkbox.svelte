<script>
  export let lagDuration = 0;

  let lagging = false;
  let elt = null;

  $: {
    if (lagDuration !== undefined && elt) {
      // reset when the duration changes
      elt.checked = false;
    }
  }

  const onChange = (e) => {
    if (e.target.checked && !lagging) {
      // begin the lagging
      e.target.checked = false;
      lagging = true;

      setTimeout(() => {
        e.target.checked = true;
        lagging = false;
      }, lagDuration);
    }
  };
</script>

<div>
  <input bind:this={elt} type="checkbox" id="check" on:change={onChange} />
  <label for="check">Show the image</label>
</div>
