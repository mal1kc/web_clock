<script lang="ts">
  import Timer from "../../components/timer.svelte";
  let initial_timer_value = 60_000; // 1 min as ms
</script>

<Timer inital_remainin_time={initial_timer_value} />
