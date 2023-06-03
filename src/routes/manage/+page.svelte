<script lang="ts">

    export let data
    export let email = '';
    export let password = '';

    async function handleLogin() {
        const cookie = data.userCookie;
        if(cookie == "true?"){
        console.log("auth correct")
        }
    }
</script>

<div class="login-page">
<div class="header">
    <h2 class="header-text">InfoBoard</h2>
    <h5 class="header-text">Author: Amr Sheir</h5>
</div>
    <div class="login-box">
        <form method="POST" action="?/login">
            <label for="email">Email:</label>
            <input type="email" name="email" id="email" bind:value={email}>

            <label for="password">Password:</label>
            <input type="password" name="password" id="password" bind:value={password}>

            <button on:click={handleLogin}>Login</button>

        </form>
        </div>
</div>

<style>
    .header-text{
        font-family:"Segoe UI",sans-serif;

    }
    .header{
       width:200px;
       margin:0 auto;
        text-align:center;
    }
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
    .login-page{
        margin-top:100px;
    }
</style>