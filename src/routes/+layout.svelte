<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  export let data;
  const session = data.role;
  const route = $page.route.id as string;
  let dark:boolean;
  let userState=data.user? 'Content':'Login';


  function toggle() {
    dark= !dark;
    window.document.body.classList.toggle('dark-mode')
  }
  function formatRoute(route){
    let routeName = route.split('/')
    switch(routeName[routeName.length-1]){
      case 'content': return 'Content management'
      case 'user': return 'User management'
      case 'manage': return 'Login page'
      default: return 'Homepage'
    }

  }
  async function logoutUser() {
    try {
      const response = await fetch('/manage/user', {
        method: 'POST'
      });
      if (response.ok) {
        setTimeout(()=>{
          goto('/manage')
          location.reload();
        },500)
      } else {
        console.error('Failed to logout user');
      }
    } catch (error) {
      console.error(error);
    }
  }
</script>
<div class="full-page">
  <nav>
    <ul>
      <li class="main-title" on:click={()=>goto('/')}>
        <h3>
          {formatRoute(route)}
        </h3>
      </li>
      <li on:click={()=>goto('/manage')}>
        <h3>
          {userState}
        </h3>
      </li>
      <li on:click={()=>goto('/manage/user')}>
        {#if session==='admin'}
          <h3>
            Users
          </h3>
        {/if}
      </li>
        {#if data.user}
          <li>
        <h3 class="logout" on:click={()=>{logoutUser()}}>
          Logout
        </h3>
          </li>
          <li>
          <span>
            Logged in: {data.user}
          </span>
          </li>
          {:else}
          <li>
          <h3 style="cursor:default">L5L4OV</h3>
          </li>
        {/if}
    </ul>
  </nav>
</div>
<slot/>

<button on:click={toggle} class="dark">
  {dark? 'Light Theme':'Dark Theme'}
</button>

<style>

    :global(body) {
        background-color: #eafdfc;
        color: #003249;
        transition: background-color 0.3s
    }
    :global(body.dark-mode) {
        background-color: #003249;
        color: #e9ecef;
    }
    :global(body.dark-mode) .dark {
        background-color: #f76026;
        color: white;
    }
    :global(body.dark-mode) nav{
        background: rgb(0,50,73);
        background: rgb(0,50,73);
        background: linear-gradient(90deg, rgba(0,50,73,1) 0%,
        rgba(23,106,144,1) 88%, rgba(24,108,147,1) 89%
        , rgba(25,110,150,1) 90%, rgba(26,112,153,1) 92%,
        rgba(29,119,162,1) 94%, rgba(30,122,165,1) 95%,
        rgba(31,124,168,1) 96%, rgba(32,127,171,1) 97%,
        rgba(35,134,180,1) 100%);
    }
    :global(body) nav{
        background: rgb(67,129,136);
        background: linear-gradient(90deg, rgba(67,129,136,1) 0%,
        rgba(97,167,175,1) 30%, rgba(99,169,178,1) 32%,
        rgba(103,174,183,1) 36%, rgba(106,178,187,1) 39%,
        rgba(111,184,193,1) 44%, rgba(115,189,198,1) 48%,
        rgba(119,194,203,1) 52%, rgba(122,198,207,1) 55%,
        rgba(125,202,211,1) 58%, rgba(128,206,215,1) 61%);
    }
    .dark {
        background-color: #007EA7;
        font-size:15px;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 0.5rem;
        position:fixed;
        bottom:0;
    }
    nav{
        position: fixed;
        width:100%;
        display:block;
        top:0;
        left:0;
        right:0;
        border: #9AD1D4 4px outset;
        margin-right:5px;
        height:80px;
        z-index: 100;
        background: rgb(0,50,73);
        background: linear-gradient(90deg, rgba(0,50,73,1) 0%, rgba(0,126,167,1) 43%, rgba(154,209,212,1) 100%);
    }
    ul{
        position:relative;
        display:flex;
        justify-content:space-between;
        align-items:center;
        flex-direction:row;
        list-style-type: none;
        margin-right:3px;
    }
    h3{
        font-family: helvetica, sans-serif;
        cursor:pointer;
        padding:2px;
    }
    .logout{
        margin-bottom:20px;
    }
   *{
       font-family:helvetica, sans-serif
   }
</style>