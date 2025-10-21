# Enhanced Checkbox Component

A powerful checkbox component with multiple sizes, variants, labels, descriptions, and line-through functionality.

## Features

- ✅ **Multiple Sizes**: sm, default, lg, xl
- ✅ **Color Variants**: default, destructive, success, warning
- ✅ **Labels & Descriptions**: Built-in label and description support
- ✅ **Line Through**: Strike-through text when checked (great for todo lists)
- ✅ **Indeterminate State**: Partial selection support
- ✅ **Full Accessibility**: Proper ARIA attributes and keyboard navigation
- ✅ **TypeScript Support**: Complete type definitions

## Basic Usage

### Simple Checkbox
```svelte
<script>
  let checked = $state(false);
</script>

<Checkbox bind:checked />
```

### With Label
```svelte
<Checkbox 
  bind:checked 
  label="Accept terms and conditions" 
/>
```

### With Label and Description
```svelte
<Checkbox 
  bind:checked 
  label="Enable notifications"
  description="Get notified about updates and new features"
/>
```

## Sizes

Available sizes: `sm`, `default`, `lg`, `xl`

```svelte
<Checkbox size="sm" label="Small" />
<Checkbox size="default" label="Default" />
<Checkbox size="lg" label="Large" />
<Checkbox size="xl" label="Extra Large" />
```

## Variants

Available variants: `default`, `destructive`, `success`, `warning`

```svelte
<Checkbox 
  variant="destructive" 
  label="Delete all data"
  description="This action cannot be undone"
/>

<Checkbox 
  variant="success" 
  label="Mark as completed"
/>

<Checkbox 
  variant="warning" 
  label="Proceed with caution"
/>
```

## Line Through Feature

Perfect for todo lists and task management:

```svelte
<Checkbox 
  bind:checked 
  lineThrough={true}
  label="Complete project setup"
  description="Set up development environment"
/>
```

When `lineThrough` is `true` and the checkbox is checked:
- Label text gets `line-through` decoration
- Text color changes to muted
- Description also gets line-through effect

## Indeterminate State

For partial selections (like "select all" checkboxes):

```svelte
<script>
  let indeterminate = $state(true);
</script>

<Checkbox 
  bind:indeterminate 
  label="Select all items"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Checkbox checked state |
| `indeterminate` | `boolean` | `false` | Indeterminate state (partial selection) |
| `size` | `'sm' \| 'default' \| 'lg' \| 'xl'` | `'default'` | Checkbox size |
| `variant` | `'default' \| 'destructive' \| 'success' \| 'warning'` | `'default'` | Color variant |
| `label` | `string` | `undefined` | Label text |
| `description` | `string` | `undefined` | Description text |
| `lineThrough` | `boolean` | `false` | Strike through text when checked |
| `disabled` | `boolean` | `false` | Disable the checkbox |
| `class` | `string` | `undefined` | Additional CSS classes |

## Examples

### Todo List
```svelte
<script>
  let todos = $state([
    { id: 1, text: "Setup project", completed: true },
    { id: 2, text: "Design components", completed: false },
    { id: 3, text: "Write tests", completed: false },
  ]);
</script>

{#each todos as todo (todo.id)}
  <Checkbox 
    bind:checked={todo.completed}
    label={todo.text}
    lineThrough={true}
  />
{/each}
```

### Form with Validation
```svelte
<script>
  let acceptTerms = $state(false);
  let newsletter = $state(false);
</script>

<div class="space-y-4">
  <Checkbox 
    bind:checked={acceptTerms}
    variant={acceptTerms ? "success" : "destructive"}
    label="I accept the terms and conditions"
    description="Required to create an account"
  />
  
  <Checkbox 
    bind:checked={newsletter}
    label="Subscribe to newsletter"
    description="Get weekly updates about new features"
  />
</div>
```

### Settings Panel
```svelte
<script>
  let settings = $state({
    notifications: true,
    darkMode: false,
    autoSave: true,
  });
</script>

<div class="space-y-6">
  <Checkbox 
    bind:checked={settings.notifications}
    size="lg"
    label="Push Notifications"
    description="Receive notifications on your device"
  />
  
  <Checkbox 
    bind:checked={settings.darkMode}
    size="lg"
    label="Dark Mode"
    description="Use dark theme across the application"
  />
  
  <Checkbox 
    bind:checked={settings.autoSave}
    size="lg"
    variant="success"
    label="Auto Save"
    description="Automatically save your work every 30 seconds"
  />
</div>
```

## Styling

The component uses Tailwind variants for consistent styling:

### Size Classes
- `sm`: 12px (size-3)
- `default`: 16px (size-4) 
- `lg`: 20px (size-5)
- `xl`: 24px (size-6)

### Variant Colors
- `default`: Primary color scheme
- `destructive`: Red color scheme for dangerous actions
- `success`: Green color scheme for positive actions  
- `warning`: Yellow color scheme for cautionary actions

## Accessibility

- ✅ Proper ARIA attributes
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Screen reader compatible
- ✅ High contrast support
- ✅ Disabled state handling

## Browser Support

Works in all modern browsers with full feature support.