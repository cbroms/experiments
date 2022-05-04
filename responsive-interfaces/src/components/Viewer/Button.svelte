<button on:click><slot /></button>

<style>
  button {
    cursor: pointer;

    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 2px 8px;
    background: var(--40pct-grey);
    border-radius: 2px;
    outline: none;
    border: none;
    color: var(--90pct-grey);
    transition: background 0.2s;
  }

  button:hover {
    background: var(--50pct-grey);
  }
</style>
