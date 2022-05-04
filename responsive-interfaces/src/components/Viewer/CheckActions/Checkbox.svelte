<script>
  import { createEventDispatcher } from "svelte";

  export let lagDuration = 0;
  export let label;
  export let id;
  export let checked;

  let lagging = false;
  let elt = null;

  const dispatch = createEventDispatcher();

  // $: {
  //   if (lagDuration !== undefined && elt) {
  //     // reset when the duration changes
  //     elt.checked = false;
  //     dispatch("unchecked");
  //   }
  // }

  const onChange = (e) => {
    if (e.target.checked && !lagging) {
      // begin the lagging
      e.target.checked = false;
      lagging = true;
      setTimeout(() => {
        e.target.checked = true;
        dispatch("checked");
        lagging = false;
      }, lagDuration);
    } else if (!e.target.checked && !lagging) {
      e.target.checked = true;
      lagging = true;
      setTimeout(() => {
        e.target.checked = false;
        dispatch("unchecked");
        lagging = false;
      }, lagDuration);
    } else {
      // we're lagging, prevent the checkbox from changing
      e.target.checked = !e.target.checked;
    }
  };
</script>

<div class="checkbox-wrapper">
  <input bind:this={elt} type="checkbox" {id} on:change={onChange} {checked} />
  <label for={id}>{label}</label>
</div>

<style>
  .checkbox-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
  }

  input[type="checkbox"] {
    position: relative;
    width: 16px;
    height: 16px;
    background-color: var(--20pct-grey);
    border: 1px solid var(--40pct-grey);
    border-radius: 2px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: 0;
    margin: 0;
    flex-shrink: 0;
  }

  input[type="checkbox"]::before {
    position: absolute;
    content: "";
    display: block;
    top: 1px;
    left: 4px;
    width: 4px;
    height: 8px;
    border-style: solid;
    border-color: #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    opacity: 0;
  }

  input[type="checkbox"]:checked {
    color: var(--90pct-grey);
    border-color: var(--ui-accent);
    background: var(--ui-accent);
  }

  input[type="checkbox"]:checked::before {
    opacity: 1;
  }

  input,
  label {
    cursor: pointer;
    color: var(--90pct-grey);
  }

  label {
    padding-left: 4px;
    font-size: var(--text-sm);
  }
</style>
