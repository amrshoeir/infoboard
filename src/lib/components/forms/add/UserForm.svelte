<script>
    import { enhance } from "$app/forms";
</script>
  <form method="POST" action="?/add" use:enhance={()=>{location.reload();}}>
    <h2>Add User</h2>
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" >
    <label for="password">Password:</label><input type="password" id="password" name="password" required title="Must include a number, capital letter, and a small letter">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    <label for="role">Role:</label>
    <select id="role" name="role">
      <option value="admin">Admin</option>
      <option value="content_creator">Content creator</option>
      <option value="inactive">Inactive</option>
    </select>
    <div>
      <button>Add</button>
    </div>
  </form>