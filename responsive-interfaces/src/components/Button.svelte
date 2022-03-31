<script>
  export let primary = false;
</script>

<button on:click class:primary>
  <slot />
</button>

<style>
  button {
    appearance: none;
    padding: 0.25rem 0.75rem;
    font-size: inherit;
    border-radius: var(--border-radius-interact);
    border: 1px solid;
    cursor: pointer;
    box-shadow: var(--shadow-interact);
    background-color: var(--secondary);
    transition: background-color 0.2s, box-shadow 0.2s;
  }

  button:hover {
    background-color: var(--secondary-hover);
    box-shadow: var(--shadow-interact-active);
  }

  button.primary {
    background-color: var(--primary);
  }

  button.primary:hover {
    background-color: var(--primary-hover);
  }
</style>
