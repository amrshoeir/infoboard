<script>
  import { onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";
  export let element;

  let src = element.src
  let ndx=0
  let timeLeft=element.imagesDuration[ndx];
  let interval;
  const next = () => {
    ndx = (ndx + 1) % src.length;
    timeLeft=element.imagesDuration[ndx];
  }
  function startAutoPlay() {
    interval = setInterval(() => {
      timeLeft--;
      if (timeLeft === -1) {
        next();
      }
    }, 1000);
  }
  function stopAutoPlay() {
    clearInterval(interval);
  }
  onMount(startAutoPlay)
  onDestroy(stopAutoPlay)
</script>
  <div class="numberText">{ndx+1} / {src.length}</div>
  {#each [src[ndx]] as src (ndx)}
    <img
      {src}
      alt=""
    />
  {/each}
<style>
    .numberText{
        position:absolute;
        color:white;
    }

</style>
