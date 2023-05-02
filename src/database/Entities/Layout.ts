import { client } from "../db";


export class Layout{
    id:number
    name:string
    duration:number
    private layout_data: object
    user_id:number


    constructor(id: number, name: string, layout_data: object, user_id: number,duration?: number) {
        this.id = id;
        this.name = name;
        this.duration = duration || 15;
        this.layout_data = layout_data;
        this.user_id = user_id;
    }

   //methods
    async get(key:string){
        return client.query(`SELECT ${key} FROM layout`);
    }

}
export default Layout;