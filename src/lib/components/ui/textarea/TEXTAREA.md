# Textarea Component

A versatile textarea component with multiple variants, sizes, and advanced features like auto-resize and character counting.

## Features

- **Multiple Variants**: default, outline, filled, ghost, underline
- **Size Options**: sm, default, lg
- **Resize Control**: none, vertical, horizontal, both
- **Auto-Resize**: Automatically grows/shrinks based on content
- **Character Counter**: Optional character count display
- **Max Length**: Limit input length with validation
- **Full Type Safety**: TypeScript support with proper types
- **Accessibility**: ARIA attributes and keyboard navigation
- **Dark Mode**: Built-in dark mode support

## Usage

### Basic Usage

```svelte
<script>
  import { Textarea } from "$lib/components/ui/textarea";
  
  let value = $state("");
</script>

<Textarea bind:value placeholder="Type here..." />
```

### Variants

```svelte
<!-- Default -->
<Textarea variant="default" />

<!-- Outline (thicker border) -->
<Textarea variant="outline" />

<!-- Filled (muted background) -->
<Textarea variant="filled" />

<!-- Ghost (no border) -->
<Textarea variant="ghost" />

<!-- Underline -->
<Textarea variant="underline" />
```

### Sizes

```svelte
<!-- Small -->
<Textarea size="sm" />

<!-- Default -->
<Textarea size="default" />

<!-- Large -->
<Textarea size="lg" />
```

### Character Counter

```svelte
<!-- Simple counter -->
<Textarea showCount />

<!-- With max length -->
<Textarea maxLength={200} showCount />
```

### Auto-Resize

```svelte
<!-- Auto-resize with min/max rows -->
<Textarea 
  autoResize 
  minRows={3} 
  maxRows={10} 
/>
```

### Resize Options

```svelte
<!-- No resize -->
<Textarea resize="none" />

<!-- Vertical only (default) -->
<Textarea resize="vertical" />

<!-- Horizontal only -->
<Textarea resize="horizontal" />

<!-- Both directions -->
<Textarea resize="both" />
```

### Full Example

```svelte
<script>
  import { Textarea } from "$lib/components/ui/textarea";
  
  let message = $state("");
</script>

<div class="space-y-2">
  <label for="message">Message</label>
  <Textarea 
    id="message"
    bind:value={message}
    variant="outline"
    size="lg"
    maxLength={500}
    showCount
    autoResize
    minRows={3}
    maxRows={8}
    placeholder="Type your message..."
  />
  <p class="text-sm text-muted-foreground">
    Your message will be reviewed by our team.
  </p>
</div>
```

### Error State

```svelte
<Textarea 
  aria-invalid={true}
  placeholder="This field has an error"
/>
<p class="text-sm text-destructive">This field is required</p>
```

### Disabled State

```svelte
<Textarea disabled value="Cannot edit this" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `undefined` | Bindable textarea value |
| `variant` | `"default" \| "outline" \| "filled" \| "ghost" \| "underline"` | `"default"` | Visual style variant |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size of the textarea |
| `resize` | `"none" \| "vertical" \| "horizontal" \| "both"` | `"vertical"` | Resize behavior |
| `maxLength` | `number` | `undefined` | Maximum character length |
| `showCount` | `boolean` | `false` | Show character counter |
| `autoResize` | `boolean` | `false` | Auto-resize based on content |
| `minRows` | `number` | `undefined` | Minimum rows for auto-resize |
| `maxRows` | `number` | `undefined` | Maximum rows for auto-resize |
| `disabled` | `boolean` | `false` | Disable the textarea |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `class` | `string` | `undefined` | Additional CSS classes |
| `ref` | `HTMLTextAreaElement \| null` | `null` | Bindable element reference |

All standard HTML textarea attributes are supported.

## Types

```typescript
import type { 
  TextareaProps, 
  TextareaVariant, 
  TextareaSize, 
  TextareaResize 
} from "$lib/components/ui/textarea";
```

## Styling

The component uses Tailwind CSS and supports:
- Custom classes via the `class` prop
- Dark mode (automatically handled)
- Focus states with ring effect
- Error states via `aria-invalid`
- Disabled states

## Accessibility

- Supports all standard textarea attributes
- Works with labels via `id`
- ARIA attributes for error states
- Keyboard navigation support
- Screen reader friendly

## Notes

- When `autoResize` is enabled, the `resize` prop is automatically set to `"none"`
- Character counter appears in the bottom-right corner when `showCount` is true
- The component wraps the textarea in a `div` when `showCount` is enabled
- Auto-resize uses `minRows` and `maxRows` to constrain height
