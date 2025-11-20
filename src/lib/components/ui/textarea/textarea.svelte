<script lang="ts">
	import { cn } from "$core/utils.js";
	import { textareaVariants } from "./utils/textarea-variants.js";
	import { useAutoResize, getCharacterCount } from "./utils/textarea-hooks.js";
	import type { TextareaProps } from "./utils/textarea-types.js";

	let {
		ref = $bindable(null),
		value = $bindable(),
		variant = "default",
		size = "default",
		resize = "vertical",
		maxLength,
		showCount = false,
		autoResize = false,
		minRows,
		maxRows,
		class: className,
		"data-slot": dataSlot = "textarea",
		...restProps
	}: TextareaProps = $props();

	const classes = $derived(textareaVariants({ variant, size, resize: autoResize ? "none" : resize }));
	const characterCount = $derived(getCharacterCount(typeof value === 'string' ? value : undefined, maxLength));

	// Auto-resize effect
	let cleanup: (() => void) | undefined;
	$effect(() => {
		cleanup?.();
		cleanup = useAutoResize(ref as HTMLTextAreaElement | null, autoResize, minRows, maxRows);
		return () => cleanup?.();
	});
</script>

<div class="relative w-full">
	<textarea
		bind:this={ref}
		data-slot={dataSlot}
		class={cn(classes, showCount && maxLength && "pb-6", className)}
		bind:value
		maxlength={maxLength}
		{...restProps}
	></textarea>
	
	{#if showCount}
		<div class="pointer-events-none absolute bottom-2 right-3 text-xs text-muted-foreground">
			{characterCount}
		</div>
	{/if}
</div>
