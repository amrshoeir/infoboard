import { client } from "$database/db";
import db from "$database/orm/Operations";


export class Content{
    //fields
    id:number
    name:string
    duration = 15;
    start_time:string = db.convertDateSQL('');
    end_time:string = db.convertDateSQL('');
    content_data:string
    layout_id:number
    user_id:number

    //constructor
    constructor(content:{id:number, name:string, duration:number, start_time:string, end_time:string, content_data:string, layout_id:number, user_id:number}){
        this.id=content.id;
        this.name=content.name;
        this.duration=content.duration;
        this.start_time=content.start_time;
        this.end_time=content.end_time;
        this.content_data=content.content_data;
        this.layout_id=content.layout_id;
        this.user_id=content.user_id;
    }
    //methods
    async get(key:string){
        return client.query(`SELECT ${key} FROM content`);
    }
    async add(content:Content){
        const query = "INSERT INTO content SET ?"
        const formatted = client.format(query,content)
        await client.query(formatted)
    }
    async edit(content:Content){
        const query = 'UPDATE content SET ? WHERE id=?;'
        const formatted = client.format(query,[content,content.id]);
        await client.query(formatted);

    }
    async delete(id:number){
        const query = "DELETE FROM content WHERE id=?"
        const formatted = client.format(query,id);
        await client.query(formatted);
    }
}
export default Content;