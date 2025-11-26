# Card Component

A versatile card component with multiple variants, padding options, and interactive states for displaying grouped content with headers, descriptions, and actions.

## Features

- ✅ **Multiple Variants**: default, outline, ghost, elevated, filled
- ✅ **Flexible Padding**: none, sm, default, lg for different content densities
- ✅ **Interactive States**: hover effects and clickable cards
- ✅ **Composable Structure**: Support for headers, footers, and actions
- ✅ **Slot-based Content**: Maximum flexibility with snippet slots
- ✅ **TypeScript Support**: Complete type definitions
- ✅ **Accessibility**: Proper semantic HTML structure

## Basic Usage

### Simple Card
```svelte
<script>
  import * as Card from "$core/components/ui/card";
</script>

<Card title="Card Title" description="Card description">
  <p>Your card content goes here.</p>
</Card>
```

### Card with Variants
```svelte
<Card variant="default" title="Default Card">
  <p>Standard card with border and shadow.</p>
</Card>

<Card variant="outline" title="Outline Card">
  <p>Card with emphasized border.</p>
</Card>

<Card variant="ghost" title="Ghost Card">
  <p>Minimal card without border or shadow.</p>
</Card>

<Card variant="elevated" title="Elevated Card">
  <p>Card with enhanced shadow for depth.</p>
</Card>

<Card variant="filled" title="Filled Card">
  <p>Card with filled background.</p>
</Card>
```

## Interactive Features

### Hover Effects
```svelte
<Card 
  title="Hover Card" 
  description="Hover to see effect"
  hover={true}
>
  <p>This card responds to hover with enhanced shadow and border color.</p>
</Card>
```

### Interactive/Clickable Cards
```svelte
<script>
  function handleCardClick() {
    alert('Card clicked!');
  }
</script>

<Card 
  title="Interactive Card" 
  description="This card is clickable"
  interactive={true}
  onclick={handleCardClick}
>
  <p>Click anywhere on this card to trigger an action.</p>
</Card>
```

## Advanced Features

### Card with Header Actions
```svelte
<script>
  import { Button } from "$core/components/ui/button";
</script>

<Card title="Edit Profile" description="Update your information">
  {#snippet headerAction()}
    <Button variant="ghost" size="sm">Edit</Button>
  {/snippet}
  
  <p>Profile content goes here.</p>
</Card>
```

### Card with Footer
```svelte
<script>
  import { Button } from "$core/components/ui/button";
</script>

<Card title="Confirm Action" description="This requires confirmation">
  <p>Are you sure you want to proceed?</p>
  
  {#snippet footer()}
    <Button variant="outline" size="sm">Cancel</Button>
    <Button variant="destructive" size="sm">Confirm</Button>
  {/snippet}
</Card>
```

### Complex Card with Header and Footer
```svelte
<script>
  import { Button } from "$core/components/ui/button";
  import { Badge } from "$core/components/ui/badge";
  import * as Field from "$core/components/ui/field";
  import { Input } from "$core/components/ui/input";
</script>

<Card 
  title="Subscription Plan" 
  description="Manage your subscription"
  variant="elevated"
  hover={true}
>
  {#snippet headerAction()}
    <Badge>Active</Badge>
  {/snippet}
  
  <Field.Impl label="Plan">
    <Input value="Pro Plan" />
  </Field.Impl>
  
  {#snippet footer()}
    <div class="flex-1 text-xs text-muted-foreground">
      Next billing: Dec 1, 2025
    </div>
    <Button variant="outline" size="sm">Cancel</Button>
    <Button size="sm">Upgrade</Button>
  {/snippet}
</Card>
```

## Variants

Available variants with their use cases:

| Variant | Use Case | Example |
|---------|----------|---------|
| `default` | Standard cards | General content containers |
| `outline` | Emphasized borders | Important sections |
| `ghost` | Minimal styling | Subtle grouping |
| `elevated` | Enhanced depth | Featured content |
| `filled` | Background fill | Secondary sections |

## Padding Options

| Padding | Size | Use Case |
|---------|------|----------|
| `none` | 0 | Full-bleed content, custom padding |
| `sm` | p-4 | Compact cards |
| `default` | p-6 | Standard spacing |
| `lg` | p-8 | Spacious layouts |

## Interactive States

| State | Effect | Use Case |
|-------|--------|----------|
| `hover` | Shadow & border animation | Indicate interactivity |
| `interactive` | Cursor, scale, shadow | Full clickable cards |

## Component API

### Card Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | Card title text |
| `description` | `string` | `undefined` | Card description/subtitle |
| `variant` | `CardVariant` | `'default'` | Visual style variant |
| `padding` | `CardPadding` | `'default'` | Internal padding size |
| `hover` | `boolean` | `false` | Enable hover effects |
| `interactive` | `boolean` | `false` | Enable interactive/clickable state |
| `class` | `string` | `undefined` | Additional CSS classes |
| `children` | `Snippet` | Required | Main card content |
| `headerAction` | `Snippet` | `undefined` | Header action content |
| `footer` | `Snippet` | `undefined` | Footer content |

### Using Native Card Components

For more control, you can use the native card components:

```svelte
<script>
  import * as Card from "$core/components/ui/card";
</script>

<Card.Root class="border rounded-xl shadow-sm">
  <Card.Header>
    <Card.Title>Custom Card</Card.Title>
    <Card.Description>Using native components</Card.Description>
    <Card.Action>
      <button>Action</button>
    </Card.Action>
  </Card.Header>
  
  <Card.Content>
    <p>Your content here</p>
  </Card.Content>
  
  <Card.Footer>
    <button>Footer Action</button>
  </Card.Footer>
</Card.Root>
```

## Examples

### Settings Card
```svelte
<Card 
  title="Notification Settings" 
  description="Manage your notification preferences"
>
  <Field.Impl label="Email notifications" orientation="horizontal">
    <Switch id="email" />
  </Field.Impl>
  <Field.Impl label="Push notifications" orientation="horizontal">
    <Switch id="push" />
  </Field.Impl>
</Card>
```

### Stats Card
```svelte
<Card variant="elevated" padding="lg">
  <div class="text-center">
    <p class="text-sm text-muted-foreground">Total Users</p>
    <p class="text-4xl font-bold mt-2">12,345</p>
    <p class="text-xs text-green-600 mt-1">↑ 12% from last month</p>
  </div>
</Card>
```

### Product Card
```svelte
<Card 
  title="Premium Plan" 
  description="Best for teams"
  variant="outline"
  interactive={true}
>
  <div class="space-y-2">
    <p class="text-3xl font-bold">$29/month</p>
    <ul class="space-y-1 text-sm">
      <li>✓ Unlimited projects</li>
      <li>✓ Advanced analytics</li>
      <li>✓ Priority support</li>
    </ul>
  </div>
  
  {#snippet footer()}
    <Button class="w-full">Get Started</Button>
  {/snippet}
</Card>
```

## Styling Notes

- Cards use the `bg-card` and `text-card-foreground` color tokens for theming
- The `rounded-xl` class provides consistent border radius
- Shadow utilities create depth hierarchy
- All variants support dark mode through color tokens

## Accessibility

- Cards use semantic HTML structure
- Interactive cards have proper cursor styles
- Header actions are positioned for easy interaction
- Footer buttons maintain proper focus order
