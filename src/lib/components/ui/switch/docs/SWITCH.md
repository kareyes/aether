# Switch Component

A toggle switch component for binary on/off states. Built with accessibility in mind and supports multiple variants and sizes.

## Features

- **Multiple Variants**: default, success, warning, danger, ghost
- **Three Sizes**: sm, default, lg
- **Error States**: Built-in error state handling
- **Field Integration**: Works seamlessly with Field component
- **Accessibility**: Full keyboard navigation and ARIA support
- **TypeScript**: Complete type definitions
- **Form Integration**: Native form support with name/value attributes

## Installation

```bash
npm install bits-ui tailwind-variants
```

## Basic Usage

### Simple Switch

```svelte
<script>
  import { Switch } from "$lib/components/ui/switch";
  
  let enabled = $state(false);
</script>

<Switch bind:checked={enabled} />
```

### With Label (using Field)

```svelte
<script>
  import { Switch } from "$lib/components/ui/switch";
  import * as Field from "$lib/components/ui/field";
  
  let notifications = $state(true);
</script>

<Field.Field
  label="Enable notifications"
  description="Receive email notifications for updates"
  orientation="horizontal"
  labelPosition="before"
>
  <Switch bind:checked={notifications} />
</Field.Field>
```

## Sizes

Available sizes: `sm`, `default`, `lg`

```svelte
<Switch size="sm" />
<Switch size="default" />
<Switch size="lg" />
```

## Variants

The Switch component supports different visual variants:

### Default
Standard switch appearance for general use.

```svelte
<Switch variant="default" checked={true} />
```

### Success
Green variant for positive actions or enabled features.

```svelte
<Switch variant="success" checked={true} />
```

### Warning
Orange/yellow variant for actions requiring attention.

```svelte
<Switch variant="warning" checked={true} />
```

### Danger
Red variant for destructive or dangerous actions.

```svelte
<Switch variant="danger" checked={true} />
```

### Ghost
Subtle variant with less visual prominence.

```svelte
<Switch variant="ghost" checked={true} />
```

## States

### Disabled

```svelte
<Switch disabled checked={true} />
<Switch disabled checked={false} />
```

### Error State

```svelte
<script>
  let accepted = $state(false);
  let hasError = $derived(!accepted);
</script>

<Switch 
  bind:checked={accepted}
  error={hasError}
  onError={(err) => console.log('Error state:', err)}
/>
```

## Form Integration

### Basic Form

```svelte
<form onsubmit={handleSubmit}>
  <Switch 
    name="newsletter" 
    value="yes"
    checked={true}
  />
</form>
```

### Required Field

```svelte
<Switch 
  name="terms" 
  required 
  checked={false}
/>
```

## Using Switch with Field Component

The Field component provides a consistent way to add labels, descriptions, and error handling to your Switch components.

### Basic Field Usage

```svelte
<script>
  import { Switch } from "$lib/components/ui/switch";
  import * as Field from "$lib/components/ui/field";
  
  let autoSave = $state(true);
</script>

<Field.Field
  label="Auto-save"
  description="Automatically save your work"
  orientation="horizontal"
  labelPosition="before"
>
  <Switch 
    bind:checked={autoSave}
    variant="success"
  />
</Field.Field>
```

### With Validation

```svelte
<script>
  import { Switch } from "$lib/components/ui/switch";
  import * as Field from "$lib/components/ui/field";
  
  let termsAccepted = $state(false);
  let error = $derived(!termsAccepted);
</script>

<Field.Field
  label="Accept terms and conditions"
  description="You must accept to continue"
  required
  error={error ? "Please accept the terms to continue" : undefined}
  orientation="horizontal"
  labelPosition="before"
>
  <Switch 
    bind:checked={termsAccepted}
    error={error}
  />
</Field.Field>
```

### Multiple Switches in Form

```svelte
<script>
  import { Switch } from "$lib/components/ui/switch";
  import * as Field from "$lib/components/ui/field";
  
  let settings = $state({
    email: true,
    push: false,
    sms: false
  });
</script>

<Field.Set>
  <Field.Legend>Notification Settings</Field.Legend>
  <Field.Description>Configure how you receive notifications</Field.Description>
  
  <Field.Separator />
  
  <Field.Group class="gap-4">
    <Field.Field
      label="Email Notifications"
      description="Get notified via email"
      orientation="horizontal"
      labelPosition="before"
    >
      <Switch variant="success" bind:checked={settings.email} />
    </Field.Field>
    
    <Field.Field
      label="Push Notifications"
      description="Get browser push notifications"
      orientation="horizontal"
      labelPosition="before"
    >
      <Switch bind:checked={settings.push} />
    </Field.Field>
    
    <Field.Field
      label="SMS Notifications"
      description="Get text message alerts"
      orientation="horizontal"
      labelPosition="before"
    >
      <Switch variant="warning" bind:checked={settings.sms} />
    </Field.Field>
  </Field.Group>
</Field.Set>
```

### Horizontal Layout (Label After)

```svelte
<Field.Field
  label="Enable dark mode"
  orientation="horizontal"
  labelPosition="after"
>
  <Switch checked={false} />
</Field.Field>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Whether the switch is checked |
| `variant` | `'default' \| 'success' \| 'warning' \| 'danger' \| 'ghost'` | `'default'` | Visual variant |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Size of the switch |
| `disabled` | `boolean` | `false` | Whether the switch is disabled |
| `required` | `boolean` | `false` | Whether the field is required |
| `error` | `boolean` | `false` | Error state |
| `name` | `string` | - | Name attribute for forms |
| `value` | `string` | `'on'` | Value attribute for forms |
| `onCheckedChange` | `(checked: boolean) => void` | - | Callback when checked state changes |
| `onError` | `(error: boolean) => void` | - | Callback when error state changes |

## Events

### onCheckedChange

Called whenever the switch's checked state changes.

```svelte
<Switch 
  onCheckedChange={(checked) => {
    console.log('Switch toggled:', checked);
  }}
/>
```

### onError

Called when the error state changes.

```svelte
<Switch 
  error={true}
  onError={(hasError) => {
    console.log('Error state changed:', hasError);
  }}
/>
```

## Accessibility

- Uses native `<button>` with `role="switch"`
- Proper `aria-checked` state management
- `aria-invalid` for error states
- `aria-required` for required fields
- Full keyboard support (Space/Enter to toggle)
- Screen reader announcements for state changes

## Best Practices

### Use Appropriate Variants

- **Default**: General settings and preferences
- **Success**: Confirmed or enabled features (auto-save, syncing)
- **Warning**: Actions requiring attention (beta features, experimental)
- **Danger**: Destructive or dangerous actions (delete on exit, permanent changes)
- **Ghost**: Secondary or less important options

### Provide Clear Labels

Always use the Field component or proper labels to make the purpose of the switch clear:

```svelte
<!-- Good -->
<Field.Field
  label="Enable notifications"
  description="Receive updates about your account"
  orientation="horizontal"
>
  <Switch />
</Field.Field>

<!-- Avoid: No context for what the switch controls -->
<Switch />
```

### Validation

For required switches, provide clear error messages:

```svelte
<Field.Field
  label="Accept privacy policy"
  required
  error={!accepted ? "You must accept the privacy policy" : undefined}
  orientation="horizontal"
>
  <Switch bind:checked={accepted} error={!accepted} />
</Field.Field>
```

### Form Structure

Group related switches using Field.Set:

```svelte
<Field.Set>
  <Field.Legend>Privacy Settings</Field.Legend>
  <Field.Description>Control your privacy preferences</Field.Description>
  
  <Field.Separator />
  
  <Field.Group class="gap-4">
    <!-- Multiple switches here -->
  </Field.Group>
</Field.Set>
```

## Common Patterns

### Settings Panel

```svelte
<div class="space-y-4 max-w-md">
  <Field.Field
    label="Email Notifications"
    description="Receive notifications via email"
    orientation="horizontal"
    labelPosition="before"
  >
    <Switch variant="success" checked={true} />
  </Field.Field>
  
  <Field.Field
    label="Marketing Emails"
    description="Receive promotional emails"
    orientation="horizontal"
    labelPosition="before"
  >
    <Switch variant="ghost" checked={false} />
  </Field.Field>
  
  <Field.Field
    label="Data Processing"
    description="Required for app functionality"
    orientation="horizontal"
    labelPosition="before"
  >
    <Switch disabled checked={true} />
  </Field.Field>
</div>
```

### Feature Flags

```svelte
<Field.Set>
  <Field.Legend>Experimental Features</Field.Legend>
  <Field.Description>Enable beta features at your own risk</Field.Description>
  
  <Field.Separator />
  
  <Field.Group class="gap-4">
    <Field.Field
      label="New Dashboard"
      description="Try our redesigned dashboard"
      orientation="horizontal"
      labelPosition="before"
    >
      <Switch variant="warning" />
    </Field.Field>
    
    <Field.Field
      label="AI Assistant"
      description="Get help from our AI"
      orientation="horizontal"
      labelPosition="before"
    >
      <Switch variant="success" />
    </Field.Field>
  </Field.Group>
</Field.Set>
```

### Consent Management

```svelte
<Field.Set>
  <Field.Legend>Cookie Preferences</Field.Legend>
  <Field.Description>Manage your cookie settings</Field.Description>
  
  <Field.Separator />
  
  <Field.Group class="gap-4">
    <Field.Field
      label="Essential Cookies"
      description="Required for site functionality"
      orientation="horizontal"
      labelPosition="before"
    >
      <Switch disabled checked={true} />
    </Field.Field>
    
    <Field.Field
      label="Analytics Cookies"
      description="Help us improve our service"
      orientation="horizontal"
      labelPosition="before"
    >
      <Switch variant="ghost" />
    </Field.Field>
    
    <Field.Field
      label="Marketing Cookies"
      description="Personalized advertising"
      orientation="horizontal"
      labelPosition="before"
    >
      <Switch variant="ghost" />
    </Field.Field>
  </Field.Group>
</Field.Set>
```

## Related Components

- **Checkbox**: Use for multiple selections or single opt-in scenarios
- **Radio**: Use for selecting one option from multiple choices
- **Field**: Wrapper component for consistent form layouts
