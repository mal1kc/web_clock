<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  let { timezone = $bindable() }: { timezone: string } = $props();
  const default_tz = "Europe/Istanbul";
  let hour_hand_degree = 0;
  let min_hand_degree = 0;
  let second_hand_degree = 0;
  const second_hand_angular_vel = (1 / 60) * 360;
  let clockCanvas: HTMLCanvasElement;

  let clock_interval: number;
  let canvas_interval: number;

  let time = $state(updateClock(timezone ?? default_tz));

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

  function drawMarks(ctx: CanvasRenderingContext2D, radius: number) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    for (let i = 0; i < 12; i++) {
      ctx.save();
      ctx.rotate((i * Math.PI) / 6);
      ctx.beginPath();
      ctx.moveTo(0, -radius + 10);
      ctx.lineTo(0, -radius + 25);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }
  }

  function drawHand(
    ctx: CanvasRenderingContext2D,
    degree: number,
    length: number,
    width: number,
    color = "black",
  ) {
    const radians = (degree * Math.PI) / 180;
    ctx.save();
    ctx.rotate(radians);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -length);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  function drawClock(ctx: CanvasRenderingContext2D, radius: number) {
    ctx.clearRect(0, 0, clockCanvas.width, clockCanvas.height);
    ctx.translate(radius, radius);
    ctx.rotate(-Math.PI / 2);

    ctx.beginPath();
    ctx.arc(0, 0, radius - 10, 0, 2 * Math.PI);
    ctx.strokeStyle = "lightgray";
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.closePath();

    drawMarks(ctx, radius);

    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    // + 90 fix ;

    const hourHandDegree = (hour % 12) * 30 + minute * 0.5 + 90;

    const minuteHandDegree = minute * 6 + 90;

    const secondHandDegree = second * (360 / 60) + 90;

    drawHand(ctx, hourHandDegree, radius - 40, 6);
    drawHand(ctx, minuteHandDegree, radius - 20, 4);
    drawHand(ctx, secondHandDegree, radius - 50, 2, "red");
    ctx.rotate(Math.PI / 2);
    ctx.translate(-radius, -radius);
  }

  onMount(() => {
    clock_interval = setInterval(() => {
      time = updateClock(timezone ?? default_tz);
    }, 1000);
    // clockCanvas = document.createElement("canvas");
    clockCanvas.classList.add("rounded-full", "shadow");
    const canvas_ctx = clockCanvas.getContext("2d");
    const radius = clockCanvas.width / 2;
    if (canvas_ctx != null) {
      canvas_interval = setInterval(() => {
        drawClock(canvas_ctx, radius);
      }, 1000);
    }
  });

  onDestroy(() => {
    clearInterval(clock_interval);
    clearInterval(canvas_interval);
  });
</script>

<div class="clockDiv flex flex-col items-center stify-center">
  <canvas bind:this={clockCanvas} width="300" height="300" class="dark:invert"
  ></canvas>
  <div class="flex mt-10 items-center justify-center font-bold">
    {time.getHours()}:{time.getMinutes().toString().padStart(2, "0")}:{time
      .getSeconds()
      .toString()
      .padStart(2, "0")}
  </div>
</div>
