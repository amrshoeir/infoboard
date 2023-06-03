<script>
  import {fade} from 'svelte/transition'
  export let element;
  export let src;
</script>
  <video
    {src}
    autoplay
    muted
    loop
    controls
    ><track {src} kind="captions"></video>
<style>
</style>