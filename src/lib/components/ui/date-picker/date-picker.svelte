<script lang="ts">
    import { Calendar as CalendarIcon } from "@lucide/svelte";
    import { type DateValue, getLocalTimeZone } from "@internationalized/date";
    import { cn } from "$core/utils.js";
    import { Button } from "$core/components/ui/button/index.js";
    import { Calendar } from "$core/components/ui/calendar/index.js";
    import * as Popover from "$core/components/ui/popover/index.js";
    import type { DatePickerProps } from ".";
    import type { ComponentProps } from "svelte";

    type Props = DatePickerProps & {
        value?: DateValue;
        format?: (date: DateValue | undefined) => string;
    };

    let {
        value = $bindable(),
        placeholder = $bindable(),
        disabled = false,
        class: className,
        buttonVariant = "outline",
        buttonClass,
        calendarProps = {},
        format = defaultFormat,
        ...restProps
    }: Props = $props();

    let dropdown = $state<ComponentProps<typeof Calendar>["captionLayout"]>("dropdown");

    let open = $state(false);

    function defaultFormat(date: DateValue | undefined): string {
        if (!date?.toDate) return "Pick a date";
        
        try {
            return date.toDate(getLocalTimeZone()).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });
        } catch {
            return "Pick a date";
        }
    }

    $effect(() => {
        if (value && !placeholder) placeholder = value;
        if (value) open = false;
    });
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
        <Popover.Content class="w-auto p-0" align="start">
            <Calendar
                type="single"
                bind:value
                bind:placeholder
                initialFocus
                captionLayout={dropdown}
                {...calendarProps}
            />
        </Popover.Content>
    </Popover.Root>
</div>
