import { client } from "../db";

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
    role:string;

    //constructors
     constructor(user:{id:number,username:string,password:string,email:string,name:string,role:string}){
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
    async add(user:User){
     const query = "INSERT INTO user SET ?"
     const formatted = client.format(query,user)
     await client.query(formatted);
    }
    async edit(user:User){
      const query = 'UPDATE user SET ? WHERE id=?;'
      const formatted = client.format(query,[user,user.id]);
      await client.query(formatted);
    }
  async delete(id:number){
    const sql = 'DELETE FROM user WHERE id=?';
    const query = client.format(sql,id);
    await client.query(query);
  }

}
export default User;