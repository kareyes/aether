# Field Implementation (Simplified)

A simplified field component that combines label, input, description, and error handling into a single component for rapid form development.

## Features

- **Single Component**: All field types in one unified API
- **Type Support**: Input, Textarea, Checkbox, Switch, and Select
- **Built-in Validation**: Error state handling with visual feedback
- **Flexible Layouts**: Vertical, horizontal, and responsive orientations
- **Accessibility**: Automatic ARIA attributes and semantic HTML
- **Type-Safe**: Full TypeScript support with discriminated unions

## Basic Usage

### Simple Input Field

```svelte
<script lang="ts">
  import * as Field from "$lib/components/ui/field";
  
  let username = $state("");
</script>

<Field.Impl
  type="input"
  id="username"
  label="Username"
  description="Choose a unique username"
  placeholder="johndoe"
  bind:value={username}
  required
/>
```

### With Error State

```svelte
<script lang="ts">
  let email = $state("");
  let error = $state("");
  
  function validateEmail() {
    if (!email.includes("@")) {
      error = "Please enter a valid email";
    } else {
      error = "";
    }
  }
</script>

<Field.Impl
  type="input"
  inputType="email"
  id="email"
  label="Email"
  placeholder="you@example.com"
  bind:value={email}
  error={error}
  required
/>
```

## Field Types

### Input

```svelte
<Field.Impl
  type="input"
  inputType="text"  // text, email, password, number, tel, url
  id="field-id"
  label="Label"
  description="Helper text"
  placeholder="Placeholder"
  bind:value={value}
  required
  disabled
  error="Error message"
/>
```

**Input Types:**
- `text` (default)
- `email`
- `password`
- `number`
- `tel`
- `url`

### Textarea

```svelte
<Field.Impl
  type="textarea"
  id="bio"
  label="Biography"
  description="Tell us about yourself"
  placeholder="Write here..."
  rows={4}
  bind:value={bio}
/>
```

### Select

```svelte
<script lang="ts">
  let country = $state("");
  
  const countries = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" }
  ];
</script>

<Field.Impl
  type="select"
  id="country"
  label="Country"
  description="Select your country"
  placeholder="Choose a country"
  options={countries}
  bind:value={country}
/>
```

### Checkbox

```svelte
<Field.Impl
  type="checkbox"
  id="terms"
  label="Accept terms and conditions"
  description="You must accept to continue"
  bind:checked={accepted}
  orientation="horizontal"
/>
```

### Switch

```svelte
<Field.Impl
  type="switch"
  id="notifications"
  label="Enable notifications"
  description="Receive email updates"
  bind:checked={notificationsEnabled}
  orientation="horizontal"
/>
```

## Props

### Common Props (All Field Types)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | required | Unique identifier for the field |
| `label` | `string` | required | Field label text |
| `description` | `string?` | - | Helper text below the field |
| `error` | `string?` | - | Error message (displays instead of description) |
| `required` | `boolean` | `false` | Marks field as required with asterisk |
| `disabled` | `boolean` | `false` | Disables the field |
| `orientation` | `FieldOrientation` | `"vertical"` | Layout orientation |
| `class` | `string?` | - | Additional CSS classes |

### Input-Specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `inputType` | `"text" \| "email" \| "password" \| "number" \| "tel" \| "url"` | `"text"` | HTML input type |
| `placeholder` | `string?` | - | Placeholder text |
| `value` | `string?` | - | Input value (use with `bind:value`) |
| `mask` | `string?` | - | Input mask pattern |

### Textarea-Specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string?` | - | Placeholder text |
| `value` | `string?` | - | Textarea value (use with `bind:value`) |
| `rows` | `number?` | - | Number of visible rows |

### Checkbox/Switch-Specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean?` | - | Checked state (use with `bind:checked`) |

### Select-Specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `{ value: string, label: string }[]` | required | Select options |
| `value` | `string?` | - | Selected value (use with `bind:value`) |
| `placeholder` | `string?` | - | Placeholder when nothing selected |

## Orientations

### Vertical (Default)

Stacks label, input, and description vertically. Best for mobile and narrow layouts.

```svelte
<Field.Impl
  type="input"
  id="name"
  label="Name"
  description="Enter your full name"
  orientation="vertical"
/>
```

### Horizontal

Places label and input side by side. Good for forms with short labels.

```svelte
<Field.Impl
  type="input"
  id="name"
  label="Name"
  description="Enter your full name"
  orientation="horizontal"
/>
```

### Responsive

Automatically switches between vertical (mobile) and horizontal (desktop) based on container width.

```svelte
<Field.Group class="@container/field-group">
  <Field.Impl
    type="input"
    id="name"
    label="Name"
    description="Enter your full name"
    orientation="responsive"
  />
</Field.Group>
```

## Complete Form Example

```svelte
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Field from "$lib/components/ui/field";
  
  let username = $state("");
  let email = $state("");
  let country = $state("");
  let newsletter = $state(false);
  let errors = $state<Record<string, string>>({});
  
  function handleSubmit(e: Event) {
    e.preventDefault();
    errors = {};
    
    if (!username) {
      errors.username = "Username is required";
    }
    if (!email.includes("@")) {
      errors.email = "Invalid email address";
    }
    if (!country) {
      errors.country = "Please select a country";
    }
    
    if (Object.keys(errors).length === 0) {
      // Submit form
    }
  }
</script>

<form onsubmit={handleSubmit}>
  <Field.Set>
    <Field.Legend>Account Details</Field.Legend>
    <Field.Group class="gap-6">
      <Field.Impl
        type="input"
        id="username"
        label="Username"
        description="Choose a unique username"
        bind:value={username}
        error={errors.username}
        required
      />
      
      <Field.Impl
        type="input"
        inputType="email"
        id="email"
        label="Email"
        placeholder="you@example.com"
        bind:value={email}
        error={errors.email}
        required
      />
      
      <Field.Impl
        type="select"
        id="country"
        label="Country"
        placeholder="Select country"
        options={[
          { value: "us", label: "United States" },
          { value: "uk", label: "United Kingdom" }
        ]}
        bind:value={country}
        error={errors.country}
        required
      />
      
      <Field.Impl
        type="checkbox"
        id="newsletter"
        label="Subscribe to newsletter"
        bind:checked={newsletter}
        orientation="horizontal"
      />
      
      <Field.Separator />
      
      <Button type="submit">Create Account</Button>
    </Field.Group>
  </Field.Set>
</form>
```

## Validation Pattern

```svelte
<script lang="ts">
  let formData = $state({
    username: "",
    email: "",
    password: ""
  });
  
  let errors = $state<Record<string, string>>({});
  
  function validate() {
    errors = {};
    
    if (!formData.username) {
      errors.username = "Required";
    } else if (formData.username.length < 3) {
      errors.username = "Minimum 3 characters";
    }
    
    if (!formData.email) {
      errors.email = "Required";
    } else if (!formData.email.includes("@")) {
      errors.email = "Invalid email";
    }
    
    if (formData.password.length < 8) {
      errors.password = "Minimum 8 characters";
    }
    
    return Object.keys(errors).length === 0;
  }
  
  function handleSubmit(e: Event) {
    e.preventDefault();
    if (validate()) {
      // Submit form
    }
  }
</script>

<form onsubmit={handleSubmit}>
  <Field.Group class="gap-4">
    <Field.Impl
      type="input"
      id="username"
      label="Username"
      bind:value={formData.username}
      error={errors.username}
      required
    />
    
    <Field.Impl
      type="input"
      inputType="email"
      id="email"
      label="Email"
      bind:value={formData.email}
      error={errors.email}
      required
    />
    
    <Field.Impl
      type="input"
      inputType="password"
      id="password"
      label="Password"
      bind:value={formData.password}
      error={errors.password}
      required
    />
    
    <Button type="submit">Submit</Button>
  </Field.Group>
</form>
```

## When to Use

### Use Field.Impl When:
- Building forms quickly with standard patterns
- Need consistent styling across all fields
- Want built-in validation display
- Working with simple form layouts

### Use Base Components When:
- Need highly customized field layouts
- Building complex multi-input fields
- Require custom validation UI
- Need more control over structure

## Accessibility

The Field.Impl component automatically handles:
- Proper label associations (`for` attribute)
- ARIA attributes (`aria-invalid`, `aria-describedby`)
- Error announcements for screen readers
- Required field indicators
- Disabled state propagation

## Examples

See `/routes/field-impl-demo/+page.svelte` for comprehensive examples.
