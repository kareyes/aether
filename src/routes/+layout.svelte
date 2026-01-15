<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import { Moon, Sun } from "@lucide/svelte";
	import { onMount } from "svelte";

	let { children } = $props();

	let isDark = $state(false);

	onMount(() => {
		// Check for saved theme preference or default to light mode
		const savedTheme = localStorage.getItem("theme");
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;

		isDark = savedTheme === "dark" || (!savedTheme && prefersDark);

		// Apply theme
		if (isDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	});

	function toggleTheme() {
		isDark = !isDark;

		if (isDark) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="relative min-h-screen">
	<!-- Dark Mode Toggle -->
	<button
		onclick={toggleTheme}
		class="fixed top-4 right-4 z-50 inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background border border-input shadow-sm"
		aria-label="Toggle theme"
	>
		{#if isDark}
			<Sun class="size-5" />
		{:else}
			<Moon class="size-5" />
		{/if}
	</button>

	{@render children?.()}
</div>
