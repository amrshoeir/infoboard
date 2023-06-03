<script lang="ts">
  import { enhance } from "$app/forms";

  export let layout
  export let addingLayout
  export let user
</script>
<div id="layouts-div">
  <br>
  {#if !addingLayout}<button class="button add-cancel" on:click={()=>{addingLayout=true}}>Add layout</button>
  {:else} <button class="button add-cancel" on:click={()=>{addingLayout=false}}>Cancel</button>
  {/if}
  <br>
  {#if addingLayout}
    <form on:submit={addingLayout=false} method="POST" action="?/addLayout" use:enhance={()=>{return location.reload()}}>
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
  <p>------</p>
  {#each layout as item, i}
    <form method="POST" action="?/deleteLayout" use:enhance={()=>{location.reload()}}>
      <h4>Name: {item.name}</h4>
      <h4>Title: {item.layout_data.title}</h4>
      <h4> Duration: {item.duration} </h4>
      <input type="hidden" id="layout-element" name="id" bind:value={item.id} />
      <button class="button delete">Delete layout</button><br>
    </form>
  {/each}
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
    .form-elements{
        display:flex;
        width:150px;
        flex-direction: column;
        align-content:center;
        margin: 5px 5px 3px 3px;
    }
    .form-elements button{
        padding: 5px;
    }
</style>