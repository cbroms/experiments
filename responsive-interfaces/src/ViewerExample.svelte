<script>
  import Viewer from "./components/Viewer/Viewer.svelte";
  import { filters, actions, images } from "./store/viewers/1.js";

  import { setContext } from "svelte";

  setContext("filters", filters);
  setContext("actions", actions);
  setContext("images", images);
</script>

<Viewer />
