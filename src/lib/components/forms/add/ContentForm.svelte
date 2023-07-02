<script lang="ts">
  import { enhance } from "$app/forms";
  import ImageForm from "../fragments/ImageForm.svelte";
  import VideoForm from "../fragments/VideoForm.svelte";
  import GalleryForm from "../fragments/GalleryForm.svelte";
  export let user;
  export let layout;
  let inputFiles=[];
  let addingContent = false;
  let selectedLayout=layout[0]
  $: selectionComponents={
    'Image':ImageForm,
    'Video':VideoForm,
    'Gallery':GalleryForm
  }
   const changeLayouts= ()=>{
    inputFiles=[];
  }


</script>
<form class="container-fluid" action="?/addContent" method="post" use:enhance={()=>{location.reload(); addingContent=false;}} enctype="multipart/form-data">
{#if addingContent}
    <label>Name<input type="text" name="name" required></label>
  <label>Layout
    <select name="layout" bind:value={selectedLayout} on:change={changeLayouts}>
      {#each layout as opt (opt.name)}
      <option value={opt}>
        {opt.name}
      </option>
      {/each}
    </select>
    <input hidden name="layout_id" bind:value={selectedLayout.id}>
  </label>
  <div class="grid">
    <label>Start time <input type="datetime-local" name="start_time"></label>
    <label>End time <input type="datetime-local" name="end_time"></label>
  </div>
  <svelte:component this={selectionComponents[selectedLayout.name]} {selectedLayout} {inputFiles}></svelte:component>
  <div class="grid">
    <button>Submit</button>
    <button class="warning" type="reset" on:click={()=>addingContent=false}>Cancel</button>
  </div>
  {:else}
  <button type="button" on:click={()=>addingContent=true}>Add content</button>
{/if}
  <input type="hidden" name="user_id" value={user.id}>
</form>