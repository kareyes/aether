# Accordion Component

A vertically stacked set of interactive headings that reveal or hide sections of content.

## Features

- **4 Variants**: default, bordered, splitted, shadow
- **Single or Multiple**: Control whether one or many items can be expanded
- **Animated**: Smooth expand/collapse animations
- **Accessible**: Full WAI-ARIA accordion pattern support
- **Disabled Items**: Individual items can be disabled
- **Dark Mode**: Full dark mode support

## Import

```svelte
import * as Accordion from "$lib/components/ui/accordion";
```

## Basic Usage

### Simple Accordion

```svelte
<Accordion.Root type="single">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Section 1</Accordion.Trigger>
    <Accordion.Content>
      Content for section 1.
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>Section 2</Accordion.Trigger>
    <Accordion.Content>
      Content for section 2.
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

### With Variant

```svelte
<Accordion.Root type="single" variant="bordered">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Section 1</Accordion.Trigger>
    <Accordion.Content>
      Content for section 1.
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

### Multiple Selection

```svelte
<Accordion.Root type="multiple" variant="splitted">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Section 1</Accordion.Trigger>
    <Accordion.Content>
      Content for section 1.
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>Section 2</Accordion.Trigger>
    <Accordion.Content>
      Content for section 2.
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

### Default Expanded

```svelte
<Accordion.Root type="single" value="item-2">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Collapsed by default</Accordion.Trigger>
    <Accordion.Content>Content</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>Expanded by default</Accordion.Trigger>
    <Accordion.Content>This section is open initially.</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

## Props

### Accordion.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"single" \| "multiple"` | **required** | Whether single or multiple items can be expanded |
| `variant` | `"default" \| "bordered" \| "splitted" \| "shadow"` | `"default"` | Visual style variant |
| `value` | `string \| string[]` | `undefined` | The value(s) of the expanded item(s) |
| `disabled` | `boolean` | `false` | Whether the accordion is disabled |
| `loop` | `boolean` | `true` | Whether to loop through items with arrow keys |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | The orientation of the accordion |
| `class` | `string` | `undefined` | Additional CSS classes |

### Accordion.Item

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **required** | Unique identifier for the item |
| `disabled` | `boolean` | `false` | Whether the item is disabled |
| `class` | `string` | `undefined` | Additional CSS classes |

### Accordion.Trigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `3` | The heading level for accessibility |
| `class` | `string` | `undefined` | Additional CSS classes |

### Accordion.Content

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `forceMount` | `boolean` | `true` | Whether to mount the content regardless of open state |
| `class` | `string` | `undefined` | Additional CSS classes |

## Variants

### Default
The classic accordion with bottom borders and underline hover effect on triggers.

```svelte
<Accordion.Root type="single">
  ...
</Accordion.Root>
```

### Bordered
A contained accordion with a border around the entire component and dividers between items.

```svelte
<Accordion.Root type="single" variant="bordered">
  ...
</Accordion.Root>
```

### Splitted
Each item is a separate bordered card with spacing between them.

```svelte
<Accordion.Root type="single" variant="splitted">
  ...
</Accordion.Root>
```

### Shadow
Similar to bordered but with a subtle shadow for an elevated appearance.

```svelte
<Accordion.Root type="single" variant="shadow">
  ...
</Accordion.Root>
```

## Examples

### FAQ Section

```svelte
<Accordion.Root type="single" variant="splitted" class="w-full max-w-2xl">
  <Accordion.Item value="shipping">
    <Accordion.Trigger>What are your shipping options?</Accordion.Trigger>
    <Accordion.Content>
      <p class="mb-2">We offer several shipping options:</p>
      <ul class="list-disc list-inside space-y-1">
        <li>Standard Shipping: 5-7 business days</li>
        <li>Express Shipping: 2-3 business days</li>
        <li>Overnight Shipping: Next business day</li>
      </ul>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="returns">
    <Accordion.Trigger>What is your return policy?</Accordion.Trigger>
    <Accordion.Content>
      We offer a 30-day money-back guarantee for all purchases.
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

### Settings Panel

```svelte
<Accordion.Root type="multiple" variant="bordered">
  <Accordion.Item value="notifications">
    <Accordion.Trigger>Notification Settings</Accordion.Trigger>
    <Accordion.Content>
      <!-- Notification toggles -->
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="privacy">
    <Accordion.Trigger>Privacy Settings</Accordion.Trigger>
    <Accordion.Content>
      <!-- Privacy options -->
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="account">
    <Accordion.Trigger>Account Settings</Accordion.Trigger>
    <Accordion.Content>
      <!-- Account options -->
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

### With Disabled Items

```svelte
<Accordion.Root type="single" variant="splitted">
  <Accordion.Item value="basic">
    <Accordion.Trigger>Basic Features</Accordion.Trigger>
    <Accordion.Content>Available to all users.</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="premium" disabled>
    <Accordion.Trigger>Premium Features (Upgrade Required)</Accordion.Trigger>
    <Accordion.Content>Upgrade your plan to access.</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

## Accessibility

The accordion component follows the [WAI-ARIA Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/):

- **Keyboard Navigation**: 
  - `Enter` or `Space` to toggle the focused item
  - `Arrow Up/Down` to navigate between items
  - `Home` to focus the first item
  - `End` to focus the last item
- **ARIA Attributes**: Proper `aria-expanded`, `aria-controls`, and `aria-labelledby` attributes
- **Focus Management**: Visible focus indicators for keyboard users

## Styling

### Custom Styling with Tailwind

```svelte
<Accordion.Root type="single" class="bg-slate-50 p-4 rounded-xl">
  <Accordion.Item value="item-1" class="bg-white rounded-lg mb-2">
    <Accordion.Trigger class="text-blue-600">Custom Trigger</Accordion.Trigger>
    <Accordion.Content class="text-gray-600">
      Custom styled content
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

### Using CSS Variables

The accordion respects your theme's CSS variables:

- `--border` - Border color
- `--muted` - Muted background color
- `--muted-foreground` - Muted text color
- `--ring` - Focus ring color
