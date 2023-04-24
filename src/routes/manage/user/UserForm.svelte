<script>
    import * as validators from "svelte-forms/validators";
    export let type="Add";
    export let isForm = false;
    export let ndx;
    export let users;
    function closeForm() {
        isForm = false;
        console.log(isForm)
    }
    function handleKeyDown(event) {
        if (event.key === "Escape") {
            closeForm();
        }
    }
</script>

<div id="overlay" style={isForm? 'display:block;':'display:none;'} on:click|self={closeForm} on:keydown={handleKeyDown} >
<div id="user-form">
    {#if type=="Add"}
    <h2>Add User</h2>
    <form method="POST" action="?/add">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" ><br>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password"><br>

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

        <button class="button add">Add</button>
    </form>
    {/if}
    {#if type=="Edit"}
        <h2>Edit User</h2>
        <form method="POST" action="?/edit">
            <label for="username">Username:</label>
            <input type="text" id="username edit" name="username"  bind:value={users[ndx].username} ><br>

            <label for="password">Password:</label>
            <input type="text" id="password edit" name="password"><br>

            <label for="email">Email:</label>
            <input type="email" id="email edit" name="email" validators={validators.email()} bind:value={users[ndx].email} ><br>

            <label for="name">Name:</label>
            <input type="text" id="name edit" name="name" bind:value={users[ndx].name} ><br>

            <label for="role">Role:</label>
            <select id="role edit" name="role" >
                <option value="admin">Admin</option>
                <option value="content_creator">Content creator</option>
                <option value="inactive">Inactive</option>
            </select><br>
            <input type="hidden" name="id" bind:value={users[ndx].id}>

            <button class="button edit">Edit</button>
        </form>
    {/if}
    {#if type=="Delete"}
        <h3> Are you sure you want to delete {users[ndx].name}?</h3>
        <form method="POST" action="?/delete">
        <input type="hidden" id="email delete" name="email" bind:value={users[ndx].email}>
        <input type="hidden" name="id" bind:value={users[ndx].id}>
        <button class="button delete">Delete</button>
        </form>
    {/if}

</div>

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
        display: block;
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    #user-form button.add {
        background-color: green;
        margin-right: 10px;
    }
    #user-form button.edit {
         background-color: orange;
         margin-right: 10px;
     }
    #user-form button.delete {
        background-color: red;
        margin-right: 10px;
    }
    #overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7); /* semi-transparent black */
        z-index: 9999; /* make sure it's on top of everything else */
    }


</style>
