<script lang="ts">
	import { CheckboxGroup } from "$lib/components/ui/checkbox";
	import type { CheckboxGroupOption } from "$lib/components/ui/checkbox";

	// Demo data
	let basicValues = $state<string[]>([]);
	let skillsValues = $state<string[]>(["javascript", "svelte"]);
	let preferencesValues = $state<string[]>([]);
	let todosValues = $state<string[]>(["task1"]);
	let settingsValues = $state<string[]>(["notifications"]);

	const basicOptions: CheckboxGroupOption[] = [
		{ id: "1", label: "Option 1", value: "option1" },
		{ id: "2", label: "Option 2", value: "option2" },
		{ id: "3", label: "Option 3", value: "option3" },
	];

	const skillsOptions: CheckboxGroupOption[] = [
		{ id: "js", label: "JavaScript", value: "javascript", description: "ES6+ and modern JS frameworks" },
		{ id: "ts", label: "TypeScript", value: "typescript", description: "Strongly typed JavaScript" },
		{ id: "svelte", label: "Svelte", value: "svelte", description: "Modern reactive framework" },
		{ id: "react", label: "React", value: "react", description: "Popular UI library" },
		{ id: "vue", label: "Vue.js", value: "vue", description: "Progressive framework" },
	];

	const preferencesOptions: CheckboxGroupOption[] = [
		{ id: "email", label: "Email notifications", value: "email" },
		{ id: "sms", label: "SMS notifications", value: "sms" },
		{ id: "push", label: "Push notifications", value: "push" },
		{ id: "newsletter", label: "Newsletter", value: "newsletter", disabled: true },
	];

	const todosOptions: CheckboxGroupOption[] = [
		{ id: "task1", label: "Set up development environment", value: "task1" },
		{ id: "task2", label: "Create component library", value: "task2" },
		{ id: "task3", label: "Write documentation", value: "task3" },
		{ id: "task4", label: "Add unit tests", value: "task4" },
		{ id: "task5", label: "Deploy to production", value: "task5" },
	];

	const settingsOptions: CheckboxGroupOption[] = [
		{ id: "notifications", label: "Enable notifications", value: "notifications", description: "Receive app notifications" },
		{ id: "darkmode", label: "Dark mode", value: "darkmode", description: "Use dark theme" },
		{ id: "analytics", label: "Usage analytics", value: "analytics", description: "Help improve our product" },
		{ id: "marketing", label: "Marketing emails", value: "marketing", description: "Receive product updates" },
	];

	function handleValuesChange(newValues: string[], label: string) {
		console.log(`${label} changed:`, newValues);
	}
</script>

<div class="container mx-auto p-8 space-y-12">
	<h1 class="text-4xl font-bold text-center mb-8">Checkbox Group Component</h1>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Basic Usage</h2>
		<div class="space-y-4">
			<CheckboxGroup
				options={basicOptions}
				bind:values={basicValues}
				label="Choose your options"
				description="Select one or more options from the list"
			/>
			<p class="text-sm text-muted-foreground">
				Selected values: {basicValues.length > 0 ? basicValues.join(", ") : "None"}
			</p>
		</div>
	</section>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Horizontal Orientation</h2>
		<div class="space-y-4">
			<CheckboxGroup
				options={preferencesOptions}
				bind:values={preferencesValues}
				orientation="horizontal"
				label="Notification Preferences"
				onValuesChange={(values) => handleValuesChange(values, "Preferences")}
			/>
			<p class="text-sm text-muted-foreground">
				Selected: {preferencesValues.length > 0 ? preferencesValues.join(", ") : "None"}
			</p>
		</div>
	</section>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">With Descriptions</h2>
		<div class="space-y-4">
			<CheckboxGroup
				options={skillsOptions}
				bind:values={skillsValues}
				label="Technical Skills"
				description="Select the technologies you're proficient in"
				checkboxSize="lg"
			/>
			<p class="text-sm text-muted-foreground">
				Skills: {skillsValues.length > 0 ? skillsValues.join(", ") : "None"}
			</p>
		</div>
	</section>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Todo List with Line Through</h2>
		<div class="space-y-4">
			<CheckboxGroup
				options={todosOptions}
				bind:values={todosValues}
				label="Project Tasks"
				description="Track your progress"
				lineThrough={true}
				variant="success"
			/>
			<div class="text-sm text-muted-foreground">
				Progress: {todosValues.length} / {todosOptions.length} completed
			</div>
		</div>
	</section>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Different Sizes and Variants</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			<div>
				<h3 class="text-lg font-medium mb-4">Small Size</h3>
				<CheckboxGroup
					options={basicOptions.slice(0, 2)}
					values={[]}
					checkboxSize="sm"
					label="Small checkboxes"
				/>
			</div>
			
			<div>
				<h3 class="text-lg font-medium mb-4">Large Size</h3>
				<CheckboxGroup
					options={basicOptions.slice(0, 2)}
					values={[]}
					checkboxSize="xl"
					label="Extra large checkboxes"
				/>
			</div>
			
			<div>
				<h3 class="text-lg font-medium mb-4">Warning Variant</h3>
				<CheckboxGroup
					options={[
						{ id: "warn1", label: "Proceed with caution", value: "warn1" },
						{ id: "warn2", label: "Delete all data", value: "warn2" },
					]}
					values={[]}
					variant="warning"
					label="Warning actions"
				/>
			</div>
			
			<div>
				<h3 class="text-lg font-medium mb-4">Destructive Variant</h3>
				<CheckboxGroup
					options={[
						{ id: "del1", label: "Delete account", value: "del1" },
						{ id: "del2", label: "Remove all files", value: "del2" },
					]}
					values={[]}
					variant="destructive"
					label="Destructive actions"
				/>
			</div>
		</div>
	</section>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Settings Panel Example</h2>
		<div class="bg-card p-6 rounded-lg border space-y-4">
			<CheckboxGroup
				options={settingsOptions}
				bind:values={settingsValues}
				label="App Settings"
				description="Customize your app experience"
				checkboxSize="default"
				class="space-y-4"
			/>
			
			<div class="pt-4 border-t">
				<h4 class="font-medium mb-2">Current Settings:</h4>
				<div class="text-sm text-muted-foreground">
					{#if settingsValues.length > 0}
						<ul class="space-y-1">
							{#each settingsValues as setting}
								<li>• {settingsOptions.find(opt => opt.value === setting)?.label}</li>
							{/each}
						</ul>
					{:else}
						No settings enabled
					{/if}
				</div>
			</div>
		</div>
	</section>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Required Field</h2>
		<div class="space-y-4">
			<CheckboxGroup
				options={[
					{ id: "terms", label: "I accept the terms and conditions", value: "terms" },
					{ id: "privacy", label: "I accept the privacy policy", value: "privacy" },
				]}
				values={[]}
				label="Legal Agreement"
				description="You must accept both agreements to continue"
				required={true}
				variant="destructive"
			/>
		</div>
	</section>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Disabled State</h2>
		<div class="space-y-4">
			<CheckboxGroup
				options={basicOptions}
				values={["option1"]}
				label="Disabled Group"
				description="This entire group is disabled"
				disabled={true}
			/>
		</div>
	</section>
</div>