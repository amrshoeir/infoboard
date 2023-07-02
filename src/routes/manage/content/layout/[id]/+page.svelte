<script lang="ts">
  import { enhance } from "$app/forms";
  export let data
  const layout = data.layout
</script>
<form method="POST" action="/manage/content?/editLayout" use:enhance>
  <label>Description: <input type="text" name="description"  bind:value={layout.layout_data.description} ></label>
  <label>Duration (default) : <input type="number" name="duration" required bind:value={layout.duration}></label>
  <input type="hidden" name="id" bind:value={layout.id}>
  <div class="container">
    <button class="primary edit">Edit</button>
  </div>
</form>