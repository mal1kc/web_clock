<script lang="ts">
  import Timezoneselector from "./timezoneselector.svelte";
  import Clock from "./clock.svelte";
  import {
    change_def_timezone_for_clock_page_settings,
    getClockPageSettings,
  } from "./clock_store";

  let curent_tz: string = getClockPageSettings().def_timezone;

  function handleTimezoneChange(new_tz: string) {
    curent_tz = new_tz;
    change_def_timezone_for_clock_page_settings(curent_tz);
  }
</script>

<main class="text-center items-center">
  <Timezoneselector on_tz_change_func={handleTimezoneChange} />
  <h1 class="text-2xl font-bold mb-4">Timezone Clock</h1>
  <Clock timezone={curent_tz} />
</main>

<style>
</style>
