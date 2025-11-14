<script lang="ts">
	import { cn } from "$core/utils.js";
	import { inputVariants } from './utils/input-variants.js';
	import { useMaskedInput } from './utils/input-hooks.js';
	import type { InputProps } from './utils/input-types.js';

	let {
		ref = $bindable(null),
		value = $bindable(),
		type,
		variant = "default",
		size = "default",
		mask,
		class: className,
		"data-slot": dataSlot = "input",
		...restProps
	}: InputProps = $props();

	const classes = $derived(inputVariants({ variant, size }));
	const { handleInput, getPlaceholder } = useMaskedInput(mask);

	// Handle masked input events
	function onInput(event: Event) {
		handleInput(event, (newValue) => {
			value = newValue;
		});
	}

	// Get placeholder - use mask placeholder if available
	const placeholderText = $derived(() => getPlaceholder(restProps.placeholder || undefined));
</script>

<input
	bind:this={ref}
	data-slot={dataSlot}
	class={cn(classes, className)}
	{type}
	bind:value
	placeholder={placeholderText()}
	oninput={onInput}
	{...restProps}
/>
