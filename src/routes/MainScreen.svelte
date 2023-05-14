<script lang="ts">
  import {crossfade,fade,blur} from 'svelte/transition'
  import { onMount } from "svelte";
  import Gallery from "./Gallery.svelte"

  export let content
  export let displayElements=[];
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
  const path='../../../'
  let slides = displayElements.length;
  let ndx = 0;
  export let durationPercent=100;
  let timeLeft=displayElements[0].duration || 0;
  let interval;
  let count;

  const next = () => {
    ndx = (ndx + 1) % slides
    durationPercent = 100;
    timeLeft = displayElements[ndx].duration
    count = displayElements[ndx].count;
  //   if(count>1){
  //     slides += count;
  //     ndx = galleryNdx;
  // }
  }
  function startAutoPlay() {
    interval = setInterval(() => {
      timeLeft--;
      durationPercent = (timeLeft / displayElements[ndx].duration) * 100;
      if (timeLeft === 0) {
        next();
      }
    }, 1000);
    }
  onMount(startAutoPlay)
</script>
<div class="container">
  {#each displayElements[ndx].src as src}
    {#if displayElements[ndx].count > 1}
        <img {src} alt="" >
        <Gallery {src}/>
    {:else}
      <img {src} alt="" />
    {/if}
  {/each}
  <button on:click={()=>next()} style="position:fixed;">next!</button>
  <div class="duration-bar">
    <div class="duration-bar-inner" style="width: {durationPercent}%"></div>
  </div>
</div>


<style>
    .container{
        display:flex;
        justify-content: center;
        aspect-ratio:9/16;
        margin:0 auto;
        max-width:27vw;
        padding-bottom:5px;
    }
    .duration-bar{
        width: 100vw;
        height: 4px;
        background-color: #ddd;
        position:absolute;
        bottom: 0;
    }
    .duration-bar-inner {
        height: 100%;
        background-color: #2196f3; /* Blue color */
        transition: width 1s linear;
    }

</style>