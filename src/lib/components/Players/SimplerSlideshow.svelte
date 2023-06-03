<script lang="ts">
  import {fade} from 'svelte/transition'
  import { onMount } from "svelte";

  export let content
  export let displayElements=[];
  const path='../../../'

  content.forEach((elem)=>{
    console.log(elem.start_time)
    if(elem.end_time > new Date() && elem.start_time < new Date()){
      const count = elem.content_data.content.file_names.length;
      const imgNames = elem.content_data.content.file_names;
      const content_path = `${path}${elem.content_data.content.file_path}`
      let src = imgNames.map(str=>content_path.concat(str))
      let obj = {
        count,
        src,
        duration:elem.duration,
      }
      displayElements.push(obj)
    }
  })
  console.log(displayElements)
  const slides = displayElements.length;
  let ndx = 0
  let durationPercent=100;
  let timeLeft=displayElements[0].duration || 0;
  let interval;
  const next = () => {
    ndx = (ndx + 1) % slides
    durationPercent = 100;
    timeLeft = displayElements[ndx].duration
  }

  function startAutoPlay() {
    //console.log('mounted')
    interval = setInterval(() => {
     // console.log(timeLeft)
      timeLeft--;
      durationPercent = (timeLeft / displayElements[ndx].duration) * 100;
      if (timeLeft === 0) {
        next();
      }
    }, 1000);
    }

    onMount(startAutoPlay)
</script>

<style>
    img, button {
        position: absolute;
    }
</style>

{#each [displayElements[ndx].src] as src}
  {#if displayElements[ndx].src.length > 1}
    {#each src as src}
      <img transition:fade {src} >
    {/each}
  {:else}
    <img transition:fade {src} alt="" />
  {/if}

{/each}

<button on:click={next}>Next!</button>