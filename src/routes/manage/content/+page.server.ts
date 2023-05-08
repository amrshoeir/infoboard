import db from "$database/orm/Operations";
import { error, redirect } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";
import type {PageServerLoad} from "../../../../.svelte-kit/types/src/routes/manage/$types";
import Layout from "$database/Entities/Layout";
import Content from "$database/Entities/Content";
import * as fs from 'fs';

const layouts_path="src/lib/assets/Layouts/";



const layout_data = {
    title:"text-layout",
    filepath:"$Layouts/text/"
}

const content_data = {
    title:"test2",
    img_filepath:"/contents",
    filenames:['img2.png','img3.png','someText.txt']
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

export const load = (async ({cookies}) => {
    const role = cookies.get('session')
    const username = cookies.get('user') as string;
    const user = await db.getOne('user',(await db.getIdByKey("user","username",username))) as any;
    const content = await db.getAll('content') as any;
    const layout = await db.getAll('layout') as any;
    if (role=='admin' || role == 'content_creator'){
        return {
            user,
            content,
            layout
        };
    }else {
        throw error(403,{message:"Denied Access"})
    }
}) satisfies PageServerLoad;
export const actions = {
    addContent: async({request})=>{
        const data = await request.formData()
        const layout_id = data.get('layout_id') as any;
        const id = layout_id.id;
        const contentData = {
            id:data.get('id') as any,
            name:data.get('name') as string,
            duration:data.get('duration') as any,
            start_time:data.get('start_time') as any,
            end_time:data.get('end_time') as any,
            content_data:data.get('content_data') as any,
            layout_id:id,
            user_id:data.get('user_id') as any
        }
        console.log(contentData)
        const content = new Content(contentData);
        console.log(content)
    },
    editContent: async({request})=>{
        const data = await request.formData()
    },
    deleteContent: async({request})=>{
        const data = await request.formData()
        const id = data.get('id') as any;
        const content = await db.getOne('content',id);
        await db.delete(new Content(content));
    },
    editLayout: async({request})=>{
        const data = await request.formData()
    },
    addLayout: async({request})=>{
        const data = await request.formData()
        const layout_data = data.get('layout_data') as string;
        const current_adding_layout= await data.get('name') as string;
        const path = `${layouts_path}${current_adding_layout}/`;
        const content = fs.readFileSync(path+layout_data,'utf8');

        const layoutData = {
                id:data.get('id') as any,
                name:data.get('name') as string,
                duration:data.get('duration') as any,
                layout_data:content as string,
                user_id:data.get('user_id') as any
        }
        const layout = new Layout(layoutData);
        console.log(layout)
        await db.create(layout);
    },
    deleteLayout: async({request})=>{
       const data = await request.formData();
       const id = data.get("id") as any;
       const layout = await db.getOne('layout',id);
       console.log(layout)
       await db.delete(new Layout(layout));
    }

}satisfies Actions