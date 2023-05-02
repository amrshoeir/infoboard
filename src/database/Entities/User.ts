import { client } from "../db";
import bcrypt from "bcrypt";

export enum UserRole{
    admin="Admin",
    content_creator="Content creator",
    inactive="Inactive",
}

export class User {
    //fields
    id:number;
    username:string;
    password:string;
    email:string;
    name:string;
    role:UserRole

    //constructor
     constructor(user:{id:number,username:string,password:string,email:string,name:string,role:UserRole}){
         this.id = user.id;
         this.username = user.username;
         this.password = user.password;
         this.email = user.email;
         this.name = user.name;
         this.role = user.role;

     }

     //methods
    async get(key:string){
      return client.query(`SELECT ${key} FROM user`);
    }
    async add(user:User):Promise<any>{
     const query = "INSERT INTO user SET ?"
     const formatted = client.format(query,user)
     await client.query(query,user);
    }
    async edit(user:User){
      const query = 'UPDATE user SET ? WHERE id=?;'
      const formatted = client.format(query,[user,user.id]);
      const result = await client.query(query,[user,user.id]) as any;
      console.log("updated")
    }
  async delete(id:number){
    const sql = 'DELETE FROM user WHERE id=?';
    const query = client.format(sql,id);
    await client.query(query);
  }

}
export default User;