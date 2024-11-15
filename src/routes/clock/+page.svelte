<script lang="ts">
  import Timezoneselector from "../timezoneselector.svelte";
  import Clock from "../clock.svelte";
</script>

<main class="text-center items-center">
  <Timezoneselector />
  <h1 class="text-2xl font-bold mb-4">Timezone Clock</h1>
  <Clock timezone={undefined} />
</main>

<style>
</style>
