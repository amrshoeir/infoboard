<script lang="ts">
    import MainScreen from "$lib/components/players/MainScreen.svelte";
    import Image from "$lib/components/layouts/Image.svelte";
    import Video from "$lib/components/layouts/Video.svelte";
    import Gallery from "$lib/components/layouts/Gallery.svelte";

    export let data
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
<style>
.container{
  width:15rem;
}
</style>