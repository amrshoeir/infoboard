import { client } from "../db";


export class Layout{
    id:number
    name:string
    duration:number
    private layout_data: string
    user_id:number


    constructor(layout:{ id: number, name: string, layout_data:string, user_id: number, duration?: number
}) {
        this.id = layout.id;
        this.name = layout.name;
        this.duration = layout.duration || 15;
        this.layout_data = layout.layout_data;
        this.user_id = layout.user_id;
    }

   //methods
    async get(key:string){
        return client.query(`SELECT ${key} FROM layout`);
    }
    async edit(layout:Layout){
        const query = 'UPDATE layout SET ? WHERE id=?;'
        const formatted = client.format(query,[layout,layout.id]);
        const result = await client.query(query,[layout,layout.id]) as any;
        console.log(result)
        console.log("updated")
    }
    async add(layout:Layout){
      const query = "INSERT INTO layout SET ?"
      const formatted = client.format(query,layout)
      await client.query(formatted);
    }
    async delete(id:number){
        const query = 'DELETE FROM layout WHERE id=?;'
        const formatted = client.format(query,id);
        await client.query(formatted);
    }

}
export default Layout;