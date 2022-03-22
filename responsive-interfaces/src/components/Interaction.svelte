<script>
  export let mutation;

  let changed = false;

  $: {
    if (mutation) {
      changed = true;
      setTimeout(() => {
        changed = false;
      }, 200);
    }
  }
</script>

<div class="interaction" class:changed>
  <slot />
</div>

<style>
  .interaction {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 4rem 2rem;
    background-color: white;
    transition: background-color 0.2s;
    border-radius: 8px;
  }

  .interaction.changed {
    background-color: #d3d3d380;
  }
</style>
