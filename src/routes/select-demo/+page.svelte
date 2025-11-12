<script lang="ts">
  import { Select } from "$lib/components/ui/select";
  import { Badge } from "$lib/components/ui/badge";

  let basicValue = $state("");
  let multiValue = $state<string[]>([]);
  let groupedValue = $state("");

  // Sample options for different examples
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

  function handleSelectionChange(key: string, value: any) {
    console.log(`${key} changed:`, value);
  }
</script>

<svelte:head>
  <title>Unified Select Demo - Aether UI</title>
</svelte:head>

<div class="container mx-auto p-8 space-y-12">
  <div class="space-y-4">
    <h1 class="text-4xl font-bold">Unified Select Component</h1>
    <p class="text-lg text-muted-foreground">
      A single, easy-to-use Select component that combines all shadcn select functionality.
    </p>
  </div>

  <!-- Basic Usage -->
  <section class="space-y-6">
    <div>
      <h2 class="text-2xl font-semibold mb-4">Basic Usage</h2>
      <div class="space-y-4">
        <div>
          <span class="block text-sm font-medium mb-2">Choose a fruit:</span>
          <Select
            bind:value={basicValue}
            options={fruits}
            placeholder="Select a fruit..."
            class="w-[200px]"
            onSelectionChange={(value: any) => handleSelectionChange('basic', value)}
          />
          {#if basicValue}
            <p class="text-sm text-muted-foreground mt-2">Selected: <Badge variant="secondary">{basicValue}</Badge></p>
          {/if}
        </div>
      </div>
    </div>
  </section>

  <!-- Multiple Selection -->
  <section class="space-y-6">
    <div>
      <h2 class="text-2xl font-semibold mb-4">Multiple Selection</h2>
      <div class="space-y-4">
        <div>
          <span class="block text-sm font-medium mb-2">Choose multiple frameworks:</span>
          <Select
            bind:value={multiValue}
            options={frameworks}
            multiple={true}
            placeholder="Select frameworks..."
            class="w-[250px]"
            onSelectionChange={(value: any) => handleSelectionChange('multiple', value)}
          />
          {#if multiValue.length > 0}
            <div class="flex flex-wrap gap-2 mt-2">
              {#each multiValue as item}
                <Badge variant="secondary">{item}</Badge>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </div>
  </section>

  <!-- Grouped Options -->
  <section class="space-y-6">
    <div>
      <h2 class="text-2xl font-semibold mb-4">Grouped Options</h2>
      <div class="space-y-4">
        <div>
          <span class="block text-sm font-medium mb-2">Choose a framework:</span>
          <Select
            bind:value={groupedValue}
            groups={groupedOptions}
            placeholder="Select a framework..."
            class="w-[250px]"
            onSelectionChange={(value: any) => handleSelectionChange('grouped', value)}
          />
          {#if groupedValue}
            <p class="text-sm text-muted-foreground mt-2">Selected: <Badge variant="secondary">{groupedValue}</Badge></p>
          {/if}
        </div>
      </div>
    </div>
  </section>

  <!-- Variants -->
  <section class="space-y-6">
    <div>
      <h2 class="text-2xl font-semibold mb-4">Variants</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <span class="block text-sm font-medium mb-2">Default</span>
          <Select
            options={fruits}
            variant="default"
            placeholder="Default variant"
            class="w-full"
          />
        </div>
        
        <div>
          <span class="block text-sm font-medium mb-2">Outline</span>
          <Select
            options={fruits}
            variant="outline"
            placeholder="Outline variant"
            class="w-full"
          />
        </div>
        
        <div>
          <span class="block text-sm font-medium mb-2">Filled</span>
          <Select
            options={fruits}
            variant="filled"
            placeholder="Filled variant"
            class="w-full"
          />
        </div>
        
        <div>
          <span class="block text-sm font-medium mb-2">Ghost</span>
          <Select
            options={fruits}
            variant="ghost"
            placeholder="Ghost variant"
            class="w-full"
          />
        </div>
        
        <div>
          <span class="block text-sm font-medium mb-2">Underline</span>
          <Select
            options={fruits}
            variant="underline"
            placeholder="Underline variant"
            class="w-full"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- Sizes -->
  <section class="space-y-6">
    <div>
      <h2 class="text-2xl font-semibold mb-4">Sizes</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <span class="block text-sm font-medium mb-2">Small</span>
          <Select
            options={fruits}
            size="sm"
            placeholder="Small size"
            class="w-full"
          />
        </div>
        
        <div>
          <span class="block text-sm font-medium mb-2">Default</span>
          <Select
            options={fruits}
            size="default"
            placeholder="Default size"
            class="w-full"
          />
        </div>
        
        <div>
          <span class="block text-sm font-medium mb-2">Large</span>
          <Select
            options={fruits}
            size="lg"
            placeholder="Large size"
            class="w-full"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- States -->
  <section class="space-y-6">
    <div>
      <h2 class="text-2xl font-semibold mb-4">States</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <span class="block text-sm font-medium mb-2">Normal</span>
          <Select
            options={fruits}
            placeholder="Normal state"
            class="w-full"
          />
        </div>
        
        <div>
          <span class="block text-sm font-medium mb-2 text-muted-foreground">Disabled</span>
          <Select
            options={fruits}
            disabled={true}
            placeholder="Disabled state"
            class="w-full"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- With Some Options Disabled -->
  <section class="space-y-6">
    <div>
      <h2 class="text-2xl font-semibold mb-4">Disabled Options</h2>
      <div class="space-y-4">
        <div>
          <span class="block text-sm font-medium mb-2">Some options disabled:</span>
          <Select
            options={[
              { value: "apple", label: "Apple" },
              { value: "banana", label: "Banana", disabled: true },
              { value: "orange", label: "Orange" },
              { value: "grape", label: "Grape", disabled: true },
              { value: "strawberry", label: "Strawberry" }
            ]}
            placeholder="Try to select..."
            class="w-[200px]"
          />
        </div>
      </div>
    </div>
  </section>
</div>