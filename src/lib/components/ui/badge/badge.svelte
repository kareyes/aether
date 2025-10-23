<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$core/utils.js";

	export const badgeVariants = tv({
		base: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-medium transition-all focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3",
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground border-transparent",
				secondary: "bg-secondary text-secondary-foreground border-transparent",
				destructive: "bg-destructive text-destructive-foreground focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 border-transparent",
				outline: "text-foreground border-border",
				ghost: "text-foreground",
				success: "bg-green-600 text-white border-transparent dark:bg-green-700",
				warning: "bg-yellow-600 text-white border-transparent dark:bg-yellow-700",
				info: "bg-blue-600 text-white border-transparent dark:bg-blue-700",
			},
			color: {
				default: "",
				red: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
				orange: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800",
				yellow: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800",
				green: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
				blue: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
				purple: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800",
				pink: "bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/20 dark:text-pink-400 dark:border-pink-800",
				gray: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800",
			},
			size: {
				sm: "px-1.5 py-0.5 text-xs",
				default: "px-2 py-0.5 text-xs",
				lg: "px-2.5 py-1 text-sm",
			},
			clickable: {
				true: "cursor-pointer hover:bg-opacity-80 hover:scale-105",
				false: "",
			},
		},
		compoundVariants: [
			{
				variant: "default",
				clickable: true,
				class: "hover:bg-primary/90",
			},
			{
				variant: "secondary", 
				clickable: true,
				class: "hover:bg-secondary/90",
			},
			{
				variant: "destructive",
				clickable: true,
				class: "hover:bg-destructive/90",
			},
			{
				variant: "outline",
				clickable: true,
				class: "hover:bg-accent hover:text-accent-foreground",
			},
			{
				variant: "ghost",
				clickable: true,
				class: "hover:bg-accent hover:text-accent-foreground",
			},
		],
		defaultVariants: {
			variant: "default",
			color: "default",
			size: "default",
			clickable: false,
		},
	});

	export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];
	export type BadgeColor = VariantProps<typeof badgeVariants>["color"];
	export type BadgeSize = VariantProps<typeof badgeVariants>["size"];

	export type BadgeProps = WithElementRef<HTMLAnchorAttributes> &
		WithElementRef<HTMLButtonAttributes> & {
			variant?: BadgeVariant;
			color?: BadgeColor;
			size?: BadgeSize;
			text?: string;
			dismissable?: boolean;
			clickable?: boolean;
			href?: string;
			onclick?: () => void;
			onDismiss?: () => void;
		};
</script>

<script lang="ts">
	import XIcon from "@lucide/svelte/icons/x";

	let {
		ref = $bindable(null),
		href,
		class: className,
		variant = "default",
		color = "default",
		size = "default",
		text,
		dismissable = false,
		clickable = false,
		onclick,
		onDismiss,
		children,
		...restProps
	}: BadgeProps = $props();

	// Determine the element type
	const elementType = $derived(() => {
		if (href) return "a";
		if (clickable || dismissable) return "button";
		return "span";
	});

	// Handle dismiss action
	function handleDismiss(event: Event) {
		event.stopPropagation();
		onDismiss?.();
	}

	// Handle click action
	function handleClick(event: Event) {
		if (!href && onclick) {
			event.preventDefault();
			onclick();
		}
	}

	// Determine if badge should be clickable based on props
	const isClickable = $derived(clickable || !!onclick || !!href);
</script>

<svelte:element
	this={elementType()}
	bind:this={ref}
	data-slot="badge"
	{href}
	class={cn(
		badgeVariants({ 
			variant: color === "default" ? variant : "outline", 
			color, 
			size, 
			clickable: isClickable 
		}), 
		className
	)}
	onclick={handleClick}
	{...restProps}
>
	{#if text}
		<span>{text}</span>
	{/if}
	
	{#if children}
		{@render children?.()}
	{/if}
	
	{#if dismissable}
		<button
			type="button"
			class="ml-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-sm p-0.5 transition-colors"
			onclick={handleDismiss}
			aria-label="Dismiss"
		>
			<XIcon class="size-3" />
		</button>
	{/if}
</svelte:element>
