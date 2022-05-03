<script>
  import { createEventDispatcher } from "svelte";

  import Checkbox from "./Checkbox.svelte";

  export let label;
  export let id;
  export let filter;

  const dispatch = createEventDispatcher();

  const onCheck = () => {
    dispatch("addfilter", { filter });
  };

  const onUncheck = () => {
    dispatch("removefilter", { filter });
  };
</script>

<Checkbox {label} {id} on:checked={onCheck} on:unchecked={onUncheck} />
