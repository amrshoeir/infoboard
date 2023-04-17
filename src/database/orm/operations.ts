import {client} from "../db"
import bcrypt from 'bcrypt';
import type {User} from "../../Entities/User";

export enum UserRole{
    ADMIN="admin",
    EDITOR="editor",
    INACTIVE="inactive"
}
export class Operations{

    private Users: object;

    async getUsers(key:string):Promise<any>{
        const results = await client.query(`SELECT ${key} FROM user`)
        const res = results[0];
        return res;
    }
    async saveUser(user:{username:string,password:string,name:string,email:string,role:UserRole}):Promise<any>{

        const query = "INSERT INTO user VALUES (null,?,?,?,?,?)"
        const formatted = client.format(query,[user.username,user.password,user.name,user.email,user.role])
        const results = await client.query(formatted)
        console.log(results);
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
        console.log(user.role)

    }
    async update(password:string,id:number){
        const hashedPassword = await bcrypt.hash(password,10);
        const query = 'UPDATE user SET password =? WHERE id=?';
        const formatted = client.format(query,[hashedPassword,id]);
        const result = await client.query(formatted)

        console.log("password updated: ");
        console.log(result)
    }

    async delete(){

    }
}
const db = new Operations();
export default db;