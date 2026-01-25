<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const codeBlockVariants = tv({
		base: "relative rounded-lg border bg-muted/50 text-sm",
		variants: {
			variant: {
				default: "bg-muted/50 border-border",
				dark: "bg-zinc-950 border-zinc-800 text-zinc-100",
				light: "bg-zinc-50 border-zinc-200 text-zinc-900",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type CodeBlockVariant = VariantProps<typeof codeBlockVariants>["variant"];
</script>

<script lang="ts">
	import { cn } from "$lib/utils.js";
	import CopyIcon from "@lucide/svelte/icons/copy";
	import CheckIcon from "@lucide/svelte/icons/check";
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import { Button } from "$lib/components/ui/button/index.js";

	type Props = {
		/**
		 * The code to display
		 */
		code: string;
		/**
		 * Programming language for display label
		 */
		language?: string;
		/**
		 * Title/filename to display in the header
		 */
		title?: string;
		/**
		 * Show line numbers
		 */
		showLineNumbers?: boolean;
		/**
		 * Allow collapsing the code block
		 */
		collapsible?: boolean;
		/**
		 * Initial collapsed state (only if collapsible is true)
		 */
		collapsed?: boolean;
		/**
		 * Show copy button
		 */
		showCopyButton?: boolean;
		/**
		 * Maximum height before scrolling (e.g., "300px", "20rem")
		 */
		maxHeight?: string;
		/**
		 * Variant style
		 */
		variant?: CodeBlockVariant;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	};

	let {
		code,
		language,
		title,
		showLineNumbers = false,
		collapsible = false,
		collapsed = $bindable(false),
		showCopyButton = true,
		maxHeight,
		variant = "default",
		class: className,
	}: Props = $props();

	let copied = $state(false);

	const lines = $derived(code.split("\n"));
	const hasHeader = $derived(!!title || !!language || collapsible);

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	}

	function toggleCollapsed() {
		if (collapsible) {
			collapsed = !collapsed;
		}
	}
</script>

<div class={cn(codeBlockVariants({ variant }), className)}>
	{#if hasHeader}
		<div
			class={cn(
				"flex items-center justify-between gap-2 border-b px-4 py-2",
				variant === "dark" && "border-zinc-800",
				variant === "light" && "border-zinc-200",
				collapsible && "cursor-pointer select-none hover:bg-accent/50"
			)}
			onclick={collapsible ? toggleCollapsed : undefined}
			onkeydown={collapsible ? (e) => e.key === "Enter" && toggleCollapsed() : undefined}
			role={collapsible ? "button" : undefined}
			tabindex={collapsible ? 0 : undefined}
		>
			<div class="flex items-center gap-2">
				{#if collapsible}
					{#if collapsed}
						<ChevronRightIcon class="size-4 text-muted-foreground" />
					{:else}
						<ChevronDownIcon class="size-4 text-muted-foreground" />
					{/if}
				{/if}
				{#if title}
					<span class="font-medium">{title}</span>
				{/if}
				{#if language}
					<span
						class={cn(
							"rounded px-2 py-0.5 text-xs font-medium",
							variant === "dark"
								? "bg-zinc-800 text-zinc-400"
								: "bg-muted text-muted-foreground"
						)}
					>
						{language}
					</span>
				{/if}
			</div>
			{#if showCopyButton && !collapsed}
				<Button
					variant="ghost"
					size="icon-sm"
					class="size-7"
					onclick={(e) => {
						e.stopPropagation();
						copyToClipboard();
					}}
					aria-label={copied ? "Copied!" : "Copy code"}
				>
					{#if copied}
						<CheckIcon class="size-4 text-green-500" />
					{:else}
						<CopyIcon class="size-4" />
					{/if}
				</Button>
			{/if}
		</div>
	{/if}

	{#if !collapsed}
		<div
			class={cn("relative", !hasHeader && showCopyButton && "group")}
			style={maxHeight ? `max-height: ${maxHeight}; overflow: auto;` : undefined}
		>
			{#if !hasHeader && showCopyButton}
				<Button
					variant="ghost"
					size="icon-sm"
					class="absolute right-2 top-2 size-7 opacity-0 transition-opacity group-hover:opacity-100"
					onclick={copyToClipboard}
					aria-label={copied ? "Copied!" : "Copy code"}
				>
					{#if copied}
						<CheckIcon class="size-4 text-green-500" />
					{:else}
						<CopyIcon class="size-4" />
					{/if}
				</Button>
			{/if}
			<pre
				class={cn(
					"overflow-x-auto p-4",
					showLineNumbers && "pl-0"
				)}><code class="font-mono text-sm">{#if showLineNumbers}{#each lines as line, i}<span class="inline-block w-10 select-none pr-4 text-right text-muted-foreground">{i + 1}</span>{line}
{/each}{:else}{code}{/if}</code></pre>
		</div>
	{/if}
</div>
