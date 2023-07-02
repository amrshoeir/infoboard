<script lang="ts">
  import { onMount } from "svelte";
  import Image from "../layouts/Image.svelte";
  import Fullscreen from "svelte-fullscreen";
  import { base } from "$app/paths";
  export let content
  export let durationPercent=100;
  export let displayElements=[];
  export let components;
  content.forEach((elem)=>{
    let fileNames;
    let src;
    let layout;
    let imagesDuration;
    let misc;
    if(elem.content_data.youtube){
      src=elem.content_data.path
      layout='Video'
      misc='youtube'
    }else{
      fileNames = elem.content_data.file_names;
      const content_path = `${elem.content_data.path}`;
      src = fileNames.map(str=>content_path.concat(str));
      layout=elem.content_data.layout
    }
    const component = components[layout];
    if(layout == 'Gallery'){
      imagesDuration=elem.content_data.durationArray;
    }
    if(elem.end_time > new Date() && elem.start_time < new Date()){
      let obj = {
        src,
        duration:elem.duration,
        component,
        imagesDuration,
        misc
      }
      displayElements.push(obj)
    }
  })
  if(displayElements.length==0){
    displayElements=[{count:0,src:"#",duration:0, component:Image} ]
  }
  let slides = displayElements.length;
  let ndx = 0;
  let timeLeft=displayElements[0]? displayElements[0].duration:  0;
  let interval;
  let count;

   const next = () => {
    ndx = (ndx + 1) % slides
    durationPercent = 100;
    timeLeft = displayElements[ndx].duration
    count = displayElements[ndx].count;
  }
  function startAutoPlay() {
    interval = setInterval(() => {
      timeLeft--;
      durationPercent = (timeLeft / displayElements[ndx].duration) * 100;
      if (timeLeft === -1) {
        next();
      }
    }, 1000);
    }
  onMount(startAutoPlay)
</script>
<Fullscreen  let:onToggle let:onRequest>
<div class="player">
  {#each [displayElements[ndx]] as element (ndx)}
    <svelte:component this={element.component} {element} />
  {/each}
  <div class="duration-bar">
    <div class="duration-bar-inner" style="width: {durationPercent}%"></div>
  </div>
<button on:click={()=>next()}>next!</button>
</div>
  <button class="contrast fs" on:click={() =>{onToggle()}}>
    {#if onToggle}
      Fullscreen
    {:else}
      Exit
    {/if}
  </button>
</Fullscreen>
<style>
    .duration-bar{
        width: 100%;
        height:0.6rem;
        background-color: #ddd;
        position:fixed;
        bottom: 0;
        align-self:center;
    }
    .duration-bar-inner {
        height: 100%;
        background-color: #2196f3; /* Blue color */
        transition: width 1s linear;
    }
    .player{
        aspect-ratio: 9/16;
        display:flex;
        flex-direction:column;
    }
    .fs {
        position: fixed;
        right: 0;
        bottom: 0;
        border-radius: 4px;
        padding:0.3rem;
        font-size:1rem;
        width:6rem;
    }
</style>