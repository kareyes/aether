<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Calendar } from "$lib/components/ui/calendar";
	import { today, getLocalTimeZone, isWeekend, type DateValue } from "@internationalized/date";
	import type { Args } from "storybook/internal/types";

	const { Story } = defineMeta({
		title: "Components/Calendar",
		component: Calendar,
		tags: ["autodocs"],
	});
</script>

<script lang="ts">
	let singleDate = $state<DateValue | undefined>();
	let dropdownDate = $state<DateValue | undefined>();
	let constrainedDate = $state<DateValue | undefined>();
	let multiMonthDate = $state<DateValue | undefined>();
</script>

<Story name="Default">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar type="single" bind:value={singleDate} {...args} />
			{#if singleDate}
				<div class="mt-2 text-sm text-muted-foreground">
					Selected: {singleDate.toDate(getLocalTimeZone()).toLocaleDateString()}
				</div>
			{/if}
		</div>
	{/snippet}
</Story>

<Story name="With Initial Value">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar type="single" value={today(getLocalTimeZone())} {...args} />
			<div class="mt-2 text-sm text-muted-foreground">
				Initialized with today's date
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Dropdown Navigation">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar
				type="single"
				bind:value={dropdownDate}
				captionLayout="dropdown"
				{...args}
			/>
			<div class="mt-2 text-sm text-muted-foreground">
				Use dropdowns to quickly navigate months and years
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Dropdown Months Only">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar
				type="single"
				captionLayout="dropdown-months"
				{...args}
			/>
			<div class="mt-2 text-sm text-muted-foreground">
				Month dropdown with year as text
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Dropdown Years Only">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar
				type="single"
				captionLayout="dropdown-years"
				{...args}
			/>
			<div class="mt-2 text-sm text-muted-foreground">
				Year dropdown with month as text
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Multiple Months">
	{#snippet template(args: Args)}
		<div>
			<Calendar
				type="single"
				bind:value={multiMonthDate}
				numberOfMonths={2}
				{...args}
			/>
			{#if multiMonthDate}
				<div class="mt-2 text-sm text-muted-foreground">
					Selected: {multiMonthDate.toDate(getLocalTimeZone()).toLocaleDateString()}
				</div>
			{/if}
		</div>
	{/snippet}
</Story>

<Story name="Three Months">
	{#snippet template(args: Args)}
		<div>
			<Calendar
				type="single"
				numberOfMonths={3}
				{...args}
			/>
		</div>
	{/snippet}
</Story>

<Story name="Date Constraints">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar
				type="single"
				bind:value={constrainedDate}
				minValue={today(getLocalTimeZone())}
				maxValue={today(getLocalTimeZone()).add({ months: 2 })}
				{...args}
			/>
			<div class="mt-2 text-sm text-muted-foreground">
				Only dates from today to 2 months ahead are selectable
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Disabled Weekends">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar
				type="single"
				isDateDisabled={(date) => isWeekend(date, "en-US")}
				{...args}
			/>
			<div class="mt-2 text-sm text-muted-foreground">
				Weekends are disabled
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Unavailable Dates">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar
				type="single"
				isDateUnavailable={(date) => [5, 10, 15, 20, 25].includes(date.day)}
				{...args}
			/>
			<div class="mt-2 text-sm text-muted-foreground">
				Dates 5, 10, 15, 20, 25 are marked as unavailable (strikethrough)
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Week Starts Monday">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar
				type="single"
				weekStartsOn={1}
				{...args}
			/>
			<div class="mt-2 text-sm text-muted-foreground">
				Week starts on Monday
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Fixed Weeks">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar
				type="single"
				fixedWeeks={true}
				{...args}
			/>
			<div class="mt-2 text-sm text-muted-foreground">
				Always shows 6 weeks for consistent height
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Hide Days Outside Month">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar
				type="single"
				disableDaysOutsideMonth={true}
				{...args}
			/>
			<div class="mt-2 text-sm text-muted-foreground">
				Days outside the current month are disabled
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Spanish Locale">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar
				type="single"
				locale="es-ES"
				{...args}
			/>
			<div class="mt-2 text-sm text-muted-foreground">
				Spanish locale (es-ES)
			</div>
		</div>
	{/snippet}
</Story>

<Story name="French Locale">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar
				type="single"
				locale="fr-FR"
				weekStartsOn={1}
				{...args}
			/>
			<div class="mt-2 text-sm text-muted-foreground">
				French locale (fr-FR) with Monday start
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Japanese Locale">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar
				type="single"
				locale="ja-JP"
				{...args}
			/>
			<div class="mt-2 text-sm text-muted-foreground">
				Japanese locale (ja-JP)
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Button Variants">
	{#snippet template(args: Args)}
		<div class="space-y-6">
			<div class="space-y-2">
				<div class="text-sm font-medium">Ghost (Default)</div>
				<Calendar type="single" buttonVariant="ghost" {...args} />
			</div>
			<div class="space-y-2">
				<div class="text-sm font-medium">Outline</div>
				<Calendar type="single" buttonVariant="outline" {...args} />
			</div>
			<div class="space-y-2">
				<div class="text-sm font-medium">Default</div>
				<Calendar type="single" buttonVariant="default" {...args} />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Narrow Weekdays">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar
				type="single"
				weekdayFormat="narrow"
				{...args}
			/>
			<div class="mt-2 text-sm text-muted-foreground">
				Narrow weekday format (S, M, T, W, T, F, S)
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Long Weekdays">
	{#snippet template(args: Args)}
		<div>
			<Calendar
				type="single"
				weekdayFormat="long"
				{...args}
			/>
			<div class="mt-2 text-sm text-muted-foreground">
				Long weekday format (Sunday, Monday, etc.)
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Disabled">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar
				type="single"
				disabled
				{...args}
			/>
			<div class="mt-2 text-sm text-muted-foreground">
				Calendar is disabled
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Readonly">
	{#snippet template(args: Args)}
		<div class="max-w-sm">
			<Calendar
				type="single"
				readonly
				value={today(getLocalTimeZone())}
				{...args}
			/>
			<div class="mt-2 text-sm text-muted-foreground">
				Calendar is read-only (can navigate but not select)
			</div>
		</div>
	{/snippet}
</Story>
