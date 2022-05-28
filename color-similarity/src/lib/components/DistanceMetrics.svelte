<script>
  export let distance;
</script>

<div class="metrics">
  <div>
    <div class="label">Avg Distance</div>
    <div class="metric">{distance.sum.toFixed(3)}</div>
  </div>

  <div>
    <div class="label">Min Distance</div>
    <div class="metric">{distance.min.toFixed(3)}</div>
  </div>
  <div>
    <div class="label">Max Distance</div>
    <div class="metric">{distance.max.toFixed(3)}</div>
  </div>
</div>

<!-- 

<div>Distance avg: {distance.sum.toFixed(2)}</div>
<div>Distance min: {distance.min.toFixed(2)}</div>
<div>Distance max: {distance.max.toFixed(2)}</div> -->
<style>
  .metrics {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
  }
</style>
