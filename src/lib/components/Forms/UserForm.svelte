<script>
    import { enhance } from "$app/forms";
    export let type="Add";
    export let isForm = false;
    export let ndx;
    export let users;
    export let dialog;


    function closeForm() {
        dialog.close();
    }
</script>
    <div id="user-form">
        {#if type==="Add"}
            <h2>Add User</h2>
            <form method="POST" action="?/add" use:enhance={()=>{closeForm();}}>
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" ><br>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required title="Must include a number, capital letter, and a small letter"><br>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" ><br>

                <label for="name">Name:</label>
                <input type="text" id="name" name="name"><br>

                <label for="role">Role:</label>
                <select id="role" name="role">
                    <option value="admin">Admin</option>
                    <option value="content_creator">Content creator</option>
                    <option value="inactive">Inactive</option>
                </select><br>
                <div class="buttons">
                    <button class="button add">Add</button>
                    <button class="button cancel" on:click={()=>closeForm()}>Cancel</button>
                </div>
            </form>
        {/if}
        {#if type==="Edit"}
            <h2>Edit User</h2>
            <form method="POST" action="?/edit" use:enhance={()=>{dialog.close();location.reload()}}>
                <label for="username">Username:</label>
                <input type="text" id="username edit" name="username"  bind:value={users[ndx].username} ><br>

                <label for="password">Password:</label>
                <input type="text" id="password edit" name="password" placeholder="No change"><br>

                <label for="email">Email:</label>
                <input type="email" id="email edit" name="email" bind:value={users[ndx].email} ><br>

                <label for="name">Name:</label>
                <input type="text" id="name edit" name="name" bind:value={users[ndx].name} ><br>

                <label for="role">Role:</label>
                <select id="role edit" name="role" bind:value={users[ndx].role} >
                    <option value="admin">Admin</option>
                    <option value="content_creator">Content creator</option>
                    <option value="inactive">Inactive</option>
                </select><br>
                <input type="hidden" name="id" bind:value={users[ndx].id}>
                <div class="buttons">
                    <button class="button edit">Edit</button>
                    <button class="button cancel" on:click={()=>closeForm()}>Cancel</button>
                </div>
            </form>
        {/if}
        {#if type==="Delete"}
            <h3> Are you sure you want to delete {users[ndx].name}?</h3>
            <form method="POST" action="?/delete" use:enhance={()=>{dialog.close();location.reload();}}>
                <input type="hidden" id="email delete" name="email" bind:value={users[ndx].email}>
                <input type="hidden" name="id" bind:value={users[ndx].id}>
                <div class="buttons">
                    <button class="button delete">Delete</button>
                    <button class="button cancel" on:click={()=>closeForm()}>Cancel</button>
                </div>
            </form>
        {/if}
    </div>

<style>
    #user-form {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        padding: 20px;
        z-index: 10000;
        width: 500px;
    }

    #user-form h2 {
        font-size: 24px;
        margin-top: 0;
    }

    #user-form label {
        display: block;
        margin-bottom: 5px;
    }

    #user-form input,
    #user-form select {
        display: block;
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
    }

    #user-form button {
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    #user-form button.add {
        background-color: green;
        margin-left: 10px;
    }
    #user-form button.edit {
         background-color: orange;
         margin-left: 10px;
     }
    #user-form button.delete {
        background-color: red;
        margin-left: 10px;
    }
    #user-form button.cancel{
        background-color:grey;
        margin-right:10px;
    }
    #user-form .buttons{
        display: flex;
        flex-direction:row;
        justify-content:space-between;
    }

</style>
