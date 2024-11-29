<script lang="ts">
  let {
    exported_time_str = "00:00:00",
    input_upt_focusout,
    input_upt_focusin,
  }: {
    exported_time_str: string;
    input_upt_focusout?: (event: FocusEvent) => void;
    input_upt_focusin?: (event: FocusEvent) => void;
  } = $props();
</script>

<div
  class="circle flex items-center justify-center w-64 h-64 border-4 rounded-full"
>
  {#if input_upt_focusout && input_upt_focusin}
    <div class="grid grid-row-2">
      <input
        onfocusout={input_upt_focusout}
        onfocusin={input_upt_focusin}
        class="time text-4xl bg-inherit flex w-auto h-auto hover:text-5xl"
        id="displayStopwatch"
        value={exported_time_str}
      />
      <span class="flex justify-center text-sm"> click to edit </span>
    </div>
  {:else}
    <span class="time text-4xl" id="displayStopwatch">
      {exported_time_str}
    </span>
  {/if}
</div>

<style lang="postcss">
  .circle {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 270px;
    width: 270px;

    border: 2px solid;
    border-radius: 50%;
  }

  #displayStopwatch {
    justify-content: center;
    text-align: center;
    display: flex;
    padding: -50%;
  }
</style>
