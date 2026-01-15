# Popover Component

A comprehensive, customizable popover component with multiple visual variants, sizes, and animation options built with Svelte 5 and bits-ui.

## Features

- 🎨 **5 Visual Variants**: Default, Bordered, Elevated, Minimal, Ghost
- 📏 **4 Size Options**: Small, Default, Large, Auto
- ✨ **5 Animation Styles**: Default (combined), Fade, Scale, Slide, None
- 🎯 **Trigger Variants**: Default, Button, Outline, Ghost, Link
- ♿ **Fully Accessible**: Built on bits-ui primitives with keyboard navigation
- 🎭 **Customizable**: Extensive styling options with Tailwind
- 🔄 **Reactive**: Svelte 5 runes for optimal performance
- 📍 **Smart Positioning**: Automatic collision detection and placement

## Installation

```bash
pnpm dlx shadcn-svelte@latest add popover
```

## Implementation Details

The Popover component is built using **tailwind-variants** (tv) for a robust variant system and **bits-ui** for accessible primitives.

### Component Architecture

#### PopoverContent Component
- Uses `tv()` function for variant management
- 5 visual variants with distinct styling:
  - **Default**: Standard shadow with border
  - **Bordered**: Emphasized border with lighter shadow
  - **Elevated**: No border with larger shadow
  - **Minimal**: Subtle appearance with light border
  - **Ghost**: Transparent background without shadow
- 4 size options for flexible layouts
- 5 animation options for different entry/exit effects
- Exported types: `PopoverContentVariant`, `PopoverContentSize`, `PopoverContentAnimation`

#### PopoverTrigger Component
- 5 trigger variants for different use cases:
  - **Default**: Unstyled (for custom triggers)
  - **Button**: Primary button style
  - **Outline**: Outlined button style
  - **Ghost**: Ghost button style
  - **Link**: Link style with underline
- 3 size options (sm, default, lg)
- Exported types: `PopoverTriggerVariant`, `PopoverTriggerSize`

## Usage

### Basic Example

```svelte
<script lang="ts">
  import { Popover, PopoverTrigger, PopoverContent } from "$lib/components/ui/popover";
</script>

<Popover>
  <PopoverTrigger variant="button">Open Popover</PopoverTrigger>
  <PopoverContent>
    <div class="space-y-2">
      <h4 class="font-medium leading-none">Dimensions</h4>
      <p class="text-sm text-muted-foreground">
        Set the dimensions for the layer.
      </p>
    </div>
  </PopoverContent>
</Popover>
```

### With Custom Trigger

```svelte
<Popover>
  <PopoverTrigger variant="default" class="rounded-full w-10 h-10 bg-primary text-primary-foreground">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="1"/>
      <circle cx="12" cy="5" r="1"/>
      <circle cx="12" cy="19" r="1"/>
    </svg>
  </PopoverTrigger>
  <PopoverContent variant="elevated" size="sm">
    <p class="text-sm">Additional options</p>
  </PopoverContent>
</Popover>
```

### With Positioning

```svelte
<Popover>
  <PopoverTrigger variant="outline">Open</PopoverTrigger>
  <PopoverContent side="top" align="start" sideOffset={8}>
    <p>This popover appears above the trigger</p>
  </PopoverContent>
</Popover>
```

### With Controlled State

```svelte
<script lang="ts">
  import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from "$lib/components/ui/popover";
  import { Button } from "$lib/components/ui/button";

  let open = $state(false);
</script>

<Popover bind:open>
  <PopoverTrigger variant="button">Toggle</PopoverTrigger>
  <PopoverContent>
    <div class="space-y-4">
      <p class="text-sm">Popover is {open ? 'open' : 'closed'}</p>
      <PopoverClose>
        <Button variant="outline" size="sm">Close</Button>
      </PopoverClose>
    </div>
  </PopoverContent>
</Popover>
```

## Content Variants

### Default Variant
The standard popover style with medium shadow and border.

```svelte
<PopoverContent variant="default">
  Standard popover appearance
</PopoverContent>
```

### Bordered Variant
Emphasized border with lighter shadow for a more defined look.

```svelte
<PopoverContent variant="bordered">
  Popover with emphasized border
</PopoverContent>
```

### Elevated Variant
No border with larger shadow for a floating appearance.

```svelte
<PopoverContent variant="elevated">
  Floating popover with elevation
</PopoverContent>
```

### Minimal Variant
Subtle appearance with light border and small shadow.

```svelte
<PopoverContent variant="minimal">
  Minimal, understated popover
</PopoverContent>
```

### Ghost Variant
Transparent background without shadow for custom styling.

```svelte
<PopoverContent variant="ghost" class="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
  Custom styled popover
</PopoverContent>
```

## Size Variants

### Small
Compact popover for minimal content.

```svelte
<PopoverContent size="sm">
  <p class="text-sm">Compact content</p>
</PopoverContent>
```

### Default
Standard size for most use cases.

```svelte
<PopoverContent size="default">
  <p>Standard content</p>
</PopoverContent>
```

### Large
Spacious popover for detailed content.

```svelte
<PopoverContent size="lg">
  <h3 class="text-lg font-semibold mb-2">Detailed Information</h3>
  <p>More content with extra space</p>
</PopoverContent>
```

### Auto
Auto-width popover with default padding.

```svelte
<PopoverContent size="auto" class="w-auto">
  <p>Content determines width</p>
</PopoverContent>
```

## Animation Variants

### Default Animation
Combined fade, zoom, and slide animations.

```svelte
<PopoverContent animation="default">
  Smooth combined animation
</PopoverContent>
```

### Fade Animation
Simple fade in/out effect.

```svelte
<PopoverContent animation="fade">
  Subtle fade animation
</PopoverContent>
```

### Scale Animation
Zoom in/out effect.

```svelte
<PopoverContent animation="scale">
  Scale animation
</PopoverContent>
```

### Slide Animation
Slide from the direction of placement.

```svelte
<PopoverContent animation="slide">
  Slide-in animation
</PopoverContent>
```

### No Animation
Instant show/hide without animation.

```svelte
<PopoverContent animation="none">
  No animation
</PopoverContent>
```

## Trigger Variants

### Button Trigger
Primary button style for prominent actions.

```svelte
<PopoverTrigger variant="button">
  Click Me
</PopoverTrigger>
```

### Outline Trigger
Outlined style for secondary actions.

```svelte
<PopoverTrigger variant="outline">
  More Options
</PopoverTrigger>
```

### Ghost Trigger
Subtle hover effect without background.

```svelte
<PopoverTrigger variant="ghost">
  Hover Me
</PopoverTrigger>
```

### Link Trigger
Link style with underline on hover.

```svelte
<PopoverTrigger variant="link">
  Learn More
</PopoverTrigger>
```

## Advanced Examples

### Form in Popover

```svelte
<script lang="ts">
  import { Popover, PopoverTrigger, PopoverContent } from "$lib/components/ui/popover";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";

  let width = $state("100%");
  let maxWidth = $state("300px");
  let height = $state("25px");
  let maxHeight = $state("none");
</script>

<Popover>
  <PopoverTrigger variant="button">Open Dimensions</PopoverTrigger>
  <PopoverContent class="w-80">
    <div class="grid gap-4">
      <div class="space-y-2">
        <h4 class="font-medium leading-none">Dimensions</h4>
        <p class="text-sm text-muted-foreground">
          Set the dimensions for the layer.
        </p>
      </div>
      <div class="grid gap-2">
        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="width">Width</Label>
          <Input id="width" bind:value={width} class="col-span-2 h-8" />
        </div>
        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="maxWidth">Max. width</Label>
          <Input id="maxWidth" bind:value={maxWidth} class="col-span-2 h-8" />
        </div>
        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="height">Height</Label>
          <Input id="height" bind:value={height} class="col-span-2 h-8" />
        </div>
        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="maxHeight">Max. height</Label>
          <Input id="maxHeight" bind:value={maxHeight} class="col-span-2 h-8" />
        </div>
      </div>
    </div>
  </PopoverContent>
</Popover>
```

### User Profile Popover

```svelte
<script lang="ts">
  import { Popover, PopoverTrigger, PopoverContent } from "$lib/components/ui/popover";
  import { Avatar } from "$lib/components/ui/avatar";
  import { Button } from "$lib/components/ui/button";
</script>

<Popover>
  <PopoverTrigger variant="default">
    <Avatar src="/avatar.jpg" alt="User" />
  </PopoverTrigger>
  <PopoverContent variant="elevated" size="sm" align="end">
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-3">
        <Avatar src="/avatar.jpg" alt="User" class="h-12 w-12" />
        <div>
          <p class="font-medium">John Doe</p>
          <p class="text-sm text-muted-foreground">john@example.com</p>
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <Button variant="ghost" size="sm" class="justify-start">Profile</Button>
        <Button variant="ghost" size="sm" class="justify-start">Settings</Button>
        <Button variant="ghost" size="sm" class="justify-start">Sign out</Button>
      </div>
    </div>
  </PopoverContent>
</Popover>
```

### Action Menu Popover

```svelte
<Popover>
  <PopoverTrigger variant="ghost" size="sm">
    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="1"/>
      <circle cx="12" cy="5" r="1"/>
      <circle cx="12" cy="19" r="1"/>
    </svg>
  </PopoverTrigger>
  <PopoverContent variant="minimal" size="auto" class="p-1 w-40">
    <div class="flex flex-col">
      <button class="px-3 py-2 text-sm hover:bg-accent rounded text-left">Edit</button>
      <button class="px-3 py-2 text-sm hover:bg-accent rounded text-left">Duplicate</button>
      <button class="px-3 py-2 text-sm hover:bg-accent rounded text-left">Archive</button>
      <div class="h-px bg-border my-1"></div>
      <button class="px-3 py-2 text-sm hover:bg-accent rounded text-left text-destructive">Delete</button>
    </div>
  </PopoverContent>
</Popover>
```

## Props Reference

### Popover (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Callback when open state changes |
| `...restProps` | `PopoverPrimitive.RootProps` | - | All bits-ui Popover.Root props |

### PopoverTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'button' \| 'outline' \| 'ghost' \| 'link'` | `'default'` | Trigger visual style |
| `size` | `'default' \| 'sm' \| 'lg'` | `'default'` | Trigger size |
| `class` | `string` | - | Additional CSS classes |
| `ref` | `HTMLButtonElement \| null` | `null` | Reference to the trigger element |
| `...restProps` | `PopoverPrimitive.TriggerProps` | - | All bits-ui Popover.Trigger props |

### PopoverContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'bordered' \| 'elevated' \| 'minimal' \| 'ghost'` | `'default'` | Content visual style |
| `size` | `'sm' \| 'default' \| 'lg' \| 'auto'` | `'default'` | Content size |
| `animation` | `'default' \| 'fade' \| 'scale' \| 'slide' \| 'none'` | `'default'` | Entry/exit animation |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | Preferred placement side |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment relative to trigger |
| `sideOffset` | `number` | `4` | Distance from trigger in pixels |
| `alignOffset` | `number` | `0` | Offset along alignment axis |
| `class` | `string` | - | Additional CSS classes |
| `ref` | `HTMLDivElement \| null` | `null` | Reference to the content element |
| `portalProps` | `PopoverPrimitive.PortalProps` | - | Props for the portal component |
| `...restProps` | `PopoverPrimitive.ContentProps` | - | All bits-ui Popover.Content props |

### PopoverClose

Inherits all props from `bits-ui` Popover.Close. Typically used as a wrapper around buttons or interactive elements to close the popover.

### PopoverArrow

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes |
| `...restProps` | `PopoverPrimitive.ArrowProps` | - | All bits-ui Popover.Arrow props |

## Accessibility

The Popover component follows WAI-ARIA guidelines:

### Keyboard Navigation

- **Tab**: Move focus to/from the trigger
- **Space/Enter**: Open/close the popover when trigger is focused
- **Escape**: Close the popover when content is open
- **Tab** (when open): Trap focus within popover or allow cycling based on configuration

### Screen Reader Support

- Proper ARIA attributes (`aria-haspopup`, `aria-expanded`, `aria-controls`)
- Content is announced when popover opens
- Focus management handles proper announcements
- Trigger-content relationship is clearly communicated

### Best Practices

1. **Descriptive Triggers**: Use clear, descriptive text or labels
2. **Focus Management**: Ensure focus returns to trigger on close
3. **Keyboard Accessible**: All interactive elements should be keyboard accessible
4. **Sufficient Contrast**: Ensure content meets WCAG contrast requirements
5. **Mobile Friendly**: Consider touch targets and mobile interactions

## Styling Tips

### Custom Width

```svelte
<PopoverContent size="auto" class="w-96">
  Custom width content
</PopoverContent>
```

### Custom Colors

```svelte
<PopoverContent variant="ghost" class="bg-blue-500 text-white border border-blue-600">
  Custom colored popover
</PopoverContent>
```

### No Padding

```svelte
<PopoverContent class="p-0">
  <img src="/image.jpg" alt="Full bleed image" class="rounded-md" />
</PopoverContent>
```

### With Arrow

```svelte
<script lang="ts">
  import { Popover, PopoverTrigger, PopoverContent, PopoverArrow } from "$lib/components/ui/popover";
</script>

<Popover>
  <PopoverTrigger variant="button">Show Arrow</PopoverTrigger>
  <PopoverContent>
    <PopoverArrow class="fill-popover" />
    <p>Popover with arrow indicator</p>
  </PopoverContent>
</Popover>
```

## Common Patterns

### Dropdown Menu Alternative

Use popover for custom dropdown menus with more control than standard dropdowns.

### Contextual Help

Display additional information or help text without navigating away.

### Quick Actions

Show action buttons or forms in a compact overlay.

### User Previews

Display user information on hover or click of avatars/names.

### Settings Panels

Small configuration panels that don't warrant a full modal.

## Related Components

- **Dropdown Menu**: For standard menu interactions
- **Dialog**: For modal dialogs that require user attention
- **Tooltip**: For simple hover hints
- **Sheet**: For larger side panels
- **Context Menu**: For right-click contextual actions
