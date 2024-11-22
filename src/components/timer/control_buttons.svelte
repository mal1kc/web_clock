<script lang="ts">
  import { browser } from "$app/environment";

  let {
    onStart,
    onPause,
    onStop,
    onFlag,
  }: {
    onStart: () => void;
    onPause: () => void;
    onStop: () => void;
    onFlag?: () => void;
  } = $props();

  function showButton(button_id: string) {
    if (!browser) return;
    const playButton = document.getElementById("playButton");
    const pauseButton = document.getElementById("pauseButton");

    const buttonToShow = button_id === "play" ? playButton : pauseButton;
    const buttonToHide = button_id === "play" ? pauseButton : playButton;
    if (buttonToShow != null) buttonToShow.style.display = "block";
    if (buttonToHide != null) buttonToHide.style.display = "none";
  }

  function onFlagInternal() {
    if (!onFlag) return;
    onFlag();
  }

  function onStartInternal() {
    onStart();
    showButton("pause");
  }
  function onPauseInternal() {
    onPause();
    showButton("play");
  }
  function onStopInternal() {
    onStop();
    showButton("play");
  }
</script>

<div class="controls flex justify-center gap-4 mt-4">
  {#if onFlag}
    <button
      id="flagButton"
      onclick={onFlagInternal}
      class="p-2 rounded hover:bg-gray-300 focus:outline-none dark:invert"
    >
      <img alt="flag" src="/flag-3.svg" class="w-8 h-8" />
    </button>
  {/if}

  <button
    id="playButton"
    onclick={onStartInternal}
    class="p-2 rounded hover:bg-gray-300 focus:outline-none dark:invert"
  >
    <img alt="play" src="/play.svg" class="w-8 h-8" />
  </button>

  <button
    id="pauseButton"
    onclick={onPauseInternal}
    class="p-2 rounded hidden hover:bg-gray-300 focus:outline-none dark:invert"
  >
    <img alt="pause" src="/pause.svg" class="w-8 h-8" />
  </button>

  <button
    id="stopButton"
    onclick={onStopInternal}
    class="p-2 rounded hover:bg-gray-300 focus:outline-none dark:invert"
  >
    <img alt="stop" src="/stop.svg" class="w-8 h-8" />
  </button>
</div>
