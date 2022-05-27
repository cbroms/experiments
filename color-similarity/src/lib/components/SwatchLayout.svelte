<script>
	export let title = 'Palette';
</script>

<div class="swatch-layout">
	<div class="palette-label">{title}</div>
	<slot />
</div>

<style>
	.swatch-layout {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
	}

	.palette-label {
		width: 100%;
		color: var(--mid-grey);
		font-size: var(--font-small);
		text-transform: uppercase;
		font-weight: bold;
	}
</style>
