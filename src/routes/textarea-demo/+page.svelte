<script lang="ts">
	import { Textarea } from "$lib/components/ui/textarea";
	import { Button } from "$lib/components/ui/button";

	let defaultValue = $state("");
	let outlineValue = $state("");
	let filledValue = $state("");
	let ghostValue = $state("");
	let underlineValue = $state("");
	let autoResizeValue = $state("");
	let withCountValue = $state("");
	let formData = $state({
		name: "",
		email: "",
		message: ""
	});

	function handleSubmit() {
		console.log("Form submitted:", formData);
		alert(`Message submitted:\n\n${formData.message}`);
	}
</script>

<div class="container mx-auto p-6 max-w-4xl">
	<div class="mb-8">
		<h1 class="text-3xl font-bold mb-2">Textarea Component</h1>
		<p class="text-muted-foreground">
			Versatile textarea with variants, sizes, auto-resize, and character counting.
		</p>
	</div>

	<div class="space-y-12">
		<!-- Variants Section -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Variants</h2>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="space-y-2">
					<label class="text-sm font-medium">Default</label>
					<Textarea bind:value={defaultValue} placeholder="Default variant..." />
				</div>

				<div class="space-y-2">
					<label class="text-sm font-medium">Outline</label>
					<Textarea variant="outline" bind:value={outlineValue} placeholder="Outline variant..." />
				</div>

				<div class="space-y-2">
					<label class="text-sm font-medium">Filled</label>
					<Textarea variant="filled" bind:value={filledValue} placeholder="Filled variant..." />
				</div>

				<div class="space-y-2">
					<label class="text-sm font-medium">Ghost</label>
					<Textarea variant="ghost" bind:value={ghostValue} placeholder="Ghost variant..." />
				</div>

				<div class="space-y-2">
					<label class="text-sm font-medium">Underline</label>
					<Textarea variant="underline" bind:value={underlineValue} placeholder="Underline variant..." />
				</div>
			</div>
		</section>

		<!-- Sizes Section -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Sizes</h2>
			<div class="grid gap-6">
				<div class="space-y-2">
					<label class="text-sm font-medium">Small</label>
					<Textarea size="sm" placeholder="Small size textarea..." />
				</div>

				<div class="space-y-2">
					<label class="text-sm font-medium">Default</label>
					<Textarea size="default" placeholder="Default size textarea..." />
				</div>

				<div class="space-y-2">
					<label class="text-sm font-medium">Large</label>
					<Textarea size="lg" placeholder="Large size textarea..." />
				</div>
			</div>
		</section>

		<!-- Features Section -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Features</h2>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="space-y-2">
					<label class="text-sm font-medium">Auto-Resize (3-8 rows)</label>
					<Textarea 
						bind:value={autoResizeValue}
						autoResize 
						minRows={3}
						maxRows={8}
						placeholder="Type multiple lines to see auto-resize..." 
					/>
					<p class="text-xs text-muted-foreground">Grows from 3 to 8 rows automatically</p>
				</div>

				<div class="space-y-2">
					<label class="text-sm font-medium">Character Counter (max 200)</label>
					<Textarea 
						bind:value={withCountValue}
						maxLength={200}
						showCount
						placeholder="Type to see counter..." 
					/>
					<p class="text-xs text-muted-foreground">Shows character count in corner</p>
				</div>

				<div class="space-y-2">
					<label class="text-sm font-medium">Disabled</label>
					<Textarea disabled value="This textarea is disabled" />
				</div>

				<div class="space-y-2">
					<label class="text-sm font-medium">Error State</label>
					<Textarea aria-invalid={true} placeholder="This field has an error..." />
					<p class="text-xs text-destructive">This field is required</p>
				</div>

				<div class="space-y-2">
					<label class="text-sm font-medium">Resize: None</label>
					<Textarea resize="none" placeholder="Cannot be manually resized..." />
				</div>

				<div class="space-y-2">
					<label class="text-sm font-medium">Resize: Both</label>
					<Textarea resize="both" placeholder="Resize in any direction..." />
				</div>
			</div>
		</section>

		<!-- Form Example -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Form Example</h2>
			<form class="space-y-4" on:submit|preventDefault={handleSubmit}>
				<div class="space-y-2">
					<label for="name" class="text-sm font-medium">
						Name <span class="text-destructive">*</span>
					</label>
					<input
						id="name"
						type="text"
						bind:value={formData.name}
						class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
						placeholder="John Doe"
						required
					/>
				</div>

				<div class="space-y-2">
					<label for="email" class="text-sm font-medium">
						Email <span class="text-destructive">*</span>
					</label>
					<input
						id="email"
						type="email"
						bind:value={formData.email}
						class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
						placeholder="john@example.com"
						required
					/>
				</div>

				<div class="space-y-2">
					<label for="message" class="text-sm font-medium">
						Message <span class="text-destructive">*</span>
					</label>
					<Textarea 
						id="message"
						bind:value={formData.message}
						variant="outline"
						size="lg"
						maxLength={500}
						showCount
						autoResize
						minRows={4}
						maxRows={10}
						placeholder="Type your message here..."
						required
					/>
					<p class="text-xs text-muted-foreground">
						Your message will be sent to our support team.
					</p>
				</div>

				<Button type="submit">Submit Message</Button>
			</form>
		</section>

		<!-- Combined Examples -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Combined Features</h2>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="space-y-2">
					<label class="text-sm font-medium">Small + Filled + Counter</label>
					<Textarea 
						variant="filled"
						size="sm"
						maxLength={100}
						showCount
						placeholder="Compact with counter..."
					/>
				</div>

				<div class="space-y-2">
					<label class="text-sm font-medium">Large + Auto-Resize + Counter</label>
					<Textarea 
						variant="outline"
						size="lg"
						autoResize
						minRows={3}
						maxRows={6}
						showCount
						placeholder="Full-featured textarea..."
					/>
				</div>
			</div>
		</section>
	</div>
</div>
