<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const tabsListVariants = tv({
		base: "inline-flex items-center justify-center p-[3px] w-fit",
		variants: {
			variant: {
				default: "bg-muted text-muted-foreground rounded-lg",
				underline: "bg-transparent border-b border-border gap-1 p-0",
				pills: "bg-muted/50 rounded-full gap-1",
				solid: "bg-card border border-border rounded-lg shadow-sm",
				segmented: "bg-muted rounded-lg gap-0.5"
			},
			size: {
				default: "h-9",
				sm: "h-8",
				lg: "h-10"
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default"
		}
	});

	export type TabsListVariant = VariantProps<typeof tabsListVariants>["variant"];
	export type TabsListSize = VariantProps<typeof tabsListVariants>["size"];
</script>

<script lang="ts">
	import { Tabs as TabsPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		variant = "default",
		size = "default",
		...restProps
	}: TabsPrimitive.ListProps & {
		variant?: TabsListVariant;
		size?: TabsListSize;
	} = $props();
</script>

<TabsPrimitive.List
	bind:ref
	data-slot="tabs-list"
	class={cn(tabsListVariants({ variant, size }), className)}
	{...restProps}
/>
