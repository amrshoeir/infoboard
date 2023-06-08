<script>
  import { enhance } from "$app/forms";
  export let content;
  export let showModal;
</script>

<form method="POST" action="/manage/content?/editContent" use:enhance={()=>{showModal=false}}>
  <label>Description: <input type="text" name="description"  bind:value={content.content_data.title} ></label>
  <label>Duration: <input type="number" name="duration" required bind:value={content.duration}></label>
  <label>Start date: <input type="datetime-local" name="start_date" bind:value={content.start_time} ></label>
  <label >End date: <input type="datetime-local" name="end_time" bind:value={content.end_time} ></label>
  <input type="hidden" name="id" bind:value={content}>
  <div class="container">
    <button class="primary edit" on:click={()=>showModal=false}>Edit</button>
  </div>
</form>