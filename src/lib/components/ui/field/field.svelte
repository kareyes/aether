<script lang="ts">
	import Root from "./field-root.svelte";
	import Content from "./field-content.svelte";
	import Label from "./field-label.svelte";
	import Description from "./field-description.svelte";
	import Error from "./field-error.svelte";
	import type { FieldOrientation } from "./field-root.svelte";
	import type { Snippet } from "svelte";

	type FieldImplProps = {
		label: string;
		description?: string;
		error?: string;
		required?: boolean;
		disabled?: boolean;
		orientation?: FieldOrientation;
		class?: string;
		/**
		 * The form control to render (Input, Textarea, Checkbox, Switch, Select, etc.)
		 */
		children: Snippet;
		/**
		 * Optional snippet for rendering before the label in horizontal layouts
		 */
		beforeLabel?: Snippet;
	};

	let {
		label,
		description,
		error,
		required = false,
		disabled = false,
		orientation = "vertical",
		class: className,
		children,
		beforeLabel
	}: FieldImplProps = $props();

	const hasError = $derived(!!error);
	const isInvalid = $derived(hasError);

	// Determine if field should use horizontal layout with content wrapper
	const useContent = $derived(
		orientation === "horizontal" || (orientation === "responsive" && description)
	);
</script>

<Root {orientation} data-invalid={isInvalid} data-disabled={disabled} class={className}>
	{#if beforeLabel}
		{@render beforeLabel()}
	{/if}

	{#if useContent}
		<Content>
			<Label>
				{label}
				{#if required}<span class="text-destructive">*</span>{/if}
			</Label>
		{#if description && !hasError}
			<Description>{description}</Description>
		{/if}
	</Content>
	{:else}
		<Label>
			{label}
			{#if required}<span class="text-destructive">*</span>{/if}
		</Label>
		{#if description && !hasError}
			<Description>{description}</Description>
		{/if}
	{/if}

	{@render children()}

	{#if hasError}
		<Error>{error}</Error>
	{/if}
</Root>