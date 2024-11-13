<script lang="ts">
  import Timezoneselector from "../timezoneselector.svelte";
  import Clock from "../clock.svelte"; // Adjust the path as necessary

  let selectedTimezone: string = $state(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  ); // Default timezone
  function updateTimezone(newTimezone: string) {
    selectedTimezone = newTimezone;
  }
</script>

<main>
  <h1 class="text-2xl font-bold mb-4">Timezone Clock</h1>
  <Timezoneselector />
  <Clock timezone={selectedTimezone} />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }
</style>
