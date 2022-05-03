<script>
  import FilterCheckbox from "../FilterCheckbox.svelte";
</script>

<FilterCheckbox
  label="Desaturate"
  id="desaturate"
  filter="grayscale(100%)"
  on:addfilter
  on:removefilter
/>
