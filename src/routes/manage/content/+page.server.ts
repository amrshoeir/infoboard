import db from "$database/orm/Operations";
import {  error, fail, redirect } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";
import type {PageServerLoad} from "../../../../.svelte-kit/types/src/routes/manage/$types";
import Layout from "$database/Entities/Layout";
import Content from "$database/Entities/Content";
import * as fs from 'fs';
import { to_number } from "svelte/internal";
import path from "path";

const layouts_path="src/lib/assets/layouts/";

export const load = (async ({cookies}) => {
    const role = cookies.get('session')
    const username = cookies.get('user')
    const user = await db.getOne('user',(await db.getIdByKey("user","username",username)));
    const content = await db.getAll('content');
    const layout = await db.getAll('layout') as object[];
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
        const customDur = data.get('custom_duration') as string;
        console.log(customDur);
        const layout_id = to_number(data.get('layout_id'));
        const layout = await db.getOne('layout',layout_id)
        let duration = to_number(layout.duration);
        const filePath = layouts_path + layout.layout_data.filepath;
        const files = data.getAll('media') as File[];
        const dir =data.get('name') as string;
        const uploadedFiles=[];
        const durationArray=[];
        if(fs.existsSync(filePath+`${dir}/`)){
            console.log('content exists')
            return fail(400,{exists:'content exists'})
        }
        if(dir.includes('/') || dir.length<1){
            console.log('Title cant include /')
            return fail(400,{message:"title can't include characters: /, \", \\ ; "})
        }
        const content_title=data.get('description') as string || 'Blank description';
        let content_json={}
        if(data.get('video_selection') as string ==='youtube') {
            content_json = {
                title: content_title,
                layout: layout.name,
                youtube:true,
                path: data.get('youtube') as string
            }
        }else{
            if(files) {
                duration=0;
                await fs.mkdir(path.normalize(filePath+ `${dir}/`),{recursive:true},()=>{console.log('directory created')})
                for (let i = 0; i < files.length; i++) {
                    try {
                        if (files[i].type.split('/')[1] === 'octet-stream') {
                            return fail(400, { message: 'No file inputted' });
                        }
                        console.log('passed checks')
                        if (layout.name == 'Gallery') {
                            const durations = data.get(`file${i}`);
                            const defaultDuration = data.get('dpi');
                            duration=customDur == 'on'?
                              duration+to_number(durations):
                              to_number(defaultDuration) * files.length;
                            console.log(duration)
                            durationArray.push(to_number(durations) ? to_number(durations) : to_number(defaultDuration))
                        }
                        const filename = `${crypto.randomUUID()}.${files[i].type.split('/')[1]}`
                        uploadedFiles.push(filename)
                        await fs.writeFile(
                          path.normalize(`${filePath}${dir}/${filename}`),
                          Buffer.from(await (files[i] as File).arrayBuffer()),
                          () => {
                            console.log(`${filename} added`)
                        })
                    } catch (err) {
                        console.log(err)
                        return fail(500, { error: err })
                    }
                }
                const file = {
                    file_names: uploadedFiles,
                    folder_name: dir
                }
                content_json = {
                    title: content_title,
                    layout: layout.name,
                    youtube:false,
                    file_names: file.file_names,
                    path: path.normalize(`${filePath}${file.folder_name}/`),
                    ...(durationArray.length > 0 && { durationArray })
                }
                console.log(content_json)

            }
        }
        duration=layout.name!='Gallery'?to_number(data.get('duration')):duration;
        if(duration<0){
            return fail(400,{message:"Duration can't be negative"})
        }
        if(duration==0 || duration == null){
            duration = layout.duration;
        }
        const newContent = {
            id:to_number(data.get('id')),
            name:dir,
            duration:duration,
            start_time:db.convertDateSQL(data.get('start_time') as string),
            end_time:db.convertDateSQL(data.get('end_time') as string),
            content_data:JSON.stringify(content_json),
            layout_id:layout.id,
            user_id:to_number(data.get('user_id'))
        }
        const content = new Content(newContent);
        await db.create(content);
        throw redirect(300,'/manage/content')
    },
    editContent: async({request})=>{
        const data = await request.formData()
        const obj = {
            description: data.get('description'),
            duration: data.get('duration'),
            startDate:data.get('start_time') as string,
            endDate:data.get('end_time') as string,
        }
        const content = await db.getOne('content',to_number(data.get('id')));
        let newContent= content;
        newContent.content_data.title = obj.description?obj.description:content.content_data.title;
        newContent.duration = obj.duration?obj.duration:content.duration;
        newContent.start_time = obj.startDate?db.convertDateSQL(obj.startDate):content.start_time;
        newContent.end_time = obj.endDate?db.convertDateSQL(obj.endDate):content.end_time;
        newContent.content_data = JSON.stringify(newContent.content_data)
        newContent = new Content(newContent)
        await db.update(newContent, content.id)
        throw redirect(303,'/manage/content')
    },
    deleteContent: async({request})=>{
        const data = await request.formData()
        const id = to_number(data.get('content_id'));
        const content = await db.getOne('content',id);
        if(!content.content_data.youtube){
            fs.rmSync(content.content_data.path,{recursive:true,force:true})
            console.log(content.content_data.title + ' deleted')
            await db.delete(new Content(content));
            throw redirect(303,'/manage/content')
        }
        else{
            await db.delete(new Content(content))
            throw redirect(300,'/manage/content')
        }

    },
    editLayout: async({request})=>{
        const data = await request.formData()
        const obj = {
            description: data.get('description'),
            duration: data.get('duration'),
        }
        const layout = await db.getOne('layout',to_number(data.get('id')));
        let newLayout= layout;
        newLayout.layout_data.description = obj.description?obj.description:layout.layout_data.description;
        newLayout.duration = obj.duration?obj.duration:layout.duration;
        newLayout.layout_data = JSON.stringify(newLayout.layout_data)
        newLayout = new Layout(layout)
        console.log(newLayout)
        await db.update(newLayout, layout.id)
        throw redirect(303,'/manage/content')
    },
    addLayout: async({request})=>{
        const data = await request.formData();
        const layout_data = data.get('layout_data') as Blob;
        const layoutData = {
                id:to_number(data.get('id')),
                name:data.get('name') as string,
                duration:to_number(data.get('duration')),
                layout_data:await layout_data.text(),
                user_id:to_number(data.get('user_id'))
        }
        const layout = new Layout(layoutData);
        console.log(layout)
        await db.create(layout);
    },
    deleteLayout: async({request})=>{
       const data = await request.formData();
       const id = to_number(data.get("id"));
       const layout = await db.getOne('layout',id);
        try{
            await db.delete(new Layout(layout));
        }catch(err){
           return fail(500,{error:err})
        }

    }
}satisfies Actions