<script>
  import Toolbar from "./Toolbar.svelte";
  import Image from "./Image.svelte";
  import ThumbnailList from "./Thumbnails/ThumbnailList.svelte";
  import Button from "./Button.svelte";
  import Desaturate from "./CheckActions/Actions/Desaturate.svelte";
  import AutoContrast from "./CheckActions/Actions/AutoContrast.svelte";
  import ZoomModal from "./Zoom/ZoomModal.svelte";

  export let height = 600;

  let previewOpen = false;

  const images = ["./images/shrooms1.jpeg", "./images/shrooms2.jpeg"];
  let filters = [];
  let enabledFilters = [];
  let currentImageIndex = 0;

  const openPreview = () => {
    previewOpen = true;
  };

  const closePreview = () => {
    previewOpen = false;
  };

  const changeSelected = (e) => {
    currentImageIndex = e.detail.index;
  };

  const addFilter = (e, type) => {
    filters = [...filters, e.detail.filter];
    enabledFilters = [...enabledFilters, type];
  };

  const removeFilter = (e, type) => {
    console.log(type);
    filters = [...filters].filter((f) => {
      return f !== e.detail.filter;
    });

    enabledFilters = [...enabledFilters].filter((f) => {
      return f !== type;
    });
  };
</script>

<div class="viewer" style="height: {height}px;">
  {#if previewOpen}
    <ZoomModal
      on:close={closePreview}
      src={images[currentImageIndex]}
      {filters}
    />
  {:else}
    <Toolbar filename="shrooms.tiff">
      <div slot="left">
        <Button on:click={openPreview}>View High Resolution Preview</Button>
      </div>
      <div class="actions" slot="right">
        <Desaturate
          checked={enabledFilters.includes("des")}
          on:addfilter={(e) => addFilter(e, "des")}
          on:removefilter={(e) => removeFilter(e, "des")}
        />
        <AutoContrast
          checked={enabledFilters.includes("con")}
          on:addfilter={(e) => addFilter(e, "con")}
          on:removefilter={(e) => removeFilter(e, "con")}
        />
      </div>
    </Toolbar>

    <div class="viewer-content">
      <ThumbnailList
        {images}
        {filters}
        selectedIndex={currentImageIndex}
        on:thumbnailclick={changeSelected}
      />
      <Image src={images[currentImageIndex]} {filters} alt="primary image" />
    </div>
  {/if}
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
    display: flex;
    flex-direction: column;
  }

  .viewer-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1 0 auto;
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
