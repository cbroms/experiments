<script>
  export let lag = null;
  export let name = "Interaction";

  let changed = false;

  $: {
    if (lag !== null) {
      changed = true;
      setTimeout(() => {
        changed = false;
      }, 200);
    }
  }
</script>

<fieldset class="interaction" class:changed>
  <legend>{name} &mdash; {lag}ms</legend>
  <slot />
</fieldset>

<style>
  legend {
    padding: 0.5rem;
    border: 1px solid;
    border-radius: var(--border-radius);
    background-color: var(--background);
  }
  .interaction {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 4rem 2rem;
    background-color: var(--background);
    transition: background-color 0.2s;
    border-radius: var(--border-radius);
    border: 1px solid;
  }

  .interaction.changed {
    background-color: #d3d3d380;
  }
</style>
