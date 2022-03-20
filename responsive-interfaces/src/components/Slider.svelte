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

<div>
  <input type="range" {min} {max} {value} on:change={onChange} />
</div>
