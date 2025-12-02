<script lang="ts">
	import { NumberSpinner } from "$core/components/ui/number-spinner";
	import * as Field from "$core/components/ui/field";
	import { Badge } from "$core/components/ui/badge";

	let basicValue = $state(0);
	let quantityValue = $state(1);
	let priceValue = $state(9.99);
	let temperatureValue = $state(20.5);
	let ageValue = $state(null);
	let cartQuantity1 = $state(1);
	let cartQuantity2 = $state(2);
	let cartQuantity3 = $state(1);
	let formQuantity = $state(1);
	let formPrice = $state(0);
	let formAge = $state(null);

	// Derived values
	const totalCartItems = $derived((cartQuantity1 ?? 0) + (cartQuantity2 ?? 0) + (cartQuantity3 ?? 0));
	const formValid = $derived(formQuantity > 0 && formPrice > 0 && formAge !== null && formAge > 0);
</script>

<svelte:head>
	<title>Number Spinner Demo - Aether UI</title>
</svelte:head>

<div class="container mx-auto p-8 space-y-12">
	<div class="space-y-4">
		<h1 class="text-4xl font-bold">Number Spinner Demo</h1>
		<p class="text-lg text-muted-foreground">
			A comprehensive number input component with increment/decrement controls, supporting various
			layouts and features.
		</p>
	</div>

	<!-- Basic Usage -->
	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Basic Usage</h2>

		<div class="grid gap-8 md:grid-cols-2">
			<div class="space-y-2">
				<h3 class="text-lg font-medium">Simple Number Spinner</h3>
				<NumberSpinner bind:value={basicValue} min={0} max={100} />
				<p class="text-sm text-muted-foreground">
					Current value: <Badge variant="secondary">{basicValue}</Badge>
				</p>
			</div>

			<div class="space-y-2">
				<h3 class="text-lg font-medium">With Constraints</h3>
				<NumberSpinner bind:value={quantityValue} min={1} max={99} />
				<p class="text-sm text-muted-foreground">
					Quantity: <Badge variant="outline">{quantityValue}</Badge>
				</p>
			</div>
		</div>
	</section>

	<!-- Variants -->
	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Variants</h2>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
			<div class="space-y-2">
				<h3 class="text-sm font-medium">Default</h3>
				<NumberSpinner variant="default" value={10} />
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium">Outline</h3>
				<NumberSpinner variant="outline" value={10} />
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium">Filled</h3>
				<NumberSpinner variant="filled" value={10} />
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium">Ghost</h3>
				<NumberSpinner variant="ghost" value={10} />
			</div>
		</div>
	</section>

	<!-- Sizes -->
	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Sizes</h2>

		<div class="grid gap-8 md:grid-cols-3">
			<div class="space-y-2">
				<h3 class="text-sm font-medium">Small</h3>
				<NumberSpinner size="sm" value={5} min={0} max={10} />
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium">Default</h3>
				<NumberSpinner size="default" value={5} min={0} max={10} />
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium">Large</h3>
				<NumberSpinner size="lg" value={5} min={0} max={10} />
			</div>
		</div>
	</section>

	<!-- Orientations -->
	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Orientations</h2>

		<div class="grid gap-8 md:grid-cols-2">
			<div class="space-y-2">
				<h3 class="text-lg font-medium">Vertical (Default)</h3>
				<NumberSpinner orientation="vertical" value={10} min={0} max={20} />
				<p class="text-sm text-muted-foreground">
					Buttons are positioned vertically on the right
				</p>
			</div>

			<div class="space-y-2">
				<h3 class="text-lg font-medium">Horizontal</h3>
				<NumberSpinner orientation="horizontal" value={10} min={0} max={20} />
				<p class="text-sm text-muted-foreground">Buttons are positioned on both sides</p>
			</div>
		</div>
	</section>

	<!-- Advanced Features -->
	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Advanced Features</h2>

		<div class="grid gap-8 md:grid-cols-2">
			<div class="space-y-2">
				<h3 class="text-lg font-medium">Price Input (Decimal Precision)</h3>
				<NumberSpinner
					bind:value={priceValue}
					min={0}
					max={9999.99}
					step={0.01}
					precision={2}
					placeholder="0.00"
					variant="outline"
				/>
				<p class="text-sm text-muted-foreground">
					Price: <Badge variant="secondary">${priceValue.toFixed(2)}</Badge>
				</p>
			</div>

			<div class="space-y-2">
				<h3 class="text-lg font-medium">Temperature (Step Control)</h3>
				<NumberSpinner
					bind:value={temperatureValue}
					min={-50}
					max={50}
					step={0.5}
					precision={1}
					orientation="horizontal"
					size="lg"
				/>
				<p class="text-sm text-muted-foreground">
					Temperature: <Badge variant="outline">{temperatureValue}°C</Badge>
				</p>
			</div>

			<div class="space-y-2">
				<h3 class="text-lg font-medium">Large Step Size</h3>
				<NumberSpinner value={50} min={0} max={1000} step={10} />
				<p class="text-sm text-muted-foreground">Increments by 10</p>
			</div>

			<div class="space-y-2">
				<h3 class="text-lg font-medium">Integer Only</h3>
				<NumberSpinner value={25} min={0} max={100} step={1} />
				<p class="text-sm text-muted-foreground">No decimal values allowed</p>
			</div>
		</div>
	</section>

	<!-- Practical Examples -->
	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Practical Examples</h2>

		<div class="grid gap-8">
			<!-- Shopping Cart -->
			<div class="space-y-4">
				<h3 class="text-lg font-medium">Shopping Cart</h3>
				<div class="space-y-3 rounded-lg border p-4">
					<div class="flex items-center justify-between">
						<span class="text-sm">Product A - $19.99</span>
						<NumberSpinner
							bind:value={cartQuantity1}
							min={1}
							max={99}
							size="sm"
							orientation="horizontal"
						/>
					</div>
					<div class="flex items-center justify-between">
						<span class="text-sm">Product B - $29.99</span>
						<NumberSpinner
							bind:value={cartQuantity2}
							min={1}
							max={99}
							size="sm"
							orientation="horizontal"
						/>
					</div>
					<div class="flex items-center justify-between">
						<span class="text-sm">Product C - $9.99</span>
						<NumberSpinner
							bind:value={cartQuantity3}
							min={1}
							max={99}
							size="sm"
							orientation="horizontal"
						/>
					</div>
					<div class="border-t pt-3">
						<p class="text-sm font-medium">
							Total Items: <Badge variant="secondary">{totalCartItems}</Badge>
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Error States -->
	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Error States</h2>

		<div class="grid gap-8 md:grid-cols-2">
			<div class="space-y-2">
				<h3 class="text-sm font-medium">With Error</h3>
				<NumberSpinner bind:value={ageValue} error={!ageValue} required min={1} max={150} />
				{#if !ageValue}
					<p class="text-sm text-destructive">Age is required</p>
				{/if}
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium">Valid State</h3>
				<NumberSpinner value={25} error={false} />
				<p class="text-sm text-muted-foreground">No errors</p>
			</div>
		</div>
	</section>

	<!-- With Field Component -->
	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">With Field Component</h2>

		<div class="max-w-2xl space-y-6">
			<Field.Field
				label="Age"
				description="Enter your age (1-150)"
				error={!ageValue ? "Age is required" : undefined}
				required
			>
				<NumberSpinner bind:value={ageValue} error={!ageValue} min={1} max={150} />
			</Field.Field>

			<Field.Field label="Quantity" description="Number of items to order" required>
				<NumberSpinner value={1} min={1} max={100} orientation="horizontal" />
			</Field.Field>

			<Field.Field
				label="Product Price"
				description="Enter the price in USD (up to $9,999.99)"
				required
			>
				<NumberSpinner
					value={0}
					min={0}
					max={9999.99}
					step={0.01}
					precision={2}
					variant="filled"
					placeholder="0.00"
				/>
			</Field.Field>

			<Field.Field
				label="Room Temperature"
				description="Set your preferred temperature (-10°C to 40°C)"
			>
				<NumberSpinner
					value={22}
					min={-10}
					max={40}
					step={0.5}
					precision={1}
					orientation="horizontal"
					size="lg"
				/>
			</Field.Field>
		</div>
	</section>

	<!-- Form Integration -->
	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Form Integration</h2>

		<form
			class="max-w-2xl space-y-6 rounded-lg border p-6"
			onsubmit={(e) => {
				e.preventDefault();
				alert(`Form submitted!\nQuantity: ${formQuantity}\nPrice: $${formPrice.toFixed(2)}\nAge: ${formAge}`);
			}}
		>
			<h3 class="text-lg font-medium">Order Form</h3>

			<Field.Field
				label="Quantity"
				description="Number of items"
				error={formQuantity < 1 ? "Quantity must be at least 1" : undefined}
				required
			>
				<NumberSpinner bind:value={formQuantity} error={formQuantity < 1} min={1} max={100} />
			</Field.Field>

			<Field.Field
				label="Unit Price"
				description="Price per item in USD"
				error={formPrice <= 0 ? "Price must be greater than 0" : undefined}
				required
			>
				<NumberSpinner
					bind:value={formPrice}
					error={formPrice <= 0}
					min={0}
					max={9999.99}
					step={0.01}
					precision={2}
					variant="outline"
				/>
			</Field.Field>

			<Field.Field
				label="Customer Age"
				description="Age verification required"
				error={!formAge || formAge < 18 ? "Must be 18 or older" : undefined}
				required
			>
				<NumberSpinner bind:value={formAge} error={!formAge || formAge < 18} min={18} max={150} />
			</Field.Field>

			<div class="flex items-center justify-between pt-4">
				<p class="text-sm text-muted-foreground">
					Total: <Badge variant="secondary">${((formPrice ?? 0) * (formQuantity ?? 0)).toFixed(2)}</Badge
					>
				</p>
				<button
					type="submit"
					class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
					disabled={!formValid}
				>
					Submit Order
				</button>
			</div>
		</form>
	</section>

	<!-- Disabled State -->
	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Disabled State</h2>

		<div class="grid gap-8 md:grid-cols-2">
			<div class="space-y-2">
				<h3 class="text-sm font-medium">Vertical Disabled</h3>
				<NumberSpinner value={10} disabled={true} />
			</div>

			<div class="space-y-2">
				<h3 class="text-sm font-medium">Horizontal Disabled</h3>
				<NumberSpinner value={10} disabled={true} orientation="horizontal" />
			</div>
		</div>
	</section>

	<!-- All Combinations -->
	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">All Variants & Sizes</h2>

		<div class="grid gap-8 lg:grid-cols-2">
			<!-- Vertical -->
			<div class="space-y-4">
				<h3 class="font-semibold">Vertical Orientation</h3>
				<div class="space-y-4">
					{#each ["default", "outline", "filled", "ghost"] as variant}
						<div class="grid grid-cols-3 gap-4">
							<NumberSpinner variant={variant as any} value={10} size="sm" />
							<NumberSpinner variant={variant as any} value={10} size="default" />
							<NumberSpinner variant={variant as any} value={10} size="lg" />
						</div>
					{/each}
				</div>
			</div>

			<!-- Horizontal -->
			<div class="space-y-4">
				<h3 class="font-semibold">Horizontal Orientation</h3>
				<div class="space-y-4">
					{#each ["default", "outline", "filled", "ghost"] as variant}
						<div class="grid grid-cols-3 gap-4">
							<NumberSpinner variant={variant as any} value={10} size="sm" orientation="horizontal" />
							<NumberSpinner variant={variant as any} value={10} size="default" orientation="horizontal" />
							<NumberSpinner variant={variant as any} value={10} size="lg" orientation="horizontal" />
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>
</div>
