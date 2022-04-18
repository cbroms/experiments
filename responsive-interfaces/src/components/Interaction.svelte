<script>
  export let lag = null;
  export let drop = null;
  export let name = "Interaction";

  let changed = false;

  $: {
    if (drop !== null) {
      changed = true;
      setTimeout(() => {
        changed = false;
      }, 300);
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
    color: var(--color);
    border: 1px solid;
    border-radius: var(--border-radius);
    background-color: var(--background);
  }

  .interaction {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 4rem 2rem;
    color: var(--interaction-color);
    background-color: var(--interaction-background);
    transition: background-color 0.3s;
    border-radius: var(--border-radius);
    border: 1px solid var(--interaction-background-alt);
  }

  .interaction.changed {
    background-color: var(--interaction-background-alt);
  }
</style>
