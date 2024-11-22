<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  let { timezone = $bindable() }: { timezone: string } = $props();
  const default_tz = "Europe/Istanbul";

  onMount(() => {
    updateClock(timezone ?? default_tz);
    setInterval(updateClock, 1000);
  });

  let time = $state(updateClock(timezone ?? default_tz));

  let interval: number;

  function updateClock(tz: string): Date {
    return changeTimeZone(new Date(), tz);
  }

  function changeTimeZone(date: string | Date, timeZone: string) {
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

    <line
      id="clock-min-45"
      x1="100"
      y1="175"
      x2="100"
      y2="190"
      stroke="lightgray"
      stroke-width="2"
    />
    <line
      id="clock-min-15"
      x1="100"
      y1="25"
      x2="100"
      y2="10"
      stroke="lightgray"
      stroke-width="2"
    />

    <line
      id="clock-min-30"
      x1="190"
      y1="100"
      x2="175"
      y2="100"
      stroke="lightgray"
      stroke-width="2"
    />

    <line
      id="clock-min-0"
      x1="10"
      y1="100"
      x2="25"
      y2="100"
      stroke="lightgray"
      stroke-width="2"
    />

    <line
      x1="100"
      y1="100"
      x2="100"
      y2="10"
      stroke="black"
      stroke-width="2"
      transform="rotate({(time.getHours() % 12) * 30 +
        time.getMinutes() * 0.5} 100 100)"
    />
    <line
      x1="100"
      y1="100"
      x2="100"
      y2="30"
      stroke="black"
      stroke-width="2"
      transform="rotate({time.getMinutes() * 6} 100 100)"
    />
    <line
      x1="100"
      y1="100"
      x2="100"
      y2="50"
      stroke="red"
      stroke-width="2"
      transform="rotate({time.getSeconds() * 6} 100 100)"
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
