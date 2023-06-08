<script lang="ts">
  export let previewElement;
  export let element
</script>
<figure>
  <svelte:element autoplay alt="" src={element.result} this={previewElement} ></svelte:element>
</figure>
<style>
  figure{
      width:20rem;
  }
</style>