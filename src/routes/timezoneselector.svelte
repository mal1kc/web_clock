<script lang="ts">
  import { onMount } from "svelte";
  import {
    change_def_timezone_for_clock_page_settings,
    getClockPageSettings,
  } from "./clock_store";

  let {
    on_tz_change_func,
  }: {
    on_tz_change_func: (new_tz: string) => void;
  } = $props();

  // Reactive state for the selected timezone
  let selected_clockpage_data = getClockPageSettings();
  // List of available timezones
  let timezones: string[] = $state([]);

  // Fetch supported timezones on mount and set default
  onMount(() => {
    timezones = Intl.supportedValuesOf("timeZone");
    // Set default timezone to the system's timezone if not already set
    if (!selected_clockpage_data.def_timezone) {
      selected_clockpage_data.def_timezone =
        Intl.DateTimeFormat().resolvedOptions().timeZone;
      console.debug(
        "setting tz to system default",
        selected_clockpage_data.def_timezone,
      );

      change_def_timezone_for_clock_page_settings(
        selected_clockpage_data.def_timezone,
      );
    }
    console.debug("current def_tz", selected_clockpage_data.def_timezone);
  });

  // Save updated timezone to both reactive state and cookies
  function handleTimezoneChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const newTimezone = selectElement.value;
    if (timezones.includes(newTimezone)) {
      if (typeof on_tz_change_func != "undefined") {
        on_tz_change_func(newTimezone);
      }
    }
  }
</script>

<div>
  <label for="timezone" class="block text-lg dark:text-rich_black-700">
    Select Timezone:
  </label>

  <select
    id="timezone"
    bind:value={selected_clockpage_data.def_timezone}
    onchange={handleTimezoneChange}
    class="m-2 inline-block text-center w-auto border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
  >
    {#each timezones as timezone}
      <option value={timezone}>{timezone}</option>
    {/each}
  </select>
</div>
