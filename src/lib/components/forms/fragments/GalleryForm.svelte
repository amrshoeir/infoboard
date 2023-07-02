<script lang="ts">
  import Preview from "$lib/components/views/Preview.svelte";

  export let selectedLayout;
  export let inputFiles=[]
  let isCustomDuration=false;
  let defaultDuration = selectedLayout.layout_data.durationPerImg;
  let galleryDuration= [defaultDuration]
  let duration = selectedLayout.duration;

  const reader = (file)=> new Promise((resolve,reject)=> {
    const fr = new FileReader();
    fr.onload = () => resolve(fr);
    fr.onerror = (err) => reject(err);
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
  const onFilesSelect = async (e)=>{
    inputFiles=[];
    await logFiles([...e.target.files]);
  }
  const changeDefault= ()=>{
    isCustomDuration = !isCustomDuration
  }
</script>
<label>Description:
  <input
    type="text" name="description">
</label>
<label for="dpi">Duration per image:</label>
<input type="number" id="dpi" title="default: 5s" name="dpi" bind:value={defaultDuration} disabled={isCustomDuration}><br>
<label for="images-upload">Upload(max {selectedLayout.layout_data.maxCount}):</label>
<input type="file" id="images-upload" name="media" multiple accept="image/*" required on:change={(e)=>onFilesSelect(e)}>
{#if inputFiles.length>0}
  <label>Custom duration? <input type="checkbox" role="switch" name="custom_duration" on:change={()=>{changeDefault()}}> </label>
  <figure>
    <table>
      <tr>
      {#each inputFiles as image,i}
          <th>
            Img_{i+1}
            <input
              type="number"
              placeholder="default duration"
              name={'file'+i}
              bind:value={galleryDuration[i]}
              disabled={!isCustomDuration}
              required={!isCustomDuration}
            >
          </th>
      {/each}
        </tr>
        <tr>
          {#each inputFiles as image,i}
          <td><Preview previewElement="img" element={image} /></td>
          {/each}
        </tr>
    </table>
  </figure>
{/if}