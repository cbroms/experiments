<script>
  import Viewer from "./components/Viewer/Viewer.svelte";
  import { filters, actions, active } from "./store/viewers/1.js";

  import { setContext } from "svelte";

  setContext("filters", filters);
  setContext("actions", actions);
</script>

<Viewer />
