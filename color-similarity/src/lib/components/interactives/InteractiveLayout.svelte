<div class="map-wrapper">
	<div class="map-content">
		<slot name="map" />
	</div>
	<div class="map-controls">
		<slot name="controls" />
	</div>
</div>

<style>
	.map-wrapper {
		display: flex;
		gap: 40px;
		margin: 48px 0;
	}

	.map-content {
		height: auto;
		background-color: #f5f5f5;
		display: flex;
		justify-content: center;
		border-radius: 12px;
		background-clip: border-box;
		position: relative;
		display: flex;
		flex-flow: column;
	}

	.map-controls {
		max-width: 350px;
		width: 100%;
	}

	@media (max-width: 1100px) {
		.map-wrapper {
			flex-wrap: wrap;
		}
		.map-controls {
			max-width: 720px;
		}
	}
</style>
