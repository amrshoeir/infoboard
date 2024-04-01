<script lang="ts">
  import EditContent from "$lib/components/forms/edit/EditContent.svelte";
  export let data
  let content = data.content;
  $: content = data.content;
</script>
<article>
  <EditContent {content} />
</article>
<style>
    article{
        margin:0 auto;
        max-width:30rem;
    }
</style>