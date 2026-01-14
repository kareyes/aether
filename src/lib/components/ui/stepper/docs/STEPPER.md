# Stepper Component

A flexible stepper component for displaying multi-step processes, workflows, and progress indicators, built with Svelte 5.

## Features

- 🎯 **Multiple Orientations**: Horizontal and vertical layouts
- 📏 **Size Options**: xs, sm, default, lg - flexible sizing
- 🎨 **Variants**: Default, outline, ghost, flat styles
- ✨ **Interactive**: Optional clickable steps for navigation
- ✅ **Completion States**: Automatic step completion tracking
- 🎭 **Custom Icons**: Support for custom step icons
- 🔄 **Reactive**: Built with Svelte 5's modern reactivity system
- ♿ **Accessible**: Semantic HTML and ARIA support
- 🎯 **Type-Safe**: Full TypeScript support with Svelte 5 runes

## Installation

```bash
pnpm dlx shadcn-svelte@latest add stepper
```

## Implementation Details

The Stepper component provides a flexible system for displaying step-by-step processes with support for different orientations, sizes, and interaction patterns.

### Component Architecture

#### Stepper (Root)
- Root component that manages stepper state
- Controls orientation, size, and variant
- Provides context for child components
- Manages active step state

#### StepperStep
- Individual step component
- Displays step number or custom icon
- Shows label and optional description
- Automatically displays check icon when completed
- Supports clickable navigation (when enabled)

#### StepperSeparator
- Visual separator between steps
- Automatically styled based on completion state
- Adapts to horizontal/vertical orientation

## Usage

### Basic Example

```svelte
<script lang="ts">
  import { Stepper, StepperStep, StepperSeparator } from "$core/components/ui/stepper";

  let currentStep = $state(0);
</script>

<Stepper bind:activeStep={currentStep}>
  <StepperStep step={0} label="Step 1" description="Choose a plan" />
  <StepperSeparator />
  <StepperStep step={1} label="Step 2" description="Enter details" />
  <StepperSeparator />
  <StepperStep step={2} label="Step 3" description="Confirm" />
</Stepper>
```

### Horizontal Stepper (Default)

```svelte
<script lang="ts">
  import { Stepper, StepperStep, StepperSeparator } from "$core/components/ui/stepper";

  let currentStep = $state(1);
</script>

<Stepper orientation="horizontal" bind:activeStep={currentStep}>
  <StepperStep step={0} label="Account" description="Create your account" />
  <StepperSeparator completed={currentStep > 0} />
  <StepperStep step={1} label="Profile" description="Complete your profile" />
  <StepperSeparator completed={currentStep > 1} />
  <StepperStep step={2} label="Finish" description="Review and finish" />
</Stepper>
```

### Vertical Stepper

```svelte
<script lang="ts">
  import { Stepper, StepperStep, StepperSeparator } from "$core/components/ui/stepper";

  let currentStep = $state(0);
</script>

<Stepper orientation="vertical" bind:activeStep={currentStep}>
  <StepperStep step={0} label="Personal Info" description="Enter your basic information" />
  <StepperSeparator />
  <StepperStep step={1} label="Address" description="Add your address details" />
  <StepperSeparator />
  <StepperStep step={2} label="Review" description="Review and submit" />
</Stepper>
```

### Clickable Steps

```svelte
<script lang="ts">
  import { Stepper, StepperStep, StepperSeparator } from "$core/components/ui/stepper";

  let currentStep = $state(0);

  function handleStepClick(step: number) {
    console.log("Clicked step:", step);
    // Add custom logic here
  }
</script>

<Stepper
  clickable
  bind:activeStep={currentStep}
  onStepClick={handleStepClick}
>
  <StepperStep step={0} label="Step 1" />
  <StepperSeparator />
  <StepperStep step={1} label="Step 2" />
  <StepperSeparator />
  <StepperStep step={2} label="Step 3" />
</Stepper>
```

## Sizes

### Extra Small

```svelte
<Stepper size="xs">
  <StepperStep step={0} label="Extra Small" />
  <StepperSeparator />
  <StepperStep step={1} label="Step" />
</Stepper>
```

### Small

```svelte
<Stepper size="sm">
  <StepperStep step={0} label="Small" />
  <StepperSeparator />
  <StepperStep step={1} label="Step" />
</Stepper>
```

### Default

```svelte
<Stepper size="default">
  <StepperStep step={0} label="Default" />
  <StepperSeparator />
  <StepperStep step={1} label="Step" />
</Stepper>
```

### Large

```svelte
<Stepper size="lg">
  <StepperStep step={0} label="Large" />
  <StepperSeparator />
  <StepperStep step={1} label="Step" />
</Stepper>
```

## Variants

### Default Variant

Filled background for active and completed steps.

```svelte
<Stepper variant="default">
  <StepperStep step={0} label="Default" />
  <StepperSeparator />
  <StepperStep step={1} label="Variant" />
</Stepper>
```

### Outline Variant

Outlined style with border emphasis.

```svelte
<Stepper variant="outline">
  <StepperStep step={0} label="Outline" />
  <StepperSeparator />
  <StepperStep step={1} label="Variant" />
</Stepper>
```

### Ghost Variant

Subtle background without borders.

```svelte
<Stepper variant="ghost">
  <StepperStep step={0} label="Ghost" />
  <StepperSeparator />
  <StepperStep step={1} label="Variant" />
</Stepper>
```

### Flat Variant

Horizontal progress bar style with labels above.

```svelte
<Stepper variant="flat">
  <StepperStep step={0} label="Personal Info" description="Completed" />
  <StepperSeparator />
  <StepperStep step={1} label="Education" description="Completed" />
  <StepperSeparator />
  <StepperStep step={2} label="Company" description="Pending" />
  <StepperSeparator />
  <StepperStep step={3} label="Review" description="Pending" />
</Stepper>
```

## Advanced Examples

### With Custom Icons

```svelte
<script lang="ts">
  import { Stepper, StepperStep, StepperSeparator } from "$core/components/ui/stepper";
  import { User, CreditCard, CheckCircle } from "@lucide/svelte";

  let currentStep = $state(0);
</script>

<Stepper bind:activeStep={currentStep}>
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

### Registration Flow

```svelte
<script lang="ts">
  import { Stepper, StepperStep, StepperSeparator } from "$core/components/ui/stepper";
  import { Button } from "$core/components/ui/button";

  let currentStep = $state(0);

  function nextStep() {
    if (currentStep < 2) currentStep++;
  }

  function previousStep() {
    if (currentStep > 0) currentStep--;
  }
</script>

<div class="space-y-6">
  <Stepper bind:activeStep={currentStep}>
    <StepperStep
      step={0}
      label="Create Account"
      description="Enter your email and password"
    />
    <StepperSeparator completed={currentStep > 0} />
    <StepperStep
      step={1}
      label="Personal Info"
      description="Tell us about yourself"
    />
    <StepperSeparator completed={currentStep > 1} />
    <StepperStep
      step={2}
      label="Complete"
      description="Review and confirm"
    />
  </Stepper>

  <div class="flex gap-3">
    <Button
      variant="outline"
      disabled={currentStep === 0}
      onclick={previousStep}
    >
      Previous
    </Button>
    <Button
      disabled={currentStep === 2}
      onclick={nextStep}
    >
      {currentStep === 2 ? "Complete" : "Next"}
    </Button>
  </div>
</div>
```

### Checkout Process

```svelte
<script lang="ts">
  import { Stepper, StepperStep, StepperSeparator } from "$core/components/ui/stepper";
  import { ShoppingCart, CreditCard, Package, CheckCircle } from "@lucide/svelte";

  let currentStep = $state(1);
</script>

<Stepper orientation="vertical" bind:activeStep={currentStep}>
  <StepperStep
    step={0}
    label="Cart"
    description="Review your items"
    completed
  >
    {#snippet icon()}
      <ShoppingCart class="size-4" />
    {/snippet}
  </StepperStep>
  <StepperSeparator completed />

  <StepperStep
    step={1}
    label="Payment"
    description="Enter payment details"
  >
    {#snippet icon()}
      <CreditCard class="size-4" />
    {/snippet}
  </StepperStep>
  <StepperSeparator />

  <StepperStep
    step={2}
    label="Shipping"
    description="Choose shipping method"
  >
    {#snippet icon()}
      <Package class="size-4" />
    {/snippet}
  </StepperStep>
  <StepperSeparator />

  <StepperStep
    step={3}
    label="Confirm"
    description="Review and place order"
  >
    {#snippet icon()}
      <CheckCircle class="size-4" />
    {/snippet}
  </StepperStep>
</Stepper>
```

### Form Wizard with Content

```svelte
<script lang="ts">
  import { Stepper, StepperStep, StepperSeparator } from "$core/components/ui/stepper";
  import { Button } from "$core/components/ui/button";
  import { Input } from "$core/components/ui/input";
  import { Label } from "$core/components/ui/label";

  let currentStep = $state(0);
  let formData = $state({
    name: "",
    email: "",
    address: "",
  });

  function nextStep() {
    if (currentStep < 2) currentStep++;
  }

  function previousStep() {
    if (currentStep > 0) currentStep--;
  }

  function handleSubmit() {
    console.log("Form submitted:", formData);
  }
</script>

<div class="space-y-8">
  <Stepper bind:activeStep={currentStep} clickable>
    <StepperStep step={0} label="Basic Info" />
    <StepperSeparator completed={currentStep > 0} />
    <StepperStep step={1} label="Contact" />
    <StepperSeparator completed={currentStep > 1} />
    <StepperStep step={2} label="Review" />
  </Stepper>

  <div class="min-h-[200px]">
    {#if currentStep === 0}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Basic Information</h3>
        <div class="space-y-2">
          <Label for="name">Full Name</Label>
          <Input id="name" bind:value={formData.name} />
        </div>
      </div>
    {:else if currentStep === 1}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Contact Details</h3>
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" bind:value={formData.email} />
        </div>
        <div class="space-y-2">
          <Label for="address">Address</Label>
          <Input id="address" bind:value={formData.address} />
        </div>
      </div>
    {:else}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Review Your Information</h3>
        <dl class="space-y-2">
          <div>
            <dt class="font-medium">Name:</dt>
            <dd class="text-muted-foreground">{formData.name}</dd>
          </div>
          <div>
            <dt class="font-medium">Email:</dt>
            <dd class="text-muted-foreground">{formData.email}</dd>
          </div>
          <div>
            <dt class="font-medium">Address:</dt>
            <dd class="text-muted-foreground">{formData.address}</dd>
          </div>
        </dl>
      </div>
    {/if}
  </div>

  <div class="flex gap-3">
    {#if currentStep > 0}
      <Button variant="outline" onclick={previousStep}>
        Previous
      </Button>
    {/if}
    {#if currentStep < 2}
      <Button onclick={nextStep}>
        Next
      </Button>
    {:else}
      <Button onclick={handleSubmit}>
        Submit
      </Button>
    {/if}
  </div>
</div>
```

### Numbers Only (No Labels)

```svelte
<Stepper>
  <StepperStep step={0} />
  <StepperSeparator />
  <StepperStep step={1} />
  <StepperSeparator />
  <StepperStep step={2} />
  <StepperSeparator />
  <StepperStep step={3} />
</Stepper>
```

## API Reference

### Stepper (Root)

Root component that manages the stepper state.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout orientation |
| `size` | `"xs" \| "sm" \| "default" \| "lg"` | `"default"` | Size of the stepper |
| `variant` | `"default" \| "outline" \| "ghost" \| "flat"` | `"default"` | Visual variant |
| `activeStep` | `number` | `0` | Current active step (bindable) |
| `clickable` | `boolean` | `false` | Allow clicking steps to navigate |
| `onStepClick` | `(step: number) => void` | - | Callback when step is clicked |
| `ref` | `HTMLDivElement` | - | Root element reference (bindable) |
| `class` | `string` | - | Additional CSS classes |
| `children` | `Snippet` | - | Child components |

### StepperStep

Individual step component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `step` | `number` | **required** | Step index (0-based) |
| `label` | `string` | - | Step label text |
| `description` | `string` | - | Step description text |
| `icon` | `Snippet` | - | Custom icon snippet (use with Lucide icons) |
| `completed` | `boolean` | `false` | Manually mark as completed |
| `ref` | `HTMLDivElement` | - | Step element reference (bindable) |
| `class` | `string` | - | Additional CSS classes |
| `children` | `Snippet` | - | Custom content for step |

### StepperSeparator

Visual separator between steps.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `completed` | `boolean` | `false` | Mark separator as completed |
| `ref` | `HTMLDivElement` | - | Separator element reference (bindable) |
| `class` | `string` | - | Additional CSS classes |

## Accessibility

The Stepper component follows accessibility best practices:

- **Semantic HTML**: Uses proper HTML elements for structure
- **Button Elements**: Steps are actual `<button>` elements when clickable
- **Disabled State**: Non-clickable steps are properly disabled
- **Visual States**: Clear visual indication of active, completed, and inactive states
- **Keyboard Navigation**: Full keyboard support when clickable

## Best Practices

1. **Keep it simple** - Don't use too many steps (3-5 is ideal)
2. **Clear labels** - Use concise, descriptive labels for each step
3. **Show progress** - Make it clear which step is active and completed
4. **Vertical for mobile** - Consider using vertical orientation on small screens
5. **Enable navigation** - Use clickable steps for non-linear workflows
6. **Provide feedback** - Use descriptions to guide users
7. **Validate before advancing** - Don't let users skip required steps

## Common Use Cases

- **Registration flows** - Multi-step account creation
- **Checkout processes** - Shopping cart to payment to confirmation
- **Form wizards** - Breaking long forms into manageable steps
- **Onboarding** - Guiding new users through setup
- **Progress tracking** - Showing completion status
- **Order tracking** - Displaying order/shipping status

## Demo & Storybook

- **Demo Page**: `/stepper-demo` - Comprehensive examples and use cases
- **Storybook**: `Components/Stepper` - Interactive component playground

## Technical Implementation

### Variant System

The Stepper component uses tailwind-variants for the styling system:

```typescript
export const stepperVariants = tv({
  slots: {
    root: ["flex gap-2"],
    step: ["flex items-center gap-2 relative"],
    stepButton: ["flex items-center justify-center rounded-full"],
    stepContent: ["flex flex-col gap-1"],
    separator: ["flex-1"],
  },
  variants: {
    orientation: { horizontal: {...}, vertical: {...} },
    size: { sm: {...}, default: {...}, lg: {...} },
    variant: { default: {...}, outline: {...}, ghost: {...} },
  }
});
```

### State Management

- Uses Svelte 5 context API for sharing state between components
- Automatic step completion tracking based on activeStep
- Support for manual completion overrides
- Reactive updates across all child components

## Changelog

### v1.0.0
- Initial implementation with horizontal and vertical orientations
- 4 size options (xs, sm, default, lg)
- 4 visual variants (default, outline, ghost, flat)
- Clickable navigation support
- Custom icons support
- Automatic completion states
- Comprehensive documentation and examples
