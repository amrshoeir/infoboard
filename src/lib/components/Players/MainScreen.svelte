<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  export let content
  export let durationPercent=100;
  export let displayElements=[];
  export let components;

  if(content.length==0){
    displayElements=[{count:0,src:"#",duration:0} ]
  }
  content.forEach((elem)=>{
    let fileNames;
    let src;
    let layout;
    let imagesDuration;
    let count
    elem.content_data.youtube
    if(elem.content_data.content.youtube){
      src=elem.content_data.content.path
      layout='Video'
      count=1;
    }else{
      fileNames = elem.content_data.content.file_names;
      const content_path = `../${elem.content_data.content.path}`;
      src = fileNames.map(str=>content_path.concat(str));
      layout=elem.content_data.content.layout
      count = fileNames.length;
    }
    const component = components[layout];
    if(layout == 'Gallery'){
      imagesDuration=elem.content_data.content.durationArray;
    }
    if(elem.end_time > new Date() && elem.start_time < new Date()){
      let obj = {
        count,
        src,
        duration:elem.duration,
        component,
        imagesDuration
      }
      displayElements.push(obj)
    }
  })
  const path='../../../'
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
      if (timeLeft === 0) {
        next();
      }
    }, 1000);
    }
  onMount(()=>{
    startAutoPlay();
  })
</script>
<div class="container">
  {#each [displayElements[ndx]] as element (ndx)}
      <button class="next" on:click={()=>next()}>next!</button>
      <svelte:component this={element.component} src={element.src} {element} />
  {/each}
<div class="duration-bar">
  <div class="duration-bar-inner" style="width: {durationPercent}%"></div>
</div>
</div>

<style>
    .duration-bar{
        width:100%;
        height:1rem;
        background-color: #ddd;
        position:fixed;
        bottom: 0;
    }
    .duration-bar-inner {
        height: 100%;
        background-color: #2196f3; /* Blue color */
        transition: width 1s linear;
    }

    .next{
        position:absolute;
        left:50%;
    }
    .parent{
        aspect-ratio:9/16;
        width:50%;
        margin:100px auto;
        padding-bottom:5px;
        border: 5px darkslategray solid;
    }
    .container{
        aspect-ratio: 9/16;
        display:flex;
        flex-direction:column;
    }
</style>