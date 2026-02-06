# SchemaForm Documentation

A schema-first form system for Svelte 5 powered by [@effect/schema](https://github.com/Effect-TS/effect). Define your form once with validation, types, and UI metadata - the form renders itself.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Core Concepts](#core-concepts)
- [API Reference](#api-reference)
  - [SchemaForm Component](#schemaform-component)
  - [FormController](#formcontroller)
  - [Annotations](#annotations)
- [Input Types](#input-types)
- [Form Layouts](#form-layouts)
- [Multi-Step Forms](#multi-step-forms)
- [Async Data Loading](#async-data-loading)
- [Validation](#validation)
- [Advanced Usage](#advanced-usage)
- [Troubleshooting](#troubleshooting)

---

## Overview

SchemaForm provides a declarative approach to building forms where your Effect Schema serves as the single source of truth for:

- **Validation rules** - Type constraints, patterns, min/max values
- **TypeScript types** - Automatically inferred from schema
- **UI metadata** - Labels, placeholders, input types, descriptions
- **Layout configuration** - Sections, steps, column spans, ordering

```typescript
// Define once, get everything
const LoginSchema = pipe(
  Schema.Struct({
    email: pipe(
      Schema.String,
      Schema.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      withField({
        label: "Email",
        inputType: "email",
        placeholder: "you@example.com"
      })
    ),
    password: pipe(
      Schema.String,
      Schema.minLength(8),
      withField({
        label: "Password",
        inputType: "password"
      })
    )
  })
);

// TypeScript type is automatically inferred
type Login = Schema.Schema.Type<typeof LoginSchema>;
// { email: string; password: string }
```

---

## Installation

```bash
# The forms module is included in @kareyes/aether
pnpm add @kareyes/aether effect
```

---

## Quick Start

### 1. Define Your Schema

```typescript
import { Schema, pipe } from "effect";
import { withField, withFormLayout } from "@kareyes/aether/forms";

const ContactSchema = pipe(
  Schema.Struct({
    name: pipe(
      Schema.String,
      Schema.minLength(1),
      withField({
        label: "Full Name",
        placeholder: "John Doe",
        inputType: "text"
      })
    ),
    email: pipe(
      Schema.String,
      Schema.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      Schema.annotations({
        message: () => "Please enter a valid email"
      }),
      withField({
        label: "Email Address",
        inputType: "email"
      })
    ),
    message: pipe(
      Schema.String,
      Schema.minLength(10),
      withField({
        label: "Message",
        inputType: "textarea",
        placeholder: "How can we help?"
      })
    )
  }),
  withFormLayout({
    columns: 1,
    sections: [{ id: "contact", title: "Contact Us" }]
  })
);
```

### 2. Create a Controller

```typescript
import { FormController } from "@kareyes/aether/forms";

const controller = new FormController(ContactSchema, {
  validateOnBlur: true,
  validateOnChange: false,
  initialValues: {
    name: "",
    email: "",
    message: ""
  }
});
```

### 3. Render the Form

```svelte
<script lang="ts">
  import { SchemaForm } from "@kareyes/aether/forms";

  async function handleSubmit(data) {
    console.log("Form submitted:", data);
    await api.submitContact(data);
  }
</script>

<SchemaForm
  {controller}
  onSubmit={handleSubmit}
  submitText="Send Message"
/>
```

---

## Core Concepts

### Schema-First Design

The schema defines everything about your form:

```typescript
const UserSchema = pipe(
  Schema.Struct({
    // Validation: minLength(2), maxLength(50)
    // Type: string
    // UI: text input with label "Username"
    username: pipe(
      Schema.String,
      Schema.minLength(2),
      Schema.maxLength(50),
      withField({
        label: "Username",
        inputType: "text",
        description: "Choose a unique username"
      })
    )
  })
);
```

### Annotations

Annotations attach metadata to schema fields:

- **`withField()`** - Combined UI and layout metadata
- **`withFieldUI()`** - UI-only metadata (label, placeholder, inputType)
- **`withFieldLayout()`** - Layout-only metadata (section, step, colSpan)
- **`withFormLayout()`** - Form-level configuration (sections, steps, columns)

### FormController

The controller manages form state and provides methods for:

- Value manipulation (`setValue`, `setValues`)
- Validation (`validate`, `validateField`, `validateStep`)
- Step navigation (`nextStep`, `prevStep`, `goToStep`)
- Submission (`submit`)
- Reset (`reset`)

---

## API Reference

### SchemaForm Component

The main component that renders your form.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `controller` | `FormController` | **required** | The form controller instance |
| `onSubmit` | `(data) => Promise<void> \| void` | - | Called with validated data on submit |
| `onError` | `(errors: FieldErrors) => void` | - | Called when validation fails |
| `onChange` | `(values) => void` | - | Called when any value changes |
| `sectionVariant` | `'default' \| 'card' \| 'collapsible'` | `'default'` | Section styling variant |
| `showStepIndicator` | `boolean` | `true` | Show/hide step indicator in multi-step forms |
| `submitText` | `string` | `'Submit'` | Submit button text |
| `nextText` | `string` | `'Next'` | Next button text (multi-step) |
| `prevText` | `string` | `'Back'` | Back button text (multi-step) |
| `class` | `string` | - | Additional CSS classes |

#### Snippets

```svelte
<SchemaForm {controller} onSubmit={handleSubmit}>
  {#snippet header()}
    <h2>Custom Header</h2>
  {/snippet}

  {#snippet footer({ isSubmitting, isValid, handleSubmit })}
    <Button onclick={handleSubmit} disabled={isSubmitting}>
      {isSubmitting ? "Saving..." : "Save"}
    </Button>
  {/snippet}
</SchemaForm>
```

### FormController

```typescript
class FormController<A, I, R> {
  constructor(
    schema: Schema.Schema<A, I, R>,
    config?: FormConfig<A>
  );

  // State
  readonly state: FormState<Partial<A>>;
  readonly form: ExtractedForm;

  // Subscriptions
  subscribe(listener: (state) => void): () => void;

  // Values
  setValue(field: string, value: unknown): void;
  setValues(values: Partial<A>): void;

  // Validation
  validate(): ValidationResult<A>;
  validateField(field: string): string | undefined;
  validateStep(): boolean;

  // Errors
  setFieldError(field: string, error: string): void;
  setErrors(errors: FieldErrors): void;
  clearErrors(): void;

  // Steps (multi-step forms)
  nextStep(): void;
  prevStep(): void;
  goToStep(step: number): void;

  // Submission
  submit(handler: (data: A) => Promise<void>): Promise<boolean>;

  // Reset
  reset(values?: Partial<A>): void;
}
```

#### FormConfig

```typescript
interface FormConfig<T> {
  initialValues?: Partial<T>;
  validateOnChange?: boolean;  // Default: true
  validateOnBlur?: boolean;    // Default: true
  validateOnMount?: boolean;   // Default: false
  revalidateOnChange?: boolean; // Default: true
}
```

#### FormState

```typescript
interface FormState<T> {
  values: T;
  errors: Record<string, string | undefined>;
  touched: Record<string, boolean>;
  dirty: Record<string, boolean>;
  isSubmitting: boolean;
  isValidating: boolean;
  isValid: boolean;
  isDirty: boolean;
  submitCount: number;
  currentStep: number;
}
```

### Annotations

#### withField()

Combined UI and layout annotation:

```typescript
withField({
  // UI properties
  label: string;              // Field label (required)
  placeholder?: string;       // Input placeholder
  description?: string;       // Help text below field
  inputType?: InputType;      // Input type (auto-detected if not set)
  options?: FieldOption[];    // For select/radio
  optionGroups?: FieldOptionGroup[]; // Grouped options
  mask?: string;              // Input mask (e.g., "phone")
  autocomplete?: string;      // HTML autocomplete attribute
  disabled?: boolean;         // Disable field
  readonly?: boolean;         // Read-only field

  // Layout properties
  section?: string;           // Section ID
  step?: number;              // Step number (1-based)
  order?: number;             // Sort order within section
  colSpan?: ColumnSpan;       // Column span (1-12 or "full")
  colSpanSm?: ColumnSpan;     // Column span at sm breakpoint
  colSpanMd?: ColumnSpan;     // Column span at md breakpoint
  colSpanLg?: ColumnSpan;     // Column span at lg breakpoint
})
```

#### withFormLayout()

Form-level layout configuration:

```typescript
withFormLayout({
  columns?: number;           // Grid columns (default: 12)
  gap?: "none" | "sm" | "md" | "lg"; // Gap between fields
  sections?: SectionConfig[];  // Section definitions
  steps?: StepConfig[];       // Step definitions (for multi-step)
})

interface SectionConfig {
  id: string;                 // Unique section ID
  title?: string;             // Section title
  description?: string;       // Section description
  order?: number;             // Sort order
  collapsible?: boolean;      // Make section collapsible
  defaultCollapsed?: boolean; // Start collapsed
}

interface StepConfig {
  step: number;               // Step number (1-based)
  title: string;              // Step title
  description?: string;       // Step description
  icon?: string;              // Icon name
}
```

---

## Input Types

SchemaForm automatically renders the appropriate input component based on the `inputType` annotation:

| Input Type | Component | Schema Type |
|------------|-----------|-------------|
| `text` | Input | `Schema.String` |
| `email` | Input (type="email") | `Schema.String` |
| `password` | Input (type="password") | `Schema.String` |
| `tel` | Input (type="tel") | `Schema.String` |
| `url` | Input (type="url") | `Schema.String` |
| `number` | Input (type="number") | `Schema.Number` |
| `textarea` | Textarea | `Schema.String` |
| `select` | Select | `Schema.String` |
| `combobox` | Combobox | `Schema.String` |
| `checkbox` | Checkbox | `Schema.Boolean` |
| `switch` | Switch | `Schema.Boolean` |
| `radio` | RadioGroup | `Schema.String` |
| `date` | DatePicker | `Schema.String` |
| `hidden` | Hidden input | Any |

### Auto-Detection

If `inputType` is not specified, it's inferred from the schema type:

- `Schema.Boolean` → `checkbox`
- `Schema.Number` → `number`
- `Schema.String` → `text`
- Union of string literals → `select` or `radio`

---

## Form Layouts

### Single Section

```typescript
const FormSchema = pipe(
  Schema.Struct({
    field1: pipe(Schema.String, withField({ label: "Field 1" })),
    field2: pipe(Schema.String, withField({ label: "Field 2" }))
  }),
  withFormLayout({
    columns: 2,
    sections: [{ id: "main", title: "Form Title" }]
  })
);
```

### Multiple Sections

```typescript
const FormSchema = pipe(
  Schema.Struct({
    firstName: pipe(
      Schema.String,
      withField({ label: "First Name", section: "personal", colSpan: 6 })
    ),
    lastName: pipe(
      Schema.String,
      withField({ label: "Last Name", section: "personal", colSpan: 6 })
    ),
    email: pipe(
      Schema.String,
      withField({ label: "Email", section: "contact" })
    )
  }),
  withFormLayout({
    columns: 12,
    sections: [
      { id: "personal", title: "Personal Information", order: 1 },
      { id: "contact", title: "Contact Details", order: 2 }
    ]
  })
);
```

### Section Variants

```svelte
<!-- Default: simple dividers -->
<SchemaForm {controller} sectionVariant="default" />

<!-- Card: each section in a card -->
<SchemaForm {controller} sectionVariant="card" />

<!-- Collapsible: accordion-style sections -->
<SchemaForm {controller} sectionVariant="collapsible" />
```

---

## Multi-Step Forms

Create wizard-style forms by defining steps:

```typescript
const WizardSchema = pipe(
  Schema.Struct({
    // Step 1 fields
    email: pipe(
      Schema.String,
      withField({ label: "Email", step: 1, section: "account" })
    ),
    password: pipe(
      Schema.String,
      withField({ label: "Password", step: 1, section: "account" })
    ),

    // Step 2 fields
    firstName: pipe(
      Schema.String,
      withField({ label: "First Name", step: 2, section: "profile" })
    ),
    lastName: pipe(
      Schema.String,
      withField({ label: "Last Name", step: 2, section: "profile" })
    ),

    // Step 3 fields
    newsletter: pipe(
      Schema.Boolean,
      withField({ label: "Subscribe", step: 3, section: "preferences" })
    )
  }),
  withFormLayout({
    sections: [
      { id: "account", title: "Account" },
      { id: "profile", title: "Profile" },
      { id: "preferences", title: "Preferences" }
    ],
    steps: [
      { step: 1, title: "Account", description: "Create your login" },
      { step: 2, title: "Profile", description: "Personal details" },
      { step: 3, title: "Finish", description: "Preferences" }
    ]
  })
);
```

### Step Navigation

```svelte
<SchemaForm
  {controller}
  showStepIndicator={true}
  nextText="Continue"
  prevText="Go Back"
  submitText="Complete"
/>
```

### Per-Step Validation

Each step is validated before proceeding to the next:

```typescript
// Manually trigger step validation
const isValid = controller.validateStep();

// Manually navigate
controller.nextStep();  // Validates current step first
controller.prevStep();  // No validation needed
controller.goToStep(2); // Jump to specific step
```

---

## Async Data Loading

Load options dynamically before creating the form:

```typescript
// 1. Define a schema factory
function createFormSchema(options: FieldOption[]) {
  return pipe(
    Schema.Struct({
      category: pipe(
        Schema.String,
        withField({
          label: "Category",
          inputType: "select",
          options: options  // Dynamic options
        })
      )
    })
  );
}

// 2. Load data and create controller
const options = await fetchCategories();
const schema = createFormSchema(options);
const controller = new FormController(schema);
```

### Complete Example

```svelte
<script lang="ts">
  import { onMount } from "svelte";
  import { FormController, SchemaForm } from "@kareyes/aether/forms";

  let controller = $state(null);
  let loading = $state(true);

  onMount(async () => {
    const [categories, regions] = await Promise.all([
      fetchCategories(),
      fetchRegions()
    ]);

    const schema = createFormSchema(categories, regions);
    controller = new FormController(schema);
    loading = false;
  });
</script>

{#if loading}
  <Skeleton />
{:else if controller}
  <SchemaForm {controller} onSubmit={handleSubmit} />
{/if}
```

---

## Validation

### Schema-Level Validation

Use Effect Schema's built-in validators:

```typescript
const schema = pipe(
  Schema.String,
  Schema.minLength(2),
  Schema.maxLength(100),
  Schema.pattern(/^[a-zA-Z]+$/),
  Schema.annotations({
    message: () => "Only letters allowed, 2-100 characters"
  })
);
```

### Custom Error Messages

```typescript
// Per-field message
const email = pipe(
  Schema.String,
  Schema.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  Schema.annotations({
    message: () => "Please enter a valid email address"
  })
);

// Refinement with message
const age = pipe(
  Schema.Number,
  Schema.filter(
    (n) => n >= 18,
    { message: () => "Must be 18 or older" }
  )
);
```

### Required Checkboxes

For checkboxes that must be checked (e.g., "I agree to terms"):

```typescript
import { RequiredCheckbox, requiredCheckbox } from "@kareyes/aether/forms";

// Default message: "This field must be checked"
acceptTerms: pipe(
  RequiredCheckbox,
  withField({ label: "I accept the terms", inputType: "checkbox" })
)

// Custom message
acceptPrivacy: pipe(
  requiredCheckbox("You must accept the privacy policy"),
  withField({ label: "I accept the privacy policy", inputType: "checkbox" })
)
```

### Server-Side Errors

Set errors from API responses:

```typescript
async function handleSubmit(data) {
  try {
    await api.register(data);
  } catch (error) {
    if (error.code === "EMAIL_EXISTS") {
      controller.setFieldError("email", "This email is already registered");
    } else {
      controller.setErrors({
        email: error.errors?.email,
        password: error.errors?.password
      });
    }
    throw error; // Re-throw to prevent success state
  }
}
```

---

## Advanced Usage

### Custom Footer

```svelte
<SchemaForm {controller} onSubmit={handleSubmit}>
  {#snippet footer({ isSubmitting, isValid, isLastStep, handleSubmit, handlePrev })}
    <div class="flex justify-between">
      <Button variant="outline" onclick={handlePrev}>
        Cancel
      </Button>
      <div class="flex gap-2">
        <Button variant="outline" onclick={() => controller.reset()}>
          Reset
        </Button>
        <Button onclick={handleSubmit} disabled={isSubmitting || !isValid}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  {/snippet}
</SchemaForm>
```

### Watching Values

```svelte
<script>
  // React to value changes
  $effect(() => {
    const country = controller.state.values.country;
    if (country) {
      loadStatesForCountry(country);
    }
  });
</script>

<SchemaForm
  {controller}
  onChange={(values) => console.log("Values changed:", values)}
/>
```

### Programmatic Control

```typescript
// Set values programmatically
controller.setValue("email", "user@example.com");
controller.setValues({ firstName: "John", lastName: "Doe" });

// Validate
const result = controller.validate();
if (!result.valid) {
  console.log("Errors:", result.errors);
}

// Reset with new values
controller.reset({ email: "", password: "" });

// Clear all errors
controller.clearErrors();
```

### Input Masks

Apply input masks using the `mask` annotation:

```typescript
phone: pipe(
  Schema.String,
  withField({
    label: "Phone Number",
    inputType: "tel",
    mask: "phone",  // Built-in: (555) 123-4567
    placeholder: "(555) 123-4567"
  })
)
```

---

## Troubleshooting

### Common Issues

#### 1. Checkbox shows "Invalid value" instead of custom error

Use `RequiredCheckbox` or `requiredCheckbox()` instead of `Schema.Boolean`:

```typescript
// ❌ Wrong - "false" is a valid boolean
acceptTerms: Schema.Boolean

// ✅ Correct - requires value to be "true"
acceptTerms: RequiredCheckbox
```

#### 2. Infinite loop on form load

Ensure you're not tracking `formState.values` directly in effects:

```typescript
// ❌ Can cause loops
$effect(() => {
  console.log(formState.values);
});

// ✅ Safe - track specific values
$effect(() => {
  const email = formState.values.email;
  // ...
});
```

#### 3. Input mask not working

The mask is applied in the Input component. Ensure you're passing it through:

```typescript
withField({
  inputType: "tel",
  mask: "phone"  // Must specify mask
})
```

#### 4. Select options not showing

Ensure options are provided in the annotation:

```typescript
withField({
  inputType: "select",
  options: [
    { value: "a", label: "Option A" },
    { value: "b", label: "Option B" }
  ]
})
```

#### 5. Validation not triggering

Check your FormController configuration:

```typescript
const controller = new FormController(schema, {
  validateOnBlur: true,   // Validate when field loses focus
  validateOnChange: true  // Validate on every keystroke
});
```

### Debug Mode

Add console logging to track form state:

```svelte
<SchemaForm
  {controller}
  onChange={(values) => console.log("Values:", values)}
  onError={(errors) => console.log("Errors:", errors)}
/>
```

---

## Examples

For complete working examples, see:

- **Basic Form**: `/forms/basic` - Simple login form
- **Multi-Section**: `/forms/sections` - Profile form with multiple sections
- **Multi-Step**: `/forms` - User registration wizard
- **Async Data**: `/forms/pokemon` - PokéAPI integration with dynamic options

---

## TypeScript Support

Full type inference from schema:

```typescript
const UserSchema = Schema.Struct({
  name: Schema.String,
  age: Schema.Number,
  active: Schema.Boolean
});

// Inferred type
type User = Schema.Schema.Type<typeof UserSchema>;
// { name: string; age: number; active: boolean }

// Input type (for partial form state)
type UserInput = Schema.Schema.Encoded<typeof UserSchema>;

// Use in handler with full type safety
async function handleSubmit(data: User) {
  // data.name is string
  // data.age is number
  // data.active is boolean
}
```
