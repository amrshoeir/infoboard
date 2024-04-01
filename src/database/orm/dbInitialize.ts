import client from "../db";
import {
  ADMIN_EMAIL as email,
  ADMIN_NAME as name,
  ADMIN_PASS as password,
  ADMIN_USERNAME as username,
  DATA_PATH as dataPath,
  DB_DATABASE as database
} from "$env/static/private";
import bcrypt from "bcrypt";
import * as fs from "fs";

class dbInitialize{
    private DB_ADMIN = {
      id:1000,
      username,
      name,
      email,
      password,
      role:"admin"
    }
    // creating and using env DB
   async initializeDB(){
    await client.query(`CREATE DATABASE IF NOT EXISTS ${database}`);
    await client.query(`USE ${database}`);
  }
  //method for checking if table exists
  async checkIfExists(table:string):Promise<boolean>{
      const query = `SHOW TABLES LIKE '${table}'`;
      const res  = await client.query(query) as any;
      console.log(`${table} table: ${res[0].length>0?'exists':'not found'}`)
      return res[0].length>0;
}
  // reads tables.sql which creates the tables if they don't already exist within this db.
  // this only happens if the user table is not existing, since the layouts cannot be defined without a user.
  async initializeTables(){
    const sql = fs.readFileSync(`${dataPath}/tables.sql`,'utf-8');
    const queries = sql.split(';').filter(query => query.trim() !== '');
    queries.forEach(query=> client.query(client.format(query)))
    this.DB_ADMIN.password = await bcrypt.hash(password,10);
    const admin = "INSERT INTO user SET ?"
    await client.query(client.format(admin,this.DB_ADMIN));
    console.log("Content table created with admin user");
    await db.insertData();
  }
  // dummy user data, won't work for login because passwords are not encrypted.
  // change dummy user passwords before using them or create your own.
  // the layouts are pre-defined in this file.
  async insertData(){
    const sql = fs.readFileSync(`${dataPath}/data.sql`,'utf-8');
    const queries = sql.split(';').filter(query => query.trim() !== '');
    queries.forEach(query=>client.query(client.format(query)))
  }
  // in the case that we want to update the admin credentials. change ENV variables to match imports
 async updateAdmin(){
   try{
     const query = "UPDATE user SET ? WHERE id=1000"
     this.DB_ADMIN.password = await bcrypt.hash(password,10);
     await client.query(client.format(query,this.DB_ADMIN));
   }catch(err){
     console.log(err);
   }
 }

}
const db = new dbInitialize();
export default db;