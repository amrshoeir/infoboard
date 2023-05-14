<script lang="ts">
    import Fullscreen from "svelte-fullscreen";
    import { onDestroy, onMount } from "svelte";
    import MainScreen from "./MainScreen.svelte";

    export let data
    const content = data.content;
    let durationPercent;

</script>
    <div class="container">
        <Fullscreen let:onToggle let:onRequest >
        <MainScreen {content} {durationPercent} />
            <button on:click={() =>{onToggle()}}>
            {#if onToggle}
                FullScreen
                {:else}
                Exit
            {/if}
            </button>

        </Fullscreen>
    </div>
<!--<div class = "misc">-->
<!--&lt;!&ndash;todo QR codes&ndash;&gt;-->
<!--</div>-->
<a href="/manage/">login</a>



<style>
    *{
        font-family:"Segoe UI"
     }
    button{
        position: fixed;
        right: 20px;
        bottom: 20px;
    }

</style>