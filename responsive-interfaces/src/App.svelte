<script>
  import Slider from "./components/Slider/Slider.svelte";
  import Results from "./components/Slider/Results.svelte";
  import Checkbox from "./components/Checkbox.svelte";
  import Button from "./components/Button.svelte";
  import Interaction from "./components/Interaction.svelte";
  let lagDuration = 100;

  let showResults = false;
  let showButton = false;
</script>

<div class="section">
  <Interaction mutation={lagDuration}>
    <Checkbox {lagDuration} />
  </Interaction>
  {#if showResults}
    <Results point={lagDuration} />
  {:else}
    <Slider
      on:change={(e) => (lagDuration = e.detail)}
      on:interact={() => (showButton = true)}
      max={800}
      value={lagDuration}
    />
    {#if showButton}
      <Button on:click={() => (showResults = true)}>Set point</Button>
    {/if}
  {/if}
</div>

<style>
  .section {
    max-width: 600px;
    width: 100%;
    margin: 6rem auto;
  }
</style>
