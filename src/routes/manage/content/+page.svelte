<script lang="ts">
    import type {PageData} from './$types';
    import Slideshow from "./Slideshow.svelte";

    export let data:PageData

    const user = data.user;
    const content = data.content
    const layout = data.layout
    let len = Object.keys(layout).length;
    let addingLayout = false;
    let addingContent = false;
    let selectedLayout;


    function selectLayout() {
        const layoutData = selectedLayout.layout_data
        const layoutTitle = layoutData.title;
        const layoutPath =  layoutData.content.filepath;
        if(layoutTitle=='Image Layout'){
            let images;
            let size;
            let path;
            let contentData={
                images,
                size,
                path
            }
            console.log(layoutData.file_types)
        }
        if(layoutTitle =='Video Layout'){
            console.log(layoutData.file_types)
            let yt='';
            let size='';
            let path = '';
            let contentData={
                yt,
                size,
                path
            }
            console.log(contentData);
        }
        if(layoutTitle =='Image with text'){
        return 0;
        }

    }

</script>
<div class="container">
    <h2>Content Management</h2>
    <h3>Hello {user.name}</h3>
    <div class="crud-display">
    <div id="layouts-div">
        <br>
        {#if !addingLayout}<button class="button add-cancel" on:click={()=>{addingLayout=true}}>Add layout</button>
        {:else} <button class="button add-cancel" on:click={()=>{addingLayout=false}}>Cancel</button>
        {/if}
        <br>
        {#if addingLayout}
        <form on:submit={addingLayout=false} method="POST" action="?/addLayout">
           <div class="form-elements">
            <label for="layout-name" >Name:</label>
            <input id="layout-name" type="text" name="name" ><br>
            <label for="layout-duration">Duration in seconds:</label>
            <input id="layout-duration" type="number" name="duration"><br>
            <label for="layout-data-json">Data in JSON:</label>
            <input type="file" id="layout-data-json" name="layout_data"><br>
            <input type="hidden" name="user_id" bind:value={user.id}>

            <button type="submit" class="button submit">Submit</button>
           </div>
        </form>
        {/if}
        <p>----------------------------</p>
        {#each layout as item, i}
            <form method="POST" action="?/deleteLayout">
                <h4>Name: {item.name}</h4>
                <h4>Title: {item.layout_data.title}</h4>
                <h4> Duration: {item.duration} </h4>
                <input type="hidden" id="layout-element" name="id" bind:value={item.id} />
                <button class="button delete">Delete layout</button><br>
            </form>
        {/each}
    </div>
    <div class="content-div">
        <br>
        {#if !addingContent}<button class="button add-cancel" on:click={()=>{addingContent=true}}>Add content</button>
        {:else}<button class="button add-cancel" on:click={()=>{addingContent=false}}>Cancel</button>
        {/if}
        <form on:submit={addingContent=false} method="POST" action="?/addContent">
        {#if addingContent}
            <div class="form-elements">
                <label for="content-name">Name:</label>
                <input id="content-name" name="name"><br>
                <label for="content-duration">Duration(s):</label>
                <input type="number" id="content-duration" name="duration"><br>
                <label for="content-start-time">Starts at:</label>
                <input type="datetime-local" id="content-start-time" name="start_time"><br>
                <label for="content-end-time">Ends at:</label>
                <input type="datetime-local" id="content-end-time" name="end_time"><br>
                <label for="content set-layout">Layout:</label>
                <select id="content set-layout" name="layout_id" bind:value={selectedLayout} on:change={()=>{selectLayout()}}>
                    {#each layout as item}
                        <option value={item}>{item.layout_data.title}</option>
                    {/each}
                </select>
                <br>
                {#if selectedLayout}
                    {#if selectedLayout.name==='Image(s)'}
                        <label for="image data-title">Description:</label>
                        <input type="text" id="image data-title" name="content-title">
                        <label for="image data-images">Image(s):</label>
                        <input type="image" id="image data-images" name="images" title="Max 5 images" src="" multiple>

                    {/if}
                    {#if selectedLayout.name==='Video'}
                        <label for="video data-title">Description:</label>
                        <input type="text" id="video data-title" name="content-title">
                        <label for="video data-video">Upload Video</label>
                        <input id="video data-video" type="file" accept={selectedLayout.layout_data.file_types}>
                    {/if}
                {/if}
                <input type="hidden" name="user_id" bind:value={user.id} />
                <br>
                <button type="submit" class="button submit">Submit</button>
            </div>
        {/if}
             </form>
        <p>----------------------------</p>       
        {#each content as item}
            <form id="deleteContent" method="POST" action="?/deleteContent">
             <h4>{item.content_data.title}</h4>
            <input type="hidden" id="content-element" name="id" bind:value={item.id} />
            <button class="button delete">Delete content</button><br>
            </form>
        {/each}
    </div>
    </div>
</div>
<Slideshow {content}  />

<style>
    .crud-display{
        display:flex;
        justify-content: space-around;
    }
    .button {
        font-family: helvetica;
        color: #FFFFFF !important;
        font-size: 14px;
        text-shadow: 1px 1px 2px #000000;
        box-shadow: 1px 1px 3px #61A8F9;
        padding: 13px 13px;
        border-radius: 5px;
        border: 1px solid #000000;
        background: #3A5A40;
        cursor: pointer;
    }
    .button:hover {
        color: #FFFFFF !important;
        background: #588157;
    }
    .form-elements{
        display:flex;
        width:150px;
        flex-direction: column;
        align-content:flex-start;
        margin: 5px 5px 3px 3px;
    }
    .form-elements button{
        padding: 5px;
    }
</style>