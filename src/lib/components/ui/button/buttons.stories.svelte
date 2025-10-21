<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from "./button.svelte";
  import { fn } from 'storybook/test';
  	import DownloadIcon from "@lucide/svelte/icons/download";
    import { Sizes, Variants } from '.';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Example/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
      size: {
        control: { type: 'select' },
        options: Sizes,
      },
      variant: {
        control: { type: 'select' },
        options: Variants,
    }
    
  },
    args: {
      onclick: fn(),
    }
  });
</script>

<Story name="Default" args={{ variant: 'default', text: 'Button' }} />
<Story name="Secondary" args={{ variant: 'secondary', text: 'Button' }} />
<Story name="Outline" args={{ variant: 'outline', text: 'Button' }} />
<Story name="Destructive" args={{ variant: 'destructive', text: 'Button' }} />
<Story name="Ghost" args={{ variant: 'ghost', text: 'Button' }} />
<Story name="Link" args={{ variant: 'link', text: 'Button' }} />
<Story name="Bordered" args={{ variant: 'bordered', text: 'Button' }} />
<Story name="Flat" args={{ variant: 'flat', text: 'Button' }} />

<Story name="With Icon" args={{ variant: 'default', text: 'Button', icon: DownloadIcon }} />
<Story name="With Icon Position" args={{ variant: 'default', text: 'Button', icon: DownloadIcon, iconPosition: 'right' }} />


<Story name="Loading State" args={{ variant: 'default', text: 'Loading...', loading: true }} />
<Story name="Icon Only" args={{ variant: 'default', icon: DownloadIcon, size: 'icon' }} />

<Story name="Custom Content" args={{ variant: 'outline' }}>
    <DownloadIcon class="size-4 mr-2" />
    Custom Content
</Story>

