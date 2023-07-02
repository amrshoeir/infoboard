<script lang="ts">
  import { enhance } from "$app/forms";
  export let content;
  $: content;
</script>

<form method="POST" action="/manage/content?/editContent" use:enhance >
  <label>Description: <input type="text" name="description"  bind:value={content.content_data.title} ></label>
  <label>Duration: <input type="number" name="duration" required bind:value={content.duration}></label>
  <label>Start date: <input type="datetime-local" name="start_time" bind:value={content.start_time} ></label>
  <label >End date: <input type="datetime-local" name="end_time" bind:value={content.end_time} ></label>
  <input type="hidden" name="id" bind:value={content.id}>
  <div class="container">
    <button class="primary edit">Edit</button>
  </div>
</form>