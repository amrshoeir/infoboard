import {client} from "../db"
import bcrypt from 'bcrypt';
import {User} from "../Entities/User";
import {Content} from "../Entities/Content";
import {Layout} from "../Entities/Layout";
import jwt from "jsonwebtoken";
export const roles = {
    admin:"Admin",
    content_creator:"Content creator",
    inactive:"Inactive"
}
export class Operations{
    async getAll(table:string){
        const res = await client.query(`SELECT * FROM ${table}`)
        return res[0] ;
    }
    async getOne(table:string,id:number){
        const query = `SELECT * FROM ${table} WHERE id=?`;
        const formatted = client.format(query,id)
        const res = await client.query(formatted) as any;
        return res[0][0];
    }
    async getIdByKey(table:string,key:string,value:string):Promise<number>{
        const query = `SELECT id FROM ${table} WHERE ${key}=?`
        const formatted = client.format(query,value);
        const res = await client.query(formatted) as any;
        return res[0][0].id;
    }
    async create(input:User|Content|Layout){
        if(input instanceof User){
            const user= input;
            const inputEmail = user.email;
            const sql = `SELECT email FROM user WHERE email=?`;
            const query = client.format(sql,inputEmail);
            const res = await client.query(query) as any;
            if(res[0][0]){
                console.log('Email already exists')
            }
            else{
                console.log("User doesnt exist, adding..")
                await user.add(user)
            }
        }
        if(input instanceof Content){
            const content = input;
            const sql = `SELECT name FROM content WHERE name = ?`;
            const query = client.format(sql,content.name)
            const res = await client.query(query) as any;
            if(res[0][0]){
                console.log('Content already exists')
            }
            else{
                console.log('Adding..')
                await content.add(content);
            }
        }
    }
    async update(input:User|Content|Layout, id:number){
        if(input instanceof User){
            const user = input;
            const hashedPassword = await bcrypt.hash(user.password,10);
            const mainUser = await this.getOne('user',id)
            await user.edit(user)
        }
       if(input instanceof Content){
           const content = input;
           await content.edit(content);

        }
        if(input instanceof Layout){
            const layout = input;
        }

    }
    async delete(input:User|Content|Layout){
        if(input instanceof User){
            const user = input as User;
            await user.delete(user.id);
        }
        if(input instanceof Content){
            const content = input as Content;
            await content.delete(content.id);
        }
    }
    async verifyPassword(email:string,password:string):Promise<boolean> {
        const query = "SELECT password FROM user WHERE email=?"
        const formatted = client.format(query, email);
        const result = await client.query(formatted) as any;
        if (result[0].length != 0) {
            const userPass = result[0][0].password;
            return await bcrypt.compare(password, userPass);
        } else {
            return false;
        }
    }
    async checkRole(email:string):Promise<string>{
        const query = "SELECT role FROM user WHERE email=?";
        const formatted = client.format(query,email)
        const res = await client.query(formatted) as any;
        return res[0][0].role;
    }
    async addLayouts(data:object,email:string){
        const query = client.format("SELECT id FROM user WHERE email=?",email);
        const res = await client.query(query) as any;
        const id = res[0][0].id;
        const test_data={
            name:"text-layout",
            duration:30,
            layout_data:JSON.stringify(data),
            user_id: id as number
        }
        const get = await client.query("SELECT * FROM layout;") as any;
        console.log(get[0])
        // console.log(test_data)
        // const insert_query = client.format("INSERT INTO layout VALUE (1,?,?,?,?)",[test_data.name,test_data.duration,
        //                                                                                          test_data.layout_data,test_data.user_id])
        // const insert_res = await client.query(insert_query);
        // console.log(insert_res[0])
    }
    generateJWT(user: User): string {
        return jwt.sign({userId: user.id}, process.env.JWT_SECRET as string, {
        expiresIn: '2m',
    });
  }
     convertDateSQL(date?:string) {
        const dt = new Date(date || '').toISOString().split("T"); // Changes "YYYY-MM-DDTHH:mm:ss.sssZ" to "YYYY-MM-DD HH:MM:SS"
        const mysqlTime = dt[0] + " " + dt[1].slice(0, 8);
        return mysqlTime;
    }
    convertDateJS(epoch_time:number){
        const jsDate = new Date(epoch_time * 1000);
        return jsDate;
}

}
const db = new Operations();
export default db;