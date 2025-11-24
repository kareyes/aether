# Alert Component

A versatile alert component for displaying important messages with various styles, icons, and actions.

## Features

- **6 Variants**: default, destructive, info, success, warning, error
- **Icons**: Automatic variant-specific icons with customizable styling
- **Dismissible**: Optional close button with callback
- **Actions**: Support for action buttons via snippets
- **Dark Mode**: Full dark mode support with optimized colors
- **Flexible API**: Simple wrapper or advanced primitive composition

## Import

```svelte
import { Alert } from "$core/components/ui/alert";
```

## Basic Usage

### Simple Alert

```svelte
<Alert
  variant="info"
  title="Information"
  description="This is an informational message."
/>
```

### With Actions

```svelte
<Alert
  variant="warning"
  title="Warning"
  description="This action cannot be undone."
>
  {#snippet actions()}
    <button>Cancel</button>
    <button>Confirm</button>
  {/snippet}
</Alert>
```

### Dismissible Alert

```svelte
<Alert
  variant="success"
  title="Success!"
  description="Your changes have been saved."
  dismissible={true}
  onDismiss={() => console.log('Alert dismissed')}
/>
```

## Props

### Alert (Wrapper Component)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "destructive" \| "info" \| "success" \| "warning" \| "error"` | `"default"` | Visual style variant |
| `title` | `string` | `undefined` | Alert title text |
| `description` | `string` | `undefined` | Alert description text |
| `icon` | `Snippet` | `undefined` | Custom icon snippet (overrides default) |
| `showIcon` | `boolean` | `true` | Whether to show the icon |
| `dismissible` | `boolean` | `false` | Whether alert can be dismissed |
| `onDismiss` | `() => void` | `undefined` | Callback when alert is dismissed |
| `actions` | `Snippet` | `undefined` | Action buttons snippet |
| `children` | `Snippet` | `undefined` | Custom content |
| `class` | `string` | `undefined` | Additional CSS classes |

### Alert.Root (Primitive)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `AlertVariant` | `"default"` | Visual style variant |
| `icon` | `Snippet` | `undefined` | Icon snippet |
| `dismissible` | `boolean` | `false` | Whether alert can be dismissed |
| `onDismiss` | `() => void` | `undefined` | Dismiss callback |
| `actions` | `Snippet` | `undefined` | Actions snippet |
| `class` | `string` | `undefined` | Additional CSS classes |

### Alert.Title

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | `undefined` | Additional CSS classes |

### Alert.Description

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | `undefined` | Additional CSS classes |

## Variants

### Default
Neutral gray styling for general information.

```svelte
<Alert variant="default" title="Default Alert" description="General information message." />
```

### Destructive
Red styling for destructive or critical actions.

```svelte
<Alert variant="destructive" title="Destructive Action" description="This action is permanent." />
```

### Info
Blue styling for informational messages.

```svelte
<Alert variant="info" title="Information" description="Here's some helpful information." />
```

### Success
Green styling for success messages.

```svelte
<Alert variant="success" title="Success!" description="Operation completed successfully." />
```

### Warning
Yellow/orange styling for warnings.

```svelte
<Alert variant="warning" title="Warning" description="Please review before proceeding." />
```

### Error
Red styling for error messages.

```svelte
<Alert variant="error" title="Error" description="An error occurred during processing." />
```

## Icon System

### Default Icons

Each variant has an automatic icon:

- **default**: CircleAlert
- **destructive**: CircleX
- **info**: Info
- **success**: CircleCheck
- **warning**: TriangleAlert
- **error**: CircleX

### Icon Styling

Icons are automatically styled with variant-specific colors and container backgrounds:

- **Container**: Circular background with variant-specific color
- **Icon Color**: Matching text color for each variant
- **Dark Mode**: Adjusted opacity and colors for better visibility

### Custom Icon

```svelte
<Alert variant="info" title="Custom Icon">
  {#snippet icon()}
    <MyCustomIcon class="size-5" />
  {/snippet}
</Alert>
```

### Hide Icon

```svelte
<Alert variant="warning" title="No Icon" showIcon={false} />
```

## Advanced Usage

### Using Primitives

For complete control, use the primitive components:

```svelte
<Alert.Root variant="success" dismissible={true} onDismiss={handleDismiss}>
  {#snippet icon()}
    <div class="flex-none w-9 h-9 rounded-full grid place-items-center bg-green-50 dark:bg-green-500/20">
      <CheckIcon class="size-4 text-green-600 dark:text-green-400" />
    </div>
  {/snippet}
  
  <Alert.Title>Payment Successful</Alert.Title>
  <Alert.Description>
    Your payment of $99.00 has been processed successfully.
  </Alert.Description>
  
  {#snippet actions()}
    <button class="text-sm font-medium underline">View Receipt</button>
  {/snippet}
</Alert.Root>
```

### With Custom Content

```svelte
<Alert variant="warning" title="Storage Limit">
  <div class="mt-2">
    <p class="text-sm">You're using 90% of your storage space.</p>
    <div class="mt-2 h-2 bg-yellow-200 dark:bg-yellow-900/30 rounded-full overflow-hidden">
      <div class="h-full w-[90%] bg-yellow-500"></div>
    </div>
  </div>
  
  {#snippet actions()}
    <button>Upgrade Plan</button>
  {/snippet}
</Alert>
```

### Multiple Actions

```svelte
<Alert
  variant="error"
  title="Connection Lost"
  description="Unable to connect to the server."
>
  {#snippet actions()}
    <div class="flex gap-2">
      <button class="px-3 py-1 text-sm bg-red-100 dark:bg-red-900/30 rounded">
        Retry
      </button>
      <button class="px-3 py-1 text-sm border rounded">
        Dismiss
      </button>
    </div>
  {/snippet}
</Alert>
```

## Styling

### Custom Classes

```svelte
<Alert
  variant="info"
  title="Styled Alert"
  class="shadow-lg border-2"
/>
```

### Dark Mode

All variants include optimized dark mode styles:

```svelte
<!-- Automatically adapts to dark mode -->
<Alert variant="success" title="Dark Mode Ready" />
```

## Examples

### Form Validation Error

```svelte
<Alert
  variant="error"
  title="Validation Failed"
  description="Please correct the following errors:"
>
  <ul class="mt-2 list-disc list-inside text-sm">
    <li>Email is required</li>
    <li>Password must be at least 8 characters</li>
  </ul>
</Alert>
```

### Loading State with Dismissible

```svelte
<script>
  let showAlert = $state(true);
</script>

{#if showAlert}
  <Alert
    variant="info"
    title="Processing..."
    description="Your request is being processed. This may take a few moments."
    dismissible={true}
    onDismiss={() => showAlert = false}
  />
{/if}
```

### Success with Action

```svelte
<Alert
  variant="success"
  title="Profile Updated"
  description="Your profile changes have been saved successfully."
>
  {#snippet actions()}
    <a href="/profile" class="text-sm font-medium text-green-600 dark:text-green-400 hover:underline">
      View Profile
    </a>
  {/snippet}
</Alert>
```

### Confirmation Alert

```svelte
<Alert
  variant="warning"
  title="Confirm Deletion"
  description="Are you sure you want to delete this item? This action cannot be undone."
>
  {#snippet actions()}
    <div class="flex gap-2 mt-3">
      <button 
        onclick={handleDelete}
        class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Delete
      </button>
      <button 
        onclick={handleCancel}
        class="px-4 py-2 border rounded hover:bg-accent"
      >
        Cancel
      </button>
    </div>
  {/snippet}
</Alert>
```

## Accessibility

- Proper semantic HTML structure
- Alert role for screen readers
- Dismissible alerts include aria-label
- Keyboard navigation support
- Focus management for interactive elements

## Notes

- Icons use Lucide Svelte icons by default
- Dismissible alerts automatically hide when close button is clicked
- Use `onDismiss` callback to handle cleanup or state updates
- Actions snippet allows complete flexibility for buttons/links
- All variants support both light and dark modes
- Icon container styling is variant-aware with compound variants

## Component Structure

```
alert/
├── alert-root.svelte      # Root container with variants
├── alert-title.svelte     # Title component
├── alert-description.svelte # Description component
├── alert.svelte           # Wrapper component (simple API)
└── index.ts               # Exports
```
