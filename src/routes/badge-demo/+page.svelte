<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";

	let tags = $state([
		{ id: 1, text: "Design", color: "blue" as const },
		{ id: 2, text: "Development", color: "green" as const },
		{ id: 3, text: "Marketing", color: "purple" as const },
		{ id: 4, text: "Sales", color: "orange" as const },
	]);

	let notifications = $state([
		{ id: 1, text: "New message", variant: "default" as const },
		{ id: 2, text: "Warning", variant: "warning" as const },
		{ id: 3, text: "Error occurred", variant: "destructive" as const },
		{ id: 4, text: "Success", variant: "success" as const },
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
		const colors = ["blue", "green", "purple", "orange"] as const;
		const randomColor = colors[Math.floor(Math.random() * colors.length)];
		const newTag = {
			id: Date.now(),
			text: `Tag ${Date.now()}`,
			color: randomColor,
		};
		tags = [...tags, newTag];
	}
</script>

<div class="container mx-auto p-8 space-y-12">
	<h1 class="text-4xl font-bold text-center mb-8">Enhanced Badge Component</h1>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Basic Variants</h2>
		<div class="flex flex-wrap gap-4">
			<Badge text="Default" />
			<Badge text="Secondary" variant="secondary" />
			<Badge text="Destructive" variant="destructive" />
			<Badge text="Outline" variant="outline" />
			<Badge text="Ghost" variant="ghost" />
			<Badge text="Success" variant="success" />
			<Badge text="Warning" variant="warning" />
			<Badge text="Info" variant="info" />
		</div>
	</section>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Color Variants</h2>
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
		<h2 class="text-2xl font-semibold">Sizes</h2>
		<div class="flex items-center gap-4">
			<Badge text="Small" size="sm" />
			<Badge text="Default" size="default" />
			<Badge text="Large" size="lg" />
		</div>
	</section>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Clickable Badges</h2>
		<div class="flex flex-wrap gap-4">
			<Badge 
				text="Click me" 
				clickable={true}
				onclick={() => handleBadgeClick("Basic clickable")}
			/>
			<Badge 
				text="Action Badge" 
				variant="secondary"
				clickable={true}
				onclick={() => handleBadgeClick("Action badge")}
			/>
			<Badge 
				text="Link Badge" 
				color="blue"
				href="https://example.com"
				target="_blank"
			/>
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
							variant={notification.variant}
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
		<div class="space-y-4">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="p-4 border rounded-lg">
					<div class="flex items-center justify-between">
						<span class="font-medium">Server Status</span>
						<Badge text="Online" variant="success" />
					</div>
				</div>
				
				<div class="p-4 border rounded-lg">
					<div class="flex items-center justify-between">
						<span class="font-medium">Database</span>
						<Badge text="Maintenance" variant="warning" />
					</div>
				</div>
				
				<div class="p-4 border rounded-lg">
					<div class="flex items-center justify-between">
						<span class="font-medium">API Service</span>
						<Badge text="Down" variant="destructive" />
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
				<div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
					<span class="text-lg font-semibold">JD</span>
				</div>
				<div class="flex-1">
					<h3 class="text-lg font-semibold">John Doe</h3>
					<p class="text-muted-foreground">Senior Developer</p>
					<div class="flex flex-wrap gap-2 mt-3">
						<Badge text="React" color="blue" size="sm" />
						<Badge text="TypeScript" color="blue" size="sm" />
						<Badge text="Node.js" color="green" size="sm" />
						<Badge text="Team Lead" variant="secondary" size="sm" />
						<Badge text="5+ years" color="purple" size="sm" />
					</div>
				</div>
				<Badge text="Active" variant="success" />
			</div>
		</div>
	</section>

	<section class="space-y-6">
		<h2 class="text-2xl font-semibold">Product Cards</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<div class="border rounded-lg p-4">
				<div class="flex justify-between items-start mb-3">
					<h3 class="font-semibold">Premium Plan</h3>
					<Badge text="Popular" variant="success" />
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