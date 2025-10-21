<script lang="ts">
	import { Checkbox } from "$lib/components/ui/checkbox";

	let basicChecked = $state(false);
	let withLabelChecked = $state(false);
	let withDescriptionChecked = $state(false);
	let lineThroughChecked = $state(true);
	let indeterminateState = $state(false);
	
	// Size examples
	let smallChecked = $state(false);
	let defaultChecked = $state(false);
	let largeChecked = $state(false);
	let xlChecked = $state(false);
	
	// Variant examples
	let destructiveChecked = $state(false);
	let successChecked = $state(false);
	let warningChecked = $state(false);
	
	// Todo list example
	let todos = $state([
		{ id: 1, text: "Complete project setup", completed: true },
		{ id: 2, text: "Design components", completed: true },
		{ id: 3, text: "Implement checkbox variants", completed: false },
		{ id: 4, text: "Write documentation", completed: false },
		{ id: 5, text: "Test in different browsers", completed: false },
	]);
</script>

<div class="container mx-auto p-8 space-y-12">
	<h1 class="text-4xl font-bold text-center mb-8">Enhanced Checkbox Component</h1>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Basic Usage</h2>
		<div class="space-y-4">
			<Checkbox bind:checked={basicChecked} />
			<Checkbox 
				bind:checked={withLabelChecked} 
				label="Accept terms and conditions" 
			/>
			<Checkbox 
				bind:checked={withDescriptionChecked} 
				label="Enable notifications"
				description="Get notified about updates and new features"
			/>
		</div>
	</section>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Sizes</h2>
		<div class="flex items-center gap-6">
			<Checkbox 
				bind:checked={smallChecked} 
				size="sm" 
				label="Small"
			/>
			<Checkbox 
				bind:checked={defaultChecked} 
				size="default" 
				label="Default"
			/>
			<Checkbox 
				bind:checked={largeChecked} 
				size="lg" 
				label="Large"
			/>
			<Checkbox 
				bind:checked={xlChecked} 
				size="xl" 
				label="Extra Large"
			/>
		</div>
	</section>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Variants</h2>
		<div class="space-y-4">
			<Checkbox 
				bind:checked={destructiveChecked} 
				variant="destructive" 
				label="Delete all data"
				description="This action cannot be undone"
			/>
			<Checkbox 
				bind:checked={successChecked} 
				variant="success" 
				label="Mark as completed"
				description="This will mark the task as done"
			/>
			<Checkbox 
				bind:checked={warningChecked} 
				variant="warning" 
				label="Proceed with caution"
				description="This action requires attention"
			/>
		</div>
	</section>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Line Through Feature</h2>
		<div class="space-y-4">
			<Checkbox 
				bind:checked={lineThroughChecked} 
				lineThrough={true}
				label="Completed task with line-through"
				description="This text gets crossed out when checked"
			/>
		</div>
	</section>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Indeterminate State</h2>
		<div class="space-y-4">
			<Checkbox 
				bind:indeterminate={indeterminateState} 
				label="Partially selected"
				description="This checkbox is in an indeterminate state"
			/>
		</div>
	</section>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Todo List Example</h2>
		<div class="space-y-3 bg-card p-6 rounded-lg border">
			{#each todos as todo (todo.id)}
				<Checkbox 
					bind:checked={todo.completed}
					label={todo.text}
					lineThrough={true}
					size="default"
					class="w-full"
				/>
			{/each}
		</div>
		
		<div class="text-sm text-muted-foreground">
			Completed: {todos.filter(t => t.completed).length} / {todos.length}
		</div>
	</section>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Disabled States</h2>
		<div class="space-y-4">
			<Checkbox 
				checked={false}
				disabled
				label="Disabled unchecked"
				description="This checkbox is disabled"
			/>
			<Checkbox 
				checked={true}
				disabled
				label="Disabled checked"
				description="This checkbox is disabled and checked"
			/>
		</div>
	</section>
</div>