<script lang="ts">
    import Slideshow from "$lib/components/players/Slideshow.svelte";
    import LayoutForm from "$lib/components/forms/add/LayoutForm.svelte";
    import NewContentForm from "$lib/components/forms/NewContentForm.svelte";
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
<div class="container">
  <div class="grid">
    <section>
      <ContentForm {user} {layout} />
    </section>
  </div>
</div>
<!--<Slideshow {content} {components} />-->
<section>
  <div class="container">
    <LayoutView {layout} />
  </div>
  <div class="grid">
    <ContentView {content}/>
  </div>
</section>


<!--<form method="post" action="?/test" use:enhance={(formData)=>{console.log(formData)}}>
    <label for="test">Test video</label>
    <input type="file" id="test" name="video" required />
    <button>submit</button>
</form>-->
<style>
    .container{
        display:flex;
        flex-direction:column;
    }
</style>