import db from "$database/orm/Operations";
import type {PageServerLoad} from "../../../../.svelte-kit/types/src/routes/manage/$types";
import type { Actions, Cookies } from "@sveltejs/kit";
import { error, fail, redirect } from "@sveltejs/kit";
import {User} from "../../../database/Entities/User";
import bcrypt from "bcrypt";
import { to_number } from "svelte/internal";
import * as utils from '$lib/utils'


const settingCookie = (async(username:string)=>{
    const response = new Response(null, {
        status: 200, statusText: 'OK', headers: {
            'Set-cookie': `user=${db.generateJWT};HttpOnly;Path=/`
        }
    })


    return response;
})
export const load = (async ({cookies}) => {
    const users = await db.getAll('user');
    const role = cookies.get('session')
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
            id:to_number(data.get("id")),
            username: data.get("username") as string,
            password: await bcrypt.hash(data.get("password") as string,10),
            email: data.get("email") as string,
            name: data.get("name") as string,
            role: data.get("role") as string
        };
        if(userData.password =='' || userData.email ==''){
            console.log("enter missing data")
            return fail(400,{message:"missing information"})
        }else{
            const user = new User(userData)
            await db.create(user)
            console.log("User created");
            throw redirect(303, '/manage/user')
        }
    },
    edit: async ({request,cookies})=>{
        const data = await request.formData()
        const user_id = to_number(data.get('id'));
        const userCookie = cookies.get('user')
        const sessionUser = await db.getOne('user',await db.getIdByKey('user','username',userCookie))
        const editingUser = await db.getOne('user',user_id)
        const username = data.get('username') as string;
        let role = data.get("role") as string;
        if(sessionUser.id==editingUser.id){
            if(role=="inactive" || role=="content_creator"){
                console.log("can't edit online user's role")
                role=editingUser.role;
            }
            cookies.set("user",username,{path:'/'})
        }
        const password = data.get('password') as string;
        const userData = {
            id:user_id,
            username: username,
            password: password,
            email: data.get("email") as string,
            name: data.get("name") as string,
            role
        };
        const user = new User(userData);
        await db.update(user,userData.id)
        throw redirect(303,'/manage/user')
    },
    delete: async({request,cookies})=>{
        const data = await request.formData()
        const id = data.get("id") as any;
        const user = await db.getOne('user',id);
        const username = cookies.get('user')
        if(user.username != username){
            await db.delete(new User(user));
        }
        else{
            console.log('cannot delete user')
            return error(400,)
        }

    }
}satisfies Actions

