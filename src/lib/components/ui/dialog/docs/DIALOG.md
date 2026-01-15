# Dialog Component

A modal dialog component for displaying content that requires user interaction or attention, built with Svelte 5 and bits-ui.

## Features

- 🎯 **Multiple Sizes**: sm, default, lg, xl, full - flexible sizing options
- 🎨 **Variants**: Default and centered layout variants
- ✨ **Smooth Animations**: Fade and zoom transitions
- ♿ **Fully Accessible**: Keyboard navigation, focus management, ARIA attributes
- 🔒 **Focus Trapping**: Keeps focus within the dialog when open
- 🎭 **Overlay Backdrop**: Semi-transparent overlay with click-to-close
- 🎯 **Type-Safe**: Full TypeScript support with Svelte 5 runes
- 🔄 **Reactive**: Built with Svelte 5's modern reactivity system
- 🎛️ **Customizable**: Optional close button and flexible content

## Installation

```bash
pnpm dlx shadcn-svelte@latest add dialog
```

## Implementation Details

The Dialog component is built on top of bits-ui's Dialog primitive, providing a flexible modal system with variants for different use cases.

### Component Architecture

#### Dialog (Root)
- Root component that manages open/close state
- Controls the overall dialog behavior
- Uses bits-ui Dialog primitive

#### DialogTrigger
- Button or element that opens the dialog
- Automatically manages ARIA attributes

#### DialogContent
- Main content container with size and variant options
- Includes close button by default (can be hidden)
- Smooth fade and zoom animations
- 5 size variants: `sm`, `default`, `lg`, `xl`, `full`
- 2 layout variants: `default`, `centered`

#### DialogOverlay
- Semi-transparent backdrop
- Click to close functionality
- Fade in/out animations

#### DialogHeader
- Optional header section for title and description
- Responsive text alignment (centered on mobile, left on desktop)
- Can be centered with `variant="centered"`

#### DialogFooter
- Optional footer section for actions
- Flexbox layout for button groups
- Responsive layout (stacked on mobile, row on desktop)

#### DialogTitle
- Accessible title for the dialog
- Connected to ARIA label

#### DialogDescription
- Optional description text
- Connected to ARIA description

#### DialogClose
- Close button component
- Can be placed anywhere within the dialog

#### DialogPortal
- Portal component for rendering dialog in a different DOM location
- Used internally by DialogContent

## Usage

### Basic Example

```svelte
<script lang="ts">
  import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogClose
  } from "$lib/components/ui/dialog";
  import { Button } from "$lib/components/ui/button";
</script>

<Dialog>
  <DialogTrigger>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <div class="py-4">
      <!-- Your content here -->
    </div>
    <DialogFooter>
      <DialogClose>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button>Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Controlled State

```svelte
<script lang="ts">
  import { Dialog, DialogContent, DialogTrigger } from "$lib/components/ui/dialog";
  import { Button } from "$lib/components/ui/button";

  let open = $state(false);

  function handleSubmit() {
    // Do something
    open = false;
  }
</script>

<Dialog bind:open>
  <DialogTrigger>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <form onsubmit={handleSubmit}>
      <!-- Form content -->
    </form>
  </DialogContent>
</Dialog>

<Button onclick={() => open = true}>
  Open from anywhere
</Button>
```

## Sizes

### Small Dialog

```svelte
<DialogContent size="sm">
  <DialogHeader>
    <DialogTitle>Small Dialog</DialogTitle>
    <DialogDescription>This is a small dialog, perfect for simple confirmations.</DialogDescription>
  </DialogHeader>
</DialogContent>
```

### Default Size (Default)

```svelte
<DialogContent size="default">
  <DialogHeader>
    <DialogTitle>Default Dialog</DialogTitle>
    <DialogDescription>This is the default size dialog.</DialogDescription>
  </DialogHeader>
</DialogContent>
```

### Large Dialog

```svelte
<DialogContent size="lg">
  <DialogHeader>
    <DialogTitle>Large Dialog</DialogTitle>
    <DialogDescription>
      This is a large dialog with more space for detailed content.
    </DialogDescription>
  </DialogHeader>
</DialogContent>
```

### Extra Large Dialog

```svelte
<DialogContent size="xl">
  <DialogHeader>
    <DialogTitle>Extra Large Dialog</DialogTitle>
    <DialogDescription>
      This is an extra large dialog for content that needs maximum space.
    </DialogDescription>
  </DialogHeader>
</DialogContent>
```

### Full Width Dialog

```svelte
<DialogContent size="full">
  <DialogHeader>
    <DialogTitle>Full Width Dialog</DialogTitle>
    <DialogDescription>
      This dialog takes up almost the full viewport width (90vw on desktop).
    </DialogDescription>
  </DialogHeader>
</DialogContent>
```

## Variants

### Default Variant

Standard left-aligned layout on desktop, centered on mobile.

```svelte
<DialogContent variant="default">
  <DialogHeader>
    <DialogTitle>Default Layout</DialogTitle>
    <DialogDescription>Left-aligned on desktop, centered on mobile.</DialogDescription>
  </DialogHeader>
  <DialogFooter>
    <Button>Action</Button>
  </DialogFooter>
</DialogContent>
```

### Centered Variant

Centered layout for both mobile and desktop.

```svelte
<DialogContent variant="centered">
  <DialogHeader>
    <DialogTitle>Centered Layout</DialogTitle>
    <DialogDescription>Content is centered on all screen sizes.</DialogDescription>
  </DialogHeader>
  <DialogFooter>
    <Button>Action</Button>
  </DialogFooter>
</DialogContent>
```

## Advanced Examples

### Form in Dialog

```svelte
<script lang="ts">
  import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
  } from "$lib/components/ui/dialog";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";

  let name = $state("");
  let email = $state("");

  function handleSave() {
    console.log({ name, email });
  }
</script>

<Dialog>
  <DialogTrigger>
    <Button>Edit Profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="name" class="text-end">Name</Label>
        <Input id="name" bind:value={name} class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="email" class="text-end">Email</Label>
        <Input id="email" type="email" bind:value={email} class="col-span-3" />
      </div>
    </div>
    <DialogFooter>
      <DialogClose>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button onclick={handleSave}>Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Confirmation Dialog

```svelte
<script lang="ts">
  import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
  } from "$lib/components/ui/dialog";
  import { Button } from "$lib/components/ui/button";
  import { Trash2 } from "@lucide/svelte";

  function handleDelete() {
    console.log("Item deleted");
  }
</script>

<Dialog>
  <DialogTrigger>
    <Button variant="destructive">
      <Trash2 class="size-4 mr-2" />
      Delete
    </Button>
  </DialogTrigger>
  <DialogContent size="sm" variant="centered">
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete the item.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button variant="destructive" onclick={handleDelete}>
        Delete
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Content Dialog with Tabs

```svelte
<script lang="ts">
  import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
  } from "$lib/components/ui/dialog";
  import { Button } from "$lib/components/ui/button";
  import { Tabs, TabsList, TabsTrigger, TabsContent } from "$lib/components/ui/tabs";
  import { Settings } from "@lucide/svelte";
</script>

<Dialog>
  <DialogTrigger>
    <Button variant="outline">
      <Settings class="mr-2 size-4" />
      Settings
    </Button>
  </DialogTrigger>
  <DialogContent size="lg">
    <DialogHeader>
      <DialogTitle>Settings</DialogTitle>
      <DialogDescription>
        Manage your account settings and preferences.
      </DialogDescription>
    </DialogHeader>
    <Tabs value="account" class="py-4">
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div class="space-y-4 py-4">
          <p class="text-sm text-muted-foreground">
            Account settings content
          </p>
        </div>
      </TabsContent>
      <TabsContent value="security">
        <div class="space-y-4 py-4">
          <p class="text-sm text-muted-foreground">
            Security settings content
          </p>
        </div>
      </TabsContent>
    </Tabs>
  </DialogContent>
</Dialog>
```

### Without Close Button

```svelte
<DialogContent showCloseButton={false}>
  <DialogHeader>
    <DialogTitle>Important Action</DialogTitle>
    <DialogDescription>
      This requires your attention. You must choose an action.
    </DialogDescription>
  </DialogHeader>
  <div class="py-4">
    <!-- Content -->
  </div>
  <DialogFooter>
    <DialogClose>
      <Button>Confirm</Button>
    </DialogClose>
  </DialogFooter>
</DialogContent>
```

### Custom Width

```svelte
<DialogContent class="sm:max-w-[425px]">
  <DialogHeader>
    <DialogTitle>Custom Width</DialogTitle>
    <DialogDescription>
      This dialog has a custom maximum width.
    </DialogDescription>
  </DialogHeader>
  <!-- Content -->
</DialogContent>
```

### Scrollable Content

```svelte
<DialogContent size="lg">
  <DialogHeader>
    <DialogTitle>Long Content</DialogTitle>
    <DialogDescription>
      This dialog contains scrollable content.
    </DialogDescription>
  </DialogHeader>
  <div class="max-h-[400px] overflow-y-auto py-4">
    <!-- Long content that scrolls -->
    {#each Array(20) as _, i}
      <p class="mb-4">Content item {i + 1}</p>
    {/each}
  </div>
  <DialogFooter>
    <Button>Close</Button>
  </DialogFooter>
</DialogContent>
```

## API Reference

### Dialog (Root)

Root component that manages the dialog state.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Controls the open state (bindable) |
| `onOpenChange` | `(open: boolean) => void` | - | Callback when open state changes |
| `openFocus` | `FocusProp` | - | Element to focus when opening |
| `closeFocus` | `FocusProp` | - | Element to focus when closing |
| `portal` | `HTMLElement \| string` | `body` | Portal target for the dialog |

### DialogTrigger

Button that opens the dialog.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ref` | `HTMLButtonElement` | - | Button element reference (bindable) |
| `class` | `string` | - | Additional CSS classes |
| `children` | `Snippet` | - | Trigger content |

### DialogContent

Main content container for the dialog.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "default" \| "lg" \| "xl" \| "full"` | `"default"` | Size of the dialog |
| `variant` | `"default" \| "centered"` | `"default"` | Layout variant |
| `ref` | `HTMLDivElement` | - | Content element reference (bindable) |
| `class` | `string` | - | Additional CSS classes |
| `showCloseButton` | `boolean` | `true` | Show/hide the close button |
| `portalProps` | `object` | - | Props for the portal component |
| `children` | `Snippet` | - | Content to display |

### DialogOverlay

Semi-transparent backdrop behind the dialog.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ref` | `HTMLDivElement` | - | Overlay element reference (bindable) |
| `class` | `string` | - | Additional CSS classes |

### DialogHeader

Container for the dialog header (title and description).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes |
| `children` | `Snippet` | - | Header content |

### DialogFooter

Container for the dialog footer (action buttons).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes |
| `children` | `Snippet` | - | Footer content |

### DialogTitle

Accessible title for the dialog.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ref` | `HTMLHeadingElement` | - | Title element reference (bindable) |
| `class` | `string` | - | Additional CSS classes |
| `children` | `Snippet` | - | Title text |

### DialogDescription

Description text for the dialog.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ref` | `HTMLParagraphElement` | - | Description element reference (bindable) |
| `class` | `string` | - | Additional CSS classes |
| `children` | `Snippet` | - | Description text |

### DialogClose

Button to close the dialog.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ref` | `HTMLButtonElement` | - | Button element reference (bindable) |
| `class` | `string` | - | Additional CSS classes |
| `children` | `Snippet` | - | Button content |

## Accessibility

The Dialog component follows WAI-ARIA dialog pattern:

- **Keyboard Navigation**:
  - `Escape` - Close the dialog
  - `Tab` - Move focus forward within dialog
  - `Shift + Tab` - Move focus backward within dialog

- **Focus Management**:
  - Focus is trapped within the dialog when open
  - First focusable element receives focus when opened
  - Focus returns to trigger element when closed

- **ARIA Attributes**:
  - `role="dialog"` on dialog content
  - `aria-labelledby` connects to DialogTitle
  - `aria-describedby` connects to DialogDescription
  - `aria-modal="true"` indicates modal behavior

- **Screen Readers**:
  - Dialog opening/closing is announced
  - All interactive elements are accessible
  - Proper semantic HTML structure

## Best Practices

1. **Always include a title** - Use DialogTitle for accessibility
2. **Provide descriptions** - Use DialogDescription to explain the dialog's purpose
3. **Keep content focused** - Dialogs should have a single, clear purpose
4. **Choose appropriate size** - Use smaller sizes for confirmations, larger for forms
5. **Manage state carefully** - Use controlled state for complex interactions
6. **Avoid nesting** - Don't open dialogs within dialogs
7. **Mobile considerations** - Test on mobile devices, ensure content is scrollable
8. **Close actions** - Provide clear ways to close (DialogClose, footer buttons)

## Common Use Cases

- **Confirmation dialogs** - Get user confirmation for actions (sm/default size)
- **Forms** - Edit/create forms with multiple inputs (lg/xl size)
- **Content display** - Show detailed information (lg/xl size)
- **Settings** - Application configuration (lg size)
- **Alerts** - Important messages requiring acknowledgment (sm/default size, centered)
- **Multi-step flows** - Wizards or step-by-step processes (lg/xl size)

## Demo & Storybook

- **Demo Page**: `/dialog-demo` - Comprehensive examples and use cases
- **Storybook**: `Components/Dialog` - Interactive component playground

## Technical Implementation

### Variant System

The Dialog component uses tailwind-variants for the size and variant system:

```typescript
export const dialogVariants = tv({
  slots: {
    overlay: ["..."],
    content: ["..."],
    header: ["..."],
    footer: ["..."],
    title: ["..."],
    description: ["..."],
    closeButton: ["..."],
  },
  variants: {
    size: {
      sm: { content: "max-w-[calc(100%-2rem)] sm:max-w-sm" },
      default: { content: "max-w-[calc(100%-2rem)] sm:max-w-lg" },
      lg: { content: "max-w-[calc(100%-2rem)] sm:max-w-2xl" },
      xl: { content: "max-w-[calc(100%-2rem)] sm:max-w-4xl" },
      full: { content: "max-w-[calc(100%-2rem)] sm:max-w-[90vw]" },
    },
    variant: {
      default: {},
      centered: {
        header: "text-center",
        footer: "justify-center sm:justify-center",
      },
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
  }
});
```

### Animation System

Animations are handled through Tailwind's data-attribute animation utilities:
- Fade in/out animations for overlay and content
- Zoom in/out for content appearance
- Slide animations for smooth positioning
- Configurable duration (200ms)

## Changelog

### v1.0.0
- Initial implementation with bits-ui Dialog primitive
- 5 size options (sm, default, lg, xl, full)
- 2 layout variants (default, centered)
- Smooth fade and zoom animations
- Full accessibility support
- Comprehensive documentation and examples
