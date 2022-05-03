<script>
  import File from "./Icons/File.svelte";

  export let filename;
</script>

<div class="toolbar">
  <div class="toolbar-left">
    <div class="toolbar-title">
      <div class="toolbar-icon">
        <File />
      </div>
      <div>{filename}</div>
    </div>
    <slot name="left-action" />
  </div>

  <div class="toolbar-right">
    <slot name="right-action" />
  </div>
</div>

<style>
  .toolbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 8px 15px;
    background-color: var(--30pct-grey);
    gap: 8px;
  }

  .toolbar-left {
    display: flex;
    flex-direction: row;
    align-items: left;
    padding: 0px;
    gap: 8px;
  }

  .toolbar-title {
    font-weight: bold;
    color: var(--80pct-grey);
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;

    flex: none;
    order: 0;
    flex-grow: 0;
  }

  .toolbar-icon {
    color: var(--70pct-grey);
    padding-right: 4px;
  }

  /* @media (max-width: 690px) {
    .toolbar-left {
      flex-direction: column;
    }
  } */
</style>
