# Avatar

An enhanced avatar component for displaying user profile images with support for fallbacks, variants, colors, shapes, and grouping.

## Features

- **Multiple Sizes** - 6 size options from `xs` to `2xl`
- **Flexible Shapes** - Circle, square, and rounded variants
- **Style Variants** - Default, bordered (with ring offset), and solid
- **Color Options** - 10 color schemes including gradient
- **Smart Fallbacks** - Auto-generated initials, default icon, or custom snippet
- **Avatar Groups** - Overlapping avatar displays with configurable spacing
- **Image Loading** - Built-in image loading with fallback support
- **Fully Typed** - Complete TypeScript support
- **Customizable** - Override styles with className props

## Installation

```bash
# The component is already included in the project
import { Avatar, AvatarGroup } from "$core/components/ui/avatar";
```

## Basic Usage

### Simple Avatar

```svelte
<script>
  import { Avatar } from "$core/components/ui/avatar";
</script>

<Avatar 
  src="https://github.com/shadcn.png" 
  alt="User"
  fallback="CN" 
/>
```

### With Fallback Text

```svelte
<Avatar fallback="John Doe" />
<!-- Displays: "JD" -->
```

### Without Image (Icon Fallback)

```svelte
<Avatar />
<!-- Displays default user icon -->
```

## Sizes

```svelte
<Avatar size="xs" fallback="XS" />
<Avatar size="sm" fallback="SM" />
<Avatar size="default" fallback="MD" />
<Avatar size="lg" fallback="LG" />
<Avatar size="xl" fallback="XL" />
<Avatar size="2xl" fallback="2X" />
```

**Size Reference:**
- `xs` - 24px (1.5rem)
- `sm` - 32px (2rem)
- `default` - 40px (2.5rem)
- `lg` - 48px (3rem)
- `xl` - 56px (3.5rem)
- `2xl` - 64px (4rem)

## Shapes

```svelte
<Avatar shape="circle" fallback="CI" />
<Avatar shape="rounded" fallback="RO" />
<Avatar shape="square" fallback="SQ" />
```

## Variants

### Default

```svelte
<Avatar variant="default" fallback="DF" />
```

### Bordered

Adds a ring with offset around the avatar:

```svelte
<Avatar variant="bordered" fallback="BO" />
```

### Solid

```svelte
<Avatar variant="solid" fallback="SO" />
```

## Colors

Available for fallback backgrounds:

```svelte
<Avatar color="default" fallback="DF" />
<Avatar color="primary" fallback="PR" />
<Avatar color="secondary" fallback="SE" />
<Avatar color="green" fallback="GR" />
<Avatar color="yellow" fallback="YE" />
<Avatar color="red" fallback="RE" />
<Avatar color="blue" fallback="BL" />
<Avatar color="purple" fallback="PU" />
<Avatar color="pink" fallback="PI" />
<Avatar color="gradient" fallback="GD" />
```

## Bordered with Colors

Combine `bordered` variant with colors to get matching ring colors:

```svelte
<Avatar variant="bordered" color="primary" fallback="PR" size="lg" />
<Avatar variant="bordered" color="green" fallback="GR" size="lg" />
<Avatar variant="bordered" color="red" fallback="RE" size="lg" />
```

**Note:** The ring color automatically matches the selected color option using compound variants.

## Custom Fallback

Use the `customFallback` snippet for complete control:

```svelte
<Avatar>
  {#snippet customFallback()}
    <span class="text-2xl">🎨</span>
  {/snippet}
</Avatar>
```

## Avatar Groups

Display multiple avatars in an overlapping layout:

```svelte
<script>
  import { Avatar, AvatarGroup } from "$core/components/ui/avatar";
  
  const users = [
    { image: "/avatar1.jpg", name: "User 1" },
    { image: "/avatar2.jpg", name: "User 2" },
    { image: "/avatar3.jpg", name: "User 3" },
  ];
</script>

<AvatarGroup spacing="default">
  {#each users as user}
    <Avatar src={user.image} alt={user.name} fallback={user.name} />
  {/each}
</AvatarGroup>
```

### Spacing Options

```svelte
<AvatarGroup spacing="tight">...</AvatarGroup>
<AvatarGroup spacing="default">...</AvatarGroup>
<AvatarGroup spacing="loose">...</AvatarGroup>
```

**Spacing Values:**
- `tight` - Less overlap (-0.5rem)
- `default` - Standard overlap (-0.75rem)
- `loose` - Minimal overlap (-0.25rem)

### Bordered Avatar Groups

```svelte
<AvatarGroup spacing="default">
  <Avatar variant="bordered" color="primary" src={user1.image} />
  <Avatar variant="bordered" color="green" src={user2.image} />
  <Avatar variant="bordered" color="purple" src={user3.image} />
</AvatarGroup>
```

**Tip:** Bordered avatars in groups create a nice separation effect with the ring offset.

## Props

### Avatar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Image source URL |
| `alt` | `string` | `""` | Image alt text |
| `fallback` | `string` | - | Text for fallback initials |
| `size` | `"xs" \| "sm" \| "default" \| "lg" \| "xl" \| "2xl"` | `"default"` | Avatar size |
| `shape` | `"circle" \| "square" \| "rounded"` | `"circle"` | Avatar shape |
| `variant` | `"default" \| "bordered" \| "solid"` | `"default"` | Visual variant |
| `color` | `"default" \| "primary" \| "secondary" \| "green" \| "yellow" \| "red" \| "blue" \| "purple" \| "pink" \| "gradient"` | `"default"` | Fallback color |
| `class` | `string` | - | Additional CSS classes for root |
| `imageClass` | `string` | - | Additional CSS classes for image |
| `fallbackClass` | `string` | - | Additional CSS classes for fallback |
| `customFallback` | `Snippet` | - | Custom fallback snippet |
| `delayMs` | `number` | `0` | Delay before showing fallback |

### AvatarGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `max` | `number` | `5` | Maximum avatars to display |
| `size` | Avatar size type | `"default"` | Size for all avatars |
| `spacing` | `"tight" \| "default" \| "loose"` | `"default"` | Overlap spacing |
| `class` | `string` | - | Additional CSS classes |
| `children` | `Snippet` | Required | Avatar components |

## Advanced Examples

### User Profile Card

```svelte
<div class="flex items-center gap-4">
  <Avatar 
    src={user.avatar}
    fallback={user.name}
    size="xl"
    variant="bordered"
    color="primary"
  />
  <div>
    <h3 class="font-semibold">{user.name}</h3>
    <p class="text-sm text-muted-foreground">{user.email}</p>
  </div>
</div>
```

### Online Status Indicator

```svelte
<div class="relative inline-block">
  <Avatar src={user.avatar} fallback={user.name} size="lg" />
  <span 
    class="absolute bottom-0 right-0 block size-3 rounded-full bg-green-500 ring-2 ring-background"
  ></span>
</div>
```

### Team Members Grid

```svelte
<div class="grid grid-cols-4 gap-4">
  {#each team as member}
    <div class="text-center">
      <Avatar 
        src={member.avatar}
        fallback={member.name}
        size="2xl"
        variant="bordered"
        color={member.color}
        class="mx-auto"
      />
      <p class="mt-2 text-sm font-medium">{member.name}</p>
      <p class="text-xs text-muted-foreground">{member.role}</p>
    </div>
  {/each}
</div>
```

### Different Shapes Showcase

```svelte
<div class="flex gap-4">
  <Avatar 
    shape="circle" 
    variant="bordered" 
    color="primary" 
    fallback="CI" 
    size="xl" 
  />
  <Avatar 
    shape="rounded" 
    variant="bordered" 
    color="green" 
    fallback="RO" 
    size="xl" 
  />
  <Avatar 
    shape="square" 
    variant="bordered" 
    color="purple" 
    fallback="SQ" 
    size="xl" 
  />
</div>
```

## Technical Details

### How Initials Are Generated

The component automatically extracts initials from the `fallback` text:
- Takes the first letter of each word
- Converts to uppercase
- Limits to 2 characters maximum

**Examples:**
- `"John Doe"` → `"JD"`
- `"Sarah"` → `"SA"`
- `"John Paul Smith"` → `"JP"`

### Compound Variants

The component uses `tailwind-variants` with compound variants to intelligently combine styles:

1. **Bordered + Color** - Automatically applies matching ring colors
2. **Bordered + Shape** - Ensures ring follows the avatar's border radius

This means you can freely combine variants without worrying about style conflicts.

### Image Loading Behavior

1. If `src` is provided, attempts to load the image
2. If image fails or is loading, shows fallback
3. Fallback priority:
   - Custom snippet (`customFallback`)
   - Generated initials (from `fallback` text)
   - Default user icon

## Accessibility

- Images include `alt` text for screen readers
- Fallback text is semantic and readable
- Proper ARIA attributes from underlying bits-ui components
- Color contrast meets WCAG guidelines

## Demo

Visit `/avatar-demo` for an interactive demonstration of all features.

## Component Structure

Built on top of [bits-ui Avatar](https://www.bits-ui.com/docs/components/avatar) primitive with enhanced functionality using `tailwind-variants` for flexible styling.
