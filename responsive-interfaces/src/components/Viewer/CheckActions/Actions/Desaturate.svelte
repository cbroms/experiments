<script>
  import { getContext } from "svelte";

  import FilterCheckbox from "../FilterCheckbox.svelte";

  const filters = getContext("filters");
</script>

<FilterCheckbox
  label="Desaturate"
  id="desaturate"
  checked={$filters.desaturate.active}
  on:checked={() => filters.setFilter("desaturate", true)}
  on:unchecked={() => filters.setFilter("desaturate", false)}
/>
