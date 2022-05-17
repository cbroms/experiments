<script>
	import { createEventDispatcher } from 'svelte';

	export let max;
	export let min;
	export let step;
	export let value;

	const dispatch = createEventDispatcher();

	const onChange = (e) => {
		dispatch('change', { value: parseFloat(e.target.value) });
	};
</script>

<div class="slider-control">
	<input type="number" {max} {min} {value} {step} on:change={onChange} />
	<input type="range" {max} {min} {value} {step} on:input={onChange} />
</div>
