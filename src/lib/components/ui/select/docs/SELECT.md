# Unified Select Component

A unified Select component that combines all shadcn select functionality into a single, easy-to-use component. This component simplifies the usage of the select by handling all the composition internally while providing a clean API.

## Features

- ✅ Single and multiple selection
- ✅ Grouped options with labels
- ✅ All shadcn variants (default, outline, filled, ghost, underline)
- ✅ Multiple sizes (sm, default, lg)
- ✅ Disabled states (entire component or individual options)
- ✅ Two-way data binding with Svelte 5 runes
- ✅ TypeScript support with full type safety
- ✅ Customizable styling
- ✅ Selection change callbacks
- ✅ Accessible keyboard navigation
- ✅ Portal support for dropdown positioning

## Basic Usage

```svelte
<script>
  import { Select } from "$core/components/ui/select";
  
  let value = $state("");
  
  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" }
  ];
</script>

<Select
  bind:value
  {options}
  placeholder="Select a fruit..."
  class="w-[200px]"
/>
```

## Multiple Selection

```svelte
<script>
  let selectedFrameworks = $state([]);
  
  const frameworks = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "svelte", label: "Svelte" }
  ];
</script>

<Select
  bind:value={selectedFrameworks}
  options={frameworks}
  multiple={true}
  placeholder="Select frameworks..."
  class="w-[250px]"
/>
```

## Grouped Options

```svelte
<script>
  let selectedFramework = $state("");
  
  const groups = [
    {
      label: "Frontend Frameworks",
      options: [
        { value: "react", label: "React" },
        { value: "vue", label: "Vue.js" },
        { value: "svelte", label: "Svelte" }
      ]
    },
    {
      label: "Backend Frameworks",
      options: [
        { value: "express", label: "Express.js" },
        { value: "fastify", label: "Fastify" },
        { value: "nestjs", label: "NestJS" }
      ]
    }
  ];
</script>

<Select
  bind:value={selectedFramework}
  {groups}
  placeholder="Select a framework..."
  class="w-[250px]"
/>
```

## Variants

```svelte
<!-- Default -->
<Select {options} variant="default" />

<!-- Outline -->
<Select {options} variant="outline" />

<!-- Filled -->
<Select {options} variant="filled" />

<!-- Ghost -->
<Select {options} variant="ghost" />

<!-- Underline -->
<Select {options} variant="underline" />
```

## Sizes

```svelte
<!-- Small -->
<Select {options} size="sm" />

<!-- Default -->
<Select {options} size="default" />

<!-- Large -->
<Select {options} size="lg" />
```

## Disabled States

```svelte
<!-- Disabled component -->
<Select {options} disabled={true} />

<!-- Some options disabled -->
<Select
  options={[
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana", disabled: true },
    { value: "orange", label: "Orange" }
  ]}
/>
```

## Selection Change Callback

```svelte
<script>
  function handleSelectionChange(value) {
    console.log('Selection changed:', value);
    // Handle the change
  }
</script>

<Select
  {options}
  onSelectionChange={handleSelectionChange}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| string[] \| undefined` | `undefined` | The selected value(s). Use `bind:value` for two-way binding |
| `options` | `SelectOption[]` | `[]` | Array of options for the select |
| `groups` | `SelectGroup[]` | `[]` | Array of grouped options |
| `multiple` | `boolean` | `false` | Whether multiple selections are allowed |
| `disabled` | `boolean` | `false` | Whether the entire select is disabled |
| `required` | `boolean` | `false` | Whether the select is required |
| `placeholder` | `string` | `"Select an option..."` | Placeholder text when no option is selected |
| `variant` | `SelectVariant` | `"default"` | Visual variant (`"default"`, `"outline"`, `"filled"`, `"ghost"`, `"underline"`) |
| `size` | `SelectSize` | `"default"` | Size variant (`"sm"`, `"default"`, `"lg"`) |
| `name` | `string` | `undefined` | Name attribute for form submission |
| `class` | `string` | `undefined` | Additional CSS classes for the trigger |
| `triggerClass` | `string` | `undefined` | Additional CSS classes for the trigger element |
| `contentClass` | `string` | `undefined` | Additional CSS classes for the dropdown content |
| `itemClass` | `string` | `undefined` | Additional CSS classes for individual items |
| `sideOffset` | `number` | `4` | Offset distance from the trigger |
| `portalProps` | `SelectPrimitive.PortalProps` | `undefined` | Props for the portal element |
| `error` | `boolean` | `false` | Error state with visual feedback |
| `onSelectionChange` | `(value) => void` | `undefined` | Callback fired when selection changes |
| `onError` | `(error: boolean) => void` | `undefined` | Callback when error state changes |

## Types

```typescript
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectGroup {
  label?: string;
  options: SelectOption[];
}

type SelectVariant = "default" | "outline" | "filled" | "ghost" | "underline";
type SelectSize = "sm" | "default" | "lg";
```

## Comparison with Composed Components

### Before (Composed)
```svelte
<Select bind:value>
  <SelectTrigger class="w-[200px]">
    Select a fruit...
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectContent>
</Select>
```

### After (Unified)
```svelte
<Select
  bind:value
  options={[
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" }
  ]}
  placeholder="Select a fruit..."
  class="w-[200px]"
/>
```

## Benefits

1. **Simplified API**: No need to compose multiple components
2. **Type Safety**: Full TypeScript support with proper typing
3. **Data-Driven**: Works with arrays of options instead of manual markup
4. **Consistent**: Eliminates composition mistakes and ensures consistency
5. **Feature Rich**: Built-in support for grouping, multiple selection, and all variants
6. **Backward Compatible**: The original composed components are still available

## When to Use

- ✅ Use **Select** when you have data-driven options
- ✅ Use **Select** for simple to moderately complex select needs
- ✅ Use **Select** when you want type safety and clean API
- ⚠️ Use **composed components** when you need completely custom item rendering
- ⚠️ Use **composed components** when you have very complex nested structures

## Error States

### Basic Error State
```svelte
<script>
  let value = $state("");
  let hasError = $derived(!value);
</script>

<Select
  {options}
  bind:value
  error={hasError}
  required
  placeholder="Please select an option..."
/>
```

### With Field Component
```svelte
<script>
  import * as Field from "$core/components/ui/field";
  
  let framework = $state("");
</script>

<Field.Field
  label="Framework Selection"
  description="Choose your preferred framework"
  error={!framework ? "Please select a framework" : undefined}
  required
>
  <Select
    {options}
    bind:value={framework}
    error={!framework}
  />
</Field.Field>
```

### Error Callback
```svelte
<script>
  function handleError(hasError: boolean) {
    console.log('Select error state:', hasError);
  }
</script>

<Select
  {options}
  error={!value}
  onError={handleError}
/>
```

## Advanced Customization

```svelte
<Select
  bind:value
  {options}
  variant="outline"
  size="lg"
  class="w-[300px]"
  triggerClass="border-blue-500"
  contentClass="bg-blue-50"
  itemClass="hover:bg-blue-100"
  sideOffset={8}
  onSelectionChange={(value) => {
    // Custom logic
    console.log('Selected:', value);
  }}
/>
```

## Using Select with Field Component

The Field component provides labels, descriptions, and error handling. This is the recommended way to use Select in forms.

### Basic Field Usage

```svelte
<script lang="ts">
  import * as Field from '$core/components/ui/field';
  import { Select } from '$core/components/ui/select';

  let country = $state('');
  
  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
  ];
</script>

<Field.Field
  label="Country"
  description="Select your country of residence"
>
  <Select 
    bind:value={country}
    options={countries}
    placeholder="Select a country..."
  />
</Field.Field>
```

### Field with Validation

```svelte
<script lang="ts">
  import * as Field from '$core/components/ui/field';
  import { Select } from '$core/components/ui/select';

  let framework = $state('');
  let errors = $state<Record<string, string>>({});

  const frameworks = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'svelte', label: 'Svelte' },
  ];

  function validate() {
    if (!framework) {
      errors.framework = 'Please select a framework';
    } else {
      delete errors.framework;
    }
  }
</script>

<Field.Field
  label="Framework"
  description="Choose your preferred framework"
  required
  error={errors.framework}
>
  <Select 
    bind:value={framework}
    options={frameworks}
    placeholder="Select framework..."
    error={!!errors.framework}
    onSelectionChange={validate}
  />
</Field.Field>
```

### Field with Grouped Options

```svelte
<script lang="ts">
  import * as Field from '$core/components/ui/field';
  import { Select } from '$core/components/ui/select';

  let selectedTech = $state('');
  
  const techGroups = [
    {
      label: 'Frontend Frameworks',
      options: [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue.js' },
        { value: 'svelte', label: 'Svelte' }
      ]
    },
    {
      label: 'Backend Frameworks',
      options: [
        { value: 'express', label: 'Express.js' },
        { value: 'fastify', label: 'Fastify' },
        { value: 'nestjs', label: 'NestJS' }
      ]
    }
  ];
</script>

<Field.Field
  label="Technology Stack"
  description="Select your primary framework"
  required
>
  <Select 
    bind:value={selectedTech}
    groups={techGroups}
    placeholder="Select a framework..."
  />
</Field.Field>
```

### Field with Multiple Selection

```svelte
<script lang="ts">
  import * as Field from '$core/components/ui/field';
  import { Select } from '$core/components/ui/select';

  let selectedSkills = $state<string[]>([]);
  
  const skills = [
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'rust', label: 'Rust' },
  ];
</script>

<Field.Field
  label="Skills"
  description="Select all that apply"
>
  <Select 
    bind:value={selectedSkills}
    options={skills}
    multiple={true}
    placeholder="Select skills..."
  />
</Field.Field>

{#if selectedSkills.length > 0}
  <p class="mt-2 text-sm text-muted-foreground">
    Selected: {selectedSkills.join(', ')}
  </p>
{/if}
```

### Field with Different Variants

```svelte
<script lang="ts">
  import * as Field from '$core/components/ui/field';
  import { Select } from '$core/components/ui/select';

  let formData = $state({
    country: '',
    language: '',
    timezone: '',
  });

  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
  ];

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
  ];

  const timezones = [
    { value: 'est', label: 'EST (UTC-5)' },
    { value: 'pst', label: 'PST (UTC-8)' },
  ];
</script>

<div class="space-y-6">
  <!-- Outline Variant -->
  <Field.Field
    label="Country"
    description="Your country of residence"
  >
    <Select 
      variant="outline"
      bind:value={formData.country}
      options={countries}
      placeholder="Select country..."
    />
  </Field.Field>

  <!-- Filled Variant -->
  <Field.Field
    label="Language"
    description="Preferred language"
  >
    <Select 
      variant="filled"
      bind:value={formData.language}
      options={languages}
      placeholder="Select language..."
    />
  </Field.Field>

  <!-- Underline Variant -->
  <Field.Field
    label="Timezone"
    description="Your local timezone"
  >
    <Select 
      variant="underline"
      size="lg"
      bind:value={formData.timezone}
      options={timezones}
      placeholder="Select timezone..."
    />
  </Field.Field>
</div>
```

### Complete Form Example

```svelte
<script lang="ts">
  import * as Field from '$core/components/ui/field';
  import { Select } from '$core/components/ui/select';
  import { Button } from '$core/components/ui/button';

  let formData = $state({
    country: '',
    state: '',
    framework: '',
    languages: [] as string[],
  });

  let errors = $state<Record<string, string>>({});

  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
  ];

  const usStates = [
    { value: 'ca', label: 'California' },
    { value: 'ny', label: 'New York' },
    { value: 'tx', label: 'Texas' },
  ];

  const frameworks = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'svelte', label: 'Svelte' },
  ];

  const programmingLanguages = [
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'rust', label: 'Rust' },
  ];

  function handleSubmit(e: Event) {
    e.preventDefault();
    errors = {};

    if (!formData.country) errors.country = 'Country is required';
    if (!formData.state) errors.state = 'State is required';
    if (!formData.framework) errors.framework = 'Framework is required';
    if (formData.languages.length === 0) {
      errors.languages = 'Select at least one language';
    }

    if (Object.keys(errors).length === 0) {
      console.log('Form submitted:', formData);
    }
  }
</script>

<form onsubmit={handleSubmit} class="space-y-6">
  <Field.Set>
    <Field.Legend>Profile Information</Field.Legend>
    <Field.Description>
      Complete your profile by selecting the appropriate options
    </Field.Description>

    <Field.Separator />

    <Field.Group class="gap-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field.Field
          label="Country"
          description="Your country of residence"
          required
          error={errors.country}
        >
          <Select 
            bind:value={formData.country}
            options={countries}
            placeholder="Select country..."
            error={!!errors.country}
          />
        </Field.Field>

        <Field.Field
          label="State"
          description="Your state or province"
          required
          error={errors.state}
        >
          <Select 
            bind:value={formData.state}
            options={usStates}
            placeholder="Select state..."
            error={!!errors.state}
            disabled={!formData.country}
          />
        </Field.Field>
      </div>

      <Field.Field
        label="Primary Framework"
        description="Your preferred frontend framework"
        required
        error={errors.framework}
      >
        <Select 
          bind:value={formData.framework}
          options={frameworks}
          placeholder="Select framework..."
          variant="outline"
          size="lg"
          error={!!errors.framework}
        />
      </Field.Field>

      <Field.Field
        label="Programming Languages"
        description="Select all languages you are proficient in"
        required
        error={errors.languages}
      >
        <Select 
          bind:value={formData.languages}
          options={programmingLanguages}
          multiple={true}
          placeholder="Select languages..."
          error={!!errors.languages}
        />
      </Field.Field>
    </Field.Group>

    <div class="flex gap-4 pt-4">
      <Button type="submit">Save Profile</Button>
      <Button type="button" variant="outline">Cancel</Button>
    </div>
  </Field.Set>
</form>
```