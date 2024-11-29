<script lang="ts">
  import TimeDisplay from "./timer/timerdisplay.svelte";
  import ControlButtons from "./timer/control_buttons.svelte";
  import { timeForTimerStr } from "../utils/timeUtils";

  let {
    inital_remainin_time = 600_001, //10  min as ms + 1 ms
  }: {
    inital_remainin_time: number;
  } = $props();

  let remainingTime = $state(inital_remainin_time);
  let timerInterval: number;
  let isPaused = true;
  let showMessage = $state(false);
  let input_bind: HTMLSpanElement;

  function flashScreen() {
    const flashEffect = document.createElement("div");
    flashEffect.classList.add(
      "fixed",
      "inset-0",
      "bg-white",
      "opacity-50",
      "animate-pulse",
      "z-50",
    );
    document.body.appendChild(flashEffect);
    setTimeout(() => flashEffect.remove(), 500);
  }

  function notifyTimerEnd() {
    const notify_snd = new Audio("/timer-alert.ogg");
    notify_snd.play();
    navigator.vibrate?.([500, 200, 500, 300, 600]);
    Notification?.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("Timer Ended!", {
          body: "Your timer has finished.",
          icon: "/timer-bell.svg",
        });
      }
    });
    flashScreen();
    showMessage = true;
    stop();
  }

  function start() {
    if (!isPaused) return;
    isPaused = false;
    const endTime = Date.now() + remainingTime;
    timerInterval = setInterval(() => {
      remainingTime = endTime - Date.now();
      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        remainingTime = 0;
        notifyTimerEnd();
      }
    }, 10);
  }

  function pause() {
    clearInterval(timerInterval);
    isPaused = true;
  }

  function stop() {
    clearInterval(timerInterval);
    remainingTime = inital_remainin_time;
    isPaused = true;
  }
  function closeMessage() {
    showMessage = false;
  }

  function convertToMilliseconds(timeString: string): number | null {
    timeString = timeString.trim();

    // Regular expression for mm:ss:msms format
    const mmssmsRegex = /^(\d+):(\d+):(\d+)$/;
    // Regular expression for xxxxx format
    const msRegex = /^(\d+)$/;

    let match;

    // Check for mm:ss:msms format
    if ((match = timeString.match(mmssmsRegex))) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      const milliseconds = parseInt(match[3], 10);
      return minutes * 60 * 1000 + seconds * 1000 + milliseconds;
    } else if ((match = timeString.match(msRegex))) {
      return parseInt(match[1], 10);
    }

    return null;
  }

  function input_updt(event: FocusEvent) {
    pause();
    const cr_rem_time = remainingTime;
    const html_ie = event.target as HTMLInputElement;
    if (html_ie) {
      console.debug("html_ie val", html_ie.value);
      remainingTime = convertToMilliseconds(html_ie.value) ?? remainingTime;
    }
    // console.debug(html_ie);
    // console.debug("init rem time", inital_remainin_time);
    // console.debug("rem time", remainingTime);
    if (cr_rem_time != remainingTime) {
      inital_remainin_time = remainingTime;
      stop();
      return;
    }
    start();
  }

  function input_focusin(event: FocusEvent) {
    pause();
  }
</script>

<div class="timer flex flex-col items-center gap-6 p-6">
  <h1 class="text-2xl font-bold text-center">Timer</h1>
  <TimeDisplay
    exported_time_str={timeForTimerStr(remainingTime)}
    input_upt_focusout={input_updt}
    input_upt_focusin={input_focusin}
  />
  <ControlButtons onStart={start} onPause={pause} onStop={stop} />
  {#if showMessage}
    <div
      class="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gray-800 text-white p-6 rounded-lg shadow-lg"
    >
      <h2 class="text-xl font-semibold">Timer Ended</h2>
      <p class="mt-2">Your timer has finished. Please take action.</p>
      <button
        class="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        onclick={closeMessage}
      >
        Dismiss
      </button>
    </div>
    <div class="fixed inset-0 bg-black opacity-50 z-40"></div>
  {/if}
</div>
