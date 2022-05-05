<script>
  import Toolbar from "./Toolbar.svelte";
  import Image from "./Image.svelte";
  import ThumbnailList from "./Thumbnails/ThumbnailList.svelte";
  import ZoomButton from "./Zoom/ZoomButton.svelte";
  import Desaturate from "./CheckActions/Actions/Desaturate.svelte";
  import AutoContrast from "./CheckActions/Actions/AutoContrast.svelte";
  import ZoomModal from "./Zoom/ZoomModal.svelte";
  import { getContext } from "svelte";

  export let height = 600;

  let previewOpen = false;

  const images = getContext("images");

  const openPreview = () => {
    previewOpen = true;
  };

  const closePreview = () => {
    previewOpen = false;
  };
</script>

<div class="viewer" style="height: {height}px;">
  {#if previewOpen}
    <ZoomModal on:close={closePreview} />
  {:else}
    <Toolbar filename="shrooms.tiff">
      <div slot="left">
        <ZoomButton on:click={openPreview} />
      </div>
      <div class="actions" slot="right">
        <Desaturate />
        <AutoContrast />
      </div>
    </Toolbar>
    <div class="viewer-content">
      <ThumbnailList />
      <Image src={$images.srcs[$images.active]} alt="primary image" />
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
