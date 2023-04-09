

<script>
    import {goto} from '$app/navigation';
    export let email = '';
    export let password = '';

    function handleLogin() {
        // TODO: check credentials on the server
        // If login is successful, navigate to the content management
        if(email && password){
            goto('/manage/content');
        }

        // location.reload();

    }
</script>


<h1> LOGIN PAGE </h1>
<div class="login-box">
    <form method="POST" action="?/login">
    <label for="email">Email:</label>
    <input type="email" id="email" bind:value={email}>

    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password}>

    <button on:click={handleLogin}>Login</button>
    </form>
</div>

<style>
    input {
        display: block;
        margin-bottom: 10px;
        padding: 5px;
        border: none;
        border-bottom: 1px solid #ccc;
        font-size: 16px;
        width: 100%;
        box-sizing: border-box;
    }

    button {
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #3e8e41;
    }

    .login-box {
        width: 300px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
</style>