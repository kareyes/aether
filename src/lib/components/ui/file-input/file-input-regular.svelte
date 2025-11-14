<script lang="ts">
	import { fileInputVariants } from './utils/file-input-variants.js';
	import { createFileInputHandlers, removeFileFromArray } from './utils/file-input-hooks.js';
	import { createAcceptAttribute } from './utils/file-input-utils.js';
	import type { RegularFileInputProps } from './utils/file-input-types.js';
	import { File as FileIcon } from '@lucide/svelte';

	let {
		files = $bindable(null),
		validation = {},
		onFilesChange,
		onError,
		disabled = false,
		class: className = '',
		id,
		name,
		multiple = false,
		accept,
		required = false,
		form,
		label,
		placeholder = 'Choose files...',
		showFileCount = true,
		showFileList = true,
		...restProps
	}: RegularFileInputProps = $props();

	let internalFiles = $state<File[]>([]);
	let currentState = $state<'default' | 'error' | 'disabled'>('default');
	let fileInputRef: HTMLInputElement;

	const fileHandlers = createFileInputHandlers(validation, { 
		onFilesChange: (newFiles) => {
			if (newFiles) {
				internalFiles = Array.from(newFiles);
			} else {
				internalFiles = [];
			}
			onFilesChange?.(newFiles);
		}, 
		onError: (error) => {
			onError?.(error);
			currentState = "error";
			setTimeout(() => { 
				currentState = disabled ? "disabled" : "default"; 
			}, 3000);
		}
	});

	// Sync external files with internal state
	$effect(() => {
		if (files) {
			internalFiles = Array.from(files);
		} else {
			internalFiles = [];
		}
	});

	// Update state based on disabled prop
	$effect(() => {
		currentState = disabled ? "disabled" : "default";
	});

	const acceptAttribute = accept || createAcceptAttribute(validation.acceptedTypes);

	const variants = $derived(fileInputVariants({
		variant: 'default',
		size: 'default',
		state: currentState
	}));

	const fileCount = $derived(internalFiles.length);
	const displayText = $derived(
		fileCount > 0 
			? showFileCount 
				? `${fileCount} file${fileCount !== 1 ? 's' : ''} selected`
				: internalFiles.map(f => f.name).join(', ')
			: placeholder
	);

	function removeFile(index: number) {
		internalFiles = removeFileFromArray(internalFiles, index, onFilesChange);
	}
</script>

<div class={variants.regularContainer({ class: className })}>
	{#if label}
		<label for={id} class="text-sm font-medium text-foreground">
			{label}
			{#if required}
				<span class="text-destructive ml-1">*</span>
			{/if}
		</label>
	{/if}

	<div>
		<input
			bind:this={fileInputRef}
			type="file"
			{id}
			{name}
			{multiple}
			accept={acceptAttribute}
			{required}
			{form}
			{disabled}
			class="sr-only"
			onchange={fileHandlers.handleInputChange}
			{...restProps}
		/>

		<button
			type="button"
			class={variants.regularInput()}
			onclick={() => fileInputRef?.click()}
			{disabled}
			aria-describedby={fileCount > 0 ? `${id}-files` : undefined}
		>
			<FileIcon class="h-5 w-5 text-muted-foreground mr-2" />
			<span class="flex-1 text-left truncate">
				{displayText}
			</span>
			<span class="text-xs text-muted-foreground ml-2">
				Browse
			</span>
		</button>
	</div>

	{#if showFileList && internalFiles.length > 0}
		<div class={variants.fileList()} id="{id}-files">
			{#each internalFiles as file, index}
				<div class={variants.fileItem()}>
					<div class="flex-1 min-w-0">
						<p class="text-sm font-medium text-foreground truncate">{file.name}</p>
						<p class="text-xs text-muted-foreground">
							{(file.size / 1024 / 1024).toFixed(2)} MB
						</p>
					</div>
					<button
						type="button"
						class={variants.removeButton()}
						onclick={() => removeFile(index)}
						aria-label="Remove {file.name}"
					>
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
						</svg>
					</button>
				</div>
			{/each}
		</div>
	{/if}
</div>