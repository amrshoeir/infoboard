<script lang="ts">
  import { enhance } from "$app/forms";

  let addingLayout= false;
  export let user
</script>
  {#if !addingLayout}<button on:click={()=>{addingLayout=true}}>Add layout</button>
  {:else} <button on:click={()=>{addingLayout=false}}>Cancel</button>
  {/if}
  <br>
  {#if addingLayout}
    <form on:submit={addingLayout=false} method="POST" action="?/addLayout" use:enhance={()=>{return location.reload()}}>
      <div>
        <label for="layout-name" >Name:</label>
        <input id="layout-name" type="text" name="name" ><br>
        <label for="layout-duration">Duration in seconds:</label>
        <input id="layout-duration" type="number" name="duration"><br>
        <label for="layout-data-json">Data in JSON:</label>
        <input type="file" id="layout-data-json" name="layout_data"><br>
        <input type="hidden" name="user_id" bind:value={user.id}>

        <button>Submit</button>
      </div>
    </form>
  {/if}
<style>

</style>