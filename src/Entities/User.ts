import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm"

import {Layout} from "./Layout";
import {Content} from "./Content";

export enum UserRole{
    ADMIN="admin",
    EDITOR="content_creator",
    INACTIVE="inactive"
}

export class User {
    //fields
    username:string;
    password:string;
    email:string;
    name:string;
    role:UserRole

    //constructor
     constructor(username:string,password:string,email:string,name:string,role?:UserRole){
        this.username = username;
        this.password = password;
        this.email = email;
        this.name = name;
     }

     //methods
}
