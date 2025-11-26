<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
	import { CheckboxGroup } from "$core/components/ui/checkbox";
  import { fn } from 'storybook/test';

  const basicOptions = [
    { id: "1", label: "Option 1", value: "option1" },
    { id: "2", label: "Option 2", value: "option2" },
    { id: "3", label: "Option 3", value: "option3" },
  ];

  const skillsOptions = [
    { id: "js", label: "JavaScript", value: "javascript", description: "ES6+ and modern JS frameworks" },
    { id: "ts", label: "TypeScript", value: "typescript", description: "Strongly typed JavaScript" },
    { id: "svelte", label: "Svelte", value: "svelte", description: "Modern reactive framework" },
    { id: "react", label: "React", value: "react", description: "Popular UI library" },
  ];

  const todoOptions = [
    { id: "task1", label: "Set up development environment", value: "task1" },
    { id: "task2", label: "Create component library", value: "task2" },
    { id: "task3", label: "Write documentation", value: "task3" },
  ];

  const { Story } = defineMeta({
    title: 'Components/Checkbox/Group',
    component: CheckboxGroup,
    tags: ['autodocs'],
    argTypes: {
      // Main props we want to control
      orientation: {
        control: { type: 'select' },
        options: ['vertical', 'horizontal'],
        description: 'Layout orientation of the checkbox group',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'vertical' },
        },
      },
      size: {
        control: { type: 'select' },
        options: ['sm', 'default', 'lg'],
        description: 'Size of the group text',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      checkboxSize: {
        control: { type: 'select' },
        options: ['sm', 'default', 'lg', 'xl'],
        description: 'Size of individual checkboxes',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
        },
      },
      variant: {
        control: { type: 'select' },
        options: ['default', 'destructive', 'success', 'warning'],
        description: 'Visual variant of the checkboxes',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'default' },
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
        description: 'Whether the entire group is disabled',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      required: {
        control: { type: 'boolean' },
        description: 'Whether the field is required',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      label: {
        control: { type: 'text' },
        description: 'Label for the checkbox group',
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
      options: {
        control: false,
        table: { disable: true },
        description: 'Array of checkbox options (not controllable in Storybook)',
      },
      values: {
        control: false,
        table: { disable: true },
        description: 'Selected values array (not controllable in Storybook)',
      },
      onValuesChange: {
        control: false,
        table: { disable: true },
      },
      class: {
        control: false,
        table: { disable: true },
      },
    },
    args: {

      options: basicOptions,
      values: [],
      onValuesChange: fn(),
    },
    
    // Disable automatic prop extraction
    parameters: {
      docs: {
        extractArgTypes: false,
      },
    },
  });
</script>

<!-- Basic Examples -->
<Story name="Default" args={{ 
  options: basicOptions,
  label: "Choose your options"
}} />

<Story name="With Description" args={{ 
  options: basicOptions,
  label: "Choose your options",
  description: "Select one or more options from the list"
}} />

<Story name="With Values Selected" args={{ 
  options: basicOptions,
  values: ["option1", "option3"],
  label: "Pre-selected options"
}} />

<!-- Orientations -->
<Story name="Horizontal" args={{ 
  options: basicOptions,
  orientation: "horizontal",
  label: "Horizontal layout"
}} />

<!-- With Descriptions -->
<Story name="Options with Descriptions" args={{ 
  options: skillsOptions,
  label: "Technical Skills",
  description: "Select the technologies you're proficient in",
  values: ["javascript", "svelte"]
}} />

<!-- Sizes -->
<Story name="Small Checkboxes" args={{ 
  options: basicOptions,
  checkboxSize: "sm",
  label: "Small checkboxes"
}} />

<Story name="Large Checkboxes" args={{ 
  options: basicOptions,
  checkboxSize: "xl",
  label: "Extra large checkboxes"
}} />

<!-- Variants -->
<Story name="Success Variant" args={{ 
  options: todoOptions,
  variant: "success",
  lineThrough: true,
  label: "Project Tasks",
  description: "Track your progress",
  values: ["task1"]
}} />

<Story name="Warning Variant" args={{ 
  options: [
    { id: "warn1", label: "Proceed with caution", value: "warn1" },
    { id: "warn2", label: "Delete temporary files", value: "warn2" },
  ],
  variant: "warning",
  label: "Warning actions"
}} />

<Story name="Destructive Variant" args={{ 
  options: [
    { id: "del1", label: "Delete account", value: "del1" },
    { id: "del2", label: "Remove all data", value: "del2" },
  ],
  variant: "destructive",
  label: "Destructive actions"
}} />

<!-- States -->
<Story name="Required Field" args={{ 
  options: [
    { id: "terms", label: "I accept the terms and conditions", value: "terms" },
    { id: "privacy", label: "I accept the privacy policy", value: "privacy" },
  ],
  label: "Legal Agreement",
  description: "You must accept both agreements to continue",
  required: true,
  variant: "destructive"
}} />

<Story name="Disabled Group" args={{ 
  options: basicOptions,
  values: ["option1"],
  label: "Disabled Group",
  description: "This entire group is disabled",
  disabled: true
}} />

<Story name="Line Through (Todo List)" args={{ 
  options: todoOptions,
  lineThrough: true,
  label: "Todo List",
  description: "Completed items will be crossed out",
  values: ["task1", "task3"]
}} />

<!-- Complex Example -->
<Story name="Settings Panel" args={{ 
  options: [
    { id: "notifications", label: "Enable notifications", value: "notifications", description: "Receive app notifications" },
    { id: "darkmode", label: "Dark mode", value: "darkmode", description: "Use dark theme" },
    { id: "analytics", label: "Usage analytics", value: "analytics", description: "Help improve our product" },
  ],
  label: "App Settings",
  description: "Customize your app experience",
  values: ["notifications"]
}} />