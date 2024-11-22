<script lang="ts">
  import { browser } from "$app/environment";

  if (browser) {
    let startTime: number;
    let elapsedTime = 0;
    let timerInterval: number;

    let playButton = document.getElementById("playButton");
    let pauseButton = document.getElementById("pauseButton");
    let stopButton = document.getElementById("stopButton");
    let flagButton = document.getElementById("flagButton");

    const stopwatchDisplay = document.getElementById("displayStopwatch");

    const stopwatchFlagsList = document.getElementById("stopwatchFlagsList");

    if (stopwatchFlagsList != null) stopwatchFlagsList.style.display = "none";

    function timeToString(time: number) {
      const diff_hrs = time / 3600_000;
      const hh = Math.floor(diff_hrs);
      const diff_min = (diff_hrs - hh) * 60;
      const mm = Math.floor(diff_min);
      const diff_sec = (diff_min - mm) * 60;
      const ss = Math.floor(diff_sec);

      const diff_ms = (diff_sec - ss) * 60;
      const ms = Math.floor(diff_ms);

      return `${mm.toString().padStart(2, "0")}:${ss.toString().padStart(2, "0")}:${ms.toString().padStart(2, "0")}`;
    }

    function printStopwatch(txt: string) {
      if (stopwatchDisplay != null) {
        stopwatchDisplay.innerHTML = txt;
      }
    }

    function showButton(button_id: string) {
      const buttonToShow = button_id === "play" ? playButton : pauseButton;
      const buttonToHide = button_id === "play" ? pauseButton : playButton;
      if (buttonToShow != null) buttonToShow.style.display = "block";
      if (buttonToHide != null) buttonToHide.style.display = "none";
    }

    function startStopwatch() {
      startTime = Date.now() - elapsedTime;
      timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        printStopwatch(timeToString(elapsedTime));
      }, 10);
      showButton("pause");
    }

    function pauseStopwatch() {
      clearInterval(timerInterval);
      showButton("play");
    }

    function stopStopwatch() {
      clearInterval(timerInterval);
      printStopwatch("00:00:00");
      elapsedTime = 0;
      showButton("play");
      if (stopwatchFlagsList == null) return;
      stopwatchFlagsList.innerHTML = "";
      stopwatchFlagsList.style.display = "none";
    }

    function flagStopwatch() {
      if (stopwatchFlagsList == null) return;

      stopwatchFlagsList.style.display = "block";

      let newLiElement = document.createElement("li");
      newLiElement.className =
        "border p-4 border-cool_gray flex justify-between items-center";

      let newLiElementSpan = document.createElement("span");
      newLiElementSpan.classList.add(
        "time",
        "text-space_cate",
        "dark:text-penn_red",
      );
      newLiElementSpan.innerText = timeToString(elapsedTime);

      let removeButton = document.createElement("button");
      removeButton.classList.add(
        "ml-4",
        "text-red-500",
        "hover:text-red-700",
        "text-sm",
      );
      removeButton.innerText = "Remove";
      removeButton.addEventListener("click", () => {
        newLiElement.remove();
        if (stopwatchFlagsList.children.length === 0) {
          stopwatchFlagsList.style.display = "none";
        }
      });

      newLiElement.appendChild(newLiElementSpan);
      newLiElement.appendChild(removeButton);

      stopwatchFlagsList.appendChild(newLiElement);
    }

    playButton?.addEventListener("click", startStopwatch);
    pauseButton?.addEventListener("click", pauseStopwatch);
    stopButton?.addEventListener("click", stopStopwatch);
    flagButton?.addEventListener("click", flagStopwatch);
  }
</script>

<div class="stopwatch flex flex-col items-center gap-6 p-6">
  <!-- Title -->
  <h1 class="text-2xl font-bold text-center">Stopwatch</h1>

  <!-- Stopwatch Circle -->
  <div
    class="circle flex items-center justify-center w-64 h-64 border-4 rounded-full"
  >
    <span class="time text-4xl" id="displayStopwatch"> 00:00:00 </span>
  </div>

  <!-- Controls -->
  <div class="controls flex justify-center gap-4 mt-4">
    <button
      id="flagButton"
      class="p-2 rounded hover:bg-vista_blue-200 dark:hover:bg-gray-800 focus:outline-none"
    >
      <img alt="flag" src="/flag-3.svg" loading="lazy" class="w-8 h-8" />
    </button>

    <button
      id="playButton"
      class="p-2 rounded hover:bg-vista_blue-200 dark:hover:bg-gray-800 focus:outline-none"
    >
      <img
        id="playImg"
        alt="play"
        src="/play.svg"
        loading="lazy"
        class="w-8 h-8"
      />
    </button>

    <button
      id="pauseButton"
      class="p-2 rounded hidden hover:bg-vista_blue-200 dark:hover:bg-gray-800 focus:outline-none"
    >
      <img
        id="pauseImg"
        alt="pause"
        src="/pause.svg"
        loading="lazy"
        class="w-8 h-8"
      />
    </button>

    <button
      id="stopButton"
      class="p-2 rounded hover:bg-vista_blue-200 dark:hover:bg-gray-800 focus:outline-none"
    >
      <img alt="stop" src="/stop.svg" loading="lazy" class="w-8 h-8" />
    </button>
  </div>

  <!-- Flags List -->
  <div id="stopwatchFlagsDiv" class="w-full max-w-md">
    <ol
      role="list"
      id="stopwatchFlagsList"
      class="hidden list-none p-4 space-y-2 border border-vista_blue-300 rounded-lg shadow dark:border-gray-700"
    ></ol>
  </div>
</div>

<style>
  .stopwatch {
    display: grid;
    justify-items: center;
    grid-row-gap: 23px;
    width: 100%;
    padding-top: 25px;
  }

  .circle {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 270px;
    width: 270px;

    border: 2px solid;
    border-radius: 50%;
  }

  .time {
    font-weight: 300;
    font-size: 48px;
  }

  .controls {
    display: flex;
    justify-content: space-between;

    width: 187px;
  }

  button {
    cursor: pointer;
    background: transparent;
    padding: 0;
    border: none;
    margin: 0;
    outline: none;
  }

  #pauseButton {
    display: none;
  }
</style>
