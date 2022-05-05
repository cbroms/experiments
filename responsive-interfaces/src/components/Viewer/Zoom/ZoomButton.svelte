<script>
  import { createEventDispatcher, getContext } from "svelte";

  import Button from "../Button.svelte";

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
      }, $actions.zoom.lagDuration);
    } else {
      // we're already lagging, do nothing
    }
  };
</script>

<Button on:click={onClick}>View High Resolution Preview</Button>
