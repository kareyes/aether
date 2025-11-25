<script lang="ts">
	import { Button } from "$core/components/ui/button/index.js";
	import * as Field from "$core/components/ui/field/index.js";

	// Form state
	let username = $state("");
	let email = $state("");
	let password = $state("");
	let bio = $state("");
	let country = $state("");
	let newsletter = $state(false);
	let notifications = $state(true);
	let plan = $state("");

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
		<h1 class="text-3xl font-bold">Field Implementation</h1>
		<p class="text-muted-foreground">
			Simplified field component for quickly building forms with consistent styling and
			validation.
		</p>
	</div>

	<hr class="border-border" />

	<!-- Basic Form Example -->
	<section class="space-y-4">
		<div>
			<h2 class="text-2xl font-bold">Complete Form Example</h2>
			<p class="mt-1 text-sm text-muted-foreground">
				A full form using the simplified Field.Impl component with validation.
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
					<Field.Impl
						type="input"
						id="username"
						label="Username"
						description="Choose a unique username for your account."
						bind:value={username}
						required
						error={errors.username}
					/>

					<!-- Email Input -->
					<Field.Impl
						type="input"
						inputType="email"
						id="email"
						label="Email"
						description="We'll never share your email with anyone."
						placeholder="you@example.com"
						bind:value={email}
						required
						error={errors.email}
					/>

					<!-- Password Input -->
					<Field.Impl
						type="input"
						inputType="password"
						id="password"
						label="Password"
						description="Must be at least 8 characters long."
						placeholder="********"
						bind:value={password}
						required
						error={errors.password}
					/>

					<!-- Bio Textarea -->
					<Field.Impl
						type="textarea"
						id="bio"
						label="Bio"
						description="Tell us a little about yourself."
						placeholder="I'm a developer who loves..."
						rows={4}
						bind:value={bio}
					/>

					<!-- Country Select -->
					<Field.Impl
						type="select"
						id="country"
						label="Country"
						description="Select your country of residence."
						placeholder="Choose a country"
						options={countries}
						bind:value={country}
						required
						error={errors.country}
					/>

					<Field.Separator />

					<Field.Legend>Preferences</Field.Legend>

					<!-- Newsletter Checkbox -->
					<Field.Impl
						type="checkbox"
						id="newsletter"
						label="Subscribe to newsletter"
						description="Receive weekly updates and news about our products."
						bind:checked={newsletter}
						orientation="horizontal"
					/>

					<!-- Notifications Switch -->
					<Field.Impl
						type="switch"
						id="notifications"
						label="Enable notifications"
						description="Get notified about important updates and activities."
						bind:checked={notifications}
						orientation="horizontal"
					/>

					<Field.Separator />

					<Field.Legend>Subscription Plan</Field.Legend>

					<!-- Plan Select -->
					<Field.Impl
						type="select"
						id="plan"
						label="Plan"
						description="Choose a subscription plan that fits your needs."
						placeholder="Select a plan"
						options={plans}
						bind:value={plan}
						required
						error={errors.plan}
					/>

					<Field.Separator />

					<!-- Form Actions -->
					<div class="flex gap-2">
						<Button type="submit">Create Account</Button>
						<Button type="button" variant="outline" onclick={resetForm}>Reset</Button>
					</div>
				</Field.Group>
			</Field.Set>
		</form>
	</section>

	<hr class="border-border" />

	<!-- Individual Field Examples -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Individual Field Types</h2>
			<p class="mt-1 text-sm text-muted-foreground">
				Examples of each field type with different configurations.
			</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			<!-- Text Input -->
			<div class="space-y-3 rounded-lg border bg-card p-4">
				<h3 class="font-semibold">Text Input</h3>
				<Field.Impl
					type="input"
					id="text-example"
					label="Full Name"
					description="Enter your full name"
					placeholder="John Doe"
				/>
			</div>

			<!-- Email Input -->
			<div class="space-y-3 rounded-lg border bg-card p-4">
				<h3 class="font-semibold">Email Input</h3>
				<Field.Impl
					type="input"
					inputType="email"
					id="email-example"
					label="Email Address"
					placeholder="email@example.com"
					required
				/>
			</div>

			<!-- Textarea -->
			<div class="space-y-3 rounded-lg border bg-card p-4">
				<h3 class="font-semibold">Textarea</h3>
				<Field.Impl
					type="textarea"
					id="textarea-example"
					label="Message"
					description="Write your message here"
					placeholder="Your message..."
					rows={3}
				/>
			</div>

			<!-- Select -->
			<div class="space-y-3 rounded-lg border bg-card p-4">
				<h3 class="font-semibold">Select</h3>
				<Field.Impl
					type="select"
					id="select-example"
					label="Department"
					description="Choose your department"
					placeholder="Select department"
					options={[
						{ value: "eng", label: "Engineering" },
						{ value: "design", label: "Design" },
						{ value: "sales", label: "Sales" },
						{ value: "marketing", label: "Marketing" },
					]}
				/>
			</div>

			<!-- Checkbox -->
			<div class="space-y-3 rounded-lg border bg-card p-4">
				<h3 class="font-semibold">Checkbox</h3>
				<Field.Impl
					type="checkbox"
					id="checkbox-example"
					label="Accept terms and conditions"
					description="You must accept to continue"
					orientation="horizontal"
				/>
			</div>

			<!-- Switch -->
			<div class="space-y-3 rounded-lg border bg-card p-4">
				<h3 class="font-semibold">Switch</h3>
				<Field.Impl
					type="switch"
					id="switch-example"
					label="Enable dark mode"
					description="Toggle dark mode on or off"
					orientation="horizontal"
				/>
			</div>
		</div>
	</section>

	<hr class="border-border" />

	<!-- Orientations -->
	<section class="space-y-4">
		<div>
			<h2 class="text-2xl font-bold">Field Orientations</h2>
			<p class="mt-1 text-sm text-muted-foreground">
				Vertical, horizontal, and responsive layouts.
			</p>
		</div>

		<div class="space-y-6">
			<!-- Vertical (Default) -->
			<div class="rounded-lg border bg-card p-6">
				<h3 class="mb-4 font-semibold">Vertical (Default)</h3>
				<Field.Impl
					type="input"
					id="vertical-example"
					label="Vertical Layout"
					description="Label and input stacked vertically"
					placeholder="Enter value"
				/>
			</div>

			<!-- Horizontal -->
			<div class="rounded-lg border bg-card p-6">
				<h3 class="mb-4 font-semibold">Horizontal</h3>
				<Field.Impl
					type="input"
					id="horizontal-example"
					label="Horizontal Layout"
					description="Label and input side by side"
					placeholder="Enter value"
					orientation="horizontal"
				/>
			</div>

			<!-- Responsive -->
			<div class="rounded-lg border bg-card p-6">
				<h3 class="mb-4 font-semibold">Responsive</h3>
				<Field.Group class="@container/field-group">
					<Field.Impl
						type="input"
						id="responsive-example"
						label="Responsive Layout"
						description="Vertical on mobile, horizontal on larger screens"
						placeholder="Enter value"
						orientation="responsive"
					/>
				</Field.Group>
			</div>
		</div>
	</section>

	<hr class="border-border" />

	<!-- Error States -->
	<section class="space-y-4">
		<div>
			<h2 class="text-2xl font-bold">Error States</h2>
			<p class="mt-1 text-sm text-muted-foreground">
				Fields with validation errors.
			</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="input"
					id="error-input"
					label="Username"
					description="Enter a unique username"
					placeholder="username"
					error="This username is already taken"
					required
				/>
			</div>

			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="input"
					inputType="email"
					id="error-email"
					label="Email"
					placeholder="email@example.com"
					error="Please enter a valid email address"
					required
				/>
			</div>
		</div>
	</section>

	<!-- Input Variants Section -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Input Variants</h2>
			<p class="text-muted-foreground">Different visual styles for input fields</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="input"
					id="input-default"
					label="Default Variant"
					placeholder="Default style"
					variant="default"
				/>
			</div>

			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="input"
					id="input-outline"
					label="Outline Variant"
					placeholder="Outline style"
					variant="outline"
				/>
			</div>

			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="input"
					id="input-filled"
					label="Filled Variant"
					placeholder="Filled style"
					variant="filled"
				/>
			</div>

			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="input"
					id="input-ghost"
					label="Ghost Variant"
					placeholder="Ghost style"
					variant="ghost"
				/>
			</div>

			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="input"
					id="input-underline"
					label="Underline Variant"
					placeholder="Underline style"
					variant="underline"
				/>
			</div>
		</div>
	</section>

	<!-- Input Sizes Section -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Input Sizes</h2>
			<p class="text-muted-foreground">Different size options for input fields</p>
		</div>

		<div class="grid gap-6 md:grid-cols-3">
			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="input"
					id="input-sm"
					label="Small Size"
					placeholder="Small input"
					size="sm"
				/>
			</div>

			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="input"
					id="input-default-size"
					label="Default Size"
					placeholder="Default input"
					size="default"
				/>
			</div>

			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="input"
					id="input-lg"
					label="Large Size"
					placeholder="Large input"
					size="lg"
				/>
			</div>
		</div>
	</section>

	<!-- Input Masks Section -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Input Masks</h2>
			<p class="text-muted-foreground">Formatted input fields with automatic masking</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="input"
					id="phone-mask"
					label="Phone Number"
					placeholder="(555) 555-5555"
					mask="phone"
				/>
			</div>

			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="input"
					id="ssn-mask"
					label="Social Security Number"
					placeholder="***-**-****"
					mask="ssn"
				/>
			</div>

			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="input"
					id="creditcard-mask"
					label="Credit Card"
					placeholder="**** **** **** ****"
					mask="creditCard"
				/>
			</div>

			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="input"
					id="date-mask"
					label="Date"
					placeholder="MM/DD/YYYY"
					mask="date"
				/>
			</div>
		</div>
	</section>

	<!-- Textarea Variants and Features Section -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Textarea Variants & Features</h2>
			<p class="text-muted-foreground">Different styles and features for textarea fields</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="textarea"
					id="textarea-default"
					label="Default Textarea"
					placeholder="Enter your text..."
					variant="default"
				/>
			</div>

			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="textarea"
					id="textarea-outline"
					label="Outline Textarea"
					placeholder="Enter your text..."
					variant="outline"
				/>
			</div>

			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="textarea"
					id="textarea-counter"
					label="With Character Counter"
					description="Maximum 200 characters"
					placeholder="Enter your text..."
					maxLength={200}
					showCount
				/>
			</div>

			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="textarea"
					id="textarea-autoresize"
					label="Auto-Resize"
					description="Automatically grows with content"
					placeholder="Start typing..."
					autoResize
					minRows={2}
					maxRows={6}
				/>
			</div>

			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="textarea"
					id="textarea-resize-vertical"
					label="Vertical Resize"
					placeholder="Resize vertically only"
					resize="vertical"
				/>
			</div>

			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="textarea"
					id="textarea-resize-none"
					label="No Resize"
					placeholder="Cannot be resized"
					resize="none"
				/>
			</div>
		</div>
	</section>

	<!-- Checkbox Variants and Sizes Section -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Checkbox Variants & Sizes</h2>
			<p class="text-muted-foreground">Different styles and sizes for checkbox fields</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="checkbox"
					id="checkbox-default-variant"
					label="Default Variant"
					variant="default"
				/>
			</div>

			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="checkbox"
					id="checkbox-destructive"
					label="Destructive Variant"
					variant="destructive"
				/>
			</div>

			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="checkbox"
					id="checkbox-success"
					label="Success Variant"
					variant="success"
				/>
			</div>

			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="checkbox"
					id="checkbox-warning"
					label="Warning Variant"
					variant="warning"
				/>
			</div>
		</div>

		<div class="grid gap-6 md:grid-cols-4">
			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="checkbox"
					id="checkbox-sm"
					label="Small Size"
					size="sm"
				/>
			</div>

			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="checkbox"
					id="checkbox-default-size"
					label="Default Size"
					size="default"
				/>
			</div>

			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="checkbox"
					id="checkbox-lg"
					label="Large Size"
					size="lg"
				/>
			</div>

			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="checkbox"
					id="checkbox-xl"
					label="Extra Large"
					size="xl"
				/>
			</div>
		</div>
	</section>

	<!-- Switch Variants and Sizes Section -->
	<section class="space-y-6">
		<div>
			<h2 class="text-2xl font-bold">Switch Variants & Sizes</h2>
			<p class="text-muted-foreground">Different styles and sizes for switch fields</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="switch"
					id="switch-default-variant"
					label="Default Variant"
					description="Standard switch style"
					variant="default"
				/>
			</div>

			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="switch"
					id="switch-success"
					label="Success Variant"
					description="Success-themed switch"
					variant="success"
				/>
			</div>
		</div>

		<div class="grid gap-6 md:grid-cols-3">
			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="switch"
					id="switch-sm"
					label="Small Size"
					size="sm"
				/>
			</div>

			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="switch"
					id="switch-default-size"
					label="Default Size"
					size="default"
				/>
			</div>

			<div class="rounded-lg border bg-card p-4">
				<Field.Impl
					type="switch"
					id="switch-lg"
					label="Large Size"
					size="lg"
				/>
			</div>
		</div>
	</section>
</div>
