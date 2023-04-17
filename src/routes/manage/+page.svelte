

<script lang="ts">
    import type { PageData } from './$types';

    export let data:PageData;
    export let loginEmail = '';
    export let registerEmail = '';
    export let loginPassword = '';
    export let registerPassword = '';
    export let name = '';

    async function handleLogin() {

        const cookie = data.userCookie;
        if(cookie == "true?"){
        console.log("auth correct")
        }

    }

    function handleRegister(){
        console.log("user creating attempt")
    };
</script>

<div class="header">
    <h2 class="header-text"> Thesis App</h2>
    <h5 class="header-text">Author: Amr Sheir</h5>
</div>
<div>
    <div class="login-box">

        <form method="POST" action="?/login">
            <label for="loginEmail">Email:</label>
            <input type="email" name="email" id="loginEmail" bind:value={loginEmail}>

            <label for="loginPassword">Password:</label>
            <input type="password" name="password" id="loginPassword" bind:value={loginPassword}>

            <button on:click={handleLogin}>Login</button>

        </form>
    </div>
    <div class="login-box">

        <form method="POST" action="?/register">
            <label for="registerEmail">Email:</label>
            <input type="email" name="email" id="registerEmail" bind:value={registerEmail}>

            <label for="registerPassword">Password:</label>
            <input type="password" name="password" id="registerPassword" bind:value={registerPassword}>
            <label for="name">Name:</label>
            <input type="text" name="password" id="name" bind:value={name}>

            <button on:click={handleRegister}>Register</button>

        </form>
        <h4>{data.userCookie}</h4>

    </div>

</div>

<style>
    .header-text{
        font-family:"Segoe UI"

    }
    .header{
       width:150px;
       margin:0 auto;
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
</style>