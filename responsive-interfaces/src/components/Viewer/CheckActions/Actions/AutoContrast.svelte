<script>
  import { getContext } from "svelte";

  import FilterCheckbox from "../FilterCheckbox.svelte";

  const filters = getContext("filters");
</script>

<FilterCheckbox
  label="Auto Contrast"
  id="auto-contrast"
  checked={$filters.contrast.active}
  on:checked={() => filters.setFilter("contrast", true)}
  on:unchecked={() => filters.setFilter("contrast", false)}
/>
