<script lang="ts">
  import Preview from "$lib/components/views/Preview.svelte";

  export let selectedLayout;
  let duration= selectedLayout.duration;
  export let inputFiles=[]

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
  const onImageSelect = async (e)=>{
    inputFiles=[];
    await logFiles([...e.target.files]);
  }
</script>
<label>Duration <input type="number" name="duration" value={duration}></label>
<label><input type="file" name="media" accept="image/*" on:change={(e) => onImageSelect(e)}></label>
<label>Description: <input type="text" name="description" placeholder="Enter content description"></label>
{#if inputFiles.length >0}
<Preview previewElement="img" element={inputFiles[0]}/>
{/if}
