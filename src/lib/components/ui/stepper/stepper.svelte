<script lang="ts">
	import { setContext } from "svelte";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { stepperVariants, type StepperVariants } from "./stepper-variants.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		orientation = "horizontal",
		size = "default",
		variant = "default",
		activeStep = $bindable(0),
		clickable = false,
		onStepClick,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> &
		StepperVariants & {
			activeStep?: number;
			onStepClick?: (step: number) => void;
		} = $props();

	const variants = $derived(stepperVariants({ orientation, size, variant, clickable }));

	// Context for child components
	setContext("stepper", {
		get orientation() {
			return orientation;
		},
		get size() {
			return size;
		},
		get variant() {
			return variant;
		},
		get clickable() {
			return clickable;
		},
		get activeStep() {
			return activeStep;
		},
		get variants() {
			return variants;
		},
		handleStepClick: (step: number) => {
			if (clickable) {
				activeStep = step;
				onStepClick?.(step);
			}
		},
	});
</script>

<div
	bind:this={ref}
	data-slot="stepper"
	class={cn(variants.root(), className)}
	{...restProps}
>
	{@render children?.()}
</div>
