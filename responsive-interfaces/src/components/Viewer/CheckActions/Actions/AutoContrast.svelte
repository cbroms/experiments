<script>
  import FilterCheckbox from "../FilterCheckbox.svelte";
</script>

<FilterCheckbox
  label="Auto Contrast"
  id="auto-contrast"
  filter="contrast(1.75)"
  on:addfilter
  on:removefilter
/>
