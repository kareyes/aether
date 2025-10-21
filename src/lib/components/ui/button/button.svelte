<script lang="ts" module>
	import { cn, type WithElementRef } from "$core/utils.js";
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";
	import type { Component } from "svelte";
	import type { IconProps } from "@lucide/svelte";

	export const buttonVariants = tv({
		base: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
				destructive:
					"bg-destructive shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white",
				outline:
					"bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border",
				secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
				link: "text-primary underline-offset-4 hover:underline",
				bordered: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40 transition-colors",
				flat: "bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40 dark:bg-primary/20 dark:hover:bg-primary/30",
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
				lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
				icon: "size-9",
				"icon-sm": "size-8",
				"icon-lg": "size-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
	export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
			text?: string;
			icon?: Component<IconProps, {}, "">;
			iconPosition?: "left" | "right";
			loading?: boolean;
			loadingText?: string;
		};
</script>

<script lang="ts">
	import LoaderIcon from "@lucide/svelte/icons/loader";
	// import * as LucideIcons from "@lucide/svelte/icons";

	// LucideIcons.Plus;

	let {
		class: className,
		variant = "default",
		size = "default",
		ref = $bindable(null),
		href = undefined,
		type = "button",
		disabled,
		text,
		icon,
		iconPosition = "left",
		loading = false,
		loadingText = "Loading...",
		children,
		...restProps
	}: ButtonProps = $props();

	const isDisabled = $derived(disabled || loading);
	const displayText = $derived(loading ? loadingText : text);
	const displayIcon = $derived(loading ? LoaderIcon : icon);
	const buttonClass = $derived(cn(buttonVariants({ variant, size }), className));


	const commonProps = $derived({
		"data-slot": "button",
		class: buttonClass,
		...restProps
	});


	const anchorProps = $derived({
		href: isDisabled ? undefined : href,
		"aria-disabled": isDisabled,
		role: isDisabled ? "link" : undefined,
		tabindex: isDisabled ? -1 : undefined
	});
</script>


{#snippet iconSnippet(position: string)}
	{#if displayIcon && iconPosition === position}
		{@const IconComponent = displayIcon}
		<IconComponent class={cn("size-4", loading && "animate-spin")} />
	{/if}
{/snippet}


{#snippet contentSnippet()}
	{@render iconSnippet("left")}
	{#if displayText}
		<span>{displayText}</span>
	{/if}
	{#if children}
		{@render children?.()}
	{/if}
	{@render iconSnippet("right")}
{/snippet}


<svelte:element
	this={href ? "a" : "button"}
	bind:this={ref}
	{...commonProps}
	{...(href ? anchorProps : { type, disabled: isDisabled })}
>
	{@render contentSnippet()}
</svelte:element>
