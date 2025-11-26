<script lang="ts">
	import { Button } from "$core/components/ui/button/index.js";
	import { Input } from "$core/components/ui/input/index.js";
	import { Textarea } from "$core/components/ui/textarea/index.js";
	import { Checkbox } from "$core/components/ui/checkbox/index.js";
	import { Switch } from "$core/components/ui/switch/index.js";
	import * as Select from "$core/components/ui/select/index.js";
	import * as Field from "$core/components/ui/field/index.js";
	import {Card} from "$core/components/ui/card/index.js";

	// Form state
	let username = $state("");
	let email = $state("");
	let password = $state("");
	let bio = $state("");
	let country = $state("");
	let newsletter = $state(false);
	let notifications = $state(true);
	let plan = $state("");

	// Additional state for variant demos
	let phone = $state("");
	let ssn = $state("");
	let description = $state("");
	let agreeToTerms = $state(false);
	let darkMode = $state(false);

	// Validation state
	let errors = $state<Record<string, string>>({});

	// Form submission
	function handleSubmit(event: Event) {
		event.preventDefault();
		errors = {};

		// Simple validation
		if (!username) {
			errors.username = "Username is required";
		} else if (username.length < 3) {
			errors.username = "Username must be at least 3 characters";
		}

		if (!email) {
			errors.email = "Email is required";
		} else if (!email.includes("@")) {
			errors.email = "Please enter a valid email address";
		}

		if (!password) {
			errors.password = "Password is required";
		} else if (password.length < 8) {
			errors.password = "Password must be at least 8 characters";
		}

		if (!country) {
			errors.country = "Please select a country";
		}

		if (!plan) {
			errors.plan = "Please select a subscription plan";
		}

		// If no errors, show success
		if (Object.keys(errors).length === 0) {
			alert("Form submitted successfully!");
			console.log({
				username,
				email,
				password,
				bio,
				country,
				newsletter,
				notifications,
				plan,
			});
		}
	}

	function resetForm() {
		username = "";
		email = "";
		password = "";
		bio = "";
		country = "";
		newsletter = false;
		notifications = true;
		plan = "";
		errors = {};
	}

	const countries = [
		{ value: "us", label: "United States" },
		{ value: "uk", label: "United Kingdom" },
		{ value: "ca", label: "Canada" },
		{ value: "au", label: "Australia" },
		{ value: "de", label: "Germany" },
		{ value: "fr", label: "France" },
		{ value: "jp", label: "Japan" },
		{ value: "cn", label: "China" },
	];

	const plans = [
		{ value: "free", label: "Free - $0/month" },
		{ value: "basic", label: "Basic - $9/month" },
		{ value: "pro", label: "Pro - $29/month" },
		{ value: "enterprise", label: "Enterprise - $99/month" },
	];
</script>

<div class="container mx-auto max-w-4xl space-y-8 p-8">
	<div class="space-y-2">
		<h1 class="text-3xl font-bold">Field.Field Component (Slot-Based)</h1>
		<p class="text-muted-foreground">
			Simplified field component using slots for maximum flexibility. Pass any form control as a child.
		</p>
	</div>

	<hr class="border-border" />

	<!-- Basic Form Example -->
	<section class="space-y-4">
		<div>
			<h2 class="text-2xl font-bold">Complete Form Example</h2>
			<p class="mt-1 text-sm text-muted-foreground">
				A full form using Field.Field with form controls passed as slots.
			</p>
		</div>

		<form onsubmit={handleSubmit} class="rounded-lg border bg-card p-6">
			<Field.Set>
				<Field.Legend>Account Information</Field.Legend>
				<Field.Description>
					Create your account by filling out the information below.
				</Field.Description>

				<Field.Separator />

				<Field.Group class="gap-6">
					<!-- Username Input -->
					<Field.Field
						label="Username"
						description="Choose a unique username for your account."
						required
						error={errors.username}
					>
						<Input id="username" bind:value={username} placeholder="johndoe" required />
					</Field.Field>

					<!-- Email Input -->
					<Field.Field
						label="Email"
						description="We'll never share your email with anyone."
						required
						error={errors.email}
					>
						<Input id="email" type="email" bind:value={email} placeholder="you@example.com" required />
					</Field.Field>

					<!-- Password Input -->
					<Field.Field
						label="Password"
						description="Must be at least 8 characters long."
						required
						error={errors.password}
					>
						<Input id="password" type="password" bind:value={password} placeholder="••••••••" required />
					</Field.Field>

					<!-- Bio Textarea -->
					<Field.Field label="Bio" description="Tell us a little about yourself.">
						<Textarea
							id="bio"
							bind:value={bio}
							placeholder="I am a..."
							rows={4}
						/>
					</Field.Field>

					<!-- Country Select -->
					<Field.Field
						label="Country"
						description="Select your country of residence."
						required
						error={errors.country}
					>
						<Select.Root type="single" bind:value={country} required>
							<Select.Trigger id="country">
								{#if country}
									{countries.find((c) => c.value === country)?.label || "Select a country"}
								{:else}
									Select a country
								{/if}
							</Select.Trigger>
							<Select.Content>
								{#each countries as countryOption (countryOption.value)}
									<Select.Item value={countryOption.value}>{countryOption.label}</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
					</Field.Field>
				</Field.Group>
			</Field.Set>

			<Field.Set>
				<Field.Legend>Preferences</Field.Legend>

				<Field.Group  class="gap-4">
					<!-- Newsletter Checkbox -->
					<Field.Field
						label="Newsletter subscription"
						description="Receive weekly updates about new features."
						orientation="horizontal"
					>
						<Checkbox id="newsletter" bind:checked={newsletter} />
					</Field.Field>

					<!-- Notifications Switch -->
					<Field.Field
						label="Enable notifications"
						description="Get notified about important updates."
						orientation="horizontal"
					>
						<Switch id="notifications" bind:checked={notifications} />
					</Field.Field>
				</Field.Group>
			</Field.Set>

			<Field.Set>
				<Field.Legend>Subscription Plan</Field.Legend>
				<Field.Description>Choose the plan that works best for you.</Field.Description>

				<Field.Separator />

				<Field.Group>
					<Field.Field
						label="Plan"
						description="Select your subscription tier."
						required
						error={errors.plan}
					>
						<Select.Root type="single" bind:value={plan} required>
							<Select.Trigger id="plan">
								{#if plan}
									{plans.find((p) => p.value === plan)?.label || "Select a plan"}
								{:else}
									Select a plan
								{/if}
							</Select.Trigger>
							<Select.Content>
								{#each plans as planOption (planOption.value)}
									<Select.Item value={planOption.value}>{planOption.label}</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
					</Field.Field>
				</Field.Group>
			</Field.Set>

			<div class="flex gap-4">
				<Button type="submit">Submit</Button>
				<Button type="button" variant="outline" onclick={resetForm}>Reset</Button>
			</div>
		</form>
	</section>

	<!-- Input Variants Section -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Input Variants</h2>
			<p class="text-muted-foreground">Different visual styles for input fields</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			<Card>
				<Field.Field label="Default Variant">
					<Input id="input-default" placeholder="Default style" variant="default" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Outline Variant">
					<Input id="input-outline" placeholder="Outline style" variant="outline" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Filled Variant">
					<Input id="input-filled" placeholder="Filled style" variant="filled" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Ghost Variant">
					<Input id="input-ghost" placeholder="Ghost style" variant="ghost" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Underline Variant">
					<Input id="input-underline" placeholder="Underline style" variant="underline" />
				</Field.Field>
			</Card>
		</div>
	</section>

	<!-- Input Sizes Section -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Input Sizes</h2>
			<p class="text-muted-foreground">Different size options for input fields</p>
		</div>

		<div class="grid gap-6 md:grid-cols-3">
			<Card>
				<Field.Field label="Small Size">
					<Input id="input-sm" placeholder="Small input" size="sm" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Default Size">
					<Input id="input-default-size" placeholder="Default input" size="default" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Large Size">
					<Input id="input-lg" placeholder="Large input" size="lg" />
				</Field.Field>
			</Card>
		</div>
	</section>

	<!-- Input Masks Section -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Input Masks</h2>
			<p class="text-muted-foreground">Formatted input fields with automatic masking</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			<Card>
				<Field.Field label="Phone Number">
					<Input id="phone-mask" bind:value={phone} placeholder="(555) 555-5555" mask="phone" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Social Security Number">
					<Input id="ssn-mask" bind:value={ssn} placeholder="***-**-****" mask="ssn" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Credit Card">
					<Input id="creditcard-mask" placeholder="**** **** **** ****" mask="creditCard" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Date">
					<Input id="date-mask" placeholder="MM/DD/YYYY" mask="date" />
				</Field.Field>
			</Card>
		</div>
	</section>

	<!-- Textarea Variants and Features Section -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Textarea Variants & Features</h2>
			<p class="text-muted-foreground">Different styles and features for textarea fields</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			<Card>
				<Field.Field label="Default Textarea">
					<Textarea id="textarea-default" placeholder="Enter your text..." variant="default" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Outline Textarea">
					<Textarea id="textarea-outline" placeholder="Enter your text..." variant="outline" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="With Character Counter" description="Maximum 200 characters">
					<Textarea
						id="textarea-counter"
						bind:value={description}
						placeholder="Enter your text..."
						maxLength={200}
						showCount
					/>
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Auto-Resize" description="Automatically grows with content">
					<Textarea
						id="textarea-autoresize"
						placeholder="Start typing..."
						autoResize
						minRows={2}
						maxRows={6}
					/>
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Vertical Resize">
					<Textarea id="textarea-resize-vertical" placeholder="Resize vertically only" resize="vertical" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="No Resize">
					<Textarea id="textarea-resize-none" placeholder="Cannot be resized" resize="none" />
				</Field.Field>
			</Card>
		</div>
	</section>

	<!-- Checkbox Variants and Sizes Section -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Checkbox Variants & Sizes</h2>
			<p class="text-muted-foreground">Different styles and sizes for checkbox fields</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
			<Card>
				<Field.Field label="Default Variant" orientation="horizontal">
					<Checkbox id="checkbox-default-variant" variant="default" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Destructive Variant" orientation="horizontal">
					<Checkbox id="checkbox-destructive" variant="destructive" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Success Variant" orientation="horizontal">
					<Checkbox id="checkbox-success" variant="success" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Warning Variant" orientation="horizontal">
					<Checkbox id="checkbox-warning" variant="warning" />
				</Field.Field>
			</Card>
		</div>

		<div class="grid gap-6 md:grid-cols-4">
			<Card>
				<Field.Field label="Small Size" orientation="horizontal">
					<Checkbox id="checkbox-sm" size="sm" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Default Size" orientation="horizontal">
					<Checkbox id="checkbox-default-size" size="default" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Large Size" orientation="horizontal">
					<Checkbox id="checkbox-lg" size="lg" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Extra Large" orientation="horizontal">
					<Checkbox id="checkbox-xl" size="xl" />
				</Field.Field>
			</Card>
		</div>
	</section>

	<!-- Switch Variants and Sizes Section -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Switch Variants & Sizes</h2>
			<p class="text-muted-foreground">Different styles and sizes for switch fields</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			<Card>
				<Field.Field
					label="Default Variant"
					description="Standard switch style"
					orientation="horizontal"
				>
					<Switch id="switch-default-variant" variant="default" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field
					label="Success Variant"
					description="Success-themed switch"
					orientation="horizontal"
				>
					<Switch id="switch-success" variant="success" />
				</Field.Field>
			</Card>
		</div>

		<div class="grid gap-6 md:grid-cols-3">
			<Card>
				<Field.Field label="Small Size" orientation="horizontal">
					<Switch id="switch-sm" size="sm" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Default Size" orientation="horizontal">
					<Switch id="switch-default-size" size="default" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field label="Large Size" orientation="horizontal">
					<Switch id="switch-lg" size="lg" />
				</Field.Field>
			</Card>
		</div>
	</section>

	<!-- Horizontal Layout Examples -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Horizontal Layouts</h2>
			<p class="text-muted-foreground">Fields with horizontal orientation</p>
		</div>

		<div class="grid gap-6">
			<Card>
				<Field.Field
					label="Email notifications"
					description="Receive updates via email"
					orientation="horizontal"
				>
					<Switch id="email-notifications" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field
					label="I agree to terms"
					description="You must agree to continue"
					orientation="horizontal"
				>
					<Checkbox id="agree-terms" bind:checked={agreeToTerms} />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field
					label="Dark mode"
					description="Toggle dark mode theme"
					orientation="horizontal"
				>
					<Switch id="dark-mode" bind:checked={darkMode} variant="success" />
				</Field.Field>
			</Card>
		</div>
	</section>

	<!-- Error States -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Error States</h2>
			<p class="text-muted-foreground">Fields displaying validation errors</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			<Card>
				<Field.Field
					label="Username"
					description="Enter a unique username"
					error="This username is already taken"
					required
				>
					<Input id="error-input" placeholder="username" />
				</Field.Field>
			</Card>

			<Card>
				<Field.Field
					label="Email"
					error="Please enter a valid email address"
					required
				>
					<Input id="error-email" type="email" placeholder="email@example.com" />
				</Field.Field>
			</Card>
		</div>
	</section>

	<!-- Card Component Variants Section -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Card Component Variants</h2>
			<p class="text-muted-foreground">Different visual styles and configurations for the Card component</p>
		</div>

		<!-- Variant Types -->
		<div>
			<h3 class="text-xl font-semibold mb-4">Card Variants</h3>
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<Card title="Default Card" description="Standard card style with border">
					<p class="text-sm">This is the default card variant with a subtle border and shadow.</p>
				</Card>

				<Card variant="outline" title="Outline Card" description="Emphasized border style">
					<p class="text-sm">This card uses a thicker border for more emphasis.</p>
				</Card>

				<Card variant="ghost" title="Ghost Card" description="Minimal styling">
					<p class="text-sm">This card has no border or shadow, appearing more subtle.</p>
				</Card>

				<Card variant="elevated" title="Elevated Card" description="Enhanced shadow">
					<p class="text-sm">This card has a larger shadow for a lifted appearance.</p>
				</Card>

				<Card variant="filled" title="Filled Card" description="Background filled style">
					<p class="text-sm">This card uses a filled background color.</p>
				</Card>
			</div>
		</div>

		<!-- Padding Options -->
		<div>
			<h3 class="text-xl font-semibold mb-4">Card Padding</h3>
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				<Card padding="none" title="No Padding">
					<div class="bg-muted p-2 rounded">
						<p class="text-xs">Content with no card padding</p>
					</div>
				</Card>

				<Card padding="sm" title="Small Padding">
					<p class="text-sm">Compact card with small padding</p>
				</Card>

				<Card padding="default" title="Default Padding">
					<p class="text-sm">Standard card padding</p>
				</Card>

				<Card padding="lg" title="Large Padding">
					<p class="text-sm">Spacious card with large padding</p>
				</Card>
			</div>
		</div>

		<!-- Interactive Cards -->
		<div>
			<h3 class="text-xl font-semibold mb-4">Interactive Cards</h3>
			<div class="grid gap-6 md:grid-cols-2">
				<Card hover title="Hover Effect" description="Hover over this card">
					<p class="text-sm">This card has a hover effect with enhanced shadow and border color.</p>
				</Card>

				<Card interactive title="Interactive Card" description="Click this card">
					<p class="text-sm">This card is fully interactive with scale and shadow transitions.</p>
				</Card>
			</div>
		</div>

		<!-- Card with Header Actions -->
		<div>
			<h3 class="text-xl font-semibold mb-4">Cards with Actions</h3>
			<div class="grid gap-6 md:grid-cols-2">
				<Card title="User Profile" description="Manage your profile settings">
					{#snippet headerAction()}
						<Button variant="ghost" size="sm">Edit</Button>
					{/snippet}
					<Field.Field label="Display Name">
						<Input id="display-name" value="John Doe" />
					</Field.Field>
				</Card>

				<Card title="Notification Settings" description="Configure how you receive alerts">
					{#snippet headerAction()}
						<Button variant="ghost" size="sm">Reset</Button>
					{/snippet}
					<Field.Field label="Email Notifications" orientation="horizontal">
						<Switch id="email-notif" checked />
					</Field.Field>
				</Card>
			</div>
		</div>

		<!-- Card with Footer -->
		<div>
			<h3 class="text-xl font-semibold mb-4">Cards with Footers</h3>
			<div class="grid gap-6 md:grid-cols-2">
				<Card title="Delete Account" description="This action cannot be undone" variant="outline">
					<p class="text-sm text-muted-foreground">
						Deleting your account will permanently remove all your data from our servers.
					</p>
					{#snippet footer()}
						<Button variant="outline" size="sm">Cancel</Button>
						<Button variant="destructive" size="sm">Delete Account</Button>
					{/snippet}
				</Card>

				<Card title="Save Changes" description="Update your preferences" variant="elevated">
					<Field.Field label="Username">
						<Input id="save-username" value="johndoe" />
					</Field.Field>
					{#snippet footer()}
						<div class="flex-1 text-xs text-muted-foreground">Last saved: 5 mins ago</div>
						<Button size="sm">Save</Button>
					{/snippet}
				</Card>
			</div>
		</div>

		<!-- Complex Example -->
		<div>
			<h3 class="text-xl font-semibold mb-4">Complex Card Example</h3>
			<Card 
				title="Team Subscription" 
				description="Manage your team plan and billing"
				variant="elevated"
				hover
			>
				{#snippet headerAction()}
					<Button variant="outline" size="sm">Upgrade</Button>
				{/snippet}

				<div class="space-y-4">
					<div class="grid gap-4 md:grid-cols-2">
						<Field.Field label="Plan Type">
							<Select.Root type="single" value="pro">
								<Select.Trigger id="plan-type">Pro - $29/month</Select.Trigger>
								<Select.Content>
									<Select.Item value="free">Free</Select.Item>
									<Select.Item value="basic">Basic - $9/month</Select.Item>
									<Select.Item value="pro">Pro - $29/month</Select.Item>
									<Select.Item value="enterprise">Enterprise - $99/month</Select.Item>
								</Select.Content>
							</Select.Root>
						</Field.Field>

						<Field.Field label="Team Size">
							<Input id="team-size" type="number" value="5" />
						</Field.Field>
					</div>

					<Field.Field label="Auto-renew subscription" orientation="horizontal">
						<Switch id="auto-renew" checked variant="success" />
					</Field.Field>
				</div>

				{#snippet footer()}
					<div class="flex-1">
						<p class="text-xs text-muted-foreground">Next billing date: Dec 1, 2025</p>
					</div>
					<Button variant="outline" size="sm">View Invoice</Button>
					<Button size="sm">Update Plan</Button>
				{/snippet}
			</Card>
		</div>
	</section>
</div>
