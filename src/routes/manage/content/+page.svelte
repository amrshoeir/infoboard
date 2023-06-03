<script lang="ts">
    import Slideshow from "$lib/components/Players/Slideshow.svelte";
    import LayoutForm from "$lib/components/forms/LayoutForm.svelte";
    import NewContentForm from "$lib/components/forms/NewContentForm.svelte";
    import Image from "$lib/components/Layouts/Image.svelte";
    import Video from "$lib/components/Layouts/Video.svelte";
    import Gallery from "$lib/components/Layouts/Gallery.svelte";
    export let data;
    const user = data.user;
    const content = data.content
    const layout = data.layout
    const components = {
        Image,
        Video,
        Gallery
    }
    let addingLayout = false;
    let addingContent = false;

</script>
<div class="container">
    <div class="crud-display">
        <!--  <div class="layout-div">
              <LayoutForm {addingLayout} {layout} {user}/>
          </div> -->
        <div class="content-div">
            <NewContentForm {user} {addingContent} {layout} {content} />
        </div>
    </div>
<Slideshow {content} {components} />
</div>
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
    .crud-display{
        display:flex;
        justify-content: start;
        flex-direction: row;
        margin-top:100px;
    }

</style>