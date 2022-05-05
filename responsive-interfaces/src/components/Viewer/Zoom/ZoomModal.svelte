<script>
  import Toolbar from "../Toolbar.svelte";
  import Close from "../Icons/Close.svelte";
  import Button from "../Button.svelte";
  import ImageComponent from "../Image.svelte";
  import { createEventDispatcher } from "svelte";

  export let src;

  const dispatch = createEventDispatcher();

  let imageSrc = null;

  const onClose = () => {
    dispatch("close");
  };

  $: {
    if (src) {
      const img = new Image();
      img.src = src;
      imageSrc = img.src;
    }
  }
</script>

<div class="zoom-modal">
  <Toolbar>
    <div class="modal-title" slot="left">High Resolution Preview</div>
    <div slot="right">
      <Button on:click={onClose}>
        <Close />
      </Button>
    </div>
  </Toolbar>
  <div class="modal-content">
    <ImageComponent src={imageSrc} full alt="primary image" />
  </div>
</div>

<style>
  .zoom-modal {
    height: calc(100% - 36px);
    color: var(--90pct-grey);
    display: flex;
    flex-direction: column;
  }

  .modal-title {
    font-weight: bold;
  }

  .modal-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    /* flex: 1 0 auto; */
    height: 100%;
  }
</style>
