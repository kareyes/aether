# Enhanced Badge Component

A versatile badge component with multiple variants, colors, sizes, and interactive features including dismissable and clickable options.

## Features

- ✅ **Multiple Variants**: default, secondary, destructive, outline, ghost, success, warning, info
- ✅ **Color Themes**: 8 predefined color schemes with light/dark mode support
- ✅ **Three Sizes**: sm, default, lg for different use cases
- ✅ **Dismissable**: Closeable badges with X button for tags and notifications
- ✅ **Clickable**: Interactive badges with hover effects and click handlers
- ✅ **Link Support**: Can render as anchor tags with href
- ✅ **TypeScript Support**: Complete type definitions
- ✅ **Accessibility**: Proper ARIA attributes and keyboard support

## Basic Usage

### Simple Badge
```svelte
<script>
  import { Badge } from "$lib/components/ui/badge";
</script>

<Badge text="Default Badge" />
```

### With Variants
```svelte
<Badge text="Success" variant="success" />
<Badge text="Warning" variant="warning" />
<Badge text="Error" variant="destructive" />
<Badge text="Info" variant="info" />
```

### With Colors
```svelte
<Badge text="Red" color="red" />
<Badge text="Blue" color="blue" />
<Badge text="Green" color="green" />
<Badge text="Purple" color="purple" />
```

## Interactive Features

### Clickable Badges
```svelte
<script>
  function handleClick() {
    alert('Badge clicked!');
  }
</script>

<Badge 
  text="Click me" 
  clickable={true}
  onclick={handleClick}
/>
```

### Dismissable Badges
```svelte
<script>
  let tags = $state(['Design', 'Development', 'Marketing']);
  
  function removeTag(index) {
    tags = tags.filter((_, i) => i !== index);
  }
</script>

{#each tags as tag, index (tag)}
  <Badge 
    text={tag}
    color="blue"
    dismissable={true}
    onDismiss={() => removeTag(index)}
  />
{/each}
```

### Link Badges
```svelte
<Badge 
  text="Visit Site" 
  href="https://example.com"
  color="blue"
  target="_blank"
/>
```

## Variants

Available variants with their use cases:

| Variant | Use Case | Example |
|---------|----------|---------|
| `default` | Primary actions, main tags | Status indicators |
| `secondary` | Secondary information | Metadata |
| `destructive` | Errors, dangerous actions | Error states |
| `outline` | Subtle emphasis | Categories |
| `ghost` | Minimal styling | Subtle labels |
| `success` | Positive states | Completed tasks |
| `warning` | Caution states | Pending actions |
| `info` | Informational | Help text |

## Color Themes

Available color options with semantic meaning:

| Color | Hex/CSS | Use Case |
|-------|---------|----------|
| `red` | Red tones | Errors, urgent |
| `orange` | Orange tones | Warnings, attention |
| `yellow` | Yellow tones | Caution, pending |
| `green` | Green tones | Success, positive |
| `blue` | Blue tones | Information, links |
| `purple` | Purple tones | Features, premium |
| `pink` | Pink tones | Creative, design |
| `gray` | Gray tones | Neutral, disabled |

## Sizes

| Size | Use Case | Example |
|------|----------|---------|
| `sm` | Compact layouts, lists | Table cells, inline text |
| `default` | Standard use | Cards, general purpose |
| `lg` | Prominent display | Headers, important status |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | `undefined` | Text content of the badge |
| `variant` | `BadgeVariant` | `'default'` | Visual style variant |
| `color` | `BadgeColor` | `'default'` | Color theme |
| `size` | `BadgeSize` | `'default'` | Size of the badge |
| `dismissable` | `boolean` | `false` | Show dismiss button |
| `clickable` | `boolean` | `false` | Make badge clickable |
| `href` | `string` | `undefined` | URL for link badges |
| `onclick` | `() => void` | `undefined` | Click handler |
| `onDismiss` | `() => void` | `undefined` | Dismiss handler |
| `class` | `string` | `undefined` | Additional CSS classes |

## Examples

### Status Indicators
```svelte
<script>
  let serverStatus = $state('online');
  let dbStatus = $state('maintenance');
  let apiStatus = $state('down');
</script>

<div class="flex gap-4">
  <div class="flex items-center gap-2">
    <span>Server:</span>
    <Badge text="Online" variant="success" size="sm" />
  </div>
  
  <div class="flex items-center gap-2">
    <span>Database:</span>
    <Badge text="Maintenance" variant="warning" size="sm" />
  </div>
  
  <div class="flex items-center gap-2">
    <span>API:</span>
    <Badge text="Down" variant="destructive" size="sm" />
  </div>
</div>
```

### Tag System
```svelte
<script>
  let availableTags = ['React', 'Vue', 'Svelte', 'Angular'];
  let selectedTags = $state(['React', 'Svelte']);
  
  function addTag(tag) {
    if (!selectedTags.includes(tag)) {
      selectedTags = [...selectedTags, tag];
    }
  }
  
  function removeTag(tag) {
    selectedTags = selectedTags.filter(t => t !== tag);
  }
</script>

<!-- Selected tags -->
<div class="flex flex-wrap gap-2 mb-4">
  {#each selectedTags as tag}
    <Badge 
      text={tag}
      color="blue"
      dismissable={true}
      onDismiss={() => removeTag(tag)}
    />
  {/each}
</div>

<!-- Available tags -->
<div class="flex flex-wrap gap-2">
  {#each availableTags as tag}
    {#if !selectedTags.includes(tag)}
      <Badge 
        text={tag}
        variant="outline"
        clickable={true}
        onclick={() => addTag(tag)}
      />
    {/if}
  {/each}
</div>
```

### Notification System
```svelte
<script>
  let notifications = $state([
    { id: 1, text: 'New message', type: 'info' },
    { id: 2, text: 'Update available', type: 'warning' },
    { id: 3, text: 'Error occurred', type: 'error' },
  ]);
  
  function dismissNotification(id) {
    notifications = notifications.filter(n => n.id !== id);
  }
</script>

<div class="space-y-2">
  {#each notifications as notification}
    <div class="flex items-center justify-between p-3 border rounded">
      <span>{notification.text}</span>
      <Badge 
        text={notification.type}
        variant={notification.type === 'error' ? 'destructive' : 
                notification.type === 'warning' ? 'warning' : 'info'}
        dismissable={true}
        onDismiss={() => dismissNotification(notification.id)}
      />
    </div>
  {/each}
</div>
```

### Product Features
```svelte
<div class="grid gap-4 md:grid-cols-3">
  <div class="border rounded-lg p-4">
    <div class="flex justify-between items-start mb-2">
      <h3 class="font-semibold">Premium Plan</h3>
      <Badge text="Popular" variant="success" />
    </div>
    <p class="text-sm text-muted-foreground mb-4">
      Advanced features for teams
    </p>
    <div class="flex gap-2">
      <Badge text="Analytics" color="blue" size="sm" />
      <Badge text="API Access" color="green" size="sm" />
      <Badge text="Priority Support" color="purple" size="sm" />
    </div>
  </div>
  
  <!-- More product cards... -->
</div>
```

### User Profile
```svelte
<div class="flex items-start gap-4">
  <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
  <div class="flex-1">
    <div class="flex items-center gap-2 mb-1">
      <h3 class="font-semibold">John Doe</h3>
      <Badge text="Pro" variant="success" size="sm" />
    </div>
    <p class="text-sm text-muted-foreground mb-2">Senior Developer</p>
    <div class="flex flex-wrap gap-1">
      <Badge text="React" color="blue" size="sm" />
      <Badge text="TypeScript" color="blue" size="sm" />
      <Badge text="Node.js" color="green" size="sm" />
      <Badge text="5+ years" color="gray" size="sm" />
    </div>
  </div>
</div>
```

## Styling Notes

### Custom Colors
When using `color` prop, it overrides the `variant` styling and uses outline style with the specified color theme.

### Hover Effects
- Clickable badges have scale and opacity transitions
- Dismissable badges have hover effects on the X button
- Link badges maintain standard link behavior

### Dark Mode
All colors and variants include dark mode support with appropriate contrast ratios.

## Accessibility

- ✅ Proper semantic HTML (`<span>`, `<a>`, or `<button>`)
- ✅ ARIA labels for dismiss buttons
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Screen reader friendly
- ✅ High contrast support

## Browser Support

Works in all modern browsers with full feature support including hover effects and transitions.