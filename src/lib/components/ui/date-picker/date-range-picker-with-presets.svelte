<script lang="ts">
	import { Calendar as CalendarIcon } from "@lucide/svelte";
	import { type DateValue, CalendarDate, today, getLocalTimeZone } from "@internationalized/date";
	import type { DateRange } from "bits-ui";
	import { cn } from "$core/utils.js";
	import { Button } from "$core/components/ui/button/index.js";
	import { RangeCalendar } from "$core/components/ui/range-calendar/index.js";
	import * as Popover from "$core/components/ui/popover/index.js";
    import type { DatePickerProps } from ".";

    type Props = DatePickerProps & {
        value?: DateRange;
        presets?: RangePreset[];
        format?: (range: DateRange | undefined) => string;
    };

	type RangePreset = {
		label: string;
		value: DateRange;
	};

	function defaultFormat(range: DateRange | undefined): string {
		if (!range?.start?.toDate) return "Pick a date range";
		
		const options: Intl.DateTimeFormatOptions = {
			year: "numeric",
			month: "short",
			day: "numeric"
		};

		try {
			const start = range.start.toDate(getLocalTimeZone()).toLocaleDateString("en-US", options);
			const end = range.end?.toDate(getLocalTimeZone()).toLocaleDateString("en-US", options);
			return end ? `${start} - ${end}` : start;
		} catch {
			return "Pick a date range";
		}
	}

	let {
		value = $bindable(),
		placeholder = $bindable(),
		disabled = false,
		class: className,
		buttonVariant = "outline",
		buttonClass,
		calendarProps = {},
		presets = [
			{ 
				label: "Today", 
				value: { start: today(getLocalTimeZone()), end: today(getLocalTimeZone()) } 
			},
			{ 
				label: "Last 7 days", 
				value: { 
					start: today(getLocalTimeZone()).subtract({ days: 6 }), 
					end: today(getLocalTimeZone()) 
				} 
			},
			{ 
				label: "Last 30 days", 
				value: { 
					start: today(getLocalTimeZone()).subtract({ days: 29 }), 
					end: today(getLocalTimeZone()) 
				} 
			},
			{ 
				label: "This month", 
				value: { 
					start: today(getLocalTimeZone()).set({ day: 1 }), 
					end: today(getLocalTimeZone()) 
				} 
			},
			{ 
				label: "Last month", 
				value: { 
					start: today(getLocalTimeZone()).subtract({ months: 1 }).set({ day: 1 }), 
					end: today(getLocalTimeZone()).set({ day: 1 }).subtract({ days: 1 }) 
				} 
			},
		],
		format = defaultFormat,
		...restProps
	}: Props = $props();

	let open = $state(false);

	$effect(() => {
		if (value?.start && !placeholder) placeholder = value.start;
		if (value?.start && value?.end) open = false;
	});

	function selectPreset(preset: RangePreset): void {
		value = preset.value;
	}
</script>

<div class={cn("grid gap-2", className)} {...restProps}>
	<Popover.Root bind:open>
		<Popover.Trigger>
			{#snippet child({ props })}
				<Button
					{...props}
					variant={buttonVariant}
					class={cn(
						"w-full justify-start text-left font-normal",
						!value && "text-muted-foreground",
						buttonClass
					)}
					{disabled}
				>
					<CalendarIcon class="mr-2 size-4" />
					{format(value)}
				</Button>
			{/snippet}
		</Popover.Trigger>
		<Popover.Content class="w-auto p-0 flex" align="start">
			<div class="border-r border-border">
				<div class="flex flex-col gap-1 p-3">
					<div class="text-xs font-medium text-muted-foreground mb-1">Presets</div>
				{#each presets as preset}
					<Button
						variant="ghost"
						size="sm"
						class="justify-start font-normal"
						onclick={() => selectPreset(preset)}
					>
						{preset.label}
					</Button>
				{/each}
			</div>
		</div>
			<RangeCalendar
				bind:value
				bind:placeholder
				numberOfMonths={2}
				{...calendarProps}
			/>
		</Popover.Content>
	</Popover.Root>
</div>
