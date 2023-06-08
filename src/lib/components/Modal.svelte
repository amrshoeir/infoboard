<script lang="ts">
   export let showModal;
   let dialog;
  $: if (dialog && showModal) dialog.showModal();
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
  bind:this={dialog}
  on:close={()=>{showModal = false;}}
  on:click|self={()=>dialog.close()}
>
   <div on:click|stopPropagation>
      <!-- svelte-ignore a11y-autofocus -->
      <slot name="header" autofocus/>
      <hr />
      <slot />
      <hr />
      <button type="button" class="outline secondary" on:click={() => dialog.close()}>Cancel</button>
   </div>
</dialog>
<style>
  dialog{
     max-width: 32em;
     border-radius: 0.2em;
     border: none;
     padding: 0;
  }
  dialog::backdrop {
     background: rgba(0, 0, 0, 0.3);
  }
  dialog[open] {
     animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  dialog[open]::backdrop {
     animation: fade 0.5s ease-out;
  }
  @keyframes fade {
     from {
        opacity: 0;
     }
     to {
        opacity: 1;
     }
  }
</style>
