import type { Preview } from '@storybook/sveltekit'
import '../src/app.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },

    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: 'oklch(1 0 0)', // --background from your CSS
        },
        {
          name: 'dark',
          value: 'oklch(0.105 0 0)', // dark background
        },
      ],
    },
  },
  
  globalTypes: {
    darkMode: {
      description: 'Toggle dark mode',
      defaultValue: 'light',
      toolbar: {
        title: 'Dark mode',
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Light mode', icon: 'sun' },
          { value: 'dark', title: 'Dark mode', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },


  decorators: [
    (story, context) => {
      const darkMode = context.globals.darkMode || 'light';
      
      // Apply dark class to document root for Tailwind dark mode
      if (typeof document !== 'undefined') {
        if (darkMode === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }

      return story();
    },
  ],
};

export default preview;