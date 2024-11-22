
export function timeForTimerStr(time: number): string {
  const ms_per_sec = 1000;
  const ms_per_min = 60 * ms_per_sec;

  const mm = Math.floor((time / ms_per_min) % 60); // Minutes
  const ss = Math.floor((time / ms_per_sec) % 60); // Seconds
  const ms = Math.floor(time % ms_per_sec);        // Milliseconds

  return `${mm.toString().padStart(2, "0")}:${ss.toString().padStart(2, "0")}:${ms.toString().padStart(3, "0")}`;
}

