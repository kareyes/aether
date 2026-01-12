<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FileInput from "../file-input.svelte";
	import FileInputDragDrop from "../file-input-drag-drop.svelte";
	import FileInputRegular from "../file-input-regular.svelte";
	import FileInputButton from "../file-input-button.svelte";
	import * as Field from '$core/components/ui/field';
	import { Button } from '$core/components/ui/button';

	const { Story } = defineMeta({
		title: 'Components/FileInput',
		component: FileInput,
		tags: ['autodocs'],
		argTypes: {
			// Mode selection
			mode: {
				control: { type: 'select' },
				options: ['drag-drop', 'regular', 'button-only'],
				description: 'File input UI mode',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'drag-drop' },
				},
			},
			
			// Common props
			disabled: {
				control: { type: 'boolean' },
				description: 'Whether the file input is disabled',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' },
				},
			},
			multiple: {
				control: { type: 'boolean' },
				description: 'Allow multiple file selection',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'false' },
				},
			},
			
			// Validation props
			'validation.maxFiles': {
				control: { type: 'number' },
				description: 'Maximum number of files allowed',
				table: {
					type: { summary: 'number' },
					defaultValue: { summary: 'undefined (unlimited)' },
				},
			},
			'validation.maxSize': {
				control: { type: 'number' },
				description: 'Maximum file size in bytes',
				table: {
					type: { summary: 'number' },
					defaultValue: { summary: 'undefined (no limit)' },
				},
			},
			'validation.acceptedTypes': {
				control: { type: 'object' },
				description: 'Array of accepted file types',
				table: {
					type: { summary: 'string[]' },
					defaultValue: { summary: 'undefined (all types)' },
				},
			},
			
			// Drag-drop specific props
			'dragDropProps.label': {
				control: { type: 'text' },
				description: 'Main label for drag-drop area',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'Drop files here or click to browse' },
				},
			},
			'dragDropProps.description': {
				control: { type: 'text' },
				description: 'Description text for drag-drop area',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: '' },
				},
			},
			'dragDropProps.showFileList': {
				control: { type: 'boolean' },
				description: 'Show selected files in drag-drop mode',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'true' },
				},
			},
			
			// Regular input specific props
			'regularProps.label': {
				control: { type: 'text' },
				description: 'Label for regular input',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: '' },
				},
			},
			'regularProps.placeholder': {
				control: { type: 'text' },
				description: 'Placeholder text for regular input',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'Choose files...' },
				},
			},
			'regularProps.showFileCount': {
				control: { type: 'boolean' },
				description: 'Show file count in regular mode',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'true' },
				},
			},
			'regularProps.showFileList': {
				control: { type: 'boolean' },
				description: 'Show file list in regular mode',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'true' },
				},
			},
			
			// Button specific props
			'buttonProps.buttonText': {
				control: { type: 'text' },
				description: 'Text for the button',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'Choose Files' },
				},
			},
			'buttonProps.variant': {
				control: { type: 'select' },
				options: ['default', 'filled', 'ghost'],
				description: 'Button variant',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'default' },
				},
			},
			'buttonProps.size': {
				control: { type: 'select' },
				options: ['sm', 'default', 'lg'],
				description: 'Button size',
				table: {
					type: { summary: 'string' },
					defaultValue: { summary: 'default' },
				},
			},
			'buttonProps.showCount': {
				control: { type: 'boolean' },
				description: 'Show file count in button text',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'true' },
				},
			},
			'buttonProps.showFileList': {
				control: { type: 'boolean' },
				description: 'Show file list below button',
				table: {
					type: { summary: 'boolean' },
					defaultValue: { summary: 'true' },
				},
			},
			
			// Hide internal props from controls
			class: {
				control: false,
				table: { disable: true },
			},
			id: {
				control: false,
				table: { disable: true },
			},
			name: {
				control: false,
				table: { disable: true },
			},
			files: {
				control: false,
				table: { disable: true },
			},
			onFilesChange: {
				control: false,
				table: { disable: true },
			},
			onError: {
				control: false,
				table: { disable: true },
			},
		},
		
		args: {
			mode: 'drag-drop',
			disabled: false,
			multiple: true,
			validation: {},
		},
		
		parameters: {
			layout: 'centered',
			docs: {
				extractArgTypes: false,
			},
		},
	});

	// Shared validation examples
	const imageValidation = {
		acceptedTypes: ['image/*'],
		maxSize: 5 * 1024 * 1024 // 5MB
	};
	
	const documentValidation = {
		acceptedTypes: ['.pdf', '.doc', '.docx', '.txt'],
		maxFiles: 3
	};
	
	const singleFileValidation = {
		maxFiles: 1
	};
</script>


<!-- Basic Mode Examples -->
<Story name="Drag & Drop Mode" args={{ mode: 'drag-drop', description: '',
				showFileList: true }} />

<Story name="Regular Input Mode" args={{ 
	mode: 'regular',
	regularProps: {
		label: 'Upload Files',
		placeholder: 'Select your files...',
		showFileCount: true,
		showFileList: true
	}
}} />

<Story name="Button Only Mode" args={{ 
	mode: 'button-only',
	buttonProps: {
		buttonText: 'Upload Files',
		variant: 'default',
		size: 'default',
		showCount: true,
		showFileList: true
	}
}} />



<Story name="Drag Drop - Images Only" args={{ 
	mode: 'drag-drop',
	validation: imageValidation,
	dragDropProps: {
		label: 'Drop images here or click to browse',
		description: 'PNG, JPG, GIF up to 5MB',
		showFileList: true
	}
}} />

<Story name="Drag Drop - Single File" args={{ 
	mode: 'drag-drop',
	validation: singleFileValidation,
	multiple: false,
	dragDropProps: {
		label: 'Drop a single file here',
		description: 'Only one file allowed',
		showFileList: true
	}
}} />

<Story name="Drag Drop - Documents" args={{ 
	mode: 'drag-drop',
	validation: documentValidation,
	dragDropProps: {
		label: 'Drop documents here',
		description: 'PDF, DOC, DOCX, TXT files (max 3)',
		showFileList: true
	}
}} />

<Story name="Drag Drop - No File List" args={{ 
	mode: 'drag-drop',
	dragDropProps: {
		label: 'Drop files here or click to browse',
		description: 'Files will be processed immediately',
		showFileList: false
	}
}} />



<Story name="Regular - With Label" args={{ 
	mode: 'regular',
	regularProps: {
		label: 'Project Files',
		placeholder: 'Choose project files...',
		showFileCount: true,
		showFileList: true
	}
}} />

<Story name="Regular - Images Only" args={{ 
	mode: 'regular',
	validation: imageValidation,
	regularProps: {
		label: 'Profile Photos',
		placeholder: 'Choose images...',
		showFileCount: false,
		showFileList: true
	}
}} />

<Story name="Regular - Single Document" args={{ 
	mode: 'regular',
	validation: { ...singleFileValidation, acceptedTypes: ['.pdf'] },
	multiple: false,
	regularProps: {
		label: 'Upload Resume',
		placeholder: 'Choose PDF file...',
		showFileCount: true,
		showFileList: false
	}
}} />

<Story name="Regular - Required Field" args={{ 
	mode: 'regular',
	required: true,
	regularProps: {
		label: 'Required Documents',
		placeholder: 'Select required files...',
		showFileCount: true,
		showFileList: true
	}
}} />



<Story name="Button - Default Variant" args={{ 
	mode: 'button-only',
	buttonProps: {
		buttonText: 'Choose Files',
		variant: 'default',
		size: 'default',
		showCount: true,
		showFileList: true
	}
}} />

<Story name="Button - Filled Variant" args={{ 
	mode: 'button-only',
	buttonProps: {
		buttonText: 'Upload Media',
		variant: 'filled',
		size: 'lg',
		showCount: true,
		showFileList: true
	}
}} />

<Story name="Button - Ghost Variant" args={{ 
	mode: 'button-only',
	buttonProps: {
		buttonText: 'Add Files',
		variant: 'ghost',
		size: 'sm',
		showCount: false,
		showFileList: true
	}
}} />

<Story name="Button - Avatar Upload" args={{ 
	mode: 'button-only',
	validation: { ...imageValidation, maxFiles: 1 },
	multiple: false,
	buttonProps: {
		buttonText: 'Upload Avatar',
		variant: 'filled',
		size: 'lg',
		showCount: false,
		showFileList: false
	}
}} />

<Story name="Button - Document Upload" args={{ 
	mode: 'button-only',
	validation: documentValidation,
	buttonProps: {
		buttonText: 'Upload Documents',
		variant: 'default',
		size: 'default',
		showCount: true,
		showFileList: true
	}
}} />



<Story name="Disabled State - Drag Drop" args={{ 
	mode: 'drag-drop',
	disabled: true,
	dragDropProps: {
		label: 'File upload is disabled',
		description: 'Please contact administrator',
		showFileList: true
	}
}} />

<Story name="Disabled State - Regular" args={{ 
	mode: 'regular',
	disabled: true,
	regularProps: {
		label: 'Upload Disabled',
		placeholder: 'Upload not available...',
		showFileCount: true,
		showFileList: true
	}
}} />

<Story name="Disabled State - Button" args={{ 
	mode: 'button-only',
	disabled: true,
	buttonProps: {
		buttonText: 'Upload Disabled',
		variant: 'ghost',
		size: 'default',
		showCount: true,
		showFileList: true
	}
}} />



<Story 
	name="FileInputDragDrop Component" 
	tags={['!autodocs']}
>
	<FileInputDragDrop 
		validation={imageValidation}
		label="Drop images here"
		description="PNG, JPG, GIF up to 5MB"
		multiple={true}
		onFilesChange={(files) => console.log('Files changed:', files)}
		onError={(error) => console.log('Error:', error)}
	/>
</Story>

<Story 
	name="FileInputRegular Component" 
	tags={['!autodocs']}
>
	<FileInputRegular 
		validation={documentValidation}
		label="Upload Documents"
		placeholder="Choose up to 3 files..."
		showFileCount={true}
		showFileList={true}
		multiple={true}
		onFilesChange={(files) => console.log('Files changed:', files)}
		onError={(error) => console.log('Error:', error)}
	/>
</Story>

<Story 
	name="FileInputButton Component" 
	tags={['!autodocs']}
>
	<FileInputButton 
		validation={singleFileValidation}
		buttonText="Upload Avatar"
		variant="filled"
		size="lg"
		showCount={false}
		showFileList={false}
		multiple={false}
		onFilesChange={(files) => console.log('Files changed:', files)}
		onError={(error) => console.log('Error:', error)}
	/>
</Story>

<!-- With Field Component -->
<Story name="Field with Basic FileInput">
	{#snippet template()}
		<Field.Field
			label="Upload Documents"
			description="Supported formats: PDF, DOC, DOCX (Max 5MB)"
		>
			<FileInput 
				validation={{
					maxFiles: 3,
					maxSize: 5 * 1024 * 1024,
					acceptedTypes: ['.pdf', '.doc', '.docx']
				}}
			/>
		</Field.Field>
	{/snippet}
</Story>

<Story name="Field with Image Upload">
	{#snippet template()}
		<Field.Field
			label="Profile Picture"
			description="Upload your profile photo (JPG, PNG)"
			required
		>
			<FileInput 
				mode="drag-drop"
				validation={{
					maxFiles: 1,
					maxSize: 2 * 1024 * 1024,
					acceptedTypes: ['image/*']
				}}
			/>
		</Field.Field>
	{/snippet}
</Story>

<Story name="Field with Regular Mode">
	{#snippet template()}
		<Field.Field
			label="Resume"
			description="Upload your resume in PDF format"
			required
		>
			<FileInput 
				mode="regular"
				validation={{
					maxFiles: 1,
					acceptedTypes: ['.pdf']
				}}
				regularProps={{
					placeholder: 'Choose PDF file...',
					
				}}
			/>
		</Field.Field>
	{/snippet}
</Story>


<Story name="Complete Upload Form with Field">
	{#snippet template()}
		<div class="w-full max-w-2xl">
			<Field.Set>
				<Field.Legend>Job Application</Field.Legend>
				<Field.Description>Upload your application documents</Field.Description>
				
				<Field.Separator />
				
				<Field.Group class="gap-6">
					<Field.Field
						label="Resume"
						description="Upload your resume (PDF only, max 5MB)"
						required
					>
						<FileInput 
							validation={{
								maxFiles: 1,
								maxSize: 5 * 1024 * 1024,
								acceptedTypes: ['.pdf']
							}}
						/>
					</Field.Field>
					
					<Field.Field
						label="Cover Letter"
						description="Upload your cover letter (PDF or DOC)"
						required
					>
						<FileInput 
							validation={{
								maxFiles: 1,
								maxSize: 3 * 1024 * 1024,
								acceptedTypes: ['.pdf', '.doc', '.docx']
							}}
						/>
					</Field.Field>
					
					<Field.Field
						label="Portfolio (Optional)"
						description="Upload portfolio samples (Images or PDFs, max 10MB total)"
					>
						<FileInput 
							validation={{
								maxFiles: 5,
								maxSize: 10 * 1024 * 1024,
								acceptedTypes: ['image/*', '.pdf']
							}}
						/>
					</Field.Field>
				</Field.Group>
				
				<div class="flex gap-4 pt-4">
					<Button type="submit">Submit Application</Button>
					<Button variant="outline" type="button">Save Draft</Button>
				</div>
			</Field.Set>
		</div>
	{/snippet}
</Story>

