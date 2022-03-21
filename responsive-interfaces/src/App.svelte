<script>
  import Slider from "./components/Slider/Slider.svelte";
  import Results from "./components/Slider/Results.svelte";
  import Checkbox from "./components/Checkbox.svelte";

  let lagDuration = 0;
</script>

<div class="section">
  <Results point={lagDuration} />
  <Slider on:change={(e) => (lagDuration = e.detail)} max={800} />
  <Checkbox {lagDuration} />

  <div>
    Lagging for {lagDuration}ms
  </div>
</div>

<style>
  .section {
    max-width: 600px;
    width: 100%;
    margin: 6rem auto;
  }
</style>
