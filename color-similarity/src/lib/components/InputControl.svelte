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

<div class="control-wrapper">
	<label for={name}>{name}</label>
	<div class="slider-control">
		<input type="number" id={name} {max} {min} {value} {step} on:change={onChange} />
		{#if slider}
			<div class="divider" />
			<input type="range" {max} {min} {value} {step} on:input={onChange} />
		{/if}
	</div>
</div>

<style>
	.control-wrapper {
		margin: 20px 0;
	}

	.slider-control {
		margin: 5px 0;
		display: flex;
		border: 1px solid var(--mid-grey);
		border-radius: var(--controls-border-radius);
	}

	.divider {
		width: 1px;
		border-right: 1px solid var(--mid-grey);
	}

	input[type='number'] {
		-webkit-appearance: none;
		appearance: none;
		width: 78px;
		padding: 10px;
		font-size: var(--font-medium);
		border: none;
	}

	input[type='range'] {
		-webkit-appearance: none;
		padding: 10px;
		width: 100%;
	}

	input[type='range']::-webkit-slider-runnable-track {
		width: 100%;
		height: 2px;
		cursor: pointer;
		background: var(--dark-grey);
		border-radius: 25px;
		border: 0px solid #000101;
	}

	input[type='range']::-webkit-slider-thumb {
		border: none;
		height: 16px;
		width: 16px;
		border-radius: 50%;
		background: var(--dark-grey);
		cursor: pointer;
		-webkit-appearance: none;
	}

	input[type='range']:focus::-webkit-slider-runnable-track {
		background: var(--dark-grey);
	}

	input[type='range']::-moz-range-track {
		width: 100%;
		height: 2px;
		cursor: pointer;
		background: var(--dark-grey);
		border-radius: 25px;
		border: 0px solid #000101;
	}

	input[type='range']::-moz-range-thumb {
		border: none;
		height: 16px;
		width: 16px;
		border-radius: 50%;
		background: var(--dark-grey);
		cursor: pointer;
	}
</style>
