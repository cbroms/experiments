<script>
  import Slider from "./components/Slider/Slider.svelte";
  import Annotation from "./components/Slider/Annotation.svelte";
  import Checkbox from "./components/Checkbox.svelte";
  import Button from "./components/Button.svelte";
  import Interaction from "./components/Interaction.svelte";

  let lagDuration = 100;

  let showResults = false;
  let showButton = false;

  let average = null;
  let yourPoint = lagDuration;

  const submitPoint = () => {
    showResults = true;
    yourPoint = lagDuration;
    average = 300;
  };
</script>

<div class="section">
  <Interaction lag={lagDuration} name="Interaction 1">
    <Checkbox {lagDuration} />
  </Interaction>

  <Slider
    on:change={(e) => (lagDuration = e.detail)}
    on:interact={() => (showButton = true)}
    max={800}
    value={lagDuration}
  >
    <Annotation
      point={showResults ? yourPoint : lagDuration}
      {average}
      showAverage={showResults}
    />
  </Slider>

  {#if showButton && !showResults}
    <Button on:click={submitPoint}>
      Set point of lagginess at {lagDuration}ms
    </Button>
  {/if}
</div>

<style>
  .section {
    max-width: var(--section-width);
    width: 100%;
    margin: 6rem auto;
  }
</style>
