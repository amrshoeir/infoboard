import db from "../../../database/orm/operations";
import {error, redirect} from "@sveltejs/kit";
import type {PageServerLoad} from "../../../../.svelte-kit/types/src/routes/manage/$types";

const layout_data = {
    title:"text-layout",
    filepath:"$lib"
}
//await db.addLayouts(layout_data,"amr.sheir@pte.hu")

export const load = (async ({cookies}) => {
    const role = cookies.get('session')
    const username = cookies.get('user')
    const user = await db.find(await db.findIdByKey("username",username)) as any;
    if (role=='admin' || role == 'content_creator'){
        console.log(role +" "+ username)
        return {
            user
        };
    }else {
        throw error(403,{message:"Denied Access"})
    }
}) satisfies PageServerLoad;