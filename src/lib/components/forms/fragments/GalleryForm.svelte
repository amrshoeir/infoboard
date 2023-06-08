<script lang="ts">
  import Preview from "$lib/components/views/Preview.svelte";

  export let selectedLayout;
  let isCustomDuration=false;
  $: isCustomImgsDuration=[]
  let defaultDuration;
  export let inputFiles=[]
  let duration = selectedLayout.duration;
  let dpi = selectedLayout.duration.dpi;

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
  const customDuration= (i)=>{
    isCustomImgsDuration.forEach((elem)=>{
      if(elem){
        isCustomDuration=true;
      }

    })
    isCustomImgsDuration[i]= !isCustomImgsDuration[i];
  }
</script>
<label for="dpi">Duration per image:</label>
<input type="number" id="dpi" title="default: 5s" name="dpi" bind:value={defaultDuration} disabled={isCustomDuration}><br>
<label for="images-upload">Upload(max {selectedLayout.layout_data.maxCount}):</label>
<input type="file" id="images-upload" name="media" multiple accept="image/*" required on:change={(e)=>onFilesSelect(e)}>
{#if inputFiles.length>0}
  <label>Custom duration? <input type="checkbox" role="switch"> </label>
  <figure>
    <table>
      <tr>
      {#each inputFiles as image,i}
          <th>
            Img_{i+1}
            <input type="checkbox" role="switch"  on:change={()=>customDuration(i)}/>
            <input type="text" placeholder="default duration" name="imgDur{i+1}" disabled={!isCustomImgsDuration[i]}>
          </th>
      {/each}
        </tr>
        <tr>
          {#each inputFiles as image,i}
          <td><Preview {image} /></td>
          {/each}
        </tr>
    </table>
  </figure>
{/if}