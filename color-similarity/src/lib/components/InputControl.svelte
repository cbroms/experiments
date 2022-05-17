<script>
	import { createEventDispatcher } from 'svelte';

	export let name;
	export let max;
	export let min;
	export let step;
	export let value;

	export let slider = true;

	const dispatch = createEventDispatcher();

	const onChange = (e) => {
		dispatch('change', { value: parseFloat(e.target.value) });
	};
</script>

<div class="slider-control">
	<label for={name}>{name}</label>
	<input type="number" id={name} {max} {min} {value} {step} on:change={onChange} />
	{#if slider}
		<input type="range" {max} {min} {value} {step} on:input={onChange} />
	{/if}
</div>

<style>
	label {
		display: block;
	}

	input[type='number'] {
		width: 100px;
	}

	.slider-control {
		margin: 1rem 0;
	}
</style>
