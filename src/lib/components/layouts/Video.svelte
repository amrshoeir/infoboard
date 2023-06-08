<script>
  import {fade} from 'svelte/transition'
  export let element;
  console.log(element)
</script>
{#if element.misc}
  <iframe
    src="{element.src}+?autoplay=1&mute=1&loop=1"
    title=""
    style="aspect-ratio: 9/16"
  >
  </iframe>
  {:else}
  <video
    src={encodeURI(element.src)}
    autoplay
    muted
    loop
    controls
    >
    <track src={element.src} kind="captions">
  </video>
{/if}
<style>
</style>