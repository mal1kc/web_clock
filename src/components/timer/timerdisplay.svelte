<script lang="ts">
  export let time: string = "00:00:00";
</script>

<div
  class="circle flex items-center justify-center w-64 h-64 border-4 rounded-full"
>
  <span class="time text-4xl" id="displayStopwatch"> {time} </span>
</div>

<style>
  .circle {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 270px;
    width: 270px;

    border: 2px solid;
    border-radius: 50%;
  }
</style>
