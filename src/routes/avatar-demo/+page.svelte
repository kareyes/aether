<script lang="ts">
	import { Avatar, AvatarGroup } from "$core/components/ui/avatar";

	const users = [
		{ name: "John Doe", image: "https://i.pravatar.cc/150?img=1" },
		{ name: "Jane Smith", image: "https://i.pravatar.cc/150?img=2" },
		{ name: "Bob Johnson", image: "https://i.pravatar.cc/150?img=3" },
		{ name: "Alice Williams", image: "https://i.pravatar.cc/150?img=4" },
		{ name: "Charlie Brown", image: "https://i.pravatar.cc/150?img=5" },
	];

	const team = [
		{ name: "Sarah Connor", role: "Designer", color: "primary" as const },
		{ name: "Michael Scott", role: "Manager", color: "green" as const },
		{ name: "Pam Beesly", role: "Developer", color: "purple" as const },
		{ name: "Jim Halpert", role: "Sales", color: "blue" as const },
	];
</script>

<div class="container mx-auto p-6 max-w-6xl">
	<div class="mb-8">
		<h1 class="text-3xl font-bold mb-2">Enhanced Avatar Component</h1>
		<p class="text-muted-foreground">
			A versatile avatar component with variants, colors, shapes, and group support.
		</p>
	</div>

	<div class="space-y-12">
		<!-- Sizes -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Sizes</h2>
			<div class="flex items-end gap-4">
				<div class="text-center">
					<Avatar size="xs" src={users[0].image} alt="Extra Small" fallback="XS" />
					<p class="text-xs mt-2">XS</p>
				</div>
				<div class="text-center">
					<Avatar size="sm" src={users[0].image} alt="Small" fallback="SM" />
					<p class="text-xs mt-2">SM</p>
				</div>
				<div class="text-center">
					<Avatar size="default" src={users[0].image} alt="Default" fallback="MD" />
					<p class="text-xs mt-2">Default</p>
				</div>
				<div class="text-center">
					<Avatar size="lg" src={users[0].image} alt="Large" fallback="LG" />
					<p class="text-xs mt-2">LG</p>
				</div>
				<div class="text-center">
					<Avatar size="xl" src={users[0].image} alt="Extra Large" fallback="XL" />
					<p class="text-xs mt-2">XL</p>
				</div>
				<div class="text-center">
					<Avatar size="2xl" src={users[0].image} alt="2XL" fallback="2XL" />
					<p class="text-xs mt-2">2XL</p>
				</div>
			</div>
		</section>

		<!-- Shapes -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Shapes</h2>
			<div class="flex items-center gap-6">
				<div class="text-center">
					<Avatar shape="circle" src={users[0].image} alt="Circle" fallback="CI" size="lg" />
					<p class="text-sm mt-2">Circle</p>
				</div>
				<div class="text-center">
					<Avatar shape="rounded" src={users[0].image} alt="Rounded" fallback="RO" size="lg" />
					<p class="text-sm mt-2">Rounded</p>
				</div>
				<div class="text-center">
					<Avatar shape="square" src={users[0].image} alt="Square" fallback="SQ" size="lg" />
					<p class="text-sm mt-2">Square</p>
				</div>
			</div>
		</section>

		<!-- Variants -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Variants</h2>
			<div class="flex items-center gap-6">
				<div class="text-center">
					<Avatar variant="default" src={users[0].image} alt="Default" fallback="DF" size="lg" />
					<p class="text-sm mt-2">Default</p>
				</div>
				<div class="text-center">
					<Avatar variant="bordered" src={users[0].image} alt="Bordered" fallback="BO" size="lg" />
					<p class="text-sm mt-2">Bordered</p>
				</div>
				<div class="text-center">
					<Avatar variant="solid" color="primary" fallback="SO" size="lg" />
					<p class="text-sm mt-2">Solid</p>
				</div>
			</div>
		</section>

		<!-- Colors -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Colors</h2>
			<div class="flex flex-wrap gap-4">
				<div class="text-center">
					<Avatar color="default" fallback="DF" />
					<p class="text-xs mt-2">Default</p>
				</div>
				<div class="text-center">
					<Avatar color="primary" fallback="PR" />
					<p class="text-xs mt-2">Primary</p>
				</div>
				<div class="text-center">
					<Avatar color="secondary" fallback="SE" />
					<p class="text-xs mt-2">Secondary</p>
				</div>
				<div class="text-center">
					<Avatar color="green" fallback="SU" />
					<p class="text-xs mt-2">Green</p>
				</div>
				<div class="text-center">
					<Avatar color="yellow" fallback="WA" />
					<p class="text-xs mt-2">Yellow</p>
				</div>
				<div class="text-center">
					<Avatar color="red" fallback="DA" />
					<p class="text-xs mt-2">Red</p>
				</div>
				<div class="text-center">
					<Avatar color="blue" fallback="IN" />
					<p class="text-xs mt-2">Blue</p>
				</div>
				<div class="text-center">
					<Avatar color="purple" fallback="PU" />
					<p class="text-xs mt-2">Purple</p>
				</div>
				<div class="text-center">
					<Avatar color="pink" fallback="PI" />
					<p class="text-xs mt-2">Pink</p>
				</div>
				<div class="text-center">
					<Avatar color="gradient" fallback="GR" />
					<p class="text-xs mt-2">Gradient</p>
				</div>
			</div>
		</section>

		<!-- Bordered with Colors -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Bordered with Colors</h2>
			<p class="text-sm text-muted-foreground mb-4">
				Bordered variant combined with different color options creates a colored ring around the avatar.
			</p>
			<div class="flex flex-wrap gap-4">
				<div class="text-center">
					<Avatar variant="bordered" color="default" fallback="DF" size="lg" />
					<p class="text-xs mt-2">Default</p>
				</div>
				<div class="text-center">
					<Avatar variant="bordered" color="primary" fallback="PR" size="lg" />
					<p class="text-xs mt-2">Primary</p>
				</div>
				<div class="text-center">
					<Avatar variant="bordered" color="secondary" fallback="SE" size="lg" />
					<p class="text-xs mt-2">Secondary</p>
				</div>
				<div class="text-center">
					<Avatar variant="bordered" color="green" fallback="SU" size="lg" />
					<p class="text-xs mt-2">Green</p>
				</div>
				<div class="text-center">
					<Avatar variant="bordered" color="yellow" fallback="WA" size="lg" />
					<p class="text-xs mt-2">Yellow</p>
				</div>
				<div class="text-center">
					<Avatar variant="bordered" color="red" fallback="DA" size="lg" />
					<p class="text-xs mt-2">Red</p>
				</div>
				<div class="text-center">
					<Avatar variant="bordered" color="blue" fallback="IN" size="lg" />
					<p class="text-xs mt-2">Blue</p>
				</div>
				<div class="text-center">
					<Avatar variant="bordered" color="purple" fallback="PU" size="lg" />
					<p class="text-xs mt-2">Purple</p>
				</div>
				<div class="text-center">
					<Avatar variant="bordered" color="pink" fallback="PI" size="lg" />
					<p class="text-xs mt-2">Pink</p>
				</div>
				<div class="text-center">
					<Avatar variant="bordered" color="gradient" fallback="GR" size="lg" />
					<p class="text-xs mt-2">Gradient</p>
				</div>
			</div>
		</section>

		<!-- Bordered Colors with Images -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Bordered with Images</h2>
			<p class="text-sm text-muted-foreground mb-4">
				Bordered avatars work great with images too, showing a subtle colored ring.
			</p>
			<div class="flex flex-wrap gap-4">
				<div class="text-center">
					<Avatar variant="bordered" color="default" src={users[0].image} alt="User" fallback="U1" size="lg" />
					<p class="text-xs mt-2">Default</p>
				</div>
				<div class="text-center">
					<Avatar variant="bordered" color="primary" src={users[1].image} alt="User" fallback="U2" size="lg" />
					<p class="text-xs mt-2">Primary</p>
				</div>
				<div class="text-center">
					<Avatar variant="bordered" color="green" src={users[2].image} alt="User" fallback="U3" size="lg" />
					<p class="text-xs mt-2">Success</p>
				</div>
				<div class="text-center">
					<Avatar variant="bordered" color="red" src={users[3].image} alt="User" fallback="U4" size="lg" />
					<p class="text-xs mt-2">Danger</p>
				</div>
				<div class="text-center">
					<Avatar variant="bordered" color="purple" src={users[4].image} alt="User" fallback="U5" size="lg" />
					<p class="text-xs mt-2">Purple</p>
				</div>
			</div>
		</section>

		<!-- Bordered Shapes -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Bordered Shapes with Colors</h2>
			<div class="flex flex-wrap gap-6">
				<div class="text-center">
					<Avatar 
						variant="bordered" 
						shape="circle" 
						color="primary" 
						fallback="CI" 
						size="xl" 
					/>
					<p class="text-sm mt-2">Circle + Primary</p>
				</div>
				<div class="text-center">
					<Avatar 
						variant="bordered" 
						shape="rounded" 
						color="green" 
						fallback="RO" 
						size="xl" 
					/>
					<p class="text-sm mt-2">Rounded + Green</p>
				</div>
				<div class="text-center">
					<Avatar 
						variant="bordered" 
						shape="square" 
						color="purple" 
						fallback="SQ" 
						size="xl" 
					/>
					<p class="text-sm mt-2">Square + Purple</p>
				</div>
				<div class="text-center">
					<Avatar 
						variant="bordered" 
						shape="square" 
						color="gradient" 
						fallback="GR" 
						size="xl" 
					/>
					<p class="text-sm mt-2">Square + Gradient</p>
				</div>
			</div>
		</section>

		<!-- Fallback Examples -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Fallback Examples</h2>
			<div class="flex items-center gap-6">
				<div class="text-center">
					<Avatar fallback="John Doe" color="primary" size="lg" />
					<p class="text-sm mt-2">Initials from Name</p>
				</div>
				<div class="text-center">
					<Avatar fallback="AB" color="green" size="lg" />
					<p class="text-sm mt-2">Custom Initials</p>
				</div>
				<div class="text-center">
					<Avatar size="lg" />
					<p class="text-sm mt-2">Default Icon</p>
				</div>
				<div class="text-center">
					<Avatar size="lg" color="purple">
						{#snippet customFallback()}
							<svg class="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						{/snippet}
					</Avatar>
					<p class="text-sm mt-2">Custom Icon</p>
				</div>
			</div>
		</section>

		<!-- Status Indicators -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Status Indicators</h2>
			<p class="text-sm text-muted-foreground mb-4">
				Display online, offline, away, and busy status with colored indicators.
			</p>
			<div class="flex flex-wrap gap-6">
				<div class="text-center">
					<Avatar 
						status="online" 
						src={users[0].image} 
						alt="User" 
						fallback="ON" 
						size="xl" 
					/>
					<p class="text-sm mt-2">Online</p>
				</div>
				<div class="text-center">
					<Avatar 
						status="offline" 
						src={users[1].image} 
						alt="User" 
						fallback="OF" 
						size="xl" 
					/>
					<p class="text-sm mt-2">Offline</p>
				</div>
				<div class="text-center">
					<Avatar 
						status="away" 
						src={users[2].image} 
						alt="User" 
						fallback="AW" 
						size="xl" 
					/>
					<p class="text-sm mt-2">Away</p>
				</div>
				<div class="text-center">
					<Avatar 
						status="busy" 
						src={users[3].image} 
						alt="User" 
						fallback="BS" 
						size="xl" 
					/>
					<p class="text-sm mt-2">Busy</p>
				</div>
			</div>
		</section>

		<!-- Notifications -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Notification Badges</h2>
			<p class="text-sm text-muted-foreground mb-4">
				Show notification badges with optional counts. Displays "99+" for counts over 99.
			</p>
			<div class="flex flex-wrap gap-6">
				<div class="text-center">
					<Avatar 
						showNotification 
						src={users[0].image} 
						alt="User" 
						fallback="NT" 
						size="xl" 
					/>
					<p class="text-sm mt-2">No Count</p>
				</div>
				<div class="text-center">
					<Avatar 
						showNotification 
						notificationCount={3}
						src={users[1].image} 
						alt="User" 
						fallback="NC" 
						size="xl" 
					/>
					<p class="text-sm mt-2">Count: 3</p>
				</div>
				<div class="text-center">
					<Avatar 
						showNotification 
						notificationCount={25}
						src={users[2].image} 
						alt="User" 
						fallback="HC" 
						size="xl" 
					/>
					<p class="text-sm mt-2">Count: 25</p>
				</div>
				<div class="text-center">
					<Avatar 
						showNotification 
						notificationCount={150}
						src={users[3].image} 
						alt="User" 
						fallback="OF" 
						size="xl" 
					/>
					<p class="text-sm mt-2">Count: 99+</p>
				</div>
			</div>
		</section>

		<!-- Combined Features -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Combined Features</h2>
			<p class="text-sm text-muted-foreground mb-4">
				Combine status indicators, notifications, borders, and colors for rich user presence display.
			</p>
			<div class="flex flex-wrap gap-6">
				<div class="text-center">
					<Avatar 
						status="online"
						showNotification
						notificationCount={5}
						src={users[0].image} 
						alt="User" 
						fallback="ON" 
						size="xl" 
					/>
					<p class="text-sm mt-2">Online + Badge</p>
				</div>
				<div class="text-center">
					<Avatar 
						variant="bordered"
						color="primary"
						status="busy"
						src={users[1].image} 
						alt="User" 
						fallback="BS" 
						size="xl" 
					/>
					<p class="text-sm mt-2">Bordered + Busy</p>
				</div>
				<div class="text-center">
					<Avatar 
						variant="bordered"
						color="green"
						status="away"
						showNotification
						notificationCount={12}
						src={users[2].image} 
						alt="User" 
						fallback="AF" 
						size="xl" 
					/>
					<p class="text-sm mt-2">All Features</p>
				</div>
				<div class="text-center">
					<Avatar 
						shape="rounded"
						variant="bordered"
						color="purple"
						status="online"
						showNotification
						notificationCount={99}
						src={users[3].image} 
						alt="User" 
						fallback="RA" 
						size="xl" 
					/>
					<p class="text-sm mt-2">Rounded + All</p>
				</div>
			</div>
		</section>

		<!-- Avatar Groups -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Avatar Groups</h2>
			
			<div class="space-y-6">
				<div>
					<p class="text-sm text-muted-foreground mb-3">Default spacing</p>
					<AvatarGroup>
						{#each users as user}
							<Avatar 
								src={user.image} 
								alt={user.name} 
								fallback={user.name}
								variant="bordered"
							/>
						{/each}
					</AvatarGroup>
				</div>

				<div>
					<p class="text-sm text-muted-foreground mb-3">Tight spacing</p>
					<AvatarGroup spacing="tight">
						{#each users as user}
							<Avatar 
								src={user.image} 
								alt={user.name} 
								fallback={user.name}
								variant="bordered"
                                color="green"
							/>
						{/each}
					</AvatarGroup>
				</div>

				<div>
					<p class="text-sm text-muted-foreground mb-3">Loose spacing</p>
					<AvatarGroup spacing="loose">
						{#each users.slice(0, 3) as user}
							<Avatar 
								src={user.image} 
								alt={user.name} 
								fallback={user.name}
								variant="bordered"
							/>
						{/each}
					</AvatarGroup>
				</div>

				<div>
					<p class="text-sm text-muted-foreground mb-3">Large size group</p>
					<AvatarGroup>
						{#each users.slice(0, 4) as user}
							<Avatar 
								src={user.image} 
								alt={user.name} 
								fallback={user.name}
								variant="bordered"
								size="lg"
							/>
						{/each}
					</AvatarGroup>
				</div>

				<div>
					<p class="text-sm text-muted-foreground mb-3">Colored avatars group</p>
					<AvatarGroup>
						{#each team as member}
							<Avatar 
								fallback={member.name}
								color={member.color}
								variant="bordered"
							/>
						{/each}
					</AvatarGroup>
				</div>
			</div>
		</section>

		<!-- User Cards -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">User Cards</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each team as member, i}
					<div class="p-4 border rounded-lg flex items-center gap-3">
						<Avatar
							fallback={member.name}
							color={member.color}
							variant="bordered"
							size="lg"
							status={["online", "busy", "away", "offline"][i]}
							showNotification={i % 2 === 0}
							notificationCount={i % 2 === 0 ? (i + 1) * 3 : undefined}
						/>
						<div>
							<p class="font-medium">{member.name}</p>
							<p class="text-sm text-muted-foreground">{member.role}</p>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Combined Styles -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Combined Styles</h2>
			<div class="flex flex-wrap gap-6">
				<div class="text-center">
					<Avatar
						src={users[0].image}
						alt="Bordered Circle"
						fallback="BC"
						variant="bordered"
						size="xl"
					/>
					<p class="text-sm mt-2">Bordered Circle</p>
				</div>
				<div class="text-center">
					<Avatar
						shape="square"
						variant="bordered"
						color="primary"
						fallback="SB"
						size="xl"
					/>
					<p class="text-sm mt-2">Square Bordered</p>
				</div>
				<div class="text-center">
					<Avatar
						shape="rounded"
						variant="solid"
						color="gradient"
						fallback="GR"
						size="xl"
					/>
					<p class="text-sm mt-2">Rounded Gradient</p>
				</div>
				<div class="text-center">
					<Avatar
						shape="square"
						color="red"
						fallback="SD"
						size="xl"
					/>
					<p class="text-sm mt-2">Square Red</p>
				</div>
			</div>
		</section>
	</div>
</div>
