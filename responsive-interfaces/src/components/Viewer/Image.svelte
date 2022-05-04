<script>
  export let src;
  export let filters = [];
  export let alt = "";
  export let height = null;
  export let width = null;

  export let full = false;
</script>

<div class="image" class:full>
  <img
    class:full
    {src}
    {alt}
    style="filter: {filters.join(' ')}; {height
      ? `height: ${height};`
      : ''} {width ? `width: ${width};` : ''}"
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
