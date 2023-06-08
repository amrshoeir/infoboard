<script lang="ts">
  import Preview from "$lib/components/views/Preview.svelte";

  export let selectedLayout;
  export let inputFiles=[];
  let video_selection="upload";
  let isDuration=false;
  let videoDuration = selectedLayout.duration;

  const reader = (file)=> new Promise((resolve,reject)=> {
    const fr = new FileReader();
    fr.onload = () => resolve(fr);
    fr.onerror = (err) => reject(err);
    let video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = ()=> {
      videoDuration = video.duration.toFixed(2);
      console.log(videoDuration)
      video.src = URL.createObjectURL(file);
    }
    fr.readAsDataURL(file)
  })
  const logFiles = async(fileList)=>{
    let fileResults = [];
    const frPromises = fileList.map(reader);
    try{
      fileResults= await Promise.all(frPromises) //resolves all fileReader promises
    }catch(err){
      console.error(err);
      return;
    }
    inputFiles=fileResults;
  }
  let onVideoSelect = async (e)=>{
    inputFiles=[];
    isDuration=false;
    await logFiles([...e.target.files]);
  };

</script>
<select id="video-type" name="video_selection" bind:value={video_selection}>
  <option value="upload">Upload</option>
  <option value="youtube">Youtube</option>
</select>
{#if video_selection === 'youtube'}
  <label>
    Content duration:
    <input
      type=number
      min="0"
      step="0.01"
      placeholder="Please enter yt video duration"
      name="duration"
      bind:value={videoDuration}>
  </label>
  <label for="video-youtube">Youtube Link:</label>
  <input id="video-youtube" type="url" name="youtube" required />
{/if}
{#if video_selection === 'upload'}
  <label>Content duration: <input type=number min="0" step="0.01" name="duration" disabled="{!isDuration}" bind:value={videoDuration}></label>
  <label for="video-upload">Upload Video
    <input id="video-upload" type="file" name="media" required accept="video/mp4" on:change={(e)=>onVideoSelect(e)} />
  </label>
{/if}
{#if inputFiles.length>0}
<Preview previewElement="video" element={inputFiles[0]}/>
  {/if}