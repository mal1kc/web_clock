<script lang="ts">
  import Clock from "../clock.svelte";
  import {
    getClockPageSettings,
    change_worldclock_tz_for_clock_page_settings,
  } from "../clock_store";
  import Timezoneselector from "../timezoneselector.svelte";

  let current_wc_data = getClockPageSettings();

  // Ensure reactivity when settings are updated
  $: selected_timezones = current_wc_data.world_clock_timezones;

  function genAddTimezoneFunc(indx: number) {
    return function addTimezone(newTz: string) {
      if (Intl.supportedValuesOf("timeZone").includes(newTz)) {
        change_worldclock_tz_for_clock_page_settings(newTz, indx);
        current_wc_data = getClockPageSettings();
      } else {
        console.error("Invalid timezone:", newTz);
      }
    };
  }
</script>

<main
  class="grid grid-rows-3 grid-cols-3 justify-center items-center align-middle"
>
  {#each selected_timezones as tz, indx}
    <div class="m-10 text-4xl justify-center items-center text-center">
      <Timezoneselector
        default_selection={tz}
        on_tz_change_func={genAddTimezoneFunc(indx)}
      />
      <Clock timezone={tz} />
    </div>
  {/each}
</main>
