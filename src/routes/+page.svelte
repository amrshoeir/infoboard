<script lang="ts">
    //import type {PageData} from './$types';
    import Fullscreen from "svelte-fullscreen";
    import { onDestroy, onMount } from "svelte";

    export let data
    const content = data.content;

    let durationPercent;
    let currentSlide = 0;
    let timeLeft:number[] = content.map(content => content.duration);
    console.log(timeLeft)
    let numSlides = content.length;
    let currentTimeLeft = 0;
    let interval;


    const nextSlide= (i) => {
        currentSlide = (currentSlide + 1) % numSlides;
        currentTimeLeft = timeLeft[i] // Reset time for new slide
        durationPercent = 100; // Reset duration bar
    }
    function startAutoPlay(){
        let i =0;
        interval = setInterval(() => {
            timeLeft[i]--;
            durationPercent = (currentTimeLeft / timeLeft[i]) * 100;
            if (timeLeft[i] === 0) {
                nextSlide(++i);
            }
        }, 1000);
    }
    function stopAutoPlay() {
        clearInterval(interval);
    }
    onMount(startAutoPlay)
    onDestroy(stopAutoPlay)

</script>


<Fullscreen let:onToggle>
    <div class="container">
        <div class = "content">
            {#each content as item,i}
                {item}
                supp
            {/each}
        </div>
        <div class="duration-bar">
            <div class="duration-bar-inner" style="width: {durationPercent}%"></div>
        </div>
        <button on:click={() => onToggle()}>
            {#if onToggle}
                FullScreen
                {:else}
                Exit
            {/if}
        </button>
    </div>
</Fullscreen>

<!--<div class = "misc">-->
<!--&lt;!&ndash;todo QR codes&ndash;&gt;-->
<!--</div>-->
<a href="/manage/">login</a>



<style>
    *{
        font-family:"Segoe UI"
     }
    .container {
        display:flex;
        justify-content: center;
        align-items: center;
        aspect-ratio:9/16;
        max-width:500px;

    }
    .content{
        border: 1px solid red;
        position: absolute;
        aspect-ratio:9/16;
        max-width: 500px;
        margin:0 auto;
        top: 0;
        left: 0;
        bottom: 10px; /*making space for the duration bar */
        right: 0;
    }
    button{
        position: fixed;
        right: 20px;
        bottom: 20px;
    }
    .duration-bar{
        width: 100%;
        height: 4px;
        background-color: #ddd;
        position:fixed;
        bottom: 0;
    }
    .duration-bar-inner {
        height: 100%;
        background-color: #2196f3; /* Blue color */
        transition: width 1s linear;
    }
</style>