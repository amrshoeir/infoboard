import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm"

import {Layout} from "./Layout";
import {Content} from "./Content";
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
     constructor(id:number,username:string,password:string,email:string,name:string,role:UserRole){
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.name = name;
        this.role = role;
     }

     //methods
}
