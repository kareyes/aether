<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import { getContext } from "svelte";
	import type { CalendarSize } from "./calendar.svelte";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CalendarPrimitive.GridProps = $props();

	const getSize = getContext<() => CalendarSize>("calendar-size");
	const size = $derived(getSize?.() ?? "default");
	const isFullSize = $derived(size === "full");
</script>

<CalendarPrimitive.Grid
	bind:ref
	class={cn(
		"flex w-full border-collapse flex-col",
		isFullSize ? "mt-0 gap-0 border rounded-lg overflow-hidden" : "mt-4 gap-1",
		className
	)}
	{...restProps}
/>
