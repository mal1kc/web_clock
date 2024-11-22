<script lang="ts">
  import { onMount } from "svelte";
  import {
    change_def_timezone_for_clock_page_settings,
    getClockPageSettings,
  } from "../stores/clock_store";

  let {
    on_tz_change_func,
    default_selection,
  }: {
    on_tz_change_func: (new_tz: string) => void;
    default_selection: string | null;
  } = $props();

  // Reactive state for the selected timezone
  // let selected_clockpage_data = getClockPageSettings();
  // List of available timezones
  let selected_tz = $state(getClockPageSettings().def_timezone);
  let timezones: string[] = $state([]);

  // Fetch supported timezones on mount and set default
  onMount(() => {
    timezones = Intl.supportedValuesOf("timeZone");
    if (default_selection != null && timezones.includes(default_selection)) {
      selected_tz = default_selection;
    } else {
      // Set default timezone to the system's timezone if not already set
      if (!selected_tz) {
        selected_tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.debug("setting tz to system default", selected_tz);

        change_def_timezone_for_clock_page_settings(selected_tz);
      }
    }
    console.debug("current def_tz", selected_tz);
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
    bind:value={selected_tz}
    onchange={handleTimezoneChange}
    class="m-2 inline-block text-center w-auto border bounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 dark:bg-rich_black dark:text-vista_blue text-raisin_black bg-floral_white"
  >
    {#each timezones as timezone}
      <option value={timezone}>{timezone}</option>
    {/each}
  </select>
</div>
