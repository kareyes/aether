<script lang="ts" module>
	import { Checkbox as CheckboxPrimitive } from "bits-ui";
	import CheckIcon from "@lucide/svelte/icons/check";
	import MinusIcon from "@lucide/svelte/icons/minus";
	import { cn, type WithoutChildrenOrChild } from "$core/utils.js";
	import { type VariantProps, tv } from "tailwind-variants";

	export const checkboxVariants = tv({
		base: "border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-xs peer flex shrink-0 items-center justify-center border outline-none transition-all focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
		variants: {
			size: {
				sm: "size-3 rounded-[3px]",
				default: "size-4 rounded-[4px]",
				lg: "size-5 rounded-[5px]",
				xl: "size-6 rounded-[6px]",
			},
			variant: {
				default: "",
				destructive: "data-[state=checked]:bg-destructive data-[state=checked]:border-destructive dark:data-[state=checked]:bg-destructive/80",
				success: "data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 dark:data-[state=checked]:bg-green-700",
				warning: "data-[state=checked]:bg-yellow-600 data-[state=checked]:border-yellow-600 dark:data-[state=checked]:bg-yellow-700",
			},
		},
		defaultVariants: {
			size: "default",
			variant: "default",
		},
	});

	export const checkboxIconVariants = tv({
		variants: {
			size: {
				sm: "size-2.5",
				default: "size-3.5",
				lg: "size-4",
				xl: "size-5",
			},
		},
		defaultVariants: {
			size: "default",
		},
	});

	export type CheckboxSize = VariantProps<typeof checkboxVariants>["size"];
	export type CheckboxVariant = VariantProps<typeof checkboxVariants>["variant"];

	export type CheckboxProps = WithoutChildrenOrChild<CheckboxPrimitive.RootProps> & {
		size?: CheckboxSize;
		variant?: CheckboxVariant;
		label?: string;
		description?: string;
		lineThrough?: boolean;
	};
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		checked = $bindable(false),
		indeterminate = $bindable(false),
		class: className,
		size = "default",
		variant = "default",
		label,
		description,
		lineThrough = false,
		...restProps
	}: CheckboxProps = $props();
</script>

<div class="flex gap-3 items-center-safe">
	<CheckboxPrimitive.Root
		bind:ref
		data-slot="checkbox"
		class={cn(checkboxVariants({ size, variant }), className)}
		bind:checked
		bind:indeterminate
		{...restProps}
	>
		{#snippet children({ checked, indeterminate })}
			<div data-slot="checkbox-indicator" class="text-current transition-none">
				{#if checked}
					<CheckIcon class={checkboxIconVariants({ size })} />
				{:else if indeterminate}
					<MinusIcon class={checkboxIconVariants({ size })} />
				{/if}
			</div>
		{/snippet}
	</CheckboxPrimitive.Root>

	{#if label || description}
		<div class="flex-1 space-y-1">
			{#if label}
				<label
					for={restProps.id}
					class={cn(
						"text-sm font-medium leading-none cursor-pointer transition-all",
						checked && lineThrough && "line-through text-muted-foreground",
						restProps.disabled && "cursor-not-allowed opacity-50"
					)}
				>
					{label}
				</label>
			{/if}
			{#if description}
				<p
					class={cn(
						"text-sm text-muted-foreground transition-all",
						checked && lineThrough && "line-through opacity-60",
						restProps.disabled && "opacity-50"
					)}
				>
					{description}
				</p>
			{/if}
		</div>
	{/if}
</div>
