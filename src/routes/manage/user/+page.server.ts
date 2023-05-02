import db from "../../../database/orm/Operations";
import type {PageServerLoad} from "../../../../.svelte-kit/types/src/routes/manage/$types";
import type {Actions} from "@sveltejs/kit";
import {error, redirect} from "@sveltejs/kit";
import {User} from "../../../database/Entities/User";



export const load = (async ({cookies}) => {
    const users = await db.getAll('user');
    const role = cookies.get('session')
    const username = cookies.get('user')
    if (role=='admin'){
        console.log(username)
        return {
            users
        };
    }else{
        throw error(403,{message:"Denied Access"})
    }
}) satisfies PageServerLoad;

export const actions = {
    add: async ({request}) =>{
        const data = await request.formData()
        const userdata = {
            id:data.get("id") as any,
            username: data.get("username") as string,
            password: data.get("password") as string,
            email: data.get("email") as string,
            name: data.get("name") as string,
            role: data.get("role") as any
        };
        const user = new User(userdata)
        console.log(user);
        if(user){
            await db.create(user)
            console.log("User created");
            throw redirect(303, '/manage/user')
        }else{
            console.log("enter missing data")
        }
    },
    edit: async ({request})=>{
        const data = await request.formData()
        const userdata = {
            id:data.get("id") as any,
            username: data.get("username") as string,
            password: data.get("password") as string,
            email: data.get("email") as string,
            name: data.get("name") as string,
            role: data.get("role") as any
        };
        const user = new User(userdata);
        await db.update(user,userdata.id)
        throw redirect(303, '/manage/user')
    },
    delete: async({request})=>{
        const data = await request.formData()
        const id = data.get("id") as any;
        const user = await db.getOne('user',id);
        await db.delete(new User(user));
        throw redirect(303, '/manage/user')
    }
}satisfies Actions
