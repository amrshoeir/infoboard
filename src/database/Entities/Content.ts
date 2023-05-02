import { client } from "../db";


export class Content{
    //fields
    id:number
    name:string
    duration = 15;
    start_time:Date = new Date();
    end_time:Date = new Date()
    content_data:object
    layout_id:number
    user_id:number

    //constructor
    constructor(id:number, name:string, duration:number, start_time:Date, end_time:Date, content_data:object, layout_id:number, user_id:number){
        this.id=id;
        this.name=name;
        this.duration=duration;
        this.start_time=start_time;
        this.end_time=end_time;
        this.content_data=content_data;
        this.layout_id=layout_id;
        this.user_id=user_id;
    }
    //methods
    async get(key:string){
        return client.query(`SELECT ${key} FROM content`);
    }
    async add(content:Content){
        const query = "INSERT INTO content SET ?"
        const formatted = client.format(query,content)
        await client.query(formatted);
    }
    async edit(content:Content){
        const query = 'UPDATE content SET ? WHERE id=?;'
        const formatted = client.format(query,[content,content.id]);
        const result = await client.query(query,[content,content.id]) as any;
        console.log(result)
        console.log("updated")
    }
    async delete(id:number){
        const query = "DELETE FROM content WHERE id=?"
        const formatted = client.format(query,id);
        await client.query(formatted);
    }
}
export default Content;