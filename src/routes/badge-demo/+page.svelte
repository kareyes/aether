<script lang="ts">
    import { Avatar } from "$core/components/ui/avatar";
	import { Badge } from "$core/components/ui/badge";

	type TagType = {
		id: number;
		text: string;
		variant: "default" | "secondary" | "flat" | "outline" | "dashed";
		color: "blue" | "green" | "purple" | "orange" | "pink" | "red" | "yellow" | "gray";
	};

	let tags: TagType[] = $state([
		{ id: 1, text: "Design", variant: "flat" as const, color: "blue" as const },
		{ id: 2, text: "Development", variant: "secondary" as const, color: "green" as const },
		{ id: 3, text: "Marketing", variant: "outline" as const, color: "purple" as const },
		{ id: 4, text: "Sales", variant: "dashed" as const, color: "orange" as const },
	]);

	let notifications = $state([
		{ id: 1, text: "New message", color: "blue" as const },
		{ id: 2, text: "Warning", color: "yellow" as const },
		{ id: 3, text: "Error occurred", color: "red" as const },
		{ id: 4, text: "Success", color: "green" as const },
	]);

	function removeTag(id: number) {
		tags = tags.filter(tag => tag.id !== id);
	}

	function removeNotification(id: number) {
		notifications = notifications.filter(notif => notif.id !== id);
	}

	function handleBadgeClick(text: string) {
		alert(`Clicked: ${text}`);
	}

	function addRandomTag() {
		const colors = ["blue", "green", "purple", "orange", "pink", "red"] as const;
		const variants = ["default", "secondary", "flat", "outline", "dashed"] as const;
		const randomColor = colors[Math.floor(Math.random() * colors.length)];
		const randomVariant = variants[Math.floor(Math.random() * variants.length)];
		const newTag = {
			id: Date.now(),
			text: `Tag ${Date.now()}`,
			variant: randomVariant,
			color: randomColor,
		};
		tags = [...tags, newTag];
	}
</script>

<div class="container mx-auto p-8 space-y-12">
	<h1 class="text-4xl font-bold text-center mb-8">Enhanced Badge Component</h1>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Basic Variants</h2>
		<p class="text-muted-foreground">Available style variants for the badge component</p>
		<div class="flex flex-wrap gap-4">
			<Badge text="Default" />
			<Badge text="Secondary" variant="secondary" />
			<Badge text="Flat" variant="flat" />
			<Badge text="Outline" variant="outline" />
			<Badge text="Dashed" variant="dashed" />
		</div>
	</section>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Color Variants</h2>
		<p class="text-muted-foreground">Use colors to convey semantic meaning</p>
		<div class="flex flex-wrap gap-4">
			<Badge text="Red" color="red" />
			<Badge text="Orange" color="orange" />
			<Badge text="Yellow" color="yellow" />
			<Badge text="Green" color="green" />
			<Badge text="Blue" color="blue" />
			<Badge text="Purple" color="purple" />
			<Badge text="Pink" color="pink" />
			<Badge text="Gray" color="gray" />
		</div>
	</section>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Variant + Color Combinations</h2>
		<p class="text-muted-foreground">All variants can be combined with any color using compoundVariants</p>
		
		<div class="space-y-4">
			<div>
				<h3 class="text-sm font-medium mb-2 text-muted-foreground">Default Variant</h3>
				<div class="flex flex-wrap gap-2">
					<Badge text="Default" variant="default" />
					<Badge text="Red" variant="default" color="red" />
					<Badge text="Orange" variant="default" color="orange" />
					<Badge text="Green" variant="default" color="green" />
					<Badge text="Blue" variant="default" color="blue" />
					<Badge text="Purple" variant="default" color="purple" />
				</div>
			</div>

			<div>
				<h3 class="text-sm font-medium mb-2 text-muted-foreground">Secondary Variant</h3>
				<div class="flex flex-wrap gap-2">
					<Badge text="Default" variant="secondary" />
					<Badge text="Red" variant="secondary" color="red" />
					<Badge text="Orange" variant="secondary" color="orange" />
					<Badge text="Green" variant="secondary" color="green" />
					<Badge text="Blue" variant="secondary" color="blue" />
					<Badge text="Purple" variant="secondary" color="purple" />
				</div>
			</div>

			<div>
				<h3 class="text-sm font-medium mb-2 text-muted-foreground">Flat Variant</h3>
				<div class="flex flex-wrap gap-2">
					<Badge text="Default" variant="flat" />
					<Badge text="Red" variant="flat" color="red" />
					<Badge text="Orange" variant="flat" color="orange" />
					<Badge text="Green" variant="flat" color="green" />
					<Badge text="Blue" variant="flat" color="blue" />
					<Badge text="Purple" variant="flat" color="purple" />
				</div>
			</div>

			<div>
				<h3 class="text-sm font-medium mb-2 text-muted-foreground">Outline Variant</h3>
				<div class="flex flex-wrap gap-2">
					<Badge text="Default" variant="outline" />
					<Badge text="Red" variant="outline" color="red" />
					<Badge text="Orange" variant="outline" color="orange" />
					<Badge text="Green" variant="outline" color="green" />
					<Badge text="Blue" variant="outline" color="blue" />
					<Badge text="Purple" variant="outline" color="purple" />
				</div>
			</div>

			<div>
				<h3 class="text-sm font-medium mb-2 text-muted-foreground">Dashed Variant</h3>
				<div class="flex flex-wrap gap-2">
					<Badge text="Default" variant="dashed" />
					<Badge text="Red" variant="dashed" color="red" />
					<Badge text="Orange" variant="dashed" color="orange" />
					<Badge text="Green" variant="dashed" color="green" />
					<Badge text="Blue" variant="dashed" color="blue" />
					<Badge text="Purple" variant="dashed" color="purple" />
				</div>
			</div>
		</div>
	</section>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Sizes</h2>
		<p class="text-muted-foreground">Three size options: small, default, and large</p>
		<div class="flex items-center gap-4">
			<Badge text="Small" size="sm" />
			<Badge text="Default" size="default" />
			<Badge text="Large" size="lg" />
		</div>
	</section>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Clickable Badges</h2>
		<p class="text-muted-foreground">Hover effects adapt to variant+color combinations</p>
		<div class="space-y-3">
			<div class="flex flex-wrap gap-2">
				<Badge 
					text="Click me" 
					clickable={true}
					onclick={() => handleBadgeClick("Default clickable")}
				/>
				<Badge 
					text="Secondary" 
					variant="secondary"
					clickable={true}
					onclick={() => handleBadgeClick("Secondary")}
				/>
				<Badge 
					text="Flat" 
					variant="flat"
					clickable={true}
					onclick={() => handleBadgeClick("Flat")}
				/>
				<Badge 
					text="Outline" 
					variant="outline"
					clickable={true}
					onclick={() => handleBadgeClick("Outline")}
				/>
				<Badge 
					text="Dashed" 
					variant="dashed"
					clickable={true}
					onclick={() => handleBadgeClick("Dashed")}
				/>
			</div>
			<div class="flex flex-wrap gap-2">
				<Badge 
					text="Red" 
					color="red"
					clickable={true}
					onclick={() => handleBadgeClick("Red")}
				/>
				<Badge 
					text="Green" 
					color="green"
					clickable={true}
					onclick={() => handleBadgeClick("Green")}
				/>
				<Badge 
					text="Blue" 
					color="blue"
					clickable={true}
					onclick={() => handleBadgeClick("Blue")}
				/>
				<Badge 
					text="Link Badge" 
					color="blue"
					variant="outline"
					href="https://example.com"
					target="_blank"
				/>
			</div>
		</div>
	</section>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Dismissable Badges</h2>
		<div class="space-y-4">
			<h3 class="text-lg font-medium">Tags (Dismissable)</h3>
			<div class="flex flex-wrap gap-2">
				{#each tags as tag (tag.id)}
					<Badge 
						text={tag.text}
						variant={tag.variant}
						color={tag.color}
						dismissable={true}
						onDismiss={() => removeTag(tag.id)}
					/>
				{/each}
				<button 
					onclick={addRandomTag}
					class="px-3 py-1 text-xs border border-dashed border-gray-300 rounded-md hover:border-gray-400 transition-colors"
				>
					+ Add Tag
				</button>
			</div>
		</div>
	</section>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Notification Badges</h2>
		<div class="space-y-4">
			<h3 class="text-lg font-medium">Dismissable Notifications</h3>
			<div class="space-y-2">
				{#each notifications as notification (notification.id)}
					<div class="flex items-center justify-between p-3 border rounded-lg">
						<span class="text-sm">You have a new notification</span>
						<Badge 
							text={notification.text}
							color={notification.color}
							dismissable={true}
							onDismiss={() => removeNotification(notification.id)}
						/>
					</div>
				{/each}
				
				{#if notifications.length === 0}
					<p class="text-muted-foreground text-center py-4">No notifications</p>
				{/if}
			</div>
		</div>
	</section>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Status Indicators</h2>
		<p class="text-muted-foreground">Use colors to indicate different status states</p>
		<div class="space-y-4">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="p-4 border rounded-lg">
					<div class="flex items-center justify-between">
						<span class="font-medium">Server Status</span>
						<Badge text="Online" color="green" />
					</div>
				</div>
				
				<div class="p-4 border rounded-lg">
					<div class="flex items-center justify-between">
						<span class="font-medium">Database</span>
						<Badge text="Maintenance" color="yellow" />
					</div>
				</div>
				
				<div class="p-4 border rounded-lg">
					<div class="flex items-center justify-between">
						<span class="font-medium">API Service</span>
						<Badge text="Down" color="red" />
					</div>
				</div>
				
				<div class="p-4 border rounded-lg">
					<div class="flex items-center justify-between">
						<span class="font-medium">CDN</span>
						<Badge text="Operational" color="green" />
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">User Profile Example</h2>
		<div class="bg-card p-6 rounded-lg border">
			<div class="flex items-start space-x-4">
				<Avatar fallback="John Doe" size="xl" variant="bordered"/>
				<div class="flex-1">
					<h3 class="text-lg font-semibold">John Doe</h3>
					<p class="text-muted-foreground">Senior Developer</p>
					<div class="flex flex-wrap gap-2 mt-3">
						<Badge text="React" variant="flat" color="blue" size="sm" />
						<Badge text="TypeScript" variant="flat" color="blue" size="sm" />
						<Badge text="Node.js" variant="flat" color="green" size="sm" />
						<Badge text="Team Lead" variant="secondary" color="purple" size="sm" />
						<Badge text="5+ years" variant="outline" color="gray" size="sm" />
					</div>
				</div>
				<Badge text="Active" color="green" />
			</div>
		</div>
	</section>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Product Cards</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<div class="border rounded-lg p-4">
				<div class="flex justify-between items-start mb-3">
					<h3 class="font-semibold">Premium Plan</h3>
					<Badge text="Popular" color="green" />
				</div>
				<p class="text-muted-foreground text-sm mb-4">Advanced features for growing teams</p>
				<div class="flex justify-between items-center">
					<span class="text-2xl font-bold">$29/mo</span>
					<Badge text="Best Value" color="green" clickable={true} />
				</div>
			</div>
			
			<div class="border rounded-lg p-4">
				<div class="flex justify-between items-start mb-3">
					<h3 class="font-semibold">Basic Plan</h3>
					<Badge text="Free" color="gray" />
				</div>
				<p class="text-muted-foreground text-sm mb-4">Essential features for individuals</p>
				<div class="flex justify-between items-center">
					<span class="text-2xl font-bold">$0/mo</span>
					<Badge text="Limited" variant="outline" />
				</div>
			</div>
			
			<div class="border rounded-lg p-4">
				<div class="flex justify-between items-start mb-3">
					<h3 class="font-semibold">Enterprise</h3>
					<Badge text="Contact Sales" variant="secondary" />
				</div>
				<p class="text-muted-foreground text-sm mb-4">Custom solutions for large organizations</p>
				<div class="flex justify-between items-center">
					<span class="text-2xl font-bold">Custom</span>
					<Badge text="Custom" color="purple" clickable={true} />
				</div>
			</div>
		</div>
	</section>
</div>