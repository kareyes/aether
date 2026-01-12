<script lang="ts">
	import { Input } from '$core/components/ui/input';
	import { InputGroupButton } from '$core/components/ui/input-group';
	import { Search, Mail, DollarSign, Lock, Eye, EyeOff, Copy, Check, Send, User, Phone, CreditCard } from '@lucide/svelte';
	import { Card } from '$core/components/ui/card';
	import * as Field from '$core/components/ui/field';
	import { Button } from '$core/components/ui/button';

	let searchValue = $state('');
	let emailValue = $state('');
	let priceValue = $state('');
	let passwordValue = $state('');
	let showPassword = $state(false);
	let copiedUrl = $state(false);
	let urlValue = $state('https://example.com');
	let messageValue = $state('');
	let usernameValue = $state('');
	
	// Field demo state
	let formData = $state({
		email: '',
		password: '',
		username: '',
		phone: '',
		price: '',
		apiKey: 'sk_live_1234567890abcdef',
	});
	
	let errors = $state<Record<string, string>>({});
	let showFormPassword = $state(false);

	function handleCopy() {
		navigator.clipboard.writeText(urlValue);
		copiedUrl = true;
		setTimeout(() => copiedUrl = false, 2000);
	}

	function handleSend() {
		console.log('Sending message:', messageValue);
		messageValue = '';
	}
	
	function validateForm() {
		errors = {};
		if (!formData.email) errors.email = 'Email is required';
		else if (!formData.email.includes('@')) errors.email = 'Invalid email address';
		if (!formData.password) errors.password = 'Password is required';
		else if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters';
		if (!formData.username) errors.username = 'Username is required';
	}
</script>

<div class="container mx-auto p-6 space-y-8">
	<div class="text-center space-y-2">
		<h1 class="text-4xl font-bold">Input Component</h1>
		<p class="text-muted-foreground">Enhanced input with built-in InputGroup addon support, masks, and variants</p>
	</div>

	<!-- Basic Input -->
	<section class="space-y-4">
		<div class="space-y-1">
			<h2 class="text-2xl font-semibold">Basic Input</h2>
			<p class="text-sm text-muted-foreground">Standard input without addons</p>
		</div>

		<Card class="p-6">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
				<div class="space-y-2">
					<label for="basic-text" class="text-sm font-medium">Text Input</label>
					<Input id="basic-text" placeholder="Enter text..." />
				</div>

				<div class="space-y-2">
					<label for="basic-email" class="text-sm font-medium">Email Input</label>
					<Input id="basic-email" type="email" placeholder="Enter email..." />
				</div>

				<div class="space-y-2">
					<label for="basic-password" class="text-sm font-medium">Password Input</label>
					<Input id="basic-password" type="password" placeholder="Enter password..." />
				</div>

				<div class="space-y-2">
					<label for="basic-number" class="text-sm font-medium">Number Input</label>
					<Input id="basic-number" type="number" placeholder="Enter number..." />
				</div>
			</div>
		</Card>
	</section>

	<!-- Icon Addons -->
	<section class="space-y-4">
		<div class="space-y-1">
			<h2 class="text-2xl font-semibold">Icon Addons</h2>
			<p class="text-sm text-muted-foreground">Add icons to enhance visual clarity</p>
		</div>

		<Card class="p-6">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
				<!-- Start Icon -->
				<div class="space-y-2">
					<label class="text-sm font-medium">Search (Start Icon)</label>
					<Input
						bind:value={searchValue}
						placeholder="Search..."
					>
						{#snippet startIcon()}
							<Search class="size-4" />
						{/snippet}
					</Input>
				</div>

				<!-- End Icon -->
				<div class="space-y-2">
					<label class="text-sm font-medium">Email (End Icon)</label>
					<Input
						bind:value={emailValue}
						type="email"
						placeholder="Enter your email"
					>
						{#snippet endIcon()}
							<Mail class="size-4" />
						{/snippet}
					</Input>
				</div>

				<!-- Both Icons -->
				<div class="space-y-2">
					<label class="text-sm font-medium">Price (Both Icons)</label>
					<Input
						bind:value={priceValue}
						type="number"
						placeholder="0.00"
					>
						{#snippet startIcon()}
							<DollarSign class="size-4" />
						{/snippet}
						{#snippet endIcon()}
							<span class="text-xs text-muted-foreground">USD</span>
						{/snippet}
					</Input>
				</div>

				<!-- Password with Toggle -->
				<div class="space-y-2">
					<label class="text-sm font-medium">Password (Interactive Icon)</label>
					<Input
						bind:value={passwordValue}
						type={showPassword ? "text" : "password"}
						placeholder="Enter password"
					>
						{#snippet startIcon()}
							<Lock class="size-4" />
						{/snippet}
						{#snippet endButton()}
							<InputGroupButton
								size="icon-xs"
								variant="ghost"
								onclick={() => showPassword = !showPassword}
								aria-label={showPassword ? "Hide password" : "Show password"}
							>
								{#if showPassword}
									<EyeOff class="size-4" />
								{:else}
									<Eye class="size-4" />
								{/if}
							</InputGroupButton>
						{/snippet}
					</Input>
				</div>
			</div>
		</Card>
	</section>

	<!-- Text Addons -->
	<section class="space-y-4">
		<div class="space-y-1">
			<h2 class="text-2xl font-semibold">Text Addons</h2>
			<p class="text-sm text-muted-foreground">Display additional text context</p>
		</div>

		<Card class="p-6">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
				<!-- URL Prefix -->
				<div class="space-y-2">
					<label class="text-sm font-medium">Website URL</label>
					<Input
						placeholder="example.com"
						startText="https://"
						endText=".com"
					/>
				</div>

				<!-- Currency -->
				<div class="space-y-2">
					<label class="text-sm font-medium">Price</label>
					<Input
						type="number"
						placeholder="0.00"
						startText="$"
						endText="USD"
					/>
				</div>

				<!-- Email Domain -->
				<div class="space-y-2">
					<label class="text-sm font-medium">Company Email</label>
					<Input
						bind:value={usernameValue}
						placeholder="username"
						endText="@company.com"
					>
						{#snippet startIcon()}
							<User class="size-4" />
						{/snippet}
					</Input>
				</div>

				<!-- Unit Suffix -->
				<div class="space-y-2">
					<label class="text-sm font-medium">Weight</label>
					<Input
						type="number"
						placeholder="0"
						endText="kg"
					/>
				</div>
			</div>
		</Card>
	</section>

	<!-- Button Addons -->
	<section class="space-y-4">
		<div class="space-y-1">
			<h2 class="text-2xl font-semibold">Button Addons</h2>
			<p class="text-sm text-muted-foreground">Add interactive buttons for actions</p>
		</div>

		<Card class="p-6">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
				<!-- Copy Button -->
				<div class="space-y-2">
					<label class="text-sm font-medium">Share URL</label>
					<Input
						bind:value={urlValue}
						readonly
					>
						{#snippet endButton()}
							<InputGroupButton
								size="icon-xs"
								onclick={handleCopy}
								aria-label="Copy URL"
							>
								{#if copiedUrl}
									<Check class="size-4 text-green-500" />
								{:else}
									<Copy class="size-4" />
								{/if}
							</InputGroupButton>
						{/snippet}
					</Input>
				</div>

				<!-- Search Button -->
				<div class="space-y-2">
					<label class="text-sm font-medium">Search</label>
					<Input
						placeholder="Type to search..."
					>
						{#snippet startIcon()}
							<Search class="size-4" />
						{/snippet}
						{#snippet endButton()}
							<InputGroupButton size="xs" variant="default">
								Search
							</InputGroupButton>
						{/snippet}
					</Input>
				</div>

				<!-- Send Message -->
				<div class="space-y-2">
					<label class="text-sm font-medium">Quick Message</label>
					<Input
						bind:value={messageValue}
						placeholder="Type your message..."
					>
						{#snippet endButton()}
							<InputGroupButton
								size="icon-xs"
								variant="default"
								onclick={handleSend}
								disabled={!messageValue}
								aria-label="Send message"
							>
								<Send class="size-4" />
							</InputGroupButton>
						{/snippet}
					</Input>
				</div>

				<!-- Clear Button -->
				<div class="space-y-2">
					<label class="text-sm font-medium">Clearable Input</label>
					<Input
						bind:value={searchValue}
						placeholder="Type something..."
					>
						{#if searchValue}
							{#snippet endButton()}
								<InputGroupButton
									size="icon-xs"
									variant="ghost"
									onclick={() => searchValue = ''}
									aria-label="Clear"
								>
									<span class="text-lg">×</span>
								</InputGroupButton>
							{/snippet}
						{/if}
					</Input>
				</div>
			</div>
		</Card>
	</section>

	<!-- Input Masks -->
	<section class="space-y-4">
		<div class="space-y-1">
			<h2 class="text-2xl font-semibold">Input Masks</h2>
			<p class="text-sm text-muted-foreground">Automatic formatting with input masks</p>
		</div>

		<Card class="p-6">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
				<!-- Phone -->
				<div class="space-y-2">
					<label class="text-sm font-medium">Phone Number</label>
					<Input
						mask="phone"
						placeholder="(555) 555-5555"
					>
						{#snippet startIcon()}
							<Phone class="size-4" />
						{/snippet}
					</Input>
				</div>

				<!-- Credit Card -->
				<div class="space-y-2">
					<label class="text-sm font-medium">Credit Card</label>
					<Input
						mask="creditCard"
						placeholder="1234 5678 9012 3456"
					>
						{#snippet startIcon()}
							<CreditCard class="size-4" />
						{/snippet}
					</Input>
				</div>

				<!-- SSN -->
				<div class="space-y-2">
					<label class="text-sm font-medium">SSN</label>
					<Input
						mask="ssn"
						placeholder="123-45-6789"
					/>
				</div>

				<!-- Date -->
				<div class="space-y-2">
					<label class="text-sm font-medium">Date</label>
					<Input
						mask="date"
						placeholder="MM/DD/YYYY"
					/>
				</div>
			</div>
		</Card>
	</section>

	<!-- Combined Features -->
	<section class="space-y-4">
		<div class="space-y-1">
			<h2 class="text-2xl font-semibold">Combined Features</h2>
			<p class="text-sm text-muted-foreground">Mix addons with masks and other features</p>
		</div>

		<Card class="p-6">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
				<!-- Phone with Icon and Mask -->
				<div class="space-y-2">
					<label class="text-sm font-medium">Contact Number</label>
					<Input
						mask="phone"
						placeholder="(555) 555-5555"
					>
						{#snippet startIcon()}
							<Phone class="size-4" />
						{/snippet}
						{#snippet endButton()}
							<InputGroupButton size="icon-xs" variant="ghost">
								<Copy class="size-4" />
							</InputGroupButton>
						{/snippet}
					</Input>
				</div>

				<!-- Price with Icons and Text -->
				<div class="space-y-2">
					<label class="text-sm font-medium">Secure Payment</label>
					<Input
						type="number"
						placeholder="0.00"
						startText="$"
					>
						{#snippet endIcon()}
							<Lock class="size-4 text-green-600" />
						{/snippet}
						{#snippet endText()}
							<span class="text-xs text-muted-foreground">Secure</span>
						{/snippet}
					</Input>
				</div>
			</div>
		</Card>
	</section>

	<!-- States -->
	<section class="space-y-4">
		<div class="space-y-1">
			<h2 class="text-2xl font-semibold">Input States</h2>
			<p class="text-sm text-muted-foreground">Different input states with addons</p>
		</div>

		<Card class="p-6">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
				<!-- Error State -->
				<div class="space-y-2">
					<label class="text-sm font-medium">Error State</label>
					<Input
						value="invalid@"
						error={true}
						placeholder="Enter email"
					>
						{#snippet startIcon()}
							<Mail class="size-4" />
						{/snippet}
					</Input>
					<p class="text-xs text-destructive">Please enter a valid email address</p>
				</div>

				<!-- Disabled State -->
				<div class="space-y-2">
					<label class="text-sm font-medium">Disabled State</label>
					<Input
						value="Disabled input"
						disabled
					>
						{#snippet startIcon()}
							<Lock class="size-4" />
						{/snippet}
					</Input>
				</div>

				<!-- Readonly State -->
				<div class="space-y-2">
					<label class="text-sm font-medium">Readonly State</label>
					<Input
						value="Read-only value"
						readonly
					>
						{#snippet endIcon()}
							<Eye class="size-4" />
						{/snippet}
					</Input>
				</div>
			</div>
		</Card>
	</section>

	<!-- Custom Addons -->
	<section class="space-y-4">
		<div class="space-y-1">
			<h2 class="text-2xl font-semibold">Custom Addons</h2>
			<p class="text-sm text-muted-foreground">Use custom snippets for complete control</p>
		</div>

		<Card class="p-6">
			<div class="grid grid-cols-1 gap-6 max-w-2xl">
				<div class="space-y-2">
					<label class="text-sm font-medium">Custom Start Addon</label>
					<Input placeholder="Enter value">
						{#snippet startAddon()}
							<div class="flex items-center gap-2">
								<div class="size-2 rounded-full bg-green-500 animate-pulse"></div>
								<span class="text-xs font-medium">Live</span>
							</div>
						{/snippet}
					</Input>
				</div>

				<div class="space-y-2">
					<label class="text-sm font-medium">Custom End Addon</label>
					<Input placeholder="Type your message...">
						{#snippet endAddon()}
							<div class="flex items-center gap-1">
								<InputGroupButton size="icon-xs" variant="ghost">
									<span>😀</span>
								</InputGroupButton>
								<InputGroupButton size="icon-xs" variant="default">
									<Send class="size-4" />
								</InputGroupButton>
							</div>
						{/snippet}
					</Input>
				</div>
			</div>
		</Card>
	</section>

	<!-- With Field Component -->
	<section class="space-y-4">
		<div class="space-y-1">
			<h2 class="text-2xl font-semibold">Using Input with Field Component</h2>
			<p class="text-sm text-muted-foreground">Recommended pattern for forms with labels, descriptions, and error handling</p>
		</div>

		<Card class="p-6">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
				<Field.Field
					label="Email"
					description="We'll never share your email"
					required
					error={errors.email}
				>
					<Input 
						type="email" 
						bind:value={formData.email}
						placeholder="you@example.com"
						error={!!errors.email}
					>
						{#snippet startIcon()}
							<Mail class="size-4" />
						{/snippet}
					</Input>
				</Field.Field>

				<Field.Field
					label="Username"
					description="Choose a unique username"
					required
					error={errors.username}
				>
					<Input 
						bind:value={formData.username}
						placeholder="johndoe"
						error={!!errors.username}
					>
						{#snippet startIcon()}
							<User class="size-4" />
						{/snippet}
					</Input>
				</Field.Field>

				<Field.Field
					label="Password"
					description="Must be at least 8 characters"
					required
					error={errors.password}
				>
					<Input 
						type={showFormPassword ? "text" : "password"}
						bind:value={formData.password}
						placeholder="••••••••"
						error={!!errors.password}
					>
						{#snippet startIcon()}
							<Lock class="size-4" />
						{/snippet}
						{#snippet endButton()}
							<InputGroupButton
								size="icon-xs"
								variant="ghost"
								onclick={() => showFormPassword = !showFormPassword}
							>
								{#if showFormPassword}
									<EyeOff class="size-4" />
								{:else}
									<Eye class="size-4" />
								{/if}
							</InputGroupButton>
						{/snippet}
					</Input>
				</Field.Field>

				<Field.Field
					label="Phone Number"
					description="Enter your phone number"
				>
					<Input 
						bind:value={formData.phone}
						mask="phone"
						placeholder="(555) 555-5555"
					>
						{#snippet startIcon()}
							<Phone class="size-4" />
						{/snippet}
					</Input>
				</Field.Field>

				<Field.Field
					label="Price"
					description="Enter the product price"
				>
					<Input 
						type="number"
						bind:value={formData.price}
						placeholder="0.00"
						startText="$"
						endText="USD"
					/>
				</Field.Field>

				<Field.Field
					label="API Key"
					description="Your secret API key (read-only)"
				>
					<Input 
						value={formData.apiKey}
						readonly
					>
						{#snippet endButton()}
							<InputGroupButton 
								size="icon-xs"
								onclick={() => navigator.clipboard.writeText(formData.apiKey)}
							>
								<Copy class="size-4" />
							</InputGroupButton>
						{/snippet}
					</Input>
				</Field.Field>
			</div>

			<div class="mt-6">
				<Button onclick={validateForm}>Validate Form</Button>
			</div>
		</Card>
	</section>

	<!-- Complete Form Example -->
	<section class="space-y-4">
		<div class="space-y-1">
			<h2 class="text-2xl font-semibold">Complete Form with Field Component</h2>
			<p class="text-sm text-muted-foreground">Full form using Field.Set and Field.Group for proper structure</p>
		</div>

		<Card class="p-6">
			<form class="max-w-2xl" onsubmit={(e) => { e.preventDefault(); validateForm(); }}>
				<Field.Set>
					<Field.Legend>Create Account</Field.Legend>
					<Field.Description>
						Enter your details to create a new account
					</Field.Description>

					<Field.Separator />

					<Field.Group class="gap-6">
						<Field.Field
							label="Email Address"
							description="We'll send a verification email"
							required
							error={errors.email}
						>
							<Input 
								type="email"
								bind:value={formData.email}
								placeholder="you@example.com"
								error={!!errors.email}
							>
								{#snippet startIcon()}
									<Mail class="size-4" />
								{/snippet}
							</Input>
						</Field.Field>

						<Field.Field
							label="Username"
							description="Choose a unique username (3-20 characters)"
							required
							error={errors.username}
						>
							<Input 
								bind:value={formData.username}
								placeholder="johndoe"
								error={!!errors.username}
								minlength={3}
								maxlength={20}
							>
								{#snippet startIcon()}
									<User class="size-4" />
								{/snippet}
							</Input>
						</Field.Field>

						<Field.Field
							label="Password"
							description="Must be at least 8 characters with a mix of letters and numbers"
							required
							error={errors.password}
						>
							<Input 
								type={showFormPassword ? "text" : "password"}
								bind:value={formData.password}
								placeholder="••••••••"
								error={!!errors.password}
							>
								{#snippet startIcon()}
									<Lock class="size-4" />
								{/snippet}
								{#snippet endButton()}
									<InputGroupButton
										size="icon-xs"
										variant="ghost"
										onclick={() => showFormPassword = !showFormPassword}
										aria-label={showFormPassword ? "Hide password" : "Show password"}
									>
										{#if showFormPassword}
											<EyeOff class="size-4" />
										{:else}
											<Eye class="size-4" />
										{/if}
									</InputGroupButton>
								{/snippet}
							</Input>
						</Field.Field>

						<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Field.Field
								label="Phone Number"
								description="For account verification"
							>
								<Input 
									bind:value={formData.phone}
									mask="phone"
									placeholder="(555) 555-5555"
								>
									{#snippet startIcon()}
										<Phone class="size-4" />
									{/snippet}
								</Input>
							</Field.Field>

							<Field.Field
								label="Credit Card"
								description="Payment information"
							>
								<Input 
									mask="creditCard"
									placeholder="1234 5678 9012 3456"
								>
									{#snippet startIcon()}
										<CreditCard class="size-4" />
									{/snippet}
								</Input>
							</Field.Field>
						</div>
					</Field.Group>

					<div class="flex gap-4 pt-4">
						<Button type="submit">Create Account</Button>
						<Button type="button" variant="outline">Cancel</Button>
					</div>
				</Field.Set>
			</form>
		</Card>
	</section>
</div>
