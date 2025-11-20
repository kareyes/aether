<script lang="ts">
	import { DatePicker, DateRangePicker, DatePickerWithPresets, DateRangePickerWithPresets } from "$lib/components/ui/date-picker";
	import { type DateValue, CalendarDate, today, getLocalTimeZone } from "@internationalized/date";
	import type { DateRange } from "bits-ui";

	let singleDate = $state<DateValue | undefined>();
	let dateRange = $state<DateRange | undefined>();
	let presetDate = $state<DateValue | undefined>();
	let presetRange = $state<DateRange | undefined>();
	let disabledDate = $state<DateValue | undefined>();
</script>

<div class="container mx-auto py-10 space-y-8">
	<div class="space-y-2">
		<h1 class="text-4xl font-bold">Date Picker Components</h1>
		<p class="text-muted-foreground">
			A collection of date picker components built with Calendar, RangeCalendar, and Popover.
		</p>
	</div>

	<!-- Basic Date Picker -->
	<section class="space-y-4">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold">Date Picker</h2>
			<p class="text-sm text-muted-foreground">
				Select a single date with a popover calendar.
			</p>
		</div>
		<div class="grid gap-4 max-w-md">
			<DatePicker bind:value={singleDate} />
			{#if singleDate && typeof singleDate.toDate === "function"}
				<div class="text-sm text-muted-foreground">
					Selected: {singleDate.toDate(getLocalTimeZone()).toLocaleDateString()}
				</div>
			{/if}
		</div>
	</section>

	<!-- Date Range Picker -->
	<section class="space-y-4">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold">Date Range Picker</h2>
			<p class="text-sm text-muted-foreground">
				Select a date range with two calendars side by side.
			</p>
		</div>
		<div class="grid gap-4 max-w-md">
			<DateRangePicker bind:value={dateRange} />
			{#if dateRange?.start && dateRange?.end && typeof dateRange.start.toDate === "function" && typeof dateRange.end.toDate === "function"}
				<div class="text-sm text-muted-foreground">
					Selected: {dateRange.start.toDate(getLocalTimeZone()).toLocaleDateString()} - {dateRange.end.toDate(getLocalTimeZone()).toLocaleDateString()}
				</div>
			{/if}
		</div>
	</section>

	<!-- Date Picker with Presets -->
	<section class="space-y-4">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold">Date Picker with Presets</h2>
			<p class="text-sm text-muted-foreground">
				Quick date selection with preset options.
			</p>
		</div>
		<div class="grid gap-4 max-w-md">
			<DatePickerWithPresets bind:value={presetDate} />
			{#if presetDate && typeof presetDate.toDate === "function"}
				<div class="text-sm text-muted-foreground">
					Selected: {presetDate.toDate(getLocalTimeZone()).toLocaleDateString()}
				</div>
			{/if}
		</div>
	</section>

	<!-- Date Range Picker with Presets -->
	<section class="space-y-4">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold">Date Range Picker with Presets</h2>
			<p class="text-sm text-muted-foreground">
				Quick date range selection with common preset ranges.
			</p>
		</div>
		<div class="grid gap-4 max-w-md">
			<DateRangePickerWithPresets bind:value={presetRange} />
			{#if presetRange?.start && presetRange?.end && typeof presetRange.start.toDate === "function" && typeof presetRange.end.toDate === "function"}
				<div class="text-sm text-muted-foreground">
					Selected: {presetRange.start.toDate(getLocalTimeZone()).toLocaleDateString()} - {presetRange.end.toDate(getLocalTimeZone()).toLocaleDateString()}
				</div>
			{/if}
		</div>
	</section>

	<!-- Button Variants -->
	<section class="space-y-4">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold">Button Variants</h2>
			<p class="text-sm text-muted-foreground">
				Different button styles for the date picker trigger.
			</p>
		</div>
		<div class="grid gap-4 max-w-md">
			<DatePicker buttonVariant="default" />
			<DatePicker buttonVariant="outline" />
			<DatePicker buttonVariant="ghost" />
			<DatePicker buttonVariant="secondary" />
		</div>
	</section>

	<!-- Disabled State -->
	<section class="space-y-4">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold">Disabled State</h2>
			<p class="text-sm text-muted-foreground">
				Date picker in disabled state.
			</p>
		</div>
		<div class="grid gap-4 max-w-md">
			<DatePicker bind:value={disabledDate} disabled />
		</div>
	</section>

	<!-- Custom Format -->
	<section class="space-y-4">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold">Custom Format</h2>
			<p class="text-sm text-muted-foreground">
				Customize the date display format.
			</p>
		</div>
		<div class="grid gap-4 max-w-md">
			<DatePicker 
				format={(date) => {
					if (!date) return "Select date";
					return date.toDate(getLocalTimeZone()).toLocaleDateString("en-US", {
						weekday: "long",
						year: "numeric",
						month: "long",
						day: "numeric"
					});
				}}
			/>
		</div>
	</section>
</div>