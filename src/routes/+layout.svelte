<script lang="ts">
  import { browser } from "$app/environment";
  import { base } from "$app/paths";
  import "../app.css";
  import { theme, toggleTheme } from "../theme";
  let { children } = $props();
  let svelte_logo = $state("/stelve.svg");
  let currentTheme;
  theme.subscribe((value: string) => {
    currentTheme = value;
    // Set the 'dark' class on the <html> element based on the theme
    if (currentTheme === "dark") {
      if (browser) {
        document.documentElement.classList.add("dark");
      }
      svelte_logo =
        "https://github.com/sveltejs/svelte.dev/raw/refs/heads/main/packages/site-kit/src/lib/branding/svelte-dark.svg";
    } else {
      svelte_logo =
        "https://github.com/sveltejs/svelte.dev/raw/refs/heads/main/packages/site-kit/src/lib/branding/svelte.svg";
      if (browser) {
        document.documentElement.classList.remove("dark");
      }
    }
  });
</script>

<header>
  <h1
    class="flex center items-center justify-center dark:bg-rich_black dark:text-vista_blue text-raisin_black bg-floral_white text-6xl"
  >
    <a href={base}> web clock </a>
  </h1>
</header>

<div>
  <button
    onclick={toggleTheme}
    class="absolute top-0 right-10 p-2 hover:underline hover:underline-offset-4 rounded-full transition text-2xl"
  >
    Toggle Dark Mode
  </button>
</div>

<main
  class="flex flex-grow items-center justify-center dark:bg-rich_black dark:text-vista_blue text-raisin_black bg-floral_white text-4xl"
>
  {@render children()}
</main>

<!-- Footer section -->
<footer
  class="flex flex-col items-center gap-10 justify-center dark:bg-rich_black dark:text-vista_blue text-raisin_black bg-floral_white text-2xl"
>
  <div class="flex columns-3 gap-10">
    <a
      class="flex items-center gap-2 hover:underline hover:underline-offset-4 dark:invert"
      href={base}
    >
      <img
        aria-hidden="true"
        src="{base}/clock.svg"
        alt="Clock icon"
        width="16"
        height="16"
      />
      clock
    </a>
    <a
      class="flex items-center gap-2 hover:underline hover:underline-offset-4 dark:invert"
      href="{base}/stopwatch"
    >
      <img
        aria-hidden="true"
        src="{base}/stopwatch.svg"
        alt="Stopwatch icon"
        width="16"
        height="16"
      />
      stopwatch
    </a>
    <a
      class="flex items-center gap-2 hover:underline hover:underline-offset-4 dark:invert"
      href="{base}/timer"
    >
      <img
        aria-hidden="true"
        src="{base}/timer.svg"
        alt="haurglass"
        width="16"
        height="16"
      />
      timer
    </a>
    <a
      class="flex items-center gap-2 hover:underline hover:underline-offset-4 dark:invert"
      href="{base}/world_clock"
    >
      <img
        aria-hidden="true"
        src="{base}/globe.svg"
        alt="Globe icon"
        width="16"
        height="16"
      />
      world clock
    </a>
  </div>
  <div class="flex text-center">
    built with
    <img
      class="inline-block ml-4"
      src={svelte_logo}
      alt="svelte_logo"
      width="38"
      height="19"
      loading="lazy"
    />
  </div>
</footer>

<style lang="postcss">
  /* Optional: If you need to define fonts or custom global styles */
  :global(body) {
    font-family: "Iosevka";
    @apply dark:text-vista_blue text-raisin_black  bg-floral_white;
    @apply flex flex-col h-screen justify-between;
  }

  :global(*),
  :global(html) {
    margin: 0;
    padding: 0;
  }
</style>
