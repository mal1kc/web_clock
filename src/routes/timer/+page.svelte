<script lang="ts">
  import Timer from "../../components/timer.svelte";
  let inital_remainin_time = 600_001; //10  min as ms + 1 ms
</script>

<Timer {inital_remainin_time} />
