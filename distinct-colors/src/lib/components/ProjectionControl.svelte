<script>
	import { createEventDispatcher } from 'svelte';

	export let interactiveId;
	export let project3D = false;

	let id;

	$: {
		if (interactiveId) {
			id = `projection-${interactiveId}`;
		}
	}

	const dispatch = createEventDispatcher();

	const onChange = (e) => {
		if (e.target.value === 'cylindrical') dispatch('change', true);
		else dispatch('change', false);
	};
</script>

<div class="projection-control">
	<label for={id}>Projection</label>
	<select {id} on:change={onChange}>
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
		/* -webkit-appearance: none; */
		margin: 5px 0;
		font-size: var(--font-medium);
		padding: 10px;
		background-color: var(--primary-color);
		border: 1px solid var(--mid-grey);
		border-radius: var(--controls-border-radius);
	}
</style>
