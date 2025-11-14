<script lang="ts">
	import { Switch } from '$lib/components/ui/switch';
	import type { SwitchVariant, SwitchSize } from '$lib/components/ui/switch';

	let states = $state({
		basicSwitch: false,
		disabledOn: true,
		disabledOff: false,
		variants: {
			default: false,
			success: false,
			warning: false,
			danger: false,
			ghost: false
		},
		sizes: {
			sm: false,
			default: false,
			lg: false
		},
		formSwitch: false
	});

	const variants: SwitchVariant[] = ['default', 'success', 'warning', 'danger', 'ghost'];
	const sizes: SwitchSize[] = ['sm', 'default', 'lg'];

	function handleSwitchChange(key: string, checked: boolean) {
		console.log(`${key} changed to:`, checked);
	}
</script>

<svelte:head>
	<title>Switch Component Demo</title>
</svelte:head>

<div class="container mx-auto p-8 max-w-4xl">
	<div class="space-y-8">
		<!-- Header -->
		<div class="text-center space-y-2">
			<h1 class="text-4xl font-bold">Switch Component</h1>
			<p class="text-xl text-muted-foreground">
				Interactive switches with variants and sizes
			</p>
		</div>

		<!-- Basic Usage -->
		<section class="space-y-4">
			<h2 class="text-2xl font-semibold">Basic Usage</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div class="space-y-2">
					<label for="basic-switch" class="text-sm font-medium">
						Basic Switch
					</label>
					<div class="flex items-center space-x-2">
						<Switch
							id="basic-switch"
							bind:checked={states.basicSwitch}
							onCheckedChange={(checked) => handleSwitchChange('basic', checked)}
						/>
						<span class="text-sm text-muted-foreground">
							{states.basicSwitch ? 'On' : 'Off'}
						</span>
					</div>
				</div>

				<div class="space-y-2">
					<label class="text-sm font-medium">
						Disabled (On)
					</label>
					<div class="flex items-center space-x-2">
						<Switch
							checked={states.disabledOn}
							disabled={true}
						/>
						<span class="text-sm text-muted-foreground">Disabled</span>
					</div>
				</div>

				<div class="space-y-2">
					<label class="text-sm font-medium">
						Disabled (Off)
					</label>
					<div class="flex items-center space-x-2">
						<Switch
							checked={states.disabledOff}
							disabled={true}
						/>
						<span class="text-sm text-muted-foreground">Disabled</span>
					</div>
				</div>
			</div>
		</section>

		<!-- Variants -->
		<section class="space-y-4">
			<h2 class="text-2xl font-semibold">Variants</h2>
			<div class="grid grid-cols-2 md:grid-cols-5 gap-6">
				{#each variants as variant}
					<div class="space-y-2">
						<h3 class="text-sm font-medium capitalize">{variant}</h3>
						<div class="flex items-center space-x-2">
							<Switch
								{variant}
								bind:checked={states.variants[variant]}
								onCheckedChange={(checked) => handleSwitchChange(variant, checked)}
							/>
							<span class="text-xs text-muted-foreground">
								{states.variants[variant] ? 'On' : 'Off'}
							</span>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Sizes -->
		<section class="space-y-4">
			<h2 class="text-2xl font-semibold">Sizes</h2>
			<div class="flex flex-wrap gap-8 items-end">
				{#each sizes as size}
					<div class="space-y-2">
						<h3 class="text-sm font-medium capitalize">
							{size === 'default' ? 'Default' : size.toUpperCase()}
						</h3>
						<div class="flex items-center space-x-2">
							<Switch
								{size}
								bind:checked={states.sizes[size]}
								onCheckedChange={(checked) => handleSwitchChange(`size-${size}`, checked)}
							/>
							<span class="text-xs text-muted-foreground">
								{states.sizes[size] ? 'On' : 'Off'}
							</span>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Variant & Size Combinations -->
		<section class="space-y-4">
			<h2 class="text-2xl font-semibold">Variant & Size Combinations</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div class="space-y-2">
					<h3 class="font-medium">Large Success</h3>
					<Switch
						variant="success"
						size="lg"
						checked={true}
					/>
				</div>

				<div class="space-y-2">
					<h3 class="font-medium">Small Warning</h3>
					<Switch
						variant="warning"
						size="sm"
						checked={true}
					/>
				</div>

				<div class="space-y-2">
					<h3 class="font-medium">Large Danger</h3>
					<Switch
						variant="danger"
						size="lg"
						checked={true}
					/>
				</div>
			</div>
		</section>

		<!-- Form Integration -->
		<section class="space-y-4">
			<h2 class="text-2xl font-semibold">Form Integration</h2>
			<div class="max-w-md space-y-4 p-6 border border-border rounded-lg">
				<h3 class="font-medium">Settings</h3>
				
				<div class="space-y-4">
					<div class="flex items-center justify-between">
						<div class="space-y-0.5">
							<label for="notifications" class="text-sm font-medium">
								Email Notifications
							</label>
							<p class="text-xs text-muted-foreground">
								Receive notifications via email
							</p>
						</div>
						<Switch
							id="notifications"
							name="notifications"
							bind:checked={states.formSwitch}
							variant="success"
						/>
					</div>

					<div class="flex items-center justify-between">
						<div class="space-y-0.5">
							<label for="marketing" class="text-sm font-medium">
								Marketing Emails
							</label>
							<p class="text-xs text-muted-foreground">
								Receive marketing and promotional emails
							</p>
						</div>
						<Switch
							id="marketing"
							name="marketing"
							checked={false}
							variant="ghost"
						/>
					</div>

					<div class="flex items-center justify-between">
						<div class="space-y-0.5">
							<label class="text-sm font-medium text-muted-foreground">
								Data Processing (Required)
							</label>
							<p class="text-xs text-muted-foreground">
								Required for app functionality
							</p>
						</div>
						<Switch
							checked={true}
							disabled={true}
							variant="default"
							required={true}
						/>
					</div>
				</div>
			</div>
		</section>

		<!-- State Display -->
		<section class="space-y-4">
			<h2 class="text-2xl font-semibold">Current State</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div class="space-y-2">
					<h3 class="font-medium">Basic Switches</h3>
					<pre class="text-sm bg-muted p-4 rounded-md overflow-auto">{JSON.stringify({
						basic: states.basicSwitch,
						form: states.formSwitch
					}, null, 2)}</pre>
				</div>

				<div class="space-y-2">
					<h3 class="font-medium">Variants</h3>
					<pre class="text-sm bg-muted p-4 rounded-md overflow-auto">{JSON.stringify(states.variants, null, 2)}</pre>
				</div>

				<div class="space-y-2">
					<h3 class="font-medium">Sizes</h3>
					<pre class="text-sm bg-muted p-4 rounded-md overflow-auto">{JSON.stringify(states.sizes, null, 2)}</pre>
				</div>
			</div>
		</section>
	</div>
</div>