<script lang="ts">
    import Image from "$lib/components/layouts/Image.svelte";
    import Video from "$lib/components/layouts/Video.svelte";
    import Gallery from "$lib/components/layouts/Gallery.svelte";
    import LayoutView from "$lib/components/views/LayoutView.svelte";
    import ContentView from "$lib/components/views/ContentView.svelte";
    import ContentForm from "$lib/components/forms/add/ContentForm.svelte";
    export let data;
    const user = data.user;
    let content , layout;
    $:content = data.content;
    $:layout = data.layout;
    const components = {
      Image,
      Video,
      Gallery
    }

</script>
<h2>Layouts</h2>
<section>
<div class="grid">
  <LayoutView {layout} />
</div>
</section>
<h2>Contents</h2>
<section>
  <div class="grid">
    <div class="container-fluid">
      <ContentView {content} name={user.name}/>
    </div>
  </div>
</section>
<ContentForm {user} {layout} />
<style>
    .container{
        display:flex;
        flex-direction:column;
    }
</style>