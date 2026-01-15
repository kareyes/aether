<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Toaster, toast } from '../index';
	import type { ToasterPosition } from '../index';
	
	type Args = {
		position: ToasterPosition;
		expand: boolean;
		richColors: boolean;
		closeButton: boolean;
		duration: number;
		visibleToasts: number;
	};
	
	const { Story } = defineMeta({
		title: 'Components/Sonner',
		tags: ['autodocs'],
		argTypes: {
			position: {
				control: 'select',
				options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
				description: 'Toast position on screen',
			},
			expand: {
				control: 'boolean',
				description: 'Expand toasts on hover',
			},
			richColors: {
				control: 'boolean',
				description: 'Enable rich colors for variants',
			},
			closeButton: {
				control: 'boolean',
				description: 'Show close button on toasts',
			},
			duration: {
				control: { type: 'number', min: 0, max: 10000, step: 500 },
				description: 'Auto-dismiss duration in ms',
			},
			visibleToasts: {
				control: { type: 'number', min: 1, max: 10 },
				description: 'Maximum visible toasts',
			},
		},
	});
</script>

<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

{#snippet template(args: Args)}
	<Toaster {...args} />
	<div class="flex flex-wrap gap-2">
		<Button onclick={() => toast('Default toast notification')}>
			Default
		</Button>
		<Button color="success" onclick={() => toast.success('Operation completed successfully!')}>
			Success
		</Button>
		<Button color="danger" onclick={() => toast.error('Something went wrong!')}>
			Error
		</Button>
		<Button color="warning" onclick={() => toast.warning('Please review your input')}>
			Warning
		</Button>
		<Button color="info" onclick={() => toast.info('Here is some information')}>
			Info
		</Button>
	</div>
{/snippet}

<Story name="Default" {template} args={{ 
	position: "bottom-right",
	expand: false,
	richColors: true,
	closeButton: false,
	duration: 4000,
	visibleToasts: 3
}} />

<!-- Toast Types -->
<Story name="Success Toast">
	{#snippet template(args: Args)}
		<Toaster richColors />
		<Button color="success" onclick={() => toast.success('File uploaded successfully!', {
			description: 'Your file has been saved to the cloud.'
		})}>
			Show Success Toast
		</Button>
	{/snippet}
</Story>

<Story name="Error Toast">
	{#snippet template(args: Args)}
		<Toaster richColors />
		<Button color="danger" onclick={() => toast.error('Failed to save changes', {
			description: 'Please check your connection and try again.'
		})}>
			Show Error Toast
		</Button>
	{/snippet}
</Story>

<Story name="Warning Toast">
	{#snippet template(args: Args)}
		<Toaster richColors />
		<Button color="warning" onclick={() => toast.warning('Low storage space', {
			description: 'You are using 95% of your available storage.'
		})}>
			Show Warning Toast
		</Button>
	{/snippet}
</Story>

<Story name="Info Toast">
	{#snippet template(args: Args)}
		<Toaster richColors />
		<Button color="info" onclick={() => toast.info('New update available', {
			description: 'Version 2.0.0 is ready to install.'
		})}>
			Show Info Toast
		</Button>
	{/snippet}
</Story>

<Story name="Loading Toast">
	{#snippet template(args: Args)}
		<Toaster richColors />
		<Button onclick={() => {
			const id = toast.loading('Processing your request...');
			setTimeout(() => {
				toast.dismiss(id);
				toast.success('Request completed!');
			}, 2000);
		}}>
			Show Loading Toast
		</Button>
	{/snippet}
</Story>

<!-- With Actions -->
<Story name="With Action Button">
	{#snippet template(args: Args)}
		<Toaster richColors closeButton />
		<Button onclick={() => toast.success('Event created', {
			description: 'Your event has been scheduled.',
			action: {
				label: 'View',
				onClick: () => console.log('Viewing event')
			}
		})}>
			Toast with Action
		</Button>
	{/snippet}
</Story>

<Story name="With Action and Cancel">
	{#snippet template(args: Args)}
		<Toaster richColors />
		<Button color="danger" onclick={() => toast.error('Delete this item?', {
			description: 'This action cannot be undone.',
			action: {
				label: 'Delete',
				onClick: () => toast.success('Item deleted')
			},
			cancel: {
				label: 'Cancel',
				onClick: () => console.log('Cancelled')
			}
		})}>
			Toast with Action & Cancel
		</Button>
	{/snippet}
</Story>

<!-- Promise Toast -->
<Story name="Promise Toast">
	{#snippet template(args: Args)}
		<Toaster richColors />
		<Button onclick={() => {
			const promise = new Promise((resolve, reject) => {
				setTimeout(() => {
					Math.random() > 0.3 ? resolve({ name: 'File.txt' }) : reject(new Error('Network error'));
				}, 2000);
			});
			toast.promise(promise, {
				loading: 'Uploading file...',
				success: (data: any) => `${data.name} uploaded successfully!`,
				error: (err) => `Upload failed: ${(err as Error).message}`
			});
		}}>
			Promise Toast (70% success rate)
		</Button>
	{/snippet}
</Story>

<!-- Positions -->
<Story name="Top Right Position">
	{#snippet template(args: Args)}
		<Toaster position="top-right" richColors />
		<Button onclick={() => toast.info('Toast from top right!')}>
			Show Toast (Top Right)
		</Button>
	{/snippet}
</Story>

<Story name="Top Center Position">
	{#snippet template(args: Args)}
		<Toaster position="top-center" richColors />
		<Button onclick={() => toast.info('Toast from top center!')}>
			Show Toast (Top Center)
		</Button>
	{/snippet}
</Story>

<Story name="Bottom Center Position">
	{#snippet template(args: Args)}
		<Toaster position="bottom-center" richColors />
		<Button onclick={() => toast.info('Toast from bottom center!')}>
			Show Toast (Bottom Center)
		</Button>
	{/snippet}
</Story>

<!-- Close Button -->
<Story name="With Close Button">
	{#snippet template(args: Args)}
		<Toaster closeButton richColors />
		<Button onclick={() => toast.success('This toast has a close button', {
			duration: 10000
		})}>
			Toast with Close Button
		</Button>
	{/snippet}
</Story>

<!-- Expand on Hover -->
<Story name="Expand on Hover">
	{#snippet template(args: Args)}
		<Toaster expand richColors />
		<div class="space-y-2">
			<Button onclick={() => {
				toast.success('First notification');
				setTimeout(() => toast.info('Second notification'), 200);
				setTimeout(() => toast.warning('Third notification'), 400);
			}}>
				Show Multiple Toasts (hover to expand)
			</Button>
		</div>
	{/snippet}
</Story>

<!-- Persistent Toast -->
<Story name="Persistent Toast">
	{#snippet template(args: Args)}
		<Toaster richColors closeButton />
		<Button onclick={() => toast.warning('Important notification', {
			description: 'This toast will not auto-dismiss.',
			duration: Infinity
		})}>
			Persistent Toast
		</Button>
	{/snippet}
</Story>

<!-- Custom Duration -->
<Story name="Custom Duration">
	{#snippet template(args: Args)}
		<Toaster richColors />
		<div class="flex gap-2">
			<Button variant="outline" onclick={() => toast('Quick toast', { duration: 1000 })}>
				1 second
			</Button>
			<Button variant="outline" onclick={() => toast('Normal toast', { duration: 4000 })}>
				4 seconds
			</Button>
			<Button variant="outline" onclick={() => toast('Long toast', { duration: 10000 })}>
				10 seconds
			</Button>
		</div>
	{/snippet}
</Story>

<!-- Dismiss All -->
<Story name="Dismiss All">
	{#snippet template(args: Args)}
		<Toaster richColors />
		<div class="flex gap-2">
			<Button onclick={() => {
				toast.success('Toast 1');
				toast.info('Toast 2');
				toast.warning('Toast 3');
			}}>
				Show 3 Toasts
			</Button>
			<Button variant="outline" onclick={() => toast.dismiss()}>
				Dismiss All
			</Button>
		</div>
	{/snippet}
</Story>
