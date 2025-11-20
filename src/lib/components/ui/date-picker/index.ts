import DatePicker from "./date-picker.svelte";
import DateRangePicker from "./date-range-picker.svelte";
import DatePickerWithPresets from "./date-picker-with-presets.svelte";
import DateRangePickerWithPresets from "./date-range-picker-with-presets.svelte";
import type { DateValue } from "@internationalized/date";
import { type ButtonVariant } from "$core/components/ui/button/index.js";

type DatePickerProps ={

        placeholder?: DateValue;
        disabled?: boolean;
        class?: string;
        buttonVariant?: ButtonVariant;
        buttonClass?: string;
        calendarProps?: Record<string, any>;
        
}

export {
    type DatePickerProps,
	DatePicker,
	DateRangePicker,
	DatePickerWithPresets,
	DateRangePickerWithPresets
};
