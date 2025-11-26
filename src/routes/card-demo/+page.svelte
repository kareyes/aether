<script lang="ts">
	import {Card} from "$core/components/ui/card/index.js";
	import { Button } from "$core/components/ui/button/index.js";
	import { Input } from "$core/components/ui/input/index.js";
	import { Switch } from "$core/components/ui/switch/index.js";
	import {Field} from "$core/components/ui/field/index.js";
	import {Select} from "$core/components/ui/select/index.js";
	import { Badge } from "$core/components/ui/badge/index.js";

	let autoRenew = $state(true);
	let emailNotifications = $state(true);
	let darkMode = $state(false);
</script>

<div class="container mx-auto max-w-6xl space-y-8 p-8">
	<div class="space-y-2">
		<h1 class="text-3xl font-bold">Card Component</h1>
		<p class="text-muted-foreground">
			Simplified card component with variants, padding options, and interactive states.
		</p>
	</div>

	<hr class="border-border" />

	<!-- Basic Cards -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Basic Cards</h2>
			<p class="text-muted-foreground">Simple card examples with title and description</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			<Card title="Simple Card" description="A basic card with title and description">
				<p class="text-sm">This is the card content area where you can place any elements.</p>
			</Card>

			<Card title="Without Description">
				<p class="text-sm">A card without a description subtitle.</p>
			</Card>

			<Card description="Only description, no title">
				<p class="text-sm">This card only has a description.</p>
			</Card>
		</div>
	</section>

	<!-- Card Variants -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Card Variants</h2>
			<p class="text-muted-foreground">Different visual styles for cards</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			<Card variant="default" title="Default" description="Standard card with border and shadow">
				<p class="text-sm">The default variant provides a subtle border and light shadow.</p>
			</Card>

			<Card variant="outline" title="Outline" description="Emphasized border">
				<p class="text-sm">The outline variant uses a thicker border for more emphasis.</p>
			</Card>

			<Card variant="ghost" title="Ghost" description="Minimal styling">
				<p class="text-sm">The ghost variant removes borders and shadows for a cleaner look.</p>
			</Card>

			<Card variant="elevated" title="Elevated" description="Enhanced shadow">
				<p class="text-sm">The elevated variant adds a larger shadow for depth.</p>
			</Card>

			<Card variant="filled" title="Filled" description="Filled background">
				<p class="text-sm">The filled variant uses a background color.</p>
			</Card>
		</div>
	</section>

	<!-- Padding Options -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Padding Options</h2>
			<p class="text-muted-foreground">Different padding sizes for cards</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
			<Card padding="none" title="No Padding">
				<div class="bg-muted p-4 rounded">
					<p class="text-sm">Content fills the entire card with no padding.</p>
				</div>
			</Card>

			<Card padding="sm" title="Small Padding">
				<p class="text-sm">Compact card with small padding (p-4).</p>
			</Card>

			<Card padding="default" title="Default Padding">
				<p class="text-sm">Standard card with default padding (p-6).</p>
			</Card>

			<Card padding="lg" title="Large Padding">
				<p class="text-sm">Spacious card with large padding (p-8).</p>
			</Card>
		</div>
	</section>

	<!-- Interactive States -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Interactive States</h2>
			<p class="text-muted-foreground">Cards with hover and interactive effects</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			<Card hover title="Hover Effect" description="Hover over this card to see the effect">
				<p class="text-sm">
					This card responds to hover with enhanced shadow and border color animation.
				</p>
			</Card>

			<Card interactive title="Interactive Card" description="This card is clickable">
				<p class="text-sm">
					Interactive cards have cursor pointer, scale transform, and shadow transitions on hover.
				</p>
			</Card>
		</div>

		<div class="grid gap-6 md:grid-cols-3">
			<Card variant="outline" hover title="Outline + Hover">
				<p class="text-sm">Combining variants with interactive states.</p>
			</Card>

			<Card variant="elevated" interactive title="Elevated + Interactive">
				<p class="text-sm">Elevated variant with full interactivity.</p>
			</Card>

			<Card variant="filled" hover title="Filled + Hover">
				<p class="text-sm">Filled background with hover effect.</p>
			</Card>
		</div>
	</section>

	<!-- Cards with Header Actions -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Header Actions</h2>
			<p class="text-muted-foreground">Cards with action buttons or content in the header</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			<Card title="Edit Profile" description="Update your personal information">
				{#snippet headerAction()}
					<Button variant="ghost" size="sm">Edit</Button>
				{/snippet}
				<div class="space-y-3">
					<Field label="Full Name">
						<Input id="full-name" value="John Doe" />
					</Field>
					<Field label="Email">
						<Input id="email" type="email" value="john@example.com" />
					</Field>
				</div>
			</Card>

			<Card title="API Key" description="Manage your API credentials">
				{#snippet headerAction()}
					<Button variant="outline" size="sm">Regenerate</Button>
				{/snippet}
				<div class="space-y-3">
					<div class="rounded bg-muted p-3 font-mono text-xs">
						sk_live_abc123def456ghi789
					</div>
					<p class="text-xs text-muted-foreground">
						Keep your API key secure. Never share it publicly.
					</p>
				</div>
			</Card>

			<Card title="Notifications" description="Control your notification preferences">
				{#snippet headerAction()}
					<Badge>3 New</Badge>
				{/snippet}
				<div class="space-y-3">
					<Field label="Email notifications" orientation="horizontal">
						<Switch id="email-notif" bind:checked={emailNotifications} />
					</Field>
					<Field label="Push notifications" orientation="horizontal">
						<Switch id="push-notif" checked />
					</Field>
				</div>
			</Card>

			<Card title="Dark Mode" description="Toggle application theme">
				{#snippet headerAction()}
					<Switch id="theme-toggle" bind:checked={darkMode} variant="success" />
				{/snippet}
				<p class="text-sm text-muted-foreground">
					{darkMode ? 'Dark mode is enabled' : 'Light mode is enabled'}
				</p>
			</Card>
		</div>
	</section>

	<!-- Cards with Footers -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Footer Content</h2>
			<p class="text-muted-foreground">Cards with footer actions and information</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			<Card title="Confirm Action" description="This action requires confirmation">
				<p class="text-sm text-muted-foreground">
					Are you sure you want to proceed? This action cannot be undone.
				</p>
				{#snippet footer()}
					<Button variant="outline" size="sm">Cancel</Button>
					<Button variant="destructive" size="sm">Confirm</Button>
				{/snippet}
			</Card>

			<Card title="Save Changes" description="Update your preferences">
				<Field label="Username">
					<Input id="username-save" value="johndoe" />
				</Field>
				{#snippet footer()}
					<div class="flex-1 text-xs text-muted-foreground">Last saved: 5 minutes ago</div>
					<Button variant="outline" size="sm">Discard</Button>
					<Button size="sm">Save</Button>
				{/snippet}
			</Card>

			<Card title="Team Members" description="Manage your team">
				<div class="space-y-2">
					<div class="flex items-center gap-3">
						<div class="h-10 w-10 rounded-full bg-primary/10"></div>
						<div class="flex-1">
							<p class="text-sm font-medium">John Doe</p>
							<p class="text-xs text-muted-foreground">john@example.com</p>
						</div>
					</div>
					<div class="flex items-center gap-3">
						<div class="h-10 w-10 rounded-full bg-primary/10"></div>
						<div class="flex-1">
							<p class="text-sm font-medium">Jane Smith</p>
							<p class="text-xs text-muted-foreground">jane@example.com</p>
						</div>
					</div>
				</div>
				{#snippet footer()}
					<Button variant="outline" size="sm" class="w-full">Invite Member</Button>
				{/snippet}
			</Card>

			<Card title="Upload File" description="Drag and drop or click to upload">
				<div class="border-2 border-dashed rounded-lg p-8 text-center">
					<p class="text-sm text-muted-foreground">Drop files here or click to browse</p>
				</div>
				{#snippet footer()}
					<div class="flex-1 text-xs text-muted-foreground">Max file size: 10MB</div>
					<Button size="sm">Upload</Button>
				{/snippet}
			</Card>
		</div>
	</section>

	<!-- Complex Examples -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Complex Examples</h2>
			<p class="text-muted-foreground">Advanced card layouts with multiple features</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			<Card 
				title="Subscription Plan" 
				description="Manage your subscription and billing"
				variant="elevated"
				hover
			>
				{#snippet headerAction()}
					<Badge>Active</Badge>
				{/snippet}

				<div class="space-y-4">
					<div class="grid gap-4 md:grid-cols-2">
						<Field label="Current Plan">
                            <Select multiple={false} placeholder="Pro Plan" options={[{value: "free", label: "Free - $0/month"}, {value: "basic", label: "Basic - $9/month"}, {value: "pro", label: "Pro - $29/month"}, {value: "enterprise", label: "Enterprise - $99/month"}]} />

	
						</Field>

						<Field label="Billing Cycle">
                            <Select multiple={false} placeholder="Monthly" options={[{value: "monthly", label: "Monthly"}, {value: "yearly", label: "Yearly (Save 20%)"}]} />
						</Field>
					</div>

					<Field label="Auto-renew subscription" orientation="horizontal">
						<Switch id="auto-renew-sub" bind:checked={autoRenew} variant="success" />
					</Field>

					<div class="rounded bg-muted p-4 space-y-1">
						<div class="flex justify-between text-sm">
							<span>Subtotal</span>
							<span>$29.00</span>
						</div>
						<div class="flex justify-between text-sm">
							<span>Tax</span>
							<span>$2.32</span>
						</div>
						<hr class="my-2" />
						<div class="flex justify-between font-semibold">
							<span>Total</span>
							<span>$31.32/month</span>
						</div>
					</div>
				</div>

				{#snippet footer()}
					<div class="flex-1 text-xs text-muted-foreground">
						Next billing: Dec 1, 2025
					</div>
					<Button variant="outline" size="sm">Cancel Plan</Button>
					<Button size="sm">Upgrade</Button>
				{/snippet}
			</Card>

			<Card 
				title="Project Settings" 
				description="Configure your project preferences"
				variant="outline"
				interactive
			>
				{#snippet headerAction()}
					<Button variant="ghost" size="sm">Export</Button>
				{/snippet}

				<div class="space-y-4">
					<Field label="Project Name">
						<Input id="project-name" value="My Awesome Project" />
					</Field>

					<Field label="Description">
						<Input id="project-desc" value="A description of the project" />
					</Field>

					<Field label="Visibility">
                        <Select multiple={false} placeholder="Private" options={[{value: "public", label: "Public"}, {value: "private", label: "Private"}, {value: "internal", label: "Internal"}]} />
					</Field>

					<div class="space-y-2">
						<Field label="Enable analytics" orientation="horizontal">
							<Switch id="analytics" checked />
						</Field>
						<Field label="Allow comments" orientation="horizontal">
							<Switch id="comments" checked />
						</Field>
						<Field label="Email notifications" orientation="horizontal">
							<Switch id="project-emails" />
						</Field>
					</div>
				</div>

				{#snippet footer()}
					<div class="flex-1"></div>
					<Button variant="outline" size="sm">Reset</Button>
					<Button size="sm">Save Settings</Button>
				{/snippet}
			</Card>
		</div>

		<!-- Full Width Complex Card -->
		<Card 
			title="Analytics Dashboard" 
			description="Track your performance metrics"
			variant="elevated"
			padding="lg"
		>
			{#snippet headerAction()}
				<div class="flex gap-2">
					<Button variant="outline" size="sm">Export</Button>
					<Button variant="outline" size="sm">Refresh</Button>
				</div>
			{/snippet}

			<div class="grid gap-6 md:grid-cols-3 mb-6">
				<div class="rounded-lg bg-muted p-4">
					<p class="text-sm text-muted-foreground">Total Users</p>
					<p class="text-3xl font-bold mt-2">12,345</p>
					<p class="text-xs text-green-600 mt-1">↑ 12% from last month</p>
				</div>
				<div class="rounded-lg bg-muted p-4">
					<p class="text-sm text-muted-foreground">Revenue</p>
					<p class="text-3xl font-bold mt-2">$45,678</p>
					<p class="text-xs text-green-600 mt-1">↑ 8% from last month</p>
				</div>
				<div class="rounded-lg bg-muted p-4">
					<p class="text-sm text-muted-foreground">Conversion Rate</p>
					<p class="text-3xl font-bold mt-2">3.2%</p>
					<p class="text-xs text-red-600 mt-1">↓ 2% from last month</p>
				</div>
			</div>

			<div class="h-64 bg-muted rounded-lg flex items-center justify-center">
				<p class="text-muted-foreground">Chart visualization would go here</p>
			</div>

			{#snippet footer()}
				<div class="flex-1 text-xs text-muted-foreground">
					Updated: Nov 26, 2025 at 2:30 PM
				</div>
				<Button size="sm">View Full Report</Button>
			{/snippet}
		</Card>
	</section>

	<!-- Combining Variants -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Variant Combinations</h2>
			<p class="text-muted-foreground">Combining different props for unique card styles</p>
		</div>

		<div class="grid gap-6 md:grid-cols-3">
			<Card variant="ghost" padding="sm" title="Ghost + Small">
				<p class="text-sm">Minimal card with compact padding.</p>
			</Card>

			<Card variant="outline" padding="lg" hover title="Outline + Large + Hover">
				<p class="text-sm">Emphasized border with spacious padding and hover effect.</p>
			</Card>

			<Card variant="elevated" interactive title="Elevated + Interactive">
				<p class="text-sm">Lifted appearance with full interactivity.</p>
			</Card>

			<Card variant="filled" padding="none" title="Filled + No Padding">
				<div class="bg-primary/5 p-4 rounded">
					<p class="text-sm">Filled background with custom internal padding.</p>
				</div>
			</Card>

			<Card variant="outline" hover interactive title="Outline + Hover + Interactive">
				<p class="text-sm">Triple combination for maximum interactivity.</p>
			</Card>

			<Card variant="elevated" padding="lg" hover title="Elevated + Large + Hover">
				<p class="text-sm">Premium card appearance with generous spacing.</p>
			</Card>
		</div>
	</section>
</div>
