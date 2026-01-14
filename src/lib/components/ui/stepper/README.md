# Stepper Component

A flexible stepper component for displaying multi-step processes, workflows, and progress indicators.

## Quick Start

```svelte
<script>
  import { Stepper, StepperStep, StepperSeparator } from "$core/components/ui/stepper";

  let currentStep = $state(0);
</script>

<Stepper bind:activeStep={currentStep}>
  <StepperStep step={0} label="Step 1" description="First step" />
  <StepperSeparator />
  <StepperStep step={1} label="Step 2" description="Second step" />
  <StepperSeparator />
  <StepperStep step={2} label="Step 3" description="Third step" />
</Stepper>
```

## Features

- **2 Orientations**: `horizontal`, `vertical`
- **4 Sizes**: `xs`, `sm`, `default`, `lg`
- **4 Variants**: `default`, `outline`, `ghost`, `flat`
- **Interactive**: Clickable steps for navigation
- **Custom Icons**: Support for Lucide icons
- **Auto Completion**: Automatic step completion tracking
- **Type-Safe**: Full TypeScript support

## Props

### Stepper (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout orientation |
| `size` | `"xs" \| "sm" \| "default" \| "lg"` | `"default"` | Stepper size |
| `variant` | `"default" \| "outline" \| "ghost" \| "flat"` | `"default"` | Visual variant |
| `activeStep` | `number` | `0` | Current active step (bindable) |
| `clickable` | `boolean` | `false` | Allow clicking steps |
| `onStepClick` | `(step: number) => void` | - | Click handler |

### StepperStep

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `step` | `number` | **required** | Step index (0-based) |
| `label` | `string` | - | Step label |
| `description` | `string` | - | Step description |
| `icon` | `Component` | - | Custom Lucide icon |
| `completed` | `boolean` | `false` | Manual completion override |

### StepperSeparator

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `completed` | `boolean` | `false` | Mark as completed |

## Examples

### Vertical Stepper

```svelte
<Stepper orientation="vertical" bind:activeStep={step}>
  <StepperStep step={0} label="Start" />
  <StepperSeparator />
  <StepperStep step={1} label="Progress" />
  <StepperSeparator />
  <StepperStep step={2} label="Finish" />
</Stepper>
```

### With Icons

```svelte
<script>
  import { User, CreditCard, CheckCircle } from "@lucide/svelte";
</script>

<Stepper>
  <StepperStep step={0} label="Account">
    {#snippet icon()}
      <User class="size-4" />
    {/snippet}
  </StepperStep>
  <StepperSeparator />
  <StepperStep step={1} label="Payment">
    {#snippet icon()}
      <CreditCard class="size-4" />
    {/snippet}
  </StepperStep>
  <StepperSeparator />
  <StepperStep step={2} label="Done">
    {#snippet icon()}
      <CheckCircle class="size-4" />
    {/snippet}
  </StepperStep>
</Stepper>
```

### Clickable Navigation

```svelte
<Stepper clickable bind:activeStep={step}>
  <StepperStep step={0} label="Step 1" />
  <StepperSeparator />
  <StepperStep step={1} label="Step 2" />
  <StepperSeparator />
  <StepperStep step={2} label="Step 3" />
</Stepper>
```

### Different Sizes

```svelte
<Stepper size="xs">...</Stepper>
<Stepper size="sm">...</Stepper>
<Stepper size="default">...</Stepper>
<Stepper size="lg">...</Stepper>
```

### Different Variants

```svelte
<Stepper variant="default">...</Stepper>
<Stepper variant="outline">...</Stepper>
<Stepper variant="ghost">...</Stepper>
<Stepper variant="flat">...</Stepper>
```

## Use Cases

- **Registration flows** - Multi-step account creation
- **Checkout processes** - Shopping cart to payment to confirmation
- **Form wizards** - Breaking long forms into steps
- **Onboarding** - Guiding users through setup
- **Progress tracking** - Showing completion status
- **Order tracking** - Displaying order/shipping status

## Resources

- **Full Documentation**: [docs/STEPPER.md](./docs/STEPPER.md)
- **Storybook**: [docs/stepper.stories.svelte](./docs/stepper.stories.svelte)
- **Demo Page**: `/stepper-demo`

## Files

```
stepper/
├── stepper-variants.ts         # Tailwind variants configuration
├── stepper.svelte             # Root component
├── stepper-step.svelte        # Individual step component
├── stepper-separator.svelte   # Separator component
├── index.ts                   # Main exports
├── docs/
│   ├── STEPPER.md            # Full documentation
│   └── stepper.stories.svelte # Storybook stories
└── README.md                  # This file
```

## Implementation Details

Built with:
- Svelte 5 runes and context API
- Tailwind Variants for styling
- Full TypeScript support
- Lucide icons for check marks and custom icons
- Automatic state management and completion tracking

## Changelog

### v1.0.0 (2026-01-13)
- Initial implementation
- Horizontal and vertical orientations
- 4 size options (xs, sm, default, lg)
- 4 visual variants (default, outline, ghost, flat)
- Clickable navigation support
- Custom icons support
- Automatic completion tracking
- Comprehensive documentation and examples
