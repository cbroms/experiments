<script>
  import Toolbar from "./Toolbar.svelte";
  import Image from "./Image.svelte";
  import ThumbnailList from "./Thumbnails/ThumbnailList.svelte";
  import ZoomButton from "./ZoomButton/ZoomButton.svelte";
  import Desaturate from "./CheckActions/Actions/Desaturate.svelte";
  import AutoContrast from "./CheckActions/Actions/AutoContrast.svelte";

  let previewOpen = false;

  const images = ["images/shrooms1.jpeg", "images/shrooms2.jpeg"];
  let filters = [];
  let currentImageIndex = 0;

  const openPreview = () => {
    previewOpen = true;
  };

  const changeSelected = (e) => {
    currentImageIndex = e.detail.index;
  };

  const addFilter = (e) => {
    filters = [...filters, e.detail.filter];
  };

  const removeFilter = (e) => {
    filters = filters.filter((f) => {
      f !== e.detail.filter;
    });
  };
</script>

<div class="viewer">
  <Toolbar filename="shrooms.tiff">
    <div slot="left-action">
      <ZoomButton on:click={openPreview} />
    </div>
    <div class="actions" slot="right-action">
      <Desaturate on:addfilter={addFilter} on:removefilter={removeFilter} />
      <AutoContrast on:addfilter={addFilter} on:removefilter={removeFilter} />
    </div>
  </Toolbar>

  <div class="viewer-content">
    <ThumbnailList
      {images}
      {filters}
      selectedIndex={currentImageIndex}
      on:thumbnailclick={changeSelected}
    />
    <Image src={images[currentImageIndex]} {filters} />
  </div>
</div>

<style>
  .actions {
    display: flex;
    flex-direction: row;
    align-items: left;
    gap: 8px;
  }

  .viewer {
    background-color: var(--20pct-grey);
    position: relative;
  }

  .viewer-content {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  @media (max-width: 690px) {
    .viewer-content {
      flex-direction: column;
    }

    .actions {
      flex-direction: column;
    }
  }
</style>
