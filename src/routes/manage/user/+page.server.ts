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
        const userData = {
            id:data.get("id") as any,
            username: data.get("username") as string,
            password: data.get("password") as string,
            email: data.get("email") as string,
            name: data.get("name") as string,
            role: data.get("role") as any
        };
        const user = new User(userData)
        console.log(user);
        if(user){
            await db.create(user)
            console.log("User created");
            console.log(await db.getOne('user', await db.getIdByKey('user','email',user.email)))
            throw redirect(303, '/manage/user')
        }else{
            console.log("enter missing data")
        }
    },
    edit: async ({request})=>{
        const data = await request.formData()
        const userData = {
            id:data.get("id") as any,
            username: data.get("username") as string,
            password: data.get("password") as string,
            email: data.get("email") as string,
            name: data.get("name") as string,
            role: data.get("role") as any
        };
        const user = new User(userData);
        await db.update(user,userData.id)
        throw redirect(303, '/manage/user')
    },
    delete: async({request})=>{
        const data = await request.formData()
        const id = data.get("id") as any;
        const user = await db.getOne('user',id);
        if(user.role == 'inactive'){
            await db.delete(new User(user));
            throw redirect(303, '/manage/user')
        }
        else{
            throw redirect(303, '/manage/user')
        }

    }
}satisfies Actions

