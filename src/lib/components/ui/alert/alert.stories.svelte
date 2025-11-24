<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Alert from './alert.svelte';
	import * as AlertPrimitive from './index';

	const { Story } = defineMeta({
		component: Alert,
		title: 'Components/Alert',
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: 'select',
				options: ['default', 'destructive', 'info', 'success', 'warning', 'error'],
				description: 'Alert variant',
			},
			showIcon: {
				control: 'boolean',
				description: 'Show variant icon',
			},
			dismissible: {
				control: 'boolean',
				description: 'Allow dismissing the alert',
			},
		},
	});
</script>

<script lang="ts">
	import { Button } from '$core/components/ui/button';
</script>

<!-- Default -->
<Story name="Default" args={{ title: "Heads up!", description: "You can add components to your app using the cli." }} />

<!-- Variants -->
<Story name="Info" args={{ 
	variant: "info",
	title: "Information",
	description: "This is an informational message to keep you updated."
}} />

<Story name="Success" args={{ 
	variant: "success",
	title: "Success",
	description: "Your changes have been saved successfully."
}} />

<Story name="Warning" args={{ 
	variant: "warning",
	title: "Warning",
	description: "Please review your settings before proceeding."
}} />

<Story name="Error" args={{ 
	variant: "error",
	title: "Error",
	description: "Something went wrong. Please try again."
}} />


<!-- Without Icon -->
<Story name="No Icon" args={{ 
	variant: "info",
	title: "No Icon Alert",
	description: "This alert doesn't show an icon.",
	showIcon: false
}} />

<!-- Dismissible -->
<Story name="Dismissible" args={{ 
	variant: "success",
	title: "Dismissible Alert",
	description: "Click the X button to dismiss this alert.",
	dismissible: true
}} />

<!-- With Actions -->
<Story name="With Actions">
	<Alert variant="warning" title="Pending Changes" description="You have unsaved changes.">
		{#snippet actions()}
			<Button variant="outline" size="sm">Discard</Button>
			<Button size="sm">Save Changes</Button>
		{/snippet}
	</Alert>
</Story>

<!-- Custom Content -->
<Story name="Custom Content">
	<AlertPrimitive.Root variant="info">
		{#snippet icon()}
			<svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		{/snippet}
		<AlertPrimitive.Title>Custom Alert</AlertPrimitive.Title>
		<AlertPrimitive.Description>
			You can customize the icon and content using the primitive components.
		</AlertPrimitive.Description>
	</AlertPrimitive.Root>
</Story>

<!-- All Variants Showcase -->
<Story name="All Variants">
	<div class="space-y-4">
		<Alert variant="default" title="Default" description="This is the default variant." />
		<Alert variant="info" title="Information" description="This is an info variant." />
		<Alert variant="success" title="Success" description="This is a success variant." />
		<Alert variant="warning" title="Warning" description="This is a warning variant." />
		<Alert variant="error" title="Error" description="This is an error variant." />
		
	</div>
</Story>

<!-- Interactive -->
<Story name="Interactive" args={{ 
	variant: "info",
	title: "Interactive Alert",
	description: "Try changing the variant and other options.",
	showIcon: true,
	dismissible: false
}} />
