<script lang="ts">
	import { getContext } from "svelte";
	import { cn, type WithElementRef } from "$core/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import type { StepState } from "./stepper-variants.js";
	import { Check } from "@lucide/svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		step,
		label,
		description,
		icon,
		completed = false,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		step: number;
		label?: string;
		description?: string;
		icon?: Snippet;
		completed?: boolean;
	} = $props();

	const context = getContext<any>("stepper");
	const variants = $derived(context.variants);
	const orientation = $derived(context.orientation);

	const isActive = $derived(context.activeStep === step);
	const isCompleted = $derived(completed || context.activeStep > step);
	const state: StepState = $derived(isCompleted ? "completed" : isActive ? "active" : "inactive");

	function handleClick() {
		if (context.clickable) {
			context.handleStepClick(step);
		}
	}
</script>

<div
	bind:this={ref}
	data-slot="stepper-step"
	data-state={state}
	class={cn(variants.step(), className)}
	{...restProps}
>
	<button
		type="button"
		data-state={state}
		class={variants.stepButton()}
		disabled={!context.clickable}
		onclick={handleClick}
	>
		{#if isCompleted}
			<Check class="size-4" />
		{:else if icon}
			{@render icon()}
		{:else}
			{step + 1}
		{/if}
	</button>

	{#if label || description || children}
		<div class={variants.stepContent()}>
			{#if label}
				<div class={variants.stepLabel()} data-state={state}>
					{label}
				</div>
			{/if}
			{#if description}
				<div class={variants.stepDescription()} data-state={state}>
					{description}
				</div>
			{/if}
			{#if children}
				{@render children?.()}
			{/if}
		</div>
	{/if}
</div>
