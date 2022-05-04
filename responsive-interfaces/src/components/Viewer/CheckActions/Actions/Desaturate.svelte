<script>
  import FilterCheckbox from "../FilterCheckbox.svelte";

  export let checked = false;
</script>

<FilterCheckbox
  label="Desaturate"
  id="desaturate"
  filter="grayscale(100%)"
  on:addfilter
  on:removefilter
  {checked}
/>
