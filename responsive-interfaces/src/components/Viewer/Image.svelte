<script>
  import { getContext } from "svelte";

  export let src;
  export let alt = "";
  export let height = null;
  export let width = null;

  export let full = false;

  const filters = getContext("filters");

  let filterString = "";

  $: {
    filterString = "";
    for (let filter in $filters) {
      if ($filters[filter].active) filterString += $filters[filter].css + " ";
    }
  }
</script>

<div class="image" class:full>
  <img
    class:full
    {src}
    {alt}
    style="filter: {filterString}; {height ? `height: ${height};` : ''} {width
      ? `width: ${width};`
      : ''}"
  />
</div>

<style>
  .image {
    order: 1;
    flex: 1 0 auto;
    display: flex;
    justify-content: center;
  }

  .image.full {
    flex: auto;
    height: 100%;
  }

  img {
    object-fit: cover;
    height: auto;
    width: 90%;
    max-width: 550px;
  }

  img.full {
    width: 100%;
    max-width: 100%;
  }
</style>
