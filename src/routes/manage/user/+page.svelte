<script lang="ts">
    import UserForm from "$lib/components/forms/add/UserForm.svelte";
    import Modal from "$lib/components/Modal.svelte";
    export let data
    const roles = {
        admin:"Admin",
        content_creator:"Content creator",
        inactive:"Inactive"
    }
    const password = "*******"

    let [...users] = data.users
    let viewUsers= [];
    let view = "all";
    let showModal = false;
    $: users = data.users;
    $:{
        view
        viewUsers=[];
        users.forEach((elem,i)=>{
            if(view==="all"){
                viewUsers=users;
                return;
            }
            if(users[i].role === view){
                viewUsers.push(users[i]);
            }
        })
        console.log(view)
    }
    function roleAssign(users, i):string {
        switch(users[i].role){
            case "admin" : return roles.admin;
            case "content_creator": return roles.content_creator;
            case "inactive" : return roles.inactive;
            default: return roles.inactive
        }
    }
    function add(){
        showModal = true;
    }

    function deleteUser(i){
        if(users[i].role!='inactive') {
            alert('The user is active!');
            return;
        }
    }
</script>
<nav>
    <ul>
        <li><a href="/manage/user" on:keypress on:click={()=>{view="all"}} class="contrast outline">All</a></li>
    </ul>
    <ul>
        <li><button class="outline" on:click={()=>{view="admin"}}>Admins</button></li>
        <li><button class="contrast outline" on:click={()=>{view="content_creator"}}>Content creators</button></li>
        <li><button class="secondary outline" on:click={()=>{view="inactive"}} >Inactive</button></li>
    </ul>
    <ul>
        <li><a role="button" href="/manage/user" class="contrast" on:click={()=>add()}>New</a></li>
    </ul>
</nav>
<figure>

<table>
    <thead>

    <tr>
        <th>Username</th>
        <th>Password</th>
        <th>Email</th>
        <th>Name</th>
        <th>Role</th>
    </tr>
    <tr>
        <td>  <a class="contrast outline" href="/manage/user/{users[0].username}">{users[0].username} (Main admin)</a></td>
        <td>{password}</td>
        <td>{users[0].email}</td>
        <td>{users[0].name}</td>
        <td>--</td>
        <!--            <td>-->
        <!--&lt;!&ndash;            <button class="secondary" on:click={()=>{editUser(0)}} >Edit</button>&ndash;&gt;-->
        <!--            </td>-->
    </tr>
    </thead>

    <tbody>
    {#each viewUsers as user,i}
        {#if i>=1}
            <tr>
                <td><a href="/manage/user/{users[i].username}">{user.username}</a></td>
                <td>{password}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{roleAssign(viewUsers,i)}</td>
            </tr>
        {/if}
    {/each}
    </tbody>
</table>
</figure>
<Modal bind:showModal>
    <figure class="container">
        <svelte:component this={UserForm} ></svelte:component>
    </figure>
</Modal>
<style>
    tr{
        height:3rem;
        width:5rem;
    }
    .container{
        width:30rem;
        height:30rem;
    }
</style>