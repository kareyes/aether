<script lang="ts">
	import { Alert } from "$core/components/ui/alert";
	import * as AlertPrimitive from "$core/components/ui/alert";
	import { Button } from "$core/components/ui/button";
</script>

<div class="container mx-auto p-6 max-w-6xl">
	<div class="mb-8">
		<h1 class="text-3xl font-bold mb-2">Alert Component</h1>
		<p class="text-muted-foreground">
			Display important messages with different variants, icons, and actions.
		</p>
	</div>

	<div class="space-y-12">
		<!-- All Variants -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Variants</h2>
			<div class="space-y-4">
				<Alert variant="default" title="Default Alert" description="This is a default alert message." />
				<Alert variant="info" title="Information" description="This is an informational message to keep you updated." />
				<Alert variant="success" title="Success" description="Your changes have been saved successfully." />
				<Alert variant="warning" title="Warning" description="Please review your settings before proceeding." />
				<Alert variant="error" title="Error" description="Something went wrong. Please try again." />
				
			</div>
		</section>

		<!-- With and Without Icons -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">With and Without Icons</h2>
			<div class="space-y-4">
				<Alert 
					variant="info" 
					title="With Icon" 
					description="This alert displays the default variant icon." 
					showIcon={true}
				/>
				<Alert 
					variant="success" 
					title="Without Icon" 
					description="This alert hides the icon for a cleaner look." 
					showIcon={false}
				/>
			</div>
		</section>

		<!-- Dismissible Alerts -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Dismissible Alerts</h2>
			<p class="text-sm text-muted-foreground mb-4">
				Click the X button to dismiss these alerts.
			</p>
			<div class="space-y-4">
				<Alert 
					variant="info" 
					title="Dismissible Info" 
					description="You can dismiss this alert." 
					dismissible={true}
				/>
				<Alert 
					variant="warning" 
					title="Dismissible Warning" 
					description="Click the X to close this warning." 
					dismissible={true}
				/>
			</div>
		</section>

		<!-- Alerts with Actions -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">With Action Buttons</h2>
			<div class="space-y-4">
				<Alert variant="warning" title="Pending Changes" description="You have unsaved changes in your document.">
					{#snippet actions()}
						<Button variant="outline" size="sm">Discard</Button>
						<Button size="sm" color="warning" variant="flat">Save Changes</Button>
					{/snippet}
				</Alert>

				<Alert variant="error" title="Connection Lost" description="We couldn't connect to the server.">
					{#snippet actions()}
						<Button variant="outline" size="sm">Cancel</Button>
						<Button size="sm" color="danger" variant="flat">Retry</Button>
					{/snippet}
				</Alert>

				<Alert variant="success" title="Update Available" description="A new version of the application is ready to install.">
					{#snippet actions()}
						<Button variant="outline" size="sm">Later</Button>
						<Button size="sm" color="success" variant="flat">Install Now</Button>
					{/snippet}
				</Alert>
			</div>
		</section>

		<!-- Custom Icon -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Custom Content</h2>
			<div class="space-y-4">
				<AlertPrimitive.Root variant="info">
					{#snippet icon()}
						<svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					{/snippet}
					<AlertPrimitive.Title>Scheduled Maintenance</AlertPrimitive.Title>
					<AlertPrimitive.Description>
						The system will undergo scheduled maintenance on Sunday at 2:00 AM UTC.
					</AlertPrimitive.Description>
				</AlertPrimitive.Root>

				<AlertPrimitive.Root variant="success">
					{#snippet icon()}
						<svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					{/snippet}
					<AlertPrimitive.Title>Verification Complete</AlertPrimitive.Title>
					<AlertPrimitive.Description>
						Your account has been verified successfully.
					</AlertPrimitive.Description>
				</AlertPrimitive.Root>
			</div>
		</section>

		<!-- Complex Alerts -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Complex Examples</h2>
			<div class="space-y-4">
				<AlertPrimitive.Root variant="warning" dismissible={true}>
					{#snippet icon()}
						<svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
						</svg>
					{/snippet}
					<AlertPrimitive.Title>Storage Almost Full</AlertPrimitive.Title>
					<AlertPrimitive.Description>
						You're using 95% of your storage quota. Upgrade your plan or delete files to continue.
					</AlertPrimitive.Description>
					{#snippet actions()}
						<Button variant="outline" size="sm">Manage Files</Button>
						<Button size="sm">Upgrade Plan</Button>
					{/snippet}
				</AlertPrimitive.Root>

				<AlertPrimitive.Root variant="error">
					{#snippet icon()}
						<svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					{/snippet}
					<AlertPrimitive.Title>Payment Failed</AlertPrimitive.Title>
					<AlertPrimitive.Description>
						<p>Your payment could not be processed. Please check the following:</p>
						<ul class="list-disc list-inside mt-2 space-y-1">
							<li>Card details are correct</li>
							<li>Sufficient funds are available</li>
							<li>Card is not expired</li>
						</ul>
					</AlertPrimitive.Description>
					{#snippet actions()}
						<Button variant="outline" size="sm">Contact Support</Button>
						<Button size="sm">Try Again</Button>
					{/snippet}
				</AlertPrimitive.Root>
			</div>
		</section>

		<!-- Compact Alerts -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Compact Layout</h2>
			<p class="text-sm text-muted-foreground mb-4">
				Alerts with just titles or descriptions.
			</p>
			<div class="space-y-4">
				<Alert variant="info" title="Quick update available" />
				<Alert variant="success" description="File uploaded successfully" />
				<Alert variant="warning" title="Low disk space" />
			</div>
		</section>

		<!-- Real-World Examples -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Real-World Examples</h2>
			<div class="space-y-4">
				<!-- Cookie Notice -->
				<Alert variant="default" title="Cookie Notice" dismissible={true}>
					{#snippet actions()}
						<Button variant="outline" size="sm">Decline</Button>
						<Button size="sm">Accept</Button>
					{/snippet}
				</Alert>

				<!-- Newsletter Signup -->
				<Alert variant="info" title="Stay Updated" description="Subscribe to our newsletter for the latest updates.">
					{#snippet actions()}
						<Button size="sm">Subscribe</Button>
					{/snippet}
				</Alert>

				<!-- Security Alert -->
				<Alert variant="error" title="Security Alert" description="Unusual login activity detected from a new location." dismissible={false}>
					{#snippet actions()}
						<Button variant="outline" size="sm">It Was Me</Button>
						<Button size="sm">Secure Account</Button>
					{/snippet}
				</Alert>
			</div>
		</section>
	</div>
</div>
