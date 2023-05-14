<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import {fly} from 'svelte/transition'
  export let content
  export let displayElements=[];

  const path='../../../'

  content.forEach((elem)=>{
    if(elem.end_time > new Date() && elem.start_time < new Date()){
      let obj = {
        count:elem.content_data.content.file_names.length,
        src:[`${path}${elem.content_data.content.file_path}${elem.content_data.content.file_names}`] as string[],
        duration:elem.duration,
      }
      displayElements.push(obj)
    }
  })

  let assetsPath = "../../../src/lib/assets"
  let currentContentPath = assetsPath + "/current-content"
  let pastContentPath = assetsPath + "/past-content"
    let images = [
      currentContentPath + "/test/img1.png",
      currentContentPath + "/test/img2.png",
      currentContentPath + "/test/img3.png",
    ];
  let ndx=0
  let numSlides = displayElements.length;
  let currentSlide = numSlides;
  let interval;
  let timeLeft = displayElements[ndx].duration; // Seconds per slide
  let durationPercent = 100; // The percentage of time left in the current slide


  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % numSlides;
    timeLeft = 15; // Reset time for new slide
    durationPercent = 100; // Reset duration bar
    console.log(currentSlide + images[currentSlide])
  }
  function startAutoPlay() {
    interval = setInterval(() => {
      timeLeft--;
      durationPercent = (timeLeft / displayElements[ndx]) * 100;
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
  function previousSlide() {
    currentSlide = (currentSlide+numSlides - 1) % numSlides;
    timeLeft = 15; // Reset time for new slide
    durationPercent = 100; // Reset duration bar
    console.log(currentSlide + images[currentSlide].substring(images.length-4))
  }
</script>


<div class="slideshow">
  <div class="overlay" >
  <div class="slide-left" on:click={()=>{previousSlide()}} on:keyup>
      <img
        class="slide-img"
        src={images[(currentSlide+numSlides-1)%numSlides]}
        alt="Slideshow"
      >
    </div>
    <button class="button">Edit</button>

  </div>
  <div class="active-overlay">
  <div class="slide-active">
  <img
    class="slide-img"
    src={images[currentSlide%numSlides]}
    alt="Slideshow"
  >
  </div>
  </div>
  <div class="overlay">
    <div class="slide-right" on:click={()=>{nextSlide()}}  on:keyup>
      <img
        class="slide-img"
        src={images[(currentSlide+1)%numSlides]}
        alt="Slideshow"
      >
    </div>
    <button class="button">Edit</button>
  </div>
  <div class="duration-bar">
    <div class="duration-bar-inner" style="width: {durationPercent}%"></div>
  </div>
</div>

<style>
  .slideshow{
      display:flex;
      flex-direction:row;
      justify-content: center;
      align-items: center;
      contain: content;
      max-width: 70%;
      margin:0 auto;
  }
  .overlay{
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
  }
  .slide-active{
  }
  .slide-img{
      width:50vh;
      height:auto;
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

