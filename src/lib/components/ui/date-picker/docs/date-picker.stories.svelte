<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { DatePicker, DateRangePicker, DatePickerWithPresets, DateRangePickerWithPresets } from "$core/components/ui/date-picker";
	import { type DateValue, today, getLocalTimeZone } from "@internationalized/date";
	import type { DateRange } from "bits-ui";
	import * as Field from '$core/components/ui/field';
	import { Button } from '$core/components/ui/button';
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


<Story name="With Initial Value">
	<div class="max-w-md">
		<DatePicker value={today(getLocalTimeZone())} />
		<div class="mt-2 text-sm text-muted-foreground">
			Initialized with today's date
		</div>
	</div>
</Story>


<Story name="Disabled">
	<div class="max-w-md">
		<DatePicker bind:value={disabledDate} disabled />
		<div class="mt-2 text-sm text-muted-foreground">
			This date picker is disabled
		</div>
	</div>
</Story>


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


<Story name="Variant - Default">
	<div class="max-w-md">
		<DatePicker bind:value={defaultVariantDate} buttonVariant="default" />
		<div class="mt-2 text-sm text-muted-foreground">
			Button variant: default
		</div>
	</div>
</Story>


<Story name="Variant - Ghost">
	<div class="max-w-md">
		<DatePicker bind:value={ghostVariantDate} buttonVariant="ghost" />
		<div class="mt-2 text-sm text-muted-foreground">
			Button variant: ghost
		</div>
	</div>
</Story>


<Story name="Variant - Secondary">
	<div class="max-w-md">
		<DatePicker bind:value={secondaryVariantDate} buttonVariant="secondary" />
		<div class="mt-2 text-sm text-muted-foreground">
			Button variant: secondary
		</div>
	</div>
</Story>


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


<Story name="Field with Basic DatePicker">
	{#snippet template()}
		<Field.Field
			label="Date of Birth"
			description="Select your birth date"
		>
			<DatePicker />
		</Field.Field>
	{/snippet}
</Story>

<Story name="Field with Validation">
	{#snippet template()}
		<Field.Field
			label="Project Start Date"
			description="When will your project begin?"
			required
			error="Please select a start date"
		>
			<DatePicker 
				error={true}
			/>
		</Field.Field>
	{/snippet}
</Story>

<Story name="Field with DateRangePicker">
	{#snippet template()}
		<Field.Field
			label="Event Duration"
			description="Select the start and end dates for your event"
			required
		>
			<DateRangePicker />
		</Field.Field>
	{/snippet}
</Story>

<Story name="Field with Presets">
	{#snippet template()}
		<Field.Field
			label="Appointment Date"
			description="Choose a date or select from quick options"
		>
			<DatePickerWithPresets />
		</Field.Field>
	{/snippet}
</Story>



<Story name="Complete Booking Form">
	{#snippet template()}
		<div class="w-full max-w-md">
			<Field.Set>
				<Field.Legend>Hotel Booking</Field.Legend>
				<Field.Description>Select your stay dates and personal information</Field.Description>
				
				<Field.Separator />
				
				<Field.Group class="gap-4">
					<Field.Field
						label="Check-in Date"
						description="Select your arrival date"
						required
					>
						<DatePicker 
							buttonVariant="outline"
							buttonClass="w-full"
						/>
					</Field.Field>
					
					<Field.Field
						label="Stay Duration"
						description="Select check-in and check-out dates"
						required
					>
						<DateRangePicker 
							buttonVariant="outline"
							buttonClass="w-full"
						/>
					</Field.Field>
					
					<Field.Field
						label="Date of Birth"
						description="For age verification (optional)"
					>
						<DatePicker 
							buttonVariant="ghost"
						/>
					</Field.Field>
				</Field.Group>
				
				<div class="flex gap-4 pt-4">
					<Button type="submit">Book Now</Button>
					<Button variant="outline" type="button">Clear Dates</Button>
				</div>
			</Field.Set>
		</div>
	{/snippet}
</Story>


