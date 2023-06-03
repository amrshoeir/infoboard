<script>
    import { page } from '$app/stores'
</script>
<style>
    .container {
        width: 600px;
        margin: 100px auto;
        background-color: #fff;
        padding: 40px;
        border-radius: 5px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    }

    h1 {
        font-size: 24px;
        margin-bottom: 20px;
    }

    p {
        font-size: 16px;
        margin-bottom: 30px;
    }

    .error-code {
        font-size: 48px;
        font-weight: bold;
        margin-bottom: 30px;
    }

    .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #4CAF50;
        color: #fff;
        text-decoration: none;
        border-radius: 4px;
        transition: background-color 0.3s ease;
    }

    .button:hover {
        background-color: #45a049;
    }
</style>

<div class="container">
    <h1>Error Page</h1>

    {#if $page.status === 500}
        <div class="error-500">
            <h2>500 Internal Server Error</h2>
            <p>Oops! Something went wrong on our end. We are working to fix the issue. Please try again later.</p>
            <a href="/" class="button">Home</a>
        </div>
    {/if}
    {#if $page.status === 404}
        <div class="error-404">
            <h2>404 Not Found</h2>
            <p>The page you are looking for could not be found. Please check the URL or try searching.</p>
            <a href="/" class="button">Home</a>
        </div>
    {/if}
    {#if $page.status === 403}
        <div class="error-404">
            <h2>403 Access Denied</h2>
            <p>You are not authorized to access this page. Please contact the administration for help.</p>
            <a href="/" class="button">Home</a>
        </div>
    {/if}
</div>
