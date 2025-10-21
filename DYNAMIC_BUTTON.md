# Dynamic Button Component

An enhanced button component for SvelteKit with support for icons, loading states, and dynamic content.

## Features

- ✅ **Text content**: Display text with the `text` prop
- ✅ **Icons**: Support for Lucide Svelte icons with `icon` prop
- ✅ **Icon positioning**: Place icons on left or right with `iconPosition`
- ✅ **Loading states**: Built-in loading spinner with `loading` prop
- ✅ **Multiple variants**: All original button variants supported
- ✅ **Flexible sizing**: All original button sizes supported
- ✅ **Fallback support**: Still works with children content

## Basic Usage

### Simple Text Button
```svelte
<Button text="Click me" />
```

### Button with Icon
```svelte
<script>
  import PlusIcon from "@lucide/svelte/icons/plus";
</script>

<Button text="Add Item" icon={PlusIcon} />
```

### Icon Position
```svelte
<Button text="Download" icon={DownloadIcon} iconPosition="right" />
```

### Icon Only Button
```svelte
<Button icon={SaveIcon} size="icon" />
```

## Loading States

### Basic Loading
```svelte
<Button 
  text="Save" 
  loading={isLoading} 
  loadingText="Saving..."
/>
```

### Loading with Icon
```svelte
<Button 
  text="Save Changes" 
  icon={SaveIcon}
  loading={isLoading}
  loadingText="Saving..."
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | `undefined` | Text content to display |
| `icon` | `ComponentType` | `undefined` | Lucide Svelte icon component |
| `iconPosition` | `"left" \| "right"` | `"left"` | Position of the icon relative to text |
| `loading` | `boolean` | `false` | Show loading spinner and disable button |
| `loadingText` | `string` | `"Loading..."` | Text to show during loading state |
| `variant` | `ButtonVariant` | `"default"` | Button style variant |
| `size` | `ButtonSize` | `"default"` | Button size |
| `disabled` | `boolean` | `false` | Disable the button |
| `href` | `string` | `undefined` | Makes button render as link |

## Examples

### All Variants
```svelte
<Button text="Default" icon={PlusIcon} />
<Button text="Secondary" icon={PlusIcon} variant="secondary" />
<Button text="Outline" icon={PlusIcon} variant="outline" />
<Button text="Ghost" icon={PlusIcon} variant="ghost" />
<Button text="Destructive" icon={PlusIcon} variant="destructive" />
<Button text="Bordered" icon={PlusIcon} variant="bordered" />
<Button text="Flat" icon={PlusIcon} variant="flat" />
```

### Different Sizes
```svelte
<Button text="Small" icon={PlusIcon} size="sm" />
<Button text="Default" icon={PlusIcon} size="default" />
<Button text="Large" icon={PlusIcon} size="lg" />
```

### Interactive Loading Example
```svelte
<script>
  import SaveIcon from "@lucide/svelte/icons/save";
  
  let saving = $state(false);
  
  const handleSave = async () => {
    saving = true;
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Saved!');
    } finally {
      saving = false;
    }
  };
</script>

<Button 
  text="Save Changes" 
  icon={SaveIcon}
  loading={saving}
  loadingText="Saving..."
  onclick={handleSave}
/>
```

## Backwards Compatibility

The component maintains full backwards compatibility with the original button component:

```svelte
<!-- This still works -->
<Button variant="destructive">
  <PlusIcon class="size-4 mr-2" />
  Custom Content
</Button>
```

## Loading Behavior

When `loading={true}`:
- Button becomes disabled
- Icon is replaced with a spinning loader
- Text changes to `loadingText` if provided
- Original icon and text are restored when loading ends

## TypeScript Support

Full TypeScript support with proper type definitions for all props and variants.