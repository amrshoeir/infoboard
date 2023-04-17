import db, {UserRole} from "../../database/orm/operations"
import type {Actions} from "@sveltejs/kit";
import type {PageServerLoad} from "../../../.svelte-kit/types/src/routes/manage/$types";
import {redirect} from "@sveltejs/kit";

const key ="email"

const debug = await db.getUsers(key);
console.log(debug[0].email);



//db.modifyPasswords("sheir",7)

export const actions = {
    login: async ({request,cookies}) =>{
        // fetches data with right type
        const data = await request.formData()
        console.log(data)
        const email = data.get("email") as string;
        const password = data.get("password") as string;
        // checks if empty
        if(email && password) {
            if(await db.verifyPassword(email, password)) {
                const role = await db.checkRole(email) as any;
                if(role=="admin"){
                    cookies.set("role","admin")
                    throw redirect(303, '/manage/user')
                }
                if(role=="content_creator"){
                    cookies.set("role","content_creator")
                    throw redirect(303, '/manage/content')
                }
                console.log("user inactive")

            // todo verification errors
            }else {
                console.log("verification went wrong ig")
            }
        }else {
            console.log("provide email or password")
        }

    },
    register: async ({cookies,request})=>{
        const data = await request.formData()
        const email = data.get("email") as string;
        const password = data.get("password") as string;
        const name = "testname"
        const username="testusername"
        if(email && password){
            await db.saveUser({username,password,name,email,role:UserRole.INACTIVE}).then(()=> {console.log("Successfully added") })
        } else{
            console.log("provide email or password")
        }
    }
}satisfies Actions;
export const load = (async ({ cookies }) => {
    const userCookie = await cookies.get('login');

    return {
        userCookie
    };
}) satisfies PageServerLoad;
