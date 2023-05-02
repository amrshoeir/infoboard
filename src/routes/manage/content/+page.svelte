<script lang="ts">
    import type {PageData} from './$types';
    import Slideshow from "./Slideshow.svelte";

    export let data:PageData
    const user = data.user;
    const loaded_content = data.content
    //let filepath = loaded_content.content_data.img_filepath



</script>
<div class="container">
    <h2>
        Content Management
    </h2>
    <h3>Hello {user.name}</h3>
    <Slideshow  />
</div>
