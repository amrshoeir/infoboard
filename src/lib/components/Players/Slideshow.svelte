<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import {enhance} from '$app/forms';
  import Modal from "$lib/components/Modal.svelte";

  export let content
  export let displayElements=[];
  export let components;

  if(content.length==0){
    displayElements=[{count:0,src:`../src/lib/assets/Layouts/Image/src/preview/img1.png`,duration:0,component :components.Image} ]
  }else{
    content.forEach((elem)=>{
      const imgNames = elem.content_data.content.file_names;
      const content_path = `../${elem.content_data.content.path}`;
      const layout =elem.content_data.content.layout
      const component = components[layout];
      let imagesDuration;
      console.log()
      if(layout == 'Gallery'){
        imagesDuration=elem.content_data.content.durationArray;
      }
      let src = imgNames.map(str=>content_path.concat(str));
      if(elem.end_time > new Date() && elem.start_time < new Date()){
        let obj = {
          count:elem.content_data.content.file_names.length,
          src,
          duration:elem.duration,
          component,
          imagesDuration
        }
        displayElements.push(obj)
      }
    })
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
  const previousSlide= () => {
    ndx = (ndx+numSlides - 1) % numSlides;
    timeLeft = 15; // Reset time for new slide
    durationPercent = 100; // Reset duration bar
  }

  function closeModal() {
    dialog.close();
  }
  const reload =() => {
      return async()=>{
        location.reload();
      }
    }

</script>


<div class="slideshow">
  {#each [displayElements[ndx]] as element (ndx)}
    <div class="slide-active">
      <svelte:component this={element.component} src={element.src} {element} on:click={()=>{dialog.showModal()}}/>
    </div>
    {/each}

  <!-- <div class="overlay" >
  <div class="slide-left" on:click={()=>{previousSlide()}} on:keyup>
      <img
        class="slide-img"
        src={displayElements[(ndx+numSlides-1)%numSlides]}
        alt="Slideshow"
      >
    </div>
    <button class="button">Edit</button>

  </div>
  <div class="active-overlay">

  </div>
  <div class="overlay">
    <div class="slide-right" on:click={()=>{nextSlide()}}  on:keyup>
      <img
        class="slide-img"
        src={displayElements[(ndx+1)%numSlides]}
        alt="Slideshow"
      >
    </div>
    <button class="button">Edit</button>
  </div> !-->
  {#if content[0]}
  <Modal bind:dialog on:close={() => console.log('closed')}>
    <form method="POST" action="?/test" use:enhance>
       {#each Object.entries(content[ndx]) as formElem}
         {formElem[1]}
         <br>
       {/each}
       <button type="submit" on:click={()=>{closeModal()}}>Confirm Changes</button>
       <button type="button" on:click={()=>{closeModal()}}>Cancel</button>
    </form>
  </Modal>
  {/if}
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
 /* .overlay{
      display:flex;
      justify-content: center;
      align-items: center;
      border: 1px solid gray;
      background-color: rgba(0, 0, 0,0.6);
  }
  .overlay .button {
      display: none;
  }
  .overlay:hover .button {
      display: block;
      position: fixed;
      flex: auto ;
      justify-content: start;
  }


  .slide-right{
      opacity:20%;
  }
  .slide-right:hover {
      opacity:50%
  }
  .slide-left:hover{
      opacity:50%
  }
  .slide-left{
      opacity:20%;
  } */
  .slide-active{
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

