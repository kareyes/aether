<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { DatePicker, DateRangePicker, DatePickerWithPresets, DateRangePickerWithPresets } from "$lib/components/ui/date-picker";
	import { type DateValue, today, getLocalTimeZone } from "@internationalized/date";
	import type { DateRange } from "bits-ui";
	import Layout from "$core/components/layout-story/layout.svelte";

	const { Story } = defineMeta({
		title: "Components/Date Picker",
		component: Layout,
		tags: ["autodocs"],
	});
</script>

<script lang="ts">
	let singleDate = $state<DateValue | undefined>();
	let dateRange = $state<DateRange | undefined>();
	let presetDate = $state<DateValue | undefined>();
	let presetRange = $state<DateRange | undefined>();
	let disabledDate = $state<DateValue | undefined>();
	let customFormatDate = $state<DateValue | undefined>();
	let defaultVariantDate = $state<DateValue | undefined>();
	let ghostVariantDate = $state<DateValue | undefined>();
	let secondaryVariantDate = $state<DateValue | undefined>();
</script>

<!-- Single Date Picker -->
<Story name="Single Date Picker">
	<div class="max-w-md">
		<DatePicker bind:value={singleDate} />
		{#if singleDate}
			<div class="mt-2 text-sm text-muted-foreground">
				Selected: {singleDate.toDate(getLocalTimeZone()).toLocaleDateString()}
			</div>
		{/if}
	</div>
</Story>

<!-- Date Range Picker -->
<Story name="Date Range Picker">
	<div class="max-w-md">
		<DateRangePicker bind:value={dateRange} />
		{#if dateRange?.start && dateRange?.end}
			<div class="mt-2 text-sm text-muted-foreground">
				Selected: {dateRange.start.toDate(getLocalTimeZone()).toLocaleDateString()} - {dateRange.end.toDate(getLocalTimeZone()).toLocaleDateString()}
			</div>
		{/if}
	</div>
</Story>

<!-- Date Picker with Presets -->
<Story name="With Presets">
	<div class="max-w-md">
		<DatePickerWithPresets bind:value={presetDate} />
		{#if presetDate}
			<div class="mt-2 text-sm text-muted-foreground">
				Selected: {presetDate.toDate(getLocalTimeZone()).toLocaleDateString()}
			</div>
		{/if}
	</div>
</Story>

<!-- Date Range Picker with Presets -->
<Story name="Range With Presets">
	<div class="max-w-md">
		<DateRangePickerWithPresets bind:value={presetRange} />
		{#if presetRange?.start && presetRange?.end}
			<div class="mt-2 text-sm text-muted-foreground">
				Selected: {presetRange.start.toDate(getLocalTimeZone()).toLocaleDateString()} - {presetRange.end.toDate(getLocalTimeZone()).toLocaleDateString()}
			</div>
		{/if}
	</div>
</Story>

<!-- With Initial Value -->
<Story name="With Initial Value">
	<div class="max-w-md">
		<DatePicker value={today(getLocalTimeZone())} />
		<div class="mt-2 text-sm text-muted-foreground">
			Initialized with today's date
		</div>
	</div>
</Story>

<!-- Disabled State -->
<Story name="Disabled">
	<div class="max-w-md">
		<DatePicker bind:value={disabledDate} disabled />
		<div class="mt-2 text-sm text-muted-foreground">
			This date picker is disabled
		</div>
	</div>
</Story>

<!-- Custom Format -->
<Story name="Custom Format">
	<div class="max-w-md">
		<DatePicker 
			bind:value={customFormatDate}
			format={(date) => {
				if (!date?.toDate) return "Select date";
				return date.toDate(getLocalTimeZone()).toLocaleDateString("en-US", {
					weekday: "long",
					year: "numeric",
					month: "long",
					day: "numeric"
				});
			}}
		/>
		{#if customFormatDate}
			<div class="mt-2 text-sm text-muted-foreground">
				Custom format: "Weekday, Month Day, Year"
			</div>
		{/if}
	</div>
</Story>

<!-- Button Variant: Default -->
<Story name="Variant - Default">
	<div class="max-w-md">
		<DatePicker bind:value={defaultVariantDate} buttonVariant="default" />
		<div class="mt-2 text-sm text-muted-foreground">
			Button variant: default
		</div>
	</div>
</Story>

<!-- Button Variant: Ghost -->
<Story name="Variant - Ghost">
	<div class="max-w-md">
		<DatePicker bind:value={ghostVariantDate} buttonVariant="ghost" />
		<div class="mt-2 text-sm text-muted-foreground">
			Button variant: ghost
		</div>
	</div>
</Story>

<!-- Button Variant: Secondary -->
<Story name="Variant - Secondary">
	<div class="max-w-md">
		<DatePicker bind:value={secondaryVariantDate} buttonVariant="secondary" />
		<div class="mt-2 text-sm text-muted-foreground">
			Button variant: secondary
		</div>
	</div>
</Story>

<!-- All Variants Comparison -->
<Story name="All Button Variants">
	<div class="space-y-4 max-w-md">
		<div class="space-y-2">
			<div class="text-sm font-medium">Default</div>
			<DatePicker buttonVariant="default" />
		</div>
		<div class="space-y-2">
			<div class="text-sm font-medium">Outline</div>
			<DatePicker buttonVariant="outline" />
		</div>
		<div class="space-y-2">
			<div class="text-sm font-medium">Ghost</div>
			<DatePicker buttonVariant="ghost" />
		</div>
		<div class="space-y-2">
			<div class="text-sm font-medium">Secondary</div>
			<DatePicker buttonVariant="secondary" />
		</div>
		<div class="space-y-2">
			<div class="text-sm font-medium">Destructive</div>
			<DatePicker buttonVariant="destructive" />
		</div>
	</div>
</Story>

<!-- Custom Button Class -->
<Story name="Custom Button Styling">
	<div class="max-w-md">
		<DatePicker 
			buttonClass="w-64 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950 dark:hover:bg-blue-900"
		/>
		<div class="mt-2 text-sm text-muted-foreground">
			Custom button with blue background
		</div>
	</div>
</Story>

<!-- Range with Custom Presets -->
<Story name="Custom Range Presets">
	<div class="max-w-md">
		<DateRangePickerWithPresets
			presets={[
				{ 
					label: "Last 3 days", 
					value: { 
						start: today(getLocalTimeZone()).subtract({ days: 2 }), 
						end: today(getLocalTimeZone()) 
					} 
				},
				{ 
					label: "Last 14 days", 
					value: { 
						start: today(getLocalTimeZone()).subtract({ days: 13 }), 
						end: today(getLocalTimeZone()) 
					} 
				},
				{ 
					label: "Last 90 days", 
					value: { 
						start: today(getLocalTimeZone()).subtract({ days: 89 }), 
						end: today(getLocalTimeZone()) 
					} 
				},
			]}
		/>
		<div class="mt-2 text-sm text-muted-foreground">
			Custom preset options: Last 3, 14, and 90 days
		</div>
	</div>
</Story>

<!-- Single Date with Custom Presets -->
<Story name="Custom Single Date Presets">
	<div class="max-w-md">
		<DatePickerWithPresets
			presets={[
				{ label: "Today", value: today(getLocalTimeZone()) },
				{ label: "Next Monday", value: today(getLocalTimeZone()).add({ days: (8 - today(getLocalTimeZone()).toDate(getLocalTimeZone()).getDay()) % 7 || 7 }) },
				{ label: "1st of Next Month", value: today(getLocalTimeZone()).add({ months: 1 }).set({ day: 1 }) },
				{ label: "New Year", value: today(getLocalTimeZone()).add({ years: 1 }).set({ month: 1, day: 1 }) },
			]}
		/>
		<div class="mt-2 text-sm text-muted-foreground">
			Custom presets: Today, Next Monday, 1st of Next Month, New Year
		</div>
	</div>
</Story>

<!-- Full Width -->
<Story name="Full Width">
	<div class="w-full">
		<DatePicker class="w-full" />
		<div class="mt-2 text-sm text-muted-foreground">
			Full width date picker
		</div>
	</div>
</Story>
