<script lang="ts">
  import { onMount } from "svelte";
  import { clock_timezone } from "./clock_store";

  // Define a writable store to hold the selected timezone
  export const selectedTimezone = clock_timezone;

  // This will hold the list of timezones, you could also fetch from an API
  let timezones: string[] = [];

  // A mock function to simulate fetching timezones, you could use a package like `timezone-list`
  onMount(() => {
    // For now, using a hardcoded list or you could use a package like `timezone-list`
    // timezones = [
    //   "Atlantic/Reykjavik",
    //   "Europe/Istanbul",
    //   "Europe/Berlin",
    //   "America/New_York",
    //   "Asia/Tokyo",
    //   "Australia/Sydney",
    // ];

    timezones = Intl.supportedValuesOf("timeZone");

    selectedTimezone.set(Intl.DateTimeFormat().resolvedOptions().timeZone); // Set default to the first timezone
  });

  // Handle timezone change (this could be connected to a custom event or other logic)
  function handleTimezoneChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement.value in timezones) {
      updatetz(selectElement.value);
    }
  }
  function updatetz(new_tz: string) {
    selectedTimezone.set(new_tz);
  }
</script>

<div>
  <label for="timezone" class="block text-lg dark:text-rich_black-700">
    Select Timezone:
  </label>

  <select
    id="timezone"
    bind:value={$selectedTimezone}
    on:change={handleTimezoneChange}
    class="m-2 inline-block text-center w-auto border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
  >
    {#each timezones as timezone}
      <option value={timezone}>{timezone}</option>
    {/each}
  </select>
</div>
