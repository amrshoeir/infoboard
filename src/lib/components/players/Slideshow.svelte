<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import {enhance} from '$app/forms';
  import Modal from "$lib/components/Modal.svelte";

  export let content
  export let displayElements=[];
  export let components;

  content.forEach((elem)=>{
    let fileNames;
    let src;
    let layout;
    let imagesDuration;
    let misc;
    if(elem.content_data.content.youtube){
      src=elem.content_data.content.path
      layout='Video'
      misc='youtube'
    }else{
      fileNames = elem.content_data.content.file_names;
      const content_path = `../${elem.content_data.content.path}`;
      src = fileNames.map(str=>content_path.concat(str));
      layout=elem.content_data.content.layout
    }
    const component = components[layout];
    if(layout == 'Gallery'){
      imagesDuration=elem.content_data.content.durationArray;
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
    displayElements=[{count:0,src:"#",duration:0,component :components.Image} ]
  }
  let numSlides;
  let timeLeft;
  let ndx = 0;
  if(displayElements[0]){
    numSlides = displayElements.length;
    timeLeft = displayElements[ndx].duration; // Seconds per slide
  }
  let interval;
  let durationPercent = 100; // The percentage of time left in the current slide
  let dialog;

  const nextSlide = () => {
    ndx = (ndx + 1) % numSlides;
    timeLeft = displayElements[ndx].duration; // Reset time for new slide
    durationPercent = 100; // Reset duration bar
  }
  function startAutoPlay() {
    interval = setInterval(() => {
      timeLeft--;
      durationPercent = (timeLeft / displayElements[ndx].duration) * 100;
      if (timeLeft === 0) {
        nextSlide();
      }
    }, 1000);
  }
  function stopAutoPlay() {
    clearInterval(interval);
  }
  onMount(startAutoPlay);
  onDestroy(stopAutoPlay);
  // const previousSlide= () => {
  //   ndx = (ndx+numSlides - 1) % numSlides;
  //   timeLeft = 15; // Reset time for new slide
  //   durationPercent = 100; // Reset duration bar
  // }
  const reload =() => {
      return async()=>{
        location.reload();
      }
    }

</script>


<div class="slideshow">
  {#each [displayElements[ndx]] as element (ndx)}
    <div class="slide-active">
      <svelte:component this={element.component} {element} on:click={()=>{dialog.showModal()}}/>
    </div>
    {/each}
  <div class="duration-bar">
    <div class="duration-bar-inner" style="width: {durationPercent}%"></div>
  </div>
</div>

<style>
  .slideshow{
      display:flex;
      flex-direction:column;
      justify-content: center;
      align-items: center;
      contain: content;
      max-width: 70%;
      margin:0 auto;

  }
  .duration-bar {
      width: 100%;
      height: 4px;
      background-color: #ddd;
      position: absolute;
      bottom: 0;
  }
  .duration-bar-inner {
      height: 100%;
      background-color: #2196f3; /* Blue color */
      transition: width 1s linear;
  }
</style>

