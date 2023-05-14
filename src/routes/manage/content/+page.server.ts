import db from "$database/orm/Operations";
import { error, redirect } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";
import type {PageServerLoad} from "../../../../.svelte-kit/types/src/routes/manage/$types";
import Layout from "$database/Entities/Layout";
import Content from "$database/Entities/Content";
import * as fs from 'fs';

const layouts_path="src/lib/assets/Layouts/";


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
        const layout = await db.getOne('layout',data.get('layout_id') as any)
        //fs.writeFileSync(layouts_path+'Image(s)/img1.png',data.getAll('media') as any,'base64')
        const file = {
            file_names:data.getAll('media') as Array<string>,
            folder_name:data.get('content_title') as string
        }
        const path = layouts_path + layout.layout_data.content.filepath;
        const content_json = {
            title: file.folder_name,
            content:{
                file_names:file.file_names,
                file_path:`${path}${file.folder_name}/`
            }
        }
        const contentData = {
            id:data.get('id') as any,
            name:data.get('name') as string,
            duration:data.get('duration') as any,
            start_time:db.convertDateSQL(data.get('start_time') as string),
            end_time:db.convertDateSQL(data.get('end_time') as string),
            content_data:JSON.stringify(content_json),
            layout_id:layout.id,
            user_id:data.get('user_id') as any
        }
        const content = new Content(contentData);
        console.log(content)
        await db.create(content);
        // if(content_json.title){
        //     path = content_json.content.file_path
        //     fs.mkdir(path, {recursive:true} ,()=>{console.log('folder created')})
        //     file.file_names.forEach((value)=>{
        //         fs.writeFileSync(path + value,JSON.stringify(file.file_names),"base64");
        //     })
        // }
        throw redirect(303,'/manage/content')

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