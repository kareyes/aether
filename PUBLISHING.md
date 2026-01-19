# Publishing Guide for @kareyes/aether

A Svelte 5 UI component library published to GitHub Packages.

## Package Information

- **Name**: `@kareyes/aether`
- **Registry**: GitHub Packages (`https://npm.pkg.github.com`)
- **Repository**: https://github.com/kareyes/aether

## Publishing a New Version

### 1. Bump the Version

Before creating a release, always bump the version in `package.json`:

```bash
# Patch release (0.0.1 → 0.0.2) - bug fixes
pnpm version patch

# Minor release (0.0.2 → 0.1.0) - new features, backward compatible
pnpm version minor

# Major release (0.1.0 → 1.0.0) - breaking changes
pnpm version major
```

Or manually edit the `version` field in `package.json`.

### 2. Commit and Push

```bash
git add package.json
git commit -m "chore: bump version to X.X.X"
git push
```

### 3. Create a GitHub Release

**Option A: GitHub UI**
1. Go to https://github.com/kareyes/aether/releases
2. Click "Create a new release"
3. Create a new tag matching the version (e.g., `v0.0.2`)
4. Add release notes describing the changes
5. Click "Publish release"

**Option B: Command Line**
```bash
git tag v0.0.2
git push origin v0.0.2
# Then create the release via GitHub UI
```

The GitHub Actions workflow (`.github/workflows/publish.yml`) will automatically build and publish the package when a release is created.

## For Consumers

### Step 1: Generate a GitHub Personal Access Token

1. Go to **https://github.com/settings/tokens**
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name (e.g., "npm packages")
4. Select expiration (e.g., 90 days or no expiration)
5. Check the **`read:packages`** scope
6. Click **"Generate token"**
7. **Copy the token immediately** (you won't see it again)

### Step 2: Configure .npmrc

Create a `.npmrc` file in your project root:

```
@kareyes:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=ghp_xxxxxxxxxxxxxxxxxxxx
```

Replace `ghp_xxxxxxxxxxxxxxxxxxxx` with your actual GitHub token.

**Security Note**: Don't commit tokens to git. Either:
- Add `.npmrc` to `.gitignore`
- Or use an environment variable:
  ```
  @kareyes:registry=https://npm.pkg.github.com
  //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
  ```

### Step 3: Install the Package

```bash
pnpm add @kareyes/aether
# or
npm install @kareyes/aether
```

### Usage

```svelte
<script>
  import { Button, Card, Input } from '@kareyes/aether';
  import { cn } from '@kareyes/aether/utils';
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>Hello</Card.Title>
  </Card.Header>
  <Card.Content>
    <Input placeholder="Enter text..." />
    <Button>Submit Test </Button>
  </Card.Content>
</Card.Root>
```

### Peer Dependencies

Consumers must have these installed:
- `svelte` ^5.0.0
- `tailwindcss` ^4.0.0

## Development

### Build the Package Locally

```bash
pnpm build:package
```

This runs `svelte-package` and cleans up docs/stories from the `dist` folder.

### Test a Dry Run Publish

```bash
pnpm publish --dry-run --no-git-checks
```

### Project Structure

```
src/lib/
├── components/ui/    # All UI components
├── hooks/            # Svelte hooks
├── actions/          # Svelte actions
├── index.ts          # Main entry point
└── utils.ts          # Utility functions (cn, types)
```

## Troubleshooting

### Error: 409 Conflict - Cannot publish over existing version

You're trying to publish a version that already exists. Bump the version in `package.json` and try again.

### Error: 401 Unauthorized

The `GITHUB_TOKEN` doesn't have permission to publish. Ensure the workflow has `packages: write` permission.

### Error: 404 Not Found / ERR_PNPM_FETCH_404

This means the consuming project is trying to fetch from the wrong registry (npmjs.org instead of GitHub Packages).

**Solution**: Ensure the consuming project has a `.npmrc` file with:
```
@kareyes:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

### Error: Package not found when installing

1. Check that `.npmrc` has the correct registry configured
2. Ensure you're authenticated with GitHub Packages (token has `read:packages` scope)
3. Verify the package is published at https://github.com/kareyes/aether/packages

### Error: No authorization header was set

You need to add authentication to your `.npmrc`:
```
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

## Available Components

- Accordion, Alert, AlertDialog, Avatar, Badge
- Breadcrumb, Button, ButtonGroup, Calendar, Card
- Checkbox, ComboBox, Command, DataTable, DatePicker
- Dialog, DropdownMenu, Field, FileInput, Input
- InputGroup, InputOTP, Label, NumberSpinner, Popover
- RadioGroup, RangeCalendar, Select, Separator, Sheet
- Sidebar, Skeleton, Slider, Sonner, Spinner
- Stepper, Switch, Table, Tabs, Textarea, Tooltip
