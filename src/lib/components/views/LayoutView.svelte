<script lang="ts">
  import { enhance } from "$app/forms";
  export let layout;
  const editLayout= (i)=>{

  }
</script>
  {#each layout as item, i}
    <details class="container-fluid">
    <summary role="button" class="primary outline">{item.name}</summary>
    <form  method="POST"  use:enhance={()=>{location.reload()}}>
      <section>
        <label>{item.layout_data.description}</label>
        <label>Duration: {item.duration} </label>
        <label></label>
      </section>
      <input type="hidden" id="layout-element" name="id" bind:value={item.id} />
      <button type="button" class="secondary" on:click={()=>{editLayout(i)}}>Edit</button><br>
      <button class="contrast outline" formaction="?/deleteLayout">Delete</button><br>
    </form>
    </details>
  {/each}

<style>
.container-fluid{
    width:20rem;
}
</style>
