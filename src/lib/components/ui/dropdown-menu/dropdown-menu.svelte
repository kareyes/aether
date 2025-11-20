<script lang="ts">
	import { Button, type ButtonProps } from "$lib/components/ui/button";
	import Content from "./dropdown-menu-content.svelte";
	import Item from "./dropdown-menu-item.svelte";
	import Separator from "./dropdown-menu-separator.svelte";
	import CheckboxItem from "./dropdown-menu-checkbox-item.svelte";
	import RadioGroup from "./dropdown-menu-radio-group.svelte";
	import RadioItem from "./dropdown-menu-radio-item.svelte";
	import Label from "./dropdown-menu-label.svelte";
	import Shortcut from "./dropdown-menu-shortcut.svelte";
	import SubTrigger from "./dropdown-menu-sub-trigger.svelte";
	import SubContent from "./dropdown-menu-sub-content.svelte";
	import { ChevronDown } from "@lucide/svelte";
	import type { Snippet } from "svelte";
	import * as DropdownMenuPrimitive from "./index"

	type DropdownItem = {
		type?: "item" | "separator" | "label" | "checkbox" | "radio" | "submenu";
		label?: string;
		value?: string;
		checked?: boolean;
		disabled?: boolean;
		onSelect?: () => void;
		shortcut?: string;
		variant?: "default" | "destructive";
		icon?: any;
		items?: DropdownItem[];
	};

	type DropdownGroup = {
		label?: string;
		items: DropdownItem[];
		type?: "radio";
		value?: string;
		onValueChange?: (value: string) => void;
	};

	interface Props {
		triggerText?: string;
		triggerVariant?: ButtonProps["variant"];
		triggerSize?: ButtonProps["size"];
		triggerIcon?: any;
		triggerClass?: string;
		showChevron?: boolean;
		align?: "start" | "center" | "end";
		side?: "top" | "right" | "bottom" | "left";
		sideOffset?: number;
		contentClass?: string;
		items?: (DropdownItem | DropdownGroup)[];
		trigger?: Snippet;
		open?: boolean;
	}

	let {
		triggerText = "Open",
		triggerVariant = "outline",
		triggerSize = "default",
		triggerIcon,
		triggerClass,
		showChevron = true,
		align = "start",
		side = "bottom",
		sideOffset = 4,
		contentClass,
		items = [],
		trigger,
		open = $bindable(false),
	}: Props = $props();

	const isGroup = (item: DropdownItem | DropdownGroup): item is DropdownGroup => 
		"items" in item && Array.isArray(item.items);
</script>

{#snippet renderIcon(icon: any)}
	{@const IconComponent = icon}
	<IconComponent class="size-4" />
{/snippet}

{#snippet renderShortcut(shortcut?: string)}
	{#if shortcut}
		<Shortcut>{shortcut}</Shortcut>
	{/if}
{/snippet}

{#snippet renderMenuItem(item: DropdownItem)}
	{#if item.type === "separator"}
		<Separator />
	{:else if item.type === "label"}
		<Label>{item.label}</Label>
	{:else if item.type === "checkbox"}
		<CheckboxItem
			checked={item.checked}
			disabled={item.disabled}
			onSelect={item.onSelect}
		>
			{item.label}
			{@render renderShortcut(item.shortcut)}
		</CheckboxItem>
	{:else if item.type === "submenu" && item.items}
		{@render renderSubmenu(item)}
	{:else}
		<Item
			variant={item.variant}
			disabled={item.disabled}
			onSelect={item.onSelect}
		>
			{#if item.icon}
				{@render renderIcon(item.icon)}
			{/if}
			{item.label}
			{@render renderShortcut(item.shortcut)}
		</Item>
	{/if}
{/snippet}

{#snippet renderSubmenu(item: DropdownItem)}
	<DropdownMenuPrimitive.Sub>
		<SubTrigger disabled={item.disabled}>
			{#if item.icon}
				{@render renderIcon(item.icon)}
			{/if}
			{item.label}
		</SubTrigger>
		<SubContent>
			{#each item.items || [] as subItem}
				{@render renderMenuItem(subItem)}
			{/each}
		</SubContent>
	</DropdownMenuPrimitive.Sub>
{/snippet}

<DropdownMenuPrimitive.Root bind:open>
	{#if trigger}
		{@render trigger()}
	{:else}
		<DropdownMenuPrimitive.Trigger>
			{#snippet child({ props })}
				<Button
					{...props}
					variant={triggerVariant}
					size={triggerSize}
					class={triggerClass}
					icon={triggerIcon}
				>
					{triggerText}
					{#if showChevron}
						<ChevronDown class="ml-1 size-4" />
					{/if}
				</Button>
			{/snippet}
		</DropdownMenuPrimitive.Trigger>
	{/if}

	<Content {align} {side} {sideOffset} class={contentClass}>
		{#each items as item}
			{#if isGroup(item)}
				{#if item.label}
					<Label>{item.label}</Label>
				{/if}
				
				{#if item.type === "radio"}
					<RadioGroup value={item.value} onValueChange={item.onValueChange}>
						{#each item.items as radioItem}
							<RadioItem value={radioItem.value || ""} disabled={radioItem.disabled}>
								{radioItem.label}
								{@render renderShortcut(radioItem.shortcut)}
							</RadioItem>
						{/each}
					</RadioGroup>
				{:else}
					{#each item.items as groupItem}
						{@render renderMenuItem(groupItem)}
					{/each}
				{/if}
			{:else}
				{@render renderMenuItem(item)}
			{/if}
		{/each}
	</Content>
</DropdownMenuPrimitive.Root>
