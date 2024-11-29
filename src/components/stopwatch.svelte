<script lang="ts">
  import { browser } from "$app/environment";
  import { timeForTimerStr } from "../utils/timeUtils";
  import ControlButtons from "./timer/control_buttons.svelte";
  import Timerdisplay from "./timer/timerdisplay.svelte";
  let elapsedTime = $state(0);
  let timerInterval: number;
  let flags: number[] = $state([]);
  let isPaused = true;

  function startStopwatch() {
    if (!isPaused) return;
    isPaused = false;
    const startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
    }, 10);
  }

  function pauseStopwatch() {
    isPaused = true;
    clearInterval(timerInterval);
  }

  function stopStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    flags = [];
    isPaused = true;
  }

  function flagStopwatch() {
    flags = [...flags, elapsedTime];
  }
  function onFlaglistRemove(indx: number) {
    flags = flags.filter((_, i) => i != indx);
  }
</script>

<div class="stopwatch flex flex-col items-center gap-6 p-6">
  <h1 class="text-2xl font-bold text-center">Stopwatch</h1>
  <Timerdisplay exported_time_str={timeForTimerStr(elapsedTime)} />
  <ControlButtons
    onStart={startStopwatch}
    onStop={stopStopwatch}
    onPause={pauseStopwatch}
    onFlag={flagStopwatch}
  />

  <div class="flags-list w-full max-w-md">
    {#if flags.length > 0}
      <ol
        class="list-none p-4 space-y-2 border border-vista_blue-300 rounded shadow dark:border-gray-700"
      >
        {#each flags as flag, index}
          <li
            class="flex border p-4 border-cool_gray flex justify-between items-center rounded"
          >
            <span class="time text-space_cate dark:text-penn_red"
              >{timeForTimerStr(flag)}</span
            >
            <button
              onclick={() => onFlaglistRemove(index)}
              class="text-red-500 hover:text-red-700 text-sm"
            >
              remove
            </button>
          </li>
        {/each}
      </ol>
    {/if}
  </div>
</div>
