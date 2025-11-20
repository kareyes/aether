<script module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Textarea from "./textarea.svelte";

	const { Story } = defineMeta({
		title: "Components/Textarea",
		component: Textarea,
		tags: ["autodocs"],
		argTypes: {
			// Main props we want to control
			variant: {
				control: { type: "select" },
				options: ["default", "outline", "filled", "ghost", "underline"],
				description: "Visual variant of the textarea",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "default" },
				},
			},
			size: {
				control: { type: "select" },
				options: ["sm", "default", "lg"],
				description: "Size of the textarea",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "default" },
				},
			},
			resize: {
				control: { type: "select" },
				options: ["none", "vertical", "horizontal", "both"],
				description: "Resize behavior",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "vertical" },
				},
			},
			maxLength: {
				control: { type: "number" },
				description: "Maximum character length",
				table: {
					type: { summary: "number" },
					defaultValue: { summary: "undefined" },
				},
			},
			showCount: {
				control: { type: "boolean" },
				description: "Show character counter",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
			autoResize: {
				control: { type: "boolean" },
				description: "Auto-resize based on content",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
			minRows: {
				control: { type: "number" },
				description: "Minimum rows for auto-resize",
				table: {
					type: { summary: "number" },
					defaultValue: { summary: "undefined" },
				},
			},
			maxRows: {
				control: { type: "number" },
				description: "Maximum rows for auto-resize",
				table: {
					type: { summary: "number" },
					defaultValue: { summary: "undefined" },
				},
			},
			disabled: {
				control: { type: "boolean" },
				description: "Whether the textarea is disabled",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
			placeholder: {
				control: { type: "text" },
				description: "Placeholder text",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "undefined" },
				},
			},
			value: {
				control: { type: "text" },
				description: "Textarea value",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "undefined" },
				},
			},

			// Hide unwanted props from controls
			class: {
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
			required: {
				control: false,
				table: { disable: true },
			},
			readonly: {
				control: false,
				table: { disable: true },
			},
			rows: {
				control: false,
				table: { disable: true },
			},
			cols: {
				control: false,
				table: { disable: true },
			},
		},
		args: {
			variant: "default",
			size: "default",
			resize: "vertical",
			disabled: false,
			showCount: false,
			autoResize: false,
			placeholder: "Type your message here...",
		},

		parameters: {
			docs: {
				extractArgTypes: false,
			},
		},
	});
</script>

<!-- Basic States -->
<Story name="Default" args={{}} />
<Story name="Disabled" args={{ disabled: true, value: "This textarea is disabled" }} />

<!-- Variants -->
<Story name="Default Variant" args={{ variant: "default", placeholder: "Default variant" }} />
<Story name="Outline Variant" args={{ variant: "outline", placeholder: "Outline variant" }} />
<Story name="Filled Variant" args={{ variant: "filled", placeholder: "Filled variant" }} />
<Story name="Ghost Variant" args={{ variant: "ghost", placeholder: "Ghost variant" }} />
<Story name="Underline Variant" args={{ variant: "underline", placeholder: "Underline variant" }} />

<!-- Sizes -->
<Story name="Small Size" args={{ size: "sm", placeholder: "Small textarea" }} />
<Story name="Default Size" args={{ size: "default", placeholder: "Default textarea" }} />
<Story name="Large Size" args={{ size: "lg", placeholder: "Large textarea" }} />

<!-- Resize Options -->
<Story name="Resize None" args={{ resize: "none", placeholder: "Cannot be manually resized" }} />
<Story name="Resize Vertical" args={{ resize: "vertical", placeholder: "Resize vertically only (default)" }} />
<Story name="Resize Horizontal" args={{ resize: "horizontal", placeholder: "Resize horizontally only" }} />
<Story name="Resize Both" args={{ resize: "both", placeholder: "Resize in any direction" }} />

<!-- Features -->
<Story name="With Character Count" args={{ showCount: true, placeholder: "Type to see character count..." }} />
<Story name="With Max Length" args={{ maxLength: 200, showCount: true, placeholder: "Maximum 200 characters..." }} />
<Story name="Auto Resize" args={{ autoResize: true, minRows: 2, maxRows: 6, placeholder: "Type multiple lines to see auto-resize..." }} />

