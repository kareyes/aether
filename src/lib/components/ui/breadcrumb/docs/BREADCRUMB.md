# Breadcrumb Component

A flexible breadcrumb navigation component with multiple visual variants, sizes, and customizable separators built with Svelte 5.

## Features

- 🎨 **Multiple Variants**: Default, Solid, Subtle, Bold styles
- 📏 **3 Size Options**: Small, Default, Large
- 🔗 **Link Variants**: Default, Underline, Bold, Subtle
- ➡️ **4 Separator Styles**: Chevron, Slash, Dot, Arrow
- ♿ **Fully Accessible**: Proper ARIA attributes and semantic HTML
- 🎯 **Type-Safe**: Full TypeScript support
- 🎭 **Customizable**: Extensive styling options with Tailwind
- 🔄 **Reactive**: Svelte 5 runes for optimal performance

## Installation

```bash
pnpm dlx shadcn-svelte@latest add breadcrumb
```

## Implementation Details

The Breadcrumb component is built using **tailwind-variants** (tv) for a robust variant system:

### Component Architecture

#### BreadcrumbList Component
- Controls overall breadcrumb styling
- 4 visual variants (default, solid, subtle, bold)
- 3 size options (sm, default, lg)
- 3 spacing options (compact, default, relaxed)
- Exported types: `BreadcrumbListVariant`, `BreadcrumbListSize`, `BreadcrumbListSpacing`

#### BreadcrumbLink Component
- Interactive link styling
- 4 link variants (default, underline, bold, subtle)
- Hover transitions and effects
- Exported types: `BreadcrumbLinkVariant`

#### BreadcrumbSeparator Component
- 4 separator styles (chevron, slash, dot, arrow)
- Size control independent of list
- Custom separator support
- Exported types: `BreadcrumbSeparatorVariant`, `BreadcrumbSeparatorSize`

#### BreadcrumbPage Component
- Current page indicator
- 4 styling variants (default, bold, muted, accent)
- Non-interactive by design
- Exported types: `BreadcrumbPageVariant`

## Usage

### Basic Example

```svelte
<script lang="ts">
  import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage
  } from "$lib/components/ui/breadcrumb";
</script>

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## Variants

### List Variants

#### Default Variant
Standard muted text style.

```svelte
<BreadcrumbList variant="default">
  <!-- items -->
</BreadcrumbList>
```

#### Solid Variant
More prominent with foreground color.

```svelte
<BreadcrumbList variant="solid">
  <!-- items -->
</BreadcrumbList>
```

#### Subtle Variant
More subdued with reduced opacity.

```svelte
<BreadcrumbList variant="subtle">
  <!-- items -->
</BreadcrumbList>
```

#### Bold Variant
Emphasized with medium font weight.

```svelte
<BreadcrumbList variant="bold">
  <!-- items -->
</BreadcrumbList>
```

### Link Variants

#### Default Link
Simple hover effect.

```svelte
<BreadcrumbLink variant="default" href="/">Home</BreadcrumbLink>
```

#### Underline Link
Shows underline on hover.

```svelte
<BreadcrumbLink variant="underline" href="/">Home</BreadcrumbLink>
```

#### Bold Link
Medium font weight.

```svelte
<BreadcrumbLink variant="bold" href="/">Home</BreadcrumbLink>
```

#### Subtle Link
Subdued hover effect.

```svelte
<BreadcrumbLink variant="subtle" href="/">Home</BreadcrumbLink>
```

### Separator Variants

#### Chevron (Default)
Standard right-pointing chevron.

```svelte
<BreadcrumbSeparator variant="default" />
```

#### Slash
Forward slash separator.

```svelte
<BreadcrumbSeparator variant="slash" />
```

#### Dot
Small circular dot.

```svelte
<BreadcrumbSeparator variant="dot" />
```

#### Arrow
Right-pointing arrow.

```svelte
<BreadcrumbSeparator variant="arrow" />
```

#### Custom Separator
Provide your own content.

```svelte
<BreadcrumbSeparator>
  <span>→</span>
</BreadcrumbSeparator>
```

### Page Variants

#### Default Page
Normal text style.

```svelte
<BreadcrumbPage variant="default">Current Page</BreadcrumbPage>
```

#### Bold Page
Emphasized current page.

```svelte
<BreadcrumbPage variant="bold">Current Page</BreadcrumbPage>
```

#### Muted Page
Subdued current page.

```svelte
<BreadcrumbPage variant="muted">Current Page</BreadcrumbPage>
```

#### Accent Page
Primary color emphasis.

```svelte
<BreadcrumbPage variant="accent">Current Page</BreadcrumbPage>
```

## Sizes

### Small
Compact size for dense layouts.

```svelte
<BreadcrumbList size="sm">
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator size="sm" />
  <BreadcrumbItem>
    <BreadcrumbPage>Page</BreadcrumbPage>
  </BreadcrumbItem>
</BreadcrumbList>
```

### Default
Standard size for most use cases.

```svelte
<BreadcrumbList size="default">
  <!-- items -->
</BreadcrumbList>
```

### Large
Larger size for better visibility.

```svelte
<BreadcrumbList size="lg">
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator size="lg" />
  <BreadcrumbItem>
    <BreadcrumbPage>Page</BreadcrumbPage>
  </BreadcrumbItem>
</BreadcrumbList>
```

## Spacing

Control the gap between breadcrumb items.

```svelte
<!-- Compact spacing -->
<BreadcrumbList spacing="compact">
  <!-- items -->
</BreadcrumbList>

<!-- Default spacing -->
<BreadcrumbList spacing="default">
  <!-- items -->
</BreadcrumbList>

<!-- Relaxed spacing -->
<BreadcrumbList spacing="relaxed">
  <!-- items -->
</BreadcrumbList>
```

## With Icons

Enhance breadcrumbs with icons.

```svelte
<script>
  import { Home, Folder, File } from "@lucide/svelte";
</script>

<BreadcrumbList>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">
      <Home class="size-4" />
      <span>Home</span>
    </BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbLink href="/documents">
      <Folder class="size-4" />
      <span>Documents</span>
    </BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbPage>
      <File class="size-4" />
      <span>readme.md</span>
    </BreadcrumbPage>
  </BreadcrumbItem>
</BreadcrumbList>
```

## With Dropdown

Show collapsed items with a dropdown.

```svelte
<script>
  import { BreadcrumbEllipsis } from "$lib/components/ui/breadcrumb";
  import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
  } from "$lib/components/ui/dropdown-menu";
</script>

<BreadcrumbList>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BreadcrumbEllipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem href="/docs">Documentation</DropdownMenuItem>
        <DropdownMenuItem href="/themes">Themes</DropdownMenuItem>
        <DropdownMenuItem href="/examples">Examples</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
  </BreadcrumbItem>
</BreadcrumbList>
```

## API Reference

### Breadcrumb (Root)

The root breadcrumb container.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes |

### BreadcrumbList

Container for breadcrumb items.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "solid" \| "subtle" \| "bold"` | `"default"` | Visual style variant |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size of the breadcrumb list |
| `spacing` | `"compact" \| "default" \| "relaxed"` | `"default"` | Gap between items |
| `class` | `string` | - | Additional CSS classes |

### BreadcrumbItem

Individual breadcrumb item container.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes |

### BreadcrumbLink

Clickable breadcrumb link.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | - | Link destination |
| `variant` | `"default" \| "underline" \| "bold" \| "subtle"` | `"default"` | Visual style variant |
| `class` | `string` | - | Additional CSS classes |

### BreadcrumbPage

Current page indicator (non-interactive).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "bold" \| "muted" \| "accent"` | `"default"` | Visual style variant |
| `class` | `string` | - | Additional CSS classes |

### BreadcrumbSeparator

Visual separator between items.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "slash" \| "dot" \| "arrow"` | `"default"` | Separator icon style |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size of the separator icon |
| `class` | `string` | - | Additional CSS classes |

Can accept custom children to override the default separator icon.

### BreadcrumbEllipsis

Ellipsis indicator for collapsed items.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes |

## Advanced Examples

### Dynamic Breadcrumbs

```svelte
<script lang="ts">
  type PathSegment = {
    label: string;
    href?: string;
  };

  let segments: PathSegment[] = $state([
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Electronics", href: "/products/electronics" },
    { label: "Laptops" }
  ]);
</script>

<Breadcrumb>
  <BreadcrumbList>
    {#each segments as segment, i}
      <BreadcrumbItem>
        {#if segment.href}
          <BreadcrumbLink href={segment.href}>{segment.label}</BreadcrumbLink>
        {:else}
          <BreadcrumbPage>{segment.label}</BreadcrumbPage>
        {/if}
      </BreadcrumbItem>
      {#if i < segments.length - 1}
        <BreadcrumbSeparator />
      {/if}
    {/each}
  </BreadcrumbList>
</Breadcrumb>
```

### Responsive Breadcrumbs

```svelte
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    
    <!-- Hide on mobile, show on desktop -->
    <BreadcrumbItem class="hidden md:inline-flex">
      <BreadcrumbLink href="/products">Products</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator class="hidden md:inline-flex" />
    
    <BreadcrumbItem>
      <BreadcrumbPage>Current</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### Custom Link Component

Use with SvelteKit's enhanced links or custom routers.

```svelte
<script>
  import { goto } from "$app/navigation";
</script>

<BreadcrumbLink
  href="/custom"
  child={({ props }) => (
    <a {...props} data-sveltekit-preload-data>
      Custom Link
    </a>
  )}
/>
```

## Best Practices

### Variant Consistency

Keep variants consistent across the breadcrumb:

```svelte
<!-- ✅ Good -->
<BreadcrumbList variant="bold">
  <BreadcrumbLink variant="bold" href="/">Home</BreadcrumbLink>
</BreadcrumbList>

<!-- ⚠️ Mixed (intentional styling) -->
<BreadcrumbList variant="default">
  <BreadcrumbLink variant="bold" href="/">Home</BreadcrumbLink>
</BreadcrumbList>
```

### Size Consistency

Match separator sizes with list sizes:

```svelte
<!-- ✅ Good -->
<BreadcrumbList size="lg">
  <BreadcrumbSeparator size="lg" />
</BreadcrumbList>

<!-- ❌ Bad -->
<BreadcrumbList size="lg">
  <BreadcrumbSeparator size="sm" />
</BreadcrumbList>
```

### Accessible Labels

Always provide meaningful text:

```svelte
<!-- ✅ Good -->
<BreadcrumbLink href="/products">Products</BreadcrumbLink>

<!-- ❌ Bad -->
<BreadcrumbLink href="/p">P</BreadcrumbLink>
```

### Limit Depth

For deep hierarchies, consider collapsing:

```svelte
<!-- ✅ Good - Collapsed middle items -->
<BreadcrumbList>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbEllipsis />
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbPage>Current</BreadcrumbPage>
  </BreadcrumbItem>
</BreadcrumbList>
```

## Styling

### CSS Variables

The component uses the following CSS custom properties:

- `--foreground` - Default text color
- `--muted-foreground` - Muted text color
- `--primary` - Primary accent color
- `--border` - Border color

### Tailwind Classes

You can customize any component with Tailwind classes:

```svelte
<BreadcrumbList class="bg-muted p-2 rounded-lg">
  <BreadcrumbLink class="text-blue-600 hover:text-blue-800">
    Custom Link
  </BreadcrumbLink>
</BreadcrumbList>
```

## Accessibility

The Breadcrumb component provides:

- **Semantic HTML**: Uses `<nav>` with `aria-label="breadcrumb"`
- **Ordered List**: Proper `<ol>` structure for screen readers
- **ARIA Current**: `aria-current="page"` on current page
- **Hidden Separators**: Separators are `aria-hidden="true"`
- **Keyboard Navigation**: Standard link navigation with Tab key

### Screen Reader Support

The breadcrumb is announced as "breadcrumb navigation" and items are read in order. The current page is identified with "current page".

## Demo & Storybook

### Demo Page
Visit [/breadcrumb-demo](/breadcrumb-demo) for an interactive demonstration showcasing:
- All list variants (default, solid, subtle, bold)
- All link variants (default, underline, bold, subtle)
- All separator styles (chevron, slash, dot, arrow)
- Size options (sm, default, lg)
- Spacing options (compact, default, relaxed)
- Page variants (default, bold, muted, accent)
- With icons
- With dropdowns
- Dynamic breadcrumbs

### Storybook Stories
The component includes comprehensive Storybook stories at:
`src/lib/components/ui/breadcrumb/docs/breadcrumb.stories.svelte`

## Related Components

- [Button](../button) - For action items in breadcrumbs
- [DropdownMenu](../dropdown-menu) - For collapsed breadcrumb items
- [Link](../link) - Alternative navigation component

## Technical Implementation

### File Structure
```
breadcrumb/
├── index.ts                      # Exports and type definitions
├── breadcrumb.svelte            # Root container
├── breadcrumb-list.svelte       # List with variants
├── breadcrumb-item.svelte       # Item container
├── breadcrumb-link.svelte       # Interactive link
├── breadcrumb-page.svelte       # Current page indicator
├── breadcrumb-separator.svelte  # Visual separator
├── breadcrumb-ellipsis.svelte   # Collapse indicator
├── BREADCRUMB.md                # This documentation
└── docs/
    └── breadcrumb.stories.svelte # Storybook stories
```

### Type Exports
All variant types are properly exported for TypeScript users:
- `BreadcrumbListVariant`, `BreadcrumbListSize`, `BreadcrumbListSpacing`
- `BreadcrumbLinkVariant`
- `BreadcrumbSeparatorVariant`, `BreadcrumbSeparatorSize`
- `BreadcrumbPageVariant`

## Changelog

### Version 1.0.0 (January 2026)
- Initial release with comprehensive variant system
- 4 list variants (default, solid, subtle, bold)
- 4 link variants (default, underline, bold, subtle)
- 4 separator styles (chevron, slash, dot, arrow)
- 4 page variants (default, bold, muted, accent)
- 3 size options (sm, default, lg)
- 3 spacing options (compact, default, relaxed)
- Full TypeScript support with exported types
- Comprehensive documentation and examples
- Storybook integration
- Demo page with all features
- Built with Svelte 5 runes
- Uses tailwind-variants (tv) for variant management
- Full accessibility with ARIA support
