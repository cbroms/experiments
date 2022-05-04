<script>
  import Thumbnail from "./Thumbnail.svelte";

  import { createEventDispatcher } from "svelte";

  export let images;
  export let selectedIndex;
  export let filters;

  const dispatch = createEventDispatcher();
</script>

<div class="thumbnail-list">
  {#each images as image, index}
    <Thumbnail
      src={image}
      selected={selectedIndex === index}
      {index}
      {filters}
      on:click={() => dispatch("thumbnailclick", { index })}
    />
  {/each}
</div>

<style>
  .thumbnail-list {
    flex-grow: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    gap: 10px;
  }

  @media (max-width: 690px) {
    .thumbnail-list {
      order: 2;
      flex-direction: row;
    }
  }
</style>
