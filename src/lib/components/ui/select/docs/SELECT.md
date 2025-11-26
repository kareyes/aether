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
| `onSelectionChange` | `(value) => void` | `undefined` | Callback fired when selection changes |

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