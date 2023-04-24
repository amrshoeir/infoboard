import {client} from "../db"
import bcrypt from 'bcrypt';
import type {User} from "../../Entities/User";
import jwt from "jsonwebtoken";

export const roles = {
    admin:"Admin",
    content_creator:"Content creator",
    inactive:"Inactive"
}
export class Operations{

    async getUsers(key:string):Promise<any>{
        const results = await client.query(`SELECT ${key} FROM user`)
        return results[0];
    }
    async find(id:number){
        const query = 'SELECT * FROM user WHERE id=?';
        const formatted = client.format(query,id)
        const res = await client.query(formatted) as any;
        return res[0][0];
    }
    async findIdByKey(key:string,value:any){
        const query = `SELECT id FROM user WHERE ${key}=?`
        const formatted = client.format(query,value);
        const res = await client.query(formatted) as any;
        return res[0][0].id;
    }
    async addUser(user:User):Promise<any>{
        const query = "INSERT INTO user VALUES (null,?,?,?,?,?)"
        const formatted = client.format(query,[user.username,user.password,user.name,user.email,user.role])
        await client.query(formatted);
    }
    async verifyPassword(email:string,password:string):Promise<boolean>{
        const query = "SELECT password FROM user WHERE email=?"
        const formatted = client.format(query,email);
        const result = await client.query(formatted) as any;
        if (result[0].length!=0) {
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
    async create(user:User){
        const inputEmail = user.email;
        const sql = `SELECT email FROM user WHERE email=?`
        const query = client.format(sql,inputEmail)
        const res = await client.query(query) as any;
        if(res[0][0]){
            console.log('Email already exists')
        }
        else{
            console.log("User doesnt exist, adding..")
            await this.addUser(user)
        }
    }
    async update(user:User, id:number){
        const hashedPassword = await bcrypt.hash(user.password,10);
        const mainUser = await this.find(id)
        const query = 'UPDATE user SET username=?, password=?, email=?, name=?, role=? WHERE id=?;'
        const formatted = client.format(query,[user.username, hashedPassword
                                                   ,user.email, user.name, user.role,user.id]);
        const result = await client.query(formatted) as any;
        console.log(result.info)
        console.log("updated")

    }
    async delete(email:string){
    const sql = 'DELETE FROM user WHERE email=?';
    const query = client.format(sql,email);
    await client.query(query);
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
    async addContent(data:object){
        const test_data={
            name:"test content",
            duration:30,
            start_time:"",
            end_time:"",
            content_data:JSON.stringify(data),
            user_id:1,
            layout_id:2
        }

    }


    generateJWT(user: User): string {
        return jwt.sign({userId: user.id}, process.env.JWT_SECRET as string, {
        expiresIn: '2m',
    });
  }
}
const db = new Operations();
export default db;