import db from "../../../database/orm/Operations";
import { error, redirect } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";

import type {PageServerLoad} from "../../../../.svelte-kit/types/src/routes/manage/$types";


const layout_data = {
    title:"text-layout",
    filepath:"$lib"
}

const content_data = {
    title:"test2",
    img_filepath:"/contents",
    filenames:['img2.png','img3.png','somtext.txt']
}
const content_test_data={
    name:"test2",
    duration:30,
    start_time:"2023-04-27 00:00:00",
    end_time:"2023-04-30 00:00:00",
    content_data:JSON.stringify(content_data),
    user_id:1,
    layout_id:2
}
//await db.addLayouts(layout_data,"amr.sheir@pte.hu")
// await db.addContent(content_test_data)
//await db.deleteContent("test2");
console.log(await db.getAll('content'))
//await db.deleteContent("test2");

export const load = (async ({cookies}) => {
    const role = cookies.get('session')
    const username = cookies.get('user') as string;
    const user = await db.getOne('user',(await db.getIdByKey("user","username",username))) as any;
    //let content = await db.getContent("*") as any;
    //content = content[0]
    if (role=='admin' || role == 'content_creator'){
        console.log(role +" "+ username)
        return {
            user,
           // content
        };
    }else {
        throw error(403,{message:"Denied Access"})
    }
}) satisfies PageServerLoad;
export const actions = {
    addContent: async({request})=>{
        return 0;
    },
    editContent: async({request})=>{
        return 0;
    },
    deleteContent: async({request})=>{
        return 0;
    },
    editLayout: async({request})=>{
    return 0;
    }
}satisfies Actions