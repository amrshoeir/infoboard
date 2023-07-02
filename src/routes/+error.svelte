<script>
    import { page } from '$app/stores'
</script>
<style>
    .container {
        margin: 100px auto;
        padding: 40px;
    }
</style>
<div class="container">
    <h1>Oops!</h1>
    {#if $page.status === 500}
        <div>
            <h2>500 Internal Server Error</h2>
            <p>Oops! Something went wrong on our end. We are working to fix the issue. Please try again later.</p>
        </div>
    {/if}
    {#if $page.status === 404}
        <div>
            <h2>404 Not Found</h2>
            <p>The page you are looking for could not be found. Please check the URL.</p>
        </div>
    {/if}
    {#if $page.status === 403}
        <div>
            <h2>403 Access Denied</h2>
            <p>You are not authorized to access this page. Please contact the administration for help.</p>
        </div>
    {/if}
    <a href="/" role="button">Homepage</a>

</div>
