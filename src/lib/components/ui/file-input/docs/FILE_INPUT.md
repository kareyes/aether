# FileInput Component

A modern drag-and-drop file input component with validation, file type restrictions, and multiple variants.

## Features

- **Dual UI Modes**: Modern drag-and-drop interface or traditional file input UI
- **Drag & Drop Support**: Native drag and drop functionality with visual feedback
- **3 Visual Variants**: default, filled, ghost
- **3 Sizes**: sm, default, lg
- **File Validation**: Type checking, size limits, and maximum file count
- **File Management**: Built-in file list with remove functionality
- **Visual States**: Drag over, error, and disabled states
- **TypeScript Support**: Complete type safety and IntelliSense
- **Accessibility**: ARIA labels and keyboard navigation

## Installation

The FileInput component is included in the `@kareyes/aether` package.

```bash
pnpm add @kareyes/aether
```

## Usage

### Basic Usage

```svelte
<script lang="ts">
  import { FileInput } from "@kareyes/aether";

  let files = $state(null);
</script>

<FileInput bind:files />
```

### With Validation

```svelte
<FileInput 
  bind:files
  acceptedTypes={["image/*"]}
  maxSize={2 * 1024 * 1024}
  maxFiles={3}
  onError={(error) => console.error(error)}
/>
```

### Variants

```svelte
<FileInput variant="default" />
<FileInput variant="filled" />
<FileInput variant="ghost" />
```

### Sizes

```svelte
<FileInput size="sm" />
<FileInput size="default" />
<FileInput size="lg" />
```

### Regular File Input Mode

```svelte
<!-- Traditional file input appearance -->
<FileInput 
  regularMode={true}
  placeholder="Choose files..."
/>

<!-- Regular mode with validation -->
<FileInput 
  regularMode={true}
  variant="filled"
  maxFiles={1}
  acceptedTypes={[".pdf"]}
  placeholder="Choose PDF file..."
/>
```

### Single File Upload

```svelte
<FileInput 
  maxFiles={1}
  acceptedTypes={[".pdf"]}
  dragDropText="Drop a PDF file here"
  browseText="Choose PDF file"
/>
```

### Custom Error Handling

```svelte
<script>
  let errorMessage = $state("");
  
  function handleError(error) {
    errorMessage = error;
    // Clear error after 5 seconds
    setTimeout(() => { errorMessage = ""; }, 5000);
  }
  
  function handleFilesChange(files) {
    console.log("Files selected:", files);
  }
</script>

<FileInput 
  bind:files
  onError={handleError}
  onFilesChange={handleFilesChange}
/>

{#if errorMessage}
  <div class="text-destructive mt-2">{errorMessage}</div>
{/if}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `regularMode` | `boolean` | `false` | Use regular file input UI instead of drag-and-drop |
| `placeholder` | `string` | `"Choose files..."` | Placeholder text for regular mode |
| `variant` | `"default" \| "filled" \| "ghost"` | `"default"` | Visual variant |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Component size |
| `files` | `FileList \| null` | `null` | Selected files (bindable) |
| `maxFiles` | `number` | `undefined` | Maximum number of files allowed |
| `maxSize` | `number` | `undefined` | Maximum file size in bytes |
| `acceptedTypes` | `string[]` | `undefined` | Accepted file types/extensions |
| `showFileList` | `boolean` | `true` | Whether to show selected files list |
| `dragDropText` | `string` | `"Drop files here or click to browse"` | Main drag drop text |
| `browseText` | `string` | `"Browse files"` | Browse button text |
| `disabled` | `boolean` | `false` | Whether input is disabled |
| `onFilesChange` | `(files: FileList \| null) => void` | `undefined` | Callback when files change |
| `onError` | `(error: string) => void` | `undefined` | Callback for validation errors |
| `class` | `string` | `""` | Additional CSS classes |

## File Type Formats

### MIME Types
```svelte
acceptedTypes={["image/*", "video/*", "application/pdf"]}
```

### File Extensions
```svelte
acceptedTypes={[".jpg", ".png", ".pdf", ".docx"]}
```

### Mixed
```svelte
acceptedTypes={["image/*", ".pdf", ".txt"]}
```

## Common Use Cases

### Profile Picture Upload
```svelte
<FileInput 
  maxFiles={1}
  acceptedTypes={["image/jpeg", "image/png", "image/webp"]}
  maxSize={1024 * 1024} // 1MB
  dragDropText="Drop your profile picture here"
  browseText="Choose profile picture"
/>
```

### Document Upload
```svelte
<FileInput 
  acceptedTypes={[".pdf", ".doc", ".docx"]}
  maxFiles={5}
  maxSize={10 * 1024 * 1024} // 10MB
  variant="filled"
/>
```

### Image Gallery
```svelte
<FileInput 
  acceptedTypes={["image/*"]}
  maxFiles={10}
  maxSize={5 * 1024 * 1024} // 5MB per image
  variant="ghost"
  size="lg"
/>
```

### CSV Data Import
```svelte
<FileInput 
  maxFiles={1}
  acceptedTypes={[".csv", ".xlsx"]}
  dragDropText="Drop spreadsheet here"
  browseText="Choose CSV or Excel file"
  variant="filled"
/>
```

## Validation Rules

The component validates files in the following order:

1. **File Count**: Checks if the number of files exceeds `maxFiles`
2. **File Types**: Validates against `acceptedTypes` array
3. **File Size**: Ensures each file is under `maxSize` bytes

If any validation fails, the `onError` callback is triggered with a descriptive error message.

## Visual States

- **Default**: Normal state ready for interaction
- **Drag Over**: Highlighted when files are dragged over the component
- **Error**: Red border and text when validation fails (auto-clears after 3 seconds)
- **Disabled**: Grayed out and non-interactive

## Styling

The component uses Tailwind CSS classes and supports customization through the `class` prop. Each variant provides a different visual approach:

- **Default**: Border-dashed with hover effects
- **Filled**: Background color with subtle border
- **Ghost**: Minimal styling, transparent background

## Accessibility

- Proper ARIA labels for screen readers
- Keyboard navigation support
- Focus management for file input
- Descriptive error messages
- File list with remove button labels

## File Management

Selected files are displayed in a list below the upload area (when `showFileList={true}`). Each file shows:

- File icon
- File name (truncated if too long)  
- File size (formatted)
- Remove button with proper ARIA label

Files can be removed individually, and the component automatically updates the FileList.

## Examples

See the [FileInput Demo](/file-input-demo) page for interactive examples of all variants, sizes, and validation features.

## Using FileInput with Field Component

The Field component provides a consistent way to add labels, descriptions, and error handling to your FileInput components.

### Basic Field Usage

```svelte
<script lang="ts">
  import { FileInput, Field } from "@kareyes/aether";

  let files = $state(null);
</script>

<Field
  label="Upload Documents"
  description="Supported formats: PDF, DOC, DOCX (Max 5MB)"
>
  <FileInput 
    bind:files
    acceptedTypes={[".pdf", ".doc", ".docx"]}
    maxSize={5 * 1024 * 1024}
  />
</Field>
```

### With Validation

```svelte
<script>
  import { FileInput } from "@kareyes/aether";
  import { FieldPrimitives } from "@kareyes/aether";
  
  let files = $state(null);
  let error = $state("");
  
  function handleError(err: string) {
    error = err;
    setTimeout(() => error = "", 3000);
  }
</script>

<Field
  label="Profile Picture"
  description="Upload your profile photo (JPG, PNG)"
  required
  error={error || undefined}
>
  <FileInput 
    bind:files
    maxFiles={1}
    acceptedTypes={["image/*"]}
    maxSize={2 * 1024 * 1024}
    onError={handleError}
    error={!!error}
  />
</Field>
```

### Regular Mode with Field

```svelte
<Field
  label="Resume"
  description="Upload your resume in PDF format"
  required
>
  <FileInput 
    regularMode={true}
    maxFiles={1}
    acceptedTypes={[".pdf"]}
    placeholder="Choose PDF file..."
    variant="filled"
  />
</Field>
```

### Different Variants with Field

```svelte
<Field
  label="Project Files"
  description="Upload project documents and assets"
>
  <FileInput 
    variant="filled"
    maxFiles={5}
    acceptedTypes={[".pdf", ".doc", ".zip"]}
  />
</Field>

<Field
  label="Images"
  description="Upload product images"
>
  <FileInput 
    variant="ghost"
    maxFiles={10}
    acceptedTypes={["image/*"]}
    size="lg"
  />
</Field>
```

### Complete Upload Form

```svelte
<script>
  import { FileInput } from "@kareyes/aether";
  import { FieldPrimitives , Field} from "@kareyes/aether";
  import { Button } from "@kareyes/aether";
  
  let resume = $state(null);
  let coverLetter = $state(null);
  let portfolio = $state(null);
  
  let errors = $state({
    resume: "",
    coverLetter: "",
    portfolio: "",
  });
  
  function handleResumeError(err: string) {
    errors.resume = err;
  }
  
  function handleCoverLetterError(err: string) {
    errors.coverLetter = err;
  }
  
  function handlePortfolioError(err: string) {
    errors.portfolio = err;
  }
  
  function handleSubmit() {
    console.log("Files:", { resume, coverLetter, portfolio });
  }
</script>

<FieldPrimitives.Set>
  <FieldPrimitives.Legend>Job Application</FieldPrimitives.Legend>
  <FieldPrimitives.Description>Upload your application documents</FieldPrimitives.Description>
  
  <FieldPrimitives.Separator />
  
  <FieldPrimitives.Group class="gap-6">
    <Field
      label="Resume"
      description="Upload your resume (PDF only, max 5MB)"
      required
      error={errors.resume || undefined}
    >
      <FileInput 
        bind:files={resume}
        maxFiles={1}
        acceptedTypes={[".pdf"]}
        maxSize={5 * 1024 * 1024}
        onError={handleResumeError}
        error={!!errors.resume}
        variant="outline"
        size="lg"
      />
    </Field>
    
    <Field
      label="Cover Letter"
      description="Upload your cover letter (PDF or DOC)"
      required
      error={errors.coverLetter || undefined}
    >
      <FileInput 
        bind:files={coverLetter}
        maxFiles={1}
        acceptedTypes={[".pdf", ".doc", ".docx"]}
        maxSize={3 * 1024 * 1024}
        onError={handleCoverLetterError}
        error={!!errors.coverLetter}
        variant="filled"
      />
    </Field>
    
    <Field
      label="Portfolio (Optional)"
      description="Upload portfolio samples (Images or PDFs, max 10MB total)"
      error={errors.portfolio || undefined}
    >
      <FileInput 
        bind:files={portfolio}
        maxFiles={5}
        acceptedTypes={["image/*", ".pdf"]}
        maxSize={10 * 1024 * 1024}
        onError={handlePortfolioError}
        error={!!errors.portfolio}
      />
    </Field>
  </FieldPrimitives.Group>
  
  <div class="flex gap-4 pt-4">
    <Button onclick={handleSubmit} disabled={!resume || !coverLetter}>
      Submit Application
    </Button>
    <Button variant="outline" type="button">
      Save Draft
    </Button>
  </div>
</FieldPrimitives.Set>
```