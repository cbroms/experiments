<script>
  import { getContext } from "svelte";

  import Checkbox from "./Checkbox.svelte";

  export let label;
  export let id;
  export let checked;

  const actions = getContext("actions");
</script>

<Checkbox
  {label}
  {id}
  on:checked
  on:unchecked
  {checked}
  lagDuration={$actions.filter.lagDuration}
/>
