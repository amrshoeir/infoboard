<script lang="ts">
  import EditUser from "$lib/components/forms/edit/EditUser.svelte";

  export let data
  let user = data.user;
  $: user = data.user;
</script>
<article>
 <EditUser {user} />
</article>
<style>
 article{
  margin:0 auto;
  max-width:30rem;
 }
</style>
