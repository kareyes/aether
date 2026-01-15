<script lang="ts">
	import { getContext } from "svelte";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import type { StepState } from "./stepper-variants.js";

	let {
		ref = $bindable(null),
		class: className,
		completed = false,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		completed?: boolean;
	} = $props();

	const context = getContext<any>("stepper");
	const variants = $derived(context.variants);
	const state: StepState = $derived(completed ? "completed" : "inactive");
</script>

<div
	bind:this={ref}
	data-slot="stepper-separator"
	data-state={state}
	class={cn(variants.separator(), className)}
	{...restProps}
>
	<div class={variants.separatorLine()} data-state={state}></div>
</div>
