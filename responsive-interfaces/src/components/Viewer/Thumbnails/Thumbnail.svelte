<script>
  import Image from "../Image.svelte";

  export let src;
  export let index;
  export let selected = false;
</script>

<div class="thumbnail" class:selected on:click>
  <Image {src} alt="page {index + 1}" height="85px" width="100px" />
</div>

<style>
  .thumbnail {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 5px;
    border-radius: 4px;
    border: 2px solid transparent;
  }

  .selected {
    border: 2px solid var(--ui-accent);
  }
  /* 
  img {
    object-fit: cover;
    height: 85px;
    width: 100px;
  } */
</style>
