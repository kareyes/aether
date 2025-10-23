<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
	import  Checkbox  from "./checkbox.svelte";
  import { fn } from 'storybook/test';

  const { Story } = defineMeta({
    title: 'Components/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    argTypes: {
      // Main props we want to control
      size: {
        control: { type: 'select' },
        options: ['sm', 'default', 'lg', 'xl'],
        description: 'Size of the checkbox',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      variant: {
        control: { type: 'select' },
        options: ['default', 'destructive', 'success', 'warning'],
        description: 'Visual variant of the checkbox',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      checked: {
        control: { type: 'boolean' },
        description: 'Whether the checkbox is checked',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      indeterminate: {
        control: { type: 'boolean' },
        description: 'Whether the checkbox is in indeterminate state',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      lineThrough: {
        control: { type: 'boolean' },
        description: 'Whether to apply line-through style when checked',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Whether the checkbox is disabled',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      label: {
        control: { type: 'text' },
        description: 'Label text for the checkbox',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'undefined' },
        },
      },
      description: {
        control: { type: 'text' },
        description: 'Description text below the label',
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
      id: {
        control: false,
        table: { disable: true },
      },
      name: {
        control: false,
        table: { disable: true },
      },
      value: {
        control: false,
        table: { disable: true },
      },
      required: {
        control: false,
        table: { disable: true },
      },
      onCheckedChange: {
        control: false,
        table: { disable: true },
      },
      // Hide any other internal props
      children: {
        control: false,
        table: { disable: true },
      },
    },
    args: {
      checked: false,
      indeterminate: false,
      lineThrough: false,
      disabled: false,
      size: 'default',
      variant: 'default',
      label: undefined,
      description: undefined,
    },
    
    parameters: {
      docs: {
        extractArgTypes: false, // Disable automatic prop extraction
      },
    },
  });
</script>

<!-- Basic States -->
<Story name="Default" args={{ }} />
<Story name="Checked" args={{ checked: true }} />
<Story name="Indeterminate" args={{ indeterminate: true }} />

<!-- With Labels -->
<Story name="With Label" args={{ label: "Accept terms and conditions" }} />
<Story name="With Description" args={{ 
  label: "Enable notifications", 
  description: "Get notified about updates and new features" 
}} />

<!-- Sizes -->
<Story name="Small" args={{ size: 'sm', label: 'Small checkbox' }} />
<Story name="Large" args={{ size: 'lg', label: 'Large checkbox' }} />
<Story name="Extra Large" args={{ size: 'xl', label: 'Extra large checkbox' }} />

<!-- Variants -->
<Story name="Destructive" args={{ 
  variant: 'destructive', 
  label: 'Delete all data',
  description: 'This action cannot be undone'
}} />
<Story name="Success" args={{ 
  variant: 'success', 
  label: 'Mark as completed',
  description: 'This will mark the task as done'
}} />
<Story name="Warning" args={{ 
  variant: 'warning', 
  label: 'Proceed with caution',
  description: 'This action requires attention'
}} />


<Story name="Line Through Checked" args={{ 
  checked: true,
  lineThrough: true,
  label: 'Completed task',
  description: 'This text is crossed out'
}} />


<Story name="Disabled Checked" args={{ 
  checked: true,
  disabled: true,
  label: 'Disabled checked',
  description: 'This checkbox is disabled and checked'
}} />

<!-- Complex Example -->
<Story name="Todo Item" args={{ 
  size: 'default',
  lineThrough: true,
  label: 'Complete project documentation',
  description: 'Write comprehensive docs for all components'
}} />