<script lang="ts">
    import Fullscreen from "svelte-fullscreen";
    import { onDestroy, onMount } from "svelte";
    import MainScreen from "$lib/components/Players/MainScreen.svelte";
    import Image from "$lib/components/Layouts/Image.svelte";
    import Video from "$lib/components/Layouts/Video.svelte";
    import Gallery from "$lib/components/Layouts/Gallery.svelte";

    export let data
    const content = data.content;
    const layout = data.layout;
    const components = {
        Image,
        Video,
        Gallery
    }
    let durationPercent;
</script>
<div class="display">
<Fullscreen  let:onToggle let:onRequest>
    <MainScreen  {content} {durationPercent} {components}/>
    <button class="fullscreen" on:click={() =>{onToggle()}}>
        {#if onToggle}
            Fullscreen
        {:else}
            Exit
        {/if}
    </button>
</Fullscreen>
</div>

<!--<div class = "misc">-->
<!--&lt;!&ndash;todo QR codes&ndash;&gt;-->
<!--</div>-->
<style>
    .fullscreen {
        position: fixed;
        font-family:helvetica, sans-serif;
        right: 0;
        bottom: 0;
        background-color: #007EA7;
        font-size: 15px;
        color: white;
        border-radius: 4px;
        border: none;
        padding:0.5rem;
    }
    .display{
    }

</style>