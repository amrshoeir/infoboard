<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import '@picocss/pico';
  import '../app.css';
  export let data;
  const session = data.role;
  $: route = $page.url.pathname as string;
  $: userState=data.user? 'Content Panel':'';
    const format= (route)=>{
      let routeName = route.split('/') || '/';
      switch(routeName[routeName.length-1]){
        case 'content': return 'Content Panel'
        case 'user': return 'User Panel'
        case 'manage': return 'Login page'
        default: return 'InfoBoard'
    }

  }
   const logoutUser= async()=> {
    try {
      const response = await fetch('/manage/user', {
        method: 'POST'
      });
      if (response.ok) {
        setTimeout(()=>{
          location.reload();
        },500)
        await goto('/manage')
      } else {
        console.error('Failed to logout user');
      }
    } catch (error) {
      console.error(error);
    }
  }
</script>
<header>
  <nav class="nav">
    <ul>
      <li class="nav-elements">
        <a class="contrast routes" href="/">Homepage</a>
      </li>
      {#if userState}
        <li class="nav-elements">
          <a class="routes" href="/manage/content">{userState}</a>
        </li>
      {/if}
      {#if session}
        <li class="nav-elements">
          {#if session==='admin'}
            <a class="routes" href="/manage/user">User Panel</a>
          {/if}
        </li>
      {/if}
    </ul>
    <ul>
      {#if data.user}
        <li>
          Logged in: {data.user}
        </li>
        <li on:keypress on:click={()=>{logoutUser()}}>
          <a role="button" href="/manage">Logout</a>
        </li>
      {:else}
        <li>
          <a role="button" href="/manage">Login</a>
        </li>
      {/if}
    </ul>
  </nav>
  <h4>
    {format(route)}
  </h4>
</header>
<main class="container">
  <slot/>
</main>
<style>
    .nav-elements{
      cursor:pointer;
      border-bottom:solid 1px rgba(0, 217, 255, 0.34);
    }
    .routes:hover{
        color: rgba(0, 172, 193, 0.25);
    }
    .nav{
        display:flex;
        height:2rem;
        padding:2rem;
        margin:0.5rem;
    }
    h4{
        margin:1rem;
        border-bottom:solid 1px rgba(221, 221, 221, 0.18);
    }
</style>