import db, {UserRole} from "../../../database/orm/operations";
import type {PageServerLoad} from "../../../../.svelte-kit/types/src/routes/manage/$types";
import type {Actions} from "@sveltejs/kit";
import {redirect} from "@sveltejs/kit";
import {User} from "../../../Entities/User";



export const load = (async () => {
    const user = await db.getUsers("*");
    return {
        user
    };
}) satisfies PageServerLoad;

export const actions = {
    add: async ({request}) =>{
        const data = await request.formData()
        const userdata = {
            username: data.get("username") as string,
            password: data.get("password") as string,
            email: data.get("email") as string,
            name: data.get("name") as string,
            role: data.get("role") as UserRole
        };
        const user = new User(userdata.username,userdata.password,userdata.email,userdata.name,userdata.role)
        console.log(user);
        if(data){
            await db.create(user)

            throw redirect(303, '/manage/user')
        }else{
            console.log("enter ")
        }
    },
    edit: async ({request})=>{
        const data = await request.formData()
        console.log(data)
        throw redirect(303, '/manage/user')
    },
    delete: async({request})=>{
        const data = await request.formData()
        console.log(data)
        throw redirect(303, '/manage/user')
    }
}satisfies Actions
