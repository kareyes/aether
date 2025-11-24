<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Badge } from "$core/components/ui/badge";
  import { fn } from 'storybook/test';

  const { Story } = defineMeta({
    title: 'Components/Badge',
    component: Badge,
    tags: ['autodocs'],
    argTypes: {
      // Main props we want to control
      variant: {
        control: { type: 'select' },
        options: ['default', 'secondary', 'flat', 'outline', 'dashed'],
        description: 'Visual variant of the badge',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      color: {
        control: { type: 'select' },
        options: ['default', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'gray'],
        description: 'Color theme of the badge',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      size: {
        control: { type: 'select' },
        options: ['sm', 'default', 'lg'],
        description: 'Size of the badge',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      text: {
        control: { type: 'text' },
        description: 'Text content of the badge',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'undefined' },
        },
      },
      dismissable: {
        control: { type: 'boolean' },
        description: 'Whether the badge can be dismissed',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      clickable: {
        control: { type: 'boolean' },
        description: 'Whether the badge is clickable',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      href: {
        control: { type: 'text' },
        description: 'URL to link to (makes badge a link)',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'undefined' },
        },
      },
      
      // Hide unwanted props from controls
      class: {
        control: false,
        table: { disable: true },
      },
      ref: {
        control: false,
        table: { disable: true },
      },
      children: {
        control: false,
        table: { disable: true },
      },
      onclick: {
        control: false,
        table: { disable: true },
        description: 'Click handler (not controllable in Storybook)',
      },
      onDismiss: {
        control: false,
        table: { disable: true },
        description: 'Dismiss handler (not controllable in Storybook)',
      },
    },
    args: {
      onclick: fn(),
      onDismiss: fn(),
    },
    
    // Disable automatic prop extraction
    parameters: {
      docs: {
        extractArgTypes: false,
      },
    },
  });
</script>

<!-- Basic Variants -->
<Story name="Default" args={{ text: "Default" }} />
<Story name="Secondary" args={{ text: "Secondary", variant: "secondary" }} />
<Story name="Flat" args={{ text: "Flat", variant: "flat" }} />
<Story name="Outline" args={{ text: "Outline", variant: "outline" }} />
<Story name="Dashed" args={{ text: "Dashed", variant: "dashed" }} />

<!-- Color Variants -->
<Story name="Red Color" args={{ text: "Red", color: "red" }} />
<Story name="Blue Color" args={{ text: "Blue", color: "blue" }} />
<Story name="Green Color" args={{ text: "Green", color: "green" }} />
<Story name="Purple Color" args={{ text: "Purple", color: "purple" }} />
<Story name="Orange Color" args={{ text: "Orange", color: "orange" }} />

<!-- Variant + Color Combinations -->
<Story name="Default Red" args={{ text: "Default Red", variant: "default", color: "red" }} />
<Story name="Secondary Blue" args={{ text: "Secondary Blue", variant: "secondary", color: "blue" }} />
<Story name="Flat Green" args={{ text: "Flat Green", variant: "flat", color: "green" }} />
<Story name="Outline Purple" args={{ text: "Outline Purple", variant: "outline", color: "purple" }} />
<Story name="Dashed Orange" args={{ text: "Dashed Orange", variant: "dashed", color: "orange" }} />

<!-- More Combinations -->
<Story name="Default Blue" args={{ text: "Default Blue", variant: "default", color: "blue" }} />
<Story name="Secondary Red" args={{ text: "Secondary Red", variant: "secondary", color: "red" }} />
<Story name="Flat Purple" args={{ text: "Flat Purple", variant: "flat", color: "purple" }} />
<Story name="Outline Green" args={{ text: "Outline Green", variant: "outline", color: "green" }} />
<Story name="Dashed Pink" args={{ text: "Dashed Pink", variant: "dashed", color: "pink" }} />

<!-- Sizes -->
<Story name="Small" args={{ text: "Small", size: "sm" }} />
<Story name="Large" args={{ text: "Large", size: "lg" }} />

<!-- Interactive Features -->
<Story name="Clickable" args={{ 
  text: "Click me", 
  clickable: true,
  onclick: fn()
}} />

<Story name="Clickable Default Red" args={{ 
  text: "Click Red", 
  variant: "default",
  color: "red",
  clickable: true,
  onclick: fn()
}} />

<Story name="Clickable Secondary Blue" args={{ 
  text: "Click Blue", 
  variant: "secondary",
  color: "blue",
  clickable: true,
  onclick: fn()
}} />

<Story name="Clickable Flat Green" args={{ 
  text: "Click Green", 
  variant: "flat",
  color: "green",
  clickable: true,
  onclick: fn()
}} />

<Story name="Dismissable" args={{ 
  text: "Dismiss me", 
  dismissable: true,
  onDismiss: fn()
}} />

<Story name="Link Badge" args={{ 
  text: "Link", 
  href: "https://example.com",
  color: "blue"
}} />

<!-- Combined Features -->
<Story name="Clickable with Color" args={{ 
  text: "Clickable Purple", 
  color: "purple",
  clickable: true,
  onclick: fn()
}} />

<Story name="Large Dismissable" args={{ 
  text: "Large Dismissable", 
  size: "lg",
  variant: "secondary",
  dismissable: true,
  onDismiss: fn()
}} />

<!-- Status Examples with Colors -->
<Story name="Online Status" args={{ 
  text: "Online", 
  color: "green",
  size: "sm"
}} />

<Story name="Error Status" args={{ 
  text: "Error", 
  color: "red",
  size: "sm"
}} />

<Story name="Warning Status" args={{ 
  text: "Warning", 
  color: "yellow",
  size: "sm"
}} />

<Story name="Info Status" args={{ 
  text: "Info", 
  color: "blue",
  size: "sm"
}} />

<!-- Tag Examples -->
<Story name="Tag Red" args={{ 
  text: "Important", 
  color: "red",
  dismissable: true,
  onDismiss: fn()
}} />

<Story name="Tag Blue" args={{ 
  text: "Feature", 
  color: "blue",
  dismissable: true,
  onDismiss: fn()
}} />

<Story name="Tag Green" args={{ 
  text: "Bug Fix", 
  color: "green",
  dismissable: true,
  onDismiss: fn()
}} />

<!-- Custom Content -->
<Story name="Custom Content" args={{ variant: "outline" }}>
  📊 Analytics
</Story>

