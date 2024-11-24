<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  let { timezone = $bindable() }: { timezone: string } = $props();
  const default_tz = "Europe/Istanbul";

  let hour_hand_degree = $state(0);
  let min_hand_degree = $state(0);
  let second_hand_degree = $state(0);
  const second_hand_angular_vel = (1 / 60) * 360;

  onMount(() => {
    updateClock(timezone ?? default_tz);
    setInterval(updateClock, 1000);
  });

  let time = $state(updateClock(timezone ?? default_tz));

  let interval: number;

  function updateClock(tz: string): Date {
    let updated_time = changeTimeZone(new Date(), tz);
    hour_hand_degree =
      30 * updated_time.getHours() + 0.5 * updated_time.getMinutes();
    min_hand_degree = updated_time.getMinutes() * 6;
    second_hand_degree = updated_time.getSeconds() * second_hand_angular_vel;
    return updated_time;
  }

  function changeTimeZone(date: string | Date, timeZone: string): Date {
    if (typeof date === "string") {
      return new Date(
        new Date(date).toLocaleString("en-US", {
          timeZone,
        }),
      );
    }

    return new Date(
      date.toLocaleString("en-US", {
        timeZone,
      }),
    );
  }

  // Example of setting an interval to update the clock every second
  interval = setInterval(() => {
    time = updateClock(timezone ?? default_tz);
  }, 1000);

  onDestroy(() => {
    clearInterval(interval);
  });

  const marks = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
</script>

<div class="flex flex-col items-center stify-center">
  <svg
    class="w-auto h-auto transform rotate-90 dark:invert"
    viewBox="0 0 200 200"
  >
    <circle
      cx="100"
      cy="100"
      r="90"
      stroke="lightgray"
      stroke-width="10"
      fill="none"
    />
    {#each marks as mark, index}
      <line
        id="clock-min-{mark}"
        x1="10"
        y1="100"
        x2="25"
        y2="100"
        stroke="lightgray"
        stroke-width="2"
        transform="rotate({index * 30} 100 100)"
      />
    {/each}

    <line
      x1="45"
      y1="100"
      x2="100"
      y2="100"
      stroke="black"
      stroke-width="2"
      transform="rotate({hour_hand_degree} 100 100)"
    />
    <line
      x1="20"
      y1="100"
      x2="100"
      y2="100"
      stroke="black"
      stroke-width="2"
      transform="rotate({min_hand_degree} 100 100)"
    />
    <line
      x1="15"
      y1="100"
      x2="100"
      y2="100"
      stroke="red"
      stroke-width="2"
      transform="rotate({second_hand_degree} 100 100)"
    />
  </svg>
  <div class="flex mt-10 items-center justify-center font-bold">
    {time.getHours()}:{time.getMinutes().toString().padStart(2, "0")}:{time
      .getSeconds()
      .toString()
      .padStart(2, "0")}
  </div>
</div>

<style>
  svg {
    transform-origin: center;
    display: block;
    align-content: center;
  }
</style>
