<script>
	import { createEventDispatcher } from 'svelte';

	export let project3D = false;

	const dispatch = createEventDispatcher();

	const onChange = (e) => {
		if (e.target.value === 'cylindrical') dispatch('change', true);
		else dispatch('change', false);
	};
</script>

<div class="projection-control">
	<label for="projection">Projection</label>
	<select id="projection" on:change={onChange}>
		<option value="cylindrical" selected={project3D}>Cylindrical</option>
		<option value="flat" selected={!project3D}>Flat</option>
	</select>
</div>

<style>
	.projection-control {
		position: absolute;
		bottom: 10px;
		left: 10px;
	}

	select {
		font-size: var(--font-medium);
		padding: 10px;
		background-color: var(--primary-color);
		border: 1px solid var(--mid-grey);
		border-radius: var(--controls-border-radius);
	}
</style>
