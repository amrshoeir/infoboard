<script lang="ts">
    import Fullscreen from "svelte-fullscreen";
    import MainScreen from "$lib/components/players/MainScreen.svelte";
    import Image from "$lib/components/layouts/Image.svelte";
    import Video from "$lib/components/layouts/Video.svelte";
    import Gallery from "$lib/components/layouts/Gallery.svelte";

    export let data
    const contents = data.content;
    $: content = data.content;
    const components = {
        Image,
        Video,
        Gallery
    }
    let durationPercent;
</script>
<div class="container">
  <MainScreen  {content} {durationPercent} {components}/>
</div>
<!--<div class = "misc">-->
<!--&lt;!&ndash;todo QR codes&ndash;&gt;-->
<!--</div>-->
<style>
.container{
  width:20rem;
}
</style>