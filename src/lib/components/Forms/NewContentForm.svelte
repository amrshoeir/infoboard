<script lang="ts">
  import Modal from "$lib/components/Modal.svelte"
  import { enhance } from "$app/forms";
  export let content;
  export let user;
  export let layout;
  export let addingContent;

  let selectedLayout = layout[0];
  let video_selection ='upload';
  let isDuration=false;
  let isDefault=true;
  let inputFiles;
  let videoDuration;
  let fileCount;
  let previewElement;
  let isCustomDuration=false;
  let galleryDuration=[0];
  let defaultDuration;
  // returns preview data
  const reader = (file)=> new Promise((resolve,reject)=> {
    const fr = new FileReader();
    fr.onload = () => resolve(fr);
    fr.onerror = (err) => reject(err);
    assignPreviewElement(file)
    if(previewElement==='video'){
      let video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = ()=> {
        videoDuration = video.duration.toFixed(2);
        console.log(videoDuration)
      }
      video.src = URL.createObjectURL(file);
    }
    fr.readAsDataURL(file)
  })
  // logs preview data into inputFiles
  const logFiles = async(fileList)=>{
    let fileResults = [];
    console.log(fileList)
    fileCount = fileList.length;
    const frPromises = fileList.map(reader);
    try{
      fileResults= await Promise.all(frPromises) //resolves all fileReader promises
    }catch(err){
      console.error(err);
      return;
    }
    inputFiles=fileResults;
  }
  // assigns preview element
  function assignPreviewElement(files) {
    const type = files.type.split('/')[0]
    switch (type) {
      case 'image': {
        previewElement = 'img';
        break;
      }
      case 'video': {
        previewElement = 'video';
        break;
      }
    }
  }
  // File selection
  const onFileSelected = async (e)=>{
    inputFiles=[];
    await logFiles([...e.target.files]);
  }
  // Video selection
  let onVideoSelect = async (e)=>{
    inputFiles=[];
    await logFiles([...e.target.files]);
  };
  // resets input duration
  function changeLayouts() {
    isDuration=false
    inputFiles=[];
    video_selection='upload'
    videoDuration=selectedLayout.duration;
    defaultDuration= selectedLayout.layout_data.content.duration_per_img;
    galleryDuration= [defaultDuration]
  }
  function changeDefault() {
    isCustomDuration=!isCustomDuration;
    isDefault=!isDefault
    defaultDuration='--';
  }
</script>
<br>
{#if !addingContent}<button class="button add-cancel" on:click={()=>{addingContent=true;}}>Add content</button>
{:else}<button class="button add-cancel" on:click={()=>{addingContent=false;inputFiles='';}}>Cancel</button>
{/if}
<div class="content">
  <form id="add-content" method="POST" action="?/addContent" enctype="multipart/form-data">
    {#if addingContent}
      <div class="form-elements">
        <label for="content-name">Name:</label>
        <input id="content-name" name="name" required><br>
        <label for="content-duration">Duration:</label>
        <input type=number min="0" step="0.01" id="content-duration" name="duration" disabled={isDuration} bind:value={videoDuration}><br>
        {#if selectedLayout.name==="Video"}
          <label for="duration-assignment">
            <input type="checkbox" id="duration-assignment" name="video=duration" bind:value={isDuration}>
            Video duration
          </label>
          <br>
        {/if}
        <label for="content-start-time">Starts at:</label>
        <input type="datetime-local" id="content-start-time" name="start_time"><br>
        <label for="content-end-time">Ends at:</label>
        <input type="datetime-local" id="content-end-time" name="end_time"><br>
        <label for="content set-layout">Layout:</label>
        <select id="content set-layout" bind:value={selectedLayout} on:change={()=>{changeLayouts()}}>
          {#each layout as item}
            <option value={item}>{item.layout_data.title}</option>
          {/each}
        </select>
        <input hidden name="layout_id" bind:value={selectedLayout.id}>
        <br>
        <label for="data-title">Description:</label>
        <input type="text" id="data-title" name="description"><br>
        {#if selectedLayout.name==='Image'}
          <label for="image-upload">Image:</label>
          <input type="file" id="image-upload" name="media" accept="image/*" on:change={(e) => onFileSelected(e)}>
        {/if}
        {#if selectedLayout.name==='Gallery'}
          <label for="duration-dpi">Duration per image:</label>
          <input type="number" title="default: 5s"
                 id="duration-dpi" name="dpi" bind:value={defaultDuration} disabled={isCustomDuration}><br>
          <label for="images-upload">Upload(max {selectedLayout.layout_data.content.img_max}):</label>
          <input type="file" id="images-upload" name="media" multiple accept="image/*" required on:change={(e)=>onFileSelected(e)} >
        {/if}
        {#if selectedLayout.name==='Video'}
          <select id="video-type" name="video_selection" bind:value={video_selection}>
            <option value="upload">Upload</option>
            <option value="youtube">Youtube</option>
          </select>
          {#if video_selection === 'youtube'}
            <label for="video-youtube">Youtube Link:</label>
            <input id="video-youtube" type="url" name="youtube" required />
          {/if}
          {#if video_selection === 'upload'}
            <label for="video-upload">Upload Video</label>
            <input id="video-upload" type="file" name="media" required accept="video/mp4" on:change={(e)=>onVideoSelect(e)} />
          {/if}
        {/if}
        {#if inputFiles}
          {#if inputFiles.length>1}
            <label for="checkbox-duration">
              <input type="checkbox" id="checkbox-duration" on:change={()=>changeDefault()}/>
              Custom duration?
            </label>
          {/if}
          {#each inputFiles as file,i}
            <figure>
              <svelte:element id="preview" this={previewElement} src={file.result}></svelte:element><br>
            </figure>
            {#if previewElement==='img' && inputFiles.length>1}
              <input type="number" min="1" bind:value={galleryDuration[i]} disabled={!isCustomDuration} name={'file'+i } required/>
            {/if}
          {/each}
        {/if}
        <input type="hidden" name="add_id" bind:value={user.id} />
        <br>
        <button type="submit" class="button submit">Submit</button>
      </div>
    {/if}
  </form>
</div>
  <div class="content-elements">
  {#if content}
    {#each content as item}
      <form id="deleteContent" class="delete-form" method="POST" action="?/deleteContent" use:enhance={async()=>{return location.reload()}}>
        <h4>Title: {item.content_data.title}</h4>
        <h4>Duration: {item.duration} seconds</h4>
        <input type="hidden" id="content-element" name="delete_id" bind:value={item.id} />
        <button  class="button delete">Delete content</button><br>
      </form>
    {/each}
  {/if}
  </div>



<style>
    .button {
        font-family: helvetica,sans-serif;
        color: #FFFFFF !important;
        font-size: 14px;
        text-shadow: 1px 1px 2px #000000;
        padding: 13px 13px;
        border-radius: 5px;
        border: 1px solid #000000;
        background: #3A5A40;
        cursor: pointer;
    }
    .content{
        display:flex;
        flex-direction:row;
        align-content:start;
        margin:5px auto;
        padding:5px;
    }
    .content-elements{
        display:flex;
        flex-direction:row;
        align-content:start;
    }
    .button:hover {
        color: #FFFFFF !important;
        background: #588157;
    }
    .form-elements{
        display:flex;
        width:70%;
        flex-direction: column;
        align-content:start;
        margin: 5px 5px 3px 3px;
    }
    figure #preview{
        width:150px;
        height:250px;
        display:inline;
    }
    #video-youtube{
        width:100%;
    }
    .delete-form{
        margin:5px;
        padding:5px;

    }
</style>