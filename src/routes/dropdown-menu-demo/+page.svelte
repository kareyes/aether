<script lang="ts">
	import { DropdownMenu as DropdownMenuSimple} from "$lib/components/ui/dropdown-menu";
	import { User, Settings, LogOut, Plus, Mail, UserPlus, MessageSquare, Bell, Shield, HelpCircle, Download, Upload, Trash2, Edit, Copy, Share2, FileText, Image, Video, Music, Folder, File } from "@lucide/svelte";

	let statusBarChecked = $state(true);
	let toolbarChecked = $state(true);
	let sidebarChecked = $state(false);
	let theme = $state("light");
	let selectedPlan = $state("free");

	// Basic menu example
	const basicMenuItems = [
		{ label: "Profile", icon: User, onSelect: () => console.log("Profile clicked") },
		{ label: "Settings", icon: Settings, onSelect: () => console.log("Settings clicked") },
		{ type: "separator" as const },
		{ label: "Logout", icon: LogOut, variant: "destructive" as const, onSelect: () => console.log("Logout clicked") },
	];

	// Menu with shortcuts
	const fileMenuItems = [
		{ label: "New File", icon: Plus, shortcut: "⌘N", onSelect: () => console.log("New file") },
		{ label: "Upload", icon: Upload, shortcut: "⌘U", onSelect: () => console.log("Upload") },
		{ label: "Download", icon: Download, shortcut: "⌘D", onSelect: () => console.log("Download") },
		{ type: "separator" as const },
		{ label: "Delete", icon: Trash2, variant: "destructive" as const, shortcut: "⌘⌫", onSelect: () => console.log("Delete") },
	];

	// Checkbox menu (reactive)
	const viewMenuItems = $derived([
		{ type: "label" as const, label: "View Options" },
		{ type: "checkbox" as const, label: "Show Status Bar", checked: statusBarChecked, onSelect: () => statusBarChecked = !statusBarChecked },
		{ type: "checkbox" as const, label: "Show Toolbar", checked: toolbarChecked, onSelect: () => toolbarChecked = !toolbarChecked },
		{ type: "checkbox" as const, label: "Show Sidebar", checked: sidebarChecked, onSelect: () => sidebarChecked = !sidebarChecked },
	]);

	// Radio group menu (reactive)
	const themeMenuItems = $derived([
		{
			type: "radio" as const,
			label: "Select Theme",
			value: theme,
			items: [
				{ label: "Light", value: "light" },
				{ label: "Dark", value: "dark" },
				{ label: "System", value: "system" },
			],
			onValueChange: (value: string) => { theme = value; console.log("Theme:", value); },
		},
	]);

	// Grouped menu
	const groupedMenuItems = [
		{
			label: "Account",
			items: [
				{ label: "Profile", icon: User, onSelect: () => console.log("Profile") },
				{ label: "Settings", icon: Settings, onSelect: () => console.log("Settings") },
				{ label: "Notifications", icon: Bell, onSelect: () => console.log("Notifications") },
			],
		},
		{ type: "separator" as const },
		{
			label: "Actions",
			items: [
				{ label: "Edit", icon: Edit, onSelect: () => console.log("Edit") },
				{ label: "Copy", icon: Copy, onSelect: () => console.log("Copy") },
				{ label: "Delete", icon: Trash2, variant: "destructive" as const, onSelect: () => console.log("Delete") },
			],
		},
		{ type: "separator" as const },
		{
			items: [
				{ label: "Help", icon: HelpCircle, onSelect: () => console.log("Help") },
				{ label: "Logout", icon: LogOut, variant: "destructive" as const, onSelect: () => console.log("Logout") },
			],
		},
	];

	// Complex combined menu
	const complexMenuItems = $derived([
		{
			label: "My Account",
			items: [
				{ label: "Profile", icon: User, shortcut: "⌘P", onSelect: () => console.log("Profile") },
				{ label: "Settings", icon: Settings, shortcut: "⌘,", onSelect: () => console.log("Settings") },
			],
		},
		{ type: "separator" as const },
		{
			type: "radio" as const,
			label: "Theme",
			value: theme,
			items: [
				{ label: "Light", value: "light" },
				{ label: "Dark", value: "dark" },
				{ label: "System", value: "system" },
			],
			onValueChange: (value: string) => { theme = value; },
		},
		{ type: "separator" as const },
		{
			label: "View",
			items: [
				{ type: "checkbox" as const, label: "Status Bar", checked: statusBarChecked, onSelect: () => statusBarChecked = !statusBarChecked },
				{ type: "checkbox" as const, label: "Toolbar", checked: toolbarChecked, onSelect: () => toolbarChecked = !toolbarChecked },
			],
		},
		{ type: "separator" as const },
		{
			items: [
				{ label: "Help", icon: HelpCircle, shortcut: "⌘?", onSelect: () => console.log("Help") },
				{ label: "Logout", icon: LogOut, variant: "destructive" as const, shortcut: "⌘Q", onSelect: () => console.log("Logout") },
			],
		},
	]);

	// Plan selector
	const planMenuItems = $derived([
		{
			type: "radio" as const,
			label: "Select Plan",
			value: selectedPlan,
			items: [
				{ label: "Free Plan", value: "free" },
				{ label: "Pro Plan", value: "pro" },
				{ label: "Enterprise Plan", value: "enterprise" },
			],
			onValueChange: (value: string) => { selectedPlan = value; console.log("Plan:", value); },
		},
	]);

	// Submenu examples
	const shareMenuItems = [
		{ label: "Profile", icon: User, onSelect: () => console.log("Profile") },
		{ 
			type: "submenu" as const,
			label: "Share",
			icon: Share2,
			items: [
				{ label: "Copy Link", icon: Copy, onSelect: () => console.log("Copy Link") },
				{ label: "Download", icon: Download, onSelect: () => console.log("Download") },
				{ type: "separator" as const },
				{ label: "Email", icon: Mail, onSelect: () => console.log("Email") },
				{ label: "Message", icon: MessageSquare, onSelect: () => console.log("Message") },
			]
		},
		{ type: "separator" as const },
		{ label: "Settings", icon: Settings, onSelect: () => console.log("Settings") },
	];

	const fileMenuWithSubmenu = [
		{ label: "New File", icon: Plus, shortcut: "⌘N", onSelect: () => console.log("New file") },
		{ 
			type: "submenu" as const,
			label: "New From Template",
			icon: FileText,
			items: [
				{ label: "Text Document", icon: FileText, onSelect: () => console.log("Text") },
				{ label: "Image", icon: Image, onSelect: () => console.log("Image") },
				{ label: "Video", icon: Video, onSelect: () => console.log("Video") },
				{ label: "Audio", icon: Music, onSelect: () => console.log("Audio") },
			]
		},
		{ type: "separator" as const },
		{ label: "Upload", icon: Upload, shortcut: "⌘U", onSelect: () => console.log("Upload") },
		{ label: "Download", icon: Download, shortcut: "⌘D", onSelect: () => console.log("Download") },
		{ type: "separator" as const },
		{ label: "Delete", icon: Trash2, variant: "destructive" as const, shortcut: "⌘⌫", onSelect: () => console.log("Delete") },
	];

	const nestedSubmenuItems = [
		{ label: "Home", onSelect: () => console.log("Home") },
		{ 
			type: "submenu" as const,
			label: "File",
			icon: Folder,
			items: [
				{ label: "New", icon: Plus, shortcut: "⌘N", onSelect: () => console.log("New") },
				{ 
					type: "submenu" as const,
					label: "Open Recent",
					items: [
						{ label: "Document 1.txt", icon: File, onSelect: () => console.log("Doc 1") },
						{ label: "Document 2.txt", icon: File, onSelect: () => console.log("Doc 2") },
						{ label: "Document 3.txt", icon: File, onSelect: () => console.log("Doc 3") },
					]
				},
				{ type: "separator" as const },
				{ label: "Save", shortcut: "⌘S", onSelect: () => console.log("Save") },
			]
		},
		{ type: "separator" as const },
		{ label: "Exit", variant: "destructive" as const, onSelect: () => console.log("Exit") },
	];
</script>

<div class="container mx-auto p-6 max-w-6xl">
	<div class="mb-8">
		<h1 class="text-3xl font-bold mb-2">Simplified Dropdown Menu</h1>
		<p class="text-muted-foreground">
			A simplified dropdown menu component that handles common use cases with minimal code.
		</p>
	</div>

	<div class="space-y-12">
		<!-- Basic Examples -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Basic Menus</h2>
			<div class="flex flex-wrap gap-4">
				<DropdownMenuSimple
					triggerText="User Menu"
					items={basicMenuItems}
				/>

				<DropdownMenuSimple
					triggerText="File Actions"
					triggerVariant="default"
					items={fileMenuItems}
				/>

				<DropdownMenuSimple
					triggerText="With Icon"
					triggerIcon={Plus}
					triggerVariant="secondary"
					items={basicMenuItems}
				/>

				<DropdownMenuSimple
					triggerText="No Chevron"
					showChevron={false}
					items={basicMenuItems}
				/>
			</div>
		</section>

		<!-- Interactive Examples -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Interactive Menus</h2>
			<div class="space-y-4">
				<div class="flex flex-wrap gap-4">
					<DropdownMenuSimple
						triggerText="View Options"
						items={viewMenuItems}
					/>
					<div class="flex items-center gap-4 text-sm text-muted-foreground">
						<span>Status Bar: {statusBarChecked ? '✓' : '✗'}</span>
						<span>Toolbar: {toolbarChecked ? '✓' : '✗'}</span>
						<span>Sidebar: {sidebarChecked ? '✓' : '✗'}</span>
					</div>
				</div>

				<div class="flex flex-wrap gap-4">
					<DropdownMenuSimple
						triggerText={`Theme: ${theme}`}
						items={themeMenuItems}
					/>
					<div class="text-sm text-muted-foreground">
						Current theme: <span class="font-medium">{theme}</span>
					</div>
				</div>

				<div class="flex flex-wrap gap-4">
					<DropdownMenuSimple
						triggerText={`Plan: ${selectedPlan}`}
						triggerVariant="outline"
						items={planMenuItems}
					/>
					<div class="text-sm text-muted-foreground">
						Selected plan: <span class="font-medium capitalize">{selectedPlan}</span>
					</div>
				</div>
			</div>
		</section>

		<!-- Grouped Menu -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Grouped Menu</h2>
			<div>
				<DropdownMenuSimple
					triggerText="Actions"
					triggerVariant="outline"
					items={groupedMenuItems}
				/>
			</div>
		</section>

		<!-- Complex Menu -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Complex Combined Menu</h2>
			<div class="space-y-4">
				<DropdownMenuSimple
					triggerText="Account Settings"
					triggerVariant="default"
					items={complexMenuItems}
				/>
				<div class="grid grid-cols-2 gap-4 max-w-md">
					<div class="p-3 rounded-md bg-muted/50">
						<div class="text-xs font-medium text-muted-foreground mb-1">Theme</div>
						<div class="text-sm font-medium">{theme}</div>
					</div>
					<div class="p-3 rounded-md bg-muted/50">
						<div class="text-xs font-medium text-muted-foreground mb-1">View Options</div>
						<div class="text-xs space-y-0.5">
							<div>Status Bar: {statusBarChecked ? '✓' : '✗'}</div>
							<div>Toolbar: {toolbarChecked ? '✓' : '✗'}</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Trigger Variants -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Trigger Variants</h2>
			<div class="flex flex-wrap gap-4">
				<DropdownMenuSimple triggerText="Default" triggerVariant="default" items={basicMenuItems} />
				<DropdownMenuSimple triggerText="Secondary" triggerVariant="secondary" items={basicMenuItems} />
				<DropdownMenuSimple triggerText="Outline" triggerVariant="outline" items={basicMenuItems} />
				<DropdownMenuSimple triggerText="Ghost" triggerVariant="ghost" items={basicMenuItems} />
				<DropdownMenuSimple triggerText="Destructive" triggerVariant="destructive" items={basicMenuItems} />
			</div>
		</section>

		<!-- Sizes -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Sizes</h2>
			<div class="flex flex-wrap items-center gap-4">
				<DropdownMenuSimple triggerText="Small" triggerSize="sm" items={basicMenuItems} />
				<DropdownMenuSimple triggerText="Default" triggerSize="default" items={basicMenuItems} />
				<DropdownMenuSimple triggerText="Large" triggerSize="lg" items={basicMenuItems} />
			</div>
		</section>

		<!-- Alignment -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">Content Alignment</h2>
			<div class="flex flex-wrap gap-4">
				<DropdownMenuSimple triggerText="Align Start" align="start" items={basicMenuItems} />
				<DropdownMenuSimple triggerText="Align Center" align="center" items={basicMenuItems} />
				<DropdownMenuSimple triggerText="Align End" align="end" items={basicMenuItems} />
			</div>
		</section>

		<!-- Submenu Examples -->
		<section>
			<h2 class="text-2xl font-semibold mb-4">With Submenu</h2>
			<div class="flex flex-wrap gap-4">
				<DropdownMenuSimple
					triggerText="Share Menu"
					triggerIcon={Share2}
					items={shareMenuItems}
				/>

				<DropdownMenuSimple
					triggerText="File Menu"
					triggerVariant="outline"
					items={fileMenuWithSubmenu}
				/>

				<DropdownMenuSimple
					triggerText="Nested Submenus"
					triggerVariant="secondary"
					items={nestedSubmenuItems}
				/>

			</div>
		</section>
	</div>
</div>
