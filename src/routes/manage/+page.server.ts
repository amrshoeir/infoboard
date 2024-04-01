import db from "$database/orm/Operations"
import type {Actions} from "@sveltejs/kit";
import {error, redirect} from "@sveltejs/kit";


export const actions = {
    login: async ({request,cookies}) =>{
        const data = await request.formData()
        const email = data.get("email") as string;
        const password = data.get("password") as string;
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
            }else {
                console.log(email +' ' + password)
                console.log("verification went wrong ig")
            }
        }else {
            console.log("provide email or password")
        }
    }
}satisfies Actions;
