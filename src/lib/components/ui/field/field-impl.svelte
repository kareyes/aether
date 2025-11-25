<script lang="ts">
	import * as Field from "./index.js";
	import { Input } from "$core/components/ui/input/index.js";
	import { Textarea } from "$core/components/ui/textarea/index.js";
	import { Checkbox } from "$core/components/ui/checkbox/index.js";
	import { Switch } from "$core/components/ui/switch/index.js";
	import * as Select from "$core/components/ui/select/index.js";
	import type { FieldOrientation } from "./field.svelte";
	import type { Component } from "svelte";
	import type { InputVariant, InputSize, MaskType, MaskPattern } from "$core/components/ui/input/index.js";
	import type { TextareaVariant, TextareaSize, TextareaResize } from "$core/components/ui/textarea/index.js";
	import type { CheckboxVariant, CheckboxSize } from "$core/components/ui/checkbox/index.js";
	import type { SwitchVariant, SwitchSize } from "$core/components/ui/switch/index.js";

	type BaseFieldProps = {
		id: string;
		label: string;
		description?: string;
		error?: string;
		required?: boolean;
		disabled?: boolean;
		orientation?: FieldOrientation;
		class?: string;
	};

	type InputFieldProps = BaseFieldProps & {
		type: "input";
		inputType?: "text" | "email" | "password" | "number" | "tel" | "url";
		placeholder?: string;
		value?: string;
		mask?: MaskType | MaskPattern;
		variant?: InputVariant;
		size?: InputSize;
	};

	type TextareaFieldProps = BaseFieldProps & {
		type: "textarea";
		placeholder?: string;
		value?: string;
		rows?: number;
		variant?: TextareaVariant;
		size?: TextareaSize;
		resize?: TextareaResize;
		maxLength?: number;
		showCount?: boolean;
		autoResize?: boolean;
		minRows?: number;
		maxRows?: number;
	};

	type CheckboxFieldProps = BaseFieldProps & {
		type: "checkbox";
		checked?: boolean;
		variant?: CheckboxVariant;
		size?: CheckboxSize;
	};

	type SwitchFieldProps = BaseFieldProps & {
		type: "switch";
		checked?: boolean;
		variant?: SwitchVariant;
		size?: SwitchSize;
	};

	type SelectOption = {
		value: string;
		label: string;
	};

	type SelectFieldProps = BaseFieldProps & {
		type: "select";
		options: SelectOption[];
		value?: string;
		placeholder?: string;
	};

	type FieldImplProps =
		| InputFieldProps
		| TextareaFieldProps
		| CheckboxFieldProps
		| SwitchFieldProps
		| SelectFieldProps;

	let {
		id,
		label,
		description,
		error,
		required = false,
		disabled = false,
		orientation = "vertical",
		class: className,
		...restProps
	}: FieldImplProps = $props();

	const hasError = $derived(!!error);
	const isInvalid = $derived(hasError);

	// Determine if field should use horizontal layout with content wrapper
	const useContent = $derived(
		orientation === "horizontal" || (orientation === "responsive" && description)
	);
</script>

<Field.Field {orientation} data-invalid={isInvalid} data-disabled={disabled} class={className}>
	{#if restProps.type === "input"}
		{#if useContent}
			<Field.Content>
				<Field.Label for={id}>
					{label}
					{#if required}<span class="text-destructive">*</span>{/if}
				</Field.Label>
				{#if description && !hasError}
					<Field.Description>{description}</Field.Description>
				{/if}
			</Field.Content>
		{:else}
			<Field.Label for={id}>
				{label}
				{#if required}<span class="text-destructive">*</span>{/if}
			</Field.Label>
			{#if description && !hasError}
				<Field.Description>{description}</Field.Description>
			{/if}
		{/if}
		<Input
			{id}
			type={restProps.inputType || "text"}
			placeholder={restProps.placeholder}
			bind:value={restProps.value}
			mask={restProps.mask}
			variant={restProps.variant}
			size={restProps.size}
			{required}
			{disabled}
			aria-invalid={isInvalid}
		/>
		{#if hasError}
			<Field.Error>{error}</Field.Error>
		{/if}
	{:else if restProps.type === "textarea"}
		{#if useContent}
			<Field.Content>
				<Field.Label for={id}>
					{label}
					{#if required}<span class="text-destructive">*</span>{/if}
				</Field.Label>
				{#if description && !hasError}
					<Field.Description>{description}</Field.Description>
				{/if}
			</Field.Content>
		{:else}
			<Field.Label for={id}>
				{label}
				{#if required}<span class="text-destructive">*</span>{/if}
			</Field.Label>
			{#if description && !hasError}
				<Field.Description>{description}</Field.Description>
			{/if}
		{/if}
		<Textarea
			{id}
			placeholder={restProps.placeholder}
			bind:value={restProps.value}
			rows={restProps.rows}
			variant={restProps.variant}
			size={restProps.size}
			resize={restProps.resize}
			maxLength={restProps.maxLength}
			showCount={restProps.showCount}
			autoResize={restProps.autoResize}
			minRows={restProps.minRows}
			maxRows={restProps.maxRows}
			{required}
			{disabled}
			aria-invalid={isInvalid}
		/>
		{#if hasError}
			<Field.Error>{error}</Field.Error>
		{/if}
	{:else if restProps.type === "checkbox"}
		<Checkbox
			{id}
			bind:checked={restProps.checked}
			variant={restProps.variant}
			size={restProps.size}
			{disabled}
		/>
		{#if useContent}
			<Field.Content>
				<Field.Label for={id} class="font-normal">
					{label}
					{#if required}<span class="text-destructive">*</span>{/if}
				</Field.Label>
				{#if description && !hasError}
					<Field.Description>{description}</Field.Description>
				{/if}
			</Field.Content>
		{:else}
			<Field.Label for={id} class="font-normal">
				{label}
				{#if required}<span class="text-destructive">*</span>{/if}
			</Field.Label>
			{#if description && !hasError}
				<Field.Description>{description}</Field.Description>
			{/if}
		{/if}
		{#if hasError}
			<Field.Error>{error}</Field.Error>
		{/if}
	{:else if restProps.type === "switch"}
		{#if useContent}
			<Field.Content>
				<Field.Label for={id}>
					{label}
					{#if required}<span class="text-destructive">*</span>{/if}
				</Field.Label>
				{#if description && !hasError}
					<Field.Description>{description}</Field.Description>
				{/if}
			</Field.Content>
		{:else}
			<Field.Label for={id}>
				{label}
				{#if required}<span class="text-destructive">*</span>{/if}
			</Field.Label>
			{#if description && !hasError}
				<Field.Description>{description}</Field.Description>
			{/if}
		{/if}
		<Switch
			{id}
			bind:checked={restProps.checked}
			variant={restProps.variant}
			size={restProps.size}
			{disabled}
		/>
		{#if hasError}
			<Field.Error>{error}</Field.Error>
		{/if}
	{:else if restProps.type === "select"}
		{#if useContent}
			<Field.Content>
				<Field.Label for={id}>
					{label}
					{#if required}<span class="text-destructive">*</span>{/if}
				</Field.Label>
				{#if description && !hasError}
					<Field.Description>{description}</Field.Description>
				{/if}
			</Field.Content>
		{:else}
			<Field.Label for={id}>
				{label}
				{#if required}<span class="text-destructive">*</span>{/if}
			</Field.Label>
			{#if description && !hasError}
				<Field.Description>{description}</Field.Description>
			{/if}
		{/if}
		<Select.Root type="single" bind:value={restProps.value} {disabled}>
			<Select.Trigger {id} aria-invalid={isInvalid}>
				{#if restProps.value}
					{restProps.options.find((opt) => opt.value === restProps.value)?.label || restProps.placeholder || "Select..."}
				{:else}
					{restProps.placeholder || "Select..."}
				{/if}
			</Select.Trigger>
			<Select.Content>
				{#each restProps.options as option (option.value)}
					<Select.Item value={option.value}>{option.label}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
		{#if hasError}
			<Field.Error>{error}</Field.Error>
		{/if}
	{/if}
</Field.Field>
