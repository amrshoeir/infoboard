<script lang="ts">
    import Slideshow from "./Slideshow.svelte";
    import { to_number } from "svelte/internal";
    import SimplerSlideshow from "./SimplerSlideshow.svelte";

    export let data;

    const user = data.user;
    const content = data.content
    const layout = data.layout
    let len = Object.keys(layout).length;
    let inputImages;
    let inputVideo;
    let addingLayout = false;
    let addingContent = false;
    let selectedLayout;
    let video_selection;


    function selectLayout(selectedLayout) {
        const title = selectedLayout.name
        if(title=='Image(s)'){
            let content_data = selectedLayout.layout_data.content
            let images;
            let size;
            let path;
            let contentData={
                images,
                size:to_number(content_data.size),
                path
            }
            console.log(content_data)
        }
        if(title =='Video'){
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
    }

   const onFileSelected = async (e)=>{
       const reader = (file)=> new Promise((resolve,reject)=> {
           const fr = new FileReader();
           fr.onload = () => resolve(fr);
           fr.onerror = (err) => reject(err);
           fr.readAsDataURL(file);
         }
       )
       const logImages = async(fileList)=>{
           let fileResults = [];
           const frPromises = fileList.map(reader);
           try{
               fileResults= await Promise.all(frPromises)
           }catch(err){
               console.error(err);
               return;
           }
           fileResults.forEach(() => {
               console.log(fileResults)
           });
           inputImages = fileResults
       }
       await logImages([...e.target.files]);
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
        <form id="add-content" on:submit={addingContent=false} method="POST" action="?/addContent">
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
                <select id="content set-layout" bind:value={selectedLayout} on:change={()=>{selectLayout(selectedLayout)}}>
                    {#each layout as item}
                        <input type="hidden" name="layout_id" value={item.id}>
                        <option value={item}>{item.layout_data.title}</option>
                    {/each}
                </select>
                <br>
                <label for="data-title">Description:</label>
                <input type="text" id="data-title" name="content_title"><br>
                {#if selectedLayout}
                    {#if selectedLayout.name==='Image(s)'}
                        <label for="image data-images">Image(s):</label>
                        <input type="file" id="image data-images" name="media" accept={selectedLayout.layout_data.file_types} multiple
                               on:change={(e) => onFileSelected(e)}>
                            {#if inputImages}
                                {#each inputImages as image}
                                  <img src={image.result} alt="avatar"/>
                                {/each}
                            {/if}

                    {/if}
                    {#if selectedLayout.name==='Video'}
                        <label for="upload-video"><input type="radio" id="upload-video" name="video-selection"
                        value="upload" bind:group={video_selection}>Upload</label>
                        <label for="youtube"><input type="radio" id="youtube" name="video-selection"
                        value="youtube" bind:group={video_selection}>Youtube</label>
                        {#if video_selection === 'youtube'}
                            <label for="video youtube">Youtube Link:</label>
                            <input id="video youtube" type="text">
                        {/if}
                        {#if video_selection==='upload'}
                            <label for="video upload">Upload Video</label>
                            <input id="video upload" type="file" name="media" accept={selectedLayout.layout_data.file_types}>
                        {/if}
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
                <h4>{item.content_data.content.file_names}</h4>
            <input type="hidden" id="content-element" name="id" bind:value={item.id} />
            <button  class="button delete">Delete content</button><br>
            </form>
        {/each}
    </div>
    </div>
</div>
<Slideshow {content}  />
{#if content}
    <SimplerSlideshow {content} />
{/if}

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