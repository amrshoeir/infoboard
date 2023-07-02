<script lang="ts">
  import { enhance } from "$app/forms";
  import Modal from "$lib/components/Modal.svelte";
  import { form } from "svelte-forms";
  export let user;
  let role = user.role;
  let deleteModal= false;

  function openDelete() {
    deleteModal=true;
  }

</script>
<h2>Edit user</h2>
<form method="POST" action="/manage/user?/edit" use:enhance enctype="multipart/form-data">
  <label>Username: <input type="text" name="username"  bind:value={user.username} ></label>
  <label>Password: <input type="password" name="password" placeholder="No change"></label>
  <label>Email: <input type="email" name="email" bind:value={user.email} ></label>
  <label >Name: <input type="text" name="name" bind:value={user.name} ></label>
  <label for="role">Role:</label>
  <select id="role" name="role" bind:value={role} >
    <option value="admin">Admin</option>
    <option value="content_creator">Content creator</option>
    <option value="inactive">Inactive</option></select>
  <input type="hidden" name="id" bind:value={user.id}>
  <div class="container">
    <button class="primary edit">Edit</button>
    {#if role==='inactive'}
      <button type="button" class="contrast outline" on:click={()=>openDelete()}>Delete?</button>
    {/if}
  </div>
</form>
<Modal showModal={deleteModal}>
  <h3 slot=header> Are you sure you want to delete {user.name}?</h3>
  <form method="POST" action="/manage/user?/delete" use:enhance>
    <input type="hidden" id="email delete" name="email" bind:value={user.email}>
    <input type="hidden" name="id" bind:value={user.id}>
    <button class="primary delete"> Delete</button>
  </form>
</Modal>