<script lang="ts">
  import Clock from "../clock.svelte";
  import {
    getClockPageSettings,
    change_worldclock_tz_for_clock_page_settings,
  } from "../clock_store";

  // Load initial clock settings from cookies or defaults
  let current_wc_data = getClockPageSettings();

  // Ensure reactivity when settings are updated
  $: selected_timezones = current_wc_data.world_clock_timezones;

  // Add a new timezone to the list
  function addTimezone(newTz: string) {
    if (Intl.supportedValuesOf("timeZone").includes(newTz)) {
      change_worldclock_tz_for_clock_page_settings(newTz);
      // Refresh current data to reflect updates
      current_wc_data = getClockPageSettings();
    } else {
      console.error("Invalid timezone:", newTz);
    }
  }
</script>

<main
  class="grid grid-rows-3 grid-cols-3 justify-center items-center align-middle"
>
  {#each selected_timezones as tz}
    <div class="m-10 text-4xl justify-center items-center text-center">
      <p>{tz}</p>
      <Clock timezone={tz} />
    </div>
  {/each}
</main>
