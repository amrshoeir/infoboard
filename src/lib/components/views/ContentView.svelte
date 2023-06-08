<script lang="ts">
  import { enhance } from "$app/forms";
  import Image from "../layouts/Image.svelte";
  import Gallery from "../layouts/Gallery.svelte";
  import Video from "../layouts/Video.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import EditContent from "$lib/components/forms/edit/EditContent.svelte";
  export let content;
  let showModal = false;
  $:content;
  let components = [
    Image,
    Gallery,
    Video
  ]
</script>
<div class="container">
  {#each content as item,i}
    <details>
      <summary role="button" class="primary outline">{item.name} -- {item.content_data.layout} Layout</summary>
      <hgroup>
        <h3>
          {item.content_data.title}
        </h3>
        <h5>
          {#if new Date() < item.start_time}
            <i>[Anticipating]</i> <strong>{item.start_time.toLocaleDateString('hu-HU')}</strong>
          {:else}
          <strong>{item.start_time.toLocaleString('hu-HU')}</strong>
          {/if}--
          {#if new Date() > item.end_time}
            <strong>{item.end_time.toLocaleDateString('hu-HU')}</strong><i>[Expired]</i>
            {:else} <strong>{item.end_time.toLocaleString('hu-HU')}</strong>
          {/if}
        </h5>
        <h5>
          Duration: {item.duration} seconds
        </h5>
        <h5>
        </h5>
      </hgroup>
      <figure>
      </figure>
    <form method="POST" use:enhance={()=>{location.reload()}}>
      <input type="hidden" id="content-element" name="content_id" bind:value={item.id} />
      <div class="grid">
        <button type="button" on:click={()=>showModal=true}>
          Edit
        </button>
        <button formaction="?/deleteContent">
          Delete
        </button>
      </div>
    </form>
    </details>
    <Modal bind:showModal>
      <h2 slot="header">Edit content</h2>
      <EditContent content={item} bind:showModal />
    </Modal>
  {/each}
</div>
<style>

</style>