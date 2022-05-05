<script>
  import { createEventDispatcher, getContext } from "svelte";

  import Image from "../Image.svelte";

  export let src;
  export let index;
  export let selected = false;

  let lagging = false;

  const dispatch = createEventDispatcher();
  const actions = getContext("actions");

  const onClick = (e) => {
    if (!lagging) {
      // begin the lagging
      lagging = true;
      setTimeout(() => {
        dispatch("click");
        lagging = false;
      }, $actions.switch.lagDuration);
    } else {
      // we're already lagging, do nothing
    }
  };
</script>

<div class="thumbnail" class:selected on:click={onClick}>
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
