# Date Picker Components

A comprehensive set of date picker components built with Calendar, RangeCalendar, and Popover components. Fully typed with TypeScript and styled with Tailwind CSS.

## Components

### DatePicker
A simple date picker for selecting a single date.

```svelte
<script>
  import { DatePicker } from "$lib/components/ui/date-picker";
  let date = $state();
</script>

<DatePicker bind:value={date} />
```

### DateRangePicker
A date range picker with two calendars for selecting start and end dates.

```svelte
<script>
  import { DateRangePicker } from "$lib/components/ui/date-picker";
  let range = $state();
</script>

<DateRangePicker bind:value={range} />
```

### DatePickerWithPresets
A date picker with quick preset options (Today, Tomorrow, In a week, etc.).

```svelte
<script>
  import { DatePickerWithPresets } from "$lib/components/ui/date-picker";
  let date = $state();
</script>

<DatePickerWithPresets bind:value={date} />
```

### DateRangePickerWithPresets
A date range picker with preset ranges (Last 7 days, Last 30 days, This month, etc.).

```svelte
<script>
  import { DateRangePickerWithPresets } from "$lib/components/ui/date-picker";
  let range = $state();
</script>

<DateRangePickerWithPresets bind:value={range} />
```

## Props

### Common Props (All Components)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `DateValue \| DateRange` | `undefined` | The selected date or range (bindable) |
| `placeholder` | `DateValue` | `undefined` | Placeholder date for the calendar (bindable) |
| `disabled` | `boolean` | `false` | Disable the date picker |
| `class` | `string` | `undefined` | Additional CSS classes for the container |
| `buttonVariant` | `ButtonVariant` | `"outline"` | Button style variant |
| `buttonClass` | `string` | `undefined` | Additional CSS classes for the button |
| `calendarProps` | `object` | `{}` | Props to pass to the underlying Calendar/RangeCalendar |
| `format` | `function` | Default formatter | Custom date formatting function |

### Preset Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `presets` | `Preset[]` | Default presets | Array of preset options |

## Button Variants

All date picker components support the following button variants:
- `default`
- `outline` (default)
- `ghost`
- `secondary`
- `destructive`
- `link`
- `bordered`
- `flat`

## Custom Format

You can customize how dates are displayed:

```svelte
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
```

## Custom Presets

```svelte
<script>
  import { today, getLocalTimeZone } from "@internationalized/date";
  
  const customPresets = [
    { label: "Today", value: today(getLocalTimeZone()) },
    { label: "Next Week", value: today(getLocalTimeZone()).add({ weeks: 1 }) },
    { label: "Next Month", value: today(getLocalTimeZone()).add({ months: 1 }) },
  ];
</script>

<DatePickerWithPresets presets={customPresets} />
```

## Calendar Props

Pass additional props to the underlying calendar:

```svelte
<DatePicker 
  calendarProps={{ 
    captionLayout: "dropdown",
    weekdayFormat: "short",
    numberOfMonths: 1
  }} 
/>
```

## Working with Dates

The date picker uses `@internationalized/date` for date handling:

```svelte
<script>
  import { DatePicker } from "$lib/components/ui/date-picker";
  import { CalendarDate, today, getLocalTimeZone } from "@internationalized/date";
  
  let date = $state();
  
  // Set initial value
  date = today(getLocalTimeZone());
  
  // Create specific date
  date = new CalendarDate(2024, 12, 25);
  
  // Get JavaScript Date
  const jsDate = date?.toDate(getLocalTimeZone());
</script>
```

## Examples

### Basic Usage
```svelte
<DatePicker bind:value={date} />
```

### With Initial Value
```svelte
<DatePicker value={today(getLocalTimeZone())} />
```

### Date Range
```svelte
<DateRangePicker bind:value={range} />
```

### With Presets
```svelte
<DatePickerWithPresets bind:value={date} />
```

### Custom Button Style
```svelte
<DatePicker buttonVariant="default" buttonClass="w-64" />
```

### Disabled
```svelte
<DatePicker disabled />
```

## Features

- ✅ Single date selection
- ✅ Date range selection
- ✅ Preset options for quick selection
- ✅ Custom date formatting
- ✅ Multiple button variants
- ✅ Disabled state
- ✅ Fully typed with TypeScript
- ✅ Accessible with keyboard navigation
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Customizable calendar props
- ✅ Bindable value and placeholder

## Accessibility

- Full keyboard navigation support
- ARIA labels and roles
- Focus management
- Screen reader friendly

## Dependencies

- `bits-ui` - Headless UI primitives
- `@internationalized/date` - Date handling
- `@lucide/svelte` - Icons
- Tailwind CSS - Styling
