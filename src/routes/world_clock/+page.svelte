<script lang="ts">
  import Clock from "../clock.svelte";
  import { world_clock_data } from "../world_clock_store";
  interface WorldClockSettings {
    selected_timezone_list: string[];
  }
  let current_wc_data: WorldClockSettings;

  world_clock_data.subscribe((new_wcs_data) => {
    if (new_wcs_data) {
      current_wc_data = new_wcs_data;
    }
  });
</script>

<main
  class="grid grid-rows-3 grid-cols-3 justify-center items-center align-middle"
>
  {#each current_wc_data.selected_timezone_list as tz}
    <div class="m-10 text-4xl justify-center items-center text-center">
      <p>{tz}</p>
      <Clock timezone={tz} />
    </div>
  {/each}
</main>

<style></style>
