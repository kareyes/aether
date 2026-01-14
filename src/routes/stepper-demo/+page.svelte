<script lang="ts">
	import { Button } from "$core/components/ui/button/index.js";
	import { Stepper, StepperStep, StepperSeparator } from "$core/components/ui/stepper/index.js";
	import { Input } from "$core/components/ui/input/index.js";
	import { Label } from "$core/components/ui/label/index.js";
	import { Textarea } from "$core/components/ui/textarea/index.js";
	import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "$core/components/ui/card/index.js";
	import {
		User,
		CreditCard,
		CheckCircle,
		ShoppingCart,
		Package,
		Settings,
		Mail,
		Lock,
		MapPin,
		FileText,
		Briefcase,
		GraduationCap,
	} from "@lucide/svelte";

	// Basic stepper states
	let basicStep = $state(1);
	let verticalStep = $state(0);
	let clickableStep = $state(1);

	// Registration flow
	let registrationStep = $state(0);
	let registrationData = $state({
		email: "",
		password: "",
		name: "",
		phone: "",
		address: "",
	});

	function nextRegistrationStep() {
		if (registrationStep < 2) registrationStep++;
	}

	function previousRegistrationStep() {
		if (registrationStep > 0) registrationStep--;
	}

	// Checkout flow
	let checkoutStep = $state(1);
	let checkoutData = $state({
		items: 3,
		total: "$127.50",
		cardNumber: "",
		shippingMethod: "",
	});

	function nextCheckoutStep() {
		if (checkoutStep < 3) checkoutStep++;
	}

	function previousCheckoutStep() {
		if (checkoutStep > 0) checkoutStep--;
	}

	// Job application flow
	let applicationStep = $state(0);
	let applicationData = $state({
		fullName: "",
		email: "",
		position: "",
		experience: "",
		education: "",
		coverLetter: "",
	});

	function nextApplicationStep() {
		if (applicationStep < 2) applicationStep++;
	}

	function previousApplicationStep() {
		if (applicationStep > 0) applicationStep--;
	}

	function submitApplication() {
		console.log("Application submitted:", applicationData);
		alert("Application submitted successfully!");
	}

	// Results
	let result = $state<string>("");
</script>

<div class="container mx-auto max-w-7xl space-y-12 p-8">
	<div class="space-y-2">
		<h1 class="text-3xl font-bold">Stepper Component Demo</h1>
		<p class="text-muted-foreground">
			Comprehensive examples of the Stepper component with various orientations, sizes, variants, and use cases.
		</p>
	</div>

	<!-- Orientation Examples -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold">Orientations</h2>
			<p class="text-muted-foreground text-sm">Horizontal and vertical layout options.</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-2">
			<Card>
				<CardHeader>
					<CardTitle>Horizontal Stepper</CardTitle>
					<CardDescription>Default layout, perfect for wide screens</CardDescription>
				</CardHeader>
				<CardContent class="space-y-6">
					<Stepper bind:activeStep={basicStep}>
						<StepperStep step={0} label="Step 1" description="Choose a plan" />
						<StepperSeparator completed={basicStep > 0} />
						<StepperStep step={1} label="Step 2" description="Enter details" />
						<StepperSeparator completed={basicStep > 1} />
						<StepperStep step={2} label="Step 3" description="Confirm" />
					</Stepper>

					<div class="flex gap-3">
						<Button variant="outline" disabled={basicStep === 0} onclick={() => basicStep--}>
							Previous
						</Button>
						<Button disabled={basicStep === 2} onclick={() => basicStep++}>
							Next
						</Button>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Vertical Stepper</CardTitle>
					<CardDescription>Great for mobile and detailed steps</CardDescription>
				</CardHeader>
				<CardContent class="space-y-6">
					<Stepper orientation="vertical" bind:activeStep={verticalStep}>
						<StepperStep step={0} label="Personal Info" description="Enter your basic information" />
						<StepperSeparator completed={verticalStep > 0} />
						<StepperStep step={1} label="Address" description="Add your address details" />
						<StepperSeparator completed={verticalStep > 1} />
						<StepperStep step={2} label="Review" description="Review and submit" />
					</Stepper>

					<div class="flex gap-3">
						<Button variant="outline" disabled={verticalStep === 0} onclick={() => verticalStep--}>
							Previous
						</Button>
						<Button disabled={verticalStep === 2} onclick={() => verticalStep++}>
							Next
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	</section>

	<!-- Size & Variant Examples -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold">Sizes & Variants</h2>
			<p class="text-muted-foreground text-sm">Different sizes and visual styles.</p>
		</div>

		<div class="grid gap-6">
			<Card>
				<CardHeader>
					<CardTitle>Extra Small Size</CardTitle>
				</CardHeader>
				<CardContent>
					<Stepper size="xs" activeStep={1}>
						<StepperStep step={0} label="Start" />
						<StepperSeparator completed />
						<StepperStep step={1} label="Progress" />
						<StepperSeparator />
						<StepperStep step={2} label="Complete" />
					</Stepper>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Small Size</CardTitle>
				</CardHeader>
				<CardContent>
					<Stepper size="sm" activeStep={1}>
						<StepperStep step={0} label="Start" />
						<StepperSeparator completed />
						<StepperStep step={1} label="Progress" />
						<StepperSeparator />
						<StepperStep step={2} label="Complete" />
					</Stepper>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Default Size</CardTitle>
				</CardHeader>
				<CardContent>
					<Stepper size="default" activeStep={1}>
						<StepperStep step={0} label="Start" />
						<StepperSeparator completed />
						<StepperStep step={1} label="Progress" />
						<StepperSeparator />
						<StepperStep step={2} label="Complete" />
					</Stepper>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Large Size</CardTitle>
				</CardHeader>
				<CardContent>
					<Stepper size="lg" activeStep={1}>
						<StepperStep step={0} label="Start" />
						<StepperSeparator completed />
						<StepperStep step={1} label="Progress" />
						<StepperSeparator />
						<StepperStep step={2} label="Complete" />
					</Stepper>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Outline Variant</CardTitle>
				</CardHeader>
				<CardContent>
					<Stepper variant="outline" activeStep={1}>
						<StepperStep step={0} label="Start" description="Begin process" />
						<StepperSeparator completed />
						<StepperStep step={1} label="Progress" description="In progress" />
						<StepperSeparator />
						<StepperStep step={2} label="Complete" description="Finish" />
					</Stepper>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Ghost Variant</CardTitle>
				</CardHeader>
				<CardContent>
					<Stepper variant="ghost" activeStep={1}>
						<StepperStep step={0} label="Start" description="Begin process" />
						<StepperSeparator completed />
						<StepperStep step={1} label="Progress" description="In progress" />
						<StepperSeparator />
						<StepperStep step={2} label="Complete" description="Finish" />
					</Stepper>
				</CardContent>
			</Card>



			<Card>
				<CardHeader>
					<CardTitle>Flat Variant</CardTitle>
					<CardDescription>Horizontal progress bar style</CardDescription>
				</CardHeader>
				<CardContent class="pt-8 mt-8">
					<Stepper variant="flat" activeStep={1}>
						<StepperStep step={0} label="Personal Info" description="Completed" />
						<StepperSeparator completed />
						<StepperStep step={1} label="Education" description="Completed" />
						<StepperSeparator />
						<StepperStep step={2} label="Company" description="Pending" />
						<StepperSeparator />
						<StepperStep step={3} label="Testing" description="Pending" />
						<StepperSeparator />
						<StepperStep step={4} label="Review" description="Pending" />
					</Stepper>
				</CardContent>
			</Card>
		</div>
	</section>

	<!-- Interactive Features -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold">Interactive Features</h2>
			<p class="text-muted-foreground text-sm">Clickable steps and custom icons.</p>
		</div>

		<div class="grid gap-6">
			<Card>
				<CardHeader>
					<CardTitle>Clickable Steps</CardTitle>
					<CardDescription>Click on any step to navigate directly</CardDescription>
				</CardHeader>
				<CardContent>
					<Stepper
						clickable
						bind:activeStep={clickableStep}
						onStepClick={(step) => (result = `Clicked step ${step + 1}`)}
					>
						<StepperStep step={0} label="Step 1" description="First step" />
						<StepperSeparator completed={clickableStep > 0} />
						<StepperStep step={1} label="Step 2" description="Second step" />
						<StepperSeparator completed={clickableStep > 1} />
						<StepperStep step={2} label="Step 3" description="Third step" />
					</Stepper>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>With Custom Icons</CardTitle>
					<CardDescription>Using Lucide icons for visual clarity</CardDescription>
				</CardHeader>
				<CardContent>
					<Stepper activeStep={1}>
						<StepperStep step={0} label="Account" description="Create account">
							{#snippet icon()}
								<User class="size-4" />
							{/snippet}
						</StepperStep>
						<StepperSeparator completed />
						<StepperStep step={1} label="Payment" description="Add payment">
							{#snippet icon()}
								<CreditCard class="size-4" />
							{/snippet}
						</StepperStep>
						<StepperSeparator />
						<StepperStep step={2} label="Done" description="All set!">
							{#snippet icon()}
								<CheckCircle class="size-4" />
							{/snippet}
						</StepperStep>
					</Stepper>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Numbers Only</CardTitle>
					<CardDescription>Minimal stepper with just numbers</CardDescription>
				</CardHeader>
				<CardContent>
					<Stepper activeStep={2}>
						<StepperStep step={0} />
						<StepperSeparator completed />
						<StepperStep step={1} />
						<StepperSeparator completed />
						<StepperStep step={2} />
						<StepperSeparator />
						<StepperStep step={3} />
					</Stepper>
				</CardContent>
			</Card>
		</div>
	</section>

	<!-- Practical Examples -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold">Practical Examples</h2>
			<p class="text-muted-foreground text-sm">Real-world use cases and implementations.</p>
		</div>

		<!-- Registration Flow -->
		<Card>
			<CardHeader>
				<CardTitle>Registration Flow</CardTitle>
				<CardDescription>Multi-step account creation process</CardDescription>
			</CardHeader>
			<CardContent class="space-y-6">
				<Stepper bind:activeStep={registrationStep}>
					<StepperStep step={0} label="Account" description="Create your account">
						{#snippet icon()}
							<Mail class="size-4" />
						{/snippet}
					</StepperStep>
					<StepperSeparator completed={registrationStep > 0} />
					<StepperStep step={1} label="Profile" description="Personal information">
						{#snippet icon()}
							<User class="size-4" />
						{/snippet}
					</StepperStep>
					<StepperSeparator completed={registrationStep > 1} />
					<StepperStep step={2} label="Complete" description="Review and finish">
						{#snippet icon()}
							<CheckCircle class="size-4" />
						{/snippet}
					</StepperStep>
				</Stepper>

				<div class="min-h-[200px]">
					{#if registrationStep === 0}
						<div class="space-y-4">
							<h3 class="text-lg font-semibold">Create Your Account</h3>
							<div class="space-y-2">
								<Label for="reg-email">Email</Label>
								<Input id="reg-email" type="email" bind:value={registrationData.email} placeholder="john@example.com" />
							</div>
							<div class="space-y-2">
								<Label for="reg-password">Password</Label>
								<Input id="reg-password" type="password" bind:value={registrationData.password} placeholder="••••••••" />
							</div>
						</div>
					{:else if registrationStep === 1}
						<div class="space-y-4">
							<h3 class="text-lg font-semibold">Personal Information</h3>
							<div class="space-y-2">
								<Label for="reg-name">Full Name</Label>
								<Input id="reg-name" bind:value={registrationData.name} placeholder="John Doe" />
							</div>
							<div class="space-y-2">
								<Label for="reg-phone">Phone Number</Label>
								<Input id="reg-phone" bind:value={registrationData.phone} placeholder="+1 (555) 000-0000" />
							</div>
							<div class="space-y-2">
								<Label for="reg-address">Address</Label>
								<Textarea id="reg-address" bind:value={registrationData.address} placeholder="123 Main St" />
							</div>
						</div>
					{:else}
						<div class="space-y-4">
							<h3 class="text-lg font-semibold">Review Your Information</h3>
							<dl class="space-y-3">
								<div>
									<dt class="font-medium">Email:</dt>
									<dd class="text-muted-foreground">{registrationData.email || "Not provided"}</dd>
								</div>
								<div>
									<dt class="font-medium">Name:</dt>
									<dd class="text-muted-foreground">{registrationData.name || "Not provided"}</dd>
								</div>
								<div>
									<dt class="font-medium">Phone:</dt>
									<dd class="text-muted-foreground">{registrationData.phone || "Not provided"}</dd>
								</div>
								<div>
									<dt class="font-medium">Address:</dt>
									<dd class="text-muted-foreground">{registrationData.address || "Not provided"}</dd>
								</div>
							</dl>
						</div>
					{/if}
				</div>

				<div class="flex gap-3">
					{#if registrationStep > 0}
						<Button variant="outline" onclick={previousRegistrationStep}>
							Previous
						</Button>
					{/if}
					{#if registrationStep < 2}
						<Button onclick={nextRegistrationStep}>
							Next
						</Button>
					{:else}
						<Button onclick={() => (result = "Registration completed!")}>
							Complete Registration
						</Button>
					{/if}
				</div>
			</CardContent>
		</Card>

		<!-- Checkout Process -->
		<Card>
			<CardHeader>
				<CardTitle>Checkout Process</CardTitle>
				<CardDescription>E-commerce checkout flow with vertical stepper</CardDescription>
			</CardHeader>
			<CardContent class="space-y-6">
				<div class="grid gap-6 lg:grid-cols-[300px_1fr]">
					<Stepper orientation="vertical" bind:activeStep={checkoutStep} size="sm">
						<StepperStep step={0} label="Cart" description="Review items" completed>
							{#snippet icon()}
								<ShoppingCart class="size-4" />
							{/snippet}
						</StepperStep>
						<StepperSeparator completed />
						<StepperStep step={1} label="Payment" description="Payment details">
							{#snippet icon()}
								<CreditCard class="size-4" />
							{/snippet}
						</StepperStep>
						<StepperSeparator completed={checkoutStep > 1} />
						<StepperStep step={2} label="Shipping" description="Shipping method">
							{#snippet icon()}
								<Package class="size-4" />
							{/snippet}
						</StepperStep>
						<StepperSeparator completed={checkoutStep > 2} />
						<StepperStep step={3} label="Confirm" description="Place order">
							{#snippet icon()}
								<CheckCircle class="size-4" />
							{/snippet}
						</StepperStep>
					</Stepper>

					<div class="min-h-[300px]">
						{#if checkoutStep === 0}
							<div class="space-y-4">
								<h3 class="text-lg font-semibold">Your Cart</h3>
								<p class="text-sm text-muted-foreground">You have {checkoutData.items} items in your cart</p>
								<div class="text-2xl font-bold">{checkoutData.total}</div>
							</div>
						{:else if checkoutStep === 1}
							<div class="space-y-4">
								<h3 class="text-lg font-semibold">Payment Information</h3>
								<div class="space-y-2">
									<Label for="card-number">Card Number</Label>
									<Input id="card-number" bind:value={checkoutData.cardNumber} placeholder="1234 5678 9012 3456" />
								</div>
								<div class="grid grid-cols-2 gap-4">
									<div class="space-y-2">
										<Label for="expiry">Expiry Date</Label>
										<Input id="expiry" placeholder="MM/YY" />
									</div>
									<div class="space-y-2">
										<Label for="cvv">CVV</Label>
										<Input id="cvv" placeholder="123" />
									</div>
								</div>
							</div>
						{:else if checkoutStep === 2}
							<div class="space-y-4">
								<h3 class="text-lg font-semibold">Shipping Method</h3>
								<div class="space-y-2">
									<label class="flex items-center gap-3 rounded-lg border p-4 cursor-pointer hover:bg-muted">
										<input type="radio" name="shipping" value="standard" bind:group={checkoutData.shippingMethod} />
										<div>
											<div class="font-medium">Standard Shipping</div>
											<div class="text-sm text-muted-foreground">5-7 business days - Free</div>
										</div>
									</label>
									<label class="flex items-center gap-3 rounded-lg border p-4 cursor-pointer hover:bg-muted">
										<input type="radio" name="shipping" value="express" bind:group={checkoutData.shippingMethod} />
										<div>
											<div class="font-medium">Express Shipping</div>
											<div class="text-sm text-muted-foreground">2-3 business days - $12.99</div>
										</div>
									</label>
								</div>
							</div>
						{:else}
							<div class="space-y-4">
								<h3 class="text-lg font-semibold">Review Order</h3>
								<dl class="space-y-2">
									<div class="flex justify-between">
										<dt>Items:</dt>
										<dd>{checkoutData.items}</dd>
									</div>
									<div class="flex justify-between">
										<dt>Subtotal:</dt>
										<dd>{checkoutData.total}</dd>
									</div>
									<div class="flex justify-between">
										<dt>Shipping:</dt>
										<dd>{checkoutData.shippingMethod === "express" ? "$12.99" : "Free"}</dd>
									</div>
									<div class="flex justify-between text-lg font-bold border-t pt-2">
										<dt>Total:</dt>
										<dd>{checkoutData.shippingMethod === "express" ? "$140.49" : checkoutData.total}</dd>
									</div>
								</dl>
							</div>
						{/if}
					</div>
				</div>

				<div class="flex gap-3">
					{#if checkoutStep > 0}
						<Button variant="outline" onclick={previousCheckoutStep}>
							Previous
						</Button>
					{/if}
					{#if checkoutStep < 3}
						<Button onclick={nextCheckoutStep}>
							Continue
						</Button>
					{:else}
						<Button onclick={() => (result = "Order placed successfully!")}>
							Place Order
						</Button>
					{/if}
				</div>
			</CardContent>
		</Card>

		<!-- Job Application -->
		<Card>
			<CardHeader>
				<CardTitle>Job Application</CardTitle>
				<CardDescription>Multi-step job application form</CardDescription>
			</CardHeader>
			<CardContent class="space-y-6">
				<Stepper bind:activeStep={applicationStep} clickable>
					<StepperStep step={0} label="Personal" description="Basic info">
						{#snippet icon()}
							<User class="size-4" />
						{/snippet}
					</StepperStep>
					<StepperSeparator completed={applicationStep > 0} />
					<StepperStep step={1} label="Experience" description="Work history">
						{#snippet icon()}
							<Briefcase class="size-4" />
						{/snippet}
					</StepperStep>
					<StepperSeparator completed={applicationStep > 1} />
					<StepperStep step={2} label="Review" description="Submit">
						{#snippet icon()}
							<FileText class="size-4" />
						{/snippet}
					</StepperStep>
				</Stepper>

				<div class="min-h-[250px]">
					{#if applicationStep === 0}
						<div class="space-y-4">
							<h3 class="text-lg font-semibold">Personal Information</h3>
							<div class="grid gap-4 sm:grid-cols-2">
								<div class="space-y-2">
									<Label for="app-name">Full Name</Label>
									<Input id="app-name" bind:value={applicationData.fullName} />
								</div>
								<div class="space-y-2">
									<Label for="app-email">Email</Label>
									<Input id="app-email" type="email" bind:value={applicationData.email} />
								</div>
							</div>
							<div class="space-y-2">
								<Label for="app-position">Position Applied For</Label>
								<Input id="app-position" bind:value={applicationData.position} />
							</div>
						</div>
					{:else if applicationStep === 1}
						<div class="space-y-4">
							<h3 class="text-lg font-semibold">Experience & Education</h3>
							<div class="space-y-2">
								<Label for="app-experience">Work Experience</Label>
								<Textarea id="app-experience" bind:value={applicationData.experience} rows={4} />
							</div>
							<div class="space-y-2">
								<Label for="app-education">Education</Label>
								<Textarea id="app-education" bind:value={applicationData.education} rows={3} />
							</div>
						</div>
					{:else}
						<div class="space-y-4">
							<h3 class="text-lg font-semibold">Review Application</h3>
							<dl class="space-y-2">
								<div>
									<dt class="font-medium">Name:</dt>
									<dd class="text-muted-foreground">{applicationData.fullName || "Not provided"}</dd>
								</div>
								<div>
									<dt class="font-medium">Email:</dt>
									<dd class="text-muted-foreground">{applicationData.email || "Not provided"}</dd>
								</div>
								<div>
									<dt class="font-medium">Position:</dt>
									<dd class="text-muted-foreground">{applicationData.position || "Not provided"}</dd>
								</div>
							</dl>
						</div>
					{/if}
				</div>

				<div class="flex gap-3">
					{#if applicationStep > 0}
						<Button variant="outline" onclick={previousApplicationStep}>
							Previous
						</Button>
					{/if}
					{#if applicationStep < 2}
						<Button onclick={nextApplicationStep}>
							Next
						</Button>
					{:else}
						<Button onclick={submitApplication}>
							Submit Application
						</Button>
					{/if}
				</div>
			</CardContent>
		</Card>
	</section>

	<!-- Custom Content Examples -->
	<section class="space-y-6">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold">Custom Label & Description</h2>
			<p class="text-muted-foreground text-sm">Using children snippet for custom step content.</p>
		</div>

		<Card>
			<CardHeader>
				<CardTitle>Custom Rich Content</CardTitle>
				<CardDescription>Use children snippet to provide custom label and description with rich formatting</CardDescription>
			</CardHeader>
			<CardContent class="space-y-6">
				<Stepper activeStep={1}>
					<StepperStep step={0}>
						{#snippet icon()}
							<User class="size-4" />
						{/snippet}
						<div class="space-y-1">
							<div class="font-medium">Account Setup</div>
							<div class="text-sm text-muted-foreground">Create your credentials</div>
						</div>
					</StepperStep>
					<StepperSeparator completed />
					<StepperStep step={1}>
						{#snippet icon()}
							<Settings class="size-4" />
						{/snippet}
						<div class="space-y-1">
							<div class="font-medium flex items-center gap-2">
								Configuration
								<span class="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Active</span>
							</div>
							<div class="text-sm text-muted-foreground">Customize your settings</div>
						</div>
					</StepperStep>
					<StepperSeparator />
					<StepperStep step={2}>
						{#snippet icon()}
							<CheckCircle class="size-4" />
						{/snippet}
						<div class="space-y-1">
							<div class="font-medium">Completion</div>
							<div class="text-sm text-muted-foreground">Review and launch</div>
						</div>
					</StepperStep>
				</Stepper>
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Custom Styling</CardTitle>
				<CardDescription>Apply custom styles and components within step content</CardDescription>
			</CardHeader>
			<CardContent class="space-y-6">
				<div class="max-w-md">
					<Stepper orientation="vertical" activeStep={1} size="lg">
						<StepperStep step={0}>
							{#snippet icon()}
								<Package class="size-5" />
							{/snippet}
							<div class="space-y-2 pb-4">
								<div class="font-semibold text-base">Order Placed</div>
								<div class="text-sm text-muted-foreground">
									Your order <span class="font-mono text-foreground">#ORD-12345</span> has been confirmed
								</div>
								<div class="text-xs text-muted-foreground">Jan 14, 2026 • 10:30 AM</div>
							</div>
						</StepperStep>
						<StepperSeparator completed />
						<StepperStep step={1}>
							{#snippet icon()}
								<ShoppingCart class="size-5" />
							{/snippet}
							<div class="space-y-2 pb-4">
								<div class="font-semibold text-base flex items-center gap-2">
									Processing
									<span class="inline-flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
								</div>
								<div class="text-sm text-muted-foreground">
									Your order is being prepared for shipment
								</div>
								<div class="text-xs text-muted-foreground">Estimated: 2-3 hours</div>
							</div>
						</StepperStep>
						<StepperSeparator />
						<StepperStep step={2}>
							{#snippet icon()}
								<MapPin class="size-5" />
							{/snippet}
							<div class="space-y-2">
								<div class="font-semibold text-base">Out for Delivery</div>
								<div class="text-sm text-muted-foreground">
									Package will arrive at your address
								</div>
								<div class="text-xs text-muted-foreground">Pending</div>
							</div>
						</StepperStep>
					</Stepper>
				</div>
			</CardContent>
		</Card>

		<div class="grid gap-6 md:grid-cols-2">
			<Card>
				<CardHeader>
					<CardTitle>With Status Badges</CardTitle>
				</CardHeader>
				<CardContent>
					<Stepper activeStep={1} variant="outline">
						<StepperStep step={0}>
							{#snippet icon()}
								<FileText class="size-4" />
							{/snippet}
							<div class="space-y-1">
								<div class="font-medium text-sm">Draft</div>
								<div class="text-xs text-green-600 dark:text-green-400">✓ Completed</div>
							</div>
						</StepperStep>
						<StepperSeparator completed />
						<StepperStep step={1}>
							{#snippet icon()}
								<User class="size-4" />
							{/snippet}
							<div class="space-y-1">
								<div class="font-medium text-sm">Review</div>
								<div class="text-xs text-blue-600 dark:text-blue-400">⟳ In Progress</div>
							</div>
						</StepperStep>
						<StepperSeparator />
						<StepperStep step={2}>
							{#snippet icon()}
								<CheckCircle class="size-4" />
							{/snippet}
							<div class="space-y-1">
								<div class="font-medium text-sm">Publish</div>
								<div class="text-xs text-muted-foreground">○ Pending</div>
							</div>
						</StepperStep>
					</Stepper>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>With Time Estimates</CardTitle>
				</CardHeader>
				<CardContent>
					<Stepper activeStep={0} variant="ghost">
						<StepperStep step={0}>
							{#snippet icon()}
								<Briefcase class="size-4" />
							{/snippet}
							<div class="space-y-0.5">
								<div class="font-medium text-sm">Interview</div>
								<div class="text-xs text-muted-foreground">~30 minutes</div>
							</div>
						</StepperStep>
						<StepperSeparator />
						<StepperStep step={1}>
							{#snippet icon()}
								<GraduationCap class="size-4" />
							{/snippet}
							<div class="space-y-0.5">
								<div class="font-medium text-sm">Assessment</div>
								<div class="text-xs text-muted-foreground">~45 minutes</div>
							</div>
						</StepperStep>
						<StepperSeparator />
						<StepperStep step={2}>
							{#snippet icon()}
								<CheckCircle class="size-4" />
							{/snippet}
							<div class="space-y-0.5">
								<div class="font-medium text-sm">Results</div>
								<div class="text-xs text-muted-foreground">Instant</div>
							</div>
						</StepperStep>
					</Stepper>
				</CardContent>
			</Card>
		</div>
	</section>

	<!-- Result Display -->
	{#if result}
		<Card class="border-primary bg-primary/5">
			<CardContent class="flex items-start gap-3 pt-6">
				<CheckCircle class="size-5 mt-0.5 text-primary" />
				<div class="flex-1">
					<p class="text-sm font-medium">Action Result:</p>
					<p class="text-sm text-muted-foreground">{result}</p>
				</div>
				<Button variant="ghost" size="sm" onclick={() => (result = "")} class="size-6 p-0">
					×
				</Button>
			</CardContent>
		</Card>
	{/if}

	<!-- Documentation Link -->
	<section class="rounded-lg border-2 border-dashed p-6 text-center">
		<h3 class="text-lg font-semibold mb-2">Documentation</h3>
		<p class="text-muted-foreground text-sm mb-4">
			Check out the full documentation for more details on using the Stepper component.
		</p>
		<Button variant="outline">
			<FileText class="size-4 mr-2" />
			View Documentation
		</Button>
	</section>
</div>
