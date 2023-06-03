import db from "../../database/orm/Operations"
import type {Actions} from "@sveltejs/kit";
import type {PageServerLoad} from "../../../.svelte-kit/types/src/routes/manage/$types";
import {error, redirect} from "@sveltejs/kit";
import user from "../../database/Entities/User";

const key ="amr.sheir@pte.hu"
const debug = await db.getOne('user',await db.getIdByKey('user',"email",key));
console.log(debug.email);

export const load = (async ({ cookies }) => {
    const userCookie = await cookies.get('user');
    return {
        userCookie
    };
}) satisfies PageServerLoad;

export const actions = {
    login: async ({request,cookies}) =>{
        const data = await request.formData()
        const email = data.get("email") as string;
        const password = data.get("password") as string;
        console.log('manage page cookie print: ' +cookies.get('user'))
        // checks if empty
        if(email&&password) {
            if(await db.verifyPassword(email, password)) {
                const role = await db.checkRole(email) as string;
                const id = await db.getIdByKey('user',"email",email)
                let username = await db.getOne('user',id);
                username = username.username;
                if(role=="admin"){
                    cookies.set("session","admin")
                    cookies.set("user",username)
                    throw redirect(303, '/manage/user')
                }
                if(role=="content_creator"){
                    cookies.set("session","content_creator")
                    cookies.set("user",username)
                    throw redirect(303, '/manage/content')
                }
                throw error(403,{message:"Denied Access"})
                throw redirect(303,'/')

            // todo verification errors
            }else {
                console.log(email +' ' + password)
                console.log("verification went wrong ig")
            }
        }else {
            console.log("provide email or password")
        }
    }
}satisfies Actions;
