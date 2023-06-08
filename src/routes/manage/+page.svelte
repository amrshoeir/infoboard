<script lang="ts">
    export let data
    export let email = '';
    export let password = '';
</script>
    <hgroup class="headers">
        <h2 class="header-text">InfoBoard</h2>
        <h5 class="header-text">Supervisor: Laborci Gergely</h5>
        <h5 class="header-text">Author: Amr Sheir</h5>
    </hgroup><form method="POST" action="?/login" class="container">
        <label for="email">Email:</label>
        <input type="text" name="email" id="email" bind:value={email}>
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" bind:value={password}>
        <button>Login</button>
    </form>

<style>
    .headers{
        display:flex;
        flex-direction: column;
        align-items:center;
        margin-top:5rem;
    }
    .container{
        width:20rem;
    }
</style>