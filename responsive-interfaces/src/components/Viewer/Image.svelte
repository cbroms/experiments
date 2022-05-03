<script>
  export let src;
  export let filters = [];
</script>

<div class="image">
  <img {src} alt="primary page" style="filter: {filters.join(' ')};" />
</div>

<style>
  .image {
    order: 1;
    flex: 1 0 auto;
    display: flex;
    justify-content: center;
    padding: 10px 0;
  }

  img {
    object-fit: cover;
    height: auto;
    width: 90%;
    max-width: 550px;
  }
</style>
