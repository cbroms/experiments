<script>
	export let distance;
</script>

<div class="metrics">
	<div>
		<div class="metric-label">Avg Distance</div>
		<div class="metric">{distance.sum.toFixed(3)}</div>
	</div>

	<div>
		<div class="metric-label">Min Distance</div>
		<div class="metric">{distance.min.toFixed(3)}</div>
	</div>
	<div>
		<div class="metric-label">Max Distance</div>
		<div class="metric">{distance.max.toFixed(3)}</div>
	</div>
</div>

<!-- 

<div>Distance avg: {distance.sum.toFixed(2)}</div>
<div>Distance min: {distance.min.toFixed(2)}</div>
<div>Distance max: {distance.max.toFixed(2)}</div> -->
<style>
	.metric-label {
		color: var(--mid-grey);
		font-size: var(--font-small);
		text-transform: uppercase;
		font-weight: bold;
	}

	.metrics {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		margin-top: 20px;
	}
</style>
