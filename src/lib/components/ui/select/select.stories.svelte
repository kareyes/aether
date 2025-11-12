<script lang="ts" context="module">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Select } from './index';

  const { Story } = defineMeta({
    title: 'Components/Select',
    component: Select,
     tags: ['autodocs'],
    parameters: {
      docs: {
        extractArgTypes: false,
      },
    },
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['default', 'ghost', 'outline', 'filled', 'underline'],
        description: 'The visual variant of the select',
      },
      size: {
        control: { type: 'select' },
        options: ['sm', 'default', 'lg'],
        description: 'The size of the select',
      },
      multiple: {
        control: { type: 'boolean' },
        description: 'Whether multiple selections are allowed',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Whether the select is disabled',
      },
      required: {
        control: { type: 'boolean' },
        description: 'Whether the select is required',
      },
      placeholder: {
        control: { type: 'text' },
        description: 'Placeholder text when no option is selected',
      },
    },
    args: {
      variant: 'default',
      size: 'default',
      multiple: false,
      disabled: false,
      required: false,
      placeholder: 'Select an option...'
    }
  });

  const fruits = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape" },
    { value: "strawberry", label: "Strawberry" }
  ];

  const frameworks = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "svelte", label: "Svelte" },
    { value: "angular", label: "Angular" },
    { value: "solid", label: "SolidJS" }
  ];

  const groupedOptions = [
    {
      label: "Frontend Frameworks",
      options: [
        { value: "react", label: "React" },
        { value: "vue", label: "Vue.js" },
        { value: "svelte", label: "Svelte" },
        { value: "angular", label: "Angular" }
      ]
    },
    {
      label: "Backend Frameworks",
      options: [
        { value: "express", label: "Express.js" },
        { value: "fastify", label: "Fastify" },
        { value: "koa", label: "Koa.js" },
        { value: "nestjs", label: "NestJS" }
      ]
    }
  ];
</script>

<Story name="Default"  args={{ 
    options: fruits,
    class: "w-[200px]",
    placeholder: "Select a fruit..."
 }} />

<Story name="Multiple Selection" args={{ 
    options: frameworks,
    multiple: true,
    class: "w-[250px]",
    placeholder: "Select frameworks..."
  }} />

<Story name="Grouped Options" args={{ 
    groups: groupedOptions,
    class: "w-[250px]",
    placeholder: "Select a framework..."
  }} />

<Story name="Default Variant" args={{ 
    options: fruits,
    variant: "default",
    class: "w-[200px]",
    placeholder: "Default Select"
  }} />

<Story name="Outline Variant" args={{ 
    options: fruits,
    variant: "outline",
    class: "w-[200px]",
    placeholder: "Outline Select"
  }} />

<Story name="Filled Variant" args={{ 
    options: fruits,
    variant: "filled",
    class: "w-[200px]",
    placeholder: "Filled Select"
  }} />

<Story name="Ghost Variant" args={{ 
    options: fruits,
    variant: "ghost",
    class: "w-[200px]",
    placeholder: "Ghost Select"
  }} />

<Story name="Underline Variant" args={{ 
    options: fruits,
    variant: "underline",
    class: "w-[200px]",
    placeholder: "Underline Select"
  }} />

<Story name="Small Size" args={{ 
    options: fruits,
    size: "sm",
    class: "w-[200px]",
    placeholder: "Small Select"
  }} />

<Story name="Default Size" args={{ 
    options: fruits,
    size: "default",
    class: "w-[200px]",
    placeholder: "Default Select"
  }} />

<Story name="Large Size" args={{ 
    options: fruits,
    size: "lg",
    class: "w-[200px]",
    placeholder: "Large Select"
  }} />

<Story name="Normal State" args={{ 
    options: fruits,
    class: "w-[200px]",
    placeholder: "Normal Select"
  }} />

<Story name="Disabled State" args={{ 
    options: fruits,
    disabled: true,
    class: "w-[200px]",
    placeholder: "Disabled Select"
  }} />

<Story name="With Disabled Options" args={{ 
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana", disabled: true },
      { value: "orange", label: "Orange" },
      { value: "grape", label: "Grape", disabled: true },
      { value: "strawberry", label: "Strawberry" }
    ],
    class: "w-[200px]",
    placeholder: "Some options disabled"
  }} />
