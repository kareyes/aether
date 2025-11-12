<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const selectVariants = tv({
		slots: {
			trigger: "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 shadow-xs flex w-fit select-none items-center justify-between gap-2 whitespace-nowrap rounded-md border bg-transparent px-3 py-2 text-sm outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
			content: "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 max-h-(--bits-select-content-available-height) origin-(--bits-select-content-transform-origin) relative z-50 min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border shadow-md data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
			viewport: "h-(--bits-select-anchor-height) min-w-(--bits-select-anchor-width) w-full scroll-my-1 p-1",
			item: "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground outline-hidden *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-2 pr-8 text-sm data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
			checkIcon: "absolute right-2 flex size-3.5 items-center justify-center",
			label: "text-muted-foreground px-2 py-1.5 text-xs",
			separator: "bg-border pointer-events-none -mx-1 my-1 h-px",
			group: "",
		},
		variants: {
			variant: {
				default: {
					trigger: "",
				},
				outline: {
					trigger: "border-2 bg-background hover:bg-accent hover:text-accent-foreground",
				},
				filled: {
					trigger: "bg-muted border-transparent hover:bg-muted/80",
				},
				ghost: {
					trigger: "border-transparent bg-transparent hover:bg-accent hover:text-accent-foreground",
				},
				underline: {
					trigger: "border-0 border-b-2 rounded-none px-0 focus-visible:border-b-primary",
				},
			},
			size: {
				sm: {
					trigger: "h-8 px-2 text-xs",
				},
				default: {
					trigger: "h-9 px-3 py-2 text-sm",
				},
				lg: {
					trigger: "h-10 px-4 text-base",
				},
			},
		},
		compoundVariants: [
			{
				variant: "underline",
				size: "sm",
				class: {
					trigger: "h-6",
				},
			},
			{
				variant: "underline", 
				size: "lg",
				class: {
					trigger: "h-12",
				},
			},
		],
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	});

	export type SelectVariant = VariantProps<typeof selectVariants>["variant"];
	export type SelectSize = VariantProps<typeof selectVariants>["size"];

	export interface SelectOption {
		value: string;
		label: string;
		disabled?: boolean;
	}

	export interface SelectOptionGroup {
		label?: string;
		options: SelectOption[];
	}
</script>

<script lang="ts">
	import { 
		SelectRoot, 
		SelectTrigger, 
		SelectContent, 
		SelectItem, 
		SelectLabel, 
		SelectSeparator 
	} from "./index.js";
	import Group from "./select-group.svelte";
	import { cn } from "$core/utils.js";

	interface BaseProps {
		ref?: HTMLElement | null;
		class?: string;
		placeholder?: string;
		options?: SelectOption[];
		groups?: SelectOptionGroup[];
		disabled?: boolean;
		required?: boolean;
		name?: string;
		size?: SelectSize;
		variant?: SelectVariant;
		contentClass?: string;
		triggerClass?: string;
		itemClass?: string;
		sideOffset?: number;
	}

	interface SingleSelectProps extends BaseProps {
		multiple?: false;
		value?: string;
		onSelectionChange?: (value: string | undefined) => void;
	}

	interface MultiSelectProps extends BaseProps {
		multiple: true;
		value?: string[];
		onSelectionChange?: (value: string[]) => void;
	}

	type SelectProps = SingleSelectProps | MultiSelectProps;

	let {
		ref = $bindable(null),
		class: className,
		placeholder = "Select an option...",
		options = [],
		groups = [],
		value = $bindable(undefined),
		multiple = false,
		disabled = false,
		required = false,
		name,
		size = "default",
		variant = "default",
		contentClass,
		triggerClass,
		itemClass,
		sideOffset = 4,
		onSelectionChange,
		...restProps
	}: SelectProps = $props();

	// Handle value changes
	$effect(() => {
		if (onSelectionChange) {
			onSelectionChange(value as any);
		}
	});

	// Get display value for trigger
	const displayValue = $derived(() => {
		if (!value) return placeholder;
		
		if (multiple && Array.isArray(value)) {
			if (value.length === 0) return placeholder;
			if (value.length === 1) {
				const option = findOptionByValue(value[0]);
				return option?.label || value[0];
			}
			return `${value.length} selected`;
		}
		
		const option = findOptionByValue(value as string);
		return option?.label || value;
	});

	function findOptionByValue(searchValue: string): SelectOption | undefined {
		// Search in direct options
		const directOption = options.find(opt => opt.value === searchValue);
		if (directOption) return directOption;

		// Search in groups
		for (const group of groups) {
			const groupOption = group.options.find(opt => opt.value === searchValue);
			if (groupOption) return groupOption;
		}
		
		return undefined;
	}
</script>

<SelectRoot
	bind:value={value as any}
	type={multiple ? "multiple" : "single"}
	{disabled}
	{required}
	{name}
	{...restProps}
>
	<SelectTrigger
		bind:ref
		{size}
		{variant}
		class={cn(triggerClass, className)}
	>
		{displayValue()}
	</SelectTrigger>

	<SelectContent
		{sideOffset}
		class={contentClass}
	>
		<!-- Direct Options -->
		{#each options as option (option.value)}
			<SelectItem
				value={option.value}
				disabled={option.disabled}
				class={itemClass}
			>
				{option.label}
			</SelectItem>
		{/each}

		<!-- Grouped Options -->
		{#each groups as group, groupIndex (groupIndex)}
			{#if groupIndex > 0 || options.length > 0}
				<SelectSeparator />
			{/if}
			
			{#if group.label}
				<SelectLabel>
					{group.label}
				</SelectLabel>
			{/if}

			<Group>
				{#each group.options as option (option.value)}
					<SelectItem
						value={option.value}
						disabled={option.disabled}
						class={itemClass}
					>
						{option.label}
					</SelectItem>
				{/each}
			</Group>
		{/each}
	</SelectContent>
</SelectRoot>