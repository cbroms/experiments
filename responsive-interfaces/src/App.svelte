<script>
  import Slider from "./components/Slider.svelte";
  import Checkbox from "./components/Checkbox.svelte";

  let lagDuration = 0;
</script>

<main>
  <Slider on:change={(e) => (lagDuration = e.detail)} />
  <Checkbox {lagDuration} />

  <div>
    Lagging for {lagDuration}ms
  </div>
</main>

<style>
</style>
