<script lang="ts">
  import { enhance } from "$app/forms";
  export let layout;
</script>
  {#each layout as item, i}
    <details>
    <summary role="button" class="primary outline">{item.name}</summary>
    <form  method="POST" use:enhance={()=>{location.reload()}}>
      <section>
        <hgroup>
          <a href="/manage/content/layout/{item.id}"><h6>{item.layout_data.description}</h6></a>
          <h6>Duration: {item.duration}</h6>
        </hgroup>
      </section>
      <input type="hidden" id="layout-element" name="id" bind:value={item.id} />
<!--      <button type="button" class="secondary" on:click={()=>{editLayout(i)}}>Edit</button><br>-->
<!--      <button class="contrast outline" formaction="?/deleteLayout">Delete</button><br>-->
    </form>
    </details>
  {/each}

<style>
.container-fluid{
    width:20rem;
}
</style>
