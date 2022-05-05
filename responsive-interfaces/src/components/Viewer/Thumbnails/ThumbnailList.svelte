<script>
  import Thumbnail from "./Thumbnail.svelte";

  import { getContext } from "svelte";

  const images = getContext("images");
</script>

<div class="thumbnail-list">
  {#each $images.srcs as image, index}
    <Thumbnail
      src={image}
      selected={$images.active === index}
      {index}
      on:click={() => images.setActive(index)}
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
