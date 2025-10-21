<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
	import  Checkbox  from "./checkbox.svelte";
  import { fn } from 'storybook/test';

  const { Story } = defineMeta({
    title: 'Components/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    argTypes: {
      size: {
        control: { type: 'select' },
        options: ['sm', 'default', 'lg', 'xl'],
      },
      variant: {
        control: { type: 'select' },
        options: ['default', 'destructive', 'success', 'warning'],
      },
      checked: {
        control: { type: 'boolean' },
      },
      indeterminate: {
        control: { type: 'boolean' },
      },
      lineThrough: {
        control: { type: 'boolean' },
      },
      disabled: {
        control: { type: 'boolean' },
      },
    },
    args: {
      checked: false,
      indeterminate: false,
      lineThrough: false,
      disabled: false,
    }
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

<!-- Line Through -->
<Story name="Line Through Unchecked" args={{ 
  lineThrough: true,
  label: 'Task to complete',
  description: 'This will be crossed out when checked'
}} />
<Story name="Line Through Checked" args={{ 
  checked: true,
  lineThrough: true,
  label: 'Completed task',
  description: 'This text is crossed out'
}} />

<!-- Disabled States -->
<Story name="Disabled Unchecked" args={{ 
  disabled: true,
  label: 'Disabled checkbox',
  description: 'This checkbox is disabled'
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