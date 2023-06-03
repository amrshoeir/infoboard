<script lang="ts">
    import {goto} from "$app/navigation";
    import { onMount } from 'svelte';
    import UserForm from "$lib/components/Forms/UserForm.svelte";
    import Modal from "$lib/components/Modal.svelte";

    export let data
    export const roles = {
        admin:"Admin",
        content_creator:"Content creator",
        inactive:"Inactive"
    }
    let formType= "Add";
    let users = data.users;
    let len = Object.keys(users).length;
    const password = "*******"
    let editNdx;
    let dialog;
    onMount(() => {
        for (let i = 0; i < len; i++) {
            users[i]['editing'] = false;
        }
        users=users
    });
    function roleAssign(users, i):string {
        switch(users[i].role){
            case "admin" : return roles.admin;
            case "content_creator": return roles.content_creator;
            case "inactive" : return roles.inactive;
            default: return roles.inactive
        }
    }
    function editUser(i){
        formType="Edit";
        dialog.showModal();
        editNdx=i;
        users[i].editing = !users[i].editing;
    }
    function addUser(){
        formType="Add";
        dialog.showModal();
    }
    function deleteUser(i){
        if(users[i].role!='inactive') {
            alert('The user is active!');
            return;
        }
        formType="Delete";
        dialog.showModal();
        editNdx=i;
    }

</script>

<table>
    <thead>
    <tr>
        <th>Username</th>
        <th>Password</th>
        <th>Email</th>
        <th>Name</th>
        <th>Role</th>
        <th></th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>{users[0].username}</td>
        <td>{password}</td>
        <td>{users[0].email}</td>
        <td>{users[0].name}</td>
        <td>{roleAssign(users,0)}</td>
        <td>
            <button class="button edit" on:click={()=>{editUser(0)}} >Edit</button>
            <button class="button add"  on:click={()=>{addUser()}}>Add</button>
        </td>
    </tr>

    {#each users as user,i}
        {#if i>=1}
    <tr>
        <td>{user.username}</td>
        <td>{password}</td>
        <td>{user.email}</td>
        <td>{user.name}</td>
        <td>{roleAssign(users,i)}</td>
        <td>
            <button class="button edit" on:click={()=>{editUser(i)}}>Edit</button>
            <button class="button delete" on:click={()=>{deleteUser(i)}}>Delete</button>
        </td>
    </tr>
        {/if}
    {/each}
    </tbody>
</table>
<Modal bind:dialog on:submit={()=>location.reload()}>
    <UserForm type={formType} ndx={editNdx} users={users} bind:dialog on:submit={()=>location.reload()} />
</Modal>
<style>
    table {
        border-collapse: collapse;
        width: 100%;
        margin-top:90px;
    }
    th, td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }
    tr:hover {
        background-color: #007EA7;
    }
    .button {
        background-color: #4CAF50;
        border: none;
        color: white;
        padding: 8px 16px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 14px;
        margin: 4px 2px;
        cursor: pointer;
    }
    .edit {
        background-color: #008CBA;
    }
    .delete {
        background-color: #f44336;
    }
    .add {
        background-color: #555555;
        float: right;
    }

    .top-header {
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
    }

    .nav-button {
        background-color: #4CAF50;
        border: none;
        color: white;
        padding: 8px 16px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        height:60px;
        position: relative;
        font-size: 20px;
        cursor: pointer;
        margin-left: 10px; /* Add left margin to separate buttons */
    }
    .logout{
        background: grey;
    }

</style>